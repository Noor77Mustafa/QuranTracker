import { Pool, neonConfig } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-serverless';
import ws from "ws";
import * as schema from "@shared/schema";

neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL must be set. Did you forget to provision a database?",
  );
}

export const pool = new Pool({ connectionString: process.env.DATABASE_URL });
export const db = drizzle(pool, { schema });

export function handleDbError(error: unknown): string {
  console.error("Database error:", error);
  
  if (error instanceof Error) {
    if (error.message.includes("duplicate key")) {
      return "This record already exists.";
    }
    
    if (error.message.includes("foreign key constraint")) {
      return "Referenced record does not exist.";
    }
    
    return error.message;
  }
  
  return "An unknown database error occurred";
}