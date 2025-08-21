# SafeID Wallet

[![CI](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/ci.yml/badge.svg)](https://github.com/EndiHariadi43/safeid-wallet/actions/workflows/ci.yml)

Web3 wallet + reputation layer that integrates with **BNB Passport** for
lightweight identity verification, anti-bot protection, and trusted user interactions.

---

## Status
Proof-of-Concept (PoC). Milestone 1: login + fetch reputation score + feature gating.

---

## Why BNB Passport
- Aggregated identity & reputation
- Bot resistance for airdrop, voting, and gated communities
- Simple developer integration (score-based gating)

---

## Features (Phase 1)
- Wallet connect (EVM) + link social (Twitter/Telegram)
- Fetch BNB Passport reputation score (stub for now)
- Gate UI actions by score threshold

---

## Roadmap
- [ ] Implement `passport/getReputation()` against BNB Passport API
- [ ] Minimal dApp UI: connect wallet, show score, gated button
- [ ] Telegram bot: verify address ↔ Telegram user
- [ ] Demo & docs

---

## Project Structure
safeid-wallet/ 
├─ app/              # Frontend dApp (Vite + TS) 
├─ bot/              # Telegram bot (Python + Aiogram) 
├─ passport/         # SDK wrapper (stub getReputation) 
├─ .github/workflows # CI pipeline 
├─ .env.example      # Example environment variables 
├─ LICENSE 
└─ README.md

---

## Links
- Project Twitter: [@SafeIDWallet](https://x.com/) *(placeholder)*
- Contact: endi.linux.mint@gmail.com
- Powered by [BNB Passport](https://bnbchain.org/en/passport)

---

## Dev Quickstart
```bash
# Frontend (placeholder)
cd app && npm i && npm run dev

# Bot (placeholder)
cd bot && pip install -r requirements.txt && python main.py

---

## License

This project is licensed under the MIT License – see the [LICENSE](./LICENSE) file for details.
