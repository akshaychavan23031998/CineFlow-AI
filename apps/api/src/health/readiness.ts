export type ReadinessCheckStatus = "ok" | "error";

export interface ReadinessResult {
  ready: boolean;
  checks: Readonly<Record<string, ReadinessCheckStatus>>;
}

export interface ReadinessProbe {
  check(): Promise<ReadinessResult>;
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
