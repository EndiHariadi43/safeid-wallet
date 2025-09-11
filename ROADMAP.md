# SafeID Wallet — Roadmap (Q4 2025)

## 0. Foundation
- Pick stack: **Web (React + TypeScript)** for MVP; Android wrapper later.
- Package manager: **pnpm**.
- Formatting: **Prettier**; Linting: **ESLint**.
- Git flow: `main` (stable) and `dev` (active). Use PRs with checks.

## 1. Security & Keys
- 🔐 Client‑side key vault using WebCrypto (AES‑GCM, PBKDF2/Argon2).
- 🔑 BIP‑39 mnemonic + BIP‑44 derivation (m/44'/60'/0'/0/0).
- 📦 Export/Import as **Ethereum UTC JSON keystore**.
- 🛡️ Anti‑phishing phrase, read‑only (watch‑only) mode, app lock (idle timeout).

## 2. Chains & RPC
- Default: **BNB Smart Chain** (mainnet + testnet).
- Pluggable RPC with health checks & fallback list.
- Fee estimator and gas override.

## 3. Core Features (MVP)
- Create/restore wallet; show address & QR.
- Native coin send (BNB) with nonce/gas management.
- Custom tokens: add by address, show balances via `balanceOf`.
- Activity: outgoing tx history via public explorer API fallback.

## 4. UX
- Clean minimal UI (dark/light), i18n: `en`, `id`.
- Seed phrase flow with **12 words + confirmation**.
- Clipboard guard and on‑screen key preview toggle.

## 5. Integrations
- 📷 QR scanner (optional, via MediaDevices).
- 🪪 BNB Account/Passport (future): sign‑in with wallet & proofs.

## 6. Testing & CI
- Unit tests (vitest) for key mgmt & signing.
- E2E smoke (Playwright) for send flow (testnet).
- CI: lint → typecheck → test → build; CodeQL weekly.

## 7. Releases
- Preview deploy to GitHub Pages on `dev` (PR) and `main`.
- Versioning via changesets.

---
**Non‑goals (initial):** swaps, NFTs, cross‑chain bridges.
