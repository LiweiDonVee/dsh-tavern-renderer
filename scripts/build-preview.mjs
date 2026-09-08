import { mkdir, readFile, writeFile } from 'node:fs/promises'
import { JSDOM } from 'jsdom'
import { createRenderer } from '../src/core/index.js'

const root = new URL('../', import.meta.url)
const [source, pluginCss] = await Promise.all([
  readFile(new URL('demo/documents-message.txt', root), 'utf8'),
  readFile(new URL('src/client/plugin.css', root), 'utf8'),
])

const dom = new JSDOM('<!doctype html><html><body></body></html>')
globalThis.document = dom.window.document
const result = createRenderer().render(source, {
  role: 'assistant', char: 'Luna Vale', user: 'Alex Rowan',
})

const html = `<!doctype html>
<html lang="en" data-dsh-tavern-theme="paper">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tavern Renderer document preview</title>
  <style>
    :root { color-scheme: light; background: #e8e9e6; }
    body { margin: 0; background: #e8e9e6; color: #17181a; }
    .preview-shell { width: min(calc(100% - 32px), 920px); margin: 0 auto; padding: 32px 0 64px; }
    .preview-title { border-bottom: 1px solid #b9bdb8; margin-bottom: 20px; padding-bottom: 13px; font: 750 12px/1.4 ui-sans-serif, system-ui, sans-serif; text-transform: uppercase; }
    [data-dsh-tavern-renderer] {
      --dtr-surface: #fbfaf7;
      --dtr-surface-raised: #f0f2ee;
      --dtr-text: #242826;
      --dtr-muted: #626a66;
      --dtr-border: #cdd3cf;
      --dtr-accent: #146b63;
      --dtr-quote: #9f3f48;
      --dtr-code: #e9ece9;
    }
    ${pluginCss}
    @media (max-width: 640px) {
      .preview-shell { width: min(calc(100% - 20px), 920px); padding-top: 18px; }
    }
  </style>
</head>
<body>
  <main class="preview-shell" data-dsh-tavern-renderer data-trace="${result.trace.map(item => item.name).join(',')}" data-diagnostics="${result.diagnostics.length}">
    <div class="preview-title">DeepSeek Harness / Tavern Renderer 0.2.0 / Eight document templates</div>
    ${result.html}
  </main>
</body>
</html>`

await mkdir(new URL('artifacts/', root), { recursive: true })
await writeFile(new URL('artifacts/template-preview.html', root), html, 'utf8')
await writeFile(new URL('artifacts/template-mobile-preview.html', root), `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Tavern Renderer mobile preview</title>
  <style>
    :root { background: #242725; color-scheme: dark; }
    body { min-height: 100vh; margin: 0; background: #242725; padding: 20px; }
    .device { width: 196px; height: 423px; }
    iframe { width: 390px; height: 844px; border: 1px solid #555b57; border-radius: 8px; background: #e8e9e6; box-shadow: 0 16px 36px rgb(0 0 0 / 32%); transform: scale(0.5); transform-origin: top left; }
  </style>
</head>
<body><div class="device"><iframe title="390 by 844 mobile document preview" src="./template-preview.html"></iframe></div></body>
</html>`, 'utf8')
