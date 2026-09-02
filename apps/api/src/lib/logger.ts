import { createLogger } from "@cineflow/logger";

import { environment } from "../config/environment.js";

export const logger = createLogger({
  service: "cineflow-api",
  environment: environment.NODE_ENV,
  level: environment.NODE_ENV === "test" ? "silent" : environment.LOG_LEVEL,
});
