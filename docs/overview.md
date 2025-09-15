# SafeID Wallet – Overview

<p align="center">
  <img src="./assets/safeid-logo-circle.png" alt="SafeID Wallet Logo" width="160" style="border-radius:50%"/>
</p>

**SafeID Wallet** is a lightweight crypto wallet focused on **BNB Smart Chain**.  
It is designed for **security-first use cases**, with developer-friendly architecture based on **Capacitor**.

---

## Architecture (Flow)

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

## Sequence

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

## System Context

```mermaid
flowchart LR
  subgraph C1[Clients]
    U[User - Wallet + Browser]
    TGU[Telegram User]
  end

  subgraph S1[SafeID Wallet]
    A[Web dApp - Vite/TS]
    W[Passport Wrapper - getReputation]
    B[Telegram Bot - Aiogram]
    BE[(Backend/Webhook - optional)]
  end

  subgraph E1[External Services]
    P[(BNB Passport API)]
    O[(OAuth: Twitter / Telegram)]
  end

  subgraph O1[On-chain / Destinations]
    C[[Gating Smart Contract]]
    F[Features & Communities - Airdrop, Allowlist, Voting, Private Chat]
  end

  U -->|Connect wallet| A
  A -->|Link social| O
  B -->|Link chat| O

  A -->|getReputation - address| P
  B -->|getReputation - address| P
  P -->|score| A
  P -->|score| B
  A --> U

  A -->|requestAccess - score, address| C
  B -->|requestAccess - score, address| C
  C -->|grant/block| F

  B -->|notify / assign role| TGU

  A --> BE
  B --> BE
  BE --> C
  BE --> F
```

---

## Components ↔ Directory Map

| Component               | Role                                      | Directory             |
|--------------------------|-------------------------------------------|-----------------------|
| Web dApp (Vite/TS)      | UI connect wallet, show score, request access | `app/`              |
| Passport Wrapper         | Abstraction for BNB Passport API calls    | `passport/`           |
| Telegram Bot (Aiogram)   | `/score`, verification, role/notify       | `bot/`                |
| Backend/Webhook (opt.)   | Relay, audit log, rate-limit              | *(future: `server/`)* |
| Gating Smart Contract    | On-chain access decisions                 | *(future: `contracts/`)* |

---

## Core Principles

- 🔒 **Security-First** — Never compromise user safety  
- ⚡ **Lightweight** — Minimal dependencies, runs on web and Android  
- 🛠 **Extensible** — Easy to integrate with plugins and external APIs  
- 🌐 **Open Source** — Built transparently for the community  

---

## Status

✅ MVP available  
⚠️ Demo only — **Do not use with real funds**

---

## Links

- [README](../README.md)  
- [ROADMAP](../ROADMAP.md)  
- [SECURITY](../SECURITY.md)  
- [SPONSORS](../SPONSORS.md)  
