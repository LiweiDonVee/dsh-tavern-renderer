# DeepSeek Harness Tavern Renderer Specification

## 1. Scope and source lock

This plugin reproduces the message-display subset requested for DeepSeek Harness. It does not copy SillyTavern's character editor, prompt construction, slash-command runtime, lorebook, extension manager, or backend.

The reverse-engineered source snapshots are fixed so later upstream changes cannot silently change this specification:

- SillyTavern `SillyTavern/SillyTavern` commit `8172dcd0ee672d3cd9a5e5f7af134f91a45cd2b8` (working tree reports version 1.18.0).
- DeepSeek Harness `deepseek-ai/DeepSeek-Harness` commit `47f943859bef60e4160492346772ded9b24f765a`.

Paths and line numbers below refer to those commits. The current Harness adapter was separately verified against shipped npm `0.2.1-rc.2` and `0.2.1-rc.3` hosts on 2026-10-23: `ui-chat` owns the session-scoped keyed node slot and `chat` locale. Images use the public `conversation.images.content` Factory with the owner-provided authorized `loadImage`. Web and Desktop share this client contract. V4 Session log replay, Profile plugin settings, preset plugin bundles, and Remote transport remain host concerns.

## 2. SillyTavern display pipeline

`public/script.js:1753` defines `messageFormatting()`. For ordinary displayed chat text its relevant order is:

1. The first character message may run `substituteParams()` (`public/script.js:1761`).
2. Prompt-bias text is removed.
3. Display regex scripts run through `getRegexedString(..., { isMarkdown: true })` (`public/script.js:1809`).
4. Optional generated-Markdown repairs, HTML-tag encoding, quote wrapping, and TeX compatibility transforms run.
5. Showdown converts Markdown to HTML (`public/script.js:521-537`, `1816-1891`).
6. Optional character-name prefixes are removed.
7. `<style>` is encoded as `<custom-style>`, DOMPurify sanitizes the HTML, then scoped style tags are decoded (`public/script.js:1904-1909`; helpers in `public/scripts/chats.js:536-625`).

Harness needs deterministic, independently switchable stages, so this plugin fixes the public pipeline to:

`regex -> macros -> safe expressions -> immersive documents -> Markdown/HTML -> sanitize -> role template`

Regex replacement strings resolve macros immediately after capture interpolation, matching SillyTavern's replacement behavior. The later macro stage resolves macros present in the rest of the message. Theme CSS is mounted outside message HTML and is not a text transformation.

## 3. Regex scripts

SillyTavern stores a JavaScript regex string in `findRegex` and a separate `replaceString` (`public/scripts/extensions/regex/index.js:780-786`, `826-864`). The engine:

- orders script sets as global, preset, and scoped (`engine.js:11-27`, `99-132`);
- filters by placement, display/prompt mode, edit mode, disabled state, and depth (`engine.js:323-389`);
- parses JavaScript regex-string syntax such as `/pattern/gi`;
- supports numbered and named JavaScript replacement references, plus `{{match}}` as the complete match;
- trims configured strings from captured values before replacement;
- resolves `substituteParams()` after capture interpolation (`engine.js:393-488`);
- optionally substitutes macros in the find expression in none/raw/escaped modes.

This plugin accepts both an ST-shaped object (`findRegex`, `replaceString`) and the requested compact `/pattern/replacement/flags` form. Ordered rules run sequentially. It implements `$1..$99`, `$<name>`, `$&`, `$$`, and `{{match}}`; replacement macros are then evaluated. Role placement, enabled state, and display-only operation are supported. Prompt mutation is intentionally out of scope.

## 4. Macros and variables

Current SillyTavern has an experimental parser/registry plus a legacy fallback. Extension points are in `public/scripts/macros/engine/MacroRegistry.js`; evaluation is in `MacroEngine.js`; the public bridge is `substituteParams()` at `public/script.js:2922`. The registry supports named macros, dynamic macros, preprocessors, and postprocessors.

The built-in families include user/character identity and character fields, time/date, message/chat state, random/roll helpers, and variables. Variable definitions in `public/scripts/macros/definitions/variable-macros.js` establish these relevant semantics:

- `{{setvar::name::value}}`: write a local/chat variable and emit an empty string.
- `{{getvar::name}}`: read and normalize a local/chat variable.
- `addvar`/`incvar` update numeric or concatenated state.

This plugin implements `char`, `user`, `role`, `persona`, `description`, `scenario`, `time`, `date`, `weekday`, `isotime`, `isodate`, `newline`, `getvar`, `setvar`, `addvar`, and `incvar`. Nested macros resolve inside-out with bounded passes. Unknown macros remain literal. `registerMacro()` and `unregisterMacro()` are public extension points. Variables are isolated per Harness Session in the client adapter.

## 5. Inline JavaScript: source correction and safe extension

The locked SillyTavern display source does **not** define an arbitrary inline `{{eval}}`, `{{js}}`, or `{{javascript}}` message macro, and the message pipeline does not call `eval()` or `new Function()` for message text. Therefore inventing a supposed SillyTavern syntax would be inaccurate.

To satisfy the requested expression feature, this plugin explicitly defines a Harness-only extension:

```text
{{js::1 + 2 * 3}}
{{js::user + " -> " + char}}
```

Despite the name, this is not arbitrary JavaScript. A private tokenizer and parser evaluate only literals, parentheses, unary operators, arithmetic, comparison, equality, nullish/logical operators, and the ternary operator against a flat value scope. Property access, indexing, assignment, function calls, `new`, template literals, globals, prototypes, and constructors are rejected. No `eval`, `Function`, dynamic import, or browser global is reachable. Input length, token count, parse depth, and operation count are bounded. Errors leave the original expression visible with an inert error marker rather than executing anything.

## 6. Markdown

SillyTavern configures Showdown with emoji, literal mid-word underscores, image dimensions, tables, underline, simple line breaks, and strikethrough (`public/script.js:521-537`). It adds a single-underscore emphasis extension and configurable Markdown exclusion strings (`public/scripts/showdown-underscore.js`, `showdown-exclusion.js`).

The plugin's dependency-free renderer supports headings, paragraphs, simple line breaks, emphasis, strong text, strikethrough, underline, inline code, fenced code, ordered/unordered lists (including indentation), blockquotes, thematic breaks, links, images, and tables. Raw HTML flows to the sanitizer. Markdown code content is always escaped and never interpreted as HTML.

## 7. HTML and CSS sanitization

SillyTavern uses DOMPurify defaults rather than maintaining a single source-level full whitelist. Hooks in `public/scripts/chats.js:1901+` add `custom-style`, rewrite classes to `custom-*`, harden links, normalize unknown elements, and optionally remove external media. Message CSS is parsed, `@import` is removed, selectors are prefixed with `.mes_text`, classes are rewritten, and external URLs can be removed (`public/scripts/chats.js:536-625`).

This plugin intentionally uses a narrower explicit policy:

- allowed structural/phrasing tags are listed in `src/core/sanitize.js`;
- all event handlers, inline `style`, `srcset`, unknown attributes, IDs, forms, active embeds, SVG/MathML, scripts, and templates are removed;
- links permit only absolute `http:`, `https:`, and `mailto:` targets and receive `target="_blank" rel="noopener noreferrer"`;
- images permit only absolute HTTP(S), receive lazy loading and no-referrer policy;
- authored classes become `custom-*` (language classes for code fences are retained);
- message `<style>` blocks are parsed through a conservative rule/declaration filter, reject at-rules and URL-bearing/dynamic declarations, rewrite classes, and scope selectors under `.dsh-tr-message-content`.

Sanitization uses the browser DOM parser and tree APIs, not regex as an HTML parser.

## 8. Themes and templates

SillyTavern injects saved custom CSS into `<style id="custom-style">` and applies theme properties/CSS from `public/scripts/power-user.js:1147-1158`, `1227+`. Its message template in `public/index.html:7378+` exposes message identity through attributes such as `is_user`, `is_system`, and `ch_name`; `public/script.js:2559-2645` fills those attributes and the formatted `.mes_text` body.

This plugin ships three scoped themes (`harness`, `tavern-dark`, `paper`), a theme switch API, persisted browser-local selection, and a sanitized/scoped custom-CSS injection point. Role templates for `system`, `user`, and `assistant` wrap already-sanitized content. Template substitutions are `{{content}}`, `{{role}}`, `{{char}}`, and `{{user}}`; only `content` is inserted as HTML, while context values are escaped. The completed wrapper is sanitized once more with only plugin-owned `dsh-tr-*` classes exempted from class rewriting, so a configured template cannot reintroduce executable HTML.

## 9. Immersive document extension

DeepSeek Harness has no native rich-document message schema, and SillyTavern does not define these document types. The plugin therefore defines an explicit Harness-only directive extension:

```text
:::letter
from: {{char}}
to: {{user}}
subject: Example
---
Markdown body
:::
```

The `documents` stage runs after macros/expressions and before the general Markdown stage. It recognizes only the fixed IDs `letter`, `exam`, `postcard`, `cipher`, `telegram`, `newspaper`, `dossier`, and `diary`. Metadata is limited to 32 `key: value` fields of 2,000 characters each and is HTML-escaped. Type and visual-variant class names come from internal allowlists only. Each body is rendered as Markdown, placed into an opaque private slot, restored after whole-message Markdown conversion, and then passed through the same HTML sanitizer and final role-template sanitizer as all other message content.

Unknown directives and malformed completed directives remain literal. Directives cannot nest. A known directive that has not yet received its closing `:::` is rendered only when the Harness node reports `status: running`; it receives a fixed streaming class and visible `Draft` status. Once settled, an unclosed directive falls back to literal text rather than guessing intent.

## 10. Compatibility boundaries

- The plugin targets display only. It never rewrites model prompts or durable Harness events.
- It does not reproduce SillyTavern regex script editors, preset storage, or depth UI.
- Safe expressions are a documented Harness extension, not a false claim about SillyTavern.
- The narrower sanitizer can remove HTML/CSS that DOMPurify in a particular SillyTavern configuration would retain.
- Harness has no native character-card identity in the chat-node contract. Defaults are `Assistant` and `User`; callers/configuration inject actual character and user names.
- Immersive documents are a documented Harness extension and are not represented as SillyTavern compatibility claims.
