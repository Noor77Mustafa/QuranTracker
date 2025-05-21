import QuickNav from "@/components/layout/quick-nav";
import StartReadingCard from "@/components/home/start-reading-card";
import GrowWithUsCard from "@/components/home/grow-with-us-card";
import ExploreTopics from "@/components/home/explore-topics";
import QuranInYear from "@/components/home/quran-in-year";
import LearningPlans from "@/components/home/learning-plans";
import QuranGrowthJourney from "@/components/home/quran-growth-journey";
import SurahExplorer from "@/components/home/surah-explorer";
import WeeklyReading from "@/components/home/weekly-reading";
import { useEffect } from "react";

export default function Home() {
  // Set page title
  useEffect(() => {
    document.title = "MyQuran - Explore the Quran and Track Your Progress";
  }, []);

  return (
    <main className="flex-grow container mx-auto px-4 py-4">
      <QuickNav />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StartReadingCard />
        <GrowWithUsCard />
      </div>
      
      <ExploreTopics />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <WeeklyReading />
        <QuranInYear />
      </div>
      <LearningPlans />
      <QuranGrowthJourney />
      <SurahExplorer />
    </main>
  );
}
