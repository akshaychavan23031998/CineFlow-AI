import { createServer, type IncomingMessage, type ServerResponse } from "node:http";

const DEFAULT_PORT = 4100;

const port = Number(process.env.PORT ?? DEFAULT_PORT);

const sendJson = (
  response: ServerResponse,
  statusCode: number,
  payload: Record<string, string>,
): void => {
  response.writeHead(statusCode, {
    "content-type": "application/json; charset=utf-8",
  });

  response.end(JSON.stringify(payload));
};

const handleRequest = (request: IncomingMessage, response: ServerResponse): void => {
  if (request.method === "GET" && request.url === "/health") {
    sendJson(response, 200, {
      status: "ok",
      service: "cineflow-media-worker",
    });
    return;
  }

  if (request.method === "GET" && request.url === "/ready") {
    sendJson(response, 200, {
      status: "ready",
      service: "cineflow-media-worker",
    });
    return;
  }

  sendJson(response, 404, {
    status: "not_found",
    service: "cineflow-media-worker",
  });
};

const server = createServer(handleRequest);

server.listen(port, () => {
  console.log(`CineFlow media worker listening on port ${port}`);
});

const shutdown = (signal: NodeJS.Signals): void => {
  console.log(`Received ${signal}. Shutting down CineFlow media worker.`);

  server.close((error) => {
    if (error) {
      console.error("Failed to close the CineFlow media worker cleanly.", error);
      process.exitCode = 1;
      return;
    }

    console.log("CineFlow media worker shutdown complete.");
    process.exitCode = 0;
  });
};

process.once("SIGTERM", shutdown);
process.once("SIGINT", shutdown);
