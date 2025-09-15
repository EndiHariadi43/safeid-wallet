# SafeID Wallet – Overview

SafeID Wallet is a lightweight crypto wallet focused on **BNB Smart Chain**.  
It is designed for **security-first use cases**, with developer-friendly architecture based on **Capacitor**.

---

## Features (MVP)
- 🔑 Generate throwaway wallet (mnemonic) — **demo only**
- 📱 Show address + QR
- 💰 Check BNB balance via JSON-RPC
- 📦 Build as Android APK (via Capacitor)

---

## Roadmap
See [ROADMAP.md](./ROADMAP.md).

---

## Build Toolchain

- **AGP**: 8.7.2  
- **Gradle**: 8.13  
- **JDK**: 17  
- **compileSdk / targetSdk**: 36  
- **minSdk**: 23  
- **Kotlin jvmTarget**: 17  
- **Package manager**: PNPM v9

---

## Toolchain
- **Web**: Vite + TypeScript + PNPM  
- **Mobile**: Capacitor + Android Studio (Gradle)  
- **Bot**: Telegram Bot (Aiogram, Python)  
- **Optional backend**: Python/Node relay server

---

## Build & Run

### Run locally
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

### Build Android APK
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

## SafeID Wallet – Architecture

**Architecture Summary**
- **Web App**: Vue/React frontend with PNPM  
- **Capacitor Bridge**: Sync between web and Android  
- **Android Client**: Built via Gradle + Capacitor

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

This diagram shows the identity & reputation flow between **User → SafeID Wallet (dApp & Bot) → BNB Passport → Gated Features/Communities**.

```mermaid
flowchart TD
  U[User]:::user
  A[SafeID Wallet dApp]:::app
  B[Telegram Bot]:::bot
  P[(BNB Passport API)]:::passport
  G{Score >= Threshold?}:::decision
  C[[Access/Gating Smart Contract]]:::feature
  F[Features / Communities - Airdrop, Allowlist, Voting, Private Chat]:::feature

  %% Flows: dApp path
  U -->|Connect Wallet & Link Social| A
  A -->|Fetch Reputation| P
  P -->|Return Score| A
  A --> G

  %% Flows: Bot path
  U -->|/score 0x...| B
  B -->|Fetch Reputation| P
  P -->|Return Score| B
  B --> G

  %% Gating
  G -- Yes --> C
  C --> F
  G -- No: Improve score --> U

  %% Styles
  classDef user fill:#f6f9ff,stroke:#5b8def,stroke-width:1.5;
  classDef app fill:#eefcf6,stroke:#19b37a,stroke-width:1.5;
  classDef bot fill:#fff7e6,stroke:#f0a202,stroke-width:1.5;
  classDef passport fill:#f2e9ff,stroke:#7c4dff,stroke-width:1.5;
  classDef decision fill:#fff,stroke:#333,stroke-width:1.5,stroke-dasharray:4 2;
  classDef feature fill:#e8f4ff,stroke:#2d7ff9,stroke-width:1.5;
```

---

## SafeID Wallet – Sequence

```mermaid
sequenceDiagram
  participant U as User
  participant A as SafeID dApp
  participant P as BNB Passport API
  participant C as Gating Contract
  participant F as Feature/Community

  U->>A: Connect wallet + link social
  A->>P: getReputation - address
  P-->>A: score
  A->>U: show score
  A->>C: requestAccess - score, address
  C-->>A: allow / deny
  A-->>F: grant / block
  F-->>U: access result
```

---

## SafeID Wallet – Components / System Context

```mermaid
flowchart LR
  %% --- Clients ---
  subgraph C1[Clients]
    U[User - Wallet + Browser]
    TGU[Telegram User]
  end

  %% --- SafeID Wallet (your system) ---
  subgraph S1[SafeID Wallet]
    A[Web dApp - Vite/TS]
    W[Passport Wrapper - getReputation]
    B[Telegram Bot - Aiogram]
    BE[(Backend/Webhook - optional)]
  end

  %% --- External Services ---
  subgraph E1[External Services]
    P[(BNB Passport API)]
    O[(OAuth: Twitter / Telegram)]
  end

  %% --- On-chain / Destinations ---
  subgraph O1[On-chain / Destinations]
    C[[Gating Smart Contract]]
    F[Features & Communities - Airdrop, Allowlist, Voting, Private Chat]
  end

  %% Links (social + identity)
  U -->|Connect wallet| A
  A -->|Link social| O
  B -->|Link chat| O

  %% Reputation fetch
  A -->|getReputation - address| P
  B -->|getReputation - address| P
  P -->|score| A
  P -->|score| B
  A --> U

  %% Access decisions
  A -->|requestAccess - score, address| C
  B -->|requestAccess - score, address| C
  C -->|grant/block| F

  %% Notifications / roles - off-chain
  B -->|notify / assign role| TGU

  %% Optional backend fan-out
  A --> BE
  B --> BE
  BE --> C
  BE --> F
```

---

### Component ↔ Directory Map
| Komponen | Peran | Direktori |
|---|---|---|
| Web dApp (Vite/TS) | UI connect wallet, tampilkan skor, kirim request akses | `app/` |
| Passport Wrapper | Abstraksi pemanggilan BNB Passport API | `passport/` |
| Telegram Bot (Aiogram) | Perintah `/score`, verifikasi, role/notify | `bot/` |
| Backend/Webhook (opsional) | Relay, audit log, rate-limit | *(nanti: `server/` jika dibutuhkan)* |
| Gating Smart Contract | Keputusan akses on‑chain | *(nanti: `contracts/`)* |

---

## Core Principles
- 🔒 **Security-First** — Never compromise user safety.
- ⚡ **Lightweight** — Minimal dependencies, runs on web and Android.
- 🛠 **Extensible** — Easy to integrate with plugins and external APIs.
- 🌐 **Open Source** — Built transparently for the community.

---

## Current Status
✅ MVP available  
⚠️ Demo only — **Do not use with real funds**

---

## Links
- [README](../README.md)  
- [ROADMAP](../ROADMAP.md)  
- [SECURITY](../SECURITY.md)  
- [SPONSORS](../SPONSORS.md)  
