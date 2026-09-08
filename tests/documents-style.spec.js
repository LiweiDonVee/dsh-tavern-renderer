import { readFileSync } from 'node:fs'
import { describe, expect, it } from 'vitest'

const css = readFileSync('src/client/plugin.css', 'utf8')

describe('immersive document styles', () => {
  it('gives every built-in document a scoped visual identity', () => {
    for (const type of ['letter', 'exam', 'postcard', 'cipher', 'telegram', 'newspaper', 'dossier', 'diary']) {
      expect(css).toContain(`.dsh-tr-message-content .custom-dtr-doc-${type}`)
    }
    expect(css).not.toMatch(/(^|[},]\s*)(?:html|body|:root)\b/m)
    expect(css).not.toContain('overflow: visible')
  })

  it('includes mobile, print, reduced-motion, and forced-color adaptations', () => {
    expect(css).toContain('@media (max-width: 640px)')
    expect(css).toContain('@media print')
    expect(css).toContain('@media (prefers-reduced-motion: reduce)')
    expect(css).toContain('@media (forced-colors: active)')
  })
})
