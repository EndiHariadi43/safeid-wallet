# SafeID Wallet

[![CI](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/ci.yml)
[![Deploy Pages](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/codeql.yml)
[![Website](https://img.shields.io/website?up_message=online&url=https%3A%2F%2Fendihariadi43.github.io%2Fsafeid-wallet%2F)](https://endihariadi43.github.io/safeid-wallet/)
[![Sponsor](https://img.shields.io/badge/Sponsor-❤-ea4aaa?logo=github-sponsors&logoColor=white)](https://github.com/sponsors/EndiHariadi43)

A lightweight, security‑first crypto wallet focused on BNB Smart Chain. This repository currently contains plans and a minimal **Web MVP** you can run locally.

## Features (MVP)
- Generate throwaway wallet (mnemonic) — **demo only**
- Show address + QR
- Check BNB balance via JSON‑RPC

## Roadmap
See [ROADMAP.md](./ROADMAP.md).

## Getting Started
```bash
pnpm i
pnpm dev       # runs web wallet in dev mode
```

Or run inside the `webwallet` folder:
```bash
cd webwallet
pnpm i
pnpm dev
```

## Security
- Do NOT use the demo for real funds.
- Read [SECURITY.md](./SECURITY.md).
