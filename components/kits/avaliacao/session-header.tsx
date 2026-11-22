'use client';

import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/theme-toggle';
import {
  SignOut,
  ChalkboardTeacher,
  ShieldCheck,
  Clock,
  ArrowSquareOut,
} from '@phosphor-icons/react';
import { authStore, useSession } from '@/lib/kits/avaliacao/auth-store';
import Link from 'next/link';

export function SessionHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const { user } = useSession();
  const [timeStr, setTimeStr] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTimeStr(
        new Date().toLocaleTimeString('pt-PT', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    authStore.logout();
    router.replace('/avaliacao-dashboard');
  };

  const isTrainer = pathname.includes('/trainer');
  const isAdmin = pathname.includes('/admin');

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Lado Esquerdo: Identidade do Painel */}
        <div className="flex items-center gap-3">
          <Link
            href="/avaliacao-dashboard"
            className="flex items-center gap-2 font-bold text-base hover:opacity-85 transition-opacity"
          >
            <span className="p-1.5 bg-primary/10 text-primary rounded-lg">
              {isAdmin ? <ShieldCheck size={20} weight="bold" /> : <ChalkboardTeacher size={20} weight="bold" />}
            </span>
            <span>Avaliação Dashboard</span>
          </Link>

          <span className="text-muted-foreground/40 hidden sm:inline">|</span>

          {user && (
            <div className="hidden sm:flex items-center gap-2">
              <Badge variant="outline" className="font-mono text-xs">
                {user.role === 'admin' ? 'Admin Master' : user.actionCode || 'FD-2026-TURMA4'}
              </Badge>
              <span className="text-xs text-muted-foreground">{user.name}</span>
            </div>
          )}
        </div>

        {/* Lado Direito: Relógio, Alternância & Logout */}
        <div className="flex items-center gap-3">
          {/* Relógio Live */}
          <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-muted-foreground bg-muted/40 px-2.5 py-1 rounded-md border border-border">
            <Clock size={14} />
            <span>{timeStr || '--:--:--'}</span>
          </div>

          {/* Links de navegação interna entre Admin e Trainer se o utilizador for Admin */}
          {user?.role === 'admin' && (
            <div className="flex items-center gap-1 bg-muted/60 p-0.5 rounded-lg text-xs">
              <Link
                href="/avaliacao-dashboard/admin"
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  isAdmin ? 'bg-background font-semibold shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Cockpit
              </Link>
              <Link
                href="/avaliacao-dashboard/trainer"
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  isTrainer ? 'bg-background font-semibold shadow-sm' : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Formador
              </Link>
            </div>
          )}

          {/* Link para o template zero-build twin */}
          <a
            href="/html/kits/avaliacao/index.html"
            target="_blank"
            rel="noopener noreferrer"
            title="Abrir versão Gémea Zero-Build HTML5"
            className="hidden lg:flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md border border-border/60 hover:bg-muted"
          >
            <span>HTML Kit Twin</span>
            <ArrowSquareOut size={12} />
          </a>

          <ThemeToggle />

          <Button
            variant="ghost"
            size="sm"
            onClick={handleLogout}
            className="text-xs text-muted-foreground hover:text-destructive flex items-center gap-1.5"
          >
            <SignOut size={16} />
            <span className="hidden sm:inline">Terminar Sessão</span>
          </Button>
        </div>
      </div>
    </header>
  );
}
