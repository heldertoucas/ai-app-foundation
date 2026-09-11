import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    fileParallelism: false,
    pool: 'forks',
    poolOptions: {
      forks: {
        singleFork: true,
      },
    },
    exclude: ['**/node_modules/**', '**/tests/e2e/**', '**/.next/**'],
    include: ['tests/**/*.test.ts', 'lib/**/__tests__/**/*.test.ts'],

    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});

