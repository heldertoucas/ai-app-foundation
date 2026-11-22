/**
 * DU HTML Foundation Kit — Local PIN Barrier Lock
 * AVISO: auth-pin é uma barreira de conveniência no browser. Não protege dados.
 * Zero dependencies / Standalone modal overlay
 */

const duPinLock = {
  options: {
    correctPin: '1234',
    sessionMinutes: 30,
    title: 'Acesso Restrito ao Cockpit',
    storageKey: 'du_cockpit_pin_auth',
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
    overlay.className = 'du-pin-overlay';

    const card = document.createElement('div');
    card.className = 'ui-card du-pin-card';

    const title = document.createElement('div');
    title.className = 'du-pin-title';
    title.textContent = String(this.options.title || '');

    const desc = document.createElement('p');
    desc.className = 'du-pin-desc';
    desc.textContent = 'Introduza o PIN de segurança para desbloquear esta sessão.';

    const form = document.createElement('form');
    form.id = 'du-pin-form';

    const input = document.createElement('input');
    input.id = 'du-pin-input';
    input.type = 'password';
    input.maxLength = 8;
    input.autofocus = true;
    input.placeholder = '••••';
    input.setAttribute('aria-label', 'PIN de segurança');
    input.className = 'du-pin-input';

    const submit = document.createElement('button');
    submit.type = 'submit';
    submit.className = 'ui-btn du-pin-submit';
    submit.textContent = 'Desbloquear';

    const err = document.createElement('div');
    err.id = 'du-pin-err';
    err.className = 'du-pin-err';
    err.textContent = 'PIN incorreto. Tente novamente.';

    form.append(input, submit);
    card.append(title, desc, form, err);
    overlay.append(card);
    document.body.appendChild(overlay);

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (input.value === this.options.correctPin) {
        this.setAuthenticated();
        overlay.remove();
      } else {
        err.classList.add('is-visible');
        input.value = '';
        input.focus();
      }
    });
  },
};

if (typeof window !== 'undefined') {
  window.duPinLock = duPinLock;
}
