'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { LockKey, ChalkboardTeacher, ShieldCheck, Backspace, CircleNotch } from '@phosphor-icons/react';
import { authStore, useSession } from '@/lib/kits/avaliacao/auth-store';

interface AuthPinPadProps {
  onSuccessTrainer?: () => void;
  onSuccessAdmin?: () => void;
}

export function AuthPinPad({ onSuccessTrainer, onSuccessAdmin }: AuthPinPadProps) {
  const [activeTab, setActiveTab] = useState<'trainer' | 'admin'>('trainer');
  const [actionCode, setActionCode] = useState('FD-2026-TURMA4');
  const [pin, setPin] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [lockoutSec, setLockoutSec] = useState(0);

  const { lockoutUntil } = useSession();

  // Atualização em tempo real do temporizador de lockout
  useEffect(() => {
    const updateCountdown = () => {
      const remaining = authStore.getLockoutRemainingSeconds();
      setLockoutSec(remaining);
    };

    updateCountdown();
    const timer = setInterval(updateCountdown, 1000);
    return () => clearInterval(timer);
  }, [lockoutUntil]);

  const handleDigit = (digit: string) => {
    if (lockoutSec > 0 || isLoading) return;
    if (pin.length < 4) {
      setPin((prev) => prev + digit);
      setErrorMessage(null);
    }
  };

  const handleBackspace = () => {
    if (lockoutSec > 0 || isLoading) return;
    setPin((prev) => prev.slice(0, -1));
    setErrorMessage(null);
  };

  const handleClear = () => {
    if (lockoutSec > 0 || isLoading) return;
    setPin('');
    setErrorMessage(null);
  };

  const handleSubmitTrainer = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (lockoutSec > 0 || isLoading) return;

    if (pin.length !== 4) {
      setErrorMessage('Por favor introduza os 4 dígitos do PIN.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const result = await authStore.loginTrainer(actionCode, pin);
    setIsLoading(false);

    if (result.success) {
      onSuccessTrainer?.();
    } else {
      setErrorMessage(result.error || 'Erro na validação do PIN.');
      setPin('');
    }
  };

  const handleSubmitAdmin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (lockoutSec > 0 || isLoading) return;

    if (!adminPassword.trim()) {
      setErrorMessage('Por favor introduza a password de administrador.');
      return;
    }

    setIsLoading(true);
    setErrorMessage(null);

    const result = await authStore.loginAdmin(adminPassword);
    setIsLoading(false);

    if (result.success) {
      onSuccessAdmin?.();
    } else {
      setErrorMessage(result.error || 'Password incorreta.');
      setAdminPassword('');
    }
  };

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-card border border-border rounded-xl shadow-lg">
      {/* Abas de Perfil */}
      <div className="grid grid-cols-2 gap-2 p-1 mb-6 bg-muted/60 rounded-lg">
        <button
          type="button"
          onClick={() => {
            setActiveTab('trainer');
            setErrorMessage(null);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'trainer'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ChalkboardTeacher size={18} />
          <span>Formador</span>
        </button>
        <button
          type="button"
          onClick={() => {
            setActiveTab('admin');
            setErrorMessage(null);
          }}
          className={`flex items-center justify-center gap-2 py-2.5 text-sm font-medium rounded-md transition-colors ${
            activeTab === 'admin'
              ? 'bg-background text-foreground shadow-sm'
              : 'text-muted-foreground hover:text-foreground'
          }`}
        >
          <ShieldCheck size={18} />
          <span>Administrador</span>
        </button>
      </div>

      {/* Alerta de Lockout */}
      {lockoutSec > 0 && (
        <div className="mb-4 p-3 bg-destructive/10 border border-destructive/20 text-destructive text-sm rounded-lg flex items-center justify-between animate-pulse">
          <span>Acesso bloqueado por tentativas falhadas.</span>
          <span className="font-mono font-bold">{lockoutSec}s</span>
        </div>
      )}

      {/* Erro Geral */}
      {errorMessage && (
        <div className="mb-4 p-3 bg-amber-500/10 border border-amber-500/20 text-amber-600 dark:text-amber-400 text-sm rounded-lg">
          {errorMessage}
        </div>
      )}

      {/* Visão do Formador (PIN Pad) */}
      {activeTab === 'trainer' ? (
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-muted-foreground mb-1.5 uppercase tracking-wider">
              Código de Ação / Turma
            </label>
            <Input
              value={actionCode}
              onChange={(e) => setActionCode(e.target.value)}
              placeholder="ex: FD-2026-TURMA4"
              disabled={isLoading || lockoutSec > 0}
              className="font-mono text-center tracking-wider uppercase font-semibold"
            />
          </div>

          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                PIN de Sessão (4 Dígitos)
              </label>
              <span className="text-[11px] text-muted-foreground">Demo: 1234</span>
            </div>

            {/* Display de Pontos do PIN */}
            <div className="flex justify-center items-center gap-3 py-3 bg-muted/40 rounded-lg border border-border">
              {[0, 1, 2, 3].map((idx) => {
                const filled = pin.length > idx;
                return (
                  <div
                    key={idx}
                    className={`w-4 h-4 rounded-full transition-all duration-150 ${
                      filled
                        ? 'bg-primary scale-110 shadow-sm'
                        : 'border-2 border-muted-foreground/30 bg-transparent'
                    }`}
                  />
                );
              })}
            </div>
          </div>

          {/* Teclado Virtual Numérico */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
              <Button
                key={digit}
                type="button"
                variant="outline"
                size="lg"
                disabled={lockoutSec > 0 || isLoading || pin.length >= 4}
                onClick={() => handleDigit(digit)}
                className="h-12 text-lg font-semibold hover:bg-muted"
              >
                {digit}
              </Button>
            ))}
            <Button
              type="button"
              variant="ghost"
              size="lg"
              disabled={lockoutSec > 0 || isLoading || pin.length === 0}
              onClick={handleClear}
              className="h-12 text-xs text-muted-foreground"
            >
              Limpar
            </Button>
            <Button
              type="button"
              variant="outline"
              size="lg"
              disabled={lockoutSec > 0 || isLoading || pin.length >= 4}
              onClick={() => handleDigit('0')}
              className="h-12 text-lg font-semibold hover:bg-muted"
            >
              0
            </Button>
            <Button
              type="button"
              variant="ghost"
              size="lg"
              disabled={lockoutSec > 0 || isLoading || pin.length === 0}
              onClick={handleBackspace}
              aria-label="Apagar dígito"
              className="h-12"
            >
              <Backspace size={20} />
            </Button>
          </div>

          <Button
            type="button"
            className="w-full h-11 mt-2 text-base font-medium flex items-center justify-center gap-2"
            disabled={pin.length !== 4 || isLoading || lockoutSec > 0}
            onClick={() => handleSubmitTrainer()}
          >
            {isLoading ? (
              <>
                <CircleNotch className="animate-spin" size={18} />
                <span>A validar PIN...</span>
              </>
            ) : (
              <>
                <LockKey size={18} />
                <span>Entrar no Painel do Formador</span>
              </>
            )}
          </Button>
        </div>
      ) : (
        /* Visão de Administrador (Password) */
        <form onSubmit={handleSubmitAdmin} className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Password Mestra de Administração
              </label>
              <span className="text-[11px] text-muted-foreground">Demo: admin123</span>
            </div>
            <Input
              type="password"
              value={adminPassword}
              onChange={(e) => setAdminPassword(e.target.value)}
              placeholder="••••••••••••"
              disabled={isLoading || lockoutSec > 0}
              className="font-mono text-center tracking-wider text-base"
            />
          </div>

          <Button
            type="submit"
            className="w-full h-11 text-base font-medium flex items-center justify-center gap-2"
            disabled={!adminPassword.trim() || isLoading || lockoutSec > 0}
          >
            {isLoading ? (
              <>
                <CircleNotch className="animate-spin" size={18} />
                <span>A verificar credenciais...</span>
              </>
            ) : (
              <>
                <ShieldCheck size={18} />
                <span>Aceder ao Cockpit Administrativo</span>
              </>
            )}
          </Button>
        </form>
      )}
    </div>
  );
}
