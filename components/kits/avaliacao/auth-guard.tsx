'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '@/lib/kits/avaliacao/auth-store';
import { SessionRole } from '@/lib/kits/avaliacao/types';
import { CircleNotch } from '@phosphor-icons/react';

interface AuthGuardProps {
  children: React.ReactNode;
  allowedRole?: SessionRole | 'any';
}

export function AuthGuard({ children, allowedRole = 'any' }: AuthGuardProps) {
  const router = useRouter();
  const { user, isHydrated } = useSession();

  const isAuthorized = React.useMemo(() => {
    if (!user) return false;
    if (allowedRole === 'any') return true;
    if (user.role === 'admin') return true; // Administrador tem acesso a todas as visões
    return user.role === allowedRole;
  }, [user, allowedRole]);

  useEffect(() => {
    if (isHydrated && !isAuthorized) {
      router.replace('/avaliacao-dashboard');
    }
  }, [isHydrated, isAuthorized, router]);

  // Se ainda não hidratou ou não está autorizado, exibe estado de guarda neutro sem flash de dados
  if (!isHydrated || !isAuthorized) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center gap-3 text-muted-foreground">
        <CircleNotch className="animate-spin text-primary" size={28} />
        <p className="text-sm">A verificar autorização de sessão...</p>
      </div>
    );
  }

  return <>{children}</>;
}
