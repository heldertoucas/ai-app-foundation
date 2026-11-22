const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const REPO_DIR = path.resolve(__dirname, '../public/screenshots');

[REPO_DIR].forEach((dir) => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

async function capture(page, url, filename, preAction = null) {
  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 15000 });
    if (preAction) await preAction(page);
    await page.waitForTimeout(600);
    const repoPath = path.join(REPO_DIR, filename);
    await page.screenshot({ path: repoPath, fullPage: false });
    console.log(`✓ Captured ${filename} (${fs.statSync(repoPath).size} bytes)`);
  } catch (err) {
    console.error(`✗ Error on ${filename}:`, err.message);
  }
}

async function run() {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    deviceScaleFactor: 2,
  });
  const page = await context.newPage();

  // Baseline navigation to establish origin
  await page.goto('http://localhost:4300/', { waitUntil: 'networkidle' });

  // 1. Landing Page
  await capture(page, 'http://localhost:4300/', 'landing-page.png');

  // 2. Mission Control
  await capture(page, 'http://localhost:4300/dashboard', 'mission-control-dashboard.png');

  // 3. Métricas
  await capture(page, 'http://localhost:4300/dashboard/metrics', 'dashboard-metrics.png');

  // 4. Charts
  await capture(page, 'http://localhost:4300/dashboard/charts', 'dashboard-charts.png');

  // 5. Matrix
  await capture(page, 'http://localhost:4300/dashboard/matrix', 'dashboard-matrix.png');

  // 6. Workflow
  await capture(page, 'http://localhost:4300/dashboard/workflow', 'dashboard-workflow.png');

  // 7. Agents
  await capture(page, 'http://localhost:4300/dashboard/agents', 'dashboard-agents.png');

  // 8. Inspection
  await capture(page, 'http://localhost:4300/dashboard/inspection', 'dashboard-inspection.png');

  // 9. Actions
  await capture(page, 'http://localhost:4300/dashboard/actions', 'dashboard-actions.png');

  // 10. Library Master Catalog
  await capture(page, 'http://localhost:4300/dashboard/library', 'component-library.png');

  // 11. Futuro Digital
  await capture(page, 'http://localhost:4300/futuro-digital', 'futuro-digital-portal.png');

  // 12. Avaliação Login
  await capture(page, 'http://localhost:4300/avaliacao-dashboard', 'app-avaliacao-login.png');

  // 13. Avaliação Formador
  await capture(page, 'http://localhost:4300/avaliacao-dashboard/trainer', 'app-avaliacao-trainer.png', async (p) => {
    await p.evaluate(() => {
      sessionStorage.setItem('du_avaliacao_session', JSON.stringify({
        role: 'trainer',
        actionCode: 'FD-2026-TURMA4',
        name: 'Formador CMLisboa',
        loginAt: Date.now()
      }));
    });
    await p.reload({ waitUntil: 'networkidle' });
  });

  // 14. Avaliação Admin
  await capture(page, 'http://localhost:4300/avaliacao-dashboard/admin', 'app-avaliacao-admin.png', async (p) => {
    await p.evaluate(() => {
      sessionStorage.setItem('du_avaliacao_session', JSON.stringify({
        role: 'admin',
        name: 'Administrador de Sistema',
        loginAt: Date.now()
      }));
    });
    await p.reload({ waitUntil: 'networkidle' });
  });

  // 15. Zero-Build Avaliação Standalone
  await capture(page, 'http://localhost:4300/html/kits/avaliacao/index.html', 'du-avaliacao-zero-build.png', async (p) => {
    await p.evaluate(() => {
      if (typeof mountDashboard === 'function') {
        currentUserRole = 'trainer';
        mountDashboard('trainer');
      }
    });
  });

  // 16. Zero-Build DU Dashboard
  await capture(page, 'http://localhost:4300/html/kits/mission-control/index.html', 'du-dashboard-standalone.png');

  // 17. Zero-Build Starter Cockpit
  await capture(page, 'http://localhost:4300/html/kits/cockpit-starter/index.html', 'starter-cockpit.png');

  // 18. Zero-Build App Shell
  await capture(page, 'http://localhost:4300/html/kits/dashboard-starter/index.html', 'template-app-shell.png');

  // 19. Zero-Build Canónico HTML App
  await capture(page, 'http://localhost:4300/blueprints/dashboard/mockups/reference.html', 'html-app-template.png');

  await browser.close();
  console.log('ALL SCREENSHOTS CAPTURED!');
}

run();
