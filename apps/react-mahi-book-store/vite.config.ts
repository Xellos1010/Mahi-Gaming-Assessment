/// <reference types='vitest' />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { nxViteTsPaths } from '@nx/vite/plugins/nx-tsconfig-paths.plugin';
import { nxCopyAssetsPlugin } from '@nx/vite/plugins/nx-copy-assets.plugin';


const target = process.env.VITE_APP_BASE_URL || "http://localhost:3000";

export default defineConfig({
  root: __dirname,
  cacheDir: '../../node_modules/.vite/apps/react-mahi-book-store',
  server: {
    port: 4200,
    host: 'localhost',
    proxy: {
      '/api': {
        target: target,
        changeOrigin: true,
        secure: false,
      }
    }
  },
  preview: {
    port: 4300,
    host: 'localhost',
  },
  plugins: [react(), nxViteTsPaths(), nxCopyAssetsPlugin(['*.md'])],
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use "apps/react-mahi-book-store/src/variables.scss" as vars;
        `,
      },
    },
  },
  // Uncomment this if you are using workers.
  // worker: {
  //  plugins: [nxViteTsPaths()],
  // },
  build: {
    outDir: '../../dist/apps/react-mahi-book-store',
    emptyOutDir: true,
    reportCompressedSize: true,
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
