import type { NextFunction, Request, Response } from "express";

import { logger } from "../lib/logger.js";
import { getResponseRequestId } from "./request-id.js";

export function requestLoggerMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const startedAt = process.hrtime.bigint();
  const requestId = getResponseRequestId(response);

  logger.info(
    {
      requestId,
      method: request.method,
      path: request.path,
    },
    "HTTP request started",
  );

  response.once("finish", () => {
    const durationNanoseconds = process.hrtime.bigint() - startedAt;

    const durationMs = Number(durationNanoseconds) / 1_000_000;

    logger.info(
      {
        requestId,
        method: request.method,
        path: request.path,
        statusCode: response.statusCode,
        durationMs: Number(durationMs.toFixed(2)),
      },
      "HTTP request completed",
    );
  });

  next();
}
