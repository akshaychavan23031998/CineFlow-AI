import { createPostgresClient } from "@cineflow/database";

import { environment } from "../config/environment.js";

function getDatabaseUrl(): string {
  if (environment.DATABASE_URL === undefined) {
    throw new Error("DATABASE_URL must be configured before starting the CineFlow API.");
  }

  return environment.DATABASE_URL;
}

export const database = createPostgresClient({
  connectionString: getDatabaseUrl(),
});

export async function disconnectDatabase(): Promise<void> {
  await database.$disconnect();
}

export const databaseReadinessCheck = {
  async ping(): Promise<void> {
    await database.$queryRaw`SELECT 1`;
  },
};
