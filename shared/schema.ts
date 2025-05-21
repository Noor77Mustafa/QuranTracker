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
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
  displayName: true,
  email: true,
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
