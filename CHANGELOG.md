# Changelog

## Unreleased

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
