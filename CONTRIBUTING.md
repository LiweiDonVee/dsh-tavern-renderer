# Contributing

Use Node.js 24 and npm. Run `npm ci` and `npm run check` before proposing changes.
Keep tests deterministic; do not put credentials, session exports, local databases or personal configuration in fixtures.
Report the exact DSH version and operating system when reporting a bug.
Compatibility currently targets DSH 0.1.2-rc.1, not its 0.1.3 alpha successor.
Changes to runtime behavior need regression coverage and updated documentation.
