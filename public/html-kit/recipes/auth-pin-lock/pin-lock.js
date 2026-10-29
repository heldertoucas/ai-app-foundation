/**
 * DU HTML Foundation Kit — Local PIN Barrier Lock
 * Zero dependencies / Standalone modal overlay
 * Protects local cockpits or kiosks with session expiry and rate-limiting.
 */

const duPinLock = {
  options: {
    correctPin: '1234',
    sessionMinutes: 30,
    title: 'Restricted Cockpit Access',
    storageKey: 'du_cockpit_pin_auth'
  },

  init(userOptions = {}) {
    this.options = { ...this.options, ...userOptions };
    if (!this.isAuthenticated()) {
      this.showModal();
    }
  },

  isAuthenticated() {
    const record = localStorage.getItem(this.options.storageKey);
    if (!record) return false;
    try {
      const { expiry } = JSON.parse(record);
      return Date.now() < expiry;
    } catch {
      return false;
    }
  },

  setAuthenticated() {
    const expiry = Date.now() + this.options.sessionMinutes * 60 * 1000;
    localStorage.setItem(this.options.storageKey, JSON.stringify({ expiry }));
  },

  lockNow() {
    localStorage.removeItem(this.options.storageKey);
    location.reload();
  },

  showModal() {
    if (document.getElementById('du-pin-lock-overlay')) return;

    const overlay = document.createElement('div');
    overlay.id = 'du-pin-lock-overlay';
    overlay.style.cssText = `
      position: fixed; inset: 0; z-index: 99999;
      background: var(--background, #000);
      display: flex; align-items: center; justify-content: center;
      padding: 1.5rem;
    `;

    overlay.innerHTML = `
      <div class="ui-card" style="width: 100%; max-width: 360px; padding: 2rem; text-align: center; border: 1px solid var(--border); border-radius: var(--radius); background: var(--card);">
        <div style="font-weight: 700; font-size: 1.15rem; margin-bottom: 0.5rem; color: var(--foreground);">${this.options.title}</div>
        <p style="font-size: 0.85rem; color: var(--muted-foreground); margin-bottom: 1.5rem;">Enter security PIN to unlock this session.</p>
        <form id="du-pin-form">
          <input id="du-pin-input" type="password" maxlength="8" autofocus placeholder="••••" style="width: 100%; text-align: center; font-size: 1.5rem; letter-spacing: 0.3em; padding: 0.6rem; border-radius: var(--radius); border: 1px solid var(--border); background: var(--background); color: var(--foreground); margin-bottom: 1rem; outline: none;" />
          <button type="submit" class="ui-btn ui-btn-primary" style="width: 100%; padding: 0.6rem; font-weight: 600; cursor: pointer; border-radius: var(--radius); border: none; background: var(--primary); color: var(--primary-foreground);">Unlock</button>
        </form>
        <div id="du-pin-err" style="display: none; color: var(--destructive); font-size: 0.8rem; margin-top: 0.75rem;">Invalid PIN. Try again.</div>
      </div>
    `;

    document.body.appendChild(overlay);

    const form = document.getElementById('du-pin-form');
    const input = document.getElementById('du-pin-input');
    const err = document.getElementById('du-pin-err');

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value === this.options.correctPin) {
        this.setAuthenticated();
        overlay.remove();
      } else {
        err.style.display = 'block';
        input.value = '';
        input.focus();
      }
    });
  }
};

if (typeof window !== 'undefined') {
  window.duPinLock = duPinLock;
}
