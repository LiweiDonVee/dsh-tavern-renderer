# Quality review record

Date: 2026-08-15

This record covers the requested three explicit `review -> improve` passes after the first complete implementation baseline. It records concrete findings rather than treating a passing feature test as sufficient evidence.

## Baseline product pass

- Added the declarative `documents` pipeline stage and eight built-in formats: letter, exam, postcard, cipher, telegram, newspaper, dossier, and diary.
- Added per-format semantic HTML, scoped CSS, mobile/print/reduced-motion/forced-color adaptations, a live streaming draft state, documentation, provenance, and a full demo message.
- Baseline verification: `npm run check` completed with 12 test files and 33 passing tests, then rebuilt `lib/client.js`.

## Review 1: functional completeness and usability

Findings:

1. Generated streaming markup used `role="status"`, but the sanitizer removed it, so assistive technology could not announce the live draft state.
2. `demo/documents-message.txt` was linked from the README but missing from the npm `files` list.

Improvements:

- Added a failing streaming accessibility assertion, then allowed only `span[role="status"]`; arbitrary roles remain stripped.
- Added the demo file to the package manifest.
- Re-ran document and sanitizer tests: 19 tests passed.

## Review 2: security, DOM validity, and isolation

Findings:

1. Restoring a block document by replacing only its sentinel produced `<p><article>...</article></p>`. Browser HTML repair inserted empty paragraphs around every document.
2. The sentinel name was predictable. Message text containing that private marker could duplicate a generated document during restoration.

Improvements:

- Added a failing no-empty-paragraph assertion, then replaced the whole sentinel paragraph before the generic fallback replacement.
- Added a failing forged-slot regression test, then selected a per-render token absent from the original message.
- Re-ran the document, sanitizer, and style suites: 22 tests passed.
- Ran `npm audit --omit=dev`: 0 vulnerabilities.
- Scanned for dynamic execution and dangerous sinks. No `eval` or `Function` use exists; the sole `dangerouslySetInnerHTML` sink receives the completed sanitized pipeline result.

## Review 3: API, documentation, and package consistency

Findings:

1. README's built-in stage list omitted `documents` even though the pipeline diagram included it.
2. `QUALITY-REVIEW.md` was listed for publication before the file existed, and npm silently omitted it.
3. The generated client bundle predated the second review's sanitizer and slot-restoration fixes.

Improvements:

- Corrected the stage list and added this review record.
- Rebuilt the client bundle after all core/client changes.
- Re-ran package dry-run and confirmed the README, specification, design, provenance, quality record, demo, core modules, and rebuilt browser bundle are included.
- Browser layout inspection found an 11px internal overflow on the dossier's protruding tab. The tab was moved inside the paper edge, the layered folder treatment was retained, and desktop/mobile overflow was rechecked.

## Final acceptance evidence

- Automated tests cover all original requirement groups, all eight document formats, document XSS/slot attacks, live drafts, CSS adaptation contracts, and Harness slot integration.
- Browser acceptance covers desktop and 390 x 844 mobile viewports, nonblank template rendering, script absence, trace order, overflow, and console errors.
- DeepSeek Harness and SillyTavern source snapshots remain read-only references; the plugin integrates through Harness's native keyed slot without a core patch.
