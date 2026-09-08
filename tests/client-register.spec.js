import { describe, expect, it, vi } from 'vitest'
import { registerTavernRenderers, RENDERED_NODE_KEYS, SHADOW_PRIORITY } from '../src/client/register.js'

describe('Harness keyed-slot integration', () => {
  it('shadows assistant/user/steering at a reversible lower priority without a core patch', () => {
    const registered = []
    const removed = []
    const ctx = {
      slots: {
        inject: (_name, mount) => mount(),
        register: (options, component) => {
          registered.push({ options, component })
          return () => removed.push(options.key)
        },
      },
    }
    const components = { assistant: vi.fn(), user: vi.fn() }
    const dispose = registerTavernRenderers(ctx, components, () => ({ renderTavern: vi.fn() }))
    expect(registered.map(item => item.options.key)).toEqual(RENDERED_NODE_KEYS)
    expect(registered.every(item => item.options.priority === SHADOW_PRIORITY)).toBe(true)
    expect(registered.every(item => item.options.locale === 'chat')).toBe(true)
    expect(registered[0].component).toBe(components.assistant)
    expect(registered[1].component).toBe(components.user)
    dispose()
    expect(removed.sort()).toEqual([...RENDERED_NODE_KEYS].sort())
  })
})
