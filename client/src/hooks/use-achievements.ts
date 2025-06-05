import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./use-auth";

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
};

interface AchievementResponse {
  success: boolean;
  newAchievements?: string[];
}

export function useAchievements(userId?: number) {
  const [pendingAchievements, setPendingAchievements] = useState<string[]>([]);
  const queryClient = useQueryClient();
  const { user } = useAuth();
  
  const effectiveUserId = userId || user?.id;

  // Fetch user achievements
  const { data: achievements = [], isLoading } = useQuery({
    queryKey: ["/api/achievements", effectiveUserId],
    enabled: !!effectiveUserId,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: false,
  });

  // Track hadith reading activity
  const trackHadithReading = useMutation({
    mutationFn: async ({ hadithId, collection }: { hadithId: string; collection?: string }) => {
      const response = await fetch("/api/activity/hadith-read", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ hadithId, collection }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to track hadith reading");
      }
      
      return response.json() as Promise<AchievementResponse>;
    },
    onSuccess: (data) => {
      if (data.newAchievements && data.newAchievements.length > 0) {
        setPendingAchievements(prev => [...prev, ...data.newAchievements!]);
        queryClient.invalidateQueries({ queryKey: ["/api/achievements", effectiveUserId] });
      }
    },
  });

  // Track dua learning activity
  const trackDuaLearning = useMutation({
    mutationFn: async ({ duaId, category }: { duaId: string; category?: string }) => {
      const response = await fetch("/api/activity/dua-learned", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ duaId, category }),
      });
      
      if (!response.ok) {
        throw new Error("Failed to track dua learning");
      }
      
      return response.json() as Promise<AchievementResponse>;
    },
    onSuccess: (data) => {
      if (data.newAchievements && data.newAchievements.length > 0) {
        setPendingAchievements(prev => [...prev, ...data.newAchievements!]);
        queryClient.invalidateQueries({ queryKey: ["/api/achievements", effectiveUserId] });
      }
    },
  });

  // Clear pending achievements after they've been shown
  const clearPendingAchievements = () => {
    setPendingAchievements([]);
  };

  return {
    achievements: Array.isArray(achievements) ? achievements : [],
    isLoading,
    pendingAchievements,
    clearPendingAchievements,
    trackHadithReading: trackHadithReading.mutate,
    trackDuaLearning: trackDuaLearning.mutate,
    isTrackingHadith: trackHadithReading.isPending,
    isTrackingDua: trackDuaLearning.isPending,
  };
}