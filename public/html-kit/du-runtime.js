/**
 * DU HTML Foundation Kit — Micro-Runtime (<50 LOC)
 * Theme toggle + LocalStorage persistence + Shortcut wiring + Native Dialog
 */
(function() {
  const THEME_KEY = 'du-theme-preference';

  // 1. Initialize Theme from localStorage or System Preference
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  // 2. Global Toggle Theme Function
  window.duToggleTheme = function() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  };

  // 3. Tab switching helper for .ui-tabs
  window.duActivateTab = function(triggerEl, targetId) {
    const parent = triggerEl.closest('.ui-tabs') || document;
    parent.querySelectorAll('.ui-tab-trigger').forEach(el => el.classList.remove('active'));
    parent.querySelectorAll('.ui-tab-content').forEach(el => el.classList.remove('active'));
    triggerEl.classList.add('active');
    const target = document.getElementById(targetId);
    if (target) target.classList.add('active');
  };

  // 4. Keyboard Shortcuts (/ or Ctrl+K for search, Escape for dialogs)
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
      e.preventDefault();
      const searchDialog = document.getElementById('du-command-dialog');
      if (searchDialog && typeof searchDialog.showModal === 'function') {
        searchDialog.showModal();
        const input = searchDialog.querySelector('input');
        if (input) input.focus();
      }
    }
  });
})();
