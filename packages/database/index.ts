import "server-only";

import { neonConfig } from "@neondatabase/serverless";
import { PrismaNeon } from "@prisma/adapter-neon";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import ws from "ws";
import { PrismaClient } from "./generated/client";
import { keys } from "./keys";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

const databaseUrl = keys().DATABASE_URL;
const isNeon =
  databaseUrl.includes("neon.tech") ||
  databaseUrl.includes("endpoint=") ||
  databaseUrl.includes("pooler");

let client: PrismaClient;

if (isNeon) {
  neonConfig.webSocketConstructor = ws;
  const adapter = new PrismaNeon({ connectionString: databaseUrl });
  client = new PrismaClient({ adapter });
} else {
  // Standard local PostgreSQL / non-serverless connection string
  const pool = new Pool({ connectionString: databaseUrl });
  const adapter = new PrismaPg(pool);
  client = new PrismaClient({ adapter });
}

export const database = globalForPrisma.prisma || client;

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = database;
}

export * from "./generated/client";
