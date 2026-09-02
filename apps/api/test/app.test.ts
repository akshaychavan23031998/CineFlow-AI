import express from "express";
import request from "supertest";
import { describe, expect, it } from "vitest";

import { createApp } from "../src/app.js";
import type { ReadinessProbe } from "../src/health/readiness.js";
import { errorHandler } from "../src/middleware/error-handler.js";
import { requestIdMiddleware } from "../src/middleware/request-id.js";

describe("CineFlow API", () => {
  it("reports liveness", async () => {
    const response = await request(createApp())
      .get("/health")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        status: "ok",
        service: "cineflow-api",
      });

    expect(response.get("x-request-id")).toEqual(expect.any(String));
  });

  it("preserves a valid incoming request ID", async () => {
    const requestId = "cineflow-test-request";

    await request(createApp())
      .get("/health")
      .set("x-request-id", requestId)
      .expect("x-request-id", requestId)
      .expect(200);
  });

  it("reports readiness when dependencies are available", async () => {
    await request(createApp())
      .get("/ready")
      .expect("Content-Type", /json/)
      .expect(200)
      .expect({
        status: "ready",
        service: "cineflow-api",
        checks: {
          api: "ok",
        },
      });
  });

  it("returns 503 when readiness checks fail", async () => {
    const readinessProbe: ReadinessProbe = {
      check: () =>
        Promise.resolve({
          ready: false,
          checks: {
            database: "error",
          },
        }),
    };

    await request(
      createApp({
        readinessProbe,
      }),
    )
      .get("/ready")
      .expect("Content-Type", /json/)
      .expect(503)
      .expect({
        status: "not_ready",
        service: "cineflow-api",
        checks: {
          database: "error",
        },
      });
  });

  it("returns a normalized 404 response with a request ID", async () => {
    const response = await request(createApp())
      .get("/does-not-exist")
      .expect("Content-Type", /json/)
      .expect(404);

    const requestId = response.get("x-request-id");

    expect(requestId).toEqual(expect.any(String));

    expect(response.text).toContain('"code":"NOT_FOUND"');

    expect(response.text).toContain(`"requestId":"${requestId}"`);
  });

  it("does not expose unexpected internal error messages", async () => {
    const app = express();

    app.use(requestIdMiddleware);

    app.get("/boom", () => {
      throw new Error("sensitive internal implementation detail");
    });

    app.use(errorHandler);

    const response = await request(app).get("/boom").expect("Content-Type", /json/).expect(500);

    expect(response.text).toContain('"code":"INTERNAL_SERVER_ERROR"');

    expect(response.text).not.toContain("sensitive internal implementation detail");

    expect(response.get("x-request-id")).toEqual(expect.any(String));
  });
});
