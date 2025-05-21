import { pgTable, text, serial, integer, boolean, timestamp, json } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  displayName: text("display_name"),
  email: text("email"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  level: integer("level").default(1).notNull(),
  xp: integer("xp").default(0).notNull(),
  points: integer("points").default(0).notNull(),
  avatarUrl: text("avatar_url"),
  lastActive: timestamp("last_active"),
  preferences: json("preferences").$type<{
    theme: string;
    fontSizeArabic: number;
    fontSizeTranslation: number;
    reciter: string;
    translationSource: string;
    showTajweed: boolean;
  }>(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
  level: true,
  xp: true,
  points: true,
  avatarUrl: true,
  preferences: true,
});

export const readingProgress = pgTable("reading_progress", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  surahId: integer("surah_id").notNull(),
  lastReadAyah: integer("last_read_ayah").notNull(),
  lastReadDate: timestamp("last_read_date").defaultNow().notNull(),
  isCompleted: boolean("is_completed").default(false).notNull(),
});

export const insertReadingProgressSchema = createInsertSchema(readingProgress).pick({
  userId: true,
  surahId: true,
  lastReadAyah: true,
  isCompleted: true,
});

export const streaks = pgTable("streaks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  currentStreak: integer("current_streak").default(0).notNull(),
  longestStreak: integer("longest_streak").default(0).notNull(),
  lastReadDate: timestamp("last_read_date"),
});

export const insertStreakSchema = createInsertSchema(streaks).pick({
  userId: true,
  currentStreak: true,
  longestStreak: true,
  lastReadDate: true,
});

export const achievements = pgTable("achievements", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  achievementId: text("achievement_id").notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

export const insertAchievementSchema = createInsertSchema(achievements).pick({
  userId: true,
  achievementId: true,
});

export const readingGoals = pgTable("reading_goals", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  dailyGoal: integer("daily_goal").default(1).notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertReadingGoalSchema = createInsertSchema(readingGoals).pick({
  userId: true,
  dailyGoal: true,
  isActive: true,
});

// Quests for gamification
export const quests = pgTable("quests", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  type: text("type").notNull(), // daily, weekly, monthly
  requiredAction: text("required_action").notNull(), // read, listen, complete_surah, etc.
  targetValue: integer("target_value").notNull(), // e.g. 5 ayahs, 1 surah
  rewardXp: integer("reward_xp").notNull(),
  rewardPoints: integer("reward_points").notNull(),
  isActive: boolean("is_active").default(true).notNull(),
});

export const insertQuestSchema = createInsertSchema(quests).pick({
  title: true,
  description: true,
  type: true,
  requiredAction: true,
  targetValue: true,
  rewardXp: true,
  rewardPoints: true,
  isActive: true,
});

// User quest progress
export const userQuests = pgTable("user_quests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  questId: integer("quest_id").notNull().references(() => quests.id),
  progress: integer("progress").default(0).notNull(),
  completed: boolean("completed").default(false).notNull(),
  completedAt: timestamp("completed_at"),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertUserQuestSchema = createInsertSchema(userQuests).pick({
  userId: true,
  questId: true,
  progress: true,
  completed: true,
  completedAt: true,
});

// Bookmarks for saving favorite verses
export const bookmarks = pgTable("bookmarks", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  surahId: integer("surah_id").notNull(),
  ayahNumber: integer("ayah_number").notNull(),
  note: text("note"),
  color: text("color"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const insertBookmarkSchema = createInsertSchema(bookmarks).pick({
  userId: true,
  surahId: true,
  ayahNumber: true,
  note: true,
  color: true,
});

// Journal entries for reflections
export const reflections = pgTable("reflections", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  surahId: integer("surah_id"),
  ayahNumber: integer("ayah_number"),
  title: text("title"),
  content: text("content").notNull(),
  isPrivate: boolean("is_private").default(true).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const insertReflectionSchema = createInsertSchema(reflections).pick({
  userId: true,
  surahId: true,
  ayahNumber: true,
  title: true,
  content: true,
  isPrivate: true,
});

export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;
export type ReadingProgress = typeof readingProgress.$inferSelect;
export type InsertReadingProgress = z.infer<typeof insertReadingProgressSchema>;
export type Streak = typeof streaks.$inferSelect;
export type InsertStreak = z.infer<typeof insertStreakSchema>;
export type Achievement = typeof achievements.$inferSelect;
export type InsertAchievement = z.infer<typeof insertAchievementSchema>;
export type ReadingGoal = typeof readingGoals.$inferSelect;
export type InsertReadingGoal = z.infer<typeof insertReadingGoalSchema>;
export type Quest = typeof quests.$inferSelect;
export type InsertQuest = z.infer<typeof insertQuestSchema>;
export type UserQuest = typeof userQuests.$inferSelect;
export type InsertUserQuest = z.infer<typeof insertUserQuestSchema>;
export type Bookmark = typeof bookmarks.$inferSelect;
export type InsertBookmark = z.infer<typeof insertBookmarkSchema>;
export type Reflection = typeof reflections.$inferSelect;
export type InsertReflection = z.infer<typeof insertReflectionSchema>;
