import { PgStorage } from "./pg-storage";

// Islamic Knowledge Badge System - Same as frontend for consistency
const ISLAMIC_BADGES = {
  // Quran Study Badges
  quran_reader: {
    id: "quran_reader",
    name: "First Steps in the Quran",
    condition: (stats: UserStats) => stats.ayahsRead >= 1,
    xpReward: 50,
    category: "quran"
  },
  surah_explorer: {
    id: "surah_explorer", 
    name: "Surah Explorer",
    condition: (stats: UserStats) => stats.surahsStarted >= 10,
    xpReward: 200,
    category: "quran"
  },
  makkah_reader: {
    id: "makkah_reader",
    name: "Meccan Revelation", 
    condition: (stats: UserStats) => stats.meccanSurahsCompleted >= 5,
    xpReward: 500,
    category: "quran"
  },
  madinah_reader: {
    id: "madinah_reader",
    name: "Medinan Wisdom",
    condition: (stats: UserStats) => stats.medinanSurahsCompleted >= 5, 
    xpReward: 500,
    category: "quran"
  },

  // Hadith Study Badges
  hadith_seeker: {
    id: "hadith_seeker",
    name: "Seeker of Hadith",
    condition: (stats: UserStats) => stats.hadithsRead >= 1,
    xpReward: 50,
    category: "hadith"
  },
  bukhari_student: {
    id: "bukhari_student",
    name: "Student of Al-Bukhari",
    condition: (stats: UserStats) => stats.bukhariHadithsRead >= 10,
    xpReward: 300,
    category: "hadith"
  },
  hadith_scholar: {
    id: "hadith_scholar",
    name: "Hadith Scholar",
    condition: (stats: UserStats) => stats.hadithCollectionsRead >= 5,
    xpReward: 750,
    category: "hadith"
  },

  // Dua & Dhikr Badges  
  dua_beginner: {
    id: "dua_beginner",
    name: "Beginning Supplicant",
    condition: (stats: UserStats) => stats.duasLearned >= 1,
    xpReward: 50,
    category: "dua"
  },
  morning_dhikr: {
    id: "morning_dhikr",
    name: "Morning Remembrance", 
    condition: (stats: UserStats) => stats.morningDhikrCompleted >= 1,
    xpReward: 200,
    category: "dua"
  },

  // Consistency Badges
  steady_reader: {
    id: "steady_reader",
    name: "Steady Reader",
    condition: (stats: UserStats) => stats.currentStreak >= 7,
    xpReward: 300,
    category: "consistency"
  },
  devoted_student: {
    id: "devoted_student", 
    name: "Devoted Student",
    condition: (stats: UserStats) => stats.currentStreak >= 30,
    xpReward: 1000,
    category: "consistency"
  },

  // Knowledge Badges
  names_of_allah: {
    id: "names_of_allah",
    name: "Beautiful Names",
    condition: (stats: UserStats) => stats.namesOfAllahLearned >= 10,
    xpReward: 500,
    category: "knowledge"
  },
  islamic_scholar: {
    id: "islamic_scholar",
    name: "Islamic Scholar", 
    condition: (stats: UserStats) => 
      stats.surahsCompleted >= 20 && 
      stats.hadithsRead >= 100 && 
      stats.duasLearned >= 50,
    xpReward: 2000,
    category: "knowledge"
  }
};

interface UserStats {
  // Quran stats
  ayahsRead: number;
  surahsStarted: number;
  surahsCompleted: number;
  meccanSurahsCompleted: number;
  medinanSurahsCompleted: number;
  
  // Hadith stats
  hadithsRead: number;
  bukhariHadithsRead: number;
  hadithCollectionsRead: number;
  
  // Dua stats
  duasLearned: number;
  morningDhikrCompleted: number;
  
  // Consistency stats
  currentStreak: number;
  longestStreak: number;
  
  // Knowledge stats
  namesOfAllahLearned: number;
}

export class AchievementService {
  private storage: PgStorage;

  constructor(storage: PgStorage) {
    this.storage = storage;
  }

  async checkAndAwardAchievements(userId: number): Promise<string[]> {
    try {
      // Get user's current stats
      const stats = await this.getUserStats(userId);
      
      // Get user's existing achievements
      const existingAchievements = await this.storage.getAchievementsByUserId(userId);
      const existingAchievementIds = existingAchievements.map(a => a.achievementId);
      
      // Check which new achievements should be awarded
      const newAchievements: string[] = [];
      
      for (const badge of Object.values(ISLAMIC_BADGES)) {
        // Skip if user already has this achievement
        if (existingAchievementIds.includes(badge.id)) {
          continue;
        }
        
        // Check if user meets the condition
        if (badge.condition(stats)) {
          // Award the achievement
          await this.storage.createAchievement({
            userId,
            achievementId: badge.id
          });
          
          // Award XP
          await this.awardXP(userId, badge.xpReward);
          
          newAchievements.push(badge.id);
        }
      }
      
      return newAchievements;
    } catch (error) {
      console.error("Error checking achievements:", error);
      return [];
    }
  }

  private async getUserStats(userId: number): Promise<UserStats> {
    try {
      // Get reading progress
      const readingProgress = await this.storage.getReadingProgressByUserId(userId);
      
      // Get streak data
      const streak = await this.storage.getStreakByUserId(userId);
      
      // Calculate stats from reading progress
      const ayahsRead = readingProgress.reduce((total, progress) => total + progress.lastReadAyah, 0);
      const surahsStarted = readingProgress.length;
      const surahsCompleted = readingProgress.filter(p => p.isCompleted).length;
      
      // For now, we'll use placeholder values for hadith/dua stats
      // These would be tracked when users interact with those sections
      return {
        ayahsRead,
        surahsStarted,
        surahsCompleted,
        meccanSurahsCompleted: Math.floor(surahsCompleted * 0.6), // Approximate
        medinanSurahsCompleted: Math.floor(surahsCompleted * 0.4), // Approximate
        hadithsRead: 0, // Would be tracked from hadith reading activity
        bukhariHadithsRead: 0, // Would be tracked from Bukhari collection activity
        hadithCollectionsRead: 0, // Would be tracked from collection browsing
        duasLearned: 0, // Would be tracked from dua reading activity
        morningDhikrCompleted: 0, // Would be tracked from morning dhikr completion
        currentStreak: streak?.currentStreak || 0,
        longestStreak: streak?.longestStreak || 0,
        namesOfAllahLearned: 0 // Would be tracked from educational content
      };
    } catch (error) {
      console.error("Error getting user stats:", error);
      return {
        ayahsRead: 0,
        surahsStarted: 0,
        surahsCompleted: 0,
        meccanSurahsCompleted: 0,
        medinanSurahsCompleted: 0,
        hadithsRead: 0,
        bukhariHadithsRead: 0,
        hadithCollectionsRead: 0,
        duasLearned: 0,
        morningDhikrCompleted: 0,
        currentStreak: 0,
        longestStreak: 0,
        namesOfAllahLearned: 0
      };
    }
  }

  private async awardXP(userId: number, xpAmount: number): Promise<void> {
    try {
      // Get current user data
      const user = await this.storage.getUser(userId);
      if (!user) return;
      
      const newXP = user.xp + xpAmount;
      const newLevel = Math.floor(newXP / 1000) + 1; // Every 1000 XP = 1 level
      
      // Update user XP and level
      // Note: This would require adding an updateUser method to storage
      // For now, we'll log the XP award
      console.log(`Awarded ${xpAmount} XP to user ${userId}. New XP: ${newXP}, New Level: ${newLevel}`);
    } catch (error) {
      console.error("Error awarding XP:", error);
    }
  }

  // Method to be called when user reads an ayah
  async onAyahRead(userId: number): Promise<string[]> {
    return await this.checkAndAwardAchievements(userId);
  }

  // Method to be called when user completes a surah
  async onSurahCompleted(userId: number): Promise<string[]> {
    return await this.checkAndAwardAchievements(userId);
  }

  // Method to be called when user updates their streak
  async onStreakUpdated(userId: number): Promise<string[]> {
    return await this.checkAndAwardAchievements(userId);
  }

  // Method to be called when user reads a hadith
  async onHadithRead(userId: number, collection?: string): Promise<string[]> {
    // Here we would track hadith reading stats
    // For now, just check achievements
    return await this.checkAndAwardAchievements(userId);
  }

  // Method to be called when user learns a dua
  async onDuaLearned(userId: number, category?: string): Promise<string[]> {
    // Here we would track dua learning stats
    // For now, just check achievements
    return await this.checkAndAwardAchievements(userId);
  }
}