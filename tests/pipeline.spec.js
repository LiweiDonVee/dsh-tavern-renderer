import { describe, expect, it } from 'vitest'
import { createRenderer } from '../src/core/index.js'

describe('pluggable rendering pipeline', () => {
  it('runs the required stages in order and allows a stage to be inserted and disabled', () => {
    const renderer = createRenderer({ templates: { assistant: '{{content}}' } })
    renderer.registerStage({
      name: 'marker',
      after: 'macros',
      run: value => `${value}!`,
    })

    const first = renderer.render('hello', { role: 'assistant' })
    expect(first.trace.map(item => item.name)).toEqual([
      'regex', 'macros', 'marker', 'expressions', 'documents', 'markdown', 'sanitize', 'template',
    ])
    expect(first.html).toContain('hello!')

    renderer.setStageEnabled('marker', false)
    expect(renderer.render('hello', { role: 'assistant' }).html).not.toContain('hello!')
  })

  it('sanitizes locally configured role templates after wrapping content', () => {
    const renderer = createRenderer({
      templates: { assistant: '<script>window.pwned=1</script><article class="dsh-tr-message">{{content}}</article>' },
    })
    const result = renderer.render('safe', { role: 'assistant' })
    expect(result.html).toContain('class="dsh-tr-message"')
    expect(result.html).not.toMatch(/script|window\.pwned/i)
  })

  it('keeps sanitized message CSS scoped and effective through final template cleaning', () => {
    const renderer = createRenderer()
    const result = renderer.render('<style>.status{color:green}</style><span class="status">ready</span>')
    expect(result.html).toContain('.dsh-tr-message-content .custom-status')
    expect(result.html).not.toContain('.dsh-tr-message-content .dsh-tr-message-content')
    expect(result.html).toContain('class="custom-status"')
  })
})
