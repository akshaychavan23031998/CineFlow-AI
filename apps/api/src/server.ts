import { createApp } from "./app.js";
import { environment } from "./config/environment.js";
import { createDatabaseReadinessProbe } from "./health/readiness.js";
import { databaseReadinessCheck, disconnectDatabase } from "./lib/database.js";
import { logger } from "./lib/logger.js";

const app = createApp({
  readinessProbe: createDatabaseReadinessProbe(databaseReadinessCheck),
});

const server = app.listen(environment.PORT, environment.HOST, () => {
  logger.info(
    {
      host: environment.HOST,
      port: environment.PORT,
    },
    "CineFlow API listening",
  );
});

let isShuttingDown = false;

async function closeServer(signal: NodeJS.Signals): Promise<void> {
  logger.info({ signal }, "CineFlow API shutdown initiated");

  await new Promise<void>((resolve, reject) => {
    server.close((error) => {
      if (error) {
        reject(error);
        return;
      }

      resolve();
    });
  });

  await disconnectDatabase();

  logger.info("CineFlow API shutdown complete");
}

const shutdown = (signal: NodeJS.Signals): void => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  void closeServer(signal).catch((error: unknown) => {
    logger.error(
      {
        signal,
        err: error,
      },
      "CineFlow API shutdown failed",
    );

    process.exitCode = 1;
  });
};

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
