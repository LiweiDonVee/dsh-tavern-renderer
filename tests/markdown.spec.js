import { describe, expect, it } from 'vitest'
import { markdownToHtml } from '../src/core/markdown.js'

describe('Markdown rendering', () => {
  it('renders emphasis, strong, deletion, code, fences, lists, quotes, and links', () => {
    const source = [
      '*em* **strong** ~~gone~~ `code`',
      '',
      '> quote',
      '',
      '- one',
      '- two',
      '',
      '[safe](https://example.com)',
      '',
      '```js',
      '<b>literal</b>',
      '```',
    ].join('\n')
    const html = markdownToHtml(source)
    expect(html).toContain('<em>em</em>')
    expect(html).toContain('<strong>strong</strong>')
    expect(html).toContain('<del>gone</del>')
    expect(html).toContain('<code>code</code>')
    expect(html).toContain('<blockquote>')
    expect(html).toContain('<ul>')
    expect(html).toContain('href="https://example.com"')
    expect(html).toContain('&lt;b&gt;literal&lt;/b&gt;')
  })

  it('renders tables and leaves raw HTML for the sanitizer', () => {
    const html = markdownToHtml('| Name | Value |\n| --- | --- |\n| A | **1** |\n\n<div class="box">raw</div>')
    expect(html).toContain('<table>')
    expect(html).toContain('<strong>1</strong>')
    expect(html).toContain('<div class="box">raw</div>')
  })

  it('preserves backslashes that are not Markdown escapes', () => {
    const html = markdownToHtml(String.raw`C:\Projects\example`)
    expect(html).toContain(String.raw`C:\Projects\example`)
  })

  it('still escapes Markdown punctuation', () => {
    expect(markdownToHtml(String.raw`\*literal*`)).toContain('<p>*literal*</p>')
  })

  it('reduces an escaped backslash to one literal backslash', () => {
    expect(markdownToHtml(String.raw`\\`)).toBe(String.raw`<p>\</p>`)
  })
})
