# SafeID Wallet – Overview

```mermaid
flowchart TD
    U[User] -->|Connect Wallet| A[SafeID Wallet dApp]
    U -->|/score command| B[Telegram Bot]
    A -->|Fetch Reputation| P[BNB Passport API]
    B -->|Fetch Reputation| P
    P -->|Return Score| A
    P -->|Return Score| B
    A -->|Gate Access (UI)| U
    B -->|Gate Access (Community)| U
