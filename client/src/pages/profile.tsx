import { useEffect, useState } from "react";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements, Badge } from "@/hooks/use-achievements";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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
  const [isAuthenticated, setIsAuthenticated] = useState(true); // Set to true for demo purposes
  const { streak, longestStreak, pagesRead } = useStreak();
  const { badges } = useAchievements();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'achievements' | 'quests' | 'settings'>('progress');
  
  // Fetch user profile data
  const { data: user } = useQuery<UserProfile>({
    queryKey: ['user', 1], // User ID would come from auth context in a real app
    queryFn: async () => ({
      id: 1,
      username: "quranreader",
      displayName: "Abdullah",
      level: 5,
      xp: 450,
      points: 720,
      joinedAt: "2023-05-15T12:00:00Z",
      avatarUrl: undefined
    })
  });
  
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
                  <p className="text-2xl font-bold text-primary">{badges.length}</p>
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
              
              <Button 
                className="w-full"
                onClick={() => {
                  // Open goal setting dialog
                  const goalDialog = document.getElementById('goal-setting-dialog');
                  if (goalDialog) {
                    (goalDialog as any).showModal();
                  }
                }}
              >
                Set a New Goal
              </Button>
              
              {/* Goal Setting Dialog */}
              <dialog id="goal-setting-dialog" className="bg-white dark:bg-gray-800 rounded-lg shadow-xl p-0 max-w-md w-full">
                <div className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Set Reading Goal</h3>
                    <button 
                      onClick={() => {
                        const dialog = document.getElementById('goal-setting-dialog');
                        if (dialog) {
                          (dialog as any).close();
                        }
                      }}
                      className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                    >
                      <span className="material-symbols-rounded">close</span>
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <label htmlFor="pages-per-day" className="block text-sm font-medium mb-1">
                        Pages per day
                      </label>
                      <input
                        type="number"
                        id="pages-per-day"
                        min="1"
                        max="50"
                        defaultValue="5"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="minutes-per-day" className="block text-sm font-medium mb-1">
                        Minutes per day
                      </label>
                      <input
                        type="number"
                        id="minutes-per-day"
                        min="5"
                        max="120"
                        defaultValue="15"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="completion-target" className="block text-sm font-medium mb-1">
                        Target completion date (optional)
                      </label>
                      <select 
                        id="completion-target"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md dark:bg-gray-700"
                      >
                        <option value="">No specific target</option>
                        <option value="Ramadan">By next Ramadan</option>
                        <option value="3_months">In 3 months</option>
                        <option value="6_months">In 6 months</option>
                        <option value="1_year">In 1 year</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="mt-6 flex justify-end space-x-2">
                    <Button 
                      variant="outline"
                      onClick={() => {
                        const dialog = document.getElementById('goal-setting-dialog');
                        if (dialog) {
                          (dialog as any).close();
                        }
                      }}
                    >
                      Cancel
                    </Button>
                    <Button
                      onClick={() => {
                        // Save the goal
                        const dialog = document.getElementById('goal-setting-dialog');
                        if (dialog) {
                          (dialog as any).close();
                          // Show success notification
                          alert("Reading goal saved successfully!");
                        }
                      }}
                    >
                      Save Goal
                    </Button>
                  </div>
                </div>
              </dialog>
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
                  {badges.map((badge) => (
                    <button
                      key={badge.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 text-center hover:bg-gray-100 dark:hover:bg-gray-600 transition"
                      onClick={() => setSelectedBadge(badge)}
                    >
                      <div className="w-12 h-12 bg-primary/10 dark:bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                        <span className="material-symbols-rounded text-2xl text-primary">{badge.icon}</span>
                      </div>
                      <p className="font-medium text-sm">{badge.name}</p>
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
                      <p>Dark Mode</p>
                      <Button variant="ghost" size="sm">Toggle</Button>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Notifications</h3>
                  <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <p>Daily Reminders</p>
                      <Button variant="ghost" size="sm">Enable</Button>
                    </div>
                  </div>
                </div>
                
                <Button variant="destructive" className="w-full">Sign Out</Button>
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
