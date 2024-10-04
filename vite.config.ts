import path from 'path';
import { defineConfig } from 'vite';
import { TanStackRouterVite } from '@tanstack/router-plugin/vite';
import { PluginOption } from 'vite';
import viteReact from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [viteReact(), TanStackRouterVite() as PluginOption],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
