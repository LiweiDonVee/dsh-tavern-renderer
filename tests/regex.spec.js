import { describe, expect, it } from 'vitest'
import { applyRegexRules, parseRegexRule } from '../src/core/regex.js'
import { createMacroEngine } from '../src/core/macros.js'
import { createRenderer, parseRegexImport } from '../src/core/index.js'

const st = (extra = {}) => ({
  format: 'sillytavern', scriptName: 'display rule', findRegex: '/hello/g', replaceString: 'world',
  placement: [2], markdownOnly: true, promptOnly: false, ...extra,
})
const assistant = { role: 'assistant', placement: 2, variables: new Map() }

describe('regex replacement engine', () => {
  it('parses compact syntax, expands capture groups, then resolves replacement macros', () => {
    const context = { char: 'Luna', user: 'Alex', role: 'assistant', variables: new Map() }
    const macros = createMacroEngine()
    const rule = parseRegexRule('/([A-Z]+)-(\\d+)/$2 {{char}} $1/g')
    expect(applyRegexRules('ID-42', [rule], context, macros).value).toBe('42 Luna ID')
  })

  it('keeps legacy object defaults and replacement references distinct from ST imports', () => {
    const rule = { findRegex: '(hello)', replaceString: '$12 $& $$' }
    expect(parseRegexRule(rule).format).toBe('legacy')
    expect(applyRegexRules('hello hello', [rule], assistant).value).toBe('hello2 hello $ hello2 hello $')
    const imported = st({ findRegex: '(hello)', replaceString: '$12 $0 {{match}} $& $$' })
    expect(applyRegexRules('hello hello', [imported], assistant).value).toBe(' hello hello $& $$ hello')
  })

  it('parses ST literals using the final slash and preserves unknown record fields', () => {
    const rule = st({ id: 'original-id', findRegex: '/https://example.test/path/gi', extra: { source: 'preset' } })
    const parsed = parseRegexRule(rule)
    expect(parsed.pattern).toBe('https://example.test/path')
    expect(parsed.flags).toBe('gi')
    expect(parsed.extra).toEqual({ source: 'preset' })
    expect(rule).not.toHaveProperty('pattern')
  })

  it.each([
    [false, false, 'hello'], [false, true, 'hello'], [true, false, 'world'], [true, true, 'world'],
  ])('only runs ST display passes (markdown=%s prompt=%s)', (markdownOnly, promptOnly, output) => {
    const result = applyRegexRules('hello', [st({ markdownOnly, promptOnly })], assistant)
    expect(result.value).toBe(output)
    if (!markdownOnly) expect(result.diagnostics[0].code).toBe('NOT_DISPLAY_RULE')
  })

  it('selects user, assistant and reasoning independently and does not map unsupported placements', () => {
    const rules = [
      st({ placement: [1], replaceString: 'user' }),
      st({ placement: [2], replaceString: 'assistant' }),
      st({ placement: [6], replaceString: 'reasoning' }),
    ]
    expect(applyRegexRules('hello', rules, { role: 'user', placement: 1 }).value).toBe('user')
    expect(applyRegexRules('hello', rules, assistant).value).toBe('assistant')
    expect(applyRegexRules('hello', rules, { role: 'assistant', placement: 6 }).value).toBe('reasoning')
    expect(applyRegexRules('hello', [st({ placement: [] })], assistant).value).toBe('hello')
    const mixed = applyRegexRules('hello', [st({ placement: [0, 2, 3, 4, 5, 9] })], assistant)
    expect(mixed.value).toBe('world')
    expect(mixed.diagnostics[0].code).toBe('UNSUPPORTED_PLACEMENT')
  })

  it('honors disabled state, explicit edit mode and inclusive depth without treating streaming as editing', () => {
    const rule = st({ minDepth: 1, maxDepth: 2, runOnEdit: false })
    expect(applyRegexRules('hello', [rule], { ...assistant, depth: 1, streaming: true }).value).toBe('world')
    expect(applyRegexRules('hello', [rule], { ...assistant, depth: 2 }).value).toBe('world')
    for (const context of [{ depth: 0 }, { depth: 3 }, { depth: 1, isEdit: true }]) {
      expect(applyRegexRules('hello', [rule], { ...assistant, ...context }).value).toBe('hello')
    }
    expect(applyRegexRules('hello', [st({ disabled: true })], assistant).value).toBe('hello')
    expect(applyRegexRules('hello', [rule], assistant).diagnostics[0].code).toBe('DEPTH_UNAVAILABLE')
    expect(applyRegexRules('hello', [st({ minDepth: -1, maxDepth: null })], assistant).value).toBe('world')
    expect(applyRegexRules('hello', [st({ minDepth: '1' })], { ...assistant, depth: 1 }).value).toBe('world')
    expect(applyRegexRules('hello', [st({ minDepth: 'no' })], assistant).diagnostics[0].code).toBe('INVALID_DEPTH')
  })

  it('trims macro-expanded strings per capture, then expands the completed ST replacement', () => {
    const rule = st({ findRegex: '/(?<first>hello)-(world)/', replaceString: '$0|$1|$2|$<first>|$<missing>|$99 {{char}}', trimStrings: ['{{user}}'] })
    const result = applyRegexRules('hello-world', [rule], { ...assistant, char: 'Mira', user: 'll' }, createMacroEngine())
    expect(result.value).toBe('heo-world|heo|world|heo|| Mira')
  })

  it('supports raw and escaped find macros without escaping the surrounding regex', () => {
    const context = { ...assistant, char: 'A+B' }
    const macros = createMacroEngine()
    const rule = st({ findRegex: '/^{{char}}$/', substituteRegex: 2 })
    expect(applyRegexRules('A+B', [rule], context, macros).value).toBe('world')
    expect(applyRegexRules('AAAB', [rule], context, macros).value).toBe('AAAB')
    expect(applyRegexRules('AAAB', [st({ ...rule, substituteRegex: 1 })], context, macros).value).toBe('world')
    const unknown = applyRegexRules('hello', [st({ findRegex: '{{unknown}}', substituteRegex: 2 })], context, macros)
    expect(unknown.diagnostics).toContainEqual(expect.objectContaining({ code: 'UNKNOWN_MACRO' }))
  })

  it('isolates malformed rules in constructor and configure without resetting valid settings', () => {
    const renderer = createRenderer({ char: 'Mira', regexRules: [st({ findRegex: '/[/' }), st()] })
    const result = renderer.render('hello {{char}}')
    expect(result.html).toContain('world Mira')
    expect(result.diagnostics).toContainEqual(expect.objectContaining({ stage: 'regex', index: 0, name: 'display rule', code: 'INVALID_PATTERN' }))
    renderer.configure({ regexRules: [null, st({ replaceString: 'configured' })] })
    expect(renderer.render('hello {{char}}').html).toContain('configured Mira')
  })

  it('keeps original message data unchanged while sanitizing replacement-generated markup', () => {
    const source = Object.freeze({ role: 'assistant', text: 'hello' })
    const rule = st({ replaceString: '<script>window.bad=1</script><span onclick="bad()" class="display">world</span>' })
    const before = JSON.stringify(rule)
    const renderer = createRenderer({ regexRules: [rule] })
    const result = renderer.render(source.text, source)
    expect(result.html).toContain('custom-display')
    expect(result.html).not.toMatch(/script|onclick|window.bad/)
    expect(source.text).toBe('hello')
    expect(JSON.stringify(rule)).toBe(before)
    expect(result.trace.map(item => item.name)).toContain('sanitize')
  })

  it('evaluates trim macros independently for every capture insertion and reports unresolved macros', () => {
    const rule = st({ findRegex: '/([12]+)/g', replaceString: '$1', trimStrings: ['{{incvar::n}}'] })
    expect(applyRegexRules('12 12', [rule], { ...assistant, variables: new Map() }, createMacroEngine()).value).toBe('2 1')
    const missing = applyRegexRules('hello', [st({ replaceString: '{{unknown}}' })], assistant, createMacroEngine())
    expect(missing.value).toBe('{{unknown}}')
    expect(missing.diagnostics[0].code).toBe('UNKNOWN_MACRO')
  })

  it('copies supplied variable maps while retaining renderer-owned display state', () => {
    const supplied = new Map([['n', 8]])
    const renderer = createRenderer({ variables: supplied })
    renderer.render('{{incvar::n}}')
    expect(supplied.get('n')).toBe(8)
    expect(renderer.render('{{getvar::n}}').html).toContain('9')
    renderer.render('{{incvar::n}}', { variables: supplied })
    expect(supplied.get('n')).toBe(8)
    expect(renderer.render('{{getvar::n}}').html).toContain('9')
  })
})

describe('ST regex JSON import', () => {
  it('extracts only the documented preset extension in source order and reports display availability', () => {
    const records = [st({ id: 'a' }), st({ id: 'b', disabled: true }), st({ id: 'c', markdownOnly: false, promptOnly: true })]
    const preset = { name: 'Example', prompts: [{ content: 'untouched' }], extensions: {
      regex_scripts: records, tavern_helper: { scripts: [{ code: 'throw new Error("must stay inert")' }] },
    } }
    const before = JSON.stringify(preset)
    const result = parseRegexImport(JSON.stringify(preset))
    expect(result.source).toBe('preset')
    expect(result.rules.map(rule => rule.id)).toEqual(['a', 'b', 'c'])
    expect(result.summary).toEqual({ total: 3, display: 2, disabled: 1, promptOnly: 1 })
    expect(result.rules.every(rule => rule.format === 'sillytavern')).toBe(true)
    expect(JSON.stringify(preset)).toBe(before)
    expect(result).not.toHaveProperty('prompts')
  })

  it('accepts a single ST rule or array and leaves missing-regex presets unchanged', () => {
    expect(parseRegexImport(st()).rules).toHaveLength(1)
    expect(parseRegexImport([st(), st()]).rules).toHaveLength(2)
    expect(parseRegexImport({ extensions: { tavern_helper: [] } }).rules).toEqual([])
    expect(() => parseRegexImport('{')).toThrow()
    expect(() => parseRegexImport({ prompts: [] })).toThrow()
  })

  it('keeps malformed array members inert instead of treating imported strings as legacy executable rules', () => {
    const imported = parseRegexImport(['/hello/wrong/g', null, st()])
    const result = applyRegexRules('hello', imported.rules, assistant)
    expect(result.value).toBe('world')
    expect(result.diagnostics.filter(item => item.code === 'INVALID_RULE')).toHaveLength(2)
  })
})
