
    // Terminal Launch & Command Copy (macOS Native + Anti-Pastejacking)
    async function openTerminal(rawCommand, buttonElement) {
      const cleanCommand = String(rawCommand).replace(/[\r\n\t]/g, '').trim();

      // 1. Copia sempre para o clipboard primeiro (garantia anti-pastejacking)
      copyLaunchCommand(cleanCommand, buttonElement);

      // 2. Dispara abertura nativa do Terminal no macOS via API local (com fallback de origem)
      try {
        const apiUrl = window.location.origin.startsWith('http') ? '/api/open-terminal' : 'http://localhost:4300/api/open-terminal';
        const res = await fetch(apiUrl, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command: cleanCommand }),
        });

        if (res.ok) {
          showCopySuccess(buttonElement, 'Terminal Aberto!');
          return;
        }
      } catch (err) {
        // Ignora erro de rede quando o servidor Next.js ainda não está ligado
      }

      // 3. Fallback informativo e seguro se o servidor Next.js ainda não estiver em execução
      showCopySuccess(buttonElement, 'Copiado! (⌘+V no Terminal)');
    }

    // Safe Command Copy Helper (Anti-Pastejacking & CML-Defender Safe)
    function copyLaunchCommand(rawCommand, buttonElement) {
      // 1. Purga caracteres invisíveis e newlines para conformidade estrita anti-pastejacking
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
      const originalText = btn.innerHTML;
      const s = document.createElement('span'); s.textContent = msg || 'Copiado!'; btn.replaceChildren(s);
      btn.classList.add('copied');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('copied');
      }, 2500);
    }

    // Search & Technical Filter Logic
    const searchInput = document.getElementById('search-input');
    const filterChips = document.querySelectorAll('.filter-chip');
    const sections = document.querySelectorAll('.category-section');

    let currentFilter = 'all';

    function filterCards() {
      const query = (searchInput.value || '').toLowerCase().trim();

      sections.forEach(section => {
        const sectionCategory = section.getAttribute('data-section');
        const sectionCards = section.querySelectorAll('.model-card');
        let visibleCount = 0;

        sectionCards.forEach(card => {
          const cardCategory = card.getAttribute('data-category');
          const keywords = (card.getAttribute('data-keywords') || '').toLowerCase();
          const title = (card.querySelector('.card-title')?.textContent || '').toLowerCase();

          const matchesCategory = currentFilter === 'all' || cardCategory === currentFilter;
          const matchesQuery = !query || keywords.includes(query) || title.includes(query);

          if (matchesCategory && matchesQuery) {
            card.style.display = 'flex';
            visibleCount++;
          } else {
            card.style.display = 'none';
          }
        });

        // Oculta secção inteira se nenhum card corresponder
        section.style.display = visibleCount > 0 ? 'block' : 'none';
      });
    }

    searchInput.addEventListener('input', filterCards);

    filterChips.forEach(chip => {
      chip.addEventListener('click', () => {
        filterChips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        currentFilter = chip.getAttribute('data-category');
        filterCards();
      });
    });

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle');
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.classList.toggle('dark');
      themeBtn.textContent = isDark ? 'Escuro' : 'Claro';
      try {
        localStorage.setItem('du_theme', isDark ? 'dark' : 'light');
      } catch {}
    });

    // Restore saved theme
    try {
      const saved = localStorage.getItem('du_theme');
      if (saved === 'light') {
        document.documentElement.classList.remove('dark');
        themeBtn.textContent = 'Claro';
      }
    } catch {}
  

/* Generated action registry: replaces inline event handlers. */
window.duActions = Object.assign(window.duActions || {}, {
  "copyLaunchCommand": (...args) => (typeof copyLaunchCommand !== 'undefined' ? copyLaunchCommand(...args) : console.error('Missing action: copyLaunchCommand')),
  "openTerminal": (...args) => (typeof openTerminal !== 'undefined' ? openTerminal(...args) : console.error('Missing action: openTerminal')),
});
