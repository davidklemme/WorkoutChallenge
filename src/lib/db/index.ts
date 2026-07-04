import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export function getDb() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required. Create a free Neon database and add the connection string to .env.local.");
  }

  return drizzle(neon(databaseUrl), { schema });
}
