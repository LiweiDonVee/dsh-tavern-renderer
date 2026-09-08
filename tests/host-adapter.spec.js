// @vitest-environment node
import { expect, it, vi } from 'vitest'
import { build } from 'esbuild'
import { runInNewContext } from 'node:vm'

it('uses the rc.1 host image slot for assistant, user and steering images', async () => {
  const result = await build({
    entryPoints: ['src/client/renderers.jsx'], bundle: true, write: false,
    format: 'cjs', jsx: 'automatic', packages: 'external',
  })
  const module = { exports: {} }
  const jsx = (type, props) => ({ type, props })
  runInNewContext(result.outputFiles[0].text, {
    module, exports: module.exports,
    require(name) {
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx }
      if (name === 'react') return {
        memo: fn => fn, useMemo: fn => fn(), useCallback: fn => fn,
        useRef: value => ({ current: value }), useState: value => [value, vi.fn()],
      }
      if (name === '@deepseek-ai/dsh-client-ui-primitives') return {}
      throw new Error(`Undeclared host component dependency: ${name}`)
    },
  })
  const renderMessageImages = vi.fn(() => null)
  const common = { renderMessageImages, renderTavern: () => ({ html: '', trace: [] }), t: key => key }
  const attachment = { id: 'test-image' }
  module.exports.TavernAssistantNode({ ...common, node: { data: {
    status: 'settled', blocks: [{ kind: 'image', attachment }],
  } } })
  expect(renderMessageImages).toHaveBeenLastCalledWith({ images: [{ kind: 'image', attachment }], align: 'start' })
  for (const kind of ['user', 'steering']) {
    module.exports.TavernUserNode({ ...common, node: { kind, data: {
      content: [{ type: 'image', attachment }],
    } } })
    expect(renderMessageImages).toHaveBeenLastCalledWith({ images: [{ attachment }], align: 'end' })
  }
})
