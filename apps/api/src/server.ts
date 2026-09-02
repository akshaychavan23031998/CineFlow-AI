import { createApp } from "./app.js";
import { environment } from "./config/environment.js";
import { logger } from "./lib/logger.js";

const app = createApp();

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

const shutdown = (signal: NodeJS.Signals): void => {
  if (isShuttingDown) {
    return;
  }

  isShuttingDown = true;

  logger.info(
    {
      signal,
    },
    "CineFlow API shutdown initiated",
  );

  server.close((error) => {
    if (error) {
      logger.error(
        {
          err: error,
        },
        "Failed to close CineFlow HTTP server cleanly",
      );

      process.exitCode = 1;
      return;
    }

    logger.info("CineFlow API shutdown complete");
    process.exitCode = 0;
  });
};

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
