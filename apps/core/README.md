# Core API

This NestJS application is the starting point for the public API. It connects to PostgreSQL through TypeORM and exposes a liveness endpoint:

```text
GET /health -> 200 {"status":"ok"}
```

The endpoint reports that the HTTP application is running. It does not check the database connection or Redis.

The first migration creates the PostgreSQL schemas `auth`, `main`, and `notification`. Entity tables will be added in a later PR. TypeORM schema synchronization is disabled, so database structure changes must be recorded in migrations.

## Run locally

From the repository root, start PostgreSQL, install dependencies, build Core, apply migrations, and start the development server:

```powershell
if (-not (Test-Path .env)) { Copy-Item .env.example .env }
docker compose up -d postgres
npm ci
npm run build --workspace @innogram/shared
npm run build --workspace core
npm run migration:run --workspace core
npm run dev --workspace core
```

Copy the example only if you do not already have a local `.env`; keep your existing credentials otherwise. The NestJS app loads the root `.env` through `@nestjs/config`, and migration scripts load it through Node's `--env-file-if-exists` flag. Both use process environment values in preference to values in the file. Core reads `DATABASE_URL` when present, otherwise `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_DB`, `POSTGRES_HOST`, and `POSTGRES_PORT`. In a container, Compose sets the host to `postgres`. The default Core port is 3001; set `$env:PORT` in PowerShell to change the local app port. `CORE_PORT` changes only the published Docker port.

Run migrations again after adding new migration files. TypeORM records applied migrations in PostgreSQL and skips them on subsequent runs. `npm run migration:show --workspace core` lists their status. `npm run migration:revert --workspace core` reverts the latest migration; use it only when you intend to undo that database change.

When entity classes are added in the next PR, build Core and generate a migration from them with `npm run migration:generate --workspace core -- src/database/migrations/NameOfChange`. Review the generated file before running it. The first migration is written with TypeORM's migration API because this PR creates schemas before adding entity classes.

For the containerized Core API, build and start the stack, then apply the migration inside the Core container:

```powershell
docker compose up -d --build postgres core
docker compose exec core npm run migration:run --workspace core
```

## Checks

From the repository root:

```powershell
npm run lint
npm run typecheck
npm run build
npm test
```

To run the HTTP and PostgreSQL integration tests, start PostgreSQL and apply migrations first, then run:

```powershell
npm run test:e2e --workspace core
```
