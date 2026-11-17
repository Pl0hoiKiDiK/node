# Innogram

Innogram is an internship project for a social web application. This repository uses npm workspaces and Turborepo. It contains a NestJS Core API, an Express authentication service, a NestJS notifications consumer, and a Next.js client. The applications currently have startup scaffolds; user-facing features will be added in later PRs.

## Requirements

- Node.js 24.15.0 or newer in the 24.x line (`.nvmrc` pins the CI version)
- npm 11.x
- Docker Desktop with Compose for containerized development

## Getting started

Run these commands from the repository root to start all applications locally:

```powershell
npm ci
npm run dev
```

Open `http://localhost:3000` for the client. The Core API, auth service, and notifications service expose `/health` on ports 3001, 3002, and 3003 respectively. Each returns `{"status":"ok"}`.

To start PostgreSQL, Redis, and RabbitMQ in containers while running the applications locally:

```powershell
Copy-Item .env.example .env
npm run docker:infra
```

To build and run all applications and infrastructure in containers instead, use `npm run docker:up`. Stop the containers with `npm run docker:down`. The `.env` file supplies local Compose settings and is ignored by Git. Replace the placeholder passwords before using the stack outside a local development machine. Local Node processes read variables from the process environment; copying `.env` alone does not inject them into those processes.

## Environment variables

Copy `.env.example` to `.env` before running Docker Compose. Compose reads `.env` from the repository root. The current application scaffolds use only their `PORT` process variable; Compose sets each container's `PORT` to its internal port. Other variables in `.env.example` prepare the local infrastructure or reserve names for later features.

| Variable | Purpose |
| --- | --- |
| `CLIENT_PORT`, `CORE_PORT`, `AUTH_PORT`, `NOTIFICATIONS_PORT` | Host ports published by Compose; defaults are 3000–3003 |
| `POSTGRES_DB`, `POSTGRES_USER`, `POSTGRES_PASSWORD`, `POSTGRES_PORT` | Local PostgreSQL database, credentials, and published host port |
| `DATABASE_URL` | Local host connection string reserved for the later database integration |
| `REDIS_HOST`, `REDIS_PORT`, `REDIS_PASSWORD` | Local Redis connection settings; Compose publishes port 6379 by default |
| `RABBITMQ_USER`, `RABBITMQ_PASSWORD` | Local RabbitMQ credentials |
| `RABBITMQ_PORT`, `RABBITMQ_MANAGEMENT_PORT` | Published host ports for messaging and the management UI |
| `RABBITMQ_URL` | Local host connection string reserved for the later notifications consumer |
| `CLIENT_URL`, `CORE_SERVICE_URL`, `AUTH_SERVICE_URL`, `NOTIFICATIONS_SERVICE_URL` | Local service addresses reserved for later inter-service calls |
| `JWT_SECRET`, `JWT_EXPIRES_IN`, `JWT_REFRESH_EXPIRES_IN` | Token configuration placeholders for the later auth implementation |
| `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `GOOGLE_CALLBACK_URL` | Google OAuth placeholders for the later auth implementation |
| `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS` | Email delivery placeholders for the later notifications implementation |
| `UPLOAD_PATH`, `MAX_FILE_SIZE` | File upload placeholders for later features |
| `NODE_ENV`, `LOG_LEVEL` | Development mode and logging level placeholders |

Never commit `.env` or real passwords, tokens, and OAuth credentials. `.env.example` contains development placeholders only.

## Root commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Start workspace development servers |
| `npm run build` | Build all applications |
| `npm run lint` | Run ESLint in all applications |
| `npm run typecheck` | Check TypeScript in all applications |
| `npm test` | Run the Core API unit test |
| `npm run test:e2e --workspace core_microservice` | Run the Core API HTTP test |
| `npm run docker:build` | Build the four application images |
| `npm run docker:up` | Build and start the full container stack |
| `npm run docker:infra` | Start PostgreSQL, Redis, and RabbitMQ |
| `npm run docker:down` | Stop the container stack |

Each application has its own setup guide: [Core API](apps/core_microservice/README.md), [auth](apps/auth_microservice/README.md), [notifications](apps/notifications_consumer_microservice/README.md), and [client](apps/client_app/README.md). The `packages/shared` and `packages/types` directories are reserved for reusable code.

## Git workflow

Create feature branches from `dev` using names such as `feature/INO-1`. Open pull requests into `dev` for mentor review. Keep `main` for production-ready changes.
