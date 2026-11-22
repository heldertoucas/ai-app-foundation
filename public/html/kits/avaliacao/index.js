
    // SHA-256 Hashes canónicos para verificação sem segredos em texto limpo
    const HASH_TRAINER_PIN = '03ac674216f3e15c761ee1a5e255f067953623c8b388b4459e13f978d7c846f4'; // '1234'
    const HASH_ADMIN_PASS  = '240be518fabd2724ddb6f04eeb1da5967448d7e831c08c8fa822809f74c720a9'; // 'admin123'
    const LOCKOUT_KEY = 'du_avaliacao_lockout';

    let currentPin = '';
    let currentUserRole = null;
    let isSyncing = false;
    let searchDebounceTimer = null;

    let traineesData = [
      { id: 'TRN-001', name: 'Ana Rodrigues Silva', nif: '234567891', status: 'concluido', startedAt: '14:02', score: 18.5, answers: '20/20' },
      { id: 'TRN-002', name: 'Carlos Manuel Ferreira', nif: '245678912', status: 'em_curso', startedAt: '14:05', score: null, answers: '14/20' },
      { id: 'TRN-003', name: 'Beatriz Costa Matos', nif: '256789123', status: 'concluido', startedAt: '14:01', score: 16.0, answers: '20/20' },
      { id: 'TRN-004', name: 'Diogo André Lourenço', nif: '267890234', status: 'em_curso', startedAt: '14:10', score: null, answers: '8/20' },
      { id: 'TRN-005', name: 'Elena Santos Antunes', nif: '278901345', status: 'pendente', startedAt: '-', score: null, answers: '0/20' },
      { id: 'TRN-006', name: 'Fernando Miguel Tavares', nif: '289012456', status: 'tempo_esgotado', startedAt: '14:00', score: 9.5, answers: '11/20' },
      { id: 'TRN-007', name: 'Helena Maria Soares', nif: '290123567', status: 'concluido', startedAt: '14:03', score: 19.0, answers: '20/20' },
      { id: 'TRN-008', name: 'João Pedro Videira', nif: '211234678', status: 'em_curso', startedAt: '14:08', score: null, answers: '16/20' },
      { id: 'TRN-009', name: 'Mariana Duarte Ramos', nif: '222345789', status: 'concluido', startedAt: '14:02', score: 17.0, answers: '20/20' },
      { id: 'TRN-010', name: 'Tiago Rafael Mendes', nif: '233456890', status: 'pendente', startedAt: '-', score: null, answers: '0/20' }
    ];

    async function sha256(str) {
      const buffer = new TextEncoder().encode(str);
      const hashBuffer = await crypto.subtle.digest('SHA-256', buffer);
      return Array.from(new Uint8Array(hashBuffer)).map(b => b.toString(16).padStart(2, '0')).join('');
    }

    function escapeHtml(str) {
      if (str === null || str === undefined) return '';
      return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
    }

    // Lockout Management
    function getLockout() {
      try {
        const raw = localStorage.getItem(LOCKOUT_KEY);
        if (!raw) return { failedAttempts: 0, lockoutUntil: 0 };
        return JSON.parse(raw);
      } catch {
        return { failedAttempts: 0, lockoutUntil: 0 };
      }
    }

    function recordFailedAttempt() {
      try {
        const prev = getLockout();
        const attempts = prev.failedAttempts + 1;
        const duration = attempts >= 10 ? 900000 : attempts >= 5 ? 60000 : 0;
        const lockoutUntil = duration > 0 ? Date.now() + duration : 0;
        localStorage.setItem(LOCKOUT_KEY, JSON.stringify({ failedAttempts: attempts, lockoutUntil }));
        return lockoutUntil;
      } catch { return 0; }
    }

    function clearLockout() {
      try { localStorage.removeItem(LOCKOUT_KEY); } catch {}
    }

    function checkLockout() {
      const rec = getLockout();
      const alertEl = document.getElementById('lockout-alert');
      const timerEl = document.getElementById('lockout-timer');
      if (rec.lockoutUntil > Date.now()) {
        const sec = Math.ceil((rec.lockoutUntil - Date.now()) / 1000);
        if (alertEl && timerEl) {
          timerEl.textContent = sec;
          alertEl.style.display = 'block';
        }
        return true;
      } else {
        if (alertEl) alertEl.style.display = 'none';
        return false;
      }
    }

    setInterval(checkLockout, 1000);

    // Keypad Handlers
    function updatePinDots() {
      for (let i = 0; i < 4; i++) {
        const dot = document.getElementById(`dot-${i}`);
        if (dot) {
          if (i < currentPin.length) dot.classList.add('filled');
          else dot.classList.remove('filled');
        }
      }
    }

    function pressPin(digit) {
      if (checkLockout()) return;
      if (currentPin.length < 4) {
        currentPin += digit;
        updatePinDots();
        document.getElementById('error-alert').style.display = 'none';
      }
    }

    function clearPin() {
      currentPin = '';
      updatePinDots();
    }

    function backspacePin() {
      currentPin = currentPin.slice(0, -1);
      updatePinDots();
    }

    function switchAuthTab(role) {
      const isTrainer = role === 'trainer';
      document.getElementById('trainer-auth-form').style.display = isTrainer ? 'block' : 'none';
      document.getElementById('admin-auth-form').style.display = isTrainer ? 'none' : 'block';
      
      const tBtn = document.getElementById('tab-trainer-btn');
      const aBtn = document.getElementById('tab-admin-btn');
      tBtn.className = isTrainer ? 'ui-btn ui-btn-secondary' : 'ui-btn ui-btn-ghost';
      aBtn.className = isTrainer ? 'ui-btn ui-btn-ghost' : 'ui-btn ui-btn-secondary';
      document.getElementById('error-alert').style.display = 'none';
    }

    async function validateTrainerPin() {
      if (checkLockout()) return;
      if (currentPin.length !== 4) {
        showError('Introduza os 4 dígitos do PIN.');
        return;
      }

      await new Promise(r => setTimeout(r, 400));
      const hash = await sha256(currentPin);
      if (hash === HASH_TRAINER_PIN) {
        clearLockout();
        currentUserRole = 'trainer';
        mountDashboard('trainer');
      } else {
        recordFailedAttempt();
        clearPin();
        showError('PIN incorreto. Tente novamente.');
        checkLockout();
      }
    }

    async function validateAdminPassword() {
      if (checkLockout()) return;
      const pass = document.getElementById('admin-pass-input').value;
      if (!pass) {
        showError('Introduza a password de administrador.');
        return;
      }

      await new Promise(r => setTimeout(r, 400));
      const hash = await sha256(pass);
      if (hash === HASH_ADMIN_PASS) {
        clearLockout();
        currentUserRole = 'admin';
        mountDashboard('admin');
      } else {
        recordFailedAttempt();
        showError('Password incorreta.');
        checkLockout();
      }
    }

    function showError(msg) {
      const err = document.getElementById('error-alert');
      if (err) {
        err.textContent = msg;
        err.style.display = 'block';
      }
    }

    // Deferred DOM Mounting
    function mountDashboard(role) {
      const appRoot = document.getElementById('app-root');
      const tmpl = document.getElementById('dashboard-view-template');
      appRoot.replaceChildren();
      appRoot.appendChild(tmpl.content.cloneNode(true));

      // Configurar modo de visualização
      const title = document.getElementById('view-title');
      const subtitle = document.getElementById('view-subtitle');
      const roleBadge = document.getElementById('role-badge');
      const adminSec = document.getElementById('admin-telemetry-section');

      if (role === 'admin') {
        title.textContent = 'Cockpit de Administração & Telemetria';
        subtitle.textContent = 'Monitorização central de sincronizações e quotas';
        roleBadge.textContent = 'Admin Master';
        adminSec.style.display = 'block';
      } else {
        title.textContent = 'Monitorização de Turma';
        subtitle.textContent = 'Acompanhamento de exames em tempo real';
        roleBadge.textContent = document.getElementById('action-code-input')?.value || 'FD-2026-TURMA4';
        adminSec.style.display = 'none';
      }

      // Event delegation na tabela
      document.getElementById('trainees-tbody').addEventListener('click', function(e) {
        const btn = e.target.closest('[data-action="reopen"]');
        if (btn) {
          const id = btn.getAttribute('data-id');
          reopenTrainee(id);
        }
      });

      startClock();
      renderTable();
      updateKpis();
    }

    function toggleViewMode() {
      const adminSec = document.getElementById('admin-telemetry-section');
      const isVisible = adminSec.style.display !== 'none';
      adminSec.style.display = isVisible ? 'none' : 'block';
      document.getElementById('view-title').textContent = isVisible ? 'Monitorização de Turma' : 'Cockpit de Administração & Telemetria';
    }

    function logout() {
      location.reload();
    }

    function startClock() {
      setInterval(() => {
        const clk = document.getElementById('live-clock');
        if (clk) clk.textContent = new Date().toLocaleTimeString('pt-PT');
      }, 1000);
    }

    function renderTable() {
      const tbody = document.getElementById('trainees-tbody');
      if (!tbody) return;
      const query = (document.getElementById('table-search-input')?.value || '').toLowerCase().trim();

      const filtered = traineesData.filter(t => 
        !query || t.name.toLowerCase().includes(query) || t.nif.includes(query) || t.id.toLowerCase().includes(query)
      );

      const cell = (text, className) => {
        const td = document.createElement('td');
        if (className) td.className = className;
        td.textContent = text;
        return td;
      };
      const STATUS = {
        em_curso: ['badge-live', 'Em Curso'],
        concluido: ['badge-concluido', 'Concluído'],
        pendente: ['badge-pendente', 'Pendente'],
      };
      tbody.replaceChildren(...filtered.map((t) => {
        const row = document.createElement('tr');
        const [badgeClass, badgeText] = STATUS[t.status] || ['badge-esgotado', 'Tempo Esgotado'];
        const badge = document.createElement('span');
        badge.className = badgeClass;
        badge.textContent = badgeText;
        const statusCell = document.createElement('td');
        statusCell.append(badge);

        const scoreCell = cell('', 'av-cell-end av-cell-mono');
        if (t.score !== null) {
          const score = document.createElement('strong');
          score.className = t.score >= 9.5 ? 'av-score-pass' : 'av-score-fail';
          score.textContent = t.score.toFixed(1);
          scoreCell.append(score);
        } else {
          scoreCell.textContent = '-';
        }

        const actionCell = cell('', 'av-cell-end');
        if (t.status === 'concluido' || t.status === 'tempo_esgotado') {
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'ui-btn ui-btn-ghost ui-btn-sm';
          button.dataset.action = 'reopen';
          button.dataset.id = t.id;
          button.textContent = 'Reabrir';
          actionCell.append(button);
        }

        const name = document.createElement('td');
        const strong = document.createElement('strong');
        strong.textContent = t.name;
        name.append(strong);

        row.append(
          cell(t.id, 'av-cell-id'),
          name,
          cell(t.nif, 'av-cell-mono av-cell-small av-cell-muted'),
          statusCell,
          cell(t.startedAt, 'av-cell-small av-cell-muted'),
          cell(t.answers, 'av-cell-mono av-cell-small'),
          scoreCell,
          actionCell,
        );
        return row;
      }));
    }

    function onSearchInput() {
      clearTimeout(searchDebounceTimer);
      searchDebounceTimer = setTimeout(renderTable, 150);
    }

    function reopenTrainee(id) {
      traineesData = traineesData.map(t => {
        if (t.id === id) {
          return { ...t, status: 'em_curso', score: null };
        }
        return t;
      });
      renderTable();
      updateKpis();
    }

    function updateKpis() {
      const total = traineesData.length;
      const inProg = traineesData.filter(t => t.status === 'em_curso').length;
      const comp = traineesData.filter(t => t.status === 'concluido').length;
      const compWithScore = traineesData.filter(t => t.status === 'concluido' && t.score !== null);
      const avg = compWithScore.length > 0 ? compWithScore.reduce((a, b) => a + b.score, 0) / compWithScore.length : 0;
      const rate = compWithScore.length > 0 ? (compWithScore.filter(t => t.score >= 9.5).length / compWithScore.length) * 100 : 0;

      const elTotal = document.getElementById('kpi-total');
      const elInProg = document.getElementById('kpi-in-progress');
      const elComp = document.getElementById('kpi-completed');
      const elApproval = document.getElementById('kpi-approval');
      const elAvg = document.getElementById('kpi-avg-score');

      if (elTotal) elTotal.textContent = total;
      if (elInProg) elInProg.textContent = inProg;
      if (elComp) elComp.textContent = comp;
      if (elApproval) elApproval.textContent = rate.toFixed(0) + '%';
      if (elAvg) elAvg.textContent = `Média: ${avg.toFixed(1)} / 20`;
    }

    async function triggerSync() {
      if (isSyncing) return;
      isSyncing = true;
      const btn = document.getElementById('sync-now-btn');
      btn.textContent = 'A sincronizar...';
      btn.disabled = true;

      await new Promise(r => setTimeout(r, 600));

      const sheets = document.getElementById('sheets-latency');
      const db = document.getElementById('db-latency');
      if (sheets) sheets.textContent = (Math.floor(Math.random() * 40) + 120) + ' ms';
      if (db) db.textContent = (Math.floor(Math.random() * 15) + 10) + ' ms';

      btn.textContent = 'Sincronizado!';
      setTimeout(() => {
        btn.textContent = 'Forçar Sincronização';
        btn.disabled = false;
        isSyncing = false;
      }, 1200);
    }

    // CSV Sanitizer com mitigação de injeção de fórmulas
    function exportCsv() {
      const sanitize = (val) => {
        let s = val === null || val === undefined ? '' : String(val);
        if (/^[=+\-@\t\r\n]/.test(s) || /^[=+\-@\t\r\n]/.test(s.trimStart())) s = "'" + s;
        return '"' + s.replace(/"/g, '""') + '"';
      };

      const headers = ['ID', 'Nome', 'NIF', 'Estado', 'Hora Início', 'Questões', 'Nota'];
      const rows = traineesData.map(t => [
        t.id, t.name, t.nif, t.status, t.startedAt, t.answers, t.score !== null ? t.score.toFixed(1) : '-'
      ]);

      const csvContent = [headers.map(sanitize).join(','), ...rows.map(r => r.map(sanitize).join(','))].join('\r\n');
      const blob = new Blob(['\ufeff' + csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'pauta-avaliacao-zero-build.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  

/* Generated action registry: replaces inline event handlers. */
window.duActions = Object.assign(window.duActions || {}, {
  "backspacePin": (...args) => (typeof backspacePin !== 'undefined' ? backspacePin(...args) : console.error('Missing action: backspacePin')),
  "clearPin": (...args) => (typeof clearPin !== 'undefined' ? clearPin(...args) : console.error('Missing action: clearPin')),
  "exportCsv": (...args) => (typeof exportCsv !== 'undefined' ? exportCsv(...args) : console.error('Missing action: exportCsv')),
  "logout": (...args) => (typeof logout !== 'undefined' ? logout(...args) : console.error('Missing action: logout')),
  "onSearchInput": (...args) => (typeof onSearchInput !== 'undefined' ? onSearchInput(...args) : console.error('Missing action: onSearchInput')),
  "pressPin": (...args) => (typeof pressPin !== 'undefined' ? pressPin(...args) : console.error('Missing action: pressPin')),
  "switchAuthTab": (...args) => (typeof switchAuthTab !== 'undefined' ? switchAuthTab(...args) : console.error('Missing action: switchAuthTab')),
  "toggleViewMode": (...args) => (typeof toggleViewMode !== 'undefined' ? toggleViewMode(...args) : console.error('Missing action: toggleViewMode')),
  "triggerSync": (...args) => (typeof triggerSync !== 'undefined' ? triggerSync(...args) : console.error('Missing action: triggerSync')),
  "validateAdminPassword": (...args) => (typeof validateAdminPassword !== 'undefined' ? validateAdminPassword(...args) : console.error('Missing action: validateAdminPassword')),
  "validateTrainerPin": (...args) => (typeof validateTrainerPin !== 'undefined' ? validateTrainerPin(...args) : console.error('Missing action: validateTrainerPin')),
});
