# Sources and provenance

This file records source material consulted for the renderer and the immersive-document extension. URLs and licenses were checked on 2026-08-15.

| Source | URL | License | Use in this plugin |
|---|---|---|---|
| SillyTavern source snapshot | https://github.com/SillyTavern/SillyTavern/tree/8172dcd0ee672d3cd9a5e5f7af134f91a45cd2b8 | GNU AGPL-3.0 | Behavioral research for regex, macro, Markdown, sanitization, CSS scoping, and theme semantics documented in `SPEC.md`. No SillyTavern source code or assets are copied into this package. |
| SillyTavern 1.19.0 regex display update (checked 2026-11-04) | https://github.com/SillyTavern/SillyTavern/tree/06bde939fb1e9c4c8d8641d810f0a916b5bce127 | GNU AGPL-3.0 | Observable display eligibility, placement/depth, capture/trim and substitution behavior from `public/scripts/extensions/regex/engine.js`, `public/script.js`, `utils.js` and `preset-manager.js`. Independently implemented; no upstream source or private preset content is redistributed. |
| DSH rc.5 public Client contracts (checked 2026-11-04) | https://github.com/deepseek-ai/deepseek-harness/tree/b830ec950faba0a46dda564be3e2d854afed94f1 | MIT | Public Session header utilities slot, Chat tail hooks, Session open-state contract and reasoning display preparation. No Host source is modified. |
| DeepSeek Harness source snapshot | https://github.com/deepseek-ai/DeepSeek-Harness/tree/47f943859bef60e4160492346772ded9b24f765a | MIT | Native Cordis slot contract, message-node shape, and partial-frame behavior used for integration. No Harness source file is modified or redistributed by this package. |
| DeepSeek Harness 0.2.1 adapter update (checked 2026-10-23) | https://github.com/deepseek-ai/deepseek-harness/tree/687f282e8625c6b8d11ff58211a90524be2e4317 | MIT | Public image Factory, grouped message props, host typography variables, and Desktop profile CLI documentation. Verified with the shipped npm `@deepseek-ai/dsh` 0.2.1-rc.2 and 0.2.1-rc.3 packages. |
| Paper CSS | https://github.com/cognitom/paper-css | MIT | Consulted as a reference for treating paper as a bounded printable surface. No CSS declarations, assets, or page-size classes were copied. |
| Tufte CSS | https://github.com/edwardtufte/tufte-css | MIT | Consulted for general serif hierarchy and long-form reading conventions. No CSS declarations, fonts, or assets were copied. |

## Asset statement

The eight document appearances are original CSS and semantic HTML authored for this plugin. The package downloads no image, font, icon, texture, or stylesheet at runtime. Paper grain, fold marks, address lines, postmarks, stamps, redactions, perforations, archive marks, and ruled lines are generated with local CSS primitives. Harness-owned icons remain imported through its existing client UI package.

The plugin's own package license remains MIT. Consulting an AGPL project for documented observable behavior does not copy its implementation; the clean-room boundary and exact source locations are recorded in `SPEC.md`.
