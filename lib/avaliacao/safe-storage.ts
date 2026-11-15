/**
 * DU SafeStorage Wrapper
 * Encapsula localStorage e sessionStorage para prevenir SecurityError / QuotaExceededError
 * em kiosks com permissões restritas ou navegação anónima.
 */

class MemoryStorageFallback implements Storage {
  private map = new Map<string, string>();

  get length(): number {
    return this.map.size;
  }

  clear(): void {
    this.map.clear();
  }

  getItem(key: string): string | null {
    return this.map.has(key) ? this.map.get(key)! : null;
  }

  key(index: number): string | null {
    return Array.from(this.map.keys())[index] || null;
  }

  removeItem(key: string): void {
    this.map.delete(key);
  }

  setItem(key: string, value: string): void {
    this.map.set(key, String(value));
  }
}

const localFallbackSingleton = new MemoryStorageFallback();
const sessionFallbackSingleton = new MemoryStorageFallback();

function resolveStorage(type: 'local' | 'session'): Storage {
  const fallback = type === 'local' ? localFallbackSingleton : sessionFallbackSingleton;

  if (typeof window === 'undefined') {
    return fallback;
  }

  try {
    const storage = type === 'local' ? window.localStorage : window.sessionStorage;
    if (!storage) return fallback;
    const testKey = `__du_storage_probe__`;
    storage.setItem(testKey, '1');
    storage.removeItem(testKey);
    return storage;
  } catch {
    return fallback;
  }
}

export const safeLocalStorage = {
  getItem(key: string): string | null {
    try {
      return resolveStorage('local').getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      resolveStorage('local').setItem(key, value);
    } catch {
      // fallback gracioso sem crash
    }
  },
  removeItem(key: string): void {
    try {
      resolveStorage('local').removeItem(key);
    } catch {
      // fallback gracioso sem crash
    }
  },
};

export const safeSessionStorage = {
  getItem(key: string): string | null {
    try {
      return resolveStorage('session').getItem(key);
    } catch {
      return null;
    }
  },
  setItem(key: string, value: string): void {
    try {
      resolveStorage('session').setItem(key, value);
    } catch {
      // fallback gracioso sem crash
    }
  },
  removeItem(key: string): void {
    try {
      resolveStorage('session').removeItem(key);
    } catch {
      // fallback gracioso sem crash
    }
  },
};
