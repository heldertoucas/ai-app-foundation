const fs = require('fs');
const path = require('path');

console.log('🔍 Running Foundation Health Check...\n');

let passed = true;

function check(name, condition, errorMsg) {
  if (condition) {
    console.log('  ✓ ' + name);
  } else {
    console.error('  ❌ ' + name + ': ' + errorMsg);
    passed = false;
  }
}

// 1. React / Next.js Foundation Checks
check('Next.js App Router', fs.existsSync(path.join(__dirname, '../app')), 'Missing app directory');

const envPath = path.join(__dirname, '../.env');
const envContent = fs.existsSync(envPath) ? fs.readFileSync(envPath, 'utf-8') : '';
check('SQLite Connection string', envContent.includes('connection_limit=1&busy_timeout=10000'), 'DATABASE_URL not using SQLite WAL parameters');

const vitestPath = path.join(__dirname, '../vitest.config.ts');
const vitestContent = fs.existsSync(vitestPath) ? fs.readFileSync(vitestPath, 'utf-8') : '';
check('Vitest singleThread pool', vitestContent.includes('singleThread: true'), 'vitest.config.ts missing singleThread setting');

check('AGENTS.md present', fs.existsSync(path.join(__dirname, '../AGENTS.md')), 'Missing AGENTS.md');
check('FOUNDATION.md present', fs.existsSync(path.join(__dirname, '../FOUNDATION.md')), 'Missing FOUNDATION.md');
check('.mcp.json present', fs.existsSync(path.join(__dirname, '../.mcp.json')), 'Missing .mcp.json');

check('No Dockerfile', !fs.existsSync(path.join(__dirname, '../Dockerfile')), 'Dockerfile found (violates zero-Docker default invariant)');

const pkg = JSON.parse(fs.readFileSync(path.join(__dirname, '../package.json'), 'utf-8'));
const prohibited = ['docker', 'sentry', 'clerk'];
const deps = Object.keys(pkg.dependencies || {}).concat(Object.keys(pkg.devDependencies || {}));
const foundProhibited = deps.filter(d => prohibited.some(p => d.includes(p)));
check('Dependency budget / Zero SaaS', foundProhibited.length === 0, 'Prohibited SaaS dependencies found: ' + foundProhibited.join(', '));

// 2. HTML Foundation Kit Checks (Symmetry & Parity)
const htmlKitDir = path.join(__dirname, '../public/html-kit');
check('HTML Kit Core Assets present', 
  fs.existsSync(path.join(htmlKitDir, 'tokens.css')) &&
  fs.existsSync(path.join(htmlKitDir, 'du-components.css')) &&
  fs.existsSync(path.join(htmlKitDir, 'du-runtime.js')) &&
  fs.existsSync(path.join(htmlKitDir, 'vendor/shadcn-html.all.css')),
  'Missing core assets in public/html-kit/'
);

check('HTML Kit Starter Templates present',
  fs.existsSync(path.join(htmlKitDir, 'templates/du-html-app-template.html')) &&
  fs.existsSync(path.join(htmlKitDir, 'templates/template-app-shell.html')),
  'Missing reference templates in public/html-kit/templates/'
);

check('HTML Kit Recipes present',
  fs.existsSync(path.join(htmlKitDir, 'recipes/sse-telemetry/recipe.json')),
  'Missing recipes structure in public/html-kit/recipes/'
);

// 3. Token Parity Verification (globals.css vs tokens.css)
const globalsCssPath = path.join(__dirname, '../app/globals.css');
const tokensCssPath = path.join(htmlKitDir, 'tokens.css');
if (fs.existsSync(globalsCssPath) && fs.existsSync(tokensCssPath)) {
  const globalsCss = fs.readFileSync(globalsCssPath, 'utf-8');
  const tokensCss = fs.readFileSync(tokensCssPath, 'utf-8');

  const requiredTokens = [
    '--status-live',
    '--status-drift',
    '--status-missing',
    '--status-unsupported'
  ];

  const missingInGlobals = requiredTokens.filter(t => !globalsCss.includes(t));
  const missingInTokens = requiredTokens.filter(t => !tokensCss.includes(t));

  check('Token Parity (Status & Telemetry)',
    missingInGlobals.length === 0 && missingInTokens.length === 0,
    `Missing tokens: globals.css [${missingInGlobals.join(', ')}], tokens.css [${missingInTokens.join(', ')}]`
  );
}

console.log('');
if (passed) {
  console.log('✅ All Foundation Health Checks (React + HTML) PASSED cleanly!\n');
  process.exit(0);
} else {
  console.error('❌ Foundation Health Check FAILED!\n');
  process.exit(1);
}
