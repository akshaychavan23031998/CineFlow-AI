import type { ErrorRequestHandler } from "express";

import { environment } from "../config/environment.js";
import { AppError } from "../errors/app-error.js";
import { logger } from "../lib/logger.js";
import { getResponseRequestId } from "./request-id.js";

interface ErrorResponseBody {
  error: {
    code: string;
    message: string;
    requestId: string;
    details?: unknown;
  };
}

export const errorHandler: ErrorRequestHandler = (
  error: unknown,
  request,
  response,
  next,
): void => {
  /*
   * Express identifies error middleware by its
   * four-argument signature. Keep `next` even though
   * this terminal error handler does not delegate.
   */
  void next;

  const requestId = getResponseRequestId(response);

  if (error instanceof AppError) {
    const responseBody: ErrorResponseBody = {
      error: {
        code: error.code,
        message: error.expose ? error.message : "An unexpected error occurred.",
        requestId,
        ...(error.details === undefined
          ? {}
          : {
              details: error.details,
            }),
      },
    };

    const logContext = {
      requestId,
      method: request.method,
      path: request.path,
      statusCode: error.statusCode,
      errorCode: error.code,
      err: error,
    };

    if (error.statusCode >= 500) {
      logger.error(logContext, "Request failed");
    } else {
      logger.warn(logContext, "Request rejected");
    }

    response.status(error.statusCode).json(responseBody);

    return;
  }

  logger.error(
    {
      requestId,
      method: request.method,
      path: request.path,
      err: error,
    },
    "Unhandled request error",
  );

  const responseBody: ErrorResponseBody = {
    error: {
      code: "INTERNAL_SERVER_ERROR",
      message: "An unexpected error occurred.",
      requestId,
    },
  };

  if (environment.NODE_ENV !== "production" && error instanceof Error) {
    responseBody.error.details = {
      name: error.name,
    };
  }

  response.status(500).json(responseBody);
};
