# SafeID Wallet – Architecture

Diagram ini menunjukkan alur identitas & reputasi antara **User → SafeID Wallet (dApp & Bot) → BNB Passport → Gated Features/Communities**.

```mermaid
flowchart TD
  %% Nodes
  U[User]:::user
  A[SafeID Wallet dApp]:::app
  B[Telegram Bot]:::bot
  P[(BNB Passport API)]:::passport
  G{Score >= Threshold?}:::decision
  F[|Features / Communities (Airdrop, Allowlist, Voting, Private Chat)|]:::feature

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
  G -- Yes --> F
  G -- No  --> U

  %% Styles
  classDef user fill:#f6f9ff,stroke:#5b8def,stroke-width:1.5;
  classDef app fill:#eefcf6,stroke:#19b37a,stroke-width:1.5;
  classDef bot fill:#fff7e6,stroke:#f0a202,stroke-width:1.5;
  classDef passport fill:#f2e9ff,stroke:#7c4dff,stroke-width:1.5;
  classDef decision fill:#fff,stroke:#333,stroke-width:1.5,stroke-dasharray:4 2;
  classDef feature fill:#e8f4ff,stroke:#2d7ff9,stroke-width:1.5;

```
