import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { surahs } from "@/lib/surahs";

interface WeeklyReading {
  surahId: number;
  surahName: string;
  startAyah: number;
  endAyah: number;
  theme: string;
}

export default function WeeklyReading() {
  const [weeklyReadings, setWeeklyReadings] = useState<WeeklyReading[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // In a real app, this would fetch from an API
    // For now, we'll generate some recommendations
    
    // Get current date
    const today = new Date();
    const weekNumber = Math.floor(today.getDate() / 7) + 1;
    const monthIndex = today.getMonth();
    
    // Use the current month and week number to seed our selections
    // This ensures the recommendations change weekly but are consistent for all users
    const selectedSurahs = getWeeklySelections(monthIndex, weekNumber);
    
    setWeeklyReadings(selectedSurahs);
    setLoading(false);
  }, []);
  
  return (
    <Card className="w-full">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl flex items-center justify-between">
          This Week's Reading
          <Link href="/read">
            <Button variant="outline" size="sm" className="ml-auto">View All</Button>
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-1">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="flex items-center space-x-4">
                <div className="h-12 w-12 rounded-full bg-gray-200 dark:bg-gray-700"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                  <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-1/2"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="space-y-3">
            {weeklyReadings.map((reading) => (
              <Link key={reading.surahId} href={`/surah/${reading.surahId}`}>
                <div className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition cursor-pointer">
                  <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary font-medium">
                    {reading.surahId}
                  </div>
                  <div>
                    <h3 className="font-medium text-base">{reading.surahName}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Ayah {reading.startAyah}-{reading.endAyah} • {reading.theme}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
            
            <div className="pt-2">
              <Link href="/read">
                <Button variant="ghost" size="sm" className="w-full">
                  See all surahs
                  <span className="material-symbols-rounded ml-1 text-sm">arrow_forward</span>
                </Button>
              </Link>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

// Helper function to get weekly selections based on month and week
function getWeeklySelections(monthIndex: number, weekNumber: number): WeeklyReading[] {
  // Seed based on month and week for consistent but changing recommendations
  const seed = monthIndex * 10 + weekNumber;
  
  // Themes for the readings
  const themes = [
    "Faith & Spirituality",
    "Stories of Prophets",
    "Guidance & Wisdom",
    "Prayer & Worship",
    "Mercy & Compassion",
    "Ethics & Morality",
    "Patience & Gratitude",
    "Knowledge & Reflection"
  ];
  
  // Select 3 surahs based on the seed
  const selectedIndices = [
    (seed % 20) + 1,             // Short surah (1-20)
    ((seed + 7) % 30) + 30,      // Medium surah (30-60)
    ((seed + 13) % 40) + 60      // Longer surah (60-100)
  ];
  
  return selectedIndices.map((index, i) => {
    const surah = surahs.find(s => s.number === index) || surahs[0];
    const startAyah = 1;
    // Limit the reading portion depending on surah length
    const portionSize = surah.numberOfAyahs > 50 ? 10 : (surah.numberOfAyahs > 20 ? 7 : 5);
    const endAyah = Math.min(startAyah + portionSize, surah.numberOfAyahs);
    
    return {
      surahId: surah.number,
      surahName: surah.englishName,
      startAyah,
      endAyah,
      theme: themes[(seed + i) % themes.length]
    };
  });
}