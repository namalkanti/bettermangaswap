# listing

Axum (Rust) listing service. Owns the schema exclusively and exposes an HTTP
API that both `gateway/` and `matching/` consume — `matching/` polls it
(no direct DB access).

## Tech Stack

- Rust, Axum
- sqlx + SQLite, no ORM (compile-time-checked queries via `query!` macros)
- Docker (plain Dockerfile for v1; Nix packaging is a later phase)

## Status

No implementation yet. Data schema and internal API contract are defined
first, then this service's implementation plan — see
`.pi/plans.local/bms-roadmap.md` (steps 1, 2, and 5). Because `matching/` is
built by a collaborator against this service's API, its implementation plan
will prioritize thorough tests (unit + integration against real SQLite) so
the API's behavior is unambiguous to build against.
