import express, { type Express } from "express";

import { defaultReadinessProbe, type ReadinessProbe } from "./health/readiness.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundMiddleware } from "./middleware/not-found.js";
import { requestIdMiddleware } from "./middleware/request-id.js";
import { requestLoggerMiddleware } from "./middleware/request-logger.js";
import { createSystemRouter } from "./routes/system.js";

export interface CreateAppOptions {
  readinessProbe?: ReadinessProbe;
}

export const createApp = (options: CreateAppOptions = {}): Express => {
  const app = express();

  const readinessProbe = options.readinessProbe ?? defaultReadinessProbe;

  app.disable("x-powered-by");

  app.use(requestIdMiddleware);
  app.use(requestLoggerMiddleware);

  app.use(
    express.json({
      limit: "1mb",
    }),
  );

  app.use(
    createSystemRouter({
      readinessProbe,
    }),
  );

  app.use(notFoundMiddleware);
  app.use(errorHandler);

  return app;
};
