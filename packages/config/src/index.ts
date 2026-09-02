import { z } from "zod";

const nodeEnvironmentSchema = z.enum(["development", "test", "production"]);

const logLevelSchema = z.enum(["fatal", "error", "warn", "info", "debug", "trace", "silent"]);

const apiEnvironmentSchema = z.object({
  NODE_ENV: nodeEnvironmentSchema.default("development"),

  PORT: z.coerce.number().int().positive().max(65535).default(4000),

  HOST: z.string().trim().min(1).default("0.0.0.0"),

  LOG_LEVEL: logLevelSchema.default("info"),
});

export type NodeEnvironment = z.infer<typeof nodeEnvironmentSchema>;

export type LogLevel = z.infer<typeof logLevelSchema>;

export type ApiEnvironment = z.infer<typeof apiEnvironmentSchema>;

export type EnvironmentSource = Record<string, string | undefined>;

export class EnvironmentValidationError extends Error {
  public readonly issues: readonly z.core.$ZodIssue[];

  public constructor(issues: readonly z.core.$ZodIssue[]) {
    super("Invalid application environment configuration.");

    this.name = "EnvironmentValidationError";
    this.issues = issues;
  }
}

export function parseApiEnvironment(environment: EnvironmentSource): ApiEnvironment {
  const result = apiEnvironmentSchema.safeParse(environment);

  if (!result.success) {
    throw new EnvironmentValidationError(result.error.issues);
  }

  return result.data;
}
