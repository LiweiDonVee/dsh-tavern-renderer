import { describe, expect, it } from 'vitest'
import { applyRegexRules, parseRegexRule } from '../src/core/regex.js'
import { createMacroEngine } from '../src/core/macros.js'

describe('regex replacement engine', () => {
  it('parses compact syntax, expands capture groups, then resolves replacement macros', () => {
    const context = { char: 'Luna', user: 'Alex', role: 'assistant', variables: new Map() }
    const macros = createMacroEngine()
    const rule = parseRegexRule('/([A-Z]+)-(\\d+)/$2 {{char}} $1/g')
    expect(applyRegexRules('ID-42', [rule], context, macros).value).toBe('42 Luna ID')
  })
})
