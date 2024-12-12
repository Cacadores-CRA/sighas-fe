import path from 'path';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import viteReact from '@vitejs/plugin-react';
import { defineConfig, PluginOption } from 'vite';

export default defineConfig({
  plugins: [viteReact(), TanStackRouterVite() as PluginOption],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
