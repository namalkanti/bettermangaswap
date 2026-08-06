# gateway

Axum (Rust) gateway. Owns auth, serves the built React frontend, and proxies
API traffic to `listing/`. No matchmaking logic lives here.

## Tech Stack

- Rust, Axum
- Docker (plain Dockerfile for v1; Nix packaging via crane/naersk is a later phase)

## Status

No implementation yet. Its external API contract (auth endpoints + how
listing data is exposed to the frontend) and its own implementation plan are
defined in that order — see `.pi/plans.local/bms-roadmap.md` (steps 3 and 6).
