import { describe, expect, it } from 'vitest'
import { createRenderer } from '../src/core/index.js'

describe('character and user context', () => {
  it('injects per-render char/user values without leaking between renderers', () => {
    const first = createRenderer({ templates: { assistant: '{{content}}' } })
    const second = createRenderer({ templates: { assistant: '{{content}}' } })
    expect(first.render('{{char}} greets {{user}}', { role: 'assistant', char: 'Luna', user: 'Alex' }).html)
      .toContain('Luna greets Alex')
    expect(second.render('{{char}} greets {{user}}', { role: 'assistant', char: 'Mira', user: 'Sam' }).html)
      .toContain('Mira greets Sam')
  })
})
