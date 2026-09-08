import { describe, expect, it } from 'vitest'
import { createRenderer } from '../src/core/index.js'

function renderer() {
  return createRenderer({ templates: { assistant: '{{content}}' } })
}

const samples = [
  ['letter', 'from: Luna\nto: Alex\ndate: 15 August 2026\nsubject: The observatory\nseal: crimson', 'Dear **Alex**,', 'custom-dtr-doc-letter', 'The observatory'],
  ['exam', 'title: Astral Navigation Examination\ncourse: NAV-204\nstudent: Alex\nduration: 90 minutes\ntotal: 100', '1. Plot the **course**.', 'custom-dtr-doc-exam', '100'],
  ['postcard', 'from: Luna\nto: Alex\nlocation: Selene Harbor\ndate: 2086-04-12\nstamp: airmail', 'Wish you were **here**.', 'custom-dtr-doc-postcard', 'Selene Harbor'],
  ['cipher', 'classification: eyes only\ncode: NIGHTJAR-7\nfrom: L\nto: A\nkey: ORBIT', '` rendezvous = 23:10 `', 'custom-dtr-doc-cipher', 'NIGHTJAR-7'],
  ['telegram', 'priority: urgent\nfrom: LUNA\nto: ALEX\nstation: NORTH TERMINAL\ncharge: 17 words', 'ARRIVE BEFORE **MIDNIGHT** STOP', 'custom-dtr-doc-telegram', 'NORTH TERMINAL'],
  ['newspaper', 'name: The Meridian Gazette\ndate: August 15, 2026\nedition: Late City\nheadline: LIGHTS OVER THE HARBOR\nbyline: Mira Vale', 'Witnesses reported a **silent arc**.', 'custom-dtr-doc-newspaper', 'LIGHTS OVER THE HARBOR'],
  ['dossier', 'agency: Archive Bureau\nfile: AX-194\nsubject: Alex Rowan\nclassification: restricted\nstatus: active\nhandler: L. Chen', '- Known alias: **Northstar**', 'custom-dtr-doc-dossier', 'AX-194'],
  ['diary', 'owner: Luna\ndate: August 15\ntime: 23:40\nlocation: West Tower\nmood: restless\ntitle: The signal', 'Tonight the receiver spoke *my name*.', 'custom-dtr-doc-diary', 'The signal'],
]

describe('immersive document templates', () => {
  it.each(samples)('renders the %s directive from concise fields and Markdown', (type, fields, body, className, marker) => {
    const source = `:::${type}\n${fields}\n---\n${body}\n:::`
    const result = renderer().render(source, { role: 'assistant' })

    expect(result.html).toContain(className)
    expect(result.html).toContain(marker)
    expect(result.html).toContain('<strong>')
    expect(result.html).not.toContain('<p></p>')
    expect(result.trace.map(item => item.name)).toEqual([
      'regex', 'macros', 'expressions', 'documents', 'markdown', 'sanitize', 'template',
    ])
  })

  it('escapes metadata, sanitizes body HTML, and never turns field values into classes', () => {
    const source = [
      ':::letter',
      'from: <img src=x onerror=alert(1)>',
      'to: Alex',
      'seal: crimson dsh-tr-root',
      '---',
      '<script>window.pwned = true</script>Safe body',
      ':::',
    ].join('\n')
    const html = renderer().render(source).html

    expect(html).toContain('&lt;img src=x onerror=alert(1)&gt;')
    expect(html).toContain('Safe body')
    expect(html).not.toMatch(/<img|<script|window\.pwned/i)
    expect(html).not.toContain('custom-dsh-tr-root')
  })

  it('leaves unknown and settled incomplete directives literal', () => {
    const unknown = renderer().render(':::manifest\ntitle: Cargo\n---\nItem\n:::').html
    const incomplete = renderer().render(':::letter\nfrom: Luna\n---\nStill writing').html

    expect(unknown).not.toContain('custom-dtr-doc')
    expect(unknown).toContain(':::manifest')
    expect(incomplete).not.toContain('custom-dtr-doc-letter')
    expect(incomplete).toContain(':::letter')
  })

  it('renders an incomplete known directive as a live draft only while streaming', () => {
    const source = ':::letter\nfrom: Luna\nto: Alex\n---\nStill **writing**'
    const html = renderer().render(source, { streaming: true }).html

    expect(html).toContain('custom-dtr-doc-letter')
    expect(html).toContain('custom-dtr-doc-streaming')
    expect(html).toContain('<strong>writing</strong>')
    expect(html).toContain('Draft')
    expect(html).toContain('role="status"')
  })

  it('resolves identity macros before assigning fields', () => {
    const source = ':::postcard\nfrom: {{char}}\nto: {{user}}\n---\nHello from the coast.\n:::'
    const html = renderer().render(source, { char: 'Luna', user: 'Alex' }).html

    expect(html).toContain('Luna')
    expect(html).toContain('Alex')
    expect(html).not.toContain('{{char}}')
  })

  it('does not let message text forge an internal document slot', () => {
    const forged = '\uE000DTRDOC0:0\uE001'
    const source = `${forged}\n\n:::letter\nfrom: Luna\nto: Alex\n---\nAuthentic\n:::`
    const html = renderer().render(source).html

    expect(html.match(/custom-dtr-doc-letter/g)).toHaveLength(1)
  })
})
