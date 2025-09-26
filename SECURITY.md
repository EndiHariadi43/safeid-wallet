# Security Policy

## Supported Versions
The `main` branch is supported with security fixes.

## Reporting a Vulnerability
Please email security reports to **59972539+EndiHariadi43@users.noreply.github.com**.
Provide:
- Affected commit / version
- Reproduction steps
- Impact assessment (read/write/remote)
- Suggested fixes if any

We follow coordinated disclosure. We aim to respond within 72 hours.

## Guidelines
- Never commit secrets. Use `.env.local` ignored by git.
- Use audited libs where possible.
- All cryptography must use WebCrypto or well‑reviewed libs (no custom crypto).
