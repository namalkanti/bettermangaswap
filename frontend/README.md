# frontend

React frontend. Built artifacts are served by `gateway/`.

## Tech Stack

- React + TypeScript, Vite (`@vitejs/plugin-react`, `react-ts` template)
- Playwright hooks: `data-testid` attributes added as UI is built, for `qa/`'s benefit

## Status

No implementation yet. This service is prioritized right after the API
contracts are defined, ahead of the gateway and listing implementation plans,
because `qa/`'s Playwright work is blocked on having a UI to test against —
the plan will have this built against mocked data conforming to the contract,
so it doesn't have to wait on a live gateway/listing backend. See
`.pi/plans.local/bms-roadmap.md` (step 4).
