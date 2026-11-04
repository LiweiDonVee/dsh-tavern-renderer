import { describe, expect, it, vi } from 'vitest'
import { CONFIG_KEY, createConfigStore } from '../src/client/config.js'
import { createRenderer } from '../src/core/index.js'

function storage() {
  const values = new Map()
  return { getItem: key => values.get(key), setItem: (key, value) => values.set(key, value) }
}

describe('browser display configuration', () => {
  it('notifies mounted subscribers, preserves valid settings alongside invalid regex and restores selections', () => {
    const saved = storage()
    const changed = vi.fn()
    const first = createConfigStore(saved, createRenderer, changed)
    const listener = vi.fn()
    const stop = first.subscribe(listener)
    first.configure({ char: 'Mira', regexRules: ['/[/broken/g', '/hello/world/g'],
      regexRuleSets: [{ id: 'set-a', name: 'Set A', rules: [] }], sessionRegexSelections: { a: 'set-a', b: null } })
    expect(changed).toHaveBeenCalledOnce()
    expect(listener).toHaveBeenCalledOnce()
    expect(first.getSnapshot()).toBe(1)
    expect(createRenderer(first.current()).render('hello {{char}}').html).toContain('world Mira')
    const restored = createConfigStore(saved, createRenderer)
    expect(restored.getConfig().sessionRegexSelections).toEqual({ a: 'set-a', b: null })
    expect(restored.current().char).toBe('Mira')
    expect(JSON.parse(saved.getItem(CONFIG_KEY)).regexRules).toHaveLength(2)
    stop()
    first.configure({ user: 'Alex' })
    expect(listener).toHaveBeenCalledOnce()
  })

  it('reports failed storage while retaining a usable in-memory configuration', () => {
    const store = createConfigStore({ getItem: () => null, setItem: () => { throw new Error('quota') } }, createRenderer)
    store.configure({ char: 'Mira' })
    expect(store.current().char).toBe('Mira')
    expect(store.getStorageError()).toContain('未能保存')
  })
})
