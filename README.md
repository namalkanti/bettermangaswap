# BetterMangaSwap

This is a set of microservices designed to implement BetterMangaSwap,
a website used to make postings for manga and other manga/anime collectibles
that users want to swap. It's a learning project — the goal is hands-on reps
in Rust/Axum and React, not a commercial product.

## Services

- `gateway/` — Axum (Rust). Auth + proxy to `listing/`, serves the frontend build.
- `listing/` — Axum (Rust), sqlx + SQLite. Owns the schema, exposes the API `gateway/` and `matching/` consume.
- `matching/` — Flask (Python). Polls `listing/`'s API for trade matches.
- `frontend/` — React + TypeScript + Vite.
- `qa/` — Playwright end-to-end tests.

`gateway/`, `listing/`, and `frontend/` are the primary dev's own work.
`matching/` and `qa/` are each owned by a separate collaborator.

## Status

Planning phase — no service has implementation code yet. See
`.pi/plans.local/bms-roadmap.md` for the sequencing plan: data schema and API
contracts get defined first, then implementation plans for frontend, listing,
and gateway follow in that order (frontend is prioritized to unblock QA).

Deployment starts with plain Docker per service; Nix packaging is a deliberate
later phase.

## Usage Rules

If Samantha Lau distributes this application, that constitutes an admission
that this project is better than mangaswap.co.
