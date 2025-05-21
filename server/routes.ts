import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { PgStorage } from "./pg-storage";
import { insertAchievementSchema, insertReadingGoalSchema, insertReadingProgressSchema, insertStreakSchema, insertUserSchema, insertBookmarkSchema, insertReflectionSchema, insertQuestSchema, insertUserQuestSchema } from "@shared/schema";
import { handleDbError } from "./db";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // User routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await storage.createUser(userData);
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create user" });
      }
    }
  });

  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await storage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving user" });
    }
  });

  // Reading progress routes
  app.post("/api/reading-progress", async (req, res) => {
    try {
      const progressData = insertReadingProgressSchema.parse(req.body);
      const progress = await storage.createOrUpdateReadingProgress(progressData);
      res.status(201).json(progress);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update reading progress" });
      }
    }
  });

  app.get("/api/reading-progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await storage.getReadingProgressByUserId(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reading progress" });
    }
  });

  // Streak routes
  app.post("/api/streaks", async (req, res) => {
    try {
      const streakData = insertStreakSchema.parse(req.body);
      const streak = await storage.createOrUpdateStreak(streakData);
      res.status(201).json(streak);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid streak data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update streak" });
      }
    }
  });

  app.get("/api/streaks/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const streak = await storage.getStreakByUserId(userId);
      
      if (!streak) {
        return res.status(404).json({ message: "Streak not found" });
      }
      
      res.json(streak);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving streak" });
    }
  });

  // Achievement routes
  app.post("/api/achievements", async (req, res) => {
    try {
      const achievementData = insertAchievementSchema.parse(req.body);
      const achievement = await storage.createAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid achievement data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to record achievement" });
      }
    }
  });

  app.get("/api/achievements/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const achievements = await storage.getAchievementsByUserId(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving achievements" });
    }
  });

  // Reading goal routes
  app.post("/api/reading-goals", async (req, res) => {
    try {
      const goalData = insertReadingGoalSchema.parse(req.body);
      const goal = await storage.createOrUpdateReadingGoal(goalData);
      res.status(201).json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid goal data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to update reading goal" });
      }
    }
  });

  app.get("/api/reading-goals/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const goal = await storage.getReadingGoalByUserId(userId);
      
      if (!goal) {
        return res.status(404).json({ message: "Reading goal not found" });
      }
      
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: "Error retrieving reading goal" });
    }
  });

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
