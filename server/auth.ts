import express, { Request, Response, NextFunction } from "express";
import session from "express-session";
import bcrypt from "bcrypt";
import { db } from "./db";
import { PgStorage } from "./pg-storage";
import connectPgSimple from "connect-pg-simple";
import { pool } from "./db";
import { users } from "@shared/schema";
import { eq } from "drizzle-orm";

const pgStorage = new PgStorage();
const PgSession = connectPgSimple(session);

// Create sessions table if it doesn't exist
async function createSessionTable() {
  try {
    await pool.query(`
      CREATE TABLE IF NOT EXISTS "session" (
        "sid" varchar NOT NULL COLLATE "default",
        "sess" json NOT NULL,
        "expire" timestamp(6) NOT NULL,
        CONSTRAINT "session_pkey" PRIMARY KEY ("sid")
      );
      CREATE INDEX IF NOT EXISTS "IDX_session_expire" ON "session" ("expire");
    `);
    console.log("Session table created successfully");
  } catch (error) {
    console.error("Error creating session table:", error);
  }
}

// Initialize session middleware
export function setupAuth(app: express.Express) {
  // Create session table
  createSessionTable();
  let sessionSecret = process.env.SESSION_SECRET;
  
  // For development, generate a session secret if not provided
  if (!sessionSecret) {
    if (process.env.NODE_ENV === 'development') {
      sessionSecret = 'dev_session_secret_' + Math.random().toString(36).substring(7);
      console.log('Using generated session secret for development');
    } else {
      throw new Error("SESSION_SECRET environment variable is required in production");
    }
  }

  // Session middleware
  app.use(
    session({
      store: new PgSession({
        pool,
        tableName: 'session', // Use the session table
      }),
      secret: sessionSecret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
      },
    })
  );

  // Add user to request
  app.use(async (req: any, res: Response, next: NextFunction) => {
    if (req.session.userId) {
      try {
        const user = await pgStorage.getUser(req.session.userId);
        if (user) {
          // Remove password before adding to request
          const { password, ...userWithoutPassword } = user;
          req.user = userWithoutPassword;
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    next();
  });

  // Authentication routes
  app.post("/api/auth/register", async (req: Request, res: Response) => {
    try {
      const { username, password, displayName, email } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      // Check if username already exists
      const existingUser = await pgStorage.getUserByUsername(username);
      if (existingUser) {
        return res.status(400).json({ message: "Username already exists" });
      }

      // Hash password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create user
      const user = await pgStorage.createUser({
        username,
        password: hashedPassword,
        displayName: displayName || username,
        email,
      });

      // Set session
      (req.session as any).userId = user.id;

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "An error occurred during registration" });
    }
  });

  app.post("/api/auth/login", async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;

      // Validate input
      if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
      }

      // Find user
      const user = await pgStorage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Check password
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Invalid username or password" });
      }

      // Set session
      (req.session as any).userId = user.id;

      // Update last active
      await db.update(users)
        .set({ lastActive: new Date() })
        .where(eq(users.id, user.id));

      // Return user without password
      const { password: _, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Login error:", error);
      res.status(500).json({ message: "An error occurred during login" });
    }
  });

  app.post("/api/auth/logout", (req: Request, res: Response) => {
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Could not log out" });
      }
      res.clearCookie("connect.sid");
      res.json({ message: "Logged out successfully" });
    });
  });

  app.get("/api/auth/me", (req: any, res: Response) => {
    if (!req.user) {
      return res.status(401).json({ message: "Not authenticated" });
    }
    res.json(req.user);
  });
  
  app.put("/api/auth/update-profile", isAuthenticated, async (req: any, res: Response) => {
    try {
      const { displayName } = req.body;
      const userId = req.user.id;
      
      const updatedUser = await pgStorage.updateUser(userId, { displayName });
      
      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }
      
      const { password: _, ...userWithoutPassword } = updatedUser;
      res.json(userWithoutPassword);
    } catch (error) {
      console.error("Update profile error:", error);
      res.status(500).json({ message: "Failed to update profile" });
    }
  });
}

// Middleware to check if user is authenticated
export function isAuthenticated(req: any, res: Response, next: NextFunction) {
  if (!req.user) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  next();
}