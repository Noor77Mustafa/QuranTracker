import { users, type User, type InsertUser, type ReadingProgress, type InsertReadingProgress, type Streak, type InsertStreak, type Achievement, type InsertAchievement, type ReadingGoal, type InsertReadingGoal } from "@shared/schema";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createOrUpdateReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress>;
  getReadingProgressByUserId(userId: number): Promise<ReadingProgress[]>;
  createOrUpdateStreak(streak: InsertStreak): Promise<Streak>;
  getStreakByUserId(userId: number): Promise<Streak | undefined>;
  createAchievement(achievement: InsertAchievement): Promise<Achievement>;
  getAchievementsByUserId(userId: number): Promise<Achievement[]>;
  createOrUpdateReadingGoal(goal: InsertReadingGoal): Promise<ReadingGoal>;
  getReadingGoalByUserId(userId: number): Promise<ReadingGoal | undefined>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private readingProgress: Map<number, ReadingProgress[]>;
  private streaks: Map<number, Streak>;
  private achievements: Map<number, Achievement[]>;
  private readingGoals: Map<number, ReadingGoal>;
  currentId: number;
  currentProgressId: number;
  currentAchievementId: number;
  currentGoalId: number;

  constructor() {
    this.users = new Map();
    this.readingProgress = new Map();
    this.streaks = new Map();
    this.achievements = new Map();
    this.readingGoals = new Map();
    this.currentId = 1;
    this.currentProgressId = 1;
    this.currentAchievementId = 1;
    this.currentGoalId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { 
      ...insertUser, 
      id,
      displayName: insertUser.displayName || null,
      email: insertUser.email || null,
      createdAt: new Date() 
    };
    this.users.set(id, user);
    return user;
  }

  async createOrUpdateReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress> {
    // Get existing progress for this user
    const userProgress = this.readingProgress.get(progress.userId) || [];
    
    // Check if there's existing progress for this surah
    const existingProgressIndex = userProgress.findIndex(p => p.surahId === progress.surahId);
    
    if (existingProgressIndex >= 0) {
      // Update existing progress
      const existingProgress = userProgress[existingProgressIndex];
      const updatedProgress: ReadingProgress = {
        ...existingProgress,
        ...progress,
        lastReadDate: new Date()
      };
      userProgress[existingProgressIndex] = updatedProgress;
      this.readingProgress.set(progress.userId, userProgress);
      return updatedProgress;
    } else {
      // Create new progress
      const newProgress: ReadingProgress = {
        id: this.currentProgressId++,
        userId: progress.userId,
        surahId: progress.surahId,
        lastReadAyah: progress.lastReadAyah,
        lastReadDate: new Date(),
        isCompleted: progress.isCompleted ?? false
      };
      userProgress.push(newProgress);
      this.readingProgress.set(progress.userId, userProgress);
      return newProgress;
    }
  }

  async getReadingProgressByUserId(userId: number): Promise<ReadingProgress[]> {
    return this.readingProgress.get(userId) || [];
  }

  async createOrUpdateStreak(streak: InsertStreak): Promise<Streak> {
    const existingStreak = this.streaks.get(streak.userId);
    
    if (existingStreak) {
      // Update existing streak
      const updatedStreak: Streak = {
        ...existingStreak,
        userId: streak.userId,
        currentStreak: streak.currentStreak ?? existingStreak.currentStreak,
        longestStreak: streak.longestStreak ?? existingStreak.longestStreak,
        lastReadDate: streak.lastReadDate !== undefined ? streak.lastReadDate : existingStreak.lastReadDate
      };
      this.streaks.set(streak.userId, updatedStreak);
      return updatedStreak;
    } else {
      // Create new streak
      const newStreak: Streak = {
        id: this.currentId++,
        userId: streak.userId,
        currentStreak: streak.currentStreak ?? 0,
        longestStreak: streak.longestStreak ?? 0,
        lastReadDate: streak.lastReadDate || null
      };
      this.streaks.set(streak.userId, newStreak);
      return newStreak;
    }
  }

  async getStreakByUserId(userId: number): Promise<Streak | undefined> {
    return this.streaks.get(userId);
  }

  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    // Get existing achievements for this user
    const userAchievements = this.achievements.get(achievement.userId) || [];
    
    // Check if user already has this achievement
    const existingAchievement = userAchievements.find(a => a.achievementId === achievement.achievementId);
    
    if (existingAchievement) {
      return existingAchievement;
    }
    
    // Create new achievement
    const newAchievement: Achievement = {
      id: this.currentAchievementId++,
      ...achievement,
      unlockedAt: new Date()
    };
    
    userAchievements.push(newAchievement);
    this.achievements.set(achievement.userId, userAchievements);
    return newAchievement;
  }

  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return this.achievements.get(userId) || [];
  }

  async createOrUpdateReadingGoal(goal: InsertReadingGoal): Promise<ReadingGoal> {
    const existingGoal = this.readingGoals.get(goal.userId);
    
    if (existingGoal) {
      // Update existing goal
      const updatedGoal: ReadingGoal = {
        ...existingGoal,
        userId: goal.userId,
        dailyGoal: goal.dailyGoal ?? existingGoal.dailyGoal,
        isActive: goal.isActive ?? existingGoal.isActive
      };
      this.readingGoals.set(goal.userId, updatedGoal);
      return updatedGoal;
    } else {
      // Create new goal
      const newGoal: ReadingGoal = {
        id: this.currentGoalId++,
        userId: goal.userId,
        dailyGoal: goal.dailyGoal ?? 1,
        isActive: goal.isActive ?? true
      };
      this.readingGoals.set(goal.userId, newGoal);
      return newGoal;
    }
  }

  async getReadingGoalByUserId(userId: number): Promise<ReadingGoal | undefined> {
    return this.readingGoals.get(userId);
  }
}

export const storage = new MemStorage();
