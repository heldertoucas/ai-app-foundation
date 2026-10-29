/**
 * DU HTML Foundation Kit — LocalStorage State Persistence
 * Zero dependencies / Lightweight reactive storage binder
 * Automatically saves and restores UI inputs, checkboxes, and tabs marked with [data-du-persist].
 */

const duStateSync = {
  namespace: 'du_app_state',

  init(customNamespace) {
    if (customNamespace) this.namespace = customNamespace;
    this.restore();
    this.bindEvents();
  },

  _getKey(element) {
    const key = element.getAttribute('data-du-persist') || element.id || element.name;
    return `${this.namespace}_${key}`;
  },

  save(element) {
    const key = this._getKey(element);
    let val;
    if (element.type === 'checkbox') {
      val = element.checked;
    } else {
      val = element.value;
    }
    localStorage.setItem(key, JSON.stringify(val));
  },

  restore() {
    document.querySelectorAll('[data-du-persist]').forEach((el) => {
      const key = this._getKey(el);
      const stored = localStorage.getItem(key);
      if (stored !== null) {
        try {
          const val = JSON.parse(stored);
          if (el.type === 'checkbox') {
            el.checked = Boolean(val);
          } else {
            el.value = val;
            // Dispara evento input para ativar filtros de tabela se existirem
            el.dispatchEvent(new Event('input', { bubbles: true }));
          }
        } catch {
          // ignore corrupted data
        }
      }
    });
  },

  bindEvents() {
    document.addEventListener('input', (e) => {
      if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-du-persist')) {
        this.save(e.target);
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target && e.target.hasAttribute && e.target.hasAttribute('data-du-persist')) {
        this.save(e.target);
      }
    });
  },

  clear() {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(this.namespace))
      .forEach((k) => localStorage.removeItem(k));
  }
};

document.addEventListener('DOMContentLoaded', () => {
  duStateSync.init();
});

if (typeof window !== 'undefined') {
  window.duStateSync = duStateSync;
}
