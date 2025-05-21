import { IStorage } from "./storage";
import { db } from "./db";
import { eq, and, desc } from "drizzle-orm";
import { 
  users, type User, type InsertUser, 
  readingProgress, type ReadingProgress, type InsertReadingProgress, 
  streaks, type Streak, type InsertStreak, 
  achievements, type Achievement, type InsertAchievement, 
  readingGoals, type ReadingGoal, type InsertReadingGoal,
  bookmarks, type Bookmark, type InsertBookmark,
  reflections, type Reflection, type InsertReflection,
  quests, type Quest, type InsertQuest,
  userQuests, type UserQuest, type InsertUserQuest
} from "@shared/schema";

export class PgStorage implements IStorage {
  // User methods
  async getUser(id: number): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.id, id));
    return result[0];
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.username, username));
    return result[0];
  }

  async createUser(user: InsertUser): Promise<User> {
    const result = await db.insert(users).values(user).returning();
    return result[0];
  }

  // Reading Progress methods
  async createOrUpdateReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress> {
    // Check if progress already exists for this user and surah
    const existingProgress = await db
      .select()
      .from(readingProgress)
      .where(
        and(
          eq(readingProgress.userId, progress.userId),
          eq(readingProgress.surahId, progress.surahId)
        )
      );

    if (existingProgress.length > 0) {
      // Update existing progress
      const result = await db
        .update(readingProgress)
        .set({
          lastReadAyah: progress.lastReadAyah,
          lastReadDate: new Date(),
          isCompleted: progress.isCompleted
        })
        .where(eq(readingProgress.id, existingProgress[0].id))
        .returning();
      return result[0];
    } else {
      // Create new progress
      const newProgress = {
        ...progress,
        lastReadDate: new Date()
      };
      const result = await db
        .insert(readingProgress)
        .values(newProgress)
        .returning();
      return result[0];
    }
  }

  async getReadingProgressByUserId(userId: number): Promise<ReadingProgress[]> {
    return db
      .select()
      .from(readingProgress)
      .where(eq(readingProgress.userId, userId));
  }

  // Streak methods
  async createOrUpdateStreak(streak: InsertStreak): Promise<Streak> {
    const existingStreak = await db
      .select()
      .from(streaks)
      .where(eq(streaks.userId, streak.userId));

    if (existingStreak.length > 0) {
      // Update existing streak
      const result = await db
        .update(streaks)
        .set({
          currentStreak: streak.currentStreak ?? existingStreak[0].currentStreak,
          longestStreak: streak.longestStreak ?? existingStreak[0].longestStreak,
          lastReadDate: streak.lastReadDate
        })
        .where(eq(streaks.id, existingStreak[0].id))
        .returning();
      return result[0];
    } else {
      // Create new streak
      const result = await db.insert(streaks).values(streak).returning();
      return result[0];
    }
  }

  async getStreakByUserId(userId: number): Promise<Streak | undefined> {
    const result = await db
      .select()
      .from(streaks)
      .where(eq(streaks.userId, userId));
    return result[0];
  }

  // Achievement methods
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const result = await db.insert(achievements).values(achievement).returning();
    return result[0];
  }

  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return db
      .select()
      .from(achievements)
      .where(eq(achievements.userId, userId));
  }

  // Reading Goal methods
  async createOrUpdateReadingGoal(goal: InsertReadingGoal): Promise<ReadingGoal> {
    const existingGoal = await db
      .select()
      .from(readingGoals)
      .where(eq(readingGoals.userId, goal.userId));

    if (existingGoal.length > 0) {
      // Update existing goal
      const result = await db
        .update(readingGoals)
        .set({
          dailyGoal: goal.dailyGoal ?? existingGoal[0].dailyGoal,
          isActive: goal.isActive ?? existingGoal[0].isActive
        })
        .where(eq(readingGoals.id, existingGoal[0].id))
        .returning();
      return result[0];
    } else {
      // Create new goal
      const result = await db.insert(readingGoals).values(goal).returning();
      return result[0];
    }
  }

  async getReadingGoalByUserId(userId: number): Promise<ReadingGoal | undefined> {
    const result = await db
      .select()
      .from(readingGoals)
      .where(eq(readingGoals.userId, userId));
    return result[0];
  }

  // Bookmark methods
  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const result = await db.insert(bookmarks).values(bookmark).returning();
    return result[0];
  }

  async getBookmarksByUserId(userId: number): Promise<Bookmark[]> {
    return db
      .select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId));
  }

  async deleteBookmark(id: number): Promise<boolean> {
    const result = await db
      .delete(bookmarks)
      .where(eq(bookmarks.id, id))
      .returning({ id: bookmarks.id });
    return result.length > 0;
  }

  // Reflection methods
  async createReflection(reflection: InsertReflection): Promise<Reflection> {
    const result = await db
      .insert(reflections)
      .values({
        ...reflection,
        createdAt: new Date(),
        updatedAt: new Date()
      })
      .returning();
    return result[0];
  }

  async getReflectionsByUserId(userId: number): Promise<Reflection[]> {
    return db
      .select()
      .from(reflections)
      .where(eq(reflections.userId, userId))
      .orderBy(desc(reflections.createdAt));
  }

  async updateReflection(id: number, reflection: Partial<InsertReflection>): Promise<Reflection | undefined> {
    const result = await db
      .update(reflections)
      .set({
        ...reflection,
        updatedAt: new Date()
      })
      .where(eq(reflections.id, id))
      .returning();
    return result[0];
  }

  async deleteReflection(id: number): Promise<boolean> {
    const result = await db
      .delete(reflections)
      .where(eq(reflections.id, id))
      .returning({ id: reflections.id });
    return result.length > 0;
  }

  // Quest methods
  async createQuest(quest: InsertQuest): Promise<Quest> {
    const result = await db.insert(quests).values(quest).returning();
    return result[0];
  }

  async getActiveQuests(): Promise<Quest[]> {
    return db
      .select()
      .from(quests)
      .where(eq(quests.isActive, true));
  }

  async getQuestById(id: number): Promise<Quest | undefined> {
    const result = await db
      .select()
      .from(quests)
      .where(eq(quests.id, id));
    return result[0];
  }

  // UserQuest methods
  async createOrUpdateUserQuest(userQuest: InsertUserQuest): Promise<UserQuest> {
    const existingUserQuest = await db
      .select()
      .from(userQuests)
      .where(
        and(
          eq(userQuests.userId, userQuest.userId),
          eq(userQuests.questId, userQuest.questId)
        )
      );

    if (existingUserQuest.length > 0) {
      // Update existing user quest
      const result = await db
        .update(userQuests)
        .set({
          progress: userQuest.progress ?? existingUserQuest[0].progress,
          completed: userQuest.completed ?? existingUserQuest[0].completed,
          completedAt: userQuest.completedAt,
          updatedAt: new Date()
        })
        .where(eq(userQuests.id, existingUserQuest[0].id))
        .returning();
      return result[0];
    } else {
      // Create new user quest
      const result = await db
        .insert(userQuests)
        .values({
          ...userQuest,
          updatedAt: new Date()
        })
        .returning();
      return result[0];
    }
  }

  async getUserQuestsByUserId(userId: number): Promise<UserQuest[]> {
    return db
      .select()
      .from(userQuests)
      .where(eq(userQuests.userId, userId));
  }
}