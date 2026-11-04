import pluginCss from './plugin.css'
import { version } from '../../package.json'
import { createRenderer, parseRegexImport, ThemeManager } from '../core/index.js'
import { registerTavernRenderers } from './register.js'
import { TavernAssistantNode, TavernUserNode } from './renderers.jsx'
import { createConfigStore } from './config.js'
import { createDepthIndex } from './depth.js'
import { RegexChooser } from './regex-chooser.jsx'

export const inject = ['slots']

export function apply(ctx) {
  const theme = new ThemeManager(document)
  theme.install()
  const componentStyle = document.createElement('style')
  componentStyle.dataset.dshTavernOwned = 'components'
  componentStyle.textContent = pluginCss
  document.head.append(componentStyle)

  const renderers = new Map()
  const sessionTools = new Map()
  const macroExtensions = new Map()
  const stageExtensions = new Map()
  let storage
  try { storage = localStorage } catch { /* The chooser reports disabled storage. */ }
  const configStore = createConfigStore(storage, config => {
    createRenderer(config)
    if (!Array.isArray(config.regexRuleSets)) throw new TypeError('regexRuleSets must be an array')
    if (config.sessionRegexSelections === null || typeof config.sessionRegexSelections !== 'object') {
      throw new TypeError('sessionRegexSelections must be an object')
    }
  }, () => renderers.clear())

  const rulesFor = sessionId => {
    const config = configStore.current()
    if (sessionId === '__preview__') return config.regexRules
    const selection = config.sessionRegexSelections[sessionId]
    if (selection === undefined) return config.regexRules
    if (selection === null) return []
    return config.regexRuleSets.find(set => set.id === selection)?.rules ?? []
  }

  const rendererFor = sessionId => {
    let renderer = renderers.get(sessionId)
    if (renderer !== undefined) return renderer
    const config = configStore.current()
    renderer = createRenderer({ ...config, regexRules: rulesFor(sessionId) })
    for (const [name, resolver] of macroExtensions) renderer.registerMacro(name, resolver)
    for (const stage of stageExtensions.values()) {
      renderer.registerStage(stage)
      if (config.stages[stage.name] === false) renderer.setStageEnabled(stage.name, false)
    }
    renderers.set(sessionId, renderer)
    return renderer
  }

  const renderTavern = sessionId => (text, context = {}) => rendererFor(sessionId).render(text, context)
  const toolsFor = sessionId => {
    if (!sessionTools.has(sessionId)) sessionTools.set(sessionId, {
      renderTavern: renderTavern(sessionId), renderConfig: configStore, depthIndex: createDepthIndex(),
    })
    return sessionTools.get(sessionId)
  }
  const disposeSlots = registerTavernRenderers(
    ctx,
    { assistant: TavernAssistantNode, user: TavernUserNode },
    toolsFor,
  )

  const previousApi = window.DeepSeekTavernRenderer
  const api = Object.freeze({
    version,
    render: (text, context = {}) => rendererFor('__preview__').render(text, context),
    configure(partial = {}) {
      return configStore.configure(partial)
    },
    getConfig: () => configStore.getConfig(),
    getRegexRuleSets: () => JSON.parse(JSON.stringify(configStore.current().regexRuleSets)),
    getRegexSelection: sessionId => configStore.current().sessionRegexSelections[requiredSession(sessionId)],
    selectRegexRuleSet(sessionId, selection) {
      requiredSession(sessionId)
      const config = configStore.current()
      if (selection !== undefined && selection !== null && !config.regexRuleSets.some(set => set.id === selection)) {
        throw new Error('unknown regex rule set')
      }
      const selections = { ...config.sessionRegexSelections }
      if (selection === undefined) delete selections[sessionId]
      else selections[sessionId] = selection
      configStore.configure({ sessionRegexSelections: selections })
      return selection
    },
    importRegexRuleSet(input, { sessionId, name = '导入的正则' } = {}) {
      requiredSession(sessionId)
      const imported = parseRegexImport(input)
      if (imported.rules.length === 0) return imported
      const config = configStore.current()
      const ruleSet = { id: `regex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
        name: String(name), source: imported.source, rules: imported.rules, summary: imported.summary }
      configStore.configure({
        regexRuleSets: [...config.regexRuleSets, ruleSet],
        sessionRegexSelections: { ...config.sessionRegexSelections, [sessionId]: ruleSet.id },
      })
      return { ...imported, id: ruleSet.id, storageError: configStore.getStorageError() }
    },
    deleteRegexRuleSet(id) {
      const config = configStore.current()
      configStore.configure({
        regexRuleSets: config.regexRuleSets.filter(set => set.id !== id),
        sessionRegexSelections: Object.fromEntries(Object.entries(config.sessionRegexSelections)
          .map(([sessionId, selection]) => [sessionId, selection === id ? null : selection])),
      })
    },
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
      createRenderer(configStore.current()).registerStage(stage)
      stageExtensions.set(stage.name, stage)
      for (const renderer of renderers.values()) renderer.registerStage(stage)
      return () => {
        stageExtensions.delete(stage.name)
        renderers.clear()
      }
    },
    setStageEnabled(name, enabled) {
      configStore.configure({ stages: { [name]: Boolean(enabled) } })
    },
  })
  window.DeepSeekTavernRenderer = api
  document.documentElement.dataset.dshTavernRendererVersion = api.version

  const disposeChooser = ctx.slots.inject('conversation.session.header.utilities', () => ctx.slots.register({
    name: 'conversation.session.header.utilities', id: 'tavern-regex', order: 20,
    inject: () => ({ configStore, regexApi: api }),
  }, RegexChooser))

  ctx.effect(() => () => {
    disposeSlots()
    disposeChooser()
    renderers.clear()
    sessionTools.clear()
    configStore.dispose()
    componentStyle.remove()
    theme.dispose()
    if (previousApi === undefined) delete window.DeepSeekTavernRenderer
    else window.DeepSeekTavernRenderer = previousApi
    delete document.documentElement.dataset.dshTavernRendererVersion
  }, 'dsh-tavern-renderer: client lifecycle')
}

function requiredSession(sessionId) {
  if (typeof sessionId !== 'string' || sessionId === '') throw new TypeError('sessionId is required')
  return sessionId
}
