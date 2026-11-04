import { describe, expect, it, vi } from 'vitest'
import { createDepthIndex } from '../src/client/depth.js'

describe('native display message depth', () => {
  it('counts one floor per user/steering/assistant node and ignores tools and context', () => {
    const values = new Map([
      ['system', { kind: 'system-prompt' }], ['u', { kind: 'user' }], ['tool', { kind: 'tool-call' }],
      ['a', { kind: 'assistant-step', data: { blocks: [{ kind: 'reasoning' }, { kind: 'text' }] } }],
      ['context', { kind: 'context' }], ['s', { kind: 'steering' }],
    ])
    const get = vi.fn(key => values.get(key))
    const snapshot = { order: [...values.keys()], nodes: { get } }
    const depth = createDepthIndex()
    expect([...depth(snapshot)]).toEqual([['s', 0], ['a', 1], ['u', 2]])
    get.mockClear()
    expect(depth({ ...snapshot }).get('a')).toBe(1)
    expect(get).not.toHaveBeenCalled()
    expect(depth({ ...snapshot, order: ['older', ...snapshot.order] }).get('a')).toBe(1)
    expect(get).toHaveBeenCalled()
  })

  it('updates all earlier floors when a new message is appended and keeps sessions separate', () => {
    const first = createDepthIndex()
    const second = createDepthIndex()
    const nodes = { get: key => ({ kind: key.startsWith('u') ? 'user' : 'assistant-step' }) }
    expect(first({ order: ['u1', 'a1'], nodes }).get('a1')).toBe(0)
    expect(first({ order: ['u1', 'a1', 'u2'], nodes }).get('a1')).toBe(1)
    expect(second({ order: ['a1'], nodes }).get('a1')).toBe(0)
    expect(first(undefined).get('a1')).toBeUndefined()
  })
})
