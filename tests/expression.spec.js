import { describe, expect, it } from 'vitest'
import { evaluateInlineExpressions, safeEvaluateExpression } from '../src/core/expression.js'

describe('safe inline expression extension', () => {
  it('evaluates the documented {{js::...}} subset without exposing JavaScript globals', () => {
    expect(evaluateInlineExpressions('score={{js::1 + 2 * 3}}', { user: 'Alex' })).toBe('score=7')
    expect(() => safeEvaluateExpression('window.location', {})).toThrow(/not allowed|unexpected/i)
    expect(() => safeEvaluateExpression('alert(1)', {})).toThrow(/not allowed|unexpected/i)
    expect(() => safeEvaluateExpression('({}).constructor', {})).toThrow(/not allowed|unexpected/i)
  })
})
