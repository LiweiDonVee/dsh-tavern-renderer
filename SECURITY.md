# Security and privacy

This is an independent community plugin, not an official DeepSeek product.
Tested compatibility is DSH 0.1.2-rc.1. A plugin executes with its host's permissions;
this package is not a sandbox. Only install code you trust.

Do not include real keys, private prompts, session logs or database exports in public issues.
Report sensitive vulnerabilities through GitHub private vulnerability reporting when available.
If it is unavailable, open an issue containing only a request for a private contact.

Message HTML and CSS pass through the sanitizer. Arbitrary JavaScript is not supported. User-authored regular expressions can still consume excessive CPU; do not accept untrusted regex rules. Sanitization tests are evidence for covered cases, not a formal security audit.
