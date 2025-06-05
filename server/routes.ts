import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { PgStorage } from "./pg-storage";
import { insertAchievementSchema, insertReadingGoalSchema, insertReadingProgressSchema, insertStreakSchema, insertUserSchema, insertBookmarkSchema, insertReflectionSchema, insertQuestSchema, insertUserQuestSchema } from "@shared/schema";
import { handleDbError } from "./db";
import { z } from "zod";
import { getAIResponse } from "./openai-routes";
import { setupAuth, isAuthenticated } from "./auth";
import { AchievementService } from "./achievement-service";
import cookieParser from "cookie-parser";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up middlewares
  app.use(cookieParser());
  
  // Set up authentication
  setupAuth(app);
  
  // Create PostgreSQL storage
  const pgStorage = new PgStorage();
  // Use pgStorage instead of in-memory storage for all routes
  const dbStorage = pgStorage;
  
  // Create achievement service
  const achievementService = new AchievementService(pgStorage);
  // User routes
  app.post("/api/auth/register", async (req, res) => {
    try {
      const userData = insertUserSchema.parse(req.body);
      const user = await dbStorage.createUser(userData);
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      res.status(201).json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/user/:id", async (req, res) => {
    try {
      const userId = parseInt(req.params.id);
      const user = await dbStorage.getUser(userId);
      
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
      
      // Don't return password in response
      const { password, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Reading progress routes
  app.post("/api/reading-progress", async (req, res) => {
    try {
      const progressData = insertReadingProgressSchema.parse(req.body);
      const progress = await dbStorage.createOrUpdateReadingProgress(progressData);
      
      // Check for achievements when progress is updated
      const newAchievements = await achievementService.onAyahRead(progressData.userId);
      if (progress.isCompleted) {
        const surahAchievements = await achievementService.onSurahCompleted(progressData.userId);
        newAchievements.push(...surahAchievements);
      }
      
      res.status(201).json({ 
        progress, 
        newAchievements: newAchievements.length > 0 ? newAchievements : undefined 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid progress data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/reading-progress/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const progress = await dbStorage.getReadingProgressByUserId(userId);
      res.json(progress);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Streak routes
  app.post("/api/streaks", async (req, res) => {
    try {
      const streakData = insertStreakSchema.parse(req.body);
      const streak = await dbStorage.createOrUpdateStreak(streakData);
      
      // Check for streak-based achievements
      const newAchievements = await achievementService.onStreakUpdated(streakData.userId);
      
      res.status(201).json({ 
        streak, 
        newAchievements: newAchievements.length > 0 ? newAchievements : undefined 
      });
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid streak data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/streaks/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const streak = await dbStorage.getStreakByUserId(userId);
      
      if (!streak) {
        return res.status(404).json({ message: "Streak not found" });
      }
      
      res.json(streak);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Achievement routes
  app.post("/api/achievements", async (req, res) => {
    try {
      const achievementData = insertAchievementSchema.parse(req.body);
      const achievement = await dbStorage.createAchievement(achievementData);
      res.status(201).json(achievement);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid achievement data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/achievements/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const achievements = await dbStorage.getAchievementsByUserId(userId);
      res.json(achievements);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Reading goal routes
  app.post("/api/reading-goals", async (req, res) => {
    try {
      const goalData = insertReadingGoalSchema.parse(req.body);
      const goal = await dbStorage.createOrUpdateReadingGoal(goalData);
      res.status(201).json(goal);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid goal data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/reading-goals/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const goal = await dbStorage.getReadingGoalByUserId(userId);
      
      if (!goal) {
        return res.status(404).json({ message: "Reading goal not found" });
      }
      
      res.json(goal);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });
  
  // Bookmark routes
  app.post("/api/bookmarks", async (req, res) => {
    try {
      const bookmarkData = insertBookmarkSchema.parse(req.body);
      const bookmark = await dbStorage.createBookmark(bookmarkData);
      res.status(201).json(bookmark);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid bookmark data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/bookmarks/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const bookmarks = await dbStorage.getBookmarksByUserId(userId);
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.delete("/api/bookmarks/:id", async (req, res) => {
    try {
      const bookmarkId = parseInt(req.params.id);
      const success = await dbStorage.deleteBookmark(bookmarkId);
      
      if (!success) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
      
      res.status(200).json({ message: "Bookmark deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Reflection/Journal routes
  app.post("/api/reflections", async (req, res) => {
    try {
      const reflectionData = insertReflectionSchema.parse(req.body);
      const reflection = await dbStorage.createReflection(reflectionData);
      res.status(201).json(reflection);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid reflection data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/reflections/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const reflections = await dbStorage.getReflectionsByUserId(userId);
      res.json(reflections);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.patch("/api/reflections/:id", async (req, res) => {
    try {
      const reflectionId = parseInt(req.params.id);
      const updatedReflection = await dbStorage.updateReflection(reflectionId, req.body);
      
      if (!updatedReflection) {
        return res.status(404).json({ message: "Reflection not found" });
      }
      
      res.json(updatedReflection);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.delete("/api/reflections/:id", async (req, res) => {
    try {
      const reflectionId = parseInt(req.params.id);
      const success = await dbStorage.deleteReflection(reflectionId);
      
      if (!success) {
        return res.status(404).json({ message: "Reflection not found" });
      }
      
      res.status(200).json({ message: "Reflection deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Quest routes
  app.post("/api/quests", async (req, res) => {
    try {
      const questData = insertQuestSchema.parse(req.body);
      const quest = await dbStorage.createQuest(questData);
      res.status(201).json(quest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid quest data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/quests/active", async (req, res) => {
    try {
      const quests = await dbStorage.getActiveQuests();
      res.json(quests);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/quests/:id", async (req, res) => {
    try {
      const questId = parseInt(req.params.id);
      const quest = await dbStorage.getQuestById(questId);
      
      if (!quest) {
        return res.status(404).json({ message: "Quest not found" });
      }
      
      res.json(quest);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // User Quest progress routes
  app.post("/api/user-quests", async (req, res) => {
    try {
      const userQuestData = insertUserQuestSchema.parse(req.body);
      const userQuest = await dbStorage.createOrUpdateUserQuest(userQuestData);
      res.status(201).json(userQuest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid user quest data", errors: error.errors });
      } else {
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/user-quests/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const userQuests = await dbStorage.getUserQuestsByUserId(userId);
      res.json(userQuests);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Activity tracking for achievements
  app.post("/api/activity/hadith-read", isAuthenticated, async (req, res) => {
    try {
      const { hadithId, collection } = req.body;
      const userId = (req as any).user.id;
      
      // Track hadith reading for achievements
      const newAchievements = await achievementService.onHadithRead(userId, collection);
      
      res.json({ 
        success: true,
        newAchievements: newAchievements.length > 0 ? newAchievements : undefined 
      });
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.post("/api/activity/dua-learned", isAuthenticated, async (req, res) => {
    try {
      const { duaId, category } = req.body;
      const userId = (req as any).user.id;
      
      // Track dua learning for achievements
      const newAchievements = await achievementService.onDuaLearned(userId, category);
      
      res.json({ 
        success: true,
        newAchievements: newAchievements.length > 0 ? newAchievements : undefined 
      });
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // OpenAI routes
  app.post("/api/ai/chat", getAIResponse);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
