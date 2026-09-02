# syntax=docker/dockerfile:1.7

FROM node:22.20.0-bookworm-slim AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable \
    && corepack prepare pnpm@11.25.0 --activate

WORKDIR /workspace


FROM base AS builder

COPY . .

RUN --mount=type=cache,id=cineflow-pnpm-store,target=/pnpm/store \
    pnpm install --frozen-lockfile

RUN pnpm --filter @cineflow/media-worker run build

RUN pnpm \
    --filter @cineflow/media-worker \
    --prod \
    deploy \
    --legacy \
    /prod/media-worker


FROM node:22.20.0-bookworm-slim AS runtime

ENV NODE_ENV="production"
ENV PORT="4100"

WORKDIR /app

RUN apt-get update \
    && apt-get install --yes --no-install-recommends \
      ca-certificates \
      ffmpeg \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --system cineflow \
    && useradd \
      --system \
      --gid cineflow \
      --home-dir /app \
      --shell /usr/sbin/nologin \
      cineflow

COPY --from=builder --chown=cineflow:cineflow /prod/media-worker ./

USER cineflow

EXPOSE 4100

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.js"]