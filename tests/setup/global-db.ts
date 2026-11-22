import { execFileSync } from 'node:child_process';
import { rmSync } from 'node:fs';
import path from 'node:path';

const TEST_DB = path.resolve(__dirname, '../../prisma/test.db');
const clean = () => {
  for (const suffix of ['', '-wal', '-shm', '-journal']) rmSync(`${TEST_DB}${suffix}`, { force: true });
};

export default function setup() {
  clean();
  execFileSync('pnpm', ['exec', 'prisma', 'db', 'push', '--skip-generate', '--accept-data-loss'], {
    env: { ...process.env, DATABASE_URL: `file:${TEST_DB}` },
    stdio: 'pipe',
  });
  return clean;
}
