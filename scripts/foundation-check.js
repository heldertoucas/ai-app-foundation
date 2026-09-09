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

console.log('');
if (passed) {
  console.log('✅ All Foundation Health Checks PASSED cleanly!\n');
  process.exit(0);
} else {
  console.error('❌ Foundation Health Check FAILED!\n');
  process.exit(1);
}
