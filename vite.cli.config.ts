const path = require('path');
const { defineConfig } = require('vite');
const copy = require('rollup-plugin-copy');

const EXTERNALS = [
  'assert', 'async_hooks', 'buffer', 'child_process', 'cluster', 'console',
  'constants', 'crypto', 'dgram', 'dns', 'domain', 'events', 'fs', 'http',
  'http2', 'https', 'inspector', 'module', 'net', 'os', 'path', 'perf_hooks',
  'process', 'punycode', 'querystring', 'readline', 'repl', 'stream',
  'string_decoder', 'timers', 'tls', 'trace_events', 'tty', 'url', 'util',
  'v8', 'vm', 'zlib', 'worker_threads', 'fsevents',
  'vite', 'rollup', 'typescript'
];

module.exports = defineConfig({
  plugins: [
    require('vite-tsconfig-paths').default(),
    require('rollup-plugin-preserve-shebang')(),
    copy({
          targets: [
            { src: 'node_modules/typescript/**/*', dest: 'dist/dts-bundler/vendor' }
          ],
          flatten: false
        })
  ],
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
        format: 'cjs',
        banner: `#!/usr/bin/env node
const ___path = require('path');
require('module-alias/register');
require('module-alias').addAlias('typescript', ___path.resolve(__dirname, '../vendor/typescript'));
`
      },
      external: (id: string) => {
        if (id.startsWith('node:')) return true;
        if (EXTERNALS.includes(id)) return true;
      }
    }
  },
  // Add resolve configuration to help find TypeScript lib files
  resolve: {
    alias: {
      'typescript': path.resolve(__dirname, 'dist/dts-bundler/vendor/typescript')
    }
  }
});