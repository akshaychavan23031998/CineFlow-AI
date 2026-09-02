import express, { type Express } from "express";

export const createApp = (): Express => {
  const app = express();

  app.disable("x-powered-by");

  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.status(200).json({
      status: "ok",
      service: "cineflow-api",
    });
  });

  app.get("/ready", (_request, response) => {
    response.status(200).json({
      status: "ready",
      service: "cineflow-api",
    });
  });

  return app;
};
