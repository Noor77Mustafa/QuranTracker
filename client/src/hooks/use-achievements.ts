import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { achievementsList } from "@/lib/achievement-data";

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
};

export function useAchievements(userId?: number) {
  const [badges, setBadges] = useState<Badge[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  // Load badges from localStorage if not authenticated
  useEffect(() => {
    if (!userId) {
      const storedBadges = localStorage.getItem("myquran-badges");
      if (storedBadges) {
        setBadges(JSON.parse(storedBadges));
      }
    }
  }, [userId]);

  // Load badges from API if authenticated
  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetch(`/api/achievements/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch achievements");
          return res.json();
        })
        .then(data => {
          // Transform the API data into Badge objects
          const userBadges = data.map((achievement: any) => {
            const badgeInfo = achievementsList.find(b => b.id === achievement.achievementId);
            if (!badgeInfo) return null;
            
            return {
              ...badgeInfo,
              unlockedAt: achievement.unlockedAt
            };
          }).filter(Boolean);
          
          setBadges(userBadges);
        })
        .catch(error => {
          console.error("Error fetching achievements:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [userId]);

  const unlockAchievement = async (achievementId: string) => {
    // Check if achievement already unlocked
    if (badges.some(badge => badge.id === achievementId)) {
      return;
    }
    
    const achievement = achievementsList.find(a => a.id === achievementId);
    if (!achievement) {
      console.error(`Achievement with ID ${achievementId} not found`);
      return;
    }
    
    const newBadge = {
      ...achievement,
      unlockedAt: new Date().toISOString()
    };
    
    // Update local storage if not authenticated
    if (!userId) {
      const updatedBadges = [...badges, newBadge];
      localStorage.setItem("myquran-badges", JSON.stringify(updatedBadges));
      setBadges(updatedBadges);
      
      // Show achievement toast
      toast({
        title: "Achievement Unlocked!",
        description: `${newBadge.name}: ${newBadge.description}`,
      });
      
      return;
    }
    
    // Update via API if authenticated
    try {
      const response = await apiRequest("POST", "/api/achievements", {
        userId,
        achievementId
      });
      
      if (response.ok) {
        setBadges(prev => [...prev, newBadge]);
        
        // Show achievement toast
        toast({
          title: "Achievement Unlocked!",
          description: `${newBadge.name}: ${newBadge.description}`,
        });
      }
    } catch (error) {
      console.error("Error unlocking achievement:", error);
    }
  };

  const checkForAchievements = (stats: { 
    pagesRead?: number; 
    streak?: number; 
    surahsCompleted?: number;
    consecutiveDays?: number;
  }) => {
    // Check for page reading achievements
    if (stats.pagesRead) {
      if (stats.pagesRead >= 10 && !badges.some(b => b.id === "first_steps")) {
        unlockAchievement("first_steps");
      }
      if (stats.pagesRead >= 50 && !badges.some(b => b.id === "dedicated_reader")) {
        unlockAchievement("dedicated_reader");
      }
      if (stats.pagesRead >= 100 && !badges.some(b => b.id === "avid_reader")) {
        unlockAchievement("avid_reader");
      }
    }
    
    // Check for streak achievements
    if (stats.streak) {
      if (stats.streak >= 3 && !badges.some(b => b.id === "consistent_reader")) {
        unlockAchievement("consistent_reader");
      }
      if (stats.streak >= 7 && !badges.some(b => b.id === "week_streak")) {
        unlockAchievement("week_streak");
      }
      if (stats.streak >= 30 && !badges.some(b => b.id === "month_streak")) {
        unlockAchievement("month_streak");
      }
    }
    
    // Check for surah completion achievements
    if (stats.surahsCompleted) {
      if (stats.surahsCompleted >= 1 && !badges.some(b => b.id === "first_surah")) {
        unlockAchievement("first_surah");
      }
      if (stats.surahsCompleted >= 10 && !badges.some(b => b.id === "ten_surahs")) {
        unlockAchievement("ten_surahs");
      }
      if (stats.surahsCompleted >= 114 && !badges.some(b => b.id === "completed_quran")) {
        unlockAchievement("completed_quran");
      }
    }
  };

  return { badges, isLoading, unlockAchievement, checkForAchievements };
}
