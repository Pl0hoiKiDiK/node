# Core API

This NestJS application is the starting point for the public API. It currently exposes a liveness endpoint:

```text
GET /health -> 200 {"status":"ok"}
```

It does not connect to PostgreSQL or Redis yet, so this endpoint reports only that the HTTP application is running.

## Run locally

From the repository root, install dependencies and start the development server:

```powershell
npm ci
npm run dev
```

The default port is 3001. To use another port in PowerShell, set `$env:PORT` before starting the server. `.env.example` at the repository root documents `CORE_PORT` for Docker Compose; the local app reads `PORT` from the process environment.

## Checks

From the repository root:

```powershell
npm run lint
npm run typecheck
npm run build
npm test
```

To run the HTTP integration test for this workspace:

```powershell
npm run test:e2e --workspace core
```
