import { describe, expect, it } from 'vitest'
import { sanitizeHtml } from '../src/core/sanitize.js'

describe('HTML and CSS sanitization', () => {
  it('keeps allowed markup while blocking scripts, handlers, unsafe URLs, and unscoped CSS', () => {
    const dirty = [
      '<div class="card" onclick="steal()">ok</div>',
      '<script>window.pwned=1</script>',
      '<a href="javascript:alert(1)">bad</a>',
      '<img src="https://example.com/a.png" onerror="steal()">',
      '<style>@import "https://evil"; .card { color: red; background:url(https://evil) }</style>',
    ].join('')
    const clean = sanitizeHtml(dirty)
    expect(clean).toContain('class="custom-card"')
    expect(clean).toContain('src="https://example.com/a.png"')
    expect(clean).toContain('.dsh-tr-message-content .custom-card')
    expect(clean).not.toMatch(/script|onclick|onerror|javascript:|@import|url\(/i)
  })

  it.each([
    ['encoded script protocol', '<a href="jav&#x61;script:alert(1)">x</a>', /href=/i],
    ['SVG payload', '<svg><a href="javascript:alert(1)">x</a></svg>', /<svg|href=/i],
    ['form payload', '<form><input name="x"><button>send</button></form>', /form|input|button/i],
    ['iframe source document', '<iframe srcdoc="<script>alert(1)</script>"></iframe>', /iframe|script/i],
    ['inline style', '<p style="background:url(https://evil)">x</p>', /style=|url\(/i],
  ])('blocks %s', (_name, dirty, forbidden) => {
    expect(sanitizeHtml(dirty)).not.toMatch(forbidden)
  })

  it('drops CSS function-based remote image loads as well as url()', () => {
    const clean = sanitizeHtml('<style>.x{background:image-set("https://evil" 1x);color:green}</style>')
    expect(clean).toContain('color: green')
    expect(clean).not.toContain('image-set')
  })
})
