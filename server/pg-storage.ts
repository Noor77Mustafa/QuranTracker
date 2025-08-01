import { db } from "./db";
import { IStorage } from "./storage";
import { 
  User, InsertUser, ReadingProgress, InsertReadingProgress, 
  Streak, InsertStreak, Achievement, InsertAchievement,
  ReadingGoal, InsertReadingGoal, Bookmark, InsertBookmark,
  Reflection, InsertReflection, Quest, InsertQuest, UserQuest, 
  InsertUserQuest, Hadith, InsertHadith, HadithBookmark, InsertHadithBookmark
} from "@shared/schema";
import { and, eq, like, or, asc } from "drizzle-orm";
import { 
  users, readingProgress, streaks, achievements, 
  readingGoals, bookmarks, reflections, quests, userQuests,
  hadiths, hadithBookmarks
} from "@shared/schema";

export class PgStorage implements IStorage {
  // User operations
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user;
  }

  async createUser(user: InsertUser): Promise<User> {
    const [newUser] = await db.insert(users).values(user).returning();
    return newUser;
  }

  async updateUser(id: number, user: Partial<User>): Promise<User | undefined> {
    const [updated] = await db.update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning();
    return updated;
  }

  // Reading progress operations
  async createOrUpdateReadingProgress(progress: InsertReadingProgress): Promise<ReadingProgress> {
    const { userId, surahId } = progress;
    const existingProgress = await db.select().from(readingProgress).where(
      and(
        eq(readingProgress.userId, userId),
        eq(readingProgress.surahId, surahId)
      )
    );

    if (existingProgress.length > 0) {
      const [updated] = await db.update(readingProgress)
        .set(progress)
        .where(eq(readingProgress.id, existingProgress[0].id))
        .returning();
      return updated;
    }

    const [newProgress] = await db.insert(readingProgress)
      .values(progress)
      .returning();
    return newProgress;
  }

  async getReadingProgressByUserId(userId: number): Promise<ReadingProgress[]> {
    return db.select()
      .from(readingProgress)
      .where(eq(readingProgress.userId, userId));
  }

  // Streak operations
  async createOrUpdateStreak(streak: InsertStreak): Promise<Streak> {
    const existingStreak = await db.select()
      .from(streaks)
      .where(eq(streaks.userId, streak.userId));

    if (existingStreak.length > 0) {
      const [updated] = await db.update(streaks)
        .set(streak)
        .where(eq(streaks.id, existingStreak[0].id))
        .returning();
      return updated;
    }

    const [newStreak] = await db.insert(streaks)
      .values(streak)
      .returning();
    return newStreak;
  }

  async getStreakByUserId(userId: number): Promise<Streak | undefined> {
    const [streak] = await db.select()
      .from(streaks)
      .where(eq(streaks.userId, userId));
    return streak;
  }

  // Achievement operations
  async createAchievement(achievement: InsertAchievement): Promise<Achievement> {
    const [newAchievement] = await db.insert(achievements)
      .values(achievement)
      .returning();
    return newAchievement;
  }

  async getAchievementsByUserId(userId: number): Promise<Achievement[]> {
    return db.select()
      .from(achievements)
      .where(eq(achievements.userId, userId));
  }

  // Reading goal operations
  async createOrUpdateReadingGoal(goal: InsertReadingGoal): Promise<ReadingGoal> {
    const existingGoal = await db.select()
      .from(readingGoals)
      .where(eq(readingGoals.userId, goal.userId));

    if (existingGoal.length > 0) {
      const [updated] = await db.update(readingGoals)
        .set(goal)
        .where(eq(readingGoals.id, existingGoal[0].id))
        .returning();
      return updated;
    }

    const [newGoal] = await db.insert(readingGoals)
      .values(goal)
      .returning();
    return newGoal;
  }

  async getReadingGoalByUserId(userId: number): Promise<ReadingGoal | undefined> {
    const [goal] = await db.select()
      .from(readingGoals)
      .where(eq(readingGoals.userId, userId));
    return goal;
  }

  // Bookmark operations
  async createBookmark(bookmark: InsertBookmark): Promise<Bookmark> {
    const [newBookmark] = await db.insert(bookmarks)
      .values(bookmark)
      .returning();
    return newBookmark;
  }

  async getBookmarksByUserId(userId: number): Promise<Bookmark[]> {
    return db.select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId));
  }

  async deleteBookmark(id: number): Promise<boolean> {
    const result = await db.delete(bookmarks)
      .where(eq(bookmarks.id, id))
      .returning();
    return result.length > 0;
  }

  // Reflection operations
  async createReflection(reflection: InsertReflection): Promise<Reflection> {
    const [newReflection] = await db.insert(reflections)
      .values(reflection)
      .returning();
    return newReflection;
  }

  async getReflectionsByUserId(userId: number): Promise<Reflection[]> {
    return db.select()
      .from(reflections)
      .where(eq(reflections.userId, userId));
  }

  async updateReflection(id: number, reflection: Partial<InsertReflection>): Promise<Reflection | undefined> {
    const [updated] = await db.update(reflections)
      .set(reflection)
      .where(eq(reflections.id, id))
      .returning();
    return updated;
  }

  async deleteReflection(id: number): Promise<boolean> {
    const result = await db.delete(reflections)
      .where(eq(reflections.id, id))
      .returning();
    return result.length > 0;
  }

  // Quest operations
  async createQuest(quest: InsertQuest): Promise<Quest> {
    const [newQuest] = await db.insert(quests)
      .values(quest)
      .returning();
    return newQuest;
  }

  async getActiveQuests(): Promise<Quest[]> {
    return db.select()
      .from(quests)
      .where(eq(quests.isActive, true));
  }

  async getQuestById(id: number): Promise<Quest | undefined> {
    const [quest] = await db.select()
      .from(quests)
      .where(eq(quests.id, id));
    return quest;
  }

  // User quest operations
  async createOrUpdateUserQuest(userQuest: InsertUserQuest): Promise<UserQuest> {
    const existingUserQuest = await db.select().from(userQuests).where(
      and(
        eq(userQuests.userId, userQuest.userId),
        eq(userQuests.questId, userQuest.questId)
      )
    );

    if (existingUserQuest.length > 0) {
      const [updated] = await db.update(userQuests)
        .set(userQuest)
        .where(eq(userQuests.id, existingUserQuest[0].id))
        .returning();
      return updated;
    }

    const [newUserQuest] = await db.insert(userQuests)
      .values(userQuest)
      .returning();
    return newUserQuest;
  }

  async getUserQuestsByUserId(userId: number): Promise<UserQuest[]> {
    return db.select()
      .from(userQuests)
      .where(eq(userQuests.userId, userId));
  }

  // Hadith operations
  async createHadith(hadith: InsertHadith): Promise<Hadith> {
    const [newHadith] = await db.insert(hadiths)
      .values(hadith)
      .returning();
    return newHadith;
  }

  async getHadithById(id: string): Promise<Hadith | undefined> {
    const [hadith] = await db.select()
      .from(hadiths)
      .where(eq(hadiths.id, id));
    return hadith;
  }

  async getHadithsByCollection(collection: string): Promise<Hadith[]> {
    return db.select()
      .from(hadiths)
      .where(eq(hadiths.collection, collection))
      .orderBy(
        asc(hadiths.volume),
        asc(hadiths.book),
        asc(hadiths.hadithNumber)
      );
  }

  async getHadithsByVolume(collection: string, volume: number): Promise<Hadith[]> {
    return db.select()
      .from(hadiths)
      .where(
        and(
          eq(hadiths.collection, collection),
          eq(hadiths.volume, volume)
        )
      )
      .orderBy(
        asc(hadiths.book),
        asc(hadiths.hadithNumber)
      );
  }

  async getHadithsByBook(collection: string, book: number): Promise<Hadith[]> {
    return db.select()
      .from(hadiths)
      .where(
        and(
          eq(hadiths.collection, collection),
          eq(hadiths.book, book)
        )
      )
      .orderBy(asc(hadiths.hadithNumber));
  }

  async searchHadiths(query: string): Promise<Hadith[]> {
    const searchTerm = `%${query}%`;
    return db.select()
      .from(hadiths)
      .where(
        or(
          like(hadiths.englishText, searchTerm),
          like(hadiths.arabicText, searchTerm),
          like(hadiths.narrator, searchTerm),
          like(hadiths.bookTitle, searchTerm)
        )
      );
  }

  async createHadithBookmark(bookmark: InsertHadithBookmark): Promise<HadithBookmark> {
    const [newBookmark] = await db.insert(hadithBookmarks)
      .values(bookmark)
      .returning();
    return newBookmark;
  }

  async getHadithBookmarksByUserId(userId: number): Promise<HadithBookmark[]> {
    return db.select()
      .from(hadithBookmarks)
      .where(eq(hadithBookmarks.userId, userId));
  }

  async deleteHadithBookmark(userId: number, hadithId: string): Promise<boolean> {
    const result = await db.delete(hadithBookmarks)
      .where(
        and(
          eq(hadithBookmarks.userId, userId),
          eq(hadithBookmarks.hadithId, hadithId)
        )
      )
      .returning();
    
    return result.length > 0;
  }
}