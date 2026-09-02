export interface AppErrorOptions {
  statusCode: number;
  code: string;
  message: string;
  expose?: boolean;
  details?: unknown;
  cause?: unknown;
}

export class AppError extends Error {
  public readonly statusCode: number;
  public readonly code: string;
  public readonly expose: boolean;
  public readonly details?: unknown;

  public constructor({
    statusCode,
    code,
    message,
    expose = true,
    details,
    cause,
  }: AppErrorOptions) {
    super(message, cause === undefined ? undefined : { cause });

    this.name = "AppError";
    this.statusCode = statusCode;
    this.code = code;
    this.expose = expose;

    if (details !== undefined) {
      this.details = details;
    }
  }
}

export class NotFoundError extends AppError {
  public constructor(message = "The requested resource was not found.") {
    super({
      statusCode: 404,
      code: "NOT_FOUND",
      message,
    });

    this.name = "NotFoundError";
  }
}

export class BadRequestError extends AppError {
  public constructor(message = "The request is invalid.", details?: unknown) {
    super({
      statusCode: 400,
      code: "BAD_REQUEST",
      message,
      ...(details === undefined ? {} : { details }),
    });

    this.name = "BadRequestError";
  }
}
