import { PrismaPg } from "@prisma/adapter-pg";

import { PrismaClient } from "./generated/prisma/client.js";

export interface CreatePostgresClientOptions {
  connectionString: string;
}

export function createPostgresClient({
  connectionString,
}: CreatePostgresClientOptions): PrismaClient {
  const adapter = new PrismaPg({
    connectionString,
  });

  return new PrismaClient({
    adapter,
  });
}

export type PostgresClient = PrismaClient;
