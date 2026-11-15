const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

function ensureWal(dbRelPath) {
  const dbPath = path.resolve(__dirname, '..', dbRelPath);
  if (!fs.existsSync(dbPath)) return;

  try {
    // Try sqlite3 CLI if available
    execSync(`sqlite3 "${dbPath}" "PRAGMA journal_mode = WAL; PRAGMA synchronous = NORMAL;"`, { stdio: 'pipe' });
  } catch {
    // Alternatively, verify header bytes or use native fallback
  }

  const buf = fs.readFileSync(dbPath);
  if (buf[18] === 2 && buf[19] === 2) {
    console.log(`  ✓ SQLite WAL mode active on ${dbRelPath} (header bytes: 2 2)`);
  } else {
    console.warn(`  ⚠️ Could not verify WAL header on ${dbRelPath}`);
  }
}

ensureWal('prisma/dev.db');
ensureWal('dev.db');
