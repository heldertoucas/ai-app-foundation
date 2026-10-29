/**
 * DU HTML Foundation Kit — Micro-Runtime
 * Zero dependencies / <120 LOC
 *
 * Capabilities:
 * 1. Dark/Light theme toggle with LocalStorage persistence.
 * 2. Declarative view routing (data-du-nav-target="view-id", updates breadcrumb).
 * 3. Declarative instant table search filter (data-du-filter-target="table-id").
 * 4. Declarative status filter chips (data-du-status-filter="status-value").
 * 5. Modal manager (data-du-modal-open="modal-id", data-du-modal-close).
 * 6. Copy-to-clipboard with tactile feedback (data-du-copy="text").
 * 7. Keyboard shortcuts (Ctrl+K or / for command palette, Esc to close modals).
 */
(function() {
  const THEME_KEY = 'du-theme-preference';

  // 1. Theme Management
  const savedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }

  window.duToggleTheme = function() {
    const isDark = document.documentElement.classList.toggle('dark');
    localStorage.setItem(THEME_KEY, isDark ? 'dark' : 'light');
  };

  // 2. Declarative View Switching
  window.duSwitchView = function(viewId, customTitle) {
    document.querySelectorAll('.du-view').forEach(v => v.classList.remove('active'));
    document.querySelectorAll('.du-nav-item').forEach(btn => btn.classList.remove('active'));

    const targetView = document.getElementById(viewId);
    if (targetView) targetView.classList.add('active');

    const activeNav = document.querySelector(`[data-du-nav-target="${viewId}"]`);
    if (activeNav) {
      activeNav.classList.add('active');
      const title = customTitle || activeNav.getAttribute('data-du-nav-title') || activeNav.querySelector('.du-nav-label')?.textContent || viewId;
      const breadcrumbEl = document.getElementById('du-breadcrumb-title');
      if (breadcrumbEl) breadcrumbEl.textContent = title;
    }
  };

  // 3. Tab Switching (.ui-tabs)
  window.duActivateTab = function(triggerEl, targetId) {
    const parent = triggerEl.closest('.ui-tabs') || document;
    parent.querySelectorAll('.ui-tab-trigger').forEach(el => el.classList.remove('active'));
    parent.querySelectorAll('.ui-tab-content').forEach(el => el.classList.remove('active'));
    triggerEl.classList.add('active');
    const target = document.getElementById(targetId);
    if (target) target.classList.add('active');
  };

  // 4. Modal Management
  window.duOpenModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      if (typeof modal.showModal === 'function') {
        modal.showModal();
      } else {
        modal.classList.add('open');
      }
    }
  };

  window.duCloseModal = function(modalId) {
    const modal = typeof modalId === 'string' ? document.getElementById(modalId) : modalId.closest('.du-modal-overlay, dialog');
    if (modal) {
      if (typeof modal.close === 'function') {
        modal.close();
      } else {
        modal.classList.remove('open');
      }
    }
  };

  // 5. Global Delegated Event Listeners
  document.addEventListener('click', (e) => {
    // Navigation items
    const navBtn = e.target.closest('[data-du-nav-target]');
    if (navBtn) {
      const viewId = navBtn.getAttribute('data-du-nav-target');
      window.duSwitchView(viewId);
      return;
    }

    // Modal triggers
    const modalOpenBtn = e.target.closest('[data-du-modal-open]');
    if (modalOpenBtn) {
      const modalId = modalOpenBtn.getAttribute('data-du-modal-open');
      window.duOpenModal(modalId);
      return;
    }

    const modalCloseBtn = e.target.closest('[data-du-modal-close]');
    if (modalCloseBtn) {
      window.duCloseModal(modalCloseBtn);
      return;
    }

    // Drawer triggers
    const drawerOpenBtn = e.target.closest('[data-du-drawer-open]');
    if (drawerOpenBtn) {
      const drawerId = drawerOpenBtn.getAttribute('data-du-drawer-open');
      const drawer = document.getElementById(drawerId);
      if (drawer) drawer.classList.add('open');
      return;
    }

    const drawerCloseBtn = e.target.closest('[data-du-drawer-close]');
    if (drawerCloseBtn) {
      const drawer = drawerCloseBtn.closest('.du-drawer-overlay');
      if (drawer) drawer.classList.remove('open');
      return;
    }

    if (e.target.classList.contains('du-drawer-overlay')) {
      e.target.classList.remove('open');
      return;
    }


    // Copy to clipboard
    const copyBtn = e.target.closest('[data-du-copy]');
    if (copyBtn) {
      const text = copyBtn.getAttribute('data-du-copy');
      navigator.clipboard.writeText(text).then(() => {
        const originalText = copyBtn.textContent;
        copyBtn.textContent = 'Copied!';
        copyBtn.style.opacity = '0.7';
        setTimeout(() => {
          copyBtn.textContent = originalText;
          copyBtn.style.opacity = '1';
        }, 1500);
      });
      return;
    }

    // Status filter chips
    const chipBtn = e.target.closest('[data-du-status-filter]');
    if (chipBtn) {
      const group = chipBtn.closest('.du-status-chips-group');
      const tableId = group?.getAttribute('data-du-filter-target') || chipBtn.getAttribute('data-du-filter-target');
      const statusVal = chipBtn.getAttribute('data-du-status-filter');
      
      if (group) {
        group.querySelectorAll('.du-status-chip').forEach(c => c.classList.remove('active'));
      }
      chipBtn.classList.add('active');

      if (tableId) {
        const table = document.getElementById(tableId);
        if (table) {
          const rows = table.querySelectorAll('tbody tr');
          rows.forEach(row => {
            const rowStatus = row.getAttribute('data-status');
            if (!statusVal || statusVal === 'all' || rowStatus === statusVal) {
              row.style.display = '';
            } else {
              row.style.display = 'none';
            }
          });
        }
      }
    }
  });

  // 6. Live Search Filtering
  document.addEventListener('input', (e) => {
    const searchInput = e.target.closest('[data-du-filter-target]');
    if (searchInput && searchInput.tagName === 'INPUT') {
      const targetTableId = searchInput.getAttribute('data-du-filter-target');
      const query = searchInput.value.toLowerCase().trim();
      const table = document.getElementById(targetTableId);
      if (table) {
        const rows = table.querySelectorAll('tbody tr');
        rows.forEach(row => {
          const rowText = row.textContent.toLowerCase();
          row.style.display = rowText.includes(query) ? '' : 'none';
        });
      }
    }
  });

  // 7. Keyboard Shortcuts (Ctrl+K or / to search, Esc to close modal)
  document.addEventListener('keydown', (e) => {
    if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
      e.preventDefault();
      const searchDialog = document.getElementById('du-command-dialog');
      if (searchDialog) {
        window.duOpenModal('du-command-dialog');
        const input = searchDialog.querySelector('input');
        if (input) input.focus();
      }
    }
    if (e.key === 'Escape') {
      document.querySelectorAll('.du-modal-overlay.open').forEach(m => m.classList.remove('open'));
    }
  });
})();
