# CineFlow AI Local Infrastructure

CineFlow AI uses Docker Compose to provide reproducible local infrastructure dependencies for development.

The authoritative local Compose definition is:

```text
compose.yaml
```

## Local Services

The development infrastructure currently includes:

- PostgreSQL 17
- MongoDB 8
- Redis 8

Application processes such as the Next.js web app, Express API, and media worker can run directly on the host during normal development while stateful dependencies run in Docker.

## Environment Setup

Create the local Docker environment file from the committed example:

```powershell
Copy-Item .env.docker.example .env.docker
```

The resulting `.env.docker` file is local-only and must never be committed.

## Start Infrastructure

From the repository root:

```powershell
pnpm run infra:up
```

## Check Service Health

```powershell
pnpm run infra:ps
```

PostgreSQL, MongoDB, and Redis should eventually report `healthy`.

## View Logs

```powershell
pnpm run infra:logs
```

## Stop Infrastructure

```powershell
pnpm run infra:down
```

This removes the containers and Compose network while preserving local database volumes.

## Reset Infrastructure

```powershell
pnpm run infra:reset
```

This removes the containers, network, and Docker volumes.

Running this command permanently deletes Docker-managed local PostgreSQL, MongoDB, and Redis data.

## Data Responsibilities

PostgreSQL is intended for relational and transactional domains such as users, workspaces, memberships, RBAC, wallets, ledgers, reservations, payments, refunds, webhook processing, and usage accounting.

MongoDB is intended for flexible creative-domain data such as projects, scenes, character reference packs, assets, generations, prompts, and workflow documents.

Redis is intended for ephemeral infrastructure concerns such as caching, rate limiting, temporary state, idempotency coordination, and distributed locks.

Redis must never be the authoritative source of truth for monetary balances or payment records.

## Application Containers

Production-oriented Dockerfiles are maintained for:

```text
apps/api/Dockerfile
apps/media-worker/Dockerfile
```

The API image:

- builds the TypeScript API;
- contains production dependencies;
- exposes health and readiness endpoints;
- runs as the non-root `cineflow` user.

The media-worker image:

- builds the TypeScript worker;
- contains production dependencies;
- includes FFmpeg and FFprobe;
- exposes health and readiness endpoints;
- runs as the non-root `cineflow` user.

## Production

The root `compose.yaml` is intended for local development.

It is not the production infrastructure definition.

The planned production architecture uses managed infrastructure and environment-specific secrets rather than the local Docker environment file.
