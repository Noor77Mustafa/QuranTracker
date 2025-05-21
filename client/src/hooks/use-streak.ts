import { useState, useEffect } from "react";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export function useStreak(userId?: number) {
  const [streak, setStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);
  const [pagesRead, setPagesRead] = useState(0);
  const [lastReadDate, setLastReadDate] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  // Load streak from localStorage if not authenticated
  useEffect(() => {
    if (!userId) {
      const storedStreak = localStorage.getItem("myquran-streak");
      const storedPagesRead = localStorage.getItem("myquran-pages-read");
      const storedLastReadDate = localStorage.getItem("myquran-last-read-date");
      const storedLongestStreak = localStorage.getItem("myquran-longest-streak");
      
      if (storedStreak) setStreak(parseInt(storedStreak, 10));
      if (storedPagesRead) setPagesRead(parseInt(storedPagesRead, 10));
      if (storedLastReadDate) setLastReadDate(storedLastReadDate);
      if (storedLongestStreak) setLongestStreak(parseInt(storedLongestStreak, 10));
    }
  }, [userId]);
  
  // Load streak from API if authenticated
  useEffect(() => {
    if (userId) {
      setIsLoading(true);
      fetch(`/api/streaks/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch streak data");
          return res.json();
        })
        .then(data => {
          setStreak(data.currentStreak);
          setLongestStreak(data.longestStreak);
          if (data.lastReadDate) setLastReadDate(data.lastReadDate);
        })
        .catch(error => {
          console.error("Error fetching streak:", error);
        })
        .finally(() => {
          setIsLoading(false);
        });
        
      // Also fetch pages read
      fetch(`/api/reading-progress/${userId}`)
        .then(res => {
          if (!res.ok) throw new Error("Failed to fetch reading progress");
          return res.json();
        })
        .then(data => {
          // Calculate total pages read
          const total = data.reduce((sum: number, progress: any) => {
            // Rough estimation: 1 page = ~15 ayahs
            return sum + Math.ceil(progress.lastReadAyah / 15);
          }, 0);
          setPagesRead(total);
        })
        .catch(error => {
          console.error("Error fetching reading progress:", error);
        });
    }
  }, [userId]);
  
  const updateStreak = async () => {
    const today = new Date().toISOString().split('T')[0];
    
    // If already read today, don't increment streak
    if (lastReadDate === today) return;
    
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
    if (!userId) {
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
        userId,
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastReadDate: today,
      });
      
      if (response.ok) {
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
  
  const incrementPagesRead = async (pages: number = 1) => {
    const newPagesRead = pagesRead + pages;
    
    // Update local storage if not authenticated
    if (!userId) {
      localStorage.setItem("myquran-pages-read", newPagesRead.toString());
      setPagesRead(newPagesRead);
      return;
    }
    
    // In a real app, we would update the server-side pages read count
    // For this MVP, we'll just update the local state
    setPagesRead(newPagesRead);
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
