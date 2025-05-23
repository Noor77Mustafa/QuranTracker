import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight, BookMarked, Clock } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

// Weekly suggested surahs with descriptions
const weeklySuggestions = [
  {
    id: 1,
    name: "Al-Fatiha",
    nameArabic: "الفاتحة",
    description: "The Opening - A perfect way to begin your week with the essence of the Quran",
    verses: 7,
    difficulty: "Beginner"
  },
  {
    id: 36,
    name: "Ya-Sin",
    nameArabic: "يس",
    description: "Often referred to as the 'Heart of the Quran' with powerful spiritual lessons",
    verses: 83,
    difficulty: "Intermediate"
  },
  {
    id: 55,
    name: "Ar-Rahman",
    nameArabic: "الرحمن",
    description: "The Most Merciful - Beautifully describes Allah's blessings and mercy",
    verses: 78,
    difficulty: "Intermediate"
  },
  {
    id: 67,
    name: "Al-Mulk",
    nameArabic: "الملك",
    description: "The Sovereignty - Recommended for nightly reading as protection",
    verses: 30,
    difficulty: "Beginner"
  }
];

export default function WeeklyReading() {
  const [currentDay, setCurrentDay] = useState(0);
  const [loading, setLoading] = useState(true);
  const [lastReadTimestamp, setLastReadTimestamp] = useState<number | null>(null);
  
  // Get the current day of the week (0-6, Sunday-Saturday)
  useEffect(() => {
    const day = new Date().getDay();
    setCurrentDay(day);
    
    // Simulate loading state for better UX
    const timer = setTimeout(() => {
      setLoading(false);
      
      // Check local storage for last read timestamp
      const lastRead = localStorage.getItem('lastReadTimestamp');
      if (lastRead) {
        setLastReadTimestamp(parseInt(lastRead));
      }
    }, 800);
    
    return () => clearTimeout(timer);
  }, []);
  
  // Select 2 surahs to feature based on the current day
  const getFeatureSurahs = () => {
    const firstIndex = currentDay % weeklySuggestions.length;
    const secondIndex = (currentDay + 2) % weeklySuggestions.length;
    return [weeklySuggestions[firstIndex], weeklySuggestions[secondIndex]];
  };
  
  // Format time since last read
  const getTimeSinceLastRead = () => {
    if (!lastReadTimestamp) return null;
    
    const now = Date.now();
    const diff = now - lastReadTimestamp;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    
    if (hours < 1) return 'less than an hour ago';
    if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`;
    
    const days = Math.floor(hours / 24);
    return `${days} day${days > 1 ? 's' : ''} ago`;
  };
  
  const featuredSurahs = getFeatureSurahs();
  const timeSinceLastRead = getTimeSinceLastRead();

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-xl font-bold">Weekly Reading</CardTitle>
            <CardDescription>
              Suggested chapters for this week's spiritual journey
            </CardDescription>
          </div>
          {timeSinceLastRead && (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    <span>Last read {timeSinceLastRead}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Continue your reading journey</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <>
              <div className="space-y-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
              <div className="space-y-2">
                <Skeleton className="h-6 w-2/3" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-full" />
                <div className="flex justify-between mt-2">
                  <Skeleton className="h-4 w-20" />
                  <Skeleton className="h-8 w-24" />
                </div>
              </div>
            </>
          ) : (
            featuredSurahs.map((surah) => (
              <div key={surah.id} className="flex flex-col gap-2 p-3 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium">{surah.name}</h3>
                    <p className="text-sm opacity-90">{surah.nameArabic}</p>
                  </div>
                  <Badge variant={surah.difficulty === "Beginner" ? "default" : "secondary"}>
                    {surah.difficulty}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground">{surah.description}</p>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-xs flex items-center">
                    <BookMarked className="h-3 w-3 mr-1" />
                    {surah.verses} verses
                  </span>
                  <Link href={`/read?surah=${surah.id}`}>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 hover:bg-primary hover:text-primary-foreground">
                      Read <ChevronRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>
    </Card>
  );
}