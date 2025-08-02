import express, { type Express } from "express";
import { createServer, type Server } from "http";
import { PgStorage } from "./pg-storage";
import { insertAchievementSchema, insertReadingGoalSchema, insertReadingProgressSchema, insertStreakSchema, insertBookmarkSchema, insertReflectionSchema, insertQuestSchema, insertUserQuestSchema, insertHadithSchema, insertHadithBookmarkSchema } from "@shared/schema";
import { handleDbError } from "./db";
import { z } from "zod";
import { getAIResponse } from "./openai-routes";
import { setupAuth, isAuthenticated } from "./auth";
import { AchievementService } from "./achievement-service";
import cookieParser from "cookie-parser";
import path from "path";
import rateLimit from "express-rate-limit";

export async function registerRoutes(app: Express): Promise<Server> {
  // Set up middlewares
  app.use(cookieParser());
  
  // Set up authentication
  setupAuth(app);
  
  // Serve static files from public directory (must be before other routes)
  app.use(express.static(path.resolve(process.cwd(), 'public')));
  
  // Create PostgreSQL storage
  const pgStorage = new PgStorage();
  // Use pgStorage instead of in-memory storage for all routes
  const dbStorage = pgStorage;
  
  // Create achievement service
  const achievementService = new AchievementService(pgStorage);

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
      console.log("Received streak data:", JSON.stringify(req.body, null, 2));
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
        console.log("Streak validation errors:", JSON.stringify(error.errors, null, 2));
        res.status(400).json({ message: "Invalid streak data", errors: error.errors });
      } else {
        console.log("Streak database error:", error);
        res.status(500).json({ message: handleDbError(error) });
      }
    }
  });

  app.get("/api/streaks/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      let streak = await dbStorage.getStreakByUserId(userId);
      
      // If no streak exists, create a default one
      if (!streak) {
        const defaultStreakData = {
          userId,
          currentStreak: 0,
          longestStreak: 0,
          lastReadDate: undefined
        };
        streak = await dbStorage.createOrUpdateStreak(defaultStreakData);
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

  // Hadith API routes
  app.get("/api/hadiths/collection/:collection", async (req, res) => {
    try {
      const { collection } = req.params;
      const hadiths = await dbStorage.getHadithsByCollection(collection);
      res.json(hadiths);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/hadiths/volumes/:collection", async (req, res) => {
    try {
      const { collection } = req.params;
      const hadiths = await dbStorage.getHadithsByCollection(collection);
      const volumes = [...new Set(hadiths.map(h => h.volume))].sort((a, b) => a - b);
      res.json(volumes);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/hadiths/collection/:collection/volume/:volume", async (req, res) => {
    try {
      const { collection, volume } = req.params;
      const hadiths = await dbStorage.getHadithsByVolume(collection, parseInt(volume));
      res.json(hadiths);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/hadiths/collection/:collection/book/:book", async (req, res) => {
    try {
      const { collection, book } = req.params;
      const hadiths = await dbStorage.getHadithsByBook(collection, parseInt(book));
      res.json(hadiths);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/hadiths/:id", async (req, res) => {
    try {
      const { id } = req.params;
      const hadith = await dbStorage.getHadithById(id);
      if (!hadith) {
        return res.status(404).json({ message: "Hadith not found" });
      }
      res.json(hadith);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/hadiths/search", async (req, res) => {
    try {
      const { q } = req.query;
      if (!q || typeof q !== 'string') {
        return res.status(400).json({ message: "Search query required" });
      }
      const hadiths = await dbStorage.searchHadiths(q);
      res.json(hadiths);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.post("/api/hadith-bookmarks", isAuthenticated, async (req, res) => {
    try {
      const { hadithId } = req.body;
      const userId = (req as any).user.id;
      
      const bookmark = await dbStorage.createHadithBookmark({
        userId,
        hadithId
      });
      
      res.status(201).json(bookmark);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/hadith-bookmarks", isAuthenticated, async (req, res) => {
    try {
      const userId = (req as any).user.id;
      const bookmarks = await dbStorage.getHadithBookmarksByUserId(userId);
      res.json(bookmarks);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.delete("/api/hadith-bookmarks/:hadithId", isAuthenticated, async (req, res) => {
    try {
      const { hadithId } = req.params;
      const userId = (req as any).user.id;
      
      const deleted = await dbStorage.deleteHadithBookmark(userId, hadithId);
      if (!deleted) {
        return res.status(404).json({ message: "Bookmark not found" });
      }
      
      res.json({ message: "Bookmark deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // Initialize hadith data
  const initializeHadithData = async () => {
    try {
      const { BUKHARI_VOLUME_1 } = await import("./hadith-data");
      const { COMPLETE_HADITH_COLLECTION, NAWAWI_FORTY_HADITH, MUSLIM_HADITH_SAMPLE } = await import("./complete-hadith-data");
      console.log("Initializing hadith data...");
      
      // Check if hadiths are already loaded
      const existingHadiths = await dbStorage.getHadithsByCollection("bukhari");
      if (existingHadiths.length < 100) {
        // Load all Bukhari hadiths
        const allBukhariHadiths = [...BUKHARI_VOLUME_1, ...COMPLETE_HADITH_COLLECTION];
        for (const hadith of allBukhariHadiths) {
          try {
            await dbStorage.createHadith(hadith);
          } catch (err: unknown) {
            // Skip duplicate entries
            if (!(err instanceof Error) || !err.message.includes('duplicate')) {
              console.error(`Error loading hadith ${hadith.id}:`, err);
            }
          }
        }
        console.log(`Loaded ${allBukhariHadiths.length} Bukhari hadiths`);
        
        // Load Nawawi's Forty Hadith
        for (const hadith of NAWAWI_FORTY_HADITH) {
          try {
            await dbStorage.createHadith(hadith);
          } catch (err: unknown) {
            if (!(err instanceof Error) || !err.message.includes('duplicate')) {
              console.error(`Error loading Nawawi hadith ${hadith.id}:`, err);
            }
          }
        }
        console.log(`Loaded ${NAWAWI_FORTY_HADITH.length} Nawawi hadiths`);
        
        // Load Muslim hadith sample
        for (const hadith of MUSLIM_HADITH_SAMPLE) {
          try {
            await dbStorage.createHadith(hadith);
          } catch (err: unknown) {
            if (!(err instanceof Error) || !err.message.includes('duplicate')) {
              console.error(`Error loading Muslim hadith ${hadith.id}:`, err);
            }
          }
        }
        console.log(`Loaded ${MUSLIM_HADITH_SAMPLE.length} Muslim hadiths`);
      } else {
        console.log(`Found ${existingHadiths.length} existing hadiths in database`);
      }
    } catch (error) {
      console.error("Error initializing hadith data:", error);
    }
  };

  // Initialize hadith data on startup
  initializeHadithData();

  // Dua routes
  app.get("/api/duas", async (req, res) => {
    try {
      const { COMPLETE_DUA_COLLECTION } = await import("./complete-dua-collection");
      const { category } = req.query;
      
      let duas = COMPLETE_DUA_COLLECTION;
      if (category) {
        // Map category ID to actual category name
        const categoryMap: Record<string, string> = {
          'daily-routine': 'Daily Routine',
          'prayer': 'Prayer',
          'healing': 'Healing',
          'mental-health': 'Mental Health',
          'forgiveness': 'Forgiveness',
          'protection': 'Protection',
          'family': 'Family',
          'success': 'Success',
          'travel': 'Travel',
          'women-s-duas': 'Women\'s Duas',
          'morning-evening': 'Morning Evening',
          'quranic': 'Quranic',
          'special-occasions': 'Special Occasions'
        };
        const categoryName = categoryMap[category.toString()] || category.toString();
        duas = duas.filter(dua => dua.category === categoryName);
      }
      
      res.json(duas);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/duas/categories", async (req, res) => {
    try {
      const { DUA_CATEGORIES } = await import("./complete-dua-collection");
      res.json(DUA_CATEGORIES);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/duas/featured", async (req, res) => {
    try {
      const { COMPLETE_DUA_COLLECTION, FEATURED_DUAS } = await import("./complete-dua-collection");
      const featuredDuas = COMPLETE_DUA_COLLECTION.filter(dua => FEATURED_DUAS.includes(dua.id));
      res.json(featuredDuas);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  app.get("/api/duas/:id", async (req, res) => {
    try {
      const { COMPLETE_DUA_COLLECTION } = await import("./complete-dua-collection");
      const dua = COMPLETE_DUA_COLLECTION.find(d => d.id === req.params.id);
      
      if (!dua) {
        return res.status(404).json({ message: "Dua not found" });
      }
      
      res.json(dua);
    } catch (error) {
      res.status(500).json({ message: handleDbError(error) });
    }
  });

  // AI chat routes (authenticated users only).
  // Limited to 5 requests per minute per IP and messages up to 500 characters.
  const aiLimiter = rateLimit({ windowMs: 60 * 1000, max: 5 });
  app.post("/api/ai/chat", isAuthenticated, aiLimiter, getAIResponse);
  // Backwards compatibility for older clients that used /api/ai
  app.post("/api/ai", isAuthenticated, aiLimiter, getAIResponse);

  // Create HTTP server
  const httpServer = createServer(app);

  return httpServer;
}
