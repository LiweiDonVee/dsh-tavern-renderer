# Changelog

## Unreleased

## 0.4.0 — 2026-11-04

- Import a single ST regex, an array, or `extensions.regex_scripts` from a complete ST preset as an ordered display rule set.
- Add a small session-header chooser: import and select for this Session, choose none, or delete a saved set; persist each Session's choice and rerender existing messages immediately.
- Distinguish ST display semantics from the legacy API: display eligibility, user/assistant/reasoning placement, disabled/edit/depth filters, capture/trim macros, and raw/escaped find substitution.
- Preserve raw copying, original messages, durable Session history, model input, and independent core consumers. Other preset extensions remain inert.
- Isolate invalid rules with diagnostics, retain the sanitizer boundary, and align reasoning preparation and summaries with the displayed result.

## 0.3.0 — 2026-10-23

- Support DSH 0.2.1-rc.2 and 0.2.1-rc.3 on Web and Desktop; declare `engines.dsh` and compatible optional peers.
- Replace the removed image callback with the official image-content Factory and authorized `loadImage`, without redeclaring host-owned child slots.
- Honor assistant reasoning/response groups and collapsed turn reasoning; preserve user files, image ordering, and session reference labels.
- Follow host text/code fonts and content sizes, including Desktop font-size shortcuts.
- Test real shipped host loading, Web/Desktop protocol mounting, and disable/re-enable restoration on both supported DSH versions; expand CI to Windows/Linux × both versions.
- Document Desktop profile installation using the Desktop-bundled CLI, and synchronize build/API version markers.
- Fail closed when sanitization or final template sanitization fails.
- Preserve independent renderer state across concurrent Sessions.

## 0.2.1 — 2026-09-07

- First standalone public source release, prepared from the reviewed local plugin.
- Documents DSH 0.1.7-rc.2 compatibility and clean installation.
- Includes regression tests, build scripts and GitHub Actions.
- Excludes private workspace files, runtime state and unpublished local history.
