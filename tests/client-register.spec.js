import { describe, expect, it, vi } from 'vitest'
import { registerTavernRenderers, RENDERED_NODE_KEYS, SHADOW_PRIORITY } from '../src/client/register.js'

describe('Harness keyed-slot integration', () => {
  it('shadows assistant/user/steering at a reversible lower priority without a core patch', () => {
    const registered = []
    const removed = []
    let injectCalls = 0
    const ctx = {
      slots: {
        inject: (_name, mount) => {
          injectCalls += 1
          const disposers = mount()
          return () => [...disposers].reverse().forEach(dispose => dispose())
        },
        register: (options, component) => {
          registered.push({ options, component })
          return () => removed.push(options.key)
        },
      },
    }
    const components = { assistant: vi.fn(), user: vi.fn() }
    const dispose = registerTavernRenderers(ctx, components, () => ({ renderTavern: vi.fn() }))
    expect(injectCalls).toBe(1)
    expect(registered.map(item => item.options.key)).toEqual(RENDERED_NODE_KEYS)
    expect(registered.every(item => item.options.priority === SHADOW_PRIORITY)).toBe(true)
    expect(registered.every(item => item.options.locale === 'chat')).toBe(true)
    expect(registered[0].component).toBe(components.assistant)
    expect(registered[1].component).toBe(components.user)
    dispose()
    expect(removed.sort()).toEqual([...RENDERED_NODE_KEYS].sort())
  })

  it('keeps rc.2 declaration teardown atomic across a slot rebuild', () => {
    const active = new Set()
    let declared = true
    let rebuild
    const ctx = {
      slots: {
        inject: (_name, mount) => {
          const reconcile = () => {
            if (!declared) return
            for (const dispose of mount()) active.add(dispose)
          }
          rebuild = () => {
            for (const dispose of active) dispose()
            active.clear()
            reconcile()
          }
          reconcile()
          return () => {
            for (const dispose of active) dispose()
            active.clear()
          }
        },
        register: options => {
          const released = vi.fn()
          let disposer
          disposer = () => { released(); active.delete(disposer) }
          return disposer
        },
      },
    }
    const dispose = registerTavernRenderers(ctx, { assistant: vi.fn(), user: vi.fn() }, () => ({}))
    expect(active.size).toBe(RENDERED_NODE_KEYS.length)
    declared = false
    rebuild()
    expect(active.size).toBe(0)
    declared = true
    rebuild()
    expect(active.size).toBe(RENDERED_NODE_KEYS.length)
    dispose()
    expect(active.size).toBe(0)
  })
})
