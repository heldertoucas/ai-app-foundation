
    (function() {
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
        document.getElementById('drawer-content').textContent = detailsHtml || 'Sem mais informação disponível.';
        const drawer = document.getElementById('info-drawer');
        if (drawer) drawer.classList.add('open');
      };

      window.duCloseInfoDrawer = function() {
        const drawer = document.getElementById('info-drawer');
        if (drawer) drawer.classList.remove('open');
      };
    })();
  

/* Generated action registry: replaces inline event handlers. */
window.duActions = Object.assign(window.duActions || {}, {
  "duOpenDossier": (...args) => (typeof duOpenDossier !== 'undefined' ? duOpenDossier(...args) : console.error('Missing action: duOpenDossier')),
  "duSelectMasterItem": (...args) => (typeof duSelectMasterItem !== 'undefined' ? duSelectMasterItem(...args) : console.error('Missing action: duSelectMasterItem')),
  "duSwitchOverviewMode": (...args) => (typeof duSwitchOverviewMode !== 'undefined' ? duSwitchOverviewMode(...args) : console.error('Missing action: duSwitchOverviewMode')),
});
