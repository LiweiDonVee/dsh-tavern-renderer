import { describe, expect, it } from 'vitest'
import { applyRoleTemplate } from '../src/core/templates.js'

describe('message role templates', () => {
  it('selects system/user/assistant wrappers and escapes context substitutions', () => {
    const templates = {
      system: '<aside data-role="{{role}}">{{content}}</aside>',
      user: '<section data-name="{{user}}">{{content}}</section>',
      assistant: '<article data-name="{{char}}">{{content}}</article>',
    }
    expect(applyRoleTemplate('<p>ok</p>', 'system', { char: 'Luna', user: 'Alex' }, templates)).toContain('<aside')
    expect(applyRoleTemplate('<p>ok</p>', 'user', { char: 'Luna', user: '<Alex>' }, templates)).toContain('&lt;Alex&gt;')
    expect(applyRoleTemplate('<p>ok</p>', 'assistant', { char: 'Luna', user: 'Alex' }, templates)).toContain('data-name="Luna"')
  })
})
