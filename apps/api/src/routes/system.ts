import { Router } from "express";

import type { ReadinessProbe, ReadinessResult } from "../health/readiness.js";

const SERVICE_NAME = "cineflow-api";

interface CreateSystemRouterOptions {
  readinessProbe: ReadinessProbe;
}

function getReadinessStatus(result: ReadinessResult): "ready" | "not_ready" {
  return result.ready ? "ready" : "not_ready";
}

export function createSystemRouter({ readinessProbe }: CreateSystemRouterOptions): Router {
  const router = Router();

  router.get("/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: SERVICE_NAME,
    });
  });

  router.get("/ready", async (_request, response) => {
    const result = await readinessProbe.check();

    response.status(result.ready ? 200 : 503).json({
      status: getReadinessStatus(result),
      service: SERVICE_NAME,
      checks: result.checks,
    });
  });

  return router;
}
