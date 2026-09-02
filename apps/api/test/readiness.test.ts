import { describe, expect, it, vi } from "vitest";

import {
  createDatabaseReadinessProbe,
  type DatabaseReadinessCheck,
} from "../src/health/readiness.js";

describe("database readiness probe", () => {
  it("reports ready when PostgreSQL responds", async () => {
    const ping = vi.fn().mockResolvedValue(undefined);

    const databaseCheck: DatabaseReadinessCheck = {
      ping,
    };

    const probe = createDatabaseReadinessProbe(databaseCheck);

    await expect(probe.check()).resolves.toEqual({
      ready: true,

      checks: {
        api: "ok",
        database: "ok",
      },
    });

    expect(ping).toHaveBeenCalledOnce();
  });

  it("reports not ready without exposing database errors", async () => {
    const ping = vi.fn().mockRejectedValue(new Error("postgresql://user:secret@database.internal"));

    const databaseCheck: DatabaseReadinessCheck = {
      ping,
    };

    const probe = createDatabaseReadinessProbe(databaseCheck);

    await expect(probe.check()).resolves.toEqual({
      ready: false,

      checks: {
        api: "ok",
        database: "error",
      },
    });

    expect(ping).toHaveBeenCalledOnce();
  });
});
