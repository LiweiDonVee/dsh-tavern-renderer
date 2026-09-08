import { mkdir } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const id = 'dsh-tavern-renderer'
await mkdir(new URL('../lib', import.meta.url), { recursive: true })

await build({
  entryPoints: [fileURLToPath(new URL('../src/client/index.jsx', import.meta.url))],
  outfile: fileURLToPath(new URL('../lib/client.js', import.meta.url)),
  bundle: true,
  format: 'cjs',
  platform: 'browser',
  target: 'es2022',
  jsx: 'automatic',
  sourcemap: 'external',
  legalComments: 'none',
  loader: { '.css': 'text' },
  external: [
    'react',
    'react/jsx-runtime',
    '@deepseek-ai/dsh-client-ui-primitives',
  ],
  banner: {
    js: `window.__ModuleLoader__.load({ id: ${JSON.stringify(id)}, factory: (require) => { var module = { exports: {} }; var exports = module.exports;`,
  },
  footer: { js: 'return module.exports; } });' },
})
