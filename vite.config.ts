import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [react(), tailwindcss()],
  ...(command === 'serve' && {
    server: {
      host: '0.0.0.0',
      port: 3000,
    },
  }),
}));
