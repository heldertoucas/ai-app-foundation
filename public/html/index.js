const TERMINAL_COMMANDS = new Set(['pnpm dev', 'pnpm start', 'pnpm foundation:check']);

async function openTerminal(rawCommand, buttonElement) {
  const cleanCommand = String(rawCommand).replace(/[\r\n\t]/g, '').trim();
  if (!TERMINAL_COMMANDS.has(cleanCommand)) return;

  copyLaunchCommand(cleanCommand, buttonElement);

  try {
    const apiUrl = window.location.origin.startsWith('http') ? '/api/open-terminal' : 'http://127.0.0.1:4300/api/open-terminal';
    const res = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ command: cleanCommand }),
    });
    if (res.ok) {
      showCopySuccess(buttonElement, 'Terminal Aberto!');
      return;
    }
  } catch {
    // Server offline fallback
  }
  showCopySuccess(buttonElement, 'Copiado! (⌘+V no Terminal)');
}

function copyLaunchCommand(rawCommand, buttonElement) {
  const cleanCommand = String(rawCommand).replace(/[\r\n\t]/g, '').trim();
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(cleanCommand).then(() => {
      showCopySuccess(buttonElement);
    }).catch(() => {
      fallbackCopy(cleanCommand, buttonElement);
    });
  } else {
    fallbackCopy(cleanCommand, buttonElement);
  }
}

function fallbackCopy(text, buttonElement) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.opacity = '0';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showCopySuccess(buttonElement);
  } catch (err) {
    console.error('Falha ao copiar:', err);
  }
  document.body.removeChild(textarea);
}

function showCopySuccess(btn, msg) {
  if (btn.dataset.copying) return;
  const original = [...btn.childNodes];
  btn.dataset.copying = 'true';
  const label = document.createElement('span');
  label.textContent = msg || 'Copiado';
  btn.replaceChildren(label);
  btn.classList.add('copied');
  setTimeout(() => {
    btn.replaceChildren(...original);
    btn.classList.remove('copied');
    delete btn.dataset.copying;
  }, 2500);
}

document.querySelectorAll('.terminal-launch-btn').forEach((btn) => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-command');
    if (cmd && TERMINAL_COMMANDS.has(cmd)) openTerminal(cmd, btn);
  });
});

const searchInput = document.getElementById('search-input');
const stackChips = document.querySelectorAll('[data-stack-filter]');
const kindChips = document.querySelectorAll('[data-kind-filter]');
const sections = document.querySelectorAll('.category-section');

let activeStack = 'all';
let activeKind = 'all';

function filterCards() {
  const query = (searchInput?.value || '').toLowerCase().trim();

  sections.forEach((section) => {
    const cards = section.querySelectorAll('.model-card');
    let visibleCount = 0;

    cards.forEach((card) => {
      const stacks = (card.getAttribute('data-stacks') || '').split(',');
      const kind = card.getAttribute('data-kind') || '';
      const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
      const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();

      const matchStack = activeStack === 'all' || stacks.includes(activeStack);
      const matchKind = activeKind === 'all' || kind === activeKind;
      const matchQuery = !query || keywords.includes(query) || title.includes(query);

      if (matchStack && matchKind && matchQuery) {
        card.style.display = 'flex';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    section.style.display = visibleCount > 0 ? 'block' : 'none';
  });
}

searchInput?.addEventListener('input', filterCards);

stackChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    stackChips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeStack = chip.getAttribute('data-stack-filter') || 'all';
    filterCards();
  });
});

kindChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    kindChips.forEach((c) => c.classList.remove('active'));
    chip.classList.add('active');
    activeKind = chip.getAttribute('data-kind-filter') || 'all';
    filterCards();
  });
});

const themeBtn = document.getElementById('theme-toggle');
themeBtn?.addEventListener('click', () => {
  const isDark = document.documentElement.classList.toggle('dark');
  themeBtn.textContent = isDark ? 'Escuro' : 'Claro';
  try {
    localStorage.setItem('du-theme-preference', isDark ? 'dark' : 'light');
  } catch {}
});

window.duActions = Object.assign(window.duActions || {}, {
  copyLaunchCommand: (...args) => copyLaunchCommand(...args),
});
