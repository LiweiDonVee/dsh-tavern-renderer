import pluginCss from './plugin.css'
import { version } from '../../package.json'
import { createRenderer, ThemeManager } from '../core/index.js'
import { registerTavernRenderers } from './register.js'
import { TavernAssistantNode, TavernUserNode } from './renderers.jsx'

export const inject = ['slots']

const CONFIG_KEY = 'dsh-tavern-renderer.config'
const DEFAULT_CONFIG = Object.freeze({
  char: 'Assistant',
  user: 'User',
  regexRules: [],
  stages: {},
  templates: {},
})

function loadConfig() {
  try {
    const stored = JSON.parse(localStorage.getItem(CONFIG_KEY) ?? 'null')
    return stored !== null && typeof stored === 'object' ? { ...DEFAULT_CONFIG, ...stored } : { ...DEFAULT_CONFIG }
  } catch {
    return { ...DEFAULT_CONFIG }
  }
}

function saveConfig(config) {
  try { localStorage.setItem(CONFIG_KEY, JSON.stringify(config)) } catch { /* Storage can be disabled. */ }
}

function mergeConfig(current, partial) {
  return {
    ...current,
    ...partial,
    stages: { ...current.stages, ...(partial.stages ?? {}) },
    templates: { ...current.templates, ...(partial.templates ?? {}) },
  }
}

export function apply(ctx) {
  const theme = new ThemeManager(document)
  theme.install()
  const componentStyle = document.createElement('style')
  componentStyle.dataset.dshTavernOwned = 'components'
  componentStyle.textContent = pluginCss
  document.head.append(componentStyle)

  let config = loadConfig()
  // Validate persisted data before any Session can consume it.
  try { createRenderer(config) } catch { config = { ...DEFAULT_CONFIG } }
  const renderers = new Map()
  const macroExtensions = new Map()
  const stageExtensions = new Map()

  const rendererFor = sessionId => {
    let renderer = renderers.get(sessionId)
    if (renderer !== undefined) return renderer
    renderer = createRenderer(config)
    for (const [name, resolver] of macroExtensions) renderer.registerMacro(name, resolver)
    for (const stage of stageExtensions.values()) {
      renderer.registerStage(stage)
      if (config.stages[stage.name] === false) renderer.setStageEnabled(stage.name, false)
    }
    renderers.set(sessionId, renderer)
    return renderer
  }

  const renderTavern = sessionId => (text, context = {}) => rendererFor(sessionId).render(text, context)
  const disposeSlots = registerTavernRenderers(
    ctx,
    { assistant: TavernAssistantNode, user: TavernUserNode },
    sessionId => ({ renderTavern: renderTavern(sessionId) }),
  )

  const previousApi = window.DeepSeekTavernRenderer
  const api = Object.freeze({
    version,
    render: (text, context = {}) => rendererFor('__preview__').render(text, context),
    configure(partial = {}) {
      const next = mergeConfig(config, partial)
      createRenderer(next)
      config = next
      saveConfig(config)
      renderers.clear()
      return this.getConfig()
    },
    getConfig: () => JSON.parse(JSON.stringify(config)),
    setTheme: name => theme.setTheme(name),
    setCustomCss: css => theme.setCustomCss(css),
    getTheme: () => theme.theme,
    registerMacro(name, resolver) {
      if (macroExtensions.has(name)) throw new Error(`macro already registered: ${name}`)
      macroExtensions.set(name, resolver)
      for (const renderer of renderers.values()) renderer.registerMacro(name, resolver)
      return () => {
        macroExtensions.delete(name)
        for (const renderer of renderers.values()) renderer.unregisterMacro(name)
      }
    },
    unregisterMacro(name) {
      macroExtensions.delete(name)
      for (const renderer of renderers.values()) renderer.unregisterMacro(name)
    },
    registerStage(stage) {
      if (stageExtensions.has(stage.name)) throw new Error(`stage already registered: ${stage.name}`)
      // Validate placement against a disposable renderer before publishing it.
      createRenderer(config).registerStage(stage)
      stageExtensions.set(stage.name, stage)
      for (const renderer of renderers.values()) renderer.registerStage(stage)
      return () => {
        stageExtensions.delete(stage.name)
        renderers.clear()
      }
    },
    setStageEnabled(name, enabled) {
      config = mergeConfig(config, { stages: { [name]: Boolean(enabled) } })
      saveConfig(config)
      for (const renderer of renderers.values()) renderer.setStageEnabled(name, enabled)
    },
  })
  window.DeepSeekTavernRenderer = api
  document.documentElement.dataset.dshTavernRendererVersion = api.version

  ctx.effect(() => () => {
    disposeSlots()
    renderers.clear()
    componentStyle.remove()
    theme.dispose()
    if (previousApi === undefined) delete window.DeepSeekTavernRenderer
    else window.DeepSeekTavernRenderer = previousApi
    delete document.documentElement.dataset.dshTavernRendererVersion
  }, 'dsh-tavern-renderer: client lifecycle')
}
