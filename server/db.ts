import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "@shared/schema";

// Create a PostgreSQL client using env variables
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL environment variable is not set");
}

// For queries
export const queryClient = postgres(connectionString);

// For Drizzle ORM
export const db = drizzle(queryClient, { schema });

// Helper to handle common error scenarios
export function handleDbError(error: unknown): string {
  console.error("Database error:", error);
  
  if (error instanceof Error) {
    // Extract only the relevant parts of the error message to avoid exposing sensitive info
    const safeMessage = error.message.replace(/(password|user|database)=\S+/g, "$1=redacted");
    return `Database error: ${safeMessage}`;
  }
  
  return "An unknown database error occurred";
}