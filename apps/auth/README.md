# Authentication microservice

This Express and TypeScript application is the starting point for authentication. It currently exposes `GET /health`, returning `{"status":"ok"}`. Sign-up, login, tokens, Redis sessions, and OAuth will be added in later feature PRs.

From the repository root, run `npm ci`, `npm run build --workspace @innogram/shared`, and then `npm run dev --workspace auth`. The default port is 3002; set the `PORT` environment variable to change it. The app reads variables from the process environment.

Check the service with `npm run lint --workspace auth`, `npm run typecheck --workspace auth`, and `npm run build --workspace auth`. Run the built service with `npm run start --workspace auth`.
