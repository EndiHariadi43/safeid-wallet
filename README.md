# SafeID Wallet

[![CI](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/ci.yml)
[![Deploy Pages](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/deploy.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/deploy.yml)
[![CodeQL](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/codeql.yml/badge.svg?branch=main)](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/codeql.yml)
[![Website](https://img.shields.io/website?up_message=online&url=https%3A%2F%2Fendihariadi43.github.io%2Fsafeid-wallet%2F)](https://endihariadi43.github.io/safeid-wallet/)
[![GitHub Sponsors](https://img.shields.io/github/sponsors/EndiHariadi43?label=Sponsors&logo=github-sponsors)](https://github.com/sponsors/EndiHariadi43)

A lightweight, security-first crypto wallet focused on BNB Smart Chain.  
This repository currently contains plans and a minimal **Web MVP** you can run locally or build into an **Android APK**.

---

## Features (MVP)
- Generate throwaway wallet (mnemonic) — **demo only**
- Show address + QR
- Check BNB balance via JSON-RPC
- Build as Android APK (via Capacitor)

---

## Roadmap
See [ROADMAP.md](./ROADMAP.md).

---

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

---

## Build Android APK

```bash
pnpm -C webwallet build
pnpm -C webwallet cap sync android
cd webwallet/android
./gradlew assembleDebug   # debug APK
./gradlew assembleRelease # release APK (requires keystore)
```

Artifacts (APK) are also produced automatically by GitHub Actions:  
check the **Actions → Android Build** workflow.

---

## Security
- Do **NOT** use the demo for real funds.
- Read [SECURITY.md](./SECURITY.md).
