import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { Link } from "wouter";
import { useEffect, useState } from "react";

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
  
  // Get the current day of the week (0-6, Sunday-Saturday)
  useEffect(() => {
    const day = new Date().getDay();
    setCurrentDay(day);
  }, []);
  
  // Select 2 surahs to feature based on the current day
  const getFeatureSurahs = () => {
    const firstIndex = currentDay % weeklySuggestions.length;
    const secondIndex = (currentDay + 2) % weeklySuggestions.length;
    return [weeklySuggestions[firstIndex], weeklySuggestions[secondIndex]];
  };
  
  const featuredSurahs = getFeatureSurahs();

  return (
    <Card className="shadow-md">
      <CardHeader className="pb-3">
        <CardTitle className="text-xl font-bold">Weekly Reading</CardTitle>
        <CardDescription>
          Suggested chapters for this week's spiritual journey
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {featuredSurahs.map((surah) => (
            <div key={surah.id} className="flex flex-col gap-2 p-3 rounded-lg bg-muted/50">
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
                <span className="text-xs">{surah.verses} verses</span>
                <Link href={`/read?surah=${surah.id}`}>
                  <Button variant="ghost" size="sm" className="flex items-center gap-1">
                    Read <ChevronRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}