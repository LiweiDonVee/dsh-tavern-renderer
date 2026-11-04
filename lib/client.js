window.__ModuleLoader__.load({ id: "dsh-tavern-renderer", factory: (require) => { var module = { exports: {} }; var exports = module.exports;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// src/client/index.jsx
var index_exports = {};
__export(index_exports, {
  apply: () => apply,
  inject: () => inject
});
module.exports = __toCommonJS(index_exports);

// src/client/plugin.css
var plugin_default = "[data-dsh-tavern-renderer] {\n  color: var(--dtr-text);\n  font-family: var(--dsw-font-family, system-ui, sans-serif);\n  font-size: var(--dsh-content-font-size, 16px);\n  line-height: 1.75;\n}\n\n.dsh-tr-regex-trigger {\n  border: 1px solid var(--dtr-border, currentColor);\n  border-radius: 6px;\n  background: transparent;\n  color: inherit;\n  cursor: pointer;\n  padding: 5px 9px;\n  font: inherit;\n  font-size: 12px;\n  white-space: nowrap;\n}\n.dsh-tr-regex-dialog { width: min(560px, calc(100vw - 32px)); }\n.dsh-tr-regex-controls { display: flex; flex-wrap: wrap; align-items: end; gap: 12px; }\n.dsh-tr-regex-controls label { display: flex; min-width: 180px; flex: 1; flex-direction: column; gap: 6px; }\n.dsh-tr-regex-controls select,\n.dsh-tr-regex-controls button,\n.dsh-tr-regex-delete {\n  border: 1px solid var(--dtr-border, currentColor);\n  border-radius: 6px;\n  background: var(--dtr-surface, transparent);\n  color: inherit;\n  padding: 8px 10px;\n  font: inherit;\n}\n.dsh-tr-regex-controls button, .dsh-tr-regex-delete { cursor: pointer; }\n.dsh-tr-regex-note, .dsh-tr-regex-info { font-size: 13px; line-height: 1.6; opacity: 0.8; }\n.dsh-tr-regex-info { max-height: 220px; overflow: auto; }\n.dsh-tr-regex-info li { margin: 8px 0; overflow-wrap: anywhere; }\n.dsh-tr-regex-delete { margin-top: 12px; }\n\n.dsh-tr-root {\n  display: flex;\n  min-width: 0;\n  flex-direction: column;\n  gap: 12px;\n}\n\n.dsh-tr-message-content {\n  min-width: 0;\n  overflow-wrap: anywhere;\n}\n\n.dsh-tr-message-content > :first-child { margin-top: 0; }\n.dsh-tr-message-content > :last-child { margin-bottom: 0; }\n.dsh-tr-message-content p { margin: 0 0 0.75em; }\n.dsh-tr-message-content h1,\n.dsh-tr-message-content h2,\n.dsh-tr-message-content h3,\n.dsh-tr-message-content h4,\n.dsh-tr-message-content h5,\n.dsh-tr-message-content h6 {\n  margin: 1.15em 0 0.45em;\n  color: var(--dtr-text);\n  font-weight: 650;\n  line-height: 1.3;\n}\n.dsh-tr-message-content h1 { font-size: 1.55em; }\n.dsh-tr-message-content h2 { font-size: 1.35em; }\n.dsh-tr-message-content h3 { font-size: 1.18em; }\n.dsh-tr-message-content ul,\n.dsh-tr-message-content ol { margin: 0.6em 0; padding-left: 1.6em; }\n.dsh-tr-message-content li + li { margin-top: 0.2em; }\n.dsh-tr-message-content blockquote {\n  margin: 0.85em 0;\n  padding: 0.2em 0 0.2em 0.9em;\n  border-left: 3px solid var(--dtr-quote);\n  color: var(--dtr-muted);\n}\n.dsh-tr-message-content code,\n.dsh-tr-message-content kbd {\n  border: 1px solid var(--dtr-border);\n  border-radius: 4px;\n  background: var(--dtr-code);\n  padding: 0.08em 0.32em;\n  font-family: var(--ds-font-family-code, ui-monospace, SFMono-Regular, Consolas, monospace);\n  font-size: 0.88em;\n}\n.dsh-tr-message-content pre {\n  max-width: 100%;\n  overflow: auto;\n  margin: 0.8em 0;\n  border: 1px solid var(--dtr-border);\n  border-radius: 6px;\n  background: var(--dtr-code);\n  padding: 12px 14px;\n  line-height: 1.55;\n}\n.dsh-tr-message-content pre code { border: 0; background: transparent; padding: 0; }\n.dsh-tr-message-content a { color: var(--dtr-accent); text-decoration: underline; text-underline-offset: 2px; }\n.dsh-tr-message-content table { display: block; max-width: 100%; overflow-x: auto; border-collapse: collapse; }\n.dsh-tr-message-content th,\n.dsh-tr-message-content td { border: 1px solid var(--dtr-border); padding: 5px 9px; text-align: left; }\n.dsh-tr-message-content th { background: var(--dtr-surface-raised); }\n.dsh-tr-message-content img { max-width: 100%; height: auto; }\n\n/* Immersive documents: generated classes are fixed by the parser, never copied from field values. */\n.dsh-tr-message-content .custom-dtr-doc {\n  position: relative;\n  isolation: isolate;\n  width: min(100%, 780px);\n  max-width: 100%;\n  overflow: hidden;\n  box-sizing: border-box;\n  margin: 1.15em auto;\n  color: #282622;\n  color-scheme: light;\n  font-size: 0.95em;\n  letter-spacing: 0;\n  line-height: 1.65;\n}\n.dsh-tr-message-content .custom-dtr-doc *,\n.dsh-tr-message-content .custom-dtr-doc *::before,\n.dsh-tr-message-content .custom-dtr-doc *::after { box-sizing: border-box; }\n.dsh-tr-message-content .custom-dtr-doc h2,\n.dsh-tr-message-content .custom-dtr-doc h3 {\n  margin: 0;\n  color: inherit;\n  font-size: 1.2em;\n  font-weight: 700;\n  letter-spacing: 0;\n}\n.dsh-tr-message-content .custom-dtr-doc p { margin: 0 0 0.8em; }\n.dsh-tr-message-content .custom-dtr-doc p:last-child { margin-bottom: 0; }\n.dsh-tr-message-content .custom-dtr-doc a { color: inherit; }\n.dsh-tr-message-content .custom-dtr-doc-body { position: relative; z-index: 1; min-width: 0; }\n.dsh-tr-message-content .custom-dtr-doc-head {\n  position: relative;\n  z-index: 2;\n  display: flex;\n  align-items: flex-start;\n  justify-content: space-between;\n  gap: 16px;\n}\n.dsh-tr-message-content .custom-dtr-doc-head small,\n.dsh-tr-message-content .custom-dtr-doc-field small {\n  display: block;\n  margin-bottom: 2px;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 10px;\n  font-weight: 750;\n  letter-spacing: 0;\n  line-height: 1.3;\n  text-transform: uppercase;\n}\n.dsh-tr-message-content .custom-dtr-doc-field { min-width: 0; }\n.dsh-tr-message-content .custom-dtr-doc-field span { display: block; overflow-wrap: anywhere; }\n.dsh-tr-message-content .custom-dtr-doc-draft {\n  display: inline-flex;\n  flex: 0 0 auto;\n  align-items: center;\n  gap: 6px;\n  border: 1px solid currentColor;\n  border-radius: 4px;\n  padding: 3px 7px;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n  font-size: 10px;\n  font-weight: 750;\n  line-height: 1;\n  text-transform: uppercase;\n}\n.dsh-tr-message-content .custom-dtr-doc-draft > span {\n  width: 6px;\n  height: 6px;\n  border-radius: 50%;\n  background: currentColor;\n  animation: dtr-doc-live 1.2s ease-in-out infinite;\n}\n@keyframes dtr-doc-live { 50% { opacity: 0.35; } }\n\n/* Letter: warm rag paper, fold marks, routed header and wax seal. */\n.dsh-tr-message-content .custom-dtr-doc-letter {\n  min-height: 360px;\n  border: 1px solid #c9bda4;\n  border-radius: 2px;\n  background-color: #f8f1df;\n  box-shadow: 0 14px 34px rgb(41 32 18 / 18%), inset 0 0 45px rgb(138 106 56 / 7%);\n  padding: 34px clamp(22px, 5%, 48px) 30px;\n  font-family: Georgia, 'Times New Roman', serif;\n}\n.dsh-tr-message-content .custom-dtr-doc-letter::before,\n.dsh-tr-message-content .custom-dtr-doc-letter::after {\n  position: absolute;\n  z-index: 0;\n  left: 0;\n  width: 100%;\n  height: 1px;\n  background: rgb(113 90 52 / 18%);\n  content: '';\n}\n.dsh-tr-message-content .custom-dtr-doc-letter::before { top: 33.333%; }\n.dsh-tr-message-content .custom-dtr-doc-letter::after { top: 66.666%; }\n.dsh-tr-message-content .custom-dtr-doc-paper-grain {\n  position: absolute;\n  z-index: 0;\n  inset: 0;\n  opacity: 0.25;\n  background-image: repeating-linear-gradient(17deg, transparent 0 5px, rgb(80 58 22 / 4%) 6px 7px);\n  pointer-events: none;\n}\n.dsh-tr-message-content .custom-dtr-letter-fold {\n  position: absolute;\n  z-index: 0;\n  top: 0;\n  left: 49%;\n  width: 1px;\n  height: 100%;\n  background: rgb(113 90 52 / 10%);\n}\n.dsh-tr-message-content .custom-dtr-doc-letter .custom-dtr-doc-head {\n  border-bottom: 1px solid #9f8e6e;\n  padding-bottom: 14px;\n}\n.dsh-tr-message-content .custom-dtr-doc-letter .custom-dtr-doc-head small { color: #7a5e37; }\n.dsh-tr-message-content .custom-dtr-letter-routing {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(2, minmax(0, 1fr));\n  gap: 10px 24px;\n  padding: 18px 0;\n  color: #534a3b;\n}\n.dsh-tr-message-content .custom-dtr-letter-routing small { color: #876c45; }\n.dsh-tr-message-content .custom-dtr-letter-body { min-height: 155px; font-size: 1.04em; }\n.dsh-tr-message-content .custom-dtr-letter-footer {\n  position: relative;\n  z-index: 1;\n  display: flex;\n  min-height: 64px;\n  align-items: flex-end;\n  justify-content: space-between;\n  gap: 18px;\n  border-top: 1px solid rgb(126 99 55 / 26%);\n  margin-top: 22px;\n  padding-top: 12px;\n}\n.dsh-tr-message-content .custom-dtr-letter-signature span { font-size: 1.12em; font-style: italic; }\n.dsh-tr-message-content .custom-dtr-letter-seal {\n  display: grid;\n  width: 48px;\n  height: 48px;\n  flex: 0 0 48px;\n  place-items: center;\n  border: 3px double rgb(255 255 255 / 35%);\n  border-radius: 50%;\n  box-shadow: 0 3px 7px rgb(0 0 0 / 28%), inset 0 0 0 2px rgb(35 10 8 / 18%);\n  color: #f4d6ca;\n  font-weight: 800;\n}\n.dsh-tr-message-content .custom-dtr-letter-seal-crimson { background: #8d302c; }\n.dsh-tr-message-content .custom-dtr-letter-seal-navy { background: #334968; }\n.dsh-tr-message-content .custom-dtr-letter-seal-black { background: #292826; }\n.dsh-tr-message-content .custom-dtr-letter-seal-gold { background: #8c6b20; }\n\n/* Examination: institutional grid, candidate strip and stable score box. */\n.dsh-tr-message-content .custom-dtr-doc-exam {\n  border: 1px solid #9da8ac;\n  border-radius: 2px;\n  background: #fbfcfa;\n  box-shadow: 0 10px 25px rgb(24 42 48 / 14%);\n  padding: 28px 30px 24px;\n  font-family: Cambria, Georgia, serif;\n}\n.dsh-tr-message-content .custom-dtr-exam-rule {\n  display: flex;\n  height: 6px;\n  gap: 5px;\n  margin: -28px -30px 22px;\n}\n.dsh-tr-message-content .custom-dtr-exam-rule span:first-child { width: 32%; background: #b23a3f; }\n.dsh-tr-message-content .custom-dtr-exam-rule span:last-child { flex: 1; background: #2d5968; }\n.dsh-tr-message-content .custom-dtr-doc-exam .custom-dtr-doc-head small { color: #416675; }\n.dsh-tr-message-content .custom-dtr-exam-candidate {\n  display: grid;\n  grid-template-columns: 1.4fr 1fr 1fr 76px;\n  gap: 0;\n  border: 1px solid #aeb8ba;\n  margin: 20px 0 16px;\n}\n.dsh-tr-message-content .custom-dtr-exam-candidate > * { min-height: 56px; padding: 9px 11px; }\n.dsh-tr-message-content .custom-dtr-exam-candidate > * + * { border-left: 1px solid #c3cacb; }\n.dsh-tr-message-content .custom-dtr-exam-candidate small { color: #5a6c72; }\n.dsh-tr-message-content .custom-dtr-exam-score {\n  display: grid;\n  place-items: center;\n  background: #edf1ef;\n  text-align: center;\n}\n.dsh-tr-message-content .custom-dtr-exam-score small { font: 700 9px/1 ui-sans-serif, system-ui, sans-serif; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-exam-score strong { font-size: 1.35em; }\n.dsh-tr-message-content .custom-dtr-exam-instructions {\n  display: grid;\n  grid-template-columns: auto 1fr;\n  gap: 14px;\n  border-left: 3px solid #b23a3f;\n  background: #f1f3f0;\n  padding: 10px 12px;\n  font-size: 0.9em;\n}\n.dsh-tr-message-content .custom-dtr-exam-body { min-height: 180px; padding: 18px 4px; }\n.dsh-tr-message-content .custom-dtr-exam-body > ol { counter-reset: item; }\n.dsh-tr-message-content .custom-dtr-exam-body li { border-bottom: 1px dotted #aab2b2; padding-bottom: 14px; }\n.dsh-tr-message-content .custom-dtr-exam-footer {\n  display: flex;\n  justify-content: space-between;\n  gap: 14px;\n  border-top: 3px double #89989c;\n  padding-top: 10px;\n  color: #58666b;\n  font: 700 10px/1.4 ui-sans-serif, system-ui, sans-serif;\n  text-transform: uppercase;\n}\n\n/* Postcard: airmail edge, message/address split, stamp and cancellation bars. */\n.dsh-tr-message-content .custom-dtr-doc-postcard {\n  min-height: 320px;\n  border: 7px solid transparent;\n  border-radius: 3px;\n  background: linear-gradient(#f4edda, #f4edda) padding-box, repeating-linear-gradient(135deg, #b74042 0 12px, #f4edda 12px 24px, #315c7e 24px 36px, #f4edda 36px 48px) border-box;\n  box-shadow: 0 13px 28px rgb(34 37 42 / 18%);\n  padding: 20px 22px 24px;\n  font-family: Georgia, 'Times New Roman', serif;\n}\n.dsh-tr-message-content .custom-dtr-postcard-edge { position: absolute; inset: 5px; border: 1px solid rgb(74 57 35 / 28%); pointer-events: none; }\n.dsh-tr-message-content .custom-dtr-postcard-caption {\n  display: flex;\n  align-items: baseline;\n  justify-content: space-between;\n  gap: 12px;\n  border-bottom: 1px solid #8d8068;\n  padding: 2px 4px 12px;\n}\n.dsh-tr-message-content .custom-dtr-postcard-caption > span:first-child { color: #395d75; font: 800 11px/1 ui-sans-serif, system-ui, sans-serif; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-postcard-caption strong { font-size: 1.05em; }\n.dsh-tr-message-content .custom-dtr-postcard-grid { display: grid; min-height: 230px; grid-template-columns: 1fr 1fr; }\n.dsh-tr-message-content .custom-dtr-postcard-message { border-right: 1px solid #a39986; padding: 20px 22px 8px 4px; font-style: italic; }\n.dsh-tr-message-content .custom-dtr-postcard-address { position: relative; padding: 74px 4px 8px 24px; }\n.dsh-tr-message-content .custom-dtr-postcard-stamp {\n  position: absolute;\n  top: 16px;\n  right: 5px;\n  display: grid;\n  width: 57px;\n  height: 48px;\n  place-items: center;\n  border: 4px dotted #f4edda;\n  outline: 1px solid #6f6554;\n  background: #526c6a;\n  color: #fff8e8;\n  font: 800 8px/1 ui-sans-serif, system-ui, sans-serif;\n  text-transform: uppercase;\n}\n.dsh-tr-message-content .custom-dtr-postcard-stamp-airmail { background: #315f82; }\n.dsh-tr-message-content .custom-dtr-postcard-stamp-express { background: #a03b3e; }\n.dsh-tr-message-content .custom-dtr-postcard-stamp-local { background: #527156; }\n.dsh-tr-message-content .custom-dtr-postmark {\n  position: absolute;\n  top: 23px;\n  right: 64px;\n  display: grid;\n  width: 74px;\n  gap: 5px;\n  transform: rotate(-7deg);\n}\n.dsh-tr-message-content .custom-dtr-postmark span { height: 1px; background: #766e62; }\n.dsh-tr-message-content .custom-dtr-address-lines { display: grid; gap: 18px; margin-top: 18px; }\n.dsh-tr-message-content .custom-dtr-address-lines span { border-bottom: 1px solid #8d8371; }\n\n/* Cipher: technical grid, classification band, redactions and monospaced payload. */\n.dsh-tr-message-content .custom-dtr-doc-cipher {\n  border: 1px solid #55615c;\n  border-radius: 2px;\n  background-color: #e9eee8;\n  box-shadow: 0 12px 28px rgb(13 24 20 / 24%);\n  padding: 0 26px 24px;\n  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;\n}\n.dsh-tr-message-content .custom-dtr-doc-cipher::before { position: absolute; inset: 0; background-image: linear-gradient(rgb(52 75 65 / 7%) 1px, transparent 1px), linear-gradient(90deg, rgb(52 75 65 / 7%) 1px, transparent 1px); background-size: 18px 18px; content: ''; pointer-events: none; }\n.dsh-tr-message-content .custom-dtr-cipher-band {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: 1fr auto auto;\n  align-items: center;\n  gap: 14px;\n  margin: 0 -26px 22px;\n  background: #202c27;\n  padding: 11px 16px;\n  color: #e7efe8;\n  text-transform: uppercase;\n}\n.dsh-tr-message-content .custom-dtr-cipher-band strong { color: #ffb0a8; }\n.dsh-tr-message-content .custom-dtr-cipher-band > span { font-size: 0.78em; }\n.dsh-tr-message-content .custom-dtr-cipher-routing {\n  position: relative;\n  z-index: 1;\n  display: grid;\n  grid-template-columns: repeat(4, minmax(0, 1fr));\n  border: 1px solid #718078;\n  background: rgb(241 245 239 / 78%);\n}\n.dsh-tr-message-content .custom-dtr-cipher-routing > * { padding: 8px 9px; }\n.dsh-tr-message-content .custom-dtr-cipher-routing > * + * { border-left: 1px solid #98a39d; }\n.dsh-tr-message-content .custom-dtr-cipher-routing small { color: #55645d; }\n.dsh-tr-message-content .custom-dtr-cipher-redactions { position: relative; z-index: 1; display: flex; gap: 8px; margin: 18px 0 12px; }\n.dsh-tr-message-content .custom-dtr-cipher-redactions span { height: 8px; background: #202522; }\n.dsh-tr-message-content .custom-dtr-cipher-redactions span:nth-child(1) { width: 22%; }\n.dsh-tr-message-content .custom-dtr-cipher-redactions span:nth-child(2) { width: 38%; }\n.dsh-tr-message-content .custom-dtr-cipher-redactions span:nth-child(3) { width: 14%; }\n.dsh-tr-message-content .custom-dtr-cipher-body { min-height: 130px; border-left: 2px solid #536960; padding: 8px 0 8px 16px; }\n.dsh-tr-message-content .custom-dtr-cipher-body code { border-color: #6b7972; background: #d6ddd7; color: #17251f; }\n.dsh-tr-message-content .custom-dtr-cipher-footer { display: flex; justify-content: space-between; gap: 12px; border-top: 1px solid #68766f; margin-top: 18px; padding-top: 9px; font-size: 0.76em; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-cipher-footer strong { color: #9a2f2f; }\n\n/* Telegram: warm stock, perforated edge and typewriter payload. */\n.dsh-tr-message-content .custom-dtr-doc-telegram {\n  border: 1px solid #b79f63;\n  border-radius: 2px;\n  background-color: #f1df9e;\n  background-image: repeating-linear-gradient(0deg, transparent 0 24px, rgb(95 73 24 / 7%) 25px 26px);\n  box-shadow: 0 10px 25px rgb(66 49 15 / 20%);\n  padding: 28px 30px 24px;\n  font-family: ui-monospace, SFMono-Regular, Consolas, monospace;\n}\n.dsh-tr-message-content .custom-dtr-telegram-perforation { position: absolute; top: 7px; right: 0; left: 0; border-top: 2px dotted #9b8148; }\n.dsh-tr-message-content .custom-dtr-doc-telegram .custom-dtr-doc-head { border-bottom: 3px double #806b3c; padding-bottom: 11px; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-doc-telegram .custom-dtr-doc-head small { color: #735f31; }\n.dsh-tr-message-content .custom-dtr-telegram-route { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border: 1px solid #927b43; margin-top: 16px; background: rgb(255 248 211 / 42%); }\n.dsh-tr-message-content .custom-dtr-telegram-route > * { min-height: 52px; border-bottom: 1px solid #b59e63; padding: 8px 10px; }\n.dsh-tr-message-content .custom-dtr-telegram-route > *:nth-child(odd) { border-right: 1px solid #b59e63; }\n.dsh-tr-message-content .custom-dtr-telegram-route > *:nth-last-child(-n + 2) { border-bottom: 0; }\n.dsh-tr-message-content .custom-dtr-telegram-body { min-height: 120px; padding: 24px 4px; font-weight: 650; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-telegram-footer { display: flex; justify-content: space-between; gap: 14px; border-top: 3px double #806b3c; padding-top: 8px; font-size: 0.75em; text-transform: uppercase; }\n\n/* Newspaper: restrained broadsheet hierarchy and readable article columns. */\n.dsh-tr-message-content .custom-dtr-doc-newspaper {\n  border: 1px solid #aaa7a0;\n  border-radius: 1px;\n  background-color: #f1f0eb;\n  background-image: repeating-linear-gradient(8deg, transparent 0 7px, rgb(20 20 18 / 2%) 8px 9px);\n  box-shadow: 0 12px 30px rgb(25 24 20 / 17%);\n  padding: 22px 28px 24px;\n  font-family: Georgia, 'Times New Roman', serif;\n}\n.dsh-tr-message-content .custom-dtr-newspaper-masthead { display: grid; grid-template-columns: 1fr auto 1fr; align-items: end; gap: 12px; border-top: 3px solid #1e1e1c; border-bottom: 3px double #1e1e1c; padding: 8px 0; text-align: center; }\n.dsh-tr-message-content .custom-dtr-newspaper-masthead h2 { font-size: 1.55em; font-weight: 800; }\n.dsh-tr-message-content .custom-dtr-newspaper-masthead small { text-align: left; }\n.dsh-tr-message-content .custom-dtr-newspaper-masthead > span { text-align: right; }\n.dsh-tr-message-content .custom-dtr-newspaper-masthead small,\n.dsh-tr-message-content .custom-dtr-newspaper-masthead > span { font: 700 9px/1.3 ui-sans-serif, system-ui, sans-serif; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-newspaper-section { display: flex; align-items: center; justify-content: space-between; gap: 12px; border-bottom: 1px solid #4d4c48; padding: 7px 0; font: 800 10px/1 ui-sans-serif, system-ui, sans-serif; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-newspaper-headline { margin: 18px 0 8px; font-size: 1.75em; line-height: 1.06; text-align: center; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-newspaper-deck { max-width: 620px; margin: 0 auto 10px; color: #4a4944; font-size: 1.02em; font-style: italic; text-align: center; }\n.dsh-tr-message-content .custom-dtr-newspaper-byline { border-bottom: 1px solid #85827b; padding: 7px 0; font: 700 9px/1.2 ui-sans-serif, system-ui, sans-serif; text-align: center; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-newspaper-body { min-height: 150px; column-count: 2; column-gap: 28px; column-rule: 1px solid #c3c0b8; padding: 18px 0 10px; text-align: justify; }\n.dsh-tr-message-content .custom-dtr-newspaper-body > p:first-child::first-letter { float: left; margin: 5px 6px 0 0; font-size: 3.2em; font-weight: 800; line-height: 0.72; }\n.dsh-tr-message-content .custom-dtr-newspaper-footer { border-top: 1px solid #5d5b55; padding-top: 7px; font: 700 9px/1 ui-sans-serif, system-ui, sans-serif; text-align: right; text-transform: uppercase; }\n\n/* Dossier: manila file, tab, index grid and rotated archive stamps. */\n.dsh-tr-message-content .custom-dtr-doc-dossier {\n  overflow: hidden;\n  border: 1px solid #a3844f;\n  border-radius: 2px;\n  background: #d8b875;\n  box-shadow: 0 13px 29px rgb(47 35 15 / 23%);\n  padding: 46px 30px 25px;\n  font-family: ui-sans-serif, system-ui, sans-serif;\n}\n.dsh-tr-message-content .custom-dtr-doc-dossier::before { position: absolute; z-index: -1; inset: 7px; border: 1px solid #aa8b55; background: #c9a864; content: ''; transform: rotate(0.35deg); }\n.dsh-tr-message-content .custom-dtr-dossier-tab { position: absolute; top: 0; left: 18px; min-width: 145px; border: 1px solid #a3844f; border-top: 0; border-radius: 0 0 5px 5px; background: #ead099; padding: 7px 16px 6px; font: 800 10px/1 ui-monospace, SFMono-Regular, Consolas, monospace; text-transform: uppercase; }\n.dsh-tr-message-content .custom-dtr-dossier-head { display: grid; grid-template-columns: 1fr auto auto; align-items: start; gap: 16px; border-bottom: 2px solid #574a35; padding-bottom: 14px; }\n.dsh-tr-message-content .custom-dtr-dossier-head > strong { border: 2px solid #8b2e2e; padding: 5px 8px; color: #8b2e2e; font-size: 0.72em; text-transform: uppercase; transform: rotate(-2deg); }\n.dsh-tr-message-content .custom-dtr-dossier-index { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border: 1px solid #8e764b; margin-top: 16px; background: rgb(244 222 168 / 42%); }\n.dsh-tr-message-content .custom-dtr-dossier-index > * { padding: 8px 9px; }\n.dsh-tr-message-content .custom-dtr-dossier-index > * + * { border-left: 1px solid #a58a57; }\n.dsh-tr-message-content .custom-dtr-dossier-body { min-height: 150px; margin: 19px 0; border: 1px solid #ad9360; background: #ead59d; padding: 18px 20px; font-family: Georgia, 'Times New Roman', serif; }\n.dsh-tr-message-content .custom-dtr-dossier-stamps { display: flex; justify-content: flex-end; gap: 18px; }\n.dsh-tr-message-content .custom-dtr-dossier-stamps span { border: 2px solid #6e5942; padding: 4px 9px; color: #6e5942; font-size: 0.7em; font-weight: 800; text-transform: uppercase; transform: rotate(-4deg); }\n.dsh-tr-message-content .custom-dtr-dossier-stamps span:last-child { color: #8b2e2e; transform: rotate(3deg); }\n\n/* Diary: bound journal page, ribbon marker and ruled writing area. */\n.dsh-tr-message-content .custom-dtr-doc-diary {\n  border: 1px solid #7c6658;\n  border-left: 14px solid #493f3a;\n  border-radius: 4px;\n  background: #f2e8d6;\n  box-shadow: 0 14px 32px rgb(35 26 22 / 24%), inset 5px 0 8px rgb(63 43 34 / 10%);\n  padding: 28px 34px 32px;\n  font-family: Georgia, 'Times New Roman', serif;\n}\n.dsh-tr-message-content .custom-dtr-diary-ribbon { position: absolute; z-index: 2; top: -1px; right: 24px; width: 18px; height: 70px; background: #7c313e; clip-path: polygon(0 0, 100% 0, 100% 100%, 50% 84%, 0 100%); }\n.dsh-tr-message-content .custom-dtr-diary-head { display: grid; grid-template-columns: 1fr auto; gap: 22px; border-bottom: 1px solid #a58c79; padding-right: 32px; padding-bottom: 13px; }\n.dsh-tr-message-content .custom-dtr-diary-head > div:first-child { display: flex; flex-direction: column; }\n.dsh-tr-message-content .custom-dtr-diary-head small { order: 2; color: #785d4e; font-size: 0.78em; font-style: italic; }\n.dsh-tr-message-content .custom-dtr-diary-date { display: flex; flex-direction: column; align-items: flex-end; color: #6f5144; }\n.dsh-tr-message-content .custom-dtr-diary-date span { font-size: 0.78em; }\n.dsh-tr-message-content .custom-dtr-diary-context { display: flex; flex-wrap: wrap; gap: 10px 24px; padding: 12px 0 6px; color: #695347; }\n.dsh-tr-message-content .custom-dtr-diary-context .custom-dtr-doc-field { display: flex; align-items: baseline; gap: 7px; }\n.dsh-tr-message-content .custom-dtr-diary-body { min-height: 180px; background-image: repeating-linear-gradient(transparent 0 27px, rgb(104 128 143 / 24%) 28px 29px); padding: 7px 4px 1px; font-size: 1.04em; line-height: 29px; }\n.dsh-tr-message-content .custom-dtr-diary-body p { margin-bottom: 29px; }\n.dsh-tr-message-content .custom-dtr-diary-flourish { display: flex; align-items: center; gap: 8px; margin-top: 16px; }\n.dsh-tr-message-content .custom-dtr-diary-flourish::before,\n.dsh-tr-message-content .custom-dtr-diary-flourish::after { height: 1px; flex: 1; background: #ad9481; content: ''; }\n.dsh-tr-message-content .custom-dtr-diary-flourish span { width: 7px; height: 7px; border: 1px solid #866c5d; transform: rotate(45deg); }\n\n.dsh-tr-user-root { align-items: flex-end; }\n.dsh-tr-user-stack { display: flex; min-width: 0; max-width: min(82%, 760px); flex-direction: column; align-items: flex-end; gap: 8px; }\n.dsh-tr-attachments { display: flex; flex-wrap: wrap; justify-content: flex-end; gap: 8px; max-width: 100%; }\n.dsh-tr-attachments > div { min-width: 0; max-width: 100%; }\n.dsh-tr-file { display: flex; align-items: center; gap: 8px; min-width: 0; max-width: 100%; padding: 8px 12px; border: 1px solid var(--dtr-border); border-radius: 7px; background: var(--dtr-surface-raised); }\n.dsh-tr-file > span { min-width: 0; overflow-wrap: anywhere; }\n.dsh-tr-file small { display: block; color: var(--dtr-muted); font-size: 0.8em; }\n.dsh-tr-references { max-width: 100%; overflow-wrap: anywhere; color: var(--dtr-muted); font-size: 0.85em; }\n.dsh-tr-user-bubble {\n  max-width: 100%;\n  border: 1px solid var(--dtr-border);\n  border-radius: 7px;\n  background: var(--dtr-surface-raised);\n  padding: 9px 13px;\n}\n.dsh-tr-user-actions { display: flex; height: 28px; align-items: center; gap: 4px; color: var(--dtr-muted); font-size: 12px; }\n.dsh-tr-copy {\n  display: inline-grid;\n  width: 28px;\n  height: 28px;\n  place-items: center;\n  border: 0;\n  border-radius: 6px;\n  background: transparent;\n  color: var(--dtr-muted);\n  cursor: pointer;\n}\n.dsh-tr-copy:hover { background: var(--dtr-surface-raised); color: var(--dtr-text); }\n\n.dsh-tr-reasoning { color: var(--dtr-muted); font-size: var(--dsh-content-font-size-secondary, 14px); }\n.dsh-tr-reasoning summary { display: flex; min-height: 28px; align-items: center; gap: 7px; cursor: pointer; list-style: none; }\n.dsh-tr-reasoning summary::-webkit-details-marker { display: none; }\n.dsh-tr-reasoning-summary { min-width: 0; overflow: hidden; flex: 1; text-overflow: ellipsis; white-space: nowrap; }\n.dsh-tr-reasoning-body { margin-left: 21px; padding: 4px 0; }\n.dsh-tr-stopped { align-self: flex-start; border-radius: 4px; background: var(--dtr-surface-raised); padding: 0 6px; color: var(--dtr-muted); font-size: 11px; line-height: 18px; }\n\n@media (max-width: 640px) {\n  .dsh-tr-user-stack { max-width: 92%; }\n  .dsh-tr-message-content pre { padding: 10px; }\n  .dsh-tr-message-content .custom-dtr-doc { font-size: 0.9em; }\n  .dsh-tr-message-content .custom-dtr-doc-letter,\n  .dsh-tr-message-content .custom-dtr-doc-exam,\n  .dsh-tr-message-content .custom-dtr-doc-cipher,\n  .dsh-tr-message-content .custom-dtr-doc-telegram,\n  .dsh-tr-message-content .custom-dtr-doc-newspaper,\n  .dsh-tr-message-content .custom-dtr-doc-dossier,\n  .dsh-tr-message-content .custom-dtr-doc-diary { padding: 22px 18px; }\n  .dsh-tr-message-content .custom-dtr-exam-rule { margin: -22px -18px 18px; }\n  .dsh-tr-message-content .custom-dtr-cipher-band { margin: -22px -18px 18px; }\n  .dsh-tr-message-content .custom-dtr-letter-routing,\n  .dsh-tr-message-content .custom-dtr-telegram-route { grid-template-columns: 1fr; }\n  .dsh-tr-message-content .custom-dtr-telegram-route > * { border-right: 0; border-bottom: 1px solid #b59e63; }\n  .dsh-tr-message-content .custom-dtr-telegram-route > *:nth-last-child(2) { border-bottom: 1px solid #b59e63; }\n  .dsh-tr-message-content .custom-dtr-postcard-grid { grid-template-columns: 1fr; }\n  .dsh-tr-message-content .custom-dtr-postcard-message { min-height: 155px; border-right: 0; border-bottom: 1px solid #a39986; padding-right: 4px; }\n  .dsh-tr-message-content .custom-dtr-exam-candidate,\n  .dsh-tr-message-content .custom-dtr-cipher-routing,\n  .dsh-tr-message-content .custom-dtr-dossier-index { grid-template-columns: 1fr 1fr; }\n  .dsh-tr-message-content .custom-dtr-exam-candidate > *:nth-child(3),\n  .dsh-tr-message-content .custom-dtr-cipher-routing > *:nth-child(3),\n  .dsh-tr-message-content .custom-dtr-dossier-index > *:nth-child(3) { border-left: 0; border-top: 1px solid currentColor; }\n  .dsh-tr-message-content .custom-dtr-exam-candidate > *:nth-child(4),\n  .dsh-tr-message-content .custom-dtr-cipher-routing > *:nth-child(4),\n  .dsh-tr-message-content .custom-dtr-dossier-index > *:nth-child(4) { border-top: 1px solid currentColor; }\n  .dsh-tr-message-content .custom-dtr-newspaper-masthead { grid-template-columns: 1fr; align-items: center; }\n  .dsh-tr-message-content .custom-dtr-newspaper-masthead small,\n  .dsh-tr-message-content .custom-dtr-newspaper-masthead > span { text-align: center; }\n  .dsh-tr-message-content .custom-dtr-newspaper-body { column-count: 1; text-align: left; }\n  .dsh-tr-message-content .custom-dtr-dossier-head { grid-template-columns: 1fr auto; }\n  .dsh-tr-message-content .custom-dtr-dossier-head .custom-dtr-doc-draft { grid-column: 1 / -1; justify-self: start; }\n  .dsh-tr-message-content .custom-dtr-diary-head { grid-template-columns: 1fr; padding-right: 22px; }\n  .dsh-tr-message-content .custom-dtr-diary-date { align-items: flex-start; }\n  .dsh-tr-message-content .custom-dtr-doc-dossier { padding-top: 44px; }\n}\n\n@media print {\n  [data-dsh-tavern-renderer] .custom-dtr-doc {\n    break-inside: avoid;\n    max-width: 100%;\n    box-shadow: none;\n  }\n}\n\n@media (prefers-reduced-motion: reduce) {\n  .dsh-tr-message-content .custom-dtr-doc-draft > span { animation: none; }\n}\n\n@media (forced-colors: active) {\n  .dsh-tr-message-content .custom-dtr-doc {\n    border: 1px solid CanvasText;\n    background: Canvas;\n    box-shadow: none;\n    color: CanvasText;\n    forced-color-adjust: auto;\n  }\n  .dsh-tr-message-content .custom-dtr-letter-seal,\n  .dsh-tr-message-content .custom-dtr-postcard-stamp,\n  .dsh-tr-message-content .custom-dtr-cipher-band { border: 1px solid CanvasText; background: Canvas; color: CanvasText; }\n}\n";

// package.json
var version = "0.4.0";

// src/core/expression.js
var FORBIDDEN_IDENTIFIERS = /* @__PURE__ */ new Set([
  "window",
  "document",
  "globalThis",
  "self",
  "parent",
  "top",
  "frames",
  "constructor",
  "prototype",
  "__proto__",
  "eval",
  "Function",
  "fetch",
  "XMLHttpRequest",
  "WebSocket",
  "import",
  "require",
  "process",
  "new",
  "this"
]);
var BINDING_POWER = /* @__PURE__ */ new Map([
  ["??", 1],
  ["||", 2],
  ["&&", 3],
  ["==", 4],
  ["!=", 4],
  ["===", 4],
  ["!==", 4],
  ["<", 5],
  ["<=", 5],
  [">", 5],
  [">=", 5],
  ["+", 6],
  ["-", 6],
  ["*", 7],
  ["/", 7],
  ["%", 7]
]);
function syntax(message, position) {
  return new SyntaxError(`${message} at ${position}`);
}
var Tokenizer = class {
  constructor(source, maxTokens) {
    this.source = source;
    this.maxTokens = maxTokens;
    this.position = 0;
    this.count = 0;
  }
  next() {
    while (/\s/u.test(this.source[this.position] ?? "")) this.position += 1;
    if (++this.count > this.maxTokens) throw syntax("expression token limit exceeded", this.position);
    const start = this.position;
    if (start >= this.source.length) return { type: "eof", value: "", position: start };
    const tail = this.source.slice(start);
    const number = /^(?:\d+(?:\.\d*)?|\.\d+)(?:[eE][+-]?\d+)?/.exec(tail);
    if (number !== null) {
      this.position += number[0].length;
      return { type: "literal", value: Number(number[0]), position: start };
    }
    const char = this.source[start];
    if (char === '"' || char === "'") return this.readString(char, start);
    const identifier = /^[A-Za-z_$][\w$]*/.exec(tail);
    if (identifier !== null) {
      this.position += identifier[0].length;
      return { type: "identifier", value: identifier[0], position: start };
    }
    for (const operator of ["===", "!==", "??", "||", "&&", "==", "!=", "<=", ">="]) {
      if (tail.startsWith(operator)) {
        this.position += operator.length;
        return { type: "operator", value: operator, position: start };
      }
    }
    if ("()+-*/%!<>?:".includes(char)) {
      this.position += 1;
      return { type: "operator", value: char, position: start };
    }
    throw syntax(`token ${JSON.stringify(char)} is not allowed`, start);
  }
  readString(quote, start) {
    this.position += 1;
    let value = "";
    while (this.position < this.source.length) {
      const char = this.source[this.position++];
      if (char === quote) return { type: "literal", value, position: start };
      if (char === "\n" || char === "\r") throw syntax("newline in string literal", this.position - 1);
      if (char !== "\\") {
        value += char;
        continue;
      }
      const escaped = this.source[this.position++];
      const simple = { n: "\n", r: "\r", t: "	", b: "\b", f: "\f", "\\": "\\", '"': '"', "'": "'" };
      if (escaped in simple) value += simple[escaped];
      else throw syntax(`escape \\${escaped ?? ""} is not allowed`, this.position - 2);
    }
    throw syntax("unterminated string literal", start);
  }
};
var Parser = class {
  constructor(source, options) {
    this.tokenizer = new Tokenizer(source, options.maxTokens);
    this.maxDepth = options.maxDepth;
    this.current = this.tokenizer.next();
  }
  consume(value) {
    if (this.current.value !== value) throw syntax(`expected ${value}`, this.current.position);
    this.current = this.tokenizer.next();
  }
  parse() {
    const expression = this.parseExpression(0, 0);
    if (this.current.type !== "eof") {
      const suffix = this.current.value === "(" ? "function calls are not allowed" : `unexpected token ${this.current.value}`;
      throw syntax(suffix, this.current.position);
    }
    return expression;
  }
  parseExpression(minPower, depth) {
    if (depth > this.maxDepth) throw syntax("expression nesting limit exceeded", this.current.position);
    let left = this.parsePrefix(depth + 1);
    while (this.current.type === "operator") {
      if (this.current.value === "?" && minPower <= 0) {
        this.consume("?");
        const consequent = this.parseExpression(0, depth + 1);
        this.consume(":");
        const alternate = this.parseExpression(0, depth + 1);
        left = { type: "conditional", test: left, consequent, alternate };
        continue;
      }
      const power = BINDING_POWER.get(this.current.value);
      if (power === void 0 || power <= minPower) break;
      const operator = this.current.value;
      this.current = this.tokenizer.next();
      const right = this.parseExpression(power, depth + 1);
      left = { type: "binary", operator, left, right };
    }
    return left;
  }
  parsePrefix(depth) {
    const token = this.current;
    if (token.type === "literal") {
      this.current = this.tokenizer.next();
      return { type: "literal", value: token.value };
    }
    if (token.type === "identifier") {
      this.current = this.tokenizer.next();
      if (token.value === "true") return { type: "literal", value: true };
      if (token.value === "false") return { type: "literal", value: false };
      if (token.value === "null") return { type: "literal", value: null };
      if (token.value === "undefined") return { type: "literal", value: void 0 };
      if (FORBIDDEN_IDENTIFIERS.has(token.value)) throw syntax(`identifier ${token.value} is not allowed`, token.position);
      return { type: "identifier", name: token.value, position: token.position };
    }
    if (token.type === "operator" && ["!", "+", "-"].includes(token.value)) {
      this.current = this.tokenizer.next();
      return { type: "unary", operator: token.value, argument: this.parseExpression(8, depth + 1) };
    }
    if (token.value === "(") {
      this.consume("(");
      const expression = this.parseExpression(0, depth + 1);
      this.consume(")");
      return expression;
    }
    throw syntax(`unexpected token ${token.value || "end of expression"}`, token.position);
  }
};
function looseEqual(left, right) {
  if (left === right) return true;
  if (left === null && right === void 0 || left === void 0 && right === null) return true;
  if (typeof left === "boolean") return Number(left) === Number(right);
  if (typeof right === "boolean") return Number(left) === Number(right);
  if (typeof left === "number" && typeof right === "string" || typeof left === "string" && typeof right === "number") {
    return Number(left) === Number(right);
  }
  return false;
}
function evaluate(node, scope, budget) {
  if (--budget.remaining < 0) throw new Error("expression operation limit exceeded");
  switch (node.type) {
    case "literal":
      return node.value;
    case "identifier":
      if (!Object.prototype.hasOwnProperty.call(scope, node.name)) throw syntax(`unknown identifier ${node.name}`, node.position);
      return scope[node.name];
    case "unary": {
      const value = evaluate(node.argument, scope, budget);
      if (node.operator === "!") return !value;
      if (node.operator === "+") return +value;
      return -value;
    }
    case "conditional":
      return evaluate(node.test, scope, budget) ? evaluate(node.consequent, scope, budget) : evaluate(node.alternate, scope, budget);
    case "binary": {
      const left = evaluate(node.left, scope, budget);
      if (node.operator === "&&") return left && evaluate(node.right, scope, budget);
      if (node.operator === "||") return left || evaluate(node.right, scope, budget);
      if (node.operator === "??") return left ?? evaluate(node.right, scope, budget);
      const right = evaluate(node.right, scope, budget);
      switch (node.operator) {
        case "+":
          return left + right;
        case "-":
          return left - right;
        case "*":
          return left * right;
        case "/":
          return left / right;
        case "%":
          return left % right;
        case "<":
          return left < right;
        case "<=":
          return left <= right;
        case ">":
          return left > right;
        case ">=":
          return left >= right;
        case "===":
          return left === right;
        case "!==":
          return left !== right;
        case "==":
          return looseEqual(left, right);
        case "!=":
          return !looseEqual(left, right);
        default:
          throw new Error(`unsupported operator ${node.operator}`);
      }
    }
    default:
      throw new Error(`unsupported expression node ${node.type}`);
  }
}
function safeEvaluateExpression(source, suppliedScope = {}, suppliedOptions = {}) {
  const options = { maxLength: 512, maxTokens: 256, maxDepth: 32, maxOperations: 512, ...suppliedOptions };
  const expression = String(source).trim();
  if (expression.length === 0) return "";
  if (expression.length > options.maxLength) throw new Error("expression length limit exceeded");
  const scope = /* @__PURE__ */ Object.create(null);
  for (const [name, value] of Object.entries(suppliedScope ?? {})) {
    if (!FORBIDDEN_IDENTIFIERS.has(name) && /^[A-Za-z_$][\w$]*$/.test(name)) scope[name] = value;
  }
  const ast = new Parser(expression, options).parse();
  return evaluate(ast, scope, { remaining: options.maxOperations });
}
function expressionText(value) {
  if (value === void 0 || value === null) return "";
  if (typeof value === "object") return JSON.stringify(value);
  return String(value);
}
function evaluateInlineExpressions(input, scope = {}, options = {}) {
  return String(input ?? "").replace(/\{\{js::([\s\S]*?)\}\}/gi, (_token, expression) => {
    try {
      return expressionText(safeEvaluateExpression(expression, scope, options));
    } catch {
      return "[expression error]";
    }
  });
}

// src/core/markdown.js
function escapeHtml(value) {
  return String(value).replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&#39;");
}
function findClosing(text, marker, start) {
  let cursor = start;
  while ((cursor = text.indexOf(marker, cursor)) !== -1) {
    if (text[cursor - 1] !== "\\") return cursor;
    cursor += marker.length;
  }
  return -1;
}
function rawTagAt(tail) {
  return /^(?:<!--[^]*?-->|<\/?[A-Za-z][^>\n]*>)/.exec(tail)?.[0];
}
function isAsciiPunctuation(value) {
  const code = value.codePointAt(0);
  return code >= 33 && code <= 47 || code >= 58 && code <= 64 || code >= 91 && code <= 96 || code >= 123 && code <= 126;
}
function renderInline(input, depth = 0) {
  const text = String(input ?? "");
  if (depth > 24) return escapeHtml(text);
  let html = "";
  let index = 0;
  while (index < text.length) {
    const tail = text.slice(index);
    if (text[index] === "\\" && index + 1 < text.length && isAsciiPunctuation(text[index + 1])) {
      html += escapeHtml(text[index + 1]);
      index += 2;
      continue;
    }
    if (text[index] === "`") {
      const end = findClosing(text, "`", index + 1);
      if (end !== -1) {
        html += `<code>${escapeHtml(text.slice(index + 1, end).replace(/\s*\n\s*/g, " "))}</code>`;
        index = end + 1;
        continue;
      }
    }
    const image = /^!\[([^\]]*)\]\((\S+?)(?:\s+["']([^"']*)["'])?\)/.exec(tail);
    if (image !== null) {
      html += `<img src="${escapeHtml(image[2])}" alt="${escapeHtml(image[1])}"${image[3] ? ` title="${escapeHtml(image[3])}"` : ""}>`;
      index += image[0].length;
      continue;
    }
    const link = /^\[([^\]]+)\]\((\S+?)(?:\s+["']([^"']*)["'])?\)/.exec(tail);
    if (link !== null) {
      html += `<a href="${escapeHtml(link[2])}"${link[3] ? ` title="${escapeHtml(link[3])}"` : ""}>${renderInline(link[1], depth + 1)}</a>`;
      index += link[0].length;
      continue;
    }
    if (text[index] === "<") {
      const tag = rawTagAt(tail);
      if (tag !== void 0) {
        html += tag;
        index += tag.length;
        continue;
      }
    }
    const formats = [
      ["**", "strong"],
      ["__", "strong"],
      ["~~", "del"],
      ["++", "u"],
      ["*", "em"],
      ["_", "em"]
    ];
    let formatted = false;
    for (const [marker, tag] of formats) {
      if (!tail.startsWith(marker)) continue;
      const end = findClosing(text, marker, index + marker.length);
      if (end <= index + marker.length) continue;
      html += `<${tag}>${renderInline(text.slice(index + marker.length, end), depth + 1)}</${tag}>`;
      index = end + marker.length;
      formatted = true;
      break;
    }
    if (formatted) continue;
    html += escapeHtml(text[index]);
    index += 1;
  }
  return html;
}
function isFence(line) {
  return /^\s*(`{3,}|~{3,})([^`]*)$/.exec(line);
}
function listMatch(line) {
  const match = /^(\s*)([-+*]|\d+[.)])\s+(.+)$/.exec(line);
  if (match === null) return null;
  return { indent: match[1].replaceAll("	", "    ").length, ordered: /^\d/.test(match[2]), text: match[3] };
}
function startsBlock(lines, index) {
  const line = lines[index] ?? "";
  if (line.trim() === "") return true;
  if (isFence(line) !== null || listMatch(line) !== null) return true;
  if (/^\s{0,3}(?:#{1,6}\s+|>\s?|(?:-{3,}|\*{3,}|_{3,})\s*$)/.test(line)) return true;
  if (index + 1 < lines.length && /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(lines[index + 1])) return true;
  return false;
}
function splitTableRow(line) {
  return line.trim().replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
}
function renderTable(lines, start) {
  const headers = splitTableRow(lines[start]);
  let index = start + 2;
  const rows = [];
  while (index < lines.length && lines[index].includes("|") && lines[index].trim() !== "") {
    rows.push(splitTableRow(lines[index]));
    index += 1;
  }
  const head = `<thead><tr>${headers.map((cell) => `<th>${renderInline(cell)}</th>`).join("")}</tr></thead>`;
  const body = rows.length === 0 ? "" : `<tbody>${rows.map((row2) => `<tr>${headers.map((_, cell) => `<td>${renderInline(row2[cell] ?? "")}</td>`).join("")}</tr>`).join("")}</tbody>`;
  return { html: `<table>${head}${body}</table>`, next: index };
}
function renderList(lines, start) {
  const first = listMatch(lines[start]);
  const tag = first.ordered ? "ol" : "ul";
  const baseIndent = first.indent;
  const items = [];
  let index = start;
  while (index < lines.length) {
    const current = listMatch(lines[index]);
    if (current === null || current.indent !== baseIndent || current.ordered !== first.ordered) break;
    index += 1;
    const continuations = [];
    while (index < lines.length) {
      const next = listMatch(lines[index]);
      if (lines[index].trim() === "") break;
      if (next !== null && next.indent === baseIndent) break;
      if (next !== null && next.indent > baseIndent) {
        const nested = renderList(lines, index);
        continuations.push(nested.html);
        index = nested.next;
      } else {
        continuations.push(renderInline(lines[index].trim()));
        index += 1;
      }
    }
    items.push(`<li>${renderInline(current.text)}${continuations.length ? `<div>${continuations.join("<br>")}</div>` : ""}</li>`);
    if (lines[index]?.trim() === "") break;
  }
  return { html: `<${tag}>${items.join("")}</${tag}>`, next: index };
}
function markdownToHtml(input) {
  const lines = String(input ?? "").replace(/\r\n?/g, "\n").split("\n");
  const blocks = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index];
    if (line.trim() === "") {
      index += 1;
      continue;
    }
    const fence = isFence(line);
    if (fence !== null) {
      const marker = fence[1];
      const language = fence[2].trim().split(/\s+/)[0].replace(/[^\w-]/g, "");
      const code = [];
      index += 1;
      while (index < lines.length && !new RegExp(`^\\s*${marker[0]}{${marker.length},}\\s*$`).test(lines[index])) {
        code.push(lines[index++]);
      }
      if (index < lines.length) index += 1;
      blocks.push(`<pre><code${language ? ` class="language-${escapeHtml(language)}"` : ""}>${escapeHtml(code.join("\n"))}</code></pre>`);
      continue;
    }
    const heading = /^\s{0,3}(#{1,6})\s+(.+?)\s*#*\s*$/.exec(line);
    if (heading !== null) {
      blocks.push(`<h${heading[1].length}>${renderInline(heading[2])}</h${heading[1].length}>`);
      index += 1;
      continue;
    }
    if (/^\s{0,3}(?:-{3,}|\*{3,}|_{3,})\s*$/.test(line)) {
      blocks.push("<hr>");
      index += 1;
      continue;
    }
    if (/^\s{0,3}>/.test(line)) {
      const quote = [];
      while (index < lines.length && /^\s{0,3}>/.test(lines[index])) {
        quote.push(lines[index].replace(/^\s{0,3}>\s?/, ""));
        index += 1;
      }
      blocks.push(`<blockquote>${markdownToHtml(quote.join("\n"))}</blockquote>`);
      continue;
    }
    if (listMatch(line) !== null) {
      const list = renderList(lines, index);
      blocks.push(list.html);
      index = list.next;
      continue;
    }
    if (index + 1 < lines.length && line.includes("|") && /^\s*\|?(?:\s*:?-{3,}:?\s*\|)+\s*:?-{3,}:?\s*\|?\s*$/.test(lines[index + 1])) {
      const table = renderTable(lines, index);
      blocks.push(table.html);
      index = table.next;
      continue;
    }
    const paragraph = [line];
    index += 1;
    while (index < lines.length && lines[index].trim() !== "" && !startsBlock(lines, index)) {
      paragraph.push(lines[index]);
      index += 1;
    }
    blocks.push(`<p>${paragraph.map((value) => renderInline(value)).join("<br>")}</p>`);
  }
  return blocks.join("\n");
}

// src/core/documents.js
var DOCUMENT_TEMPLATE_IDS = Object.freeze([
  "letter",
  "exam",
  "postcard",
  "cipher",
  "telegram",
  "newspaper",
  "dossier",
  "diary"
]);
var DOCUMENT_TYPES = new Set(DOCUMENT_TEMPLATE_IDS);
var OPEN_DIRECTIVE = /^\s{0,3}:::([a-z][\w-]{0,31})\s*$/i;
var CLOSE_DIRECTIVE = /^\s{0,3}:::\s*$/;
var FIELD_LINE = /^([a-z][\w-]{0,31})\s*:\s*(.*)$/i;
var MAX_FIELDS = 32;
var MAX_FIELD_LENGTH = 2e3;
var SLOT_START = "\uE000DTRDOC";
var SLOT_END = "\uE001";
function field(fields, name, fallback = "") {
  const value = fields[name];
  return escapeHtml(value === void 0 || value === "" ? fallback : value);
}
function row(label, value, extraClass = "") {
  if (value === "") return "";
  const classes = ["custom-dtr-doc-field", extraClass].filter(Boolean).join(" ");
  return `<div class="${classes}"><small>${escapeHtml(label)}</small><span>${value}</span></div>`;
}
function bodyHtml(body) {
  return markdownToHtml(body.trim()) || "<p></p>";
}
function liveBadge(streaming) {
  return streaming ? '<span class="custom-dtr-doc-draft" role="status"><span aria-hidden="true"></span>Draft</span>' : "";
}
function wrapper(type, label, streaming, content) {
  const classes = [
    "custom-dtr-doc",
    `custom-dtr-doc-${type}`,
    streaming ? "custom-dtr-doc-streaming" : ""
  ].filter(Boolean).join(" ");
  return `<article class="${classes}" aria-label="${escapeHtml(label)}">${content}</article>`;
}
function renderLetter(fields, body, context, streaming) {
  const from = field(fields, "from", context.char ?? "Assistant");
  const to = field(fields, "to", context.user ?? "User");
  const subject = field(fields, "subject", "Personal correspondence");
  const seal = ["crimson", "navy", "black", "gold"].includes(fields.seal?.toLowerCase()) ? fields.seal.toLowerCase() : "crimson";
  return wrapper("letter", "Letter", streaming, [
    '<span class="custom-dtr-doc-paper-grain" aria-hidden="true"></span>',
    '<div class="custom-dtr-letter-fold" aria-hidden="true"></div>',
    '<div class="custom-dtr-doc-head">',
    "<div><small>Private correspondence</small>",
    `<h3>${subject}</h3></div>${liveBadge(streaming)}`,
    "</div>",
    '<div class="custom-dtr-letter-routing">',
    row("To", to),
    row("From", from),
    row("Place", field(fields, "place")),
    row("Date", field(fields, "date")),
    "</div>",
    `<section class="custom-dtr-doc-body custom-dtr-letter-body">${bodyHtml(body)}</section>`,
    '<div class="custom-dtr-letter-footer">',
    `<div>${row("Signed", from, "custom-dtr-letter-signature")}</div>`,
    `<span class="custom-dtr-letter-seal custom-dtr-letter-seal-${seal}" aria-hidden="true">${escapeHtml(from.slice(0, 1).toUpperCase() || "S")}</span>`,
    "</div>"
  ].join(""));
}
function renderExam(fields, body, context, streaming) {
  const title = field(fields, "title", "Examination paper");
  const instructions = field(fields, "instructions");
  return wrapper("exam", "Examination paper", streaming, [
    '<div class="custom-dtr-exam-rule" aria-hidden="true"><span></span><span></span></div>',
    `<div class="custom-dtr-doc-head"><div><small>${field(fields, "course", "Assessment")}</small><h3>${title}</h3></div>${liveBadge(streaming)}</div>`,
    '<div class="custom-dtr-exam-candidate">',
    row("Candidate", field(fields, "student", context.user ?? "User")),
    row("Date", field(fields, "date")),
    row("Duration", field(fields, "duration", "Not specified")),
    `<div class="custom-dtr-exam-score"><small>Total</small><strong>${field(fields, "total", "--")}</strong></div>`,
    "</div>",
    instructions ? `<aside class="custom-dtr-exam-instructions"><strong>Instructions</strong><span>${instructions}</span></aside>` : "",
    `<section class="custom-dtr-doc-body custom-dtr-exam-body">${bodyHtml(body)}</section>`,
    '<div class="custom-dtr-exam-footer"><span>End of paper</span><span>Check all pages before submitting</span></div>'
  ].join(""));
}
function renderPostcard(fields, body, context, streaming) {
  const stamp = ["airmail", "express", "vintage", "local"].includes(fields.stamp?.toLowerCase()) ? fields.stamp.toLowerCase() : "vintage";
  return wrapper("postcard", "Postcard", streaming, [
    '<div class="custom-dtr-postcard-edge" aria-hidden="true"></div>',
    `<div class="custom-dtr-postcard-caption"><span>Post card</span><strong>${field(fields, "location", "Somewhere memorable")}</strong>${liveBadge(streaming)}</div>`,
    '<div class="custom-dtr-postcard-grid">',
    `<section class="custom-dtr-doc-body custom-dtr-postcard-message">${bodyHtml(body)}${row("From", field(fields, "from", context.char ?? "Assistant"))}</section>`,
    '<section class="custom-dtr-postcard-address">',
    `<div class="custom-dtr-postcard-stamp custom-dtr-postcard-stamp-${stamp}" aria-label="${escapeHtml(stamp)} stamp"><span>${stamp}</span></div>`,
    '<div class="custom-dtr-postmark" aria-hidden="true"><span></span><span></span><span></span></div>',
    row("Deliver to", field(fields, "to", context.user ?? "User")),
    row("Date", field(fields, "date")),
    '<div class="custom-dtr-address-lines" aria-hidden="true"><span></span><span></span><span></span></div>',
    "</section></div>"
  ].join(""));
}
function renderCipher(fields, body, _context, streaming) {
  const classification = field(fields, "classification", "Classified");
  return wrapper("cipher", "Cipher memorandum", streaming, [
    `<div class="custom-dtr-cipher-band"><strong>${classification}</strong><span>${field(fields, "code", "NO CODE")}</span>${liveBadge(streaming)}</div>`,
    '<div class="custom-dtr-cipher-grid" aria-hidden="true"></div>',
    '<div class="custom-dtr-cipher-routing">',
    row("Origin", field(fields, "from")),
    row("Recipient", field(fields, "to")),
    row("Cipher key", field(fields, "key", "WITHHELD")),
    row("Date", field(fields, "date")),
    "</div>",
    '<div class="custom-dtr-cipher-redactions" aria-hidden="true"><span></span><span></span><span></span></div>',
    `<section class="custom-dtr-doc-body custom-dtr-cipher-body">${bodyHtml(body)}</section>`,
    `<div class="custom-dtr-cipher-footer"><span>Authentication: ${field(fields, "status", "unverified")}</span><strong>Destroy after reading</strong></div>`
  ].join(""));
}
function renderTelegram(fields, body, _context, streaming) {
  return wrapper("telegram", "Telegram", streaming, [
    '<div class="custom-dtr-telegram-perforation" aria-hidden="true"></div>',
    `<div class="custom-dtr-doc-head"><div><small>Wire transmission</small><h3>${field(fields, "priority", "Telegram")}</h3></div>${liveBadge(streaming)}</div>`,
    '<div class="custom-dtr-telegram-route">',
    row("To", field(fields, "to")),
    row("From", field(fields, "from")),
    row("Station", field(fields, "station")),
    row("Filed", [field(fields, "date"), field(fields, "time")].filter(Boolean).join(" / ")),
    "</div>",
    `<section class="custom-dtr-doc-body custom-dtr-telegram-body">${bodyHtml(body)}</section>`,
    '<div class="custom-dtr-telegram-footer">',
    `<span>${field(fields, "charge", "Standard charge")}</span><span>Operator ${field(fields, "operator", "--")}</span>`,
    "</div>"
  ].join(""));
}
function renderNewspaper(fields, body, _context, streaming) {
  return wrapper("newspaper", "Newspaper clipping", streaming, [
    '<div class="custom-dtr-newspaper-masthead">',
    `<small>${field(fields, "edition", "Daily edition")}</small><h2>${field(fields, "name", "The Daily Chronicle")}</h2><span>${field(fields, "date")}</span>`,
    "</div>",
    `<div class="custom-dtr-newspaper-section"><span>${field(fields, "section", "News")}</span>${liveBadge(streaming)}</div>`,
    `<h3 class="custom-dtr-newspaper-headline">${field(fields, "headline", "Untitled report")}</h3>`,
    fields.deck ? `<p class="custom-dtr-newspaper-deck">${field(fields, "deck")}</p>` : "",
    `<div class="custom-dtr-newspaper-byline">By ${field(fields, "byline", "Staff correspondent")}</div>`,
    `<section class="custom-dtr-doc-body custom-dtr-newspaper-body">${bodyHtml(body)}</section>`,
    '<div class="custom-dtr-newspaper-footer">Continued in the archive edition</div>'
  ].join(""));
}
function renderDossier(fields, body, _context, streaming) {
  return wrapper("dossier", "Case dossier", streaming, [
    `<div class="custom-dtr-dossier-tab">${field(fields, "file", "UNFILED")}</div>`,
    '<div class="custom-dtr-dossier-head">',
    `<div><small>${field(fields, "agency", "Records bureau")}</small><h3>${field(fields, "subject", "Unknown subject")}</h3></div>`,
    `<strong>${field(fields, "classification", "Restricted")}</strong>${liveBadge(streaming)}`,
    "</div>",
    '<div class="custom-dtr-dossier-index">',
    row("File", field(fields, "file")),
    row("Status", field(fields, "status", "Open")),
    row("Handler", field(fields, "handler")),
    row("Updated", field(fields, "date")),
    "</div>",
    `<section class="custom-dtr-doc-body custom-dtr-dossier-body">${bodyHtml(body)}</section>`,
    '<div class="custom-dtr-dossier-stamps" aria-hidden="true"><span>Filed</span><span>Copy</span></div>'
  ].join(""));
}
function renderDiary(fields, body, context, streaming) {
  return wrapper("diary", "Diary entry", streaming, [
    '<div class="custom-dtr-diary-ribbon" aria-hidden="true"></div>',
    '<div class="custom-dtr-diary-head">',
    `<div><small>${field(fields, "owner", context.char ?? "Private journal")}</small><h3>${field(fields, "title", "Journal entry")}</h3></div>${liveBadge(streaming)}`,
    '<div class="custom-dtr-diary-date">',
    `<strong>${field(fields, "date", "Undated")}</strong><span>${field(fields, "time")}</span>`,
    "</div></div>",
    '<div class="custom-dtr-diary-context">',
    row("Place", field(fields, "location")),
    row("Mood", field(fields, "mood")),
    row("Weather", field(fields, "weather")),
    "</div>",
    `<section class="custom-dtr-doc-body custom-dtr-diary-body">${bodyHtml(body)}</section>`,
    '<div class="custom-dtr-diary-flourish" aria-hidden="true"><span></span></div>'
  ].join(""));
}
var RENDERERS = Object.freeze({
  letter: renderLetter,
  exam: renderExam,
  postcard: renderPostcard,
  cipher: renderCipher,
  telegram: renderTelegram,
  newspaper: renderNewspaper,
  dossier: renderDossier,
  diary: renderDiary
});
function parseFields(lines) {
  const fields = /* @__PURE__ */ Object.create(null);
  let count = 0;
  for (const line of lines) {
    const match = FIELD_LINE.exec(line);
    if (match === null || count >= MAX_FIELDS) continue;
    fields[match[1].toLowerCase()] = match[2].trim().slice(0, MAX_FIELD_LENGTH);
    count += 1;
  }
  return fields;
}
function renderDocument(type, fields = {}, body = "", context = {}, { streaming = false } = {}) {
  const key = String(type ?? "").toLowerCase();
  const renderer = RENDERERS[key];
  if (renderer === void 0) throw new Error(`unknown document template: ${key || "(empty)"}`);
  const normalizedFields = Object.fromEntries(
    Object.entries(fields).slice(0, MAX_FIELDS).map(([name, value]) => [
      String(name).toLowerCase(),
      String(value ?? "").slice(0, MAX_FIELD_LENGTH)
    ])
  );
  return renderer(normalizedFields, String(body ?? ""), context, Boolean(streaming));
}
function extractDocumentBlocks(input, context = {}) {
  const source = String(input ?? "");
  const lines = source.split("\n");
  const output = [];
  const slots = [];
  const diagnostics = [];
  let slotNonce = 0;
  let index = 0;
  while (index < lines.length) {
    const open = OPEN_DIRECTIVE.exec(lines[index]);
    const type = open?.[1].toLowerCase();
    if (open === null || !DOCUMENT_TYPES.has(type)) {
      output.push(lines[index]);
      index += 1;
      continue;
    }
    let close = index + 1;
    while (close < lines.length && !CLOSE_DIRECTIVE.test(lines[close])) close += 1;
    const complete = close < lines.length;
    if (!complete && context.streaming !== true) {
      output.push(...lines.slice(index));
      break;
    }
    const payload = lines.slice(index + 1, complete ? close : lines.length);
    const separator = payload.findIndex((line) => /^\s*---\s*$/.test(line));
    if (separator === -1 && complete) {
      diagnostics.push({ type: "malformed-document", documentType: type, message: "missing metadata separator" });
      output.push(...lines.slice(index, close + 1));
      index = close + 1;
      continue;
    }
    const fields = parseFields(separator === -1 ? payload : payload.slice(0, separator));
    const body = separator === -1 ? "" : payload.slice(separator + 1).join("\n");
    let token;
    do {
      token = `${SLOT_START}${slotNonce}:${slots.length}${SLOT_END}`;
      slotNonce += 1;
    } while (source.includes(token));
    slots.push({
      token,
      html: renderDocument(type, fields, body, context, { streaming: !complete })
    });
    output.push("", token, "");
    index = complete ? close + 1 : lines.length;
  }
  return { value: output.join("\n"), slots, diagnostics };
}
function restoreDocumentBlocks(html, slots = []) {
  let output = String(html ?? "");
  for (const slot of slots) {
    output = output.replaceAll(`<p>${slot.token}</p>`, slot.html);
    output = output.replaceAll(slot.token, slot.html);
  }
  return output;
}

// src/core/macros.js
var MACRO_PATTERN = /\{\{([^{}]*)\}\}/g;
var VARIABLE_NAME = /^[\w.-]{1,128}$/u;
function valueText(value) {
  if (value === void 0 || value === null) return "";
  if (typeof value === "string") return value;
  if (typeof value === "number" || typeof value === "boolean") return String(value);
  try {
    return JSON.stringify(value);
  } catch {
    return String(value);
  }
}
function variableName(raw) {
  const name = String(raw ?? "").trim();
  if (!VARIABLE_NAME.test(name)) throw new Error(`invalid variable name: ${name || "(empty)"}`);
  return name;
}
function localDate(context) {
  const value = context.now instanceof Date ? context.now : new Date(context.now ?? Date.now());
  return Number.isNaN(value.getTime()) ? /* @__PURE__ */ new Date(0) : value;
}
var MacroRegistry = class {
  #resolvers = /* @__PURE__ */ new Map();
  register(name, resolver) {
    const key = String(name).trim().toLowerCase();
    if (!/^[a-z][\w-]{0,63}$/.test(key)) throw new Error(`invalid macro name: ${name}`);
    if (typeof resolver !== "function") throw new TypeError(`macro ${key} resolver must be a function`);
    if (this.#resolvers.has(key)) throw new Error(`macro already registered: ${key}`);
    this.#resolvers.set(key, resolver);
    return () => this.unregister(key);
  }
  unregister(name) {
    return this.#resolvers.delete(String(name).trim().toLowerCase());
  }
  resolve(name) {
    return this.#resolvers.get(String(name).trim().toLowerCase());
  }
  has(name) {
    return this.#resolvers.has(String(name).trim().toLowerCase());
  }
};
function installBuiltins(registry) {
  const identity = (key) => ({ context }) => valueText(context[key]);
  registry.register("char", identity("char"));
  registry.register("user", identity("user"));
  registry.register("role", identity("role"));
  registry.register("persona", identity("persona"));
  registry.register("description", identity("description"));
  registry.register("scenario", identity("scenario"));
  registry.register("newline", () => "\n");
  registry.register("time", ({ context }) => localDate(context).toLocaleTimeString());
  registry.register("date", ({ context }) => localDate(context).toLocaleDateString());
  registry.register("weekday", ({ context }) => localDate(context).toLocaleDateString(void 0, { weekday: "long" }));
  registry.register("isotime", ({ context }) => localDate(context).toISOString().slice(11, 19));
  registry.register("isodate", ({ context }) => localDate(context).toISOString().slice(0, 10));
  registry.register("getvar", ({ args, context }) => valueText(context.variables.get(variableName(args[0]))));
  registry.register("setvar", ({ args, context }) => {
    const name = variableName(args[0]);
    const value = args.slice(1).join("::");
    context.variables.set(name, value);
    return "";
  });
  registry.register("addvar", ({ args, context }) => {
    const name = variableName(args[0]);
    const incoming = args.slice(1).join("::");
    const current = context.variables.get(name) ?? "";
    const left = Number(current);
    const right = Number(incoming);
    const next = current !== "" && incoming !== "" && Number.isFinite(left) && Number.isFinite(right) ? left + right : `${valueText(current)}${incoming}`;
    context.variables.set(name, next);
    return "";
  });
  registry.register("incvar", ({ args, context }) => {
    const name = variableName(args[0]);
    const current = Number(context.variables.get(name) ?? 0);
    const amount = args[1] === void 0 || args[1] === "" ? 1 : Number(args[1]);
    const next = (Number.isFinite(current) ? current : 0) + (Number.isFinite(amount) ? amount : 0);
    context.variables.set(name, next);
    return valueText(next);
  });
}
var MacroEngine = class {
  constructor({ registry = new MacroRegistry(), maxPasses = 20, installDefaults = true } = {}) {
    this.registry = registry;
    this.maxPasses = maxPasses;
    if (installDefaults) installBuiltins(registry);
  }
  registerMacro(name, resolver) {
    return this.registry.register(name, resolver);
  }
  unregisterMacro(name) {
    return this.registry.unregister(name);
  }
  evaluate(input, suppliedContext = {}) {
    const context = {
      char: "Assistant",
      user: "User",
      role: "assistant",
      variables: /* @__PURE__ */ new Map(),
      ...suppliedContext
    };
    if (!(context.variables instanceof Map)) context.variables = new Map(Object.entries(context.variables ?? {}));
    let value = String(input ?? "");
    for (let pass = 0; pass < this.maxPasses; pass += 1) {
      let changed = false;
      const next = value.replace(MACRO_PATTERN, (token, body) => {
        const [rawName = "", ...args] = String(body).split("::");
        const name = rawName.trim().toLowerCase();
        if (name === "js") return token;
        const resolver = this.registry.resolve(name);
        if (resolver === void 0) return token;
        try {
          const replacement = valueText(resolver({ name, args, context, token, engine: this }));
          if (replacement !== token) changed = true;
          return replacement;
        } catch {
          return token;
        }
      });
      value = next;
      if (!changed) return value;
    }
    return value;
  }
};
function createMacroEngine(options) {
  return new MacroEngine(options);
}

// src/core/regex.js
var VALID_FLAGS = /^[dgimsuvy]*$/;
var ST_FIELDS = ["placement", "markdownOnly", "promptOnly", "substituteRegex", "runOnEdit", "minDepth", "maxDepth"];
var SUPPORTED_PLACEMENTS = /* @__PURE__ */ new Set([1, 2, 6]);
function invalid(code, message) {
  return Object.assign(new Error(message), { code });
}
function compile(pattern, flags) {
  try {
    new RegExp("", flags);
  } catch (error) {
    throw invalid("INVALID_FLAGS", error.message);
  }
  try {
    return new RegExp(pattern, flags);
  } catch (error) {
    throw invalid("INVALID_PATTERN", error.message);
  }
}
function findDelimiter(source, start) {
  let escaped = false;
  for (let index = start; index < source.length; index += 1) {
    const char = source[index];
    if (char === "/" && !escaped) return index;
    if (char === "\\") escaped = !escaped;
    else escaped = false;
  }
  return -1;
}
function validatePattern(pattern) {
  if (pattern.length > 1024) throw invalid("INVALID_PATTERN", "regex pattern exceeds 1024 characters");
  if (/\([^)]*[+*][^)]*\)\s*(?:[+*]|\{\d)/.test(pattern)) {
    throw invalid("INVALID_PATTERN", "regex contains a nested quantified group");
  }
}
function validateFlags(flags) {
  if (!VALID_FLAGS.test(flags)) throw invalid("INVALID_FLAGS", `invalid regex flags: ${flags}`);
  if (new Set(flags).size !== flags.length) throw invalid("INVALID_FLAGS", `duplicate regex flags: ${flags}`);
}
function parseFindRegex(source, format) {
  const value = String(source);
  if (!value.startsWith("/")) return { pattern: value, flags: format === "sillytavern" ? "" : "g" };
  const end = format === "sillytavern" ? value.lastIndexOf("/") : findDelimiter(value, 1);
  if (end < 1) throw new Error("unterminated findRegex literal");
  const flags = value.slice(end + 1);
  validateFlags(flags);
  return { pattern: value.slice(1, end), flags };
}
function parseRegexRule(input) {
  if (typeof input === "object" && input !== null && !Array.isArray(input)) {
    const format = input.format ?? (ST_FIELDS.some((key) => Object.hasOwn(input, key)) ? "sillytavern" : "legacy");
    if (format !== "legacy" && format !== "sillytavern") throw invalid("UNSUPPORTED_FORMAT", `unsupported regex format: ${format}`);
    const find = Object.hasOwn(input, "pattern") && !Object.hasOwn(input, "findRegex") ? { pattern: String(input.pattern), flags: format === "sillytavern" ? "" : "g" } : parseFindRegex(input.findRegex ?? input.pattern ?? "", format);
    validatePattern(find.pattern);
    if (format === "sillytavern" && find.pattern === "") throw invalid("INVALID_PATTERN", "ST findRegex must not be empty");
    const flags2 = String(input.flags ?? find.flags);
    validateFlags(flags2);
    if (input.roles !== void 0 && !Array.isArray(input.roles)) throw new Error("roles must be an array");
    if (format === "sillytavern" && input.placement !== void 0 && !Array.isArray(input.placement)) {
      throw new Error("placement must be an array");
    }
    const rule = {
      ...input,
      format,
      pattern: find.pattern,
      flags: flags2,
      replacement: String(input.replaceString ?? input.replacement ?? ""),
      enabled: input.enabled ?? !input.disabled,
      roles: input.roles === void 0 ? void 0 : [...input.roles],
      trimStrings: Array.isArray(input.trimStrings) ? input.trimStrings.map(String) : [],
      name: String(input.name ?? input.scriptName ?? "")
    };
    if (format === "legacy" || !rule.substituteRegex) compile(rule.pattern, rule.flags);
    return rule;
  }
  if (typeof input !== "string") throw new Error("regex rule must be an object or compact string");
  const source = input;
  if (!source.startsWith("/")) throw new Error("compact regex rule must start with /");
  const patternEnd = findDelimiter(source, 1);
  if (patternEnd === -1) throw new Error("compact regex rule is missing the pattern delimiter");
  const replacementEnd = findDelimiter(source, patternEnd + 1);
  if (replacementEnd === -1) throw new Error("compact regex rule is missing the replacement delimiter");
  const pattern = source.slice(1, patternEnd);
  const replacement = source.slice(patternEnd + 1, replacementEnd).replace(/\\\//g, "/");
  const flags = source.slice(replacementEnd + 1);
  validatePattern(pattern);
  validateFlags(flags);
  compile(pattern, flags);
  return { format: "legacy", pattern, replacement, flags, enabled: true, trimStrings: [], name: "" };
}
function normalizeRegexRules(rules = []) {
  if (!Array.isArray(rules)) throw new TypeError("regexRules must be an array");
  return rules.map((input) => {
    if (input?.format === "invalid") return input;
    try {
      return parseRegexRule(input);
    } catch (error) {
      return { format: "invalid", name: String(input?.name ?? input?.scriptName ?? ""), code: error.code ?? "INVALID_RULE", error: error.message };
    }
  });
}
function trimCapture(value, trimStrings) {
  let result = value ?? "";
  for (const trim of trimStrings) if (trim !== "") result = result.split(trim).join("");
  return result;
}
function interpolateLegacy(template, match, captures, groups, before, after, trimStrings) {
  const source = template.replace(/\{\{match\}\}/gi, "$&");
  return source.replace(/\$(\$|&|`|'|<([A-Za-z_$][\w$]*)>|(\d{1,2}))/g, (token, kind, groupName, digits) => {
    if (kind === "$") return "$";
    if (kind === "&") return trimCapture(match, trimStrings);
    if (kind === "`") return before;
    if (kind === "'") return after;
    if (groupName !== void 0) return trimCapture(groups?.[groupName], trimStrings);
    const index = Number(digits);
    if (index > 0 && index <= captures.length) return trimCapture(captures[index - 1], trimStrings);
    if (digits.length === 2) {
      const first = Number(digits[0]);
      if (first > 0 && first <= captures.length) return `${trimCapture(captures[first - 1], trimStrings)}${digits[1]}`;
    }
    return token;
  });
}
function interpolateSillyTavern(template, match, captures, groups, trimStrings, evaluate2) {
  return template.replace(/\{\{match\}\}/gi, "$0").replace(/\$(\d+|<([^>]+)>)/g, (_token, key, groupName) => {
    const value = groupName !== void 0 ? groups?.[groupName] : Number(key) === 0 ? match : captures[Number(key) - 1];
    return trimCapture(value, trimStrings.map((trim) => evaluate2(trim)));
  });
}
function escapePattern(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}
function substituteFind(pattern, mode, context, macroEngine, diagnostic) {
  if (mode === 0) return pattern;
  let result = "";
  let start = 0;
  while (start < pattern.length) {
    const open = pattern.indexOf("{{", start);
    if (open === -1) return result + pattern.slice(start);
    result += pattern.slice(start, open);
    let depth = 1;
    let end = open + 2;
    for (; end < pattern.length && depth > 0; end += 1) {
      if (pattern.startsWith("{{", end)) {
        depth += 1;
        end += 1;
      } else if (pattern.startsWith("}}", end)) {
        depth -= 1;
        end += 1;
      }
    }
    if (depth !== 0) return result + pattern.slice(open);
    const token = pattern.slice(open, end);
    const resolved = macroEngine?.evaluate(token, context) ?? token;
    if (/\{\{[^{}]*\}\}/.test(resolved)) diagnostic("UNKNOWN_MACRO", "findRegex contains an unresolved macro");
    result += mode === 2 && resolved !== token ? escapePattern(resolved) : resolved;
    start = end;
  }
  return result;
}
function bound(value, field2) {
  if (value === void 0 || value === null || value === "") return void 0;
  const number = typeof value === "number" ? value : typeof value === "string" && value.trim() !== "" ? Number(value) : NaN;
  if (!Number.isFinite(number)) throw invalid("INVALID_DEPTH", `${field2} must be a finite number or an empty bound`);
  return number < 0 ? void 0 : number;
}
function canApply(rule, context, diagnostic) {
  if (rule.enabled === false || rule.format === "sillytavern" && rule.disabled === true) return false;
  if (rule.format !== "sillytavern") {
    return !Array.isArray(rule.roles) || rule.roles.includes(context.role);
  }
  if (rule.markdownOnly !== true) {
    diagnostic("NOT_DISPLAY_RULE", "ST rule is not enabled for display; convert it explicitly to use it here");
    return false;
  }
  const placements = rule.placement ?? [];
  if (placements.length === 0) diagnostic("EMPTY_PLACEMENT", "ST rule has no selected placement");
  if (placements.some((value) => !SUPPORTED_PLACEMENTS.has(value))) {
    diagnostic("UNSUPPORTED_PLACEMENT", "Only user (1), assistant (2), and reasoning (6) placements are supported");
  }
  const placement = context.placement ?? (context.part === "reasoning" ? 6 : context.role === "user" ? 1 : context.role === "assistant" ? 2 : void 0);
  if (!placements.includes(placement) || !SUPPORTED_PLACEMENTS.has(placement)) return false;
  if (context.isEdit === true && !rule.runOnEdit) return false;
  const min = bound(rule.minDepth, "minDepth");
  const max = bound(rule.maxDepth, "maxDepth");
  if (min !== void 0 || max !== void 0) {
    if (!Number.isInteger(context.depth) || context.depth < 0) {
      diagnostic("DEPTH_UNAVAILABLE", "Rule has depth limits but this display has no reliable message depth");
      return false;
    }
    if (min !== void 0 && context.depth < min || max !== void 0 && context.depth > max) return false;
  }
  return true;
}
function applyRegexRules(input, rules, suppliedContext = {}, macroEngine) {
  const context = suppliedContext ?? {};
  let value = String(input ?? "");
  const diagnostics = [];
  for (let index = 0; index < (rules ?? []).length; index += 1) {
    const raw = rules[index];
    let name = String(raw?.name ?? raw?.scriptName ?? "");
    const seen = /* @__PURE__ */ new Set();
    const diagnostic = (code, error) => {
      if (seen.has(code)) return;
      seen.add(code);
      diagnostics.push({ index, name, code, error });
    };
    const evaluate2 = (text) => {
      const result = macroEngine?.evaluate(text, context) ?? text;
      if (/\{\{[^{}]*\}\}/.test(result)) diagnostic("UNKNOWN_MACRO", "Rule contains an unresolved macro");
      return result;
    };
    try {
      if (raw?.format === "invalid") {
        diagnostic(raw.code ?? "INVALID_RULE", raw.error);
        continue;
      }
      const rule = parseRegexRule(raw);
      name = rule.name;
      if (!canApply(rule, context, diagnostic)) continue;
      let pattern = rule.pattern;
      const trims = rule.trimStrings;
      if (rule.format === "sillytavern") {
        const mode = rule.substituteRegex ?? 0;
        if (![0, 1, 2].includes(mode)) {
          diagnostic("UNSUPPORTED_SUBSTITUTION", "substituteRegex must be 0, 1, or 2");
          continue;
        }
        pattern = substituteFind(pattern, mode, context, macroEngine, diagnostic);
        validatePattern(pattern);
      }
      const regex = compile(pattern, rule.flags);
      value = value.replace(regex, (...args) => {
        const match = args[0];
        const maybeGroups = args.at(-1);
        const hasGroups = typeof maybeGroups === "object" && maybeGroups !== null;
        const source = args.at(hasGroups ? -2 : -1);
        const offset = args.at(hasGroups ? -3 : -2);
        const captures = args.slice(1, hasGroups ? -3 : -2);
        const replacement = rule.format === "sillytavern" ? interpolateSillyTavern(rule.replacement, match, captures, hasGroups ? maybeGroups : void 0, trims, evaluate2) : interpolateLegacy(
          rule.replacement,
          match,
          captures,
          hasGroups ? maybeGroups : void 0,
          source.slice(0, offset),
          source.slice(offset + match.length),
          trims
        );
        return rule.format === "sillytavern" ? evaluate2(replacement) : macroEngine === void 0 ? replacement : macroEngine.evaluate(replacement, context);
      });
    } catch (error) {
      diagnostic(error.code ?? "INVALID_RULE", error instanceof Error ? error.message : String(error));
    }
  }
  return { value, diagnostics };
}

// src/core/sanitize.js
var ALLOWED_TAGS = /* @__PURE__ */ new Set([
  "a",
  "abbr",
  "article",
  "aside",
  "b",
  "blockquote",
  "br",
  "code",
  "del",
  "details",
  "div",
  "em",
  "h1",
  "h2",
  "h3",
  "h4",
  "h5",
  "h6",
  "hr",
  "i",
  "img",
  "kbd",
  "li",
  "ol",
  "p",
  "pre",
  "s",
  "section",
  "small",
  "span",
  "strong",
  "style",
  "sub",
  "summary",
  "sup",
  "table",
  "tbody",
  "td",
  "th",
  "thead",
  "tr",
  "u",
  "ul"
]);
var DROP_WITH_CONTENT = /* @__PURE__ */ new Set([
  "script",
  "iframe",
  "object",
  "embed",
  "svg",
  "math",
  "template",
  "noscript",
  "form",
  "input",
  "button",
  "textarea",
  "select",
  "option",
  "link",
  "meta",
  "base",
  "audio",
  "video",
  "source",
  "track",
  "canvas"
]);
var GLOBAL_ATTRIBUTES = /* @__PURE__ */ new Set(["class", "title", "aria-label", "aria-hidden", "dir", "lang"]);
var TAG_ATTRIBUTES = {
  a: /* @__PURE__ */ new Set(["href"]),
  img: /* @__PURE__ */ new Set(["src", "alt", "width", "height"]),
  span: /* @__PURE__ */ new Set(["role"]),
  ol: /* @__PURE__ */ new Set(["start", "reversed"]),
  li: /* @__PURE__ */ new Set(["value"]),
  td: /* @__PURE__ */ new Set(["colspan", "rowspan"]),
  th: /* @__PURE__ */ new Set(["colspan", "rowspan", "scope"]),
  details: /* @__PURE__ */ new Set(["open"])
};
var ALLOWED_CSS_PROPERTIES = /* @__PURE__ */ new Set([
  "accent-color",
  "align-items",
  "align-self",
  "background",
  "background-color",
  "border",
  "border-block",
  "border-bottom",
  "border-color",
  "border-inline",
  "border-left",
  "border-radius",
  "border-right",
  "border-style",
  "border-top",
  "border-width",
  "box-shadow",
  "box-sizing",
  "color",
  "column-gap",
  "display",
  "flex",
  "flex-basis",
  "flex-direction",
  "flex-grow",
  "flex-shrink",
  "flex-wrap",
  "font",
  "font-family",
  "font-size",
  "font-style",
  "font-weight",
  "gap",
  "grid",
  "grid-column",
  "grid-row",
  "height",
  "justify-content",
  "letter-spacing",
  "line-height",
  "list-style",
  "margin",
  "margin-block",
  "margin-bottom",
  "margin-inline",
  "margin-left",
  "margin-right",
  "margin-top",
  "max-height",
  "max-width",
  "min-height",
  "min-width",
  "opacity",
  "outline",
  "overflow",
  "overflow-wrap",
  "padding",
  "padding-block",
  "padding-bottom",
  "padding-inline",
  "padding-left",
  "padding-right",
  "padding-top",
  "row-gap",
  "text-align",
  "text-decoration",
  "text-overflow",
  "text-transform",
  "transform",
  "transition",
  "vertical-align",
  "white-space",
  "width",
  "word-break"
]);
function safeUrl(value, protocols) {
  try {
    const url = new URL(value);
    return protocols.has(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}
function customClass(name, preservePluginClasses = false) {
  const clean = name.replace(/[^A-Za-z0-9_-]/g, "");
  if (clean === "") return "";
  if (preservePluginClasses && clean.startsWith("dsh-tr-")) return clean;
  if (clean.startsWith("custom-") || clean.startsWith("language-") || clean === "dsh-tr-expression-error") return clean;
  return `custom-${clean}`;
}
function rewriteClasses(value, preservePluginClasses = false) {
  return value.split(/\s+/).map((name) => customClass(name, preservePluginClasses)).filter(Boolean).join(" ");
}
function rewriteSelectorClasses(selector, preservePluginClasses) {
  return selector.replace(/\.(-?[_A-Za-z][\w-]*)/g, (_match, name) => `.${customClass(name, preservePluginClasses)}`);
}
function sanitizeDeclarations(source) {
  const declarations = [];
  for (const chunk of source.split(";")) {
    const colon = chunk.indexOf(":");
    if (colon <= 0) continue;
    const property = chunk.slice(0, colon).trim().toLowerCase();
    const value = chunk.slice(colon + 1).trim();
    if (!(ALLOWED_CSS_PROPERTIES.has(property) || /^--[\w-]{1,64}$/.test(property))) continue;
    if (value === "" || /url\s*\(|(?:image-set|cross-fade|paint|element|src)\s*\(|expression\s*\(|@import|javascript:|behavior\s*:|-moz-binding|[{}\\]/i.test(value)) continue;
    if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(value)) continue;
    declarations.push(`${property}: ${value}`);
  }
  return declarations.join("; ");
}
function sanitizeSelector(selector, scope, preservePluginClasses) {
  const value = selector.trim();
  if (value === "" || value.startsWith("@")) return null;
  if (/(^|[\s>+~])(html|body|head|:root)(?=$|[\s>+~.#:[{])/i.test(value)) return null;
  if (value.includes("#") || /[^\w\s.*+>~:(),=[\]"'|-]/.test(value)) return null;
  const rewritten = rewriteSelectorClasses(value, preservePluginClasses);
  if (rewritten === scope || rewritten.startsWith(`${scope} `) || rewritten.startsWith(`${scope}:`)) return rewritten;
  return `${scope} ${rewritten}`;
}
function sanitizeCss(input, { scope = ".dsh-tr-message-content", preservePluginClasses = false } = {}) {
  const css = String(input ?? "").replace(/\/\*[\s\S]*?\*\//g, "").replace(/@(import|charset|namespace)[^;{}]*;/gi, "");
  const output = [];
  const rulePattern = /([^{}]+)\{([^{}]*)\}/g;
  let match;
  while ((match = rulePattern.exec(css)) !== null) {
    const declarations = sanitizeDeclarations(match[2]);
    if (declarations === "") continue;
    const selectors = match[1].split(",").map((selector) => sanitizeSelector(selector, scope, preservePluginClasses)).filter(Boolean);
    if (selectors.length > 0) output.push(`${selectors.join(", ")} { ${declarations}; }`);
  }
  return output.join("\n");
}
function sanitizeAttributes(element, tag, preservePluginClasses) {
  for (const attribute of [...element.attributes]) {
    const name = attribute.name.toLowerCase();
    const allowed = GLOBAL_ATTRIBUTES.has(name) || TAG_ATTRIBUTES[tag]?.has(name);
    if (!allowed || name.startsWith("on") || name === "style" || name === "id" || name === "srcset") {
      element.removeAttribute(attribute.name);
    }
  }
  if (element.hasAttribute("class")) {
    const classes = rewriteClasses(element.getAttribute("class") ?? "", preservePluginClasses);
    if (classes === "") element.removeAttribute("class");
    else element.setAttribute("class", classes);
  }
  if (element.hasAttribute("role") && element.getAttribute("role") !== "status") element.removeAttribute("role");
  if (tag === "a") {
    const href = safeUrl(element.getAttribute("href") ?? "", /* @__PURE__ */ new Set(["http:", "https:", "mailto:"]));
    if (href === null) element.removeAttribute("href");
    else {
      element.setAttribute("href", href);
      element.setAttribute("target", "_blank");
      element.setAttribute("rel", "noopener noreferrer");
    }
  }
  if (tag === "img") {
    const src = safeUrl(element.getAttribute("src") ?? "", /* @__PURE__ */ new Set(["http:", "https:"]));
    if (src === null) {
      element.remove();
      return false;
    }
    element.setAttribute("src", src);
    element.setAttribute("loading", "lazy");
    element.setAttribute("decoding", "async");
    element.setAttribute("referrerpolicy", "no-referrer");
  }
  return true;
}
function sanitizeElement(element, preservePluginClasses) {
  const tag = element.localName.toLowerCase();
  if (DROP_WITH_CONTENT.has(tag)) {
    element.remove();
    return;
  }
  if (!ALLOWED_TAGS.has(tag)) {
    for (const child of [...element.children]) sanitizeElement(child, preservePluginClasses);
    element.replaceWith(...element.childNodes);
    return;
  }
  if (tag === "style") {
    const css = sanitizeCss(element.textContent, { preservePluginClasses });
    if (css === "") element.remove();
    else {
      for (const attribute of [...element.attributes]) element.removeAttribute(attribute.name);
      element.textContent = css;
    }
    return;
  }
  if (!sanitizeAttributes(element, tag, preservePluginClasses)) return;
  for (const child of [...element.children]) sanitizeElement(child, preservePluginClasses);
}
function sanitizeHtml(input, { document: suppliedDocument, preservePluginClasses = false } = {}) {
  const owner = suppliedDocument ?? globalThis.document;
  if (owner?.createElement === void 0) throw new Error("sanitizeHtml requires a browser Document");
  const root = owner.createElement("div");
  root.innerHTML = String(input ?? "");
  for (const child of [...root.children]) sanitizeElement(child, preservePluginClasses);
  for (const comment of [...root.childNodes].filter((node) => node.nodeType === 8)) comment.remove();
  return root.innerHTML;
}

// src/core/templates.js
var DEFAULT_TEMPLATES = Object.freeze({
  system: '<aside class="dsh-tr-message dsh-tr-system" data-role="system"><div class="dsh-tr-message-content">{{content}}</div></aside>',
  user: '<section class="dsh-tr-message dsh-tr-user" data-role="user"><div class="dsh-tr-message-content">{{content}}</div></section>',
  assistant: '<article class="dsh-tr-message dsh-tr-assistant" data-role="assistant"><div class="dsh-tr-message-content">{{content}}</div></article>'
});
function applyRoleTemplate(content, suppliedRole, context = {}, suppliedTemplates = DEFAULT_TEMPLATES) {
  const role = ["system", "user", "assistant"].includes(suppliedRole) ? suppliedRole : "assistant";
  const templates = { ...DEFAULT_TEMPLATES, ...suppliedTemplates };
  const template = String(templates[role]);
  const substitutions = {
    role,
    char: escapeHtml(context.char ?? "Assistant"),
    user: escapeHtml(context.user ?? "User")
  };
  let output = template;
  for (const [name, value] of Object.entries(substitutions)) output = output.replaceAll(`{{${name}}}`, value);
  return output.replaceAll("{{content}}", String(content ?? ""));
}

// src/core/pipeline.js
var REQUIRED_ORDER = ["regex", "macros", "expressions", "documents", "markdown", "sanitize", "template"];
function variableScope(context) {
  const scope = { ...context };
  delete scope.variables;
  for (const [name, value] of context.variables) {
    if (/^[A-Za-z_$][\w$]*$/.test(name)) scope[name] = value;
  }
  return scope;
}
var RenderPipeline = class {
  constructor(stages) {
    this.stages = [...stages];
    for (const stage of this.stages) {
      if (stage.securityCritical === true && stage.enabled === false) {
        throw new TypeError(`cannot disable security-critical stage: ${stage.name}`);
      }
    }
  }
  register(stage) {
    if (stage === null || typeof stage !== "object" || typeof stage.name !== "string" || typeof stage.run !== "function") {
      throw new TypeError("stage requires name and run");
    }
    if (stage.securityCritical === true && stage.enabled === false) {
      throw new TypeError(`cannot disable security-critical stage: ${stage.name}`);
    }
    if (this.stages.some((item) => item.name === stage.name)) throw new Error(`stage already registered: ${stage.name}`);
    let index = this.stages.length;
    if (stage.before !== void 0) {
      index = this.stages.findIndex((item) => item.name === stage.before);
      if (index === -1) throw new Error(`unknown before stage: ${stage.before}`);
    } else if (stage.after !== void 0) {
      const target = this.stages.findIndex((item) => item.name === stage.after);
      if (target === -1) throw new Error(`unknown after stage: ${stage.after}`);
      index = target + 1;
    }
    this.stages.splice(index, 0, { enabled: true, ...stage });
    return () => {
      const current = this.stages.findIndex((item) => item.name === stage.name);
      if (current !== -1) this.stages.splice(current, 1);
    };
  }
  setEnabled(name, enabled) {
    const stage = this.stages.find((item) => item.name === name);
    if (stage === void 0) throw new Error(`unknown stage: ${name}`);
    if (stage.securityCritical === true && !Boolean(enabled)) {
      throw new TypeError(`cannot disable security-critical stage: ${name}`);
    }
    stage.enabled = Boolean(enabled);
  }
  run(input, state) {
    let value = String(input ?? "");
    const trace = [];
    for (const stage of this.stages) {
      if (stage.enabled === false) continue;
      try {
        value = String(stage.run(value, state) ?? "");
        trace.push({ name: stage.name });
      } catch (error) {
        const message = error instanceof Error ? error.message : String(error);
        const securityCritical = stage.securityCritical === true;
        const traceEntry = { name: stage.name, error: message };
        if (securityCritical) traceEntry.securityCritical = true;
        trace.push(traceEntry);
        if (Array.isArray(state?.diagnostics)) {
          const diagnostic = { stage: stage.name, error: message };
          if (securityCritical) diagnostic.securityCritical = true;
          state.diagnostics.push(diagnostic);
        }
        if (securityCritical) {
          return {
            html: "",
            trace,
            error: {
              code: "RENDER_STAGE_FAILED",
              stage: stage.name,
              message,
              securityCritical: true
            }
          };
        }
      }
    }
    return { html: value, trace };
  }
};
var TavernRenderer = class {
  constructor(suppliedOptions = {}) {
    this.options = {
      char: "Assistant",
      user: "User",
      maxInputLength: 1024 * 1024,
      regexRules: [],
      templates: DEFAULT_TEMPLATES,
      expression: {},
      stages: {},
      ...suppliedOptions
    };
    this.options.templates = { ...DEFAULT_TEMPLATES, ...suppliedOptions.templates ?? {} };
    this.options.regexRules = normalizeRegexRules(suppliedOptions.regexRules ?? []);
    this.variables = suppliedOptions.variables instanceof Map ? new Map(suppliedOptions.variables) : /* @__PURE__ */ new Map();
    this.macros = suppliedOptions.macros ?? createMacroEngine();
    this.pipeline = new RenderPipeline([
      {
        name: "regex",
        run: (value, state) => {
          const result = applyRegexRules(value, this.options.regexRules, state.context, this.macros);
          state.diagnostics.push(...result.diagnostics.map((item) => ({ stage: "regex", ...item })));
          return result.value;
        }
      },
      { name: "macros", run: (value, state) => this.macros.evaluate(value, state.context) },
      { name: "expressions", run: (value, state) => evaluateInlineExpressions(value, variableScope(state.context), this.options.expression) },
      {
        name: "documents",
        run: (value, state) => {
          const result = extractDocumentBlocks(value, state.context);
          state.documents = result.slots;
          state.diagnostics.push(...result.diagnostics.map((item) => ({ stage: "documents", ...item })));
          return result.value;
        }
      },
      { name: "markdown", run: (value, state) => restoreDocumentBlocks(markdownToHtml(value), state.documents) },
      { name: "sanitize", securityCritical: true, run: (value) => sanitizeHtml(value) },
      {
        name: "template",
        securityCritical: true,
        run: (value, state) => sanitizeHtml(
          applyRoleTemplate(value, state.context.role, state.context, this.options.templates),
          { preservePluginClasses: true }
        )
      }
    ]);
    for (const name of REQUIRED_ORDER) {
      if (this.options.stages[name] === false) this.pipeline.setEnabled(name, false);
    }
  }
  render(input, suppliedContext = {}) {
    const source = String(input ?? "");
    if (source.length > this.options.maxInputLength) throw new Error("message input length limit exceeded");
    const context = {
      char: this.options.char,
      user: this.options.user,
      role: "assistant",
      variables: this.variables,
      ...suppliedContext
    };
    if (suppliedContext.variables instanceof Map) context.variables = new Map(suppliedContext.variables);
    if (!(context.variables instanceof Map)) context.variables = new Map(Object.entries(context.variables ?? {}));
    const diagnostics = [];
    const result = this.pipeline.run(source.replace(/\r\n?/g, "\n"), {
      context,
      diagnostics,
      documents: [],
      renderer: this
    });
    return { ...result, diagnostics };
  }
  configure(partial = {}) {
    if (partial.regexRules !== void 0) this.options.regexRules = normalizeRegexRules(partial.regexRules);
    if (partial.templates !== void 0) this.options.templates = { ...this.options.templates, ...partial.templates };
    if (partial.stages !== void 0) {
      for (const [name, enabled] of Object.entries(partial.stages)) this.setStageEnabled(name, enabled);
    }
    this.options = { ...this.options, ...partial, regexRules: this.options.regexRules, templates: this.options.templates };
  }
  registerMacro(name, resolver) {
    return this.macros.registerMacro(name, resolver);
  }
  unregisterMacro(name) {
    return this.macros.unregisterMacro(name);
  }
  registerStage(stage) {
    return this.pipeline.register(stage);
  }
  setStageEnabled(name, enabled) {
    this.pipeline.setEnabled(name, enabled);
  }
};
function createRenderer(options) {
  return new TavernRenderer(options);
}

// src/core/regex-import.js
function parseRegexImport(input) {
  const document2 = JSON.parse(typeof input === "string" ? input : JSON.stringify(input));
  let source = "rule";
  let records;
  if (Array.isArray(document2)) {
    source = "array";
    records = document2;
  } else if (document2 !== null && typeof document2 === "object" && Object.hasOwn(document2, "extensions")) {
    source = "preset";
    records = document2.extensions?.regex_scripts;
    if (records === void 0) return { source, rules: [], summary: summaryOf([]), message: "\u6B64\u9884\u8BBE\u6CA1\u6709 extensions.regex_scripts\uFF0C\u914D\u7F6E\u672A\u6539\u53D8\u3002" };
    if (!Array.isArray(records)) throw new TypeError("preset.extensions.regex_scripts must be an array");
  } else if (document2 !== null && typeof document2 === "object" && Object.hasOwn(document2, "findRegex")) records = [document2];
  else throw new TypeError("\u8BF7\u5BFC\u5165 ST \u6B63\u5219\u5BF9\u8C61\u3001\u6B63\u5219\u6570\u7EC4\u6216\u542B extensions.regex_scripts \u7684\u5B8C\u6574\u9884\u8BBE JSON\u3002");
  const rules = records.map((record) => record !== null && typeof record === "object" && !Array.isArray(record) ? { ...record, format: "sillytavern" } : { format: "invalid", original: record, error: "ST regex record must be an object" });
  return { source, rules, summary: summaryOf(rules) };
}
function summaryOf(rules) {
  return {
    total: rules.length,
    display: rules.filter((rule) => rule?.markdownOnly === true).length,
    disabled: rules.filter((rule) => rule?.disabled === true || rule?.enabled === false).length,
    promptOnly: rules.filter((rule) => rule?.promptOnly === true && rule?.markdownOnly !== true).length
  };
}

// src/core/themes.js
var THEMES = Object.freeze(["harness", "tavern-dark", "paper"]);
var THEME_CSS = `
[data-dsh-tavern-renderer] {
  --dtr-surface: var(--dsw-alias-bg-base, #fff);
  --dtr-surface-raised: var(--dsw-alias-bg-layer-1, #f7f7f8);
  --dtr-text: var(--dsw-alias-label-primary, #17181a);
  --dtr-muted: var(--dsw-alias-label-tertiary, #6a6f78);
  --dtr-border: var(--dsw-alias-divider, #dfe1e5);
  --dtr-accent: #17806d;
  --dtr-quote: #b54747;
  --dtr-code: #f2f3f5;
}
[data-dsh-tavern-theme="tavern-dark"] [data-dsh-tavern-renderer] {
  --dtr-surface: #1f2227;
  --dtr-surface-raised: #292d33;
  --dtr-text: #edf0f2;
  --dtr-muted: #a9b0b8;
  --dtr-border: #454b53;
  --dtr-accent: #67c7ad;
  --dtr-quote: #e39882;
  --dtr-code: #17191d;
}
[data-dsh-tavern-theme="paper"] [data-dsh-tavern-renderer] {
  --dtr-surface: #fbfaf7;
  --dtr-surface-raised: #f0f2ee;
  --dtr-text: #242826;
  --dtr-muted: #626a66;
  --dtr-border: #cdd3cf;
  --dtr-accent: #146b63;
  --dtr-quote: #9f3f48;
  --dtr-code: #e9ece9;
}
`;
var THEME_KEY = "dsh-tavern-renderer.theme";
var CSS_KEY = "dsh-tavern-renderer.custom-css";
function storageGet(storage, key, fallback) {
  try {
    return storage?.getItem(key) ?? fallback;
  } catch {
    return fallback;
  }
}
function storageSet(storage, key, value) {
  try {
    storage?.setItem(key, value);
  } catch {
  }
}
var ThemeManager = class {
  constructor(ownerDocument = globalThis.document, storage = globalThis.localStorage) {
    if (ownerDocument?.head === void 0) throw new Error("ThemeManager requires a browser Document");
    this.document = ownerDocument;
    this.storage = storage;
    this.baseStyle = null;
    this.customStyle = null;
    this.theme = "harness";
    this.customCss = "";
  }
  install() {
    if (this.baseStyle !== null) return;
    this.baseStyle = this.document.createElement("style");
    this.baseStyle.dataset.dshTavernOwned = "theme";
    this.baseStyle.textContent = THEME_CSS;
    this.customStyle = this.document.createElement("style");
    this.customStyle.dataset.dshTavernOwned = "custom";
    this.document.head.append(this.baseStyle, this.customStyle);
    const storedTheme = storageGet(this.storage, THEME_KEY, "harness");
    this.setTheme(THEMES.includes(storedTheme) ? storedTheme : "harness");
    this.setCustomCss(storageGet(this.storage, CSS_KEY, ""));
  }
  setTheme(name) {
    if (!THEMES.includes(name)) throw new Error(`unknown theme: ${name}`);
    this.theme = name;
    this.document.documentElement.dataset.dshTavernTheme = name;
    storageSet(this.storage, THEME_KEY, name);
  }
  setCustomCss(css) {
    if (this.customStyle === null) throw new Error("ThemeManager is not installed");
    this.customCss = String(css ?? "");
    this.customStyle.textContent = sanitizeCss(this.customCss, {
      scope: "[data-dsh-tavern-renderer]",
      preservePluginClasses: true
    });
    storageSet(this.storage, CSS_KEY, this.customCss);
  }
  getCustomStyleElement() {
    return this.customStyle;
  }
  dispose() {
    this.baseStyle?.remove();
    this.customStyle?.remove();
    this.baseStyle = null;
    this.customStyle = null;
    delete this.document.documentElement.dataset.dshTavernTheme;
  }
};

// src/client/register.js
var SHADOW_PRIORITY = -100;
var RENDERED_NODE_KEYS = Object.freeze(["assistant-step", "user", "steering"]);
function disposeRegistrations(value) {
  if (typeof value === "function") {
    value();
    return;
  }
  if (value === null || value === void 0 || typeof value[Symbol.iterator] !== "function") return;
  for (const dispose of value) if (typeof dispose === "function") dispose();
}
function registerTavernRenderers(ctx, components, createInject) {
  const disposeInjection = ctx.slots.inject("conversation.chat.node", () => RENDERED_NODE_KEYS.map((key) => {
    const component = key === "assistant-step" ? components.assistant : components.user;
    return ctx.slots.register({
      name: "conversation.chat.node",
      key,
      priority: SHADOW_PRIORITY,
      locale: "chat",
      inject: createInject
    }, component);
  }));
  return () => {
    disposeRegistrations(disposeInjection);
  };
}

// src/client/renderers.jsx
var import_react = require("react");
var import_dsh_client_ui_primitives = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime = require("react/jsx-runtime");
function SafeHtml({ result, className }) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "div",
    {
      className,
      "data-render-trace": result.trace.map((item) => item.name).join(","),
      dangerouslySetInnerHTML: { __html: result.html }
    }
  );
}
function CopyAction({ text, t }) {
  const [copied, setCopied] = (0, import_react.useState)(false);
  const timer = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => () => {
    if (timer.current !== null) window.clearTimeout(timer.current);
  }, []);
  const copy = (0, import_react.useCallback)(() => {
    if (copied) return;
    void (0, import_dsh_client_ui_primitives.writeClipboard)(text).then((ok) => {
      if (!ok) return;
      setCopied(true);
      if (timer.current !== null) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => {
        timer.current = null;
        setCopied(false);
      }, 1e3);
    });
  }, [copied, text]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.Tooltip, { label: copied ? t("copied") : t("copy"), side: "bottom", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", { type: "button", className: "dsh-tr-copy", "aria-label": copied ? t("copied") : t("copy"), onClick: copy, children: copied ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCheckOutlineRegular, { size: 16 }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconCopyOutlineRegular, { size: 16 }) }) });
}
var noSubscribe = () => () => {
};
var zeroRevision = () => 0;
function useRenderRevision(renderConfig) {
  return (0, import_react.useSyncExternalStore)(renderConfig?.subscribe ?? noSubscribe, renderConfig?.getSnapshot ?? zeroRevision, renderConfig?.getSnapshot ?? zeroRevision);
}
function useMessageDepth(node, useSession, useChat, depthIndex) {
  const open = useSession?.((session) => session.openState === "open") === true;
  const depth = useChat?.((snapshot) => depthIndex?.(snapshot).get(node.key));
  return open ? depth : void 0;
}
function displayReasoning(source) {
  const opening = "<signature>";
  if (source !== "" && opening.startsWith(source)) return "";
  if (!source.startsWith(opening)) return source;
  const end = source.indexOf("</signature>", opening.length);
  return end === -1 ? "" : source.slice(end + "</signature>".length).replace(/^(?:\r?\n)*/, "");
}
function summaryOf2(html) {
  const parsed = new window.DOMParser().parseFromString(html, "text/html");
  for (const style of parsed.querySelectorAll("style")) style.remove();
  return (parsed.body.textContent ?? "").replace(/\s+/g, " ").trim().slice(0, 180);
}
function ReasoningBlock({ text: rawText, running, renderTavern, hidden, t, revision, depth }) {
  const text = displayReasoning(rawText);
  const result = (0, import_react.useMemo)(
    () => renderTavern(text, { role: "assistant", placement: 6, part: "reasoning", streaming: running, depth }),
    [renderTavern, running, text, revision, depth]
  );
  const summary = (0, import_react.useMemo)(() => summaryOf2(result.html), [result.html]);
  if (text === "") return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", { className: "dsh-tr-reasoning", hidden: hidden || void 0, "data-running": running || void 0, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("summary", { children: [
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.IconThinkOutlineRegular, { size: 14 }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: t("message.think") }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-tr-reasoning-summary", children: summary })
    ] }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafeHtml, { result, className: "dsh-tr-reasoning-body" })
  ] });
}
var TavernAssistantNode = (0, import_react.memo)(function TavernAssistantNode2({ node, groupPart, turnProcess, renderFactorySlot, loadImage, renderTavern, renderConfig, useSession, useChat, depthIndex, t }) {
  const revision = useRenderRevision(renderConfig);
  const depth = useMessageDepth(node, useSession, useChat, depthIndex);
  const { blocks, status } = node.data;
  const streaming = status === "running";
  const reasoningHidden = turnProcess?.foldable === true && !turnProcess.open && turnProcess.spec.answerStep === node.data.step && turnProcess.spec.inlineReasoning;
  const visible = blocks.some((block) => block.kind !== "tool-call");
  const rendered = [];
  for (let index = 0; index < blocks.length; index += 1) {
    const block = blocks[index];
    if (groupPart === "reasoning" && block.kind !== "reasoning") continue;
    if (groupPart === "response" && block.kind === "reasoning") continue;
    if (block.kind === "text") {
      const result = renderTavern(block.text, { role: "assistant", placement: 2, streaming, depth });
      rendered.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafeHtml, { result }, index));
    } else if (block.kind === "reasoning") {
      if (block.text.trim() === "") continue;
      rendered.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          ReasoningBlock,
          {
            text: block.text,
            running: streaming && index === blocks.length - 1,
            renderTavern,
            hidden: reasoningHidden,
            t,
            revision,
            depth
          },
          index
        )
      );
    } else if (block.kind === "image") {
      const start = index;
      const images = [block];
      while (blocks[index + 1]?.kind === "image") images.push(blocks[++index]);
      rendered.push(/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: renderFactorySlot("conversation.images.content", {
        images: images.map(({ attachment }) => ({ attachment })),
        loadImage,
        align: "start"
      }) }, start));
    } else if (block.kind !== "tool-call") {
      rendered.push(
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dsh_client_ui_primitives.JsonBlock,
          {
            label: t("message.unknownBlock"),
            payload: block.block,
            truncatedLabel: (total) => t("json.truncated", { total })
          },
          index
        )
      );
    }
  }
  if (!visible && !streaming && status !== "interrupted") return null;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-tr-root dsh-tr-assistant-root", "data-dsh-tavern-renderer": true, "data-streaming": streaming || void 0, children: [
    rendered,
    status === "interrupted" && (groupPart !== "reasoning" || !blocks.some((block) => block.kind !== "reasoning" && block.kind !== "tool-call")) && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dsh-tr-stopped", children: t("message.stopped") })
  ] });
});
function splitContent(content) {
  const texts = [];
  const attachments = [];
  const rest = [];
  for (const block of content) {
    if (block?.type === "text" && typeof block.text === "string") texts.push(block.text);
    else if ((block?.type === "image" || block?.type === "file") && block.attachment !== void 0) attachments.push(block);
    else rest.push(block);
  }
  return { text: texts.join(""), attachments, rest };
}
var TavernUserNode = (0, import_react.memo)(function TavernUserNode2({ node, renderFactorySlot, loadImage, renderTavern, renderConfig, useSession, useChat, depthIndex, t }) {
  const revision = useRenderRevision(renderConfig);
  const depth = useMessageDepth(node, useSession, useChat, depthIndex);
  const { text, attachments, rest } = splitContent(node.data.content);
  const result = (0, import_react.useMemo)(
    () => renderTavern(text, { role: "user", placement: 1, depth }),
    [renderTavern, text, revision, depth]
  );
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-tr-root dsh-tr-user-root", "data-dsh-tavern-renderer": true, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-tr-user-stack", children: [
      attachments.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-tr-attachments", "data-message-attachments": true, children: attachments.map((block, index) => block.type === "image" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { children: renderFactorySlot("conversation.images.content", {
        images: [{ attachment: block.attachment }],
        loadImage,
        align: "end",
        compact: attachments.length > 1
      }) }, index) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dsh-tr-file", title: block.attachment.name, children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_dsh_client_ui_primitives.FileTypeIcon, { path: block.attachment.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
          block.attachment.name,
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: (0, import_dsh_client_ui_primitives.fileSizeText)(block.attachment.bytes) })
        ] })
      ] }, index)) }),
      (text !== "" || rest.length > 0) && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-tr-user-bubble", children: [
        text !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(SafeHtml, { result }),
        rest.map((block, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_dsh_client_ui_primitives.JsonBlock,
          {
            label: t("message.extraBlock"),
            payload: block,
            truncatedLabel: (total) => t("json.truncated", { total })
          },
          index
        ))
      ] }),
      node.data.referenceLabels?.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dsh-tr-references", children: t("message.referenceSummary", { labels: node.data.referenceLabels.join(t("message.referenceSeparator")) }) })
    ] }),
    text !== "" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dsh-tr-user-actions", children: [
      typeof node.data.time === "number" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("time", { dateTime: new Date(node.data.time).toISOString(), children: new Date(node.data.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) }),
      /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CopyAction, { text, t })
    ] })
  ] });
});

// src/client/config.js
var CONFIG_KEY = "dsh-tavern-renderer.config";
var DEFAULT_CONFIG = Object.freeze({
  char: "Assistant",
  user: "User",
  regexRules: [],
  regexRuleSets: [],
  sessionRegexSelections: {},
  stages: {},
  templates: {}
});
function mergeConfig(current, partial) {
  return {
    ...current,
    ...partial,
    stages: { ...current.stages, ...partial.stages ?? {} },
    templates: { ...current.templates, ...partial.templates ?? {} }
  };
}
function createConfigStore(storage, validate, changed = () => {
}) {
  let config = mergeConfig(DEFAULT_CONFIG, {});
  try {
    const stored = JSON.parse(storage?.getItem(CONFIG_KEY) ?? "null");
    if (stored !== null && typeof stored === "object" && !Array.isArray(stored)) {
      const candidate = mergeConfig(DEFAULT_CONFIG, stored);
      candidate.regexRules ??= [];
      candidate.regexRuleSets ??= [];
      candidate.sessionRegexSelections ??= {};
      validate(candidate);
      config = candidate;
    }
  } catch {
  }
  let revision = 0;
  let disposed = false;
  let storageError = storage === void 0 ? "\u6D4F\u89C8\u5668\u5B58\u50A8\u4E0D\u53EF\u7528\uFF0C\u4FEE\u6539\u4EC5\u5728\u672C\u6B21\u8FD0\u884C\u751F\u6548\u3002" : void 0;
  const listeners = /* @__PURE__ */ new Set();
  const copy = () => JSON.parse(JSON.stringify(config));
  return {
    getSnapshot: () => revision,
    subscribe(listener) {
      listeners.add(listener);
      return () => listeners.delete(listener);
    },
    current: () => config,
    getConfig: copy,
    getStorageError: () => storageError,
    configure(partial = {}) {
      if (disposed) throw new Error("renderer configuration is disposed");
      const next = mergeConfig(config, partial);
      next.regexRules = JSON.parse(JSON.stringify(next.regexRules ?? []));
      next.regexRuleSets = JSON.parse(JSON.stringify(next.regexRuleSets ?? []));
      next.sessionRegexSelections = { ...next.sessionRegexSelections };
      validate(next);
      config = next;
      try {
        if (storage === void 0) throw new Error("storage unavailable");
        storage.setItem(CONFIG_KEY, JSON.stringify(config));
        storageError = void 0;
      } catch {
        storageError = "\u672A\u80FD\u4FDD\u5B58\u5230\u6D4F\u89C8\u5668\u5B58\u50A8\uFF0C\u4FEE\u6539\u4EC5\u5728\u672C\u6B21\u8FD0\u884C\u751F\u6548\u3002";
      }
      changed();
      revision += 1;
      for (const listener of listeners) listener();
      return copy();
    },
    dispose() {
      disposed = true;
      listeners.clear();
    }
  };
}

// src/client/depth.js
var MESSAGE_KINDS = /* @__PURE__ */ new Set(["user", "steering", "assistant-step"]);
function createDepthIndex() {
  let previousOrder;
  let previousNodes;
  let depths = /* @__PURE__ */ new Map();
  return (snapshot) => {
    if (snapshot?.order === previousOrder && snapshot?.nodes === previousNodes) return depths;
    previousOrder = snapshot?.order;
    previousNodes = snapshot?.nodes;
    depths = /* @__PURE__ */ new Map();
    if (!Array.isArray(previousOrder) || typeof previousNodes?.get !== "function") return depths;
    let depth = 0;
    for (let index = previousOrder.length - 1; index >= 0; index -= 1) {
      const key = previousOrder[index];
      if (MESSAGE_KINDS.has(previousNodes.get(key)?.kind)) depths.set(key, depth++);
    }
    return depths;
  };
}

// src/client/regex-chooser.jsx
var import_react2 = require("react");
var import_dsh_client_ui_primitives2 = require("@deepseek-ai/dsh-client-ui-primitives");
var import_jsx_runtime2 = require("react/jsx-runtime");
function ruleInfo(rules) {
  const diagnostics = [];
  let errors = 0;
  let unsupported = 0;
  for (const [index, raw] of rules.entries()) {
    const name = raw?.scriptName ?? raw?.name ?? `\u89C4\u5219 ${index + 1}`;
    const report = (text, kind) => {
      if (kind === "error") errors += 1;
      if (kind === "unsupported") unsupported += 1;
      diagnostics.push(`${index + 1}. ${name}\uFF1A${text}`);
    };
    if (raw?.format === "invalid") {
      report(raw.error, "error");
      continue;
    }
    try {
      const rule = parseRegexRule(raw);
      if (rule.format === "legacy" || rule.enabled === false || rule.disabled === true) continue;
      if (rule.markdownOnly !== true) report(rule.promptOnly ? "\u4EC5 prompt\uFF0C\u672C\u63D2\u4EF6\u4E0D\u6539\u53D8\u6A21\u578B\u8F93\u5165\u3002" : "\u672A\u542F\u7528 ST \u663E\u793A\u9636\u6BB5\u3002");
      if (!rule.placement?.length) report("\u6CA1\u6709\u9009\u62E9\u4F5C\u7528\u4F4D\u7F6E\u3002", "unsupported");
      else if (rule.placement.some((value) => ![1, 2, 6].includes(value))) report("\u90E8\u5206\u4F5C\u7528\u4F4D\u7F6E\u4E0D\u53D7\u652F\u6301\uFF0C\u4EC5\u5904\u7406\u7528\u6237\u3001\u6B63\u6587\u548C\u63A8\u7406\u3002", "unsupported");
      if (![0, 1, 2].includes(rule.substituteRegex ?? 0)) report("\u4E0D\u652F\u6301\u6B64\u67E5\u627E\u5B8F\u66FF\u6362\u6A21\u5F0F\u3002", "unsupported");
      for (const key of ["minDepth", "maxDepth"]) {
        const value = rule[key];
        if (value !== void 0 && value !== null && value !== "" && !Number.isFinite(typeof value === "number" || typeof value === "string" ? Number(value) : NaN)) report(`${key} \u4E0D\u662F\u6709\u6548\u6570\u5B57\u3002`, "error");
      }
    } catch (error) {
      report(error.message, "error");
    }
  }
  return { diagnostics, errors, unsupported };
}
function RegexChooser({ sessionId, configStore, regexApi }) {
  (0, import_react2.useSyncExternalStore)(configStore.subscribe, configStore.getSnapshot, configStore.getSnapshot);
  const [open, setOpen] = (0, import_react2.useState)(false);
  const [message, setMessage] = (0, import_react2.useState)("");
  const fileInput = (0, import_react2.useRef)(null);
  const mounted = (0, import_react2.useRef)(true);
  (0, import_react2.useEffect)(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);
  const config = configStore.current();
  const selection = config.sessionRegexSelections[sessionId];
  const selected = config.regexRuleSets.find((set) => set.id === selection);
  const legacy = selection === void 0 && config.regexRules.length > 0;
  const selectedRules = selected?.rules ?? (legacy ? config.regexRules : []);
  const { diagnostics, errors, unsupported } = (0, import_react2.useMemo)(() => ruleInfo(selectedRules), [selectedRules]);
  const selectedName = selected?.name ?? (legacy ? "\u65E7\u5168\u5C40\u89C4\u5219" : "\u65E0");
  const onFile = async (event) => {
    const file = event.target.files?.[0];
    event.target.value = "";
    if (!file) return;
    try {
      const source = await file.text();
      if (!mounted.current) return;
      const result = regexApi.importRegexRuleSet(source, { sessionId, name: file.name.replace(/\.json$/i, "") });
      setMessage(result.message ?? (result.rules.length === 0 ? "\u6587\u4EF6\u4E2D\u6CA1\u6709\u6B63\u5219\uFF0C\u914D\u7F6E\u672A\u6539\u53D8\u3002" : `\u5DF2\u5BFC\u5165 ${result.summary.total} \u6761\uFF0C\u5E76\u7528\u4E8E\u672C\u4F1A\u8BDD\u3002`));
    } catch (error) {
      if (mounted.current) setMessage(`\u5BFC\u5165\u5931\u8D25\uFF1A${error.message}`);
    }
  };
  return /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(import_jsx_runtime2.Fragment, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsh-tr-regex-trigger", "aria-label": "\u663E\u793A\u6B63\u5219", title: `\u663E\u793A\u6B63\u5219\uFF1A${selectedName}`, onClick: () => setOpen(true), children: "\u663E\u793A\u6B63\u5219" }),
    /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
      import_dsh_client_ui_primitives2.Modal,
      {
        open,
        onClose: () => setOpen(false),
        title: "\u663E\u793A\u6B63\u5219",
        closeLabel: "\u5173\u95ED\u663E\u793A\u6B63\u5219",
        className: "dsh-tr-regex-dialog",
        description: "\u53EA\u6539\u53D8\u5F53\u524D\u4F1A\u8BDD\u7684\u663E\u793A\uFF1B\u590D\u5236\u539F\u6587\u3001\u4F1A\u8BDD\u8BB0\u5F55\u548C\u6A21\u578B\u8F93\u5165\u4FDD\u6301\u539F\u6837\u3002",
        children: [
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("div", { className: "dsh-tr-regex-controls", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("label", { children: [
              "\u672C\u4F1A\u8BDD\u89C4\u5219\u96C6",
              /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)(
                "select",
                {
                  "aria-label": "\u672C\u4F1A\u8BDD\u89C4\u5219\u96C6",
                  "data-modal-autofocus": true,
                  value: selected?.id ?? (legacy ? "__legacy__" : ""),
                  onChange: (event) => {
                    regexApi.selectRegexRuleSet(sessionId, event.target.value === "__legacy__" ? void 0 : event.target.value || null);
                    setMessage("");
                  },
                  children: [
                    /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "", children: "\u65E0" }),
                    config.regexRules.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: "__legacy__", children: "\u65E7\u5168\u5C40\u89C4\u5219" }),
                    config.regexRuleSets.map((set) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("option", { value: set.id, children: set.name }, set.id))
                  ]
                }
              )
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("input", { ref: fileInput, type: "file", accept: "application/json,.json", "aria-label": "\u5BFC\u5165 ST JSON \u6587\u4EF6", hidden: true, onChange: onFile }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", onClick: () => fileInput.current?.click(), children: "\u5BFC\u5165\u5E76\u7528\u4E8E\u672C\u4F1A\u8BDD" })
          ] }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { className: "dsh-tr-regex-note", children: "\u652F\u6301\u5355\u6761\u6B63\u5219\u3001\u6B63\u5219\u6570\u7EC4\u3001\u6574\u4EFD ST \u9884\u8BBE\u3002\u4EC5\u5BFC\u5165\u5176\u4E2D\u7684\u6B63\u5219\u663E\u793A\u5206\u652F\uFF1B\u5176\u4ED6\u6269\u5C55\u811A\u672C\u4E0D\u4F1A\u6267\u884C\u3002" }),
          /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("strong", { children: selectedName }),
            selected && ` \xB7 ${selected.source === "preset" ? "ST \u9884\u8BBE" : selected.source === "array" ? "\u6B63\u5219\u6570\u7EC4" : "\u5355\u6761\u6B63\u5219"}`
          ] }),
          selected && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("p", { className: "dsh-tr-regex-note", children: [
            "\u5171 ",
            selected.summary.total,
            " \u6761 \xB7 \u7528\u4E8E\u663E\u793A ",
            selected.summary.display,
            " \xB7 \u7981\u7528 ",
            selected.summary.disabled,
            " \xB7 \u4EC5 prompt ",
            selected.summary.promptOnly,
            " \xB7 \u9519\u8BEF ",
            errors,
            " \xB7 \u4E0D\u652F\u6301\u9879 ",
            unsupported
          ] }),
          diagnostics.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("details", { className: "dsh-tr-regex-info", children: [
            /* @__PURE__ */ (0, import_jsx_runtime2.jsxs)("summary", { children: [
              "\u89C4\u5219\u4FE1\u606F\u4E0E\u4E0D\u652F\u6301\u9879\uFF08",
              diagnostics.length,
              "\uFF09"
            ] }),
            /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("ul", { children: diagnostics.map((text, index) => /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("li", { children: text }, index)) })
          ] }),
          message && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { role: "status", children: message }),
          configStore.getStorageError() && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("p", { role: "alert", children: configStore.getStorageError() }),
          selected && /* @__PURE__ */ (0, import_jsx_runtime2.jsx)("button", { type: "button", className: "dsh-tr-regex-delete", onClick: () => {
            regexApi.deleteRegexRuleSet(selected.id);
            setMessage("\u89C4\u5219\u96C6\u5DF2\u5220\u9664\uFF0C\u4F7F\u7528\u5B83\u7684\u4F1A\u8BDD\u5DF2\u505C\u7528\u6B63\u5219\u3002");
          }, children: "\u5220\u9664\u6B64\u89C4\u5219\u96C6" })
        ]
      }
    )
  ] });
}

// src/client/index.jsx
var inject = ["slots"];
function apply(ctx) {
  const theme = new ThemeManager(document);
  theme.install();
  const componentStyle = document.createElement("style");
  componentStyle.dataset.dshTavernOwned = "components";
  componentStyle.textContent = plugin_default;
  document.head.append(componentStyle);
  const renderers = /* @__PURE__ */ new Map();
  const sessionTools = /* @__PURE__ */ new Map();
  const macroExtensions = /* @__PURE__ */ new Map();
  const stageExtensions = /* @__PURE__ */ new Map();
  let storage;
  try {
    storage = localStorage;
  } catch {
  }
  const configStore = createConfigStore(storage, (config) => {
    createRenderer(config);
    if (!Array.isArray(config.regexRuleSets)) throw new TypeError("regexRuleSets must be an array");
    if (config.sessionRegexSelections === null || typeof config.sessionRegexSelections !== "object") {
      throw new TypeError("sessionRegexSelections must be an object");
    }
  }, () => renderers.clear());
  const rulesFor = (sessionId) => {
    const config = configStore.current();
    if (sessionId === "__preview__") return config.regexRules;
    const selection = config.sessionRegexSelections[sessionId];
    if (selection === void 0) return config.regexRules;
    if (selection === null) return [];
    return config.regexRuleSets.find((set) => set.id === selection)?.rules ?? [];
  };
  const rendererFor = (sessionId) => {
    let renderer = renderers.get(sessionId);
    if (renderer !== void 0) return renderer;
    const config = configStore.current();
    renderer = createRenderer({ ...config, regexRules: rulesFor(sessionId) });
    for (const [name, resolver] of macroExtensions) renderer.registerMacro(name, resolver);
    for (const stage of stageExtensions.values()) {
      renderer.registerStage(stage);
      if (config.stages[stage.name] === false) renderer.setStageEnabled(stage.name, false);
    }
    renderers.set(sessionId, renderer);
    return renderer;
  };
  const renderTavern = (sessionId) => (text, context = {}) => rendererFor(sessionId).render(text, context);
  const toolsFor = (sessionId) => {
    if (!sessionTools.has(sessionId)) sessionTools.set(sessionId, {
      renderTavern: renderTavern(sessionId),
      renderConfig: configStore,
      depthIndex: createDepthIndex()
    });
    return sessionTools.get(sessionId);
  };
  const disposeSlots = registerTavernRenderers(
    ctx,
    { assistant: TavernAssistantNode, user: TavernUserNode },
    toolsFor
  );
  const previousApi = window.DeepSeekTavernRenderer;
  const api = Object.freeze({
    version,
    render: (text, context = {}) => rendererFor("__preview__").render(text, context),
    configure(partial = {}) {
      return configStore.configure(partial);
    },
    getConfig: () => configStore.getConfig(),
    getRegexRuleSets: () => JSON.parse(JSON.stringify(configStore.current().regexRuleSets)),
    getRegexSelection: (sessionId) => configStore.current().sessionRegexSelections[requiredSession(sessionId)],
    selectRegexRuleSet(sessionId, selection) {
      requiredSession(sessionId);
      const config = configStore.current();
      if (selection !== void 0 && selection !== null && !config.regexRuleSets.some((set) => set.id === selection)) {
        throw new Error("unknown regex rule set");
      }
      const selections = { ...config.sessionRegexSelections };
      if (selection === void 0) delete selections[sessionId];
      else selections[sessionId] = selection;
      configStore.configure({ sessionRegexSelections: selections });
      return selection;
    },
    importRegexRuleSet(input, { sessionId, name = "\u5BFC\u5165\u7684\u6B63\u5219" } = {}) {
      requiredSession(sessionId);
      const imported = parseRegexImport(input);
      if (imported.rules.length === 0) return imported;
      const config = configStore.current();
      const ruleSet = {
        id: `regex-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`,
        name: String(name),
        source: imported.source,
        rules: imported.rules,
        summary: imported.summary
      };
      configStore.configure({
        regexRuleSets: [...config.regexRuleSets, ruleSet],
        sessionRegexSelections: { ...config.sessionRegexSelections, [sessionId]: ruleSet.id }
      });
      return { ...imported, id: ruleSet.id, storageError: configStore.getStorageError() };
    },
    deleteRegexRuleSet(id) {
      const config = configStore.current();
      configStore.configure({
        regexRuleSets: config.regexRuleSets.filter((set) => set.id !== id),
        sessionRegexSelections: Object.fromEntries(Object.entries(config.sessionRegexSelections).map(([sessionId, selection]) => [sessionId, selection === id ? null : selection]))
      });
    },
    setTheme: (name) => theme.setTheme(name),
    setCustomCss: (css) => theme.setCustomCss(css),
    getTheme: () => theme.theme,
    registerMacro(name, resolver) {
      if (macroExtensions.has(name)) throw new Error(`macro already registered: ${name}`);
      macroExtensions.set(name, resolver);
      for (const renderer of renderers.values()) renderer.registerMacro(name, resolver);
      return () => {
        macroExtensions.delete(name);
        for (const renderer of renderers.values()) renderer.unregisterMacro(name);
      };
    },
    unregisterMacro(name) {
      macroExtensions.delete(name);
      for (const renderer of renderers.values()) renderer.unregisterMacro(name);
    },
    registerStage(stage) {
      if (stageExtensions.has(stage.name)) throw new Error(`stage already registered: ${stage.name}`);
      createRenderer(configStore.current()).registerStage(stage);
      stageExtensions.set(stage.name, stage);
      for (const renderer of renderers.values()) renderer.registerStage(stage);
      return () => {
        stageExtensions.delete(stage.name);
        renderers.clear();
      };
    },
    setStageEnabled(name, enabled) {
      configStore.configure({ stages: { [name]: Boolean(enabled) } });
    }
  });
  window.DeepSeekTavernRenderer = api;
  document.documentElement.dataset.dshTavernRendererVersion = api.version;
  const disposeChooser = ctx.slots.inject("conversation.session.header.utilities", () => ctx.slots.register({
    name: "conversation.session.header.utilities",
    id: "tavern-regex",
    order: 20,
    inject: () => ({ configStore, regexApi: api })
  }, RegexChooser));
  ctx.effect(() => () => {
    disposeSlots();
    disposeChooser();
    renderers.clear();
    sessionTools.clear();
    configStore.dispose();
    componentStyle.remove();
    theme.dispose();
    if (previousApi === void 0) delete window.DeepSeekTavernRenderer;
    else window.DeepSeekTavernRenderer = previousApi;
    delete document.documentElement.dataset.dshTavernRendererVersion;
  }, "dsh-tavern-renderer: client lifecycle");
}
function requiredSession(sessionId) {
  if (typeof sessionId !== "string" || sessionId === "") throw new TypeError("sessionId is required");
  return sessionId;
}
return module.exports; } });
