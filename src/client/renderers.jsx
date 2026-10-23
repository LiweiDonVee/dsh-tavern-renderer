import { memo, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  FileTypeIcon, fileSizeText, IconCheckOutlineRegular, IconCopyOutlineRegular, IconThinkOutlineRegular, JsonBlock, Tooltip, writeClipboard,
} from '@deepseek-ai/dsh-client-ui-primitives'
function SafeHtml({ result, className }) {
  return (
    <div
      className={className}
      data-render-trace={result.trace.map(item => item.name).join(',')}
      dangerouslySetInnerHTML={{ __html: result.html }}
    />
  )
}

function CopyAction({ text, t }) {
  const [copied, setCopied] = useState(false)
  const timer = useRef(null)
  useEffect(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current)
  }, [])
  const copy = useCallback(() => {
    if (copied) return
    void writeClipboard(text).then(ok => {
      if (!ok) return
      setCopied(true)
      if (timer.current !== null) window.clearTimeout(timer.current)
      timer.current = window.setTimeout(() => {
        timer.current = null
        setCopied(false)
      }, 1000)
    })
  }, [copied, text])
  return (
    <Tooltip label={copied ? t('copied') : t('copy')} side="bottom">
      <button type="button" className="dsh-tr-copy" aria-label={copied ? t('copied') : t('copy')} onClick={copy}>
        {copied ? <IconCheckOutlineRegular size={16} /> : <IconCopyOutlineRegular size={16} />}
      </button>
    </Tooltip>
  )
}

function ReasoningBlock({ text, running, renderTavern, hidden, t }) {
  const summary = (running ? text.trimEnd().split('\n').at(-1) : text.split('\n')[0]) || 'Think'
  const result = useMemo(
    () => renderTavern(text, { role: 'assistant', streaming: running }),
    [renderTavern, running, text],
  )
  return (
    <details className="dsh-tr-reasoning" hidden={hidden || undefined} data-running={running || undefined}>
      <summary>
        <IconThinkOutlineRegular size={14} />
        <span>{t('message.think')}</span>
        <span className="dsh-tr-reasoning-summary">{summary}</span>
      </summary>
      <SafeHtml result={result} className="dsh-tr-reasoning-body" />
    </details>
  )
}

export const TavernAssistantNode = memo(function TavernAssistantNode({ node, groupPart, turnProcess, renderFactorySlot, loadImage, renderTavern, t }) {
  const { blocks, status } = node.data
  const streaming = status === 'running'
  const reasoningHidden = turnProcess?.foldable === true && !turnProcess.open
    && turnProcess.spec.answerStep === node.data.step && turnProcess.spec.inlineReasoning
  const visible = blocks.some(block => block.kind !== 'tool-call')
  const rendered = []
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index]
    if (groupPart === 'reasoning' && block.kind !== 'reasoning') continue
    if (groupPart === 'response' && block.kind === 'reasoning') continue
    if (block.kind === 'text') {
      const result = renderTavern(block.text, { role: 'assistant', streaming })
      rendered.push(<SafeHtml key={index} result={result} />)
    } else if (block.kind === 'reasoning') {
      if (block.text.trim() === '') continue
      rendered.push(
        <ReasoningBlock
          key={index}
          text={block.text}
          running={streaming && index === blocks.length - 1}
          renderTavern={renderTavern}
          hidden={reasoningHidden}
          t={t}
        />,
      )
    } else if (block.kind === 'image') {
      const start = index
      const images = [block]
      while (blocks[index + 1]?.kind === 'image') images.push(blocks[++index])
      rendered.push(<div key={start}>{renderFactorySlot('conversation.images.content', {
        images: images.map(({ attachment }) => ({ attachment })), loadImage, align: 'start',
      })}</div>)
    } else if (block.kind !== 'tool-call') {
      rendered.push(
        <JsonBlock
          key={index}
          label={t('message.unknownBlock')}
          payload={block.block}
          truncatedLabel={total => t('json.truncated', { total })}
        />,
      )
    }
  }
  if (!visible && !streaming && status !== 'interrupted') return null
  return (
    <div className="dsh-tr-root dsh-tr-assistant-root" data-dsh-tavern-renderer data-streaming={streaming || undefined}>
      {rendered}
      {status === 'interrupted' && (groupPart !== 'reasoning'
        || !blocks.some(block => block.kind !== 'reasoning' && block.kind !== 'tool-call'))
        && <span className="dsh-tr-stopped">{t('message.stopped')}</span>}
    </div>
  )
})

function splitContent(content) {
  const texts = []
  const attachments = []
  const rest = []
  for (const block of content) {
    if (block?.type === 'text' && typeof block.text === 'string') texts.push(block.text)
    else if ((block?.type === 'image' || block?.type === 'file') && block.attachment !== undefined) attachments.push(block)
    else rest.push(block)
  }
  return { text: texts.join(''), attachments, rest }
}

export const TavernUserNode = memo(function TavernUserNode({ node, renderFactorySlot, loadImage, renderTavern, t }) {
  const { text, attachments, rest } = splitContent(node.data.content)
  const result = useMemo(
    () => renderTavern(text, { role: 'user' }),
    [renderTavern, text],
  )
  return (
    <div className="dsh-tr-root dsh-tr-user-root" data-dsh-tavern-renderer>
      <div className="dsh-tr-user-stack">
        {attachments.length > 0 && <div className="dsh-tr-attachments" data-message-attachments>
          {attachments.map((block, index) => block.type === 'image'
            ? <div key={index}>{renderFactorySlot('conversation.images.content', {
              images: [{ attachment: block.attachment }], loadImage, align: 'end', compact: attachments.length > 1,
            })}</div>
            : <span key={index} className="dsh-tr-file" title={block.attachment.name}>
              <FileTypeIcon path={block.attachment.name} />
              <span>{block.attachment.name}<small>{fileSizeText(block.attachment.bytes)}</small></span>
            </span>)}
        </div>}
        {(text !== '' || rest.length > 0) && (
          <div className="dsh-tr-user-bubble">
            {text !== '' && <SafeHtml result={result} />}
            {rest.map((block, index) => (
              <JsonBlock
                key={index}
                label={t('message.extraBlock')}
                payload={block}
                truncatedLabel={total => t('json.truncated', { total })}
              />
            ))}
          </div>
        )}
        {node.data.referenceLabels?.length > 0 && <div className="dsh-tr-references">
          {t('message.referenceSummary', { labels: node.data.referenceLabels.join(t('message.referenceSeparator')) })}
        </div>}
      </div>
      {text !== '' && (
        <div className="dsh-tr-user-actions">
          {typeof node.data.time === 'number' && <time dateTime={new Date(node.data.time).toISOString()}>{new Date(node.data.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</time>}
          <CopyAction text={text} t={t} />
        </div>
      )}
    </div>
  )
})
