import { afterEach, describe, expect, it } from 'vitest'
import { ThemeManager } from '../src/core/themes.js'

describe('theme and custom CSS system', () => {
  afterEach(() => {
    document.documentElement.removeAttribute('data-dsh-tavern-theme')
    document.querySelectorAll('[data-dsh-tavern-owned]').forEach(node => node.remove())
    localStorage.clear()
  })

  it('switches a built-in theme and installs scoped custom CSS', () => {
    const manager = new ThemeManager(document)
    manager.install()
    manager.setTheme('paper')
    manager.setCustomCss('.dsh-tr-message { border-color: red } body { display: none }')
    expect(document.documentElement.dataset.dshTavernTheme).toBe('paper')
    expect(manager.getCustomStyleElement().textContent).toContain('[data-dsh-tavern-renderer] .dsh-tr-message')
    expect(manager.getCustomStyleElement().textContent).not.toContain(' body')
    manager.dispose()
  })
})
