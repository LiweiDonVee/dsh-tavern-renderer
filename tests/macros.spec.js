import { describe, expect, it } from 'vitest'
import { createMacroEngine } from '../src/core/macros.js'

describe('macro and variable system', () => {
  it('injects identity, persists setvar/getvar, resolves nesting, and accepts registered macros', () => {
    const engine = createMacroEngine()
    engine.registerMacro('upper', ({ args }) => args.join('::').toUpperCase())
    const context = { char: 'Luna', user: 'Alex', role: 'assistant', variables: new Map() }
    const input = '{{setvar::mood::calm}}{{char}} meets {{user}}: {{upper::{{getvar::mood}}}}'
    expect(engine.evaluate(input, context)).toBe('Luna meets Alex: CALM')
    expect(context.variables.get('mood')).toBe('calm')
  })
})
