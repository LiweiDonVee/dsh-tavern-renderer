// @vitest-environment node
import { afterAll, beforeAll, expect, it, vi } from 'vitest'
import { JSDOM } from 'jsdom'
import { build } from 'esbuild'
import { runInNewContext } from 'node:vm'
import { createRequire } from 'node:module'
import React from 'react'
import { renderToStaticMarkup } from 'react-dom/server'
import { createRenderer } from '../src/core/index.js'

let components
let dom
beforeAll(async () => {
  dom = new JSDOM('<!doctype html><html><body></body></html>')
  vi.stubGlobal('document', dom.window.document)
  const result = await build({
    entryPoints: ['src/client/renderers.jsx'], bundle: true, write: false,
    format: 'cjs', jsx: 'automatic', packages: 'external',
  })
  const module = { exports: {} }
  const require = createRequire(import.meta.url)
  runInNewContext(result.outputFiles[0].text, {
    module, exports: module.exports, window: dom.window,
    require: name => name === '@deepseek-ai/dsh-client-ui-primitives' ? {
      JsonBlock: ({ payload }) => React.createElement('pre', null, JSON.stringify(payload)),
      Tooltip: ({ children }) => children,
      IconCheckOutlineRegular: () => null,
      IconCopyOutlineRegular: () => null,
      IconThinkOutlineRegular: () => null,
      FileTypeIcon: () => null,
      fileSizeText: bytes => `${bytes} B`,
    } : require(name),
  })
  components = module.exports
})
afterAll(() => { dom.window.close(); vi.unstubAllGlobals() })

function props() {
  const renderer = createRenderer()
  return {
    renderTavern: (text, context) => renderer.render(text, context),
    t: (key, values) => values?.labels ?? key,
    loadImage: vi.fn(),
    renderFactorySlot: (name, owner) => React.createElement('span', {
      'data-gallery': name, 'data-align': owner.align,
    }, owner.images.map(image => image.attachment.id).join(',')),
  }
}

it('renders assistant image groups through the authorized DSH image factory', () => {
  const common = props()
  const image = { id: 'output-image' }
  const renderFactorySlot = vi.fn(common.renderFactorySlot)
  const html = renderToStaticMarkup(React.createElement(components.TavernAssistantNode, {
    ...common, renderFactorySlot,
    node: { data: { status: 'settled', blocks: [{ kind: 'image', attachment: image }] } },
  }))
  expect(html).toContain('output-image')
  expect(renderFactorySlot).toHaveBeenCalledWith('conversation.images.content', {
    images: [{ attachment: image }], loadImage: common.loadImage, align: 'start',
  })
})

it('keeps user files, images and reference labels visible in original attachment order', () => {
  for (const kind of ['user', 'steering']) {
    const html = renderToStaticMarkup(React.createElement(components.TavernUserNode, {
      ...props(),
      node: { kind, data: {
        content: [
          { type: 'text', text: '**hello**' },
          { type: 'file', attachment: { name: 'notes.txt', bytes: 120, id: 'file-a' } },
          { type: 'image', attachment: { id: 'input-image' } },
        ],
        referenceLabels: ['Session A'],
      } },
    }))
    expect(html).toContain('<strong>hello</strong>')
    expect(html).toContain('notes.txt')
    expect(html).not.toContain('&quot;bytes&quot;')
    expect(html.indexOf('notes.txt')).toBeLessThan(html.indexOf('input-image'))
    expect(html).toContain('Session A')
    expect(html).toContain('conversation.images.content')
  }
})

it('renders only the requested reasoning or response portion of a grouped assistant step', () => {
  const node = { data: { status: 'interrupted', blocks: [
    { kind: 'reasoning', text: 'hidden thought' },
    { kind: 'text', text: 'visible answer' },
  ] } }
  const render = groupPart => renderToStaticMarkup(React.createElement(components.TavernAssistantNode, {
    ...props(), node, groupPart,
  }))
  const response = render('response')
  expect(response).toContain('visible answer')
  expect(response).not.toContain('hidden thought')
  expect(response).toContain('message.stopped')
  const reasoning = render('reasoning')
  expect(reasoning).toContain('hidden thought')
  expect(reasoning).not.toContain('visible answer')
  expect(reasoning).not.toContain('message.stopped')
})

it('keeps completed reasoning hidden with its collapsed turn process', () => {
  const node = { data: { step: 4, status: 'settled', blocks: [
    { kind: 'reasoning', text: 'private thought' },
    { kind: 'text', text: 'public answer' },
  ] } }
  const html = renderToStaticMarkup(React.createElement(components.TavernAssistantNode, {
    ...props(), node,
    turnProcess: { foldable: true, open: false, spec: { answerStep: 4, inlineReasoning: true } },
  }))
  expect(html).toMatch(/hidden[^>]*>[\s\S]*private thought/)
  expect(html).toContain('public answer')
})
