/** Read only the documented regex container. Other preset extensions remain inert. */
export function parseRegexImport(input) {
  const document = JSON.parse(typeof input === 'string' ? input : JSON.stringify(input))
  let source = 'rule'
  let records
  if (Array.isArray(document)) { source = 'array'; records = document }
  else if (document !== null && typeof document === 'object' && Object.hasOwn(document, 'extensions')) {
    source = 'preset'
    records = document.extensions?.regex_scripts
    if (records === undefined) return { source, rules: [], summary: summaryOf([]), message: '此预设没有 extensions.regex_scripts，配置未改变。' }
    if (!Array.isArray(records)) throw new TypeError('preset.extensions.regex_scripts must be an array')
  } else if (document !== null && typeof document === 'object' && Object.hasOwn(document, 'findRegex')) records = [document]
  else throw new TypeError('请导入 ST 正则对象、正则数组或含 extensions.regex_scripts 的完整预设 JSON。')
  const rules = records.map(record => record !== null && typeof record === 'object' && !Array.isArray(record)
    ? { ...record, format: 'sillytavern' }
    : { format: 'invalid', original: record, error: 'ST regex record must be an object' })
  return { source, rules, summary: summaryOf(rules) }
}

function summaryOf(rules) {
  return {
    total: rules.length,
    display: rules.filter(rule => rule?.markdownOnly === true).length,
    disabled: rules.filter(rule => rule?.disabled === true || rule?.enabled === false).length,
    promptOnly: rules.filter(rule => rule?.promptOnly === true && rule?.markdownOnly !== true).length,
  }
}
