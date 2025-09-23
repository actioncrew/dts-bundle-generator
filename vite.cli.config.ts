import { defineConfig } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import tsconfigPaths from 'vite-tsconfig-paths';
import shebang from 'rollup-plugin-preserve-shebang';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default defineConfig({
  plugins: [tsconfigPaths(), shebang()],
  build: {
    target: 'node22',
    outDir: 'dist/dts-bundler/',
    emptyOutDir: false,
    lib: false,
    minify: false,
    chunkSizeWarningLimit: 5000,
    rollupOptions: {
      input: path.resolve(__dirname, './src/config-manager.ts'),
      output: {
        entryFileNames: 'bin/dts-bundler',
        format: 'es',
        banner: '#!/usr/bin/env node'
      },
      external: (id) => {
        if (id === 'typescript' || id.startsWith('typescript/')) return true;
        return !id.startsWith('.') && !path.isAbsolute(id);
      },
    },
  }
});