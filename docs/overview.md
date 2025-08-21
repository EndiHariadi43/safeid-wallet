# SafeID Wallet – Overview

Dokumen ini menjelaskan alur kerja utama SafeID Wallet dalam mengintegrasikan reputasi dari **BNB Passport** ke dalam dApp dan bot komunitas.

---

## 🖥️ Mermaid Diagram (GitHub Desktop/Browser)

'''mermaid
flowchart TD
    U[User] -->|Connect Wallet| A[SafeID Wallet dApp]
    U -->|/score command| B[Telegram Bot]
    A -->|Fetch Reputation| P[BNB Passport API]
    B -->|Fetch Reputation| P
    P -->|Return Score| A
    P -->|Return Score| B
    A -->|Gate Access (UI)| U
    B -->|Gate Access (Community)| U

User
   |-- Connect Wallet --> SafeID Wallet dApp -- Fetch Reputation --> BNB Passport API
   |                                                            |
   |                                                            v
   |<------------------- Return Score -------------------------|
   |
   |-- /score command --> Telegram Bot -- Fetch Reputation --> BNB Passport API
                                                             |
                                                             v
                                      <---- Return Score ----|
