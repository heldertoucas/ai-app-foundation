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
    alias: {
      '@': path.resolve(__dirname, './'),
    },
  },
});
