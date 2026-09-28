# DeepSeek Harness Tavern Renderer

面向 DeepSeek Harness 的自包含“酒馆式”消息渲染插件。它以 Harness 原生 Cordis keyed slot 接入，不改 Harness 源码，并提供有序正则、宏/变量、安全表达式、Markdown、HTML/CSS 清洗、角色模板、主题系统，以及八种可复用的沉浸式文档模板。

规格依据见 [SPEC.md](./SPEC.md)，架构与安全决策见 [DESIGN.md](./DESIGN.md)，外部参考与许可证见 [SOURCES.md](./SOURCES.md)。

## 安装和启用

当前适配目标为 DeepSeek Harness `0.1.7-rc.2`，Node.js 22+。仓库已包含构建后的 `lib/client.js`，本地安装不运行安装脚本。

```powershell
cd dsh-tavern-renderer
npm ci
npm run check
npx --yes @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web add .
npx --yes @deepseek-ai/dsh@0.1.7-rc.2 --profile web
```

启动后使用终端打印的完整 Web URL（含一次性 token）进入；不要把 token 固化进配置、分享链接或测试产物。认证由宿主处理，插件无需自行管理 token。

bundle 会向 Web profile 插入 `tavern-renderer` 行。客户端随后以 `priority: -100` 覆盖 `assistant-step`、`user` 和 `steering` 三个消息 renderer。消息 slot 由 `@deepseek-ai/dsh-client-ui-chat` 声明，语言域为 `chat`；图片使用宿主传入的 `renderMessageImages`，保留宿主授权加载。删除插件后原 renderer 自动恢复：

```powershell
npx --yes @deepseek-ai/dsh@0.1.7-rc.2 plugin --profile web remove dsh-tavern-renderer
```

## 固定渲染顺序

```text
regex -> macros -> expressions -> documents -> markdown -> sanitize -> template
```

每一环都可关闭，也可在指定环节前后注册扩展。插件只改变 DOM 展示，不修改持久会话事件，也不会改变送给模型的 prompt。

## 正则替换

紧凑语法是 `/pattern/replacement/flags`：

```js
DeepSeekTavernRenderer.configure({
  regexRules: [
    '/([A-Z]+)-(\\d+)/编号 $2，角色 {{char}}，类型 $1/g',
  ],
})
```

也可使用接近 SillyTavern 存储结构的对象：

```js
DeepSeekTavernRenderer.configure({
  regexRules: [{
    name: 'dialogue',
    findRegex: '/“([^”]+)”/g',
    replaceString: '<span class="dialogue">“$1”</span>',
    roles: ['assistant'],
    trimStrings: [],
  }],
})
```

支持 `$1..$99`、`$<name>`、`$&`、`$$` 和 `{{match}}`。捕获组插值后立即求值替换串中的宏；规则按数组顺序串行执行。

## 宏和变量

```text
{{char}}  {{user}}  {{role}}
{{persona}}  {{description}}  {{scenario}}
{{time}}  {{date}}  {{weekday}}  {{isotime}}  {{isodate}}
{{newline}}
{{setvar::mood::calm}}
{{getvar::mood}}
{{addvar::score::2}}
{{incvar::turn}}
```

变量按 Harness Session 隔离。`setvar`/`addvar` 不输出文本，`incvar` 输出更新后的数值。宏支持内向外嵌套，未知宏保持原样。

注册扩展宏：

```js
const unregister = DeepSeekTavernRenderer.registerMacro('upper', ({ args }) =>
  args.join('::').toUpperCase(),
)
```

## 安全内联表达式

SillyTavern 当前消息渲染源码没有任意内联 JavaScript 宏。本插件明确增加以下 Harness 扩展语法：

```text
{{js::1 + 2 * 3}}
{{js::user + " -> " + char}}
{{js::score >= 10 ? "win" : "continue"}}
```

这不是任意 JavaScript。只允许字面量、扁平变量、括号、一元运算、算术、比较、相等、逻辑/空值合并和三元运算。属性读取、索引、赋值、函数调用、`new`、模板字符串、浏览器全局、原型和构造器全部拒绝；实现中不调用 `eval` 或 `Function`。

## Markdown 和 HTML

支持：

- 斜体、粗体、删除线、下划线、行内代码；
- 围栏代码块、标题、分隔线；
- 有序/无序列表、引用；
- 链接、远程图片、表格和简单换行；
- 原始 HTML（进入 DOM 前统一清洗）。

HTML 清洗采用 DOM 树和显式标签/属性白名单。`script`、iframe、表单、SVG/MathML、事件属性、内联 style、危险协议等均被移除。链接只允许绝对 HTTP(S)/mailto，并自动加 `noopener noreferrer`；图片只允许绝对 HTTP(S)。

消息可包含 `<style>`，但 CSS 会移除 at-rule、远程资源、动态表达式和高风险属性，并把选择器限定在 `.dsh-tr-message-content` 下。消息类名统一改写为 `custom-*`：

```html
<style>.status { color: #167565; font-weight: 600 }</style>
<span class="status">ready</span>
```

## 沉浸式文档模板

模型只需输出一个短围栏，不需要手写复杂 HTML。首行选择模板，`---` 之前是 `key: value` 元数据，之后照常写 Markdown；结尾使用单独一行 `:::`：

```text
:::letter
from: {{char}}
to: {{user}}
date: {{date}}
place: North Observatory
subject: The signal after midnight
seal: crimson
---
Dear **{{user}}**,

The receiver woke at 23:40.
:::
```

内置模板及推荐字段：

| 类型 | 用途 | 推荐字段 |
|---|---|---|
| `letter` | 信件、情书、正式函件 | `from`, `to`, `date`, `place`, `subject`, `seal` |
| `exam` | 试卷、测验、审讯问卷 | `title`, `course`, `student`, `date`, `duration`, `total`, `instructions` |
| `postcard` | 明信片、旅行短笺 | `from`, `to`, `location`, `date`, `stamp` |
| `cipher` | 密信、密码电文、机密备忘录 | `classification`, `code`, `from`, `to`, `date`, `key`, `status` |
| `telegram` | 电报、紧急短讯 | `priority`, `from`, `to`, `station`, `date`, `time`, `operator`, `charge` |
| `newspaper` | 报纸剪报、新闻报道 | `name`, `date`, `edition`, `section`, `headline`, `deck`, `byline` |
| `dossier` | 人物档案、案件卷宗 | `agency`, `file`, `subject`, `classification`, `status`, `date`, `handler` |
| `diary` | 日记、航海日志、私人记录 | `owner`, `date`, `time`, `location`, `mood`, `weather`, `title` |

每种模板都有独立的语义结构和视觉语言，而不是只替换颜色：例如信件带折痕与火漆，试卷带考生栏和评分框，明信片带邮票/邮戳/地址线，密信带分级条和删节线。所有元数据都先按文本转义，正文按 Markdown 渲染后进入统一 HTML 白名单；字段值不能生成类名、样式或属性。

完整样例见 [demo/documents-message.txt](./demo/documents-message.txt)。文档围栏不支持嵌套；未知类型或最终仍未闭合的围栏按普通文本显示。生成期间，已知但未闭合的围栏会以 `Draft` 状态增量渲染，闭合后自动转为最终文档。

程序化调用可从 core 导入：

```js
import { DOCUMENT_TEMPLATE_IDS, renderDocument } from 'dsh-tavern-renderer/core'

const html = renderDocument('postcard', {
  from: 'Luna', to: 'Alex', location: 'Selene Harbor', stamp: 'airmail',
}, 'Wish you were **here**.')
```

`renderDocument()` 返回尚未经过最终 DOM 清洗的模板 HTML，只有受信任的插件代码应直接调用；普通消息应始终使用完整 renderer。

## 主题和自定义 CSS

```js
DeepSeekTavernRenderer.setTheme('harness')
DeepSeekTavernRenderer.setTheme('tavern-dark')
DeepSeekTavernRenderer.setTheme('paper')

DeepSeekTavernRenderer.setCustomCss(`
  .dsh-tr-message { line-height: 1.85 }
  .custom-dialogue { color: #a13f4b }
`)
```

主题和自定义 CSS 保存在浏览器 `localStorage`。自定义 CSS 同样会清洗，并限定到 `[data-dsh-tavern-renderer]`；不能隐藏或改写整个 Harness 页面。

## 角色模板与上下文

默认角色模板分别使用 `aside`、`section`、`article` 包装 system/user/assistant。可用替换点：`{{content}}`、`{{role}}`、`{{char}}`、`{{user}}`。

```js
DeepSeekTavernRenderer.configure({
  char: 'Luna',
  user: 'Alex',
  templates: {
    assistant: '<article class="dsh-tr-message">{{content}}</article>',
  },
})
```

`content` 已清洗，身份变量按文本转义，模板包装完成后还会再次清洗。Harness 当前 chat-node contract 没有角色卡字段，因此默认值是 `Assistant`/`User`，可用上述配置注入实际名称。

## 管线扩展和开关

```js
DeepSeekTavernRenderer.setStageEnabled('expressions', false)

const removeStage = DeepSeekTavernRenderer.registerStage({
  name: 'append-marker',
  after: 'macros',
  run: value => `${value}\n\n---`,
})
```

内置阶段名：`regex`、`macros`、`expressions`、`documents`、`markdown`、`sanitize`、`template`。扩展阶段在浏览器本地以受信任代码运行；不要注册来源不明的回调。

## 最小自测

```powershell
npm test
npm run build
npm pack --dry-run
```

测试文件为九项原始验收能力和八种文档模板各提供至少一条“输入 -> 期望输出”样例，并额外覆盖 slot 优先级、编码后的危险协议、SVG/iframe/form、CSS 远程加载、恶意角色模板、文档字段注入与流式草稿。

## 浏览器 API

插件加载后可在页面控制台读取 `window.DeepSeekTavernRenderer`。常用方法：

| 方法 | 用途 |
|---|---|
| `render(text, context)` | 离线运行完整管线并返回 `{ html, trace, diagnostics }` |
| `configure(partial)` | 更新身份、正则、模板和阶段配置 |
| `getConfig()` | 返回可序列化配置副本 |
| `registerMacro()` / `unregisterMacro()` | 扩展宏注册表 |
| `registerStage()` / `setStageEnabled()` | 扩展或切换管线阶段 |
| `setTheme()` / `setCustomCss()` | 切换主题和注入安全作用域 CSS |

页面根节点的 `data-dsh-tavern-renderer-version="0.2.1"` 可用于部署探针；每条渲染内容还带 `data-render-trace` 诊断属性。

## DSH 兼容边界（2026-09-28）

- Host 空 `apply()`、`dsh.bundle.patch`、`dsh.client.inject` 和 `window.__ModuleLoader__.load` 继续使用；客户端依赖显式包含 `ui-chat`。已按实际 `0.1.7-rc.2` Web manifest 验证完整注入闭包。
- 此插件没有 `ApiProxy`、后端 Remote 服务或自定义 settings card；主题/宏配置仍由浏览器 API 和 localStorage 管理，无 settings card 迁移项。
- 只消费 `assistant-step` / `user` / `steering` 的展示节点，不读写 V4 Session 日志，也不参与 RP settlement。流式 `running` 与最终 `settled` / `interrupted` 语义保持。
- `snapshotEvents`、`eventAt` 和 `ownEvents` 已从渲染器边界排除；agent 生命周期、Profile plugin settings、Remote 双向流和 preset plugin bundles 由宿主负责。渲染器按 Session ID 取得会话作用域，因此多个 Session 可同时拥有独立变量与 renderer 实例。
- `npm run check` 覆盖核心渲染、slot 优先级/语言域和宿主图片入口；不等同于已做真实浏览器端登录和 UI 验收。
