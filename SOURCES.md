# Sources and provenance

This file records source material consulted for the renderer and the immersive-document extension. URLs and licenses were checked on 2026-08-15.

| Source | URL | License | Use in this plugin |
|---|---|---|---|
| SillyTavern source snapshot | https://github.com/SillyTavern/SillyTavern/tree/8172dcd0ee672d3cd9a5e5f7af134f91a45cd2b8 | GNU AGPL-3.0 | Behavioral research for regex, macro, Markdown, sanitization, CSS scoping, and theme semantics documented in `SPEC.md`. No SillyTavern source code or assets are copied into this package. |
| DeepSeek Harness source snapshot | https://github.com/deepseek-ai/DeepSeek-Harness/tree/47f943859bef60e4160492346772ded9b24f765a | MIT | Native Cordis slot contract, message-node shape, and partial-frame behavior used for integration. No Harness source file is modified or redistributed by this package. |
| Paper CSS | https://github.com/cognitom/paper-css | MIT | Consulted as a reference for treating paper as a bounded printable surface. No CSS declarations, assets, or page-size classes were copied. |
| Tufte CSS | https://github.com/edwardtufte/tufte-css | MIT | Consulted for general serif hierarchy and long-form reading conventions. No CSS declarations, fonts, or assets were copied. |

## Asset statement

The eight document appearances are original CSS and semantic HTML authored for this plugin. The package downloads no image, font, icon, texture, or stylesheet at runtime. Paper grain, fold marks, address lines, postmarks, stamps, redactions, perforations, archive marks, and ruled lines are generated with local CSS primitives. Harness-owned icons remain imported through its existing client UI package.

The plugin's own package license remains MIT. Consulting an AGPL project for documented observable behavior does not copy its implementation; the clean-room boundary and exact source locations are recorded in `SPEC.md`.
