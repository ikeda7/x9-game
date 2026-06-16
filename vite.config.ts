import process from 'node:process';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig, type UserConfig } from 'vite';

// https://vite.dev/config/
const userConfig: UserConfig = {
  plugins: [react(), tailwindcss()],
};

if (process.env.NODE_ENV === 'development') {
  userConfig.server = {
    host: '0.0.0.0',
    port: 3000,
  };
}

export default defineConfig(userConfig);
