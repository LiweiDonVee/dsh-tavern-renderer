import assert from 'node:assert/strict'
import { readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { test } from 'node:test'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'

// No source checkout or .dsh profile is used. Missing/incompatible host artifacts fail loudly.
const rendererDir = fileURLToPath(new URL('..', import.meta.url))
const hostModules = resolve(process.env.DSH_HOST_NODE_MODULES ?? join(rendererDir, '.host/node_modules'))
const json = path => JSON.parse(readFileSync(path, 'utf8'))
const hostPath = (name, path) => join(hostModules, '@deepseek-ai', name, path)

async function host({ exposeChatContract = false } = {}) {
  const frontend = hostPath('dsh-web-frontend', 'dist')
  assert.equal(json(hostPath('dsh-web-frontend', 'package.json')).version, '0.1.2-rc.1')
  const html = readFileSync(join(frontend, 'index.html'), 'utf8')
  const entry = join(frontend, html.match(/<script type="module"[^>]*src="([^"]+)"/)[1])
  const source = readFileSync(entry, 'utf8')
  const seedFunction = source.match(/staticModules:(\w+)\(\)/)?.[1]
  assert.ok(seedFunction, 'built Web must expose its static module factory at loader.create')
  const start = source.lastIndexOf('const lc=document.getElementById("root")')
  assert.ok(start > 0, 'rc.1 Web launch seam changed; review the new built loader')
  // Keep all real Web definitions/imports; replace only automatic app startup with a seed export.
  const compiled = await build({
    stdin: { contents: source.slice(0, start) + `;window.__hostSeeds = ${seedFunction}();`, resolveDir: dirname(entry) },
    bundle: true, write: false, format: 'iife', platform: 'browser', logLevel: 'silent',
    define: { 'import.meta.url': JSON.stringify(new URL(`file:///${entry.replaceAll('\\', '/')}`).href) },
  })
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="test-root"></div></body></html>', {
    url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true,
  })
  const errors = []
  dom.window.addEventListener('error', event => errors.push(event.error ?? event.message))
  dom.window.eval(compiled.outputFiles[0].text)
  const seeds = dom.window.__hostSeeds
  const registrations = []
  const facade = { mode: 'queue', pendingQueue: registrations, load: row => registrations.push(row) }
  dom.window.__ModuleLoader__ = facade
  dom.window.eval(readFileSync(hostPath('dsh-client-modules', 'lib/client.js'), 'utf8'))
  const bootstrap = registrations.pop()
  const bootstrapExports = bootstrap.factory(name => {
    assert.ok(name in seeds, `bootstrap dependency ${name}`)
    return seeds[name]
  })
  const paths = new Map()
  const entries = []
  for (const dir of readdirSync(join(hostModules, '@deepseek-ai'))) {
    const pkg = json(hostPath(dir, 'package.json'))
    if (!pkg.dsh?.client) continue
    const exp = pkg.exports?.['./client']
    const clientPath = typeof exp === 'string' ? exp : exp?.default
    assert.ok(clientPath, `${pkg.name} has a client entry`)
    paths.set(pkg.name, hostPath(dir, clientPath))
    entries.push({ id: pkg.name, url: pkg.name, rev: pkg.version, ...pkg.dsh.client })
  }
  for (const dir of [rendererDir]) {
    const pkg = json(join(dir, 'package.json'))
    paths.set(pkg.name, join(dir, pkg.exports['./client']))
    entries.push({ id: pkg.name, url: pkg.name, rev: pkg.version, ...pkg.dsh.client })
  }
  const loader = bootstrapExports.createClientModuleSystem(facade, { id: bootstrap.id, exports: bootstrapExports }, {
    staticModules: seeds,
    boot: { rev: 'contract', entries, batches: entries.map(row => ({ phase: 'application', url: row.id, rev: row.rev, entries: [row.id] })) },
    loadBundle: async id => {
      let code = readFileSync(paths.get(id), 'utf8')
      if (exposeChatContract && id === '@deepseek-ai/dsh-client-ui-chat') {
        // Test-only export of real built registrations/dictionaries; no disk or implementation changes.
        assert.ok(code.includes('return module.exports;'))
        code = code.replace('return module.exports;',
          'exports.__contract = { registerChatNodeRenderers, CHAT_NODE_INJECT, NS, zh, en }; return module.exports;')
      }
      if (exposeChatContract && id === '@deepseek-ai/dsh-client-locale') {
        code = code.replace('return module.exports;',
          'exports.__common = { zh: zh$1, en: en$1 }; return module.exports;')
      }
      dom.window.eval(code)
    },
  })
  return { dom, seeds, loader, entries, paths, errors }
}

test('npm rc.1 built Web loader resolves the shipped renderer and their injection graph', async t => {
  const h = await host()
  t.after(() => h.dom.window.close())
  assert.equal('@deepseek-ai/dsh-client-runtime' in h.seeds, false)
  assert.equal(Object.keys(h.seeds).length, 8)
  const visit = (id, seen = new Set()) => {
    if (id in h.seeds || seen.has(id)) return seen
    seen.add(id)
    const row = h.entries.find(row => row.id === id)
    assert.ok(row, `unresolved manifest injection: ${id}`)
    for (const dependency of row.inject ?? []) visit(dependency, seen)
    return seen
  }
  for (const id of ['dsh-tavern-renderer']) {
    const closure = visit(id)
    for (const serviceOwner of ['dsh-client-ui-renderer', 'dsh-client-ui-session', 'dsh-client-locale']) {
      assert.ok(closure.has(`@deepseek-ai/${serviceOwner}`), `${id} lost provider ${serviceOwner}`)
    }
    if (id === 'dsh-tavern-renderer') assert.ok(closure.has('@deepseek-ai/dsh-client-ui-chat'))
    const face = await h.loader.import(id)
    assert.equal(typeof face.apply, 'function')
    assert.deepEqual(Array.from(face.inject), ['slots'])
    const row = h.entries.find(row => row.id === id)
    row.inject.push('@deepseek-ai/dsh-client-runtime')
    assert.throws(() => visit(id), /unresolved manifest injection: @deepseek-ai\/dsh-client-runtime/)
    row.inject.pop()
  }
  const primitives = h.seeds['@deepseek-ai/dsh-client-ui-primitives']
  for (const name of ['IconCheckOutline16', 'IconCopyOutline16', 'IconThinkOutline14', 'JsonBlock', 'Tooltip', 'writeClipboard']) {
    assert.ok(primitives[name], `missing real Web export: ${name}`)
  }
  console.log('host static modules:', Object.keys(h.seeds).join(', '))
})

test('shipped renderer shadows real chat registrations, receives locale/images and restores on unload', async t => {
  const h = await host({ exposeChatContract: true })
  const { Context } = h.seeds['@deepseek-ai/cordis']
  const ctx = new Context()
  let unmount
  t.after(async () => {
    unmount?.()
    await ctx.fiber.dispose()
    h.dom.window.close()
    assert.deepEqual(h.errors, [])
  })
  await ctx.plugin(await h.loader.import('@deepseek-ai/dsh-client-ui-renderer'))
  const owner = { sessionId: 'render-session', ctx, session: {
    ...observable({}), projections: { faceOf: () => observable(undefined) },
  } }
  ctx.reflect.provide('sessions', {
    list: observable({ current: owner.sessionId }), binding: id => id === owner.sessionId ? owner : undefined,
  })
  await ctx.plugin(await h.loader.import('@deepseek-ai/dsh-client-ui-session'))
  const { LocaleRuntime, __common } = await h.loader.import('@deepseek-ai/dsh-client-locale')
  const locale = new LocaleRuntime(ctx)
  ctx.slots.installLocale(locale)
  locale.register('common', __common)
  const chat = (await h.loader.import('@deepseek-ai/dsh-client-ui-chat')).__contract
  locale.register(chat.NS, { zh: chat.zh, en: chat.en })
  locale.setLocale('en')
  const chatSource = readFileSync(hostPath('dsh-client-ui-chat', 'lib/client.js'), 'utf8')
  assert.match(chatSource, /"conversation.chat.node":\s*\{\s*kind: "keyed",\s*scope: "session",\s*inject: CHAT_NODE_INJECT/)
  const React = h.seeds.react
  const images = []
  const attachment = { id: 'contract-image', mimeType: 'image/png' }
  const currentNode = observable({ kind: 'assistant-step', data: {
    status: 'interrupted', blocks: [
      { kind: 'text', text: 'Hello **host**' },
      { kind: 'image', attachment },
      { kind: 'unknown', block: { type: 'future-block', value: 42 } },
    ],
  } })
  const renderMessageImages = props => {
    images.push(props)
    return React.createElement('span', { 'data-host-image-align': props.align }, `images:${props.images.length}`)
  }
  ctx.slots.register({ name: 'root', children: {
    'conversation.chat.node': { kind: 'keyed', scope: 'session', inject: chat.CHAT_NODE_INJECT },
  } }, ({ renderSlot }) => {
    const node = React.useSyncExternalStore(currentNode.subscribe, currentNode.getSnapshot)
    return renderSlot('conversation.chat.node', {
      node, renderMessageImages, openFile() {}, inspectCall() {}, forkAt() {}, fileMentions() {},
    }, { entryKey: node.kind, hookContext: {} })
  })
  chat.registerChatNodeRenderers(ctx)
  const baseline = ctx.slots.entriesOfSlot('conversation.chat.node').map(entry => entry.component)
  const plugin = await ctx.plugin(await h.loader.import('dsh-tavern-renderer'))
  const container = h.dom.window.document.getElementById('test-root')
  unmount = ctx.uiRenderer.mount(container)
  assert.equal(container.querySelector('.dsh-tr-assistant-root strong')?.textContent, 'host')
  assert.equal(container.querySelector('.dsh-tr-stopped')?.textContent, chat.en['message.stopped'])
  assert.ok(container.textContent.includes(chat.en['message.unknownBlock']))
  assert.equal(images.at(-1).align, 'start')
  assert.equal(images.at(-1).images[0].attachment, attachment)
  const flush = h.seeds['react-dom'].flushSync
  for (const kind of ['user', 'steering']) {
    flush(() => currentNode.set({ kind, data: { content: [
      { type: 'text', text: `${kind} **message**` }, { type: 'image', attachment },
    ] } }))
    assert.equal(container.querySelector('.dsh-tr-user-root strong')?.textContent, 'message')
    assert.equal(images.at(-1).align, 'end')
    assert.equal(images.at(-1).images[0].attachment, attachment)
    assert.ok(container.querySelector('button[aria-label="Copy"]'), 'real chat locale supplies copy label')
  }
  await plugin.dispose()
  flush(() => {})
  assert.equal(container.querySelector('[data-dsh-tavern-renderer]'), null)
  assert.equal(h.dom.window.DeepSeekTavernRenderer, undefined)
  assert.equal(h.dom.window.document.querySelector('[data-dsh-tavern-owned="components"]'), null)
  assert.deepEqual(ctx.slots.entriesOfSlot('conversation.chat.node').map(entry => entry.component), baseline)
  assert.match(container.textContent, /steering/)
})

function observable(initial) {
  let value = initial
  const listeners = new Set()
  return {
    getSnapshot: () => value,
    subscribe: listener => { listeners.add(listener); return () => listeners.delete(listener) },
    set: next => { value = next; for (const listener of listeners) listener() },
    listeners,
  }
}
