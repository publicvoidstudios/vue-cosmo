import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    port: 80,
    proxy: {
      '/api': {
        target: 'http://cosmmedic.ru:3000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
