import assert from 'node:assert/strict'
import { existsSync, readFileSync, readdirSync } from 'node:fs'
import { dirname, join, resolve } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import { test } from 'node:test'
import { build } from 'esbuild'
import { JSDOM } from 'jsdom'

const rendererDir = fileURLToPath(new URL('..', import.meta.url))
const explicitHostModules = process.env.DSH_HOST_NODE_MODULES
const defaultHostModules = resolve(join(rendererDir, '.host/node_modules'))
const hostModules = explicitHostModules ? resolve(explicitHostModules) : existsSync(defaultHostModules) ? defaultHostModules : undefined
const rpDir = process.env.DSH_RP_UI_DIR ? resolve(process.env.DSH_RP_UI_DIR) : undefined
if (explicitHostModules !== undefined && !existsSync(hostModules)) {
  throw new Error('DSH_HOST_NODE_MODULES does not exist: ' + hostModules)
}
if (process.env.DSH_RP_UI_DIR !== undefined && !existsSync(rpDir)) {
  throw new Error('DSH_RP_UI_DIR does not exist: ' + rpDir)
}
const hostSkip = hostModules === undefined ? 'SKIP: candidate host not found; set DSH_HOST_NODE_MODULES (default checked: ' + defaultHostModules + ')' : false
const rpSkip = rpDir === undefined ? 'SKIP: DSH_RP_UI_DIR is not set; RP dock contract is private-fixture-only' : false
if (hostSkip) console.warn('[host-contract] ' + hostSkip)
if (rpSkip) console.warn('[host-contract] ' + rpSkip)
const json = path => JSON.parse(readFileSync(path, 'utf8'))
const hostPath = (name, path) => join(hostModules, '@deepseek-ai', name, path)

test('current DSH accepts the renderer without a version exemption', { skip: hostSkip }, async () => {
  const { evaluatePluginCompatibility } = await import(pathToFileURL(hostPath('dsh-app-boot', 'lib/index.js')).href)
  const pkg = json(join(rendererDir, 'package.json'))
  const version = json(hostPath('dsh', 'package.json')).version
  assert.equal(evaluatePluginCompatibility(pkg, {}, version), undefined)
})

async function host({ desktop = false } = {}) {
  const frontend = hostPath('dsh-web-frontend', 'dist')
  assert.match(json(hostPath('dsh-web-frontend', 'package.json')).version, /^0\.2\.1-rc\.(?:2|3|5)$/)
  const html = readFileSync(join(frontend, 'index.html'), 'utf8')
  const entry = resolve(frontend, html.match(/<script type="module"[^>]*src="([^"]+)"/)[1])
  const source = readFileSync(entry, 'utf8')
  const seedFunction = source.match(/staticModules:(\w+)\(\)/)?.[1]
  assert.ok(seedFunction, 'candidate Web must expose its static module factory')
  const start = source.search(/const \w+=globalThis\.dshDesktopBoot/)
  assert.ok(start > 0, 'candidate Web launch seam changed')
  const compiled = await build({
    stdin: { contents: source.slice(0, start) + `;window.__hostSeeds = ${seedFunction}();`, resolveDir: dirname(entry) },
    bundle: true, write: false, format: 'iife', platform: 'browser', logLevel: 'silent',
  })
  const dom = new JSDOM('<!doctype html><html><head></head><body><div id="test-root"></div></body></html>', {
    url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true,
  })
  if (desktop) {
    // Electron registers dsh-app as a standard secure scheme with localStorage.
    // JSDOM needs that storage supplied explicitly for custom schemes.
    const storage = dom.window.localStorage
    Object.defineProperty(dom.window, 'localStorage', { value: storage })
    dom.reconfigure({ url: 'dsh-app://app/' })
    dom.window.dshDesktop = {}
  }
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
    if (!existsSync(hostPath(dir, 'package.json'))) continue
    const pkg = json(hostPath(dir, 'package.json'))
    if (!pkg.dsh?.client) continue
    const exp = pkg.exports?.['./client']
    const clientPath = typeof exp === 'string' ? exp : exp?.default
    assert.ok(clientPath, `${pkg.name} has a client entry`)
    paths.set(pkg.name, hostPath(dir, clientPath))
    entries.push({ id: pkg.name, url: pkg.name, rev: pkg.version, ...pkg.dsh.client })
  }
  const pkg = json(join(rendererDir, 'package.json'))
  paths.set(pkg.name, join(rendererDir, pkg.exports['./client']))
  entries.push({ id: pkg.name, url: pkg.name, rev: pkg.version, ...pkg.dsh.client })
  if (rpDir !== undefined) {
    const rpPkg = json(join(rpDir, 'package.json'))
    paths.set(rpPkg.name, join(rpDir, rpPkg.exports['./client']))
    entries.push({ id: rpPkg.name, url: rpPkg.name, rev: rpPkg.version, ...rpPkg.dsh.client })
  }
  const loader = bootstrapExports.createClientModuleSystem(facade, { id: bootstrap.id, exports: bootstrapExports }, {
    staticModules: seeds,
    boot: { rev: 'contract', entries, batches: entries.map(row => ({ phase: 'application', url: row.id, rev: row.rev, entries: [row.id] })) },
    loadBundle: async id => dom.window.eval(readFileSync(paths.get(id), 'utf8')),
  })
  return { dom, seeds, loader, entries, errors }
}

test('Web loads renderer through the shipped injection graph and primitives', { skip: hostSkip }, async t => {
  const h = await host()
  t.after(() => h.dom.window.close())
  const visit = (id, seen = new Set()) => {
    if (id.endsWith('/client')) id = id.slice(0, -7)
    if (id in h.seeds || seen.has(id)) return seen
    seen.add(id)
    const row = h.entries.find(row => row.id === id)
    assert.ok(row, `unresolved candidate injection: ${id}`)
    for (const dependency of [...row.inject ?? [], ...row.external ?? []]) visit(dependency, seen)
    return seen
  }
  const closure = visit('dsh-tavern-renderer')
  for (const name of ['dsh-client-ui-attachment', 'dsh-client-ui-chat', 'dsh-client-ui-conversation', 'dsh-client-ui-session', 'dsh-client-ui-renderer', 'dsh-client-locale']) {
    assert.ok(closure.has(`@deepseek-ai/${name}`), `renderer lost provider ${name}`)
  }
  const plugin = await h.loader.import('dsh-tavern-renderer')
  assert.deepEqual(Array.from(plugin.inject), ['slots'])
  const primitives = h.seeds['@deepseek-ai/dsh-client-ui-primitives']
  for (const name of ['FileTypeIcon', 'fileSizeText', 'IconCheckOutlineRegular', 'IconCopyOutlineRegular', 'IconThinkOutlineRegular', 'JsonBlock', 'Tooltip', 'writeClipboard']) {
    assert.equal(typeof primitives[name], 'function', `missing candidate primitive: ${name}`)
  }
  assert.equal(typeof plugin.apply, 'function')
  assert.deepEqual(h.errors, [])
})

test('keyed chat slot supplies distinct Session identities and restores host renderers', { skip: hostSkip }, async t => {
  const h = await host()
  const { Context } = h.seeds['@deepseek-ai/cordis']
  const ctx = new Context()
  t.after(async () => { await ctx.fiber.dispose(); h.dom.window.close(); assert.deepEqual(h.errors, []) })
  await ctx.plugin(await h.loader.import('@deepseek-ai/dsh-client-ui-renderer'))
  const React = h.seeds.react
  ctx.slots.register({ name: 'root', children: {
    'conversation.chat.node': { kind: 'keyed', scope: 'session' },
  } }, () => React.createElement('div'))
  const baseline = () => Array.from(ctx.slots.entriesOfSlot('conversation.chat.node'), entry => entry.component)
  const hostRenderer = () => React.createElement('span', null, 'host')
  ctx.slots.register({ name: 'conversation.chat.node', key: 'assistant-step' }, hostRenderer)
  const before = baseline()
  const plugin = await ctx.plugin(await h.loader.import('dsh-tavern-renderer'))
  const entries = ctx.slots.entriesOfSlot('conversation.chat.node')
  assert.deepEqual(Array.from(entries).filter(entry => entry.options.key === 'assistant-step').map(entry => entry.options.priority ?? 0), [-100])
  assert.deepEqual(Array.from(entries).filter(entry => ['user', 'steering'].includes(entry.options.key)).map(entry => entry.options.priority), [-100, -100])
  const injection = entries.find(entry => entry.options.key === 'assistant-step' && entry.options.priority === -100).inject
  const a = injection('session-a').renderTavern('{{setvar::score::7}}{{getvar::score}}').html
  const b = injection('session-b').renderTavern('{{getvar::score}}').html
  assert.match(a, /7/)
  assert.doesNotMatch(b, /7/)
  const mount = h.seeds['react-dom/client'].createRoot(h.dom.window.document.getElementById('test-root'))
  const assistant = entries.find(entry => entry.options.key === 'assistant-step').component
  const renderTavern = injection('session-a').renderTavern
  h.seeds['react-dom'].flushSync(() => mount.render(React.createElement(assistant, {
    node: { kind: 'assistant-step', data: { status: 'settled', blocks: [{ kind: 'reasoning', text: 'thinking' }] } },
    renderTavern, t: key => key,
  })))
  assert.match(h.dom.window.document.getElementById('test-root').textContent, /thinking/)
  mount.unmount()
  await plugin.dispose()
  assert.deepEqual(baseline(), before)
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

async function waitForImage(dom, container) {
  const selector = 'img[src="https://example.test/image.png"]'
  if (container.querySelector(selector)) return
  await new Promise((resolve, reject) => {
    const observer = new dom.window.MutationObserver(() => {
      if (!container.querySelector(selector)) return
      observer.disconnect()
      clearTimeout(timer)
      resolve()
    })
    const timer = setTimeout(() => {
      observer.disconnect()
      reject(new Error('Image did not finish loading: ' + container.innerHTML))
    }, 2000)
    observer.observe(container, { subtree: true, childList: true, attributes: true })
  })
}

for (const desktop of [false, true]) {
  test(`${desktop ? 'Desktop app protocol' : 'Web'} mounts images and restores the host on disable/re-enable`, { skip: hostSkip }, async t => {
    const h = await host({ desktop })
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
    ctx.slots.installLocale({ ...observable({ revision: 0 }), bind: () => (key, values) => values?.labels ?? key })
    const owner = { sessionId: 'session-a', ctx, session: {
      ...observable({}), projections: { faceOf: () => observable(undefined) },
    } }
    ctx.reflect.provide('sessions', {
      list: observable({ current: 'session-a', phase: 'ready', ids: ['session-a'], byId: {
        'session-a': { id: 'session-a', running: false, retainedBy: { mainView: 1 } },
      } }),
      binding: id => id === owner.sessionId ? owner : undefined,
      retainInfo: () => observable({ retainedBy: { mainView: 1 } }),
    })
    ctx.reflect.provide('remote', { $on: () => () => {} })
    ctx.reflect.provide('remoteAccess', { source: () => observable(undefined) })
    await ctx.plugin(await h.loader.import('@deepseek-ai/dsh-client-ui-session'))
    const React = h.seeds.react
    const imageReads = []
    const loadImage = async attachment => { imageReads.push(attachment.id); return 'https://example.test/image.png' }
    const frame = observable({ kind: 'assistant-step', data: {
      status: 'running', blocks: [{ kind: 'image', attachment: { id: 'output', attachmentId: 'output', width: 80, height: 60 } }, { kind: 'text', text: '**Hello**' }],
    } })
    ctx.slots.register({ name: 'root', children: { 'conversation.chat.node': { kind: 'keyed', scope: 'session' } },
      inject: () => ({ hooks: { frame } }),
    }, ({ useFrame, renderSlot }) => {
      const node = useFrame(value => value)
      return renderSlot('conversation.chat.node', { node, loadImage }, { entryKey: node.kind })
    })
    ctx.slots.register({ name: 'conversation.chat.node', key: 'assistant-step', children: {
      'conversation.chat.message.images': { kind: 'single', scope: 'session' },
    } }, () => React.createElement('span', null, 'native renderer'))
    await ctx.plugin(await h.loader.import('@deepseek-ai/dsh-client-ui-attachment'))
    const entryErrors = []
    ctx.slots.onEntryError((_entry, error) => entryErrors.push(error))
    let plugin = await ctx.plugin(await h.loader.import('dsh-tavern-renderer'))
    const container = h.dom.window.document.getElementById('test-root')
    const flush = h.seeds['react-dom'].flushSync
    unmount = ctx.uiRenderer.mount(container)
    assert.match(container.innerHTML, /<strong>Hello<\/strong>/)
    await waitForImage(h.dom, container)
    assert.equal(container.querySelectorAll('img[src="https://example.test/image.png"]').length, 1)
    flush(() => frame.set({ kind: 'user', data: { content: [
      { type: 'image', attachment: { id: 'input', attachmentId: 'input', width: 80, height: 60 } }, { type: 'text', text: '{{user}}' },
      { type: 'file', attachment: { id: 'notes', name: 'notes.txt', bytes: 12 } },
    ], referenceLabels: ['Referenced Session'] } }))
    assert.match(container.textContent, /notes.txt/)
    assert.match(container.textContent, /Referenced Session/)
    assert.match(container.textContent, /User/)
    assert.deepEqual(imageReads, ['output', 'input'])
    h.dom.window.DeepSeekTavernRenderer.configure({ char: 'Luna' })
    flush(() => frame.set({ kind: 'assistant-step', data: { status: 'settled', blocks: [{ kind: 'text', text: '{{char}}' }] } }))
    assert.match(container.textContent, /Luna/)
    await plugin.dispose()
    flush(() => {})
    assert.match(container.textContent, /native renderer/)
    assert.equal(h.dom.window.document.querySelectorAll('[data-dsh-tavern-owned]').length, 0)
    plugin = await ctx.plugin(await h.loader.import('dsh-tavern-renderer'))
    flush(() => {})
    assert.match(container.textContent, /Luna/)
    assert.equal(h.dom.window.document.querySelectorAll('[data-dsh-tavern-owned]').length, 3)
    assert.deepEqual(entryErrors, [])
  })
}

async function waitForSlotEntry(slots, name) {
  if (slots.entries(name).length > 0) return
  await new Promise(resolve => {
    let stop = () => {}
    const check = () => {
      if (slots.entries(name).length === 0) return
      stop()
      resolve()
    }
    stop = slots.subscribe(name, check)
    check()
  })
}

test('rc.2 real SlotRegistry and UiSession preserve the active RP dock contract', { skip: hostSkip || rpSkip }, async t => {
  const h = await host()
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
  const projection = observable(undefined)
  const sessionList = observable({ current: 'session-a', phase: 'ready', ids: ['session-a', 'session-b'], byId: {
    'session-a': { id: 'session-a', running: false, retainedBy: { mainView: 1 } },
    'session-b': { id: 'session-b', running: false, retainedBy: { mainView: 0 } },
  } })
  const owner = { sessionId: 'session-a', ctx, session: { ...observable({}), projections: { faceOf: key => {
    assert.equal(key, 'rp-state')
    return projection
  } } } }
  const secondProjection = observable(undefined)
  const secondOwner = { sessionId: 'session-b', ctx, session: { ...observable({}), projections: { faceOf: key => {
    assert.equal(key, 'rp-state')
    return secondProjection
  } } } }
  const remote = { $on: () => () => {} }
  ctx.reflect.provide('sessions', {
    list: sessionList,
    binding: id => [owner, secondOwner].find(item => item.sessionId === id),
    retainInfo: id => ({ getSnapshot: () => ({ retainedBy: sessionList.getSnapshot().byId[id]?.retainedBy ?? {} }), subscribe: listener => sessionList.subscribe(listener) }),
  })
  ctx.reflect.provide('remote', remote)
  ctx.reflect.provide('remoteAccess', { source: () => observable(undefined) })
  await ctx.plugin(await h.loader.import('@deepseek-ai/dsh-client-ui-session'))
  assert.ok(ctx.slots.hostFace().scope('session'), 'rc.2 UiSession must install the session scope adapter before mount')
  assert.equal(ctx.uiSession.adapter.current.getSnapshot().key, 'session-a')
  const React = h.seeds.react
  const conversation = readFileSync(hostPath('dsh-client-ui-conversation', 'lib/client.js'), 'utf8')
  assert.match(conversation, /"conversation.composer.dock":\s*\{\s*kind: "list",\s*scope: "session"/)
  ctx.slots.register({ name: 'root', children: { 'conversation.composer.dock': { kind: 'list', scope: 'session' } } },
    ({ renderSlot }) => React.createElement('main', null, renderSlot('conversation.composer.dock', {})))
  const rp = await ctx.plugin(await h.loader.import('dsh-rp-ui'))
  await waitForSlotEntry(ctx.slots, 'conversation.composer.dock')
  assert.equal(ctx.slots.entries('conversation.composer.dock').length, 1)
  const container = h.dom.window.document.getElementById('test-root')
  const timers = new Map()
  let nextTimer = 1
  h.dom.window.setTimeout = fn => { const id = nextTimer++; timers.set(id, fn); return id }
  h.dom.window.clearTimeout = id => timers.delete(id)
  unmount = ctx.uiRenderer.mount(container)
  const flush = h.seeds['react-dom'].flushSync
  assert.equal(container.querySelector('.rp_bar'), null)
  const state = name => ({ game: { started: true, protagonist: { name }, statusLines: [`${name} · 城门`, '第二行'], driver: { armed: true } } })
  flush(() => projection.set(state('新角色')))
  assert.match(container.textContent, /新角色 · 城门/)
  assert.match(container.textContent, /GM 自动续写中/)
  flush(() => container.querySelector('.rp_bar').click())
  assert.match(container.textContent, /第二行/)
  assert.equal(timers.size, 1)
  flush(() => projection.set(state('旧角色')))
  assert.equal(timers.size, 1)
  flush(() => projection.set(state('最终角色')))
  assert.equal(timers.size, 1, 'old role retry must be cancelled')
  const configured = []
  h.dom.window.DeepSeekTavernRenderer = { configure: value => configured.push(value.char) }
  for (const [id, fn] of timers) { timers.delete(id); fn() }
  assert.deepEqual(configured, ['最终角色'])
  secondProjection.set(state('会话B'))
  flush(() => sessionList.set({ ...sessionList.getSnapshot(), current: 'session-b', byId: {
    ...sessionList.getSnapshot().byId,
    'session-a': { ...sessionList.getSnapshot().byId['session-a'], retainedBy: { mainView: 0 } },
    'session-b': { ...sessionList.getSnapshot().byId['session-b'], retainedBy: { mainView: 1 } },
  } }))
  assert.match(container.textContent, /会话B · 城门/)
  assert.equal(configured.at(-1), '会话B')
  assert.equal(projection.listeners.size, 0, 'old session projection must be unsubscribed')
  flush(() => projection.set(state('不应显示的旧会话')))
  assert.doesNotMatch(container.textContent, /不应显示/)
  delete h.dom.window.DeepSeekTavernRenderer
  flush(() => secondProjection.set(state('卸载前')))
  assert.equal(timers.size, 1)
  unmount?.()
  unmount = undefined
  await rp.dispose()
  await ctx.fiber.dispose()
  assert.equal(container.querySelector('.rp_bar'), null)
  assert.equal(timers.size, 0, 'unload must cancel identity retry')
  assert.equal(secondProjection.listeners.size, 0)
})
