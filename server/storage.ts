import { 
  users, 
  type User, type InsertUser, 
  type ReadingProgress, type InsertReadingProgress, 
  type Streak, type InsertStreak, 
  type Achievement, type InsertAchievement, 
  type ReadingGoal, type InsertReadingGoal,
  type Bookmark, type InsertBookmark,
  type Reflection, type InsertReflection,
  type Quest, type InsertQuest,
  type UserQuest, type InsertUserQuest,
  type Hadith, type InsertHadith,
  type HadithBookmark, type InsertHadithBookmark
} from "@shared/schema";

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
  createBookmark(bookmark: InsertBookmark): Promise<Bookmark>;
  getBookmarksByUserId(userId: number): Promise<Bookmark[]>;
  deleteBookmark(id: number): Promise<boolean>;
  createReflection(reflection: InsertReflection): Promise<Reflection>;
  getReflectionsByUserId(userId: number): Promise<Reflection[]>;
  updateReflection(id: number, reflection: Partial<InsertReflection>): Promise<Reflection | undefined>;
  deleteReflection(id: number): Promise<boolean>;
  createQuest(quest: InsertQuest): Promise<Quest>;
  getActiveQuests(): Promise<Quest[]>;
  getQuestById(id: number): Promise<Quest | undefined>;
  createOrUpdateUserQuest(userQuest: InsertUserQuest): Promise<UserQuest>;
  getUserQuestsByUserId(userId: number): Promise<UserQuest[]>;
  
  // Hadith operations
  createHadith(hadith: InsertHadith): Promise<Hadith>;
  getHadithById(id: string): Promise<Hadith | undefined>;
  getHadithsByCollection(collection: string): Promise<Hadith[]>;
  getHadithsByVolume(collection: string, volume: number): Promise<Hadith[]>;
  getHadithsByBook(collection: string, book: number): Promise<Hadith[]>;
  searchHadiths(query: string): Promise<Hadith[]>;
  createHadithBookmark(bookmark: InsertHadithBookmark): Promise<HadithBookmark>;
  getHadithBookmarksByUserId(userId: number): Promise<HadithBookmark[]>;
  deleteHadithBookmark(userId: number, hadithId: string): Promise<boolean>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private readingProgress: Map<number, ReadingProgress[]>;
  private streaks: Map<number, Streak>;
  private achievements: Map<number, Achievement[]>;
  private readingGoals: Map<number, ReadingGoal>;
  private bookmarks: Map<number, Bookmark>;
  private reflections: Map<number, Reflection>;
  private quests: Map<number, Quest>;
  private userQuests: Map<number, UserQuest[]>;
  private hadiths: Map<string, Hadith>;
  private hadithBookmarks: Map<number, HadithBookmark[]>;
  
  currentId: number;
  currentProgressId: number;
  currentAchievementId: number;
  currentGoalId: number;
  currentBookmarkId: number;
  currentReflectionId: number;
  currentQuestId: number;
  currentUserQuestId: number;
  currentHadithBookmarkId: number;

  constructor() {
    this.users = new Map();
    this.readingProgress = new Map();
    this.streaks = new Map();
    this.achievements = new Map();
    this.readingGoals = new Map();
    this.bookmarks = new Map();
    this.reflections = new Map();
    this.quests = new Map();
    this.userQuests = new Map();
    this.hadiths = new Map();
    this.hadithBookmarks = new Map();
    
    this.currentId = 1;
    this.currentProgressId = 1;
    this.currentAchievementId = 1;
    this.currentGoalId = 1;
    this.currentBookmarkId = 1;
    this.currentReflectionId = 1;
    this.currentQuestId = 1;
    this.currentUserQuestId = 1;
    this.currentHadithBookmarkId = 1;
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
      createdAt: new Date(),
      level: insertUser.level || 1,
      xp: insertUser.xp || 0,
      points: insertUser.points || 0,
      avatarUrl: insertUser.avatarUrl || null,
      lastActive: null,
      preferences: insertUser.preferences || null
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

  // Bookmark methods
  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const id = this.currentBookmarkId++;
    const newBookmark: Bookmark = {
      id,
      userId: bookmark.userId,
      surahId: bookmark.surahId,
      ayahNumber: bookmark.ayahNumber,
      note: bookmark.note || null,
      color: bookmark.color || null,
      createdAt: new Date()
    };
    
    this.bookmarks.set(id, newBookmark);
    return newBookmark;
  }

  async getBookmarksByUserId(userId: number): Promise<Bookmark[]> {
    return Array.from(this.bookmarks.values()).filter(
      bookmark => bookmark.userId === userId
    );
  }

  async deleteBookmark(id: number): Promise<boolean> {
    return this.bookmarks.delete(id);
  }

  // Reflection methods
  async createReflection(reflection: InsertReflection): Promise<Reflection> {
    const id = this.currentReflectionId++;
    const newReflection: Reflection = {
      id,
      userId: reflection.userId,
      surahId: reflection.surahId || null,
      ayahNumber: reflection.ayahNumber || null,
      title: reflection.title || null,
      content: reflection.content,
      isPrivate: reflection.isPrivate !== undefined ? reflection.isPrivate : true,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    
    this.reflections.set(id, newReflection);
    return newReflection;
  }

  async getReflectionsByUserId(userId: number): Promise<Reflection[]> {
    return Array.from(this.reflections.values()).filter(
      reflection => reflection.userId === userId
    );
  }

  async updateReflection(id: number, reflection: Partial<InsertReflection>): Promise<Reflection | undefined> {
    const existingReflection = this.reflections.get(id);
    
    if (!existingReflection) {
      return undefined;
    }
    
    const updatedReflection: Reflection = {
      ...existingReflection,
      surahId: reflection.surahId !== undefined ? reflection.surahId : existingReflection.surahId,
      ayahNumber: reflection.ayahNumber !== undefined ? reflection.ayahNumber : existingReflection.ayahNumber,
      title: reflection.title !== undefined ? reflection.title : existingReflection.title,
      content: reflection.content || existingReflection.content,
      isPrivate: reflection.isPrivate !== undefined ? reflection.isPrivate : existingReflection.isPrivate,
      updatedAt: new Date()
    };
    
    this.reflections.set(id, updatedReflection);
    return updatedReflection;
  }

  async deleteReflection(id: number): Promise<boolean> {
    return this.reflections.delete(id);
  }

  // Quest methods
  async createQuest(quest: InsertQuest): Promise<Quest> {
    const id = this.currentQuestId++;
    const newQuest: Quest = {
      id,
      title: quest.title,
      description: quest.description,
      type: quest.type,
      requiredAction: quest.requiredAction,
      targetValue: quest.targetValue,
      rewardXp: quest.rewardXp,
      rewardPoints: quest.rewardPoints,
      isActive: quest.isActive !== undefined ? quest.isActive : true
    };
    
    this.quests.set(id, newQuest);
    return newQuest;
  }

  async getActiveQuests(): Promise<Quest[]> {
    return Array.from(this.quests.values()).filter(quest => quest.isActive);
  }

  async getQuestById(id: number): Promise<Quest | undefined> {
    return this.quests.get(id);
  }

  // User Quest methods
  async createOrUpdateUserQuest(userQuest: InsertUserQuest): Promise<UserQuest> {
    // Get existing user quests
    const userQuestList = this.userQuests.get(userQuest.userId) || [];
    
    // Find if this user has this quest already
    const existingQuestIndex = userQuestList.findIndex(
      q => q.questId === userQuest.questId
    );
    
    if (existingQuestIndex !== -1) {
      // Update existing user quest
      const existingUserQuest = userQuestList[existingQuestIndex];
      const updatedUserQuest: UserQuest = {
        ...existingUserQuest,
        progress: userQuest.progress !== undefined ? userQuest.progress : existingUserQuest.progress,
        completed: userQuest.completed !== undefined ? userQuest.completed : existingUserQuest.completed,
        completedAt: userQuest.completedAt !== undefined ? userQuest.completedAt : existingUserQuest.completedAt,
        updatedAt: new Date()
      };
      
      userQuestList[existingQuestIndex] = updatedUserQuest;
      this.userQuests.set(userQuest.userId, userQuestList);
      return updatedUserQuest;
    } else {
      // Create new user quest
      const id = this.currentUserQuestId++;
      const newUserQuest: UserQuest = {
        id,
        userId: userQuest.userId,
        questId: userQuest.questId,
        progress: userQuest.progress || 0,
        completed: userQuest.completed || false,
        completedAt: userQuest.completedAt || null,
        updatedAt: new Date()
      };
      
      userQuestList.push(newUserQuest);
      this.userQuests.set(userQuest.userId, userQuestList);
      return newUserQuest;
    }
  }

  async getUserQuestsByUserId(userId: number): Promise<UserQuest[]> {
    return this.userQuests.get(userId) || [];
  }

  // Hadith operations
  async createHadith(hadith: InsertHadith): Promise<Hadith> {
    const newHadith: Hadith = {
      ...hadith,
      createdAt: new Date()
    };
    this.hadiths.set(hadith.id, newHadith);
    return newHadith;
  }

  async getHadithById(id: string): Promise<Hadith | undefined> {
    return this.hadiths.get(id);
  }

  async getHadithsByCollection(collection: string): Promise<Hadith[]> {
    return Array.from(this.hadiths.values()).filter(h => h.collection === collection);
  }

  async getHadithsByVolume(collection: string, volume: number): Promise<Hadith[]> {
    return Array.from(this.hadiths.values()).filter(h => 
      h.collection === collection && h.volume === volume
    );
  }

  async getHadithsByBook(collection: string, book: number): Promise<Hadith[]> {
    return Array.from(this.hadiths.values()).filter(h => 
      h.collection === collection && h.book === book
    );
  }

  async searchHadiths(query: string): Promise<Hadith[]> {
    const searchTerm = query.toLowerCase();
    return Array.from(this.hadiths.values()).filter(h => 
      h.englishText.toLowerCase().includes(searchTerm) ||
      h.arabicText?.toLowerCase().includes(searchTerm) ||
      h.narrator.toLowerCase().includes(searchTerm) ||
      h.bookTitle.toLowerCase().includes(searchTerm) ||
      h.tags?.some(tag => tag.toLowerCase().includes(searchTerm))
    );
  }

  async createHadithBookmark(bookmark: InsertHadithBookmark): Promise<HadithBookmark> {
    const id = this.currentHadithBookmarkId++;
    const newBookmark: HadithBookmark = {
      ...bookmark,
      id,
      createdAt: new Date()
    };
    
    const userBookmarks = this.hadithBookmarks.get(bookmark.userId) || [];
    userBookmarks.push(newBookmark);
    this.hadithBookmarks.set(bookmark.userId, userBookmarks);
    
    return newBookmark;
  }

  async getHadithBookmarksByUserId(userId: number): Promise<HadithBookmark[]> {
    return this.hadithBookmarks.get(userId) || [];
  }

  async deleteHadithBookmark(userId: number, hadithId: string): Promise<boolean> {
    const userBookmarks = this.hadithBookmarks.get(userId) || [];
    const bookmarkIndex = userBookmarks.findIndex(b => b.hadithId === hadithId);
    
    if (bookmarkIndex >= 0) {
      userBookmarks.splice(bookmarkIndex, 1);
      this.hadithBookmarks.set(userId, userBookmarks);
      return true;
    }
    
    return false;
  }
}

export const storage = new MemStorage();
