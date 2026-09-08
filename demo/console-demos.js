// ============================================================
// DSH Tavern Renderer — 浏览器控制台 API 演示
// 用法：打开 http://127.0.0.1:3091 （确认插件已加载），按 F12 → Console，
//       逐段复制执行。每段都打印可直接观察的结果。
// 最后一段会还原 localStorage 里的配置/主题/自定义 CSS。
// ============================================================

// ---------- 0. 探针：插件是否加载 ----------
console.log('version =', window.DeepSeekTavernRenderer?.version)
console.log('根节点标记 =', document.documentElement.dataset.dshTavernRendererVersion)

// ---------- 1. 离线管线：render() 返回 { html, trace, diagnostics } ----------
const r = DeepSeekTavernRenderer.render('# 你好 {{char}}\n\n**粗体** 和 {{js:: 6 * 7 }}')
console.log(r.html)          // 完整管线输出（已含角色模板包装）
console.log('trace =', r.trace)  // ['regex','macros','expressions','markdown','sanitize','template']

// ---------- 2. 上下文宏：persona/description/scenario 只能在这里注入 ----------
console.log(DeepSeekTavernRenderer.render('{{user}} 问 {{char}}：{{persona}}', {
  char: 'Luna', user: 'Alex', persona: '冷静的向导', role: 'assistant',
}).html)

// ---------- 3. 角色模板：system / assistant / user 三种包装 ----------
console.log('system   :', DeepSeekTavernRenderer.render('系统提示', { role: 'system' }).html)
console.log('assistant:', DeepSeekTavernRenderer.render('助手回答', { role: 'assistant' }).html)
console.log('user     :', DeepSeekTavernRenderer.render('用户发言', { role: 'user' }).html)

// 自定义模板（configure 会持久化到 localStorage）
DeepSeekTavernRenderer.configure({
  char: 'Luna',
  user: 'Alex',
  templates: { assistant: '<article class="dsh-tr-message">{{content}}</article>' },
})
console.log(DeepSeekTavernRenderer.render('我是{{char}}，你好{{user}}').html)

// ---------- 4. 正则规则：紧凑语法 /pattern/replacement/flags ----------
DeepSeekTavernRenderer.configure({ regexRules: ['/([A-Z]+)-(\\d+)/编号 $2 类型 $1/g'] })
console.log(DeepSeekTavernRenderer.render('任务 M-42 完成，M-99 待办').html)

// ---------- 5. 正则规则：SillyTavern 对象语法（roles 过滤 + 替换串里的宏） ----------
DeepSeekTavernRenderer.configure({ regexRules: [{
  name: 'dialogue',
  findRegex: '/“([^”]+)”/g',
  replaceString: '<span class="dialogue">“$1”</span>（{{char}} 曰）',
  roles: ['assistant'],
}] })
console.log('assistant:', DeepSeekTavernRenderer.render('“黑夜给了我黑色的眼睛”', { role: 'assistant' }).html)
console.log('user 命中?:', DeepSeekTavernRenderer.render('“这条因为 roles 过滤不会命中”', { role: 'user' }).html)

// ---------- 6. 扩展宏 ----------
const off = DeepSeekTavernRenderer.registerMacro('upper', ({ args }) => args.join('::').toUpperCase())
console.log(DeepSeekTavernRenderer.render('{{upper::hello::world}}').html) // HELLO::WORLD
off() // 注销

// ---------- 7. 扩展阶段 + 阶段开关 ----------
const remove = DeepSeekTavernRenderer.registerStage({
  name: 'append-marker',
  after: 'macros',
  run: (value) => `${value}\n\n> -- 结尾标记 --`,
})
console.log(DeepSeekTavernRenderer.render('正文').html)
remove() // 移除

DeepSeekTavernRenderer.setStageEnabled('expressions', false)
console.log('表达式关闭:', DeepSeekTavernRenderer.render('{{js:: 1 + 1 }}').html) // 原样输出
DeepSeekTavernRenderer.setStageEnabled('expressions', true) // 记得恢复

// ---------- 8. 主题与自定义 CSS（持久化到 localStorage，刷新不丢） ----------
DeepSeekTavernRenderer.setTheme('tavern-dark')  // 或 'paper' / 'harness'
DeepSeekTavernRenderer.setCustomCss('.dsh-tr-message { line-height: 1.85 }')

// ---------- 9. 安全清洗自检：全部应被拦截或改写 ----------
console.log(DeepSeekTavernRenderer.render('<script>alert(1)</script><img src="javascript:alert(1)" onerror="x">').html)
console.log(DeepSeekTavernRenderer.render('<a href="https://ok.example">链接</a>').html)
console.log(DeepSeekTavernRenderer.render('<svg onload="x"><circle></svg>').html)

// ---------- 10. 还原默认（清掉本演示写进 localStorage 的一切） ----------
localStorage.removeItem('dsh-tavern-renderer.config')
localStorage.removeItem('dsh-tavern-renderer.theme')
localStorage.removeItem('dsh-tavern-renderer.custom-css')
location.reload()
