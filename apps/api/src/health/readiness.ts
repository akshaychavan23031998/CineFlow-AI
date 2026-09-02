export type ReadinessCheckStatus = "ok" | "error";

export interface ReadinessResult {
  ready: boolean;

  checks: Readonly<Record<string, ReadinessCheckStatus>>;
}

export interface ReadinessProbe {
  check(): Promise<ReadinessResult>;
}

export interface DatabaseReadinessCheck {
  ping(): Promise<void>;
}

export const defaultReadinessProbe: ReadinessProbe = {
  check: () =>
    Promise.resolve({
      ready: true,

      checks: {
        api: "ok",
      },
    }),
};

export function createDatabaseReadinessProbe(
  databaseCheck: DatabaseReadinessCheck,
): ReadinessProbe {
  return {
    async check(): Promise<ReadinessResult> {
      try {
        await databaseCheck.ping();

        return {
          ready: true,

          checks: {
            api: "ok",
            database: "ok",
          },
        };
      } catch {
        return {
          ready: false,

          checks: {
            api: "ok",
            database: "error",
          },
        };
      }
    },
  };
}
