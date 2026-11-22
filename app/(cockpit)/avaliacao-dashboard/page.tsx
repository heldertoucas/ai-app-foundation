'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { AuthPinPad } from '@/components/avaliacao-dashboard/auth-pin-pad';
import { useSession } from '@/lib/avaliacao/auth-store';
import { Button } from '@/components/ui/button';
import { ArrowRight, GraduationCap } from '@phosphor-icons/react';

export default function AvaliacaoDashboardLoginPage() {
  const router = useRouter();
  const { user, isHydrated } = useSession();

  const handleSuccessTrainer = () => {
    router.push('/avaliacao-dashboard/trainer');
  };

  const handleSuccessAdmin = () => {
    router.push('/avaliacao-dashboard/admin');
  };

  return (
    <main className="flex-1 flex flex-col items-center justify-center p-4 sm:p-8">
      <div className="w-full max-w-xl mx-auto text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20 mb-4">
          <GraduationCap size={16} />
          <span>Template Canónico DU — App Avaliação</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-2">
          Cockpit de Avaliação e Pauta
        </h1>
        <p className="text-sm text-muted-foreground max-w-md mx-auto">
          Autenticação tátil por PIN numérico para formadores ou password mestra para administração de sincronizações.
        </p>
      </div>

      {/* Se já existe sessão ativa hidratada, oferece atalho rápido */}
      {isHydrated && user && (
        <div className="w-full max-w-md mb-6 p-4 bg-primary/5 border border-primary/20 rounded-xl flex items-center justify-between">
          <div className="text-left text-xs">
            <span className="text-muted-foreground block">Sessão ativa detetada:</span>
            <span className="font-semibold text-foreground">
              {user.name} ({user.role === 'admin' ? 'Administrador' : user.actionCode})
            </span>
          </div>
          <Button
            size="sm"
            onClick={() => router.push(user.role === 'admin' ? '/avaliacao-dashboard/admin' : '/avaliacao-dashboard/trainer')}
            className="flex items-center gap-1.5 text-xs"
          >
            <span>Continuar</span>
            <ArrowRight size={14} />
          </Button>
        </div>
      )}

      {/* Componente Central de Autenticação */}
      <AuthPinPad
        onSuccessTrainer={handleSuccessTrainer}
        onSuccessAdmin={handleSuccessAdmin}
      />

      {/* Rodapé com Dicas de Demonstração */}
      <div className="mt-8 text-center text-xs text-muted-foreground space-y-1">
        <p>Credenciais de Demonstração:</p>
        <p className="font-mono text-[11px]">
          Formador: PIN <strong className="text-foreground">1234</strong> | Admin: Password{' '}
          <strong className="text-foreground">admin123</strong>
        </p>
      </div>
    </main>
  );
}
