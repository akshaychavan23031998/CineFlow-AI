import { randomUUID } from "node:crypto";

import type { NextFunction, Request, Response } from "express";

export const REQUEST_ID_HEADER = "x-request-id";

const MAX_REQUEST_ID_LENGTH = 128;

function normalizeIncomingRequestId(value: string | undefined): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  const normalized = value.trim();

  if (normalized.length === 0 || normalized.length > MAX_REQUEST_ID_LENGTH) {
    return undefined;
  }

  return normalized;
}

export function getResponseRequestId(response: Response): string {
  const requestId = response.getHeader(REQUEST_ID_HEADER);

  if (typeof requestId === "string") {
    return requestId;
  }

  return "unknown";
}

export function requestIdMiddleware(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  const incomingRequestId = normalizeIncomingRequestId(request.get(REQUEST_ID_HEADER));

  const requestId = incomingRequestId ?? randomUUID();

  response.locals.requestId = requestId;
  response.setHeader(REQUEST_ID_HEADER, requestId);

  next();
}
