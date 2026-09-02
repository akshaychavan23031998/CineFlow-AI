import { EnvironmentValidationError, parseApiEnvironment } from "@cineflow/config";
import { describe, expect, it } from "vitest";

describe("parseApiEnvironment", () => {
  it("applies safe API defaults", () => {
    const environment = parseApiEnvironment({});

    expect(environment).toEqual({
      NODE_ENV: "development",
      PORT: 4000,
      HOST: "0.0.0.0",
      LOG_LEVEL: "info",
    });
  });

  it("coerces a valid port from an environment string", () => {
    const environment = parseApiEnvironment({
      NODE_ENV: "production",
      PORT: "8080",
      HOST: "127.0.0.1",
      LOG_LEVEL: "warn",
    });

    expect(environment).toEqual({
      NODE_ENV: "production",
      PORT: 8080,
      HOST: "127.0.0.1",
      LOG_LEVEL: "warn",
    });
  });

  it("rejects an invalid port", () => {
    expect(() =>
      parseApiEnvironment({
        PORT: "70000",
      }),
    ).toThrow(EnvironmentValidationError);
  });

  it("rejects an unsupported log level", () => {
    expect(() =>
      parseApiEnvironment({
        LOG_LEVEL: "verbose",
      }),
    ).toThrow(EnvironmentValidationError);
  });
});
