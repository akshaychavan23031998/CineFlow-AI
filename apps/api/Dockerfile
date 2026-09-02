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

RUN pnpm --filter @cineflow/api run build

RUN pnpm \
    --filter @cineflow/api \
    --prod \
    deploy \
    --legacy \
    /prod/api


FROM node:22.20.0-bookworm-slim AS runtime

ENV NODE_ENV="production"
ENV PORT="4000"

WORKDIR /app

RUN groupadd --system cineflow \
    && useradd \
      --system \
      --gid cineflow \
      --home-dir /app \
      --shell /usr/sbin/nologin \
      cineflow

COPY --from=builder --chown=cineflow:cineflow /prod/api ./

USER cineflow

EXPOSE 4000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:' + process.env.PORT + '/health').then((response) => process.exit(response.ok ? 0 : 1)).catch(() => process.exit(1))"

CMD ["node", "dist/server.js"]