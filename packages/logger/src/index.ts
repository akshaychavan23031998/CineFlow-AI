import pino, { type Logger, type LoggerOptions } from "pino";

export interface CreateLoggerOptions {
  service: string;
  environment: string;
  level?: string;
}

const REDACT_PATHS = [
  "password",
  "token",
  "accessToken",
  "refreshToken",
  "authorization",
  "cookie",
  "req.headers.authorization",
  "req.headers.cookie",
  "*.password",
  "*.token",
  "*.accessToken",
  "*.refreshToken",
  "*.apiKey",
  "*.secret",
] as const;

export function createLogger({
  service,
  environment,
  level = "info",
}: CreateLoggerOptions): Logger {
  const options: LoggerOptions = {
    level,

    base: {
      service,
      environment,
    },

    timestamp: pino.stdTimeFunctions.isoTime,

    redact: {
      paths: [...REDACT_PATHS],
      censor: "[REDACTED]",
    },
  };

  return pino(options);
}

export type { Logger };
