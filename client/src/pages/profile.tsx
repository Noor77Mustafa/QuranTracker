import { useEffect, useState } from "react";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements, Badge } from "@/hooks/use-achievements";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import ReadingGoalDialog from "@/components/ReadingGoalDialog";

// Mock user data - in a real app, this would come from the API
interface UserProfile {
  id: number;
  username: string;
  displayName: string;
  level: number;
  xp: number;
  points: number;
  joinedAt: string;
  avatarUrl?: string;
}

export default function Profile() {
  const { user: authUser, isAuthenticated, logout } = useAuth();
  const { streak, longestStreak, pagesRead } = useStreak();
  const { achievements } = useAchievements();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'achievements' | 'quests' | 'settings'>('progress');
  const [isGoalDialogOpen, setIsGoalDialogOpen] = useState(false);
  const [readingGoal, setReadingGoal] = useState<{
    pagesPerDay: number;
    minutesPerDay: number;
    completionTarget?: string;
  } | null>(null);
  
  // Use authenticated user data directly
  const user: UserProfile | undefined = authUser ? {
    id: authUser.id,
    username: authUser.username,
    displayName: authUser.displayName || authUser.username,
    level: authUser.level || 1,
    xp: authUser.xp || 0,
    points: authUser.points || 0,
    joinedAt: authUser.lastActive || new Date().toISOString(),
    avatarUrl: authUser.avatarUrl
  } : undefined;
  
  // Set page title
  useEffect(() => {
    document.title = "Profile - MyQuran";
  }, []);
  
  // Calculate progress percentage
  const quranProgress = Math.min(Math.round((pagesRead / 604) * 100), 100);
  
  return (
    <main className="container mx-auto px-4 py-4">
      {isAuthenticated ? (
        <>
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center text-white text-2xl mr-4">
                  {user?.avatarUrl ? 
                    <img src={user.avatarUrl} alt={user.displayName} className="w-full h-full rounded-full object-cover" /> : 
                    user?.displayName?.charAt(0) || 'U'
                  }
                </div>
                <div>
                  <div className="flex items-center">
                    <h1 className="text-xl font-semibold">{user?.displayName || 'User'}</h1>
                    <div className="ml-2 px-2 py-0.5 bg-primary/10 text-primary rounded-full text-xs font-medium">
                      Level {user?.level || 1}
                    </div>
                  </div>
                  <p className="text-gray-500 dark:text-gray-400">
                    @{user?.username} · Joined: {user?.joinedAt ? new Date(user.joinedAt).toLocaleDateString() : 'Recently'}
                  </p>
                </div>
              </div>
              
              {/* XP Progress */}
              <div className="mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex justify-between items-center mb-2">
                  <div className="flex items-center">
                    <span className="material-symbols-rounded text-yellow-500 mr-2">stars</span>
                    <span className="font-medium">Level {user?.level || 1}</span>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-300">{user?.xp || 0}/1000 XP</span>
                </div>
                <Progress value={((user?.xp || 0) % 1000) / 10} className="h-2 mb-1" />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {1000 - ((user?.xp || 0) % 1000)} XP needed for next level
                </p>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{streak}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Day Streak</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{user?.points || 0}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Points</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{Array.isArray(achievements) ? achievements.length : 0}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Achievements</p>
                </div>
              </div>
              
              <div className="mb-2 flex justify-between items-end">
                <h2 className="font-medium">Quran Progress</h2>
                <span className="text-sm text-gray-500 dark:text-gray-400">{quranProgress}%</span>
              </div>
              <Progress value={quranProgress} className="h-2 mb-6" />
              
              <Button variant="outline" className="w-full">View Reading History</Button>
            </div>
          </div>
          
          {/* Tabs */}
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto no-scrollbar">
            <button 
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "progress" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("progress")}
            >
              <span className="material-symbols-rounded mr-1 text-sm align-text-bottom">trending_up</span>
              Progress
            </button>
            <button 
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "quests" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("quests")}
            >
              <span className="material-symbols-rounded mr-1 text-sm align-text-bottom">task_alt</span>
              Quests
            </button>
            <button 
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "achievements" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("achievements")}
            >
              <span className="material-symbols-rounded mr-1 text-sm align-text-bottom">military_tech</span>
              Achievements
            </button>
            <button 
              className={`px-4 py-2 whitespace-nowrap ${activeTab === "settings" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("settings")}
            >
              <span className="material-symbols-rounded mr-1 text-sm align-text-bottom">settings</span>
              Settings
            </button>
          </div>
          
          {/* Tab Content */}
          {activeTab === "progress" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Reading Progress</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                You've read {pagesRead} pages of the Quran. Your longest streak is {longestStreak} days.
              </p>
              
              <h3 className="font-medium mb-2">Daily Goal</h3>
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                <div className="flex justify-between items-center mb-2">
                  <p className="font-medium">Read 5 pages daily</p>
                  <span className="text-xs bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 px-2 py-1 rounded">Active</span>
                </div>
                <div className="mb-2">
                  <Progress value={Math.min((pagesRead % 5) * 20, 100)} className="h-1" />
                </div>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {5 - (pagesRead % 5)} more pages to reach today's goal
                </p>
              </div>
              
              <div className="mb-4">
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 mb-4">
                  <h3 className="font-semibold text-lg mb-3">Reading Goal</h3>
                  
                  {readingGoal ? (
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <p className="font-medium">Read {readingGoal.pagesPerDay} pages daily</p>
                        <span className="text-xs bg-green-100 text-green-800 dark:bg-green-800/30 dark:text-green-400 px-2 py-1 rounded">Active</span>
                      </div>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
                        Daily commitment: {readingGoal.pagesPerDay} pages or {readingGoal.minutesPerDay} minutes
                      </p>
                      {readingGoal.completionTarget && (
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Target completion: {
                            readingGoal.completionTarget === "3_months" ? "In 3 months" :
                            readingGoal.completionTarget === "6_months" ? "In 6 months" :
                            readingGoal.completionTarget === "1_year" ? "In 1 year" :
                            readingGoal.completionTarget === "Ramadan" ? "By next Ramadan" : 
                            readingGoal.completionTarget
                          }
                        </p>
                      )}
                      
                      <Button 
                        className="w-full mt-4"
                        onClick={() => setIsGoalDialogOpen(true)}
                      >
                        Edit Goal
                      </Button>
                    </div>
                  ) : (
                    <div>
                      <p className="text-gray-600 dark:text-gray-300 mb-4">
                        No reading goal set yet. Setting a goal helps you maintain consistency in your Quran reading journey.
                      </p>
                      
                      <Button 
                        className="w-full"
                        onClick={() => setIsGoalDialogOpen(true)}
                      >
                        Set a New Goal
                      </Button>
                    </div>
                  )}
                </div>
                
                {/* ReadingGoalDialog Component */}
                {isGoalDialogOpen && (
                  <ReadingGoalDialog 
                    open={isGoalDialogOpen} 
                    setOpen={setIsGoalDialogOpen}
                    currentGoal={readingGoal || undefined}
                    onSaveGoal={(goal) => {
                      console.log("Saving goal:", goal);
                      setReadingGoal(goal);
                    }}
                  />
                )}
              </div>
            </div>
          )}
          
          {activeTab === "quests" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Quests</h2>
                <div className="text-sm text-gray-500 dark:text-gray-400 flex items-center">
                  <span className="material-symbols-rounded mr-1">stars</span>
                  <span>{user?.points || 0} Points</span>
                </div>
              </div>
              
              {/* Daily Quests */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center">
                  <span className="material-symbols-rounded mr-2 text-blue-500">today</span>
                  Daily Quests
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Read 5 Pages</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Read 5 pages from any surah</p>
                      </div>
                      <div className="text-sm font-medium text-yellow-500 flex items-center">
                        <span className="material-symbols-rounded mr-1">add_circle</span>
                        +20 XP
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Progress value={60} className="h-1 w-3/4" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">3/5</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between mb-1">
                      <div>
                        <h4 className="font-medium">Reflect on a Verse</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Write a reflection on any verse</p>
                      </div>
                      <div className="text-sm font-medium text-green-500 flex items-center">
                        <span className="material-symbols-rounded mr-1">check_circle</span>
                        +15 XP
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full mt-2" disabled>Completed</Button>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between mb-1">
                      <div>
                        <h4 className="font-medium">Listen to Recitation</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Listen to at least 10 minutes of Quran</p>
                      </div>
                      <div className="text-sm font-medium text-yellow-500 flex items-center">
                        <span className="material-symbols-rounded mr-1">add_circle</span>
                        +25 XP
                      </div>
                    </div>
                    <Button size="sm" className="w-full mt-2">Start Quest</Button>
                  </div>
                </div>
              </div>
              
              {/* Weekly Quests */}
              <div className="mb-6">
                <h3 className="font-medium mb-3 flex items-center">
                  <span className="material-symbols-rounded mr-2 text-purple-500">calendar_view_week</span>
                  Weekly Quests
                </h3>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between mb-2">
                      <div>
                        <h4 className="font-medium">Complete Al-Fatihah</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Read all verses of Surah Al-Fatihah</p>
                      </div>
                      <div className="text-sm font-medium text-yellow-500 flex items-center">
                        <span className="material-symbols-rounded mr-1">add_circle</span>
                        +50 XP
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <Progress value={85} className="h-1 w-3/4" />
                      <span className="text-sm text-gray-600 dark:text-gray-400">6/7</span>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between mb-1">
                      <div>
                        <h4 className="font-medium">5-Day Streak</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Read Quran for 5 consecutive days</p>
                      </div>
                      <div className="text-sm font-medium text-yellow-500 flex items-center">
                        <span className="material-symbols-rounded mr-1">add_circle</span>
                        +75 XP
                      </div>
                    </div>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex space-x-1">
                        {[1, 2, 3, 4, 5].map((day) => (
                          <div key={day} className={`w-8 h-8 rounded-full flex items-center justify-center 
                            ${day <= streak ? 'bg-primary text-white' : 'bg-gray-200 dark:bg-gray-600 text-gray-400 dark:text-gray-500'}`}>
                            {day}
                          </div>
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">{streak}/5</span>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Monthly Challenge */}
              <div>
                <h3 className="font-medium mb-3 flex items-center">
                  <span className="material-symbols-rounded mr-2 text-primary">calendar_month</span>
                  Monthly Challenge
                </h3>
                
                <div className="bg-primary/10 dark:bg-primary/20 rounded-lg p-4 border border-primary/20">
                  <h4 className="font-medium text-primary mb-1 flex items-center">
                    <span className="material-symbols-rounded mr-1">trophy</span>
                    Complete Juz Amma
                  </h4>
                  <p className="text-sm text-gray-700 dark:text-gray-300 mb-3">
                    Read all surahs in the 30th Juz of the Quran this month
                  </p>
                  
                  <div className="flex justify-between items-center text-sm mb-2">
                    <span className="text-gray-600 dark:text-gray-400">Progress: 8/37 surahs</span>
                    <span className="font-medium text-primary">+500 XP</span>
                  </div>
                  <Progress value={22} className="h-1 mb-3" />
                  
                  <Button variant="outline" className="w-full">View Challenge Details</Button>
                </div>
              </div>
            </div>
          )}
          
          {activeTab === "achievements" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Achievements</h2>
              
              {selectedBadge ? (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-6"
                >
                  <Button variant="ghost" size="sm" onClick={() => setSelectedBadge(null)} className="mb-4">
                    <span className="material-symbols-rounded mr-1">arrow_back</span>
                    Back to all achievements
                  </Button>
                  
                  <div className="text-center mb-6">
                    <div className="w-20 h-20 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <span className="material-symbols-rounded text-4xl text-primary">{selectedBadge.icon}</span>
                    </div>
                    <h3 className="text-xl font-semibold">{selectedBadge.name}</h3>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">{selectedBadge.description}</p>
                    
                    {selectedBadge.unlockedAt && (
                      <p className="text-sm text-gray-500 dark:text-gray-500 mt-4">
                        Unlocked: {new Date(selectedBadge.unlockedAt).toLocaleDateString()}
                      </p>
                    )}
                  </div>
                </motion.div>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {Array.isArray(achievements) && achievements.map((badge: any) => (
                    <button
                      key={badge.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                      onClick={() => setSelectedBadge(badge)}
                    >
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="material-symbols-rounded text-2xl text-primary">{badge.icon || 'star'}</span>
                      </div>
                      <p className="font-medium text-sm">{badge.name || 'Achievement'}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
          
          {activeTab === "settings" && (
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-semibold mb-4">Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium mb-2">Account</h3>
                  <Button variant="outline" className="w-full">Edit Profile</Button>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Appearance</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-rounded text-gray-600 dark:text-gray-300">dark_mode</span>
                        <p>Dark Mode</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          defaultChecked={document.documentElement.classList.contains('dark')}
                          onChange={() => {
                            const isDark = document.documentElement.classList.contains('dark');
                            document.documentElement.classList.toggle('dark', !isDark);
                            localStorage.setItem('theme', isDark ? 'light' : 'dark');
                          }}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <span className="material-symbols-rounded text-gray-600 dark:text-gray-300">notifications</span>
                        <p>Daily Reminders</p>
                      </div>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer"
                          onChange={(e) => {
                            if (e.target.checked) {
                              // Request notification permission when enabling
                              if (Notification.permission !== "granted") {
                                Notification.requestPermission();
                              }
                              localStorage.setItem('dailyReminders', 'enabled');
                            } else {
                              localStorage.setItem('dailyReminders', 'disabled');
                            }
                          }}
                          defaultChecked={localStorage.getItem('dailyReminders') === 'enabled'}
                        />
                        <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary/20 rounded-full peer dark:bg-gray-600 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                      </label>
                    </div>
                  </div>
                </div>
                
                <Button 
                  variant="destructive" 
                  className="w-full"
                  onClick={() => {
                    if (logout?.mutate) {
                      logout.mutate();
                    }
                  }}
                >
                  Sign Out
                </Button>
              </div>
            </div>
          )}
        </>
      ) : (
        // Not authenticated
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="p-6 text-center">
            <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center text-gray-400 mx-auto mb-4">
              <span className="material-symbols-rounded text-3xl">person</span>
            </div>
            <h2 className="text-xl font-semibold mb-4">Sign In to Track Your Progress</h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Create an account to track your reading progress, earn achievements, and customize your experience.
            </p>
            <div className="flex flex-col gap-3 max-w-xs mx-auto">
              <Button className="w-full">Sign In</Button>
              <Button variant="outline" className="w-full">Create Account</Button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
