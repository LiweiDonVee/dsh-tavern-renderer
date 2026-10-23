# Contributing

Use Node.js 24 and npm. Run `npm ci` and `npm run check` before proposing changes.
Keep tests deterministic; do not put credentials, session exports, local databases or personal configuration in fixtures.
Report the exact DSH version and operating system when reporting a bug.
Compatibility targets DSH 0.2.1-rc.2 and 0.2.1-rc.3, Web and Desktop.
Install a fixture with `npm install --prefix .host --ignore-scripts @deepseek-ai/dsh@0.2.1-rc.2`.
Run `npm run check`; it reads `.host/node_modules` by default. Set
`DSH_HOST_NODE_MODULES` to check a different candidate or installed host.
The Desktop protocol test uses the shipped UI kernel in JSDOM, with a simulated
`dsh-app://app/` origin and storage. It does not launch Electron or log in.
Changes to runtime behavior need regression coverage and updated documentation.
