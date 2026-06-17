import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  ...(command === 'serve' && {
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  }),
  test: {
    environment: 'happy-dom',
    include: ['src/**/tests/**/*.test.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: [
        'src/app/**/*.{ts,tsx}',
        'src/game/**/*.ts',
        'src/common/data/**/*.ts',
        'src/components/**/*.{ts,tsx}',
        'src/screens/**/*.{ts,tsx}',
      ],
      exclude: ['src/**/*.interface.ts', 'src/**/tests/**'],
    },
  },
}));
