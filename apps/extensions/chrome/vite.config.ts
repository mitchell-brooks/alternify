import { resolve } from 'path';
import { defineConfig } from 'vite';
import preact from '@preact/preset-vite';
import webExtension from 'vite-plugin-web-extension';
import { chromeExtension } from 'vite-plugin-chrome-extension';

// https://vitejs.dev/config/
export default defineConfig({
  esbuild: {
    jsxFactory: 'h',
    jsxFragment: 'Fragment',
    jsxInject: `import { h, Fragment } from 'preact'`,
  },
  root: 'src',
  build: {
    outDir: resolve(__dirname, 'dist'),
    emptyOutDir: true,
    rollupOptions: { external: ['@styles', '@constants'] },
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@styles': resolve(__dirname, '../../../libs/styles'),
      '@constants': resolve(__dirname, '../../../libs/constants'),
      react: 'preact/compat',
    },
  },
  plugins: [
    preact(),
    webExtension({
      manifest: resolve(__dirname, 'src/manifest.json'),
      assets: 'assets',
    }),
  ],
});
