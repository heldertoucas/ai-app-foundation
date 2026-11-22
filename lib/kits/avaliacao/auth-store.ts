'use client';

import { useSyncExternalStore } from 'react';
import { safeLocalStorage, safeSessionStorage } from './safe-storage';
import { SessionUser } from './types';

interface AuthState {
  user: SessionUser | null;
  isHydrated: boolean;
  lockoutUntil: number;
}

interface LockoutRecord {
  failedAttempts: number;
  lockoutUntil: number;
}

const SESSION_KEY = 'du_avaliacao_session';
const LOCKOUT_KEY = 'du_avaliacao_lockout';

const SERVER_SNAPSHOT: AuthState = {
  user: null,
  isHydrated: false,
  lockoutUntil: 0,
};

let currentClientSnapshot: AuthState = SERVER_SNAPSHOT;
const listeners = new Set<() => void>();

function getStoredUser(): SessionUser | null {
  try {
    const raw = safeSessionStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

function computeLockoutRemaining(): number {
  try {
    const raw = safeLocalStorage.getItem(LOCKOUT_KEY);
    if (!raw) return 0;
    const record: LockoutRecord = JSON.parse(raw);
    const now = Date.now();
    return record.lockoutUntil > now ? record.lockoutUntil : 0;
  } catch {
    return 0;
  }
}

function refreshSnapshot(): void {
  if (typeof window === 'undefined') return;

  const newUser = getStoredUser();
  const newLockout = computeLockoutRemaining();

  currentClientSnapshot = {
    user: newUser,
    isHydrated: true,
    lockoutUntil: newLockout,
  };
}

function notify() {
  refreshSnapshot();
  listeners.forEach((listener) => listener());
}

function recordFailedAttempt(): number {
  try {
    const raw = safeLocalStorage.getItem(LOCKOUT_KEY);
    const prev: LockoutRecord = raw ? JSON.parse(raw) : { failedAttempts: 0, lockoutUntil: 0 };
    const attempts = prev.failedAttempts + 1;
    let lockoutDurationMs = 0;

    if (attempts >= 10) {
      lockoutDurationMs = 15 * 60 * 1000; // 15 minutos
    } else if (attempts >= 5) {
      lockoutDurationMs = 60 * 1000; // 60 segundos
    }

    const lockoutUntil = lockoutDurationMs > 0 ? Date.now() + lockoutDurationMs : 0;
    const record: LockoutRecord = { failedAttempts: attempts, lockoutUntil };
    safeLocalStorage.setItem(LOCKOUT_KEY, JSON.stringify(record));
    return lockoutUntil;
  } catch {
    return 0;
  }
}

function clearLockout(): void {
  safeLocalStorage.removeItem(LOCKOUT_KEY);
}

export const authStore = {
  subscribe(listener: () => void): () => void {
    listeners.add(listener);
    if (typeof window !== 'undefined') {
      window.addEventListener('storage', notify);
    }
    return () => {
      listeners.delete(listener);
      if (typeof window !== 'undefined') {
        window.removeEventListener('storage', notify);
      }
    };
  },

  getSnapshot(): AuthState {
    if (typeof window === 'undefined') return SERVER_SNAPSHOT;
    if (currentClientSnapshot === SERVER_SNAPSHOT) {
      refreshSnapshot();
    }
    return currentClientSnapshot;
  },

  getServerSnapshot(): AuthState {
    return SERVER_SNAPSHOT;
  },

  getLockoutRemainingSeconds(): number {
    const lockoutUntil = computeLockoutRemaining();
    if (!lockoutUntil) return 0;
    return Math.max(0, Math.ceil((lockoutUntil - Date.now()) / 1000));
  },

  async loginTrainer(actionCode: string, pin: string): Promise<{ success: boolean; error?: string }> {
    // Atraso de 400ms para desaceleração contra brute force
    await new Promise((r) => setTimeout(r, 400));

    const lockoutUntil = computeLockoutRemaining();
    if (lockoutUntil > Date.now()) {
      const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      return { success: false, error: `Demasiadas tentativas falhadas. Aguarde ${remainingSec}s.` };
    }

    // Regra canónica de validação de PIN (mock: PIN correto '1234')
    if (pin.trim() !== '1234') {
      const newLockout = recordFailedAttempt();
      notify();
      if (newLockout > Date.now()) {
        const remainingSec = Math.ceil((newLockout - Date.now()) / 1000);
        return { success: false, error: `PIN incorreto. Bloqueio temporário ativado por ${remainingSec}s.` };
      }
      return { success: false, error: 'PIN incorreto. Tente novamente.' };
    }

    clearLockout();
    const user: SessionUser = {
      role: 'trainer',
      actionCode: actionCode.trim() || 'FD-2026-TURMA4',
      name: 'Formador CMLisboa',
      loginAt: Date.now(),
    };

    safeSessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    notify();
    return { success: true };
  },

  async loginAdmin(password: string): Promise<{ success: boolean; error?: string }> {
    await new Promise((r) => setTimeout(r, 400));

    const lockoutUntil = computeLockoutRemaining();
    if (lockoutUntil > Date.now()) {
      const remainingSec = Math.ceil((lockoutUntil - Date.now()) / 1000);
      return { success: false, error: `Demasiadas tentativas falhadas. Aguarde ${remainingSec}s.` };
    }

    // Regra canónica de validação de Admin (mock: 'admin123')
    if (password.trim() !== 'admin123') {
      const newLockout = recordFailedAttempt();
      notify();
      if (newLockout > Date.now()) {
        const remainingSec = Math.ceil((newLockout - Date.now()) / 1000);
        return { success: false, error: `Credenciais incorretas. Bloqueio ativado por ${remainingSec}s.` };
      }
      return { success: false, error: 'Password de administrador incorreta.' };
    }

    clearLockout();
    const user: SessionUser = {
      role: 'admin',
      name: 'Administrador de Sistema',
      loginAt: Date.now(),
    };

    safeSessionStorage.setItem(SESSION_KEY, JSON.stringify(user));
    notify();
    return { success: true };
  },

  logout(): void {
    safeSessionStorage.removeItem(SESSION_KEY);
    notify();
  },
};

export function useSession(): AuthState {
  return useSyncExternalStore(
    authStore.subscribe,
    authStore.getSnapshot,
    authStore.getServerSnapshot
  );
}
