import { createApp } from "./app.js";

const DEFAULT_PORT = 4000;

const port = Number(process.env.PORT ?? DEFAULT_PORT);

const app = createApp();

const server = app.listen(port, () => {
  console.log(`CineFlow API listening on port ${port}`);
});

const shutdown = (signal: NodeJS.Signals): void => {
  console.log(`Received ${signal}. Shutting down CineFlow API.`);

  server.close((error) => {
    if (error) {
      console.error("Failed to close the CineFlow HTTP server cleanly.", error);
      process.exitCode = 1;
      return;
    }

    console.log("CineFlow API shutdown complete.");
    process.exitCode = 0;
  });
};

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
