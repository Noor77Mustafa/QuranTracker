import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";

export function useStreak(userId?: number) {
  const { user } = useAuth();
  const effectiveUserId = userId || user?.id;
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [lastReadDate, setLastReadDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Load streak from localStorage if not authenticated
  useEffect(() => {
    if (!effectiveUserId) {
      const storedStreak = localStorage.getItem("myquran-streak");
      const storedPagesRead = localStorage.getItem("myquran-pages-read");
      const storedLastReadDate = localStorage.getItem("myquran-last-read-date");
      const storedLongestStreak = localStorage.getItem("myquran-longest-streak");
      
      if (storedStreak) setStreak(parseInt(storedStreak, 10));
      if (storedPagesRead) setPagesRead(parseInt(storedPagesRead, 10));
      if (storedLastReadDate) setLastReadDate(storedLastReadDate);
      if (storedLongestStreak) setLongestStreak(parseInt(storedLongestStreak, 10));
    }
  }, [effectiveUserId]);
  
  // Load streak from API if authenticated
  useEffect(() => {
    if (effectiveUserId) {
      setIsLoading(true);
      fetch(`/api/streaks/${effectiveUserId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch streak data");
          return res.json();
        })
        .then(data => {
          setStreak(data.currentStreak || 0);
          setLongestStreak(data.longestStreak || 0);
          if (data.lastReadDate) setLastReadDate(data.lastReadDate);
        })
        .catch(error => {
          console.error("Error fetching streak:", error);
          // Set defaults if fetch fails
          setStreak(0);
          setLongestStreak(0);
        })
        .finally(() => {
          setIsLoading(false);
        });
        
      // Also fetch pages read
      fetch(`/api/reading-progress/${effectiveUserId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch reading progress");
          return res.json();
        })
        .then(data => {
          // Calculate total pages read
          const total = data.reduce((sum: number, progress: any) => {
            return sum + (progress.pagesRead || 1);
          }, 0);
          setPagesRead(total);
        })
        .catch(error => {
          console.error("Error fetching reading progress:", error);
          setPagesRead(0);
        });
    }
  }, [effectiveUserId]);
  
  const updateStreak = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    // If already read today, don't increment streak
    if (lastReadDate === today) return;
    
    // Prevent duplicate streak updates for the same day
    const streakKey = `streak-${effectiveUserId}-${today}`;
    if (localStorage.getItem(streakKey)) {
      return; // Already updated today
    }
    
    // Check if streak should be continued or reset
    // If last read was yesterday, continue streak
    // Otherwise reset to 1
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split('T')[0];
    
    let newStreak = 1;
    if (lastReadDate === yesterdayStr) {
      newStreak = streak + 1;
    }
    
    const newLongestStreak = Math.max(newStreak, longestStreak);
    
    // Update local storage if not authenticated
    if (!effectiveUserId) {
      localStorage.setItem("myquran-streak", newStreak.toString());
      localStorage.setItem("myquran-longest-streak", newLongestStreak.toString());
      localStorage.setItem("myquran-last-read-date", today);
      setStreak(newStreak);
      setLongestStreak(newLongestStreak);
      setLastReadDate(today);
      
      // Show toast notification
      if (newStreak > streak) {
        toast({
          title: "Streak Updated!",
          description: `You're on a ${newStreak} day streak. Keep it up!`,
        });
      }
      
      return;
    }
    
    // Update via API if authenticated
    try {
      const response = await apiRequest("POST", "/api/streaks", {
        userId: effectiveUserId,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastReadDate: today,
      });
      
      if (response.ok) {
        setStreak(newStreak);
        setLongestStreak(newLongestStreak);
        setLastReadDate(today);
        
        // Mark as updated for today
        localStorage.setItem(streakKey, 'true');
        
        // Show toast notification
        if (newStreak > streak) {
          toast({
            title: "Streak Updated!",
            description: `You're on a ${newStreak} day streak. Keep it up!`,
          });
        }
      }
    } catch (error) {
      console.error("Error updating streak:", error);
      toast({
        title: "Error",
        description: "Failed to update your reading streak.",
        variant: "destructive",
      });
    }
  };
  
  const incrementPagesRead = async (pages: number = 1, surahId?: number, ayahNumber?: number) => {
    const newPagesRead = pagesRead + pages;
    
    // Update local storage if not authenticated
    if (!effectiveUserId) {
      localStorage.setItem("myquran-pages-read", newPagesRead.toString());
      setPagesRead(newPagesRead);
      return;
    }
    
    // Prevent duplicate calls for the same surah on the same day
    const today = new Date().toISOString().split('T')[0];
    const progressKey = `progress-${effectiveUserId}-${surahId}-${today}`;
    
    if (localStorage.getItem(progressKey)) {
      return; // Already tracked today for this surah
    }
    
    // Create reading progress entry in database
    try {
      const response = await apiRequest("POST", "/api/reading-progress", {
        userId: effectiveUserId,
        surahId: surahId || 1,
        lastReadAyah: ayahNumber || 1,
        pagesRead: pages,
        dateRead: today,
        isCompleted: false,
      });
      
      if (response.ok) {
        setPagesRead(newPagesRead);
        
        // Mark as tracked for today
        localStorage.setItem(progressKey, 'true');
        
        // Check for new achievements from the response
        const data = await response.json();
        if (data.newAchievements && data.newAchievements.length > 0) {
          toast({
            title: "Achievement Unlocked!",
            description: `You earned ${data.newAchievements.length} new badge${data.newAchievements.length > 1 ? 's' : ''}!`,
          });
        }
      }
    } catch (error) {
      console.error("Error creating reading progress:", error);
      // Still update local state even if API fails
      setPagesRead(newPagesRead);
    }
  };
  
  return { 
    streak, 
    longestStreak, 
    pagesRead, 
    lastReadDate, 
    isLoading, 
    updateStreak, 
    incrementPagesRead 
  };
}
