# SafeID Wallet – Overview

**SafeID Wallet** is a lightweight, security-first crypto wallet focused on **BNB Smart Chain (BSC)**.  
It is designed to run both on **Web** (via Vite + PNPM) and **Android** (via Capacitor).

---

## ✨ Features (MVP)

- 🔑 Generate throwaway wallet (mnemonic) — **demo only**
- 📱 Show address + QR code
- 💰 Check BNB balance via JSON-RPC
- 📦 Build as Android APK (via Capacitor + Gradle)
- 🌐 Deploy as static web app (GitHub Pages)

---

## 🚧 Roadmap (Planned)

- Reputation integration via **BNB Passport API**
- Telegram Bot integration (`/score` command, role management)
- Gating Smart Contracts for:
  - ✅ Airdrops
  - ✅ Allowlists
  - ✅ Voting
  - ✅ Private groups/communities
- Optional backend for logging, relay, and rate-limiting
- Security & privacy audits

See [ROADMAP.md](../ROADMAP.md) for details.

---

## 🏗️ Architecture Summary

SafeID Wallet is structured around **Capacitor** bridging:

- **Web dApp (`webwallet/`)**:  
  Vite/TypeScript frontend for wallet generation, reputation score, and feature gating.

- **Android (`webwallet/android/`)**:  
  Capacitor wrapper that embeds the web app and builds into APK/AAB via Gradle.

- **Planned Components**:  
  - `passport/`: thin wrapper for BNB Passport API  
  - `bot/`: Telegram bot (Aiogram)  
  - `server/`: optional backend/webhook  
  - `contracts/`: on-chain gating logic  

See [Architecture](./architecture.md) for diagrams and deep dive.

---

## 🔧 Build Toolchain

- **AGP**: 8.7.2  
- **Gradle**: 8.13  
- **JDK**: 17  
- **compileSdk / targetSdk**: 36  
- **minSdk**: 23  
- **Kotlin jvmTarget**: 17  
- **Package manager**: PNPM v9  

---

## 📦 Local Development

```bash
# install dependencies
pnpm i

# run dev server
pnpm dev
```

Or inside the `webwallet/` folder:

```bash
cd webwallet
pnpm i
pnpm dev
```

---

## 📱 Build Android APK

```bash
pnpm -C webwallet build
pnpm -C webwallet cap sync android
cd webwallet/android

./gradlew assembleDebug   # debug APK
./gradlew assembleRelease # release APK (requires keystore)
```

GitHub Actions also produces APK/AAB automatically:  
see [Android Build workflow](../.github/workflows/android.yml).

---

## 🔒 Security Notes

- This is a **demo** — **do not use with real funds**.
- No cleartext traffic: Android enforces HTTPS-only via `network_security_config.xml`.
- Minimal ProGuard rules applied for Capacitor and AndroidX.
- Follow [SECURITY.md](../SECURITY.md) for responsible disclosure.

---

## 📚 Docs & Links

- [README](../README.md)  
- [Architecture](./architecture.md)  
- [ROADMAP](../ROADMAP.md)  
- [SECURITY](../SECURITY.md)  
- [SPONSORS](../SPONSORS.md)  

---

© 2025 SafeID Wallet — Open Source, Apache-2.0 License
