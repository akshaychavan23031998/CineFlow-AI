import "dotenv/config";

import { parseApiEnvironment } from "@cineflow/config";

export const environment = parseApiEnvironment(process.env);
