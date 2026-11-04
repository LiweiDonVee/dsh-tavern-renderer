const VALID_FLAGS = /^[dgimsuvy]*$/
const ST_FIELDS = ['placement', 'markdownOnly', 'promptOnly', 'substituteRegex', 'runOnEdit', 'minDepth', 'maxDepth']
const SUPPORTED_PLACEMENTS = new Set([1, 2, 6])

function invalid(code, message) { return Object.assign(new Error(message), { code }) }

function compile(pattern, flags) {
  try { new RegExp('', flags) } catch (error) { throw invalid('INVALID_FLAGS', error.message) }
  try { return new RegExp(pattern, flags) } catch (error) { throw invalid('INVALID_PATTERN', error.message) }
}

function findDelimiter(source, start) {
  let escaped = false
  for (let index = start; index < source.length; index += 1) {
    const char = source[index]
    if (char === '/' && !escaped) return index
    if (char === '\\') escaped = !escaped
    else escaped = false
  }
  return -1
}

function validatePattern(pattern) {
  if (pattern.length > 1024) throw invalid('INVALID_PATTERN', 'regex pattern exceeds 1024 characters')
  // Regex configuration is trusted; this catches one common expensive shape, not every ReDoS pattern.
  if (/\([^)]*[+*][^)]*\)\s*(?:[+*]|\{\d)/.test(pattern)) {
    throw invalid('INVALID_PATTERN', 'regex contains a nested quantified group')
  }
}

function validateFlags(flags) {
  if (!VALID_FLAGS.test(flags)) throw invalid('INVALID_FLAGS', `invalid regex flags: ${flags}`)
  if (new Set(flags).size !== flags.length) throw invalid('INVALID_FLAGS', `duplicate regex flags: ${flags}`)
}

function parseFindRegex(source, format) {
  const value = String(source)
  if (!value.startsWith('/')) return { pattern: value, flags: format === 'sillytavern' ? '' : 'g' }
  const end = format === 'sillytavern' ? value.lastIndexOf('/') : findDelimiter(value, 1)
  if (end < 1) throw new Error('unterminated findRegex literal')
  const flags = value.slice(end + 1)
  validateFlags(flags)
  return { pattern: value.slice(1, end), flags }
}

/** Keep the public legacy dialect, and distinguish imported SillyTavern records explicitly. */
export function parseRegexRule(input) {
  if (typeof input === 'object' && input !== null && !Array.isArray(input)) {
    const format = input.format ?? (ST_FIELDS.some(key => Object.hasOwn(input, key)) ? 'sillytavern' : 'legacy')
    if (format !== 'legacy' && format !== 'sillytavern') throw invalid('UNSUPPORTED_FORMAT', `unsupported regex format: ${format}`)
    const find = Object.hasOwn(input, 'pattern') && !Object.hasOwn(input, 'findRegex')
      ? { pattern: String(input.pattern), flags: format === 'sillytavern' ? '' : 'g' }
      : parseFindRegex(input.findRegex ?? input.pattern ?? '', format)
    validatePattern(find.pattern)
    if (format === 'sillytavern' && find.pattern === '') throw invalid('INVALID_PATTERN', 'ST findRegex must not be empty')
    const flags = String(input.flags ?? find.flags)
    validateFlags(flags)
    if (input.roles !== undefined && !Array.isArray(input.roles)) throw new Error('roles must be an array')
    if (format === 'sillytavern' && input.placement !== undefined && !Array.isArray(input.placement)) {
      throw new Error('placement must be an array')
    }
    const rule = {
      ...input,
      format,
      pattern: find.pattern,
      flags,
      replacement: String(input.replaceString ?? input.replacement ?? ''),
      enabled: input.enabled ?? !input.disabled,
      roles: input.roles === undefined ? undefined : [...input.roles],
      trimStrings: Array.isArray(input.trimStrings) ? input.trimStrings.map(String) : [],
      name: String(input.name ?? input.scriptName ?? ''),
    }
    // Compile the unexpanded expression now. Macro-substituted patterns compile after substitution.
    if (format === 'legacy' || !rule.substituteRegex) compile(rule.pattern, rule.flags)
    return rule
  }
  if (typeof input !== 'string') throw new Error('regex rule must be an object or compact string')
  const source = input
  if (!source.startsWith('/')) throw new Error('compact regex rule must start with /')
  const patternEnd = findDelimiter(source, 1)
  if (patternEnd === -1) throw new Error('compact regex rule is missing the pattern delimiter')
  const replacementEnd = findDelimiter(source, patternEnd + 1)
  if (replacementEnd === -1) throw new Error('compact regex rule is missing the replacement delimiter')
  const pattern = source.slice(1, patternEnd)
  const replacement = source.slice(patternEnd + 1, replacementEnd).replace(/\\\//g, '/')
  const flags = source.slice(replacementEnd + 1)
  validatePattern(pattern)
  validateFlags(flags)
  compile(pattern, flags)
  return { format: 'legacy', pattern, replacement, flags, enabled: true, trimStrings: [], name: '' }
}

/** Normalize independently so one malformed rule cannot reject an otherwise valid configuration. */
export function normalizeRegexRules(rules = []) {
  if (!Array.isArray(rules)) throw new TypeError('regexRules must be an array')
  return rules.map(input => {
    if (input?.format === 'invalid') return input
    try { return parseRegexRule(input) } catch (error) {
      return { format: 'invalid', name: String(input?.name ?? input?.scriptName ?? ''), code: error.code ?? 'INVALID_RULE', error: error.message }
    }
  })
}

function trimCapture(value, trimStrings) {
  let result = value ?? ''
  for (const trim of trimStrings) if (trim !== '') result = result.split(trim).join('')
  return result
}

function interpolateLegacy(template, match, captures, groups, before, after, trimStrings) {
  const source = template.replace(/\{\{match\}\}/gi, '$&')
  return source.replace(/\$(\$|&|`|'|<([A-Za-z_$][\w$]*)>|(\d{1,2}))/g, (token, kind, groupName, digits) => {
    if (kind === '$') return '$'
    if (kind === '&') return trimCapture(match, trimStrings)
    if (kind === '`') return before
    if (kind === "'") return after
    if (groupName !== undefined) return trimCapture(groups?.[groupName], trimStrings)
    const index = Number(digits)
    if (index > 0 && index <= captures.length) return trimCapture(captures[index - 1], trimStrings)
    if (digits.length === 2) {
      const first = Number(digits[0])
      if (first > 0 && first <= captures.length) return `${trimCapture(captures[first - 1], trimStrings)}${digits[1]}`
    }
    return token
  })
}

function interpolateSillyTavern(template, match, captures, groups, trimStrings, evaluate) {
  return template.replace(/\{\{match\}\}/gi, '$0').replace(/\$(\d+|<([^>]+)>)/g, (_token, key, groupName) => {
    const value = groupName !== undefined ? groups?.[groupName] : Number(key) === 0 ? match : captures[Number(key) - 1]
    return trimCapture(value, trimStrings.map(trim => evaluate(trim)))
  })
}

function escapePattern(value) { return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') }

// Match a complete macro token, including nested arguments, so escaped mode quotes only its resolved value.
function substituteFind(pattern, mode, context, macroEngine, diagnostic) {
  if (mode === 0) return pattern
  let result = ''
  let start = 0
  while (start < pattern.length) {
    const open = pattern.indexOf('{{', start)
    if (open === -1) return result + pattern.slice(start)
    result += pattern.slice(start, open)
    let depth = 1
    let end = open + 2
    for (; end < pattern.length && depth > 0; end += 1) {
      if (pattern.startsWith('{{', end)) { depth += 1; end += 1 }
      else if (pattern.startsWith('}}', end)) { depth -= 1; end += 1 }
    }
    if (depth !== 0) return result + pattern.slice(open)
    const token = pattern.slice(open, end)
    const resolved = macroEngine?.evaluate(token, context) ?? token
    if (/\{\{[^{}]*\}\}/.test(resolved)) diagnostic('UNKNOWN_MACRO', 'findRegex contains an unresolved macro')
    result += mode === 2 && resolved !== token ? escapePattern(resolved) : resolved
    start = end
  }
  return result
}

function bound(value, field) {
  if (value === undefined || value === null || value === '') return undefined
  const number = typeof value === 'number' ? value : typeof value === 'string' && value.trim() !== '' ? Number(value) : NaN
  if (!Number.isFinite(number)) throw invalid('INVALID_DEPTH', `${field} must be a finite number or an empty bound`)
  return number < 0 ? undefined : number
}

function canApply(rule, context, diagnostic) {
  if (rule.enabled === false || (rule.format === 'sillytavern' && rule.disabled === true)) return false
  if (rule.format !== 'sillytavern') {
    return !Array.isArray(rule.roles) || rule.roles.includes(context.role)
  }
  if (rule.markdownOnly !== true) {
    diagnostic('NOT_DISPLAY_RULE', 'ST rule is not enabled for display; convert it explicitly to use it here')
    return false
  }
  const placements = rule.placement ?? []
  if (placements.length === 0) diagnostic('EMPTY_PLACEMENT', 'ST rule has no selected placement')
  if (placements.some(value => !SUPPORTED_PLACEMENTS.has(value))) {
    diagnostic('UNSUPPORTED_PLACEMENT', 'Only user (1), assistant (2), and reasoning (6) placements are supported')
  }
  const placement = context.placement ?? (context.part === 'reasoning' ? 6 : context.role === 'user' ? 1 : context.role === 'assistant' ? 2 : undefined)
  if (!placements.includes(placement) || !SUPPORTED_PLACEMENTS.has(placement)) return false
  if (context.isEdit === true && !rule.runOnEdit) return false
  const min = bound(rule.minDepth, 'minDepth')
  const max = bound(rule.maxDepth, 'maxDepth')
  if (min !== undefined || max !== undefined) {
    if (!Number.isInteger(context.depth) || context.depth < 0) {
      diagnostic('DEPTH_UNAVAILABLE', 'Rule has depth limits but this display has no reliable message depth')
      return false
    }
    if ((min !== undefined && context.depth < min) || (max !== undefined && context.depth > max)) return false
  }
  return true
}

export function applyRegexRules(input, rules, suppliedContext = {}, macroEngine) {
  const context = suppliedContext ?? {}
  let value = String(input ?? '')
  const diagnostics = []
  for (let index = 0; index < (rules ?? []).length; index += 1) {
    const raw = rules[index]
    let name = String(raw?.name ?? raw?.scriptName ?? '')
    const seen = new Set()
    const diagnostic = (code, error) => {
      if (seen.has(code)) return
      seen.add(code)
      diagnostics.push({ index, name, code, error })
    }
    const evaluate = text => {
      const result = macroEngine?.evaluate(text, context) ?? text
      if (/\{\{[^{}]*\}\}/.test(result)) diagnostic('UNKNOWN_MACRO', 'Rule contains an unresolved macro')
      return result
    }
    try {
      if (raw?.format === 'invalid') { diagnostic(raw.code ?? 'INVALID_RULE', raw.error); continue }
      const rule = parseRegexRule(raw)
      name = rule.name
      if (!canApply(rule, context, diagnostic)) continue
      let pattern = rule.pattern
      const trims = rule.trimStrings
      if (rule.format === 'sillytavern') {
        const mode = rule.substituteRegex ?? 0
        if (![0, 1, 2].includes(mode)) { diagnostic('UNSUPPORTED_SUBSTITUTION', 'substituteRegex must be 0, 1, or 2'); continue }
        pattern = substituteFind(pattern, mode, context, macroEngine, diagnostic)
        validatePattern(pattern)
      }
      const regex = compile(pattern, rule.flags)
      value = value.replace(regex, (...args) => {
        const match = args[0]
        const maybeGroups = args.at(-1)
        const hasGroups = typeof maybeGroups === 'object' && maybeGroups !== null
        const source = args.at(hasGroups ? -2 : -1)
        const offset = args.at(hasGroups ? -3 : -2)
        const captures = args.slice(1, hasGroups ? -3 : -2)
        const replacement = rule.format === 'sillytavern'
          ? interpolateSillyTavern(rule.replacement, match, captures, hasGroups ? maybeGroups : undefined, trims, evaluate)
          : interpolateLegacy(rule.replacement, match, captures, hasGroups ? maybeGroups : undefined,
            source.slice(0, offset), source.slice(offset + match.length), trims)
        return rule.format === 'sillytavern' ? evaluate(replacement)
          : macroEngine === undefined ? replacement : macroEngine.evaluate(replacement, context)
      })
    } catch (error) {
      diagnostic(error.code ?? 'INVALID_RULE', error instanceof Error ? error.message : String(error))
    }
  }
  return { value, diagnostics }
}
