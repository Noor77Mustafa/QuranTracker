import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress as ProgressBar } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Trophy, Target, Star, BookOpen, Flame, Clock, Award } from "lucide-react";
import { Link } from "wouter";

// Islamic Knowledge Badge System
const ISLAMIC_BADGES = {
  // Quran Study Badges
  quran_reader: {
    id: "quran_reader",
    name: "First Steps in the Quran",
    arabicName: "الخطوات الأولى في القرآن",
    description: "Read your first ayah from the Holy Quran",
    icon: "📖",
    xpReward: 50,
    category: "quran",
    rarity: "common"
  },
  surah_explorer: {
    id: "surah_explorer",
    name: "Surah Explorer",
    arabicName: "مستكشف السور",
    description: "Read verses from 10 different surahs",
    icon: "🗺️",
    xpReward: 200,
    category: "quran",
    rarity: "uncommon"
  },
  makkah_reader: {
    id: "makkah_reader",
    name: "Meccan Revelation",
    arabicName: "الوحي المكي",
    description: "Complete reading 5 Meccan surahs",
    icon: "🕋",
    xpReward: 500,
    category: "quran",
    rarity: "rare"
  },
  madinah_reader: {
    id: "madinah_reader",
    name: "Medinan Wisdom",
    arabicName: "الحكمة المدنية",
    description: "Complete reading 5 Medinan surahs",
    icon: "🌙",
    xpReward: 500,
    category: "quran",
    rarity: "rare"
  },
  
  // Hadith Study Badges
  hadith_seeker: {
    id: "hadith_seeker",
    name: "Seeker of Hadith",
    arabicName: "طالب الحديث",
    description: "Read your first authentic hadith",
    icon: "📚",
    xpReward: 50,
    category: "hadith",
    rarity: "common"
  },
  bukhari_student: {
    id: "bukhari_student",
    name: "Student of Al-Bukhari",
    arabicName: "طالب البخاري",
    description: "Read 10 hadiths from Sahih al-Bukhari",
    icon: "📜",
    xpReward: 300,
    category: "hadith",
    rarity: "uncommon"
  },
  hadith_scholar: {
    id: "hadith_scholar",
    name: "Hadith Scholar",
    arabicName: "عالم الحديث",
    description: "Read hadiths from 5 different collections",
    icon: "🎓",
    xpReward: 750,
    category: "hadith",
    rarity: "epic"
  },
  
  // Dua & Dhikr Badges
  dua_beginner: {
    id: "dua_beginner",
    name: "Beginning Supplicant",
    arabicName: "الداعي المبتدئ",
    description: "Learn your first dua",
    icon: "🤲",
    xpReward: 50,
    category: "dua",
    rarity: "common"
  },
  morning_dhikr: {
    id: "morning_dhikr",
    name: "Morning Remembrance",
    arabicName: "أذكار الصباح",
    description: "Complete morning adhkar collection",
    icon: "🌅",
    xpReward: 200,
    category: "dua",
    rarity: "uncommon"
  },
  
  // Consistency Badges
  steady_reader: {
    id: "steady_reader",
    name: "Steady Reader",
    arabicName: "القارئ المنتظم",
    description: "Maintain a 7-day reading streak",
    icon: "📅",
    xpReward: 300,
    category: "consistency",
    rarity: "uncommon"
  },
  devoted_student: {
    id: "devoted_student",
    name: "Devoted Student",
    arabicName: "الطالب المخلص",
    description: "Maintain a 30-day reading streak",
    icon: "🔥",
    xpReward: 1000,
    category: "consistency",
    rarity: "epic"
  },
  
  // Knowledge Badges
  names_of_allah: {
    id: "names_of_allah",
    name: "Beautiful Names",
    arabicName: "الأسماء الحسنى",
    description: "Learn 10 names of Allah",
    icon: "✨",
    xpReward: 500,
    category: "knowledge",
    rarity: "rare"
  },
  islamic_scholar: {
    id: "islamic_scholar",
    name: "Islamic Scholar",
    arabicName: "العالم الإسلامي",
    description: "Complete advanced Islamic studies",
    icon: "👨‍🎓",
    xpReward: 2000,
    category: "knowledge",
    rarity: "legendary"
  }
};

const RARITY_COLORS = {
  common: "bg-gray-100 border-gray-300",
  uncommon: "bg-green-100 border-green-300",
  rare: "bg-blue-100 border-blue-300",
  epic: "bg-purple-100 border-purple-300",
  legendary: "bg-yellow-100 border-yellow-300"
};

export default function Progress() {
  const { user, isAuthenticated } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState("all");

  // Fetch user achievements
  const { data: achievements = [], isLoading: achievementsLoading } = useQuery({
    queryKey: ["/api/achievements", user?.id],
    enabled: !!user?.id,
  });

  // Fetch user streak data
  const { data: streak, isLoading: streakLoading } = useQuery({
    queryKey: ["/api/streak", user?.id],
    enabled: !!user?.id,
  });

  // Fetch reading progress
  const { data: readingProgress = [], isLoading: progressLoading } = useQuery({
    queryKey: ["/api/reading-progress", user?.id],
    enabled: !!user?.id,
  });

  if (!isAuthenticated) {
    return (
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardHeader>
            <CardTitle>Sign In Required</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">
              Please sign in to view your Islamic learning progress and earn knowledge badges.
            </p>
            <Link href="/auth">
              <Button>Sign In</Button>
            </Link>
          </CardContent>
        </Card>
      </main>
    );
  }

  const userLevel = user?.level || 1;
  const userXp = user?.xp || 0;
  const xpForNextLevel = userLevel * 1000; // Each level requires level * 1000 XP
  const xpProgress = (userXp % 1000) / 10; // Progress percentage for current level

  const unlockedBadgeIds = (achievements as any[]).map((a: any) => a.achievementId);
  const unlockedBadges = Object.values(ISLAMIC_BADGES).filter(badge => 
    unlockedBadgeIds.includes(badge.id)
  );
  const availableBadges = Object.values(ISLAMIC_BADGES).filter(badge => 
    !unlockedBadgeIds.includes(badge.id)
  );

  const filteredUnlocked = selectedCategory === "all" 
    ? unlockedBadges 
    : unlockedBadges.filter(badge => badge.category === selectedCategory);

  const filteredAvailable = selectedCategory === "all"
    ? availableBadges
    : availableBadges.filter(badge => badge.category === selectedCategory);

  return (
    <main className="container mx-auto px-4 py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Islamic Learning Progress</h1>
        <h2 className="text-xl font-arabic text-primary mb-4">تقدم التعلم الإسلامي</h2>
        <p className="text-gray-600">Track your journey in Islamic knowledge and earn authentic badges</p>
      </div>

      {/* User Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Star className="h-6 w-6 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userLevel}</p>
                <p className="text-sm text-gray-600">Current Level</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-blue-100 rounded-lg">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{userXp}</p>
                <p className="text-sm text-gray-600">Total XP</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-orange-100 rounded-lg">
                <Flame className="h-6 w-6 text-orange-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{(streak as any)?.currentStreak || 0}</p>
                <p className="text-sm text-gray-600">Current Streak</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-green-100 rounded-lg">
                <Award className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold">{unlockedBadges.length}</p>
                <p className="text-sm text-gray-600">Badges Earned</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Level Progress */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Target className="h-5 w-5" />
            <span>Level Progress</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Level {userLevel}</span>
              <span>{userXp % 1000} / 1000 XP</span>
            </div>
            <ProgressBar value={xpProgress} className="h-3" />
            <p className="text-sm text-gray-600">
              {1000 - (userXp % 1000)} XP needed for Level {userLevel + 1}
            </p>
          </div>
        </CardContent>
      </Card>

      {/* Islamic Knowledge Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Trophy className="h-5 w-5" />
            <span>Islamic Knowledge Badges</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="quran">Quran</TabsTrigger>
              <TabsTrigger value="hadith">Hadith</TabsTrigger>
              <TabsTrigger value="dua">Dua</TabsTrigger>
              <TabsTrigger value="consistency">Consistency</TabsTrigger>
              <TabsTrigger value="knowledge">Knowledge</TabsTrigger>
            </TabsList>
            
            <TabsContent value={selectedCategory} className="mt-6">
              {/* Unlocked Badges */}
              {filteredUnlocked.length > 0 && (
                <div className="mb-8">
                  <h3 className="text-lg font-semibold mb-4 text-green-700">
                    Earned Badges ({filteredUnlocked.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredUnlocked.map((badge) => (
                      <Card key={badge.id} className={`border-2 ${RARITY_COLORS[badge.rarity]} relative overflow-hidden`}>
                        <div className="absolute top-2 right-2">
                          <Badge variant="secondary" className="text-xs">
                            {badge.rarity}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl mb-2">{badge.icon}</div>
                            <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                            <p className="text-xs font-arabic text-gray-600 mb-2">{badge.arabicName}</p>
                            <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                            <div className="flex items-center justify-center space-x-1 text-xs text-green-600">
                              <Star className="h-3 w-3" />
                              <span>+{badge.xpReward} XP</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {/* Available Badges */}
              {filteredAvailable.length > 0 && (
                <div>
                  <h3 className="text-lg font-semibold mb-4 text-gray-700">
                    Available Badges ({filteredAvailable.length})
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAvailable.map((badge) => (
                      <Card key={badge.id} className="border-2 border-gray-200 opacity-75 relative overflow-hidden">
                        <div className="absolute top-2 right-2">
                          <Badge variant="outline" className="text-xs">
                            {badge.rarity}
                          </Badge>
                        </div>
                        <CardContent className="p-4">
                          <div className="text-center">
                            <div className="text-3xl mb-2 grayscale">{badge.icon}</div>
                            <h4 className="font-semibold text-sm mb-1">{badge.name}</h4>
                            <p className="text-xs font-arabic text-gray-600 mb-2">{badge.arabicName}</p>
                            <p className="text-xs text-gray-600 mb-3">{badge.description}</p>
                            <div className="flex items-center justify-center space-x-1 text-xs text-gray-500">
                              <Star className="h-3 w-3" />
                              <span>+{badge.xpReward} XP</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              {filteredUnlocked.length === 0 && filteredAvailable.length === 0 && (
                <div className="text-center py-8 text-gray-500">
                  <Trophy className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No badges in this category yet.</p>
                  <p className="text-sm">Start reading to earn your first badges!</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </main>
  );
}