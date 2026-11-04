export const CONFIG_KEY = 'dsh-tavern-renderer.config'
export const DEFAULT_CONFIG = Object.freeze({
  char: 'Assistant', user: 'User', regexRules: [], regexRuleSets: [], sessionRegexSelections: {}, stages: {}, templates: {},
})

export function mergeConfig(current, partial) {
  return {
    ...current,
    ...partial,
    stages: { ...current.stages, ...(partial.stages ?? {}) },
    templates: { ...current.templates, ...(partial.templates ?? {}) },
  }
}

export function createConfigStore(storage, validate, changed = () => {}) {
  let config = mergeConfig(DEFAULT_CONFIG, {})
  try {
    const stored = JSON.parse(storage?.getItem(CONFIG_KEY) ?? 'null')
    if (stored !== null && typeof stored === 'object' && !Array.isArray(stored)) {
      const candidate = mergeConfig(DEFAULT_CONFIG, stored)
      candidate.regexRules ??= []
      candidate.regexRuleSets ??= []
      candidate.sessionRegexSelections ??= {}
      validate(candidate)
      config = candidate
    }
  } catch { /* Malformed browser storage is isolated from the chat. */ }
  let revision = 0
  let disposed = false
  let storageError = storage === undefined ? '浏览器存储不可用，修改仅在本次运行生效。' : undefined
  const listeners = new Set()
  const copy = () => JSON.parse(JSON.stringify(config))
  return {
    getSnapshot: () => revision,
    subscribe(listener) { listeners.add(listener); return () => listeners.delete(listener) },
    current: () => config,
    getConfig: copy,
    getStorageError: () => storageError,
    configure(partial = {}) {
      if (disposed) throw new Error('renderer configuration is disposed')
      const next = mergeConfig(config, partial)
      next.regexRules = JSON.parse(JSON.stringify(next.regexRules ?? []))
      next.regexRuleSets = JSON.parse(JSON.stringify(next.regexRuleSets ?? []))
      next.sessionRegexSelections = { ...next.sessionRegexSelections }
      validate(next)
      config = next
      try {
        if (storage === undefined) throw new Error('storage unavailable')
        storage.setItem(CONFIG_KEY, JSON.stringify(config))
        storageError = undefined
      } catch { storageError = '未能保存到浏览器存储，修改仅在本次运行生效。' }
      changed()
      revision += 1
      for (const listener of listeners) listener()
      return copy()
    },
    dispose() { disposed = true; listeners.clear() },
  }
}
