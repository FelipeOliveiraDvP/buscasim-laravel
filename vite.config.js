import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
  esbuild: {
    target: 'esnext',
    platform: 'linux',
  },
  plugins: [
    laravel({
      input: ['resources/src/index.tsx'],
      refresh: true,
    }),
    react(),
  ],
  resolve: {
    alias: {
      '@': '/resources/src',
    },
  },
});
