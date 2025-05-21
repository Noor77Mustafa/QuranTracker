import { useEffect, useState } from "react";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements, Badge } from "@/hooks/use-achievements";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";

export default function Profile() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { streak, longestStreak, pagesRead } = useStreak();
  const { badges } = useAchievements();
  const [selectedBadge, setSelectedBadge] = useState<Badge | null>(null);
  const [activeTab, setActiveTab] = useState<'progress' | 'achievements' | 'settings'>('progress');
  
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
                  U
                </div>
                <div>
                  <h1 className="text-xl font-semibold">User</h1>
                  <p className="text-gray-500 dark:text-gray-400">Joined: Recently</p>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{streak}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Day Streak</p>
                </div>
                <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-3 text-center">
                  <p className="text-2xl font-bold text-primary">{pagesRead}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">Pages Read</p>
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
          <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
            <button 
              className={`px-4 py-2 ${activeTab === "progress" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("progress")}
            >
              Progress
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === "achievements" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("achievements")}
            >
              Achievements
            </button>
            <button 
              className={`px-4 py-2 ${activeTab === "settings" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
              onClick={() => setActiveTab("settings")}
            >
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
              
              <Button className="w-full">Set a New Goal</Button>
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
