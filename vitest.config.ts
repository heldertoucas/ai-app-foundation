import { defineConfig } from 'vitest/config';
import path from 'path';

export default defineConfig({
  test: {
    environment: 'node',
    poolOptions: {
      threads: {
        singleThread: true,
      },
    },
    exclude: ['**/node_modules/**', '**/tests/e2e/**'],
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
