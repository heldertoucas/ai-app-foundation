
    (function() {
      const THEME_KEY = 'du-theme-preference';
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

      window.duSwitchOverviewMode = function(mode) {
        const bentoEl = document.getElementById('overview-bento-layout');
        const masterDetailEl = document.getElementById('overview-master-detail-layout');
        const bentoBtn = document.getElementById('btn-mode-bento');
        const mdBtn = document.getElementById('btn-mode-masterdetail');

        if (mode === 'bento') {
          bentoEl.style.display = 'flex';
          masterDetailEl.style.display = 'none';
          bentoBtn.classList.add('active');
          mdBtn.classList.remove('active');
        } else {
          bentoEl.style.display = 'none';
          masterDetailEl.style.display = 'grid';
          bentoBtn.classList.remove('active');
          mdBtn.classList.add('active');
        }
      };

      window.duSelectMasterItem = function(itemEl, id, name, domain, status, port, desc, sessions) {
        document.querySelectorAll('.du-master-item').forEach(el => el.classList.remove('active'));
        itemEl.classList.add('active');

        document.getElementById('md-detail-id').textContent = id;
        document.getElementById('md-detail-name').textContent = name;
        document.getElementById('md-detail-domain').textContent = domain;
        document.getElementById('md-detail-status').textContent = status;
        document.getElementById('md-detail-port').textContent = port;
        document.getElementById('md-detail-desc').textContent = desc;
        document.getElementById('md-detail-sessions').textContent = sessions;
      };

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

      window.duOpenDossier = function(id, name, domain, desc, path) {
        document.getElementById('dossier-id').textContent = id;
        document.getElementById('dossier-name').textContent = name;
        document.getElementById('dossier-domain').textContent = domain;
        document.getElementById('dossier-desc').textContent = desc;
        document.getElementById('dossier-path').textContent = path;
        window.duOpenModal('dossier-modal');
      };

      window.duOpenInfoDrawer = function(title, subtitle, type, detailsHtml) {
        document.getElementById('drawer-title').textContent = title;
        document.getElementById('drawer-subtitle').textContent = subtitle || '';
        document.getElementById('drawer-badge').textContent = type || 'Info';
        document.getElementById('drawer-content').innerHTML = detailsHtml || '<p>No further information available.</p>';
        const drawer = document.getElementById('info-drawer');
        if (drawer) drawer.classList.add('open');
      };

      window.duCloseInfoDrawer = function() {
        const drawer = document.getElementById('info-drawer');
        if (drawer) drawer.classList.remove('open');
      };

      document.addEventListener('click', (e) => {
        const navBtn = e.target.closest('[data-du-nav-target]');
        if (navBtn) {
          window.duSwitchView(navBtn.getAttribute('data-du-nav-target'));
          return;
        }

        const modalOpenBtn = e.target.closest('[data-du-modal-open]');
        if (modalOpenBtn) {
          window.duOpenModal(modalOpenBtn.getAttribute('data-du-modal-open'));
          return;
        }

        const modalCloseBtn = e.target.closest('[data-du-modal-close]');
        if (modalCloseBtn) {
          window.duCloseModal(modalCloseBtn);
          return;
        }

        const drawerOpenBtn = e.target.closest('[data-du-drawer-open]');
        if (drawerOpenBtn) {
          const drawerId = drawerOpenBtn.getAttribute('data-du-drawer-open');
          const drawer = document.getElementById(drawerId);
          if (drawer) drawer.classList.add('open');
          return;
        }

        const drawerCloseBtn = e.target.closest('[data-du-drawer-close]');
        if (drawerCloseBtn) {
          window.duCloseInfoDrawer();
          return;
        }

        // Close drawer when clicking backdrop outside drawer panel
        if (e.target.classList.contains('du-drawer-overlay')) {
          e.target.classList.remove('open');
          return;
        }


        const copyBtn = e.target.closest('[data-du-copy]');
        if (copyBtn) {
          const text = copyBtn.getAttribute('data-du-copy');
          navigator.clipboard.writeText(text).then(() => {
            const originalText = copyBtn.textContent;
            copyBtn.textContent = 'Copied!';
            setTimeout(() => { copyBtn.textContent = originalText; }, 1500);
          });
          return;
        }

        const chipBtn = e.target.closest('[data-du-status-filter]');
        if (chipBtn) {
          const group = chipBtn.closest('.du-status-chips-group');
          const tableId = group?.getAttribute('data-du-filter-target') || chipBtn.getAttribute('data-du-filter-target');
          const statusVal = chipBtn.getAttribute('data-du-status-filter');
          if (group) group.querySelectorAll('.du-status-chip').forEach(c => c.classList.remove('active'));
          chipBtn.classList.add('active');

          if (tableId) {
            const table = document.getElementById(tableId);
            if (table) {
              table.querySelectorAll('tbody tr').forEach(row => {
                const rowStatus = row.getAttribute('data-status');
                row.style.display = (!statusVal || statusVal === 'all' || rowStatus === statusVal) ? '' : 'none';
              });
            }
          }
        }
      });

      document.addEventListener('input', (e) => {
        const searchInput = e.target.closest('[data-du-filter-target]');
        if (searchInput && searchInput.tagName === 'INPUT') {
          const targetTableId = searchInput.getAttribute('data-du-filter-target');
          const query = searchInput.value.toLowerCase().trim();
          const table = document.getElementById(targetTableId);
          if (table) {
            table.querySelectorAll('tbody tr').forEach(row => {
              row.style.display = row.textContent.toLowerCase().includes(query) ? '' : 'none';
            });
          }
        }
      });

      document.addEventListener('keydown', (e) => {
        if ((e.key === 'k' && (e.metaKey || e.ctrlKey)) || (e.key === '/' && document.activeElement.tagName !== 'INPUT')) {
          e.preventDefault();
          window.duOpenModal('du-command-dialog');
          const input = document.getElementById('du-command-input');
          if (input) input.focus();
        }
        if (e.key === 'Escape') {
          document.querySelectorAll('.du-modal-overlay.open').forEach(m => m.classList.remove('open'));
          document.querySelectorAll('.du-drawer-overlay.open').forEach(d => d.classList.remove('open'));
        }
      });
    })();
  

/* Generated action registry: replaces inline event handlers. */
window.duActions = Object.assign(window.duActions || {}, {
  "duOpenDossier": (...args) => (typeof duOpenDossier !== 'undefined' ? duOpenDossier(...args) : console.error('Missing action: duOpenDossier')),
  "duSelectMasterItem": (...args) => (typeof duSelectMasterItem !== 'undefined' ? duSelectMasterItem(...args) : console.error('Missing action: duSelectMasterItem')),
  "duSwitchOverviewMode": (...args) => (typeof duSwitchOverviewMode !== 'undefined' ? duSwitchOverviewMode(...args) : console.error('Missing action: duSwitchOverviewMode')),
});
