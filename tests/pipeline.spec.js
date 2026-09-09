import { describe, expect, it } from 'vitest'
import { createRenderer, RenderPipeline } from '../src/core/index.js'

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

  it('fails closed when the security-critical sanitize stage throws', () => {
    const renderer = createRenderer({ templates: { assistant: '{{content}}' } })
    const sanitize = renderer.pipeline.stages.find(stage => stage.name === 'sanitize')
    sanitize.run = () => { throw new Error('sanitizer unavailable') }

    const result = renderer.render('<script>window.pwned=1</script><img src="javascript:alert(1)">')

    expect(result.html).toBe('')
    expect(result.html).not.toMatch(/script|pwned|javascript|alert/i)
    expect(result.error).toEqual(expect.objectContaining({
      code: 'RENDER_STAGE_FAILED',
      stage: 'sanitize',
      securityCritical: true,
    }))
    expect(result.trace).toContainEqual(expect.objectContaining({
      name: 'sanitize',
      error: 'sanitizer unavailable',
      securityCritical: true,
    }))
    expect(result.diagnostics).toContainEqual(expect.objectContaining({
      stage: 'sanitize',
      error: 'sanitizer unavailable',
      securityCritical: true,
    }))
    expect(result.trace.map(item => item.name)).not.toContain('template')
  })

  it('fails closed when the template final sanitize stage throws', () => {
    const renderer = createRenderer()
    const template = renderer.pipeline.stages.find(stage => stage.name === 'template')
    template.run = () => { throw new Error('final sanitizer unavailable') }

    const result = renderer.render('<script>window.pwned=1</script>safe')

    expect(result.html).toBe('')
    expect(result.html).not.toMatch(/script|pwned/i)
    expect(result.error).toEqual(expect.objectContaining({
      code: 'RENDER_STAGE_FAILED',
      stage: 'template',
      securityCritical: true,
    }))
    expect(result.trace).toContainEqual(expect.objectContaining({
      name: 'template',
      error: 'final sanitizer unavailable',
      securityCritical: true,
    }))
    expect(result.trace.map(item => item.name)).toEqual([
      'regex', 'macros', 'expressions', 'documents', 'markdown', 'sanitize', 'template',
    ])
  })

  it.each(['sanitize', 'template'])('rejects disabling the built-in %s security stage', stageName => {
    expect(() => createRenderer({ stages: { [stageName]: false } }))
      .toThrowError(`cannot disable security-critical stage: ${stageName}`)

    const renderer = createRenderer()
    expect(() => renderer.configure({ stages: { [stageName]: false } }))
      .toThrowError(`cannot disable security-critical stage: ${stageName}`)
    expect(() => renderer.setStageEnabled(stageName, false))
      .toThrowError(`cannot disable security-critical stage: ${stageName}`)
    expect(renderer.pipeline.stages.find(stage => stage.name === stageName).enabled).not.toBe(false)
  })

  it('fails closed for custom security-critical stages', () => {
    const pipeline = new RenderPipeline([
      { name: 'guard', securityCritical: true, run: () => { throw new Error('custom guard unavailable') } },
      { name: 'after', run: () => '<script>should-not-run()</script>' },
    ])
    const diagnostics = []

    const result = pipeline.run('<script>untrusted</script>', { diagnostics })

    expect(result.html).toBe('')
    expect(result.error).toEqual(expect.objectContaining({
      code: 'RENDER_STAGE_FAILED',
      stage: 'guard',
      securityCritical: true,
    }))
    expect(result.trace.map(item => item.name)).toEqual(['guard'])
    expect(diagnostics).toContainEqual(expect.objectContaining({
      stage: 'guard',
      error: 'custom guard unavailable',
      securityCritical: true,
    }))
  })

  it('continues after ordinary stage errors while exposing the failure in diagnostics', () => {
    const pipeline = new RenderPipeline([
      { name: 'ordinary', run: () => { throw new Error('ordinary failure') } },
      { name: 'after', run: value => `${value}!` },
    ])

    const result = pipeline.run('ok', { diagnostics: [] })

    expect(result.html).toBe('ok!')
    expect(result.error).toBeUndefined()
    expect(result.trace).toContainEqual({ name: 'ordinary', error: 'ordinary failure' })
    expect(result.trace).toContainEqual({ name: 'after' })
  })
})
