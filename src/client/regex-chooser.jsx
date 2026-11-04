import { useEffect, useMemo, useRef, useState, useSyncExternalStore } from 'react'
import { Modal } from '@deepseek-ai/dsh-client-ui-primitives'
import { parseRegexRule } from '../core/regex.js'

function ruleInfo(rules) {
  const diagnostics = []
  let errors = 0
  let unsupported = 0
  for (const [index, raw] of rules.entries()) {
    const name = raw?.scriptName ?? raw?.name ?? `规则 ${index + 1}`
    const report = (text, kind) => {
      if (kind === 'error') errors += 1
      if (kind === 'unsupported') unsupported += 1
      diagnostics.push(`${index + 1}. ${name}：${text}`)
    }
    if (raw?.format === 'invalid') { report(raw.error, 'error'); continue }
    try {
      const rule = parseRegexRule(raw)
      if (rule.format === 'legacy' || rule.enabled === false || rule.disabled === true) continue
      if (rule.markdownOnly !== true) report(rule.promptOnly ? '仅 prompt，本插件不改变模型输入。' : '未启用 ST 显示阶段。')
      if (!rule.placement?.length) report('没有选择作用位置。', 'unsupported')
      else if (rule.placement.some(value => ![1, 2, 6].includes(value))) report('部分作用位置不受支持，仅处理用户、正文和推理。', 'unsupported')
      if (![0, 1, 2].includes(rule.substituteRegex ?? 0)) report('不支持此查找宏替换模式。', 'unsupported')
      for (const key of ['minDepth', 'maxDepth']) {
        const value = rule[key]
        if (value !== undefined && value !== null && value !== '' && !Number.isFinite(typeof value === 'number' || typeof value === 'string' ? Number(value) : NaN)) report(`${key} 不是有效数字。`, 'error')
      }
    } catch (error) { report(error.message, 'error') }
  }
  return { diagnostics, errors, unsupported }
}

export function RegexChooser({ sessionId, configStore, regexApi }) {
  useSyncExternalStore(configStore.subscribe, configStore.getSnapshot, configStore.getSnapshot)
  const [open, setOpen] = useState(false)
  const [message, setMessage] = useState('')
  const fileInput = useRef(null)
  const mounted = useRef(true)
  useEffect(() => { mounted.current = true; return () => { mounted.current = false } }, [])
  const config = configStore.current()
  const selection = config.sessionRegexSelections[sessionId]
  const selected = config.regexRuleSets.find(set => set.id === selection)
  const legacy = selection === undefined && config.regexRules.length > 0
  const selectedRules = selected?.rules ?? (legacy ? config.regexRules : [])
  const { diagnostics, errors, unsupported } = useMemo(() => ruleInfo(selectedRules), [selectedRules])
  const selectedName = selected?.name ?? (legacy ? '旧全局规则' : '无')
  const onFile = async event => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    try {
      const source = await file.text()
      if (!mounted.current) return
      const result = regexApi.importRegexRuleSet(source, { sessionId, name: file.name.replace(/\.json$/i, '') })
      setMessage(result.message ?? (result.rules.length === 0 ? '文件中没有正则，配置未改变。' : `已导入 ${result.summary.total} 条，并用于本会话。`))
    } catch (error) { if (mounted.current) setMessage(`导入失败：${error.message}`) }
  }
  return <>
    <button type="button" className="dsh-tr-regex-trigger" aria-label="显示正则" title={`显示正则：${selectedName}`} onClick={() => setOpen(true)}>显示正则</button>
    <Modal open={open} onClose={() => setOpen(false)} title="显示正则" closeLabel="关闭显示正则" className="dsh-tr-regex-dialog"
      description="只改变当前会话的显示；复制原文、会话记录和模型输入保持原样。">
      <div className="dsh-tr-regex-controls">
        <label>本会话规则集
          <select aria-label="本会话规则集" data-modal-autofocus value={selected?.id ?? (legacy ? '__legacy__' : '')}
            onChange={event => { regexApi.selectRegexRuleSet(sessionId, event.target.value === '__legacy__' ? undefined : event.target.value || null); setMessage('') }}>
            <option value="">无</option>
            {config.regexRules.length > 0 && <option value="__legacy__">旧全局规则</option>}
            {config.regexRuleSets.map(set => <option key={set.id} value={set.id}>{set.name}</option>)}
          </select>
        </label>
        <input ref={fileInput} type="file" accept="application/json,.json" aria-label="导入 ST JSON 文件" hidden onChange={onFile} />
        <button type="button" onClick={() => fileInput.current?.click()}>导入并用于本会话</button>
      </div>
      <p className="dsh-tr-regex-note">支持单条正则、正则数组、整份 ST 预设。仅导入其中的正则显示分支；其他扩展脚本不会执行。</p>
      <p><strong>{selectedName}</strong>{selected && ` · ${selected.source === 'preset' ? 'ST 预设' : selected.source === 'array' ? '正则数组' : '单条正则'}`}</p>
      {selected && <p className="dsh-tr-regex-note">共 {selected.summary.total} 条 · 用于显示 {selected.summary.display} · 禁用 {selected.summary.disabled} · 仅 prompt {selected.summary.promptOnly} · 错误 {errors} · 不支持项 {unsupported}</p>}
      {diagnostics.length > 0 && <details className="dsh-tr-regex-info"><summary>规则信息与不支持项（{diagnostics.length}）</summary><ul>{diagnostics.map((text, index) => <li key={index}>{text}</li>)}</ul></details>}
      {message && <p role="status">{message}</p>}
      {configStore.getStorageError() && <p role="alert">{configStore.getStorageError()}</p>}
      {selected && <button type="button" className="dsh-tr-regex-delete" onClick={() => { regexApi.deleteRegexRuleSet(selected.id); setMessage('规则集已删除，使用它的会话已停用正则。') }}>删除此规则集</button>}
    </Modal>
  </>
}
