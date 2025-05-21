import { Link } from "wouter";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements } from "@/hooks/use-achievements";

export default function QuranGrowthJourney() {
  // We'll use placeholder data for now and integrate with real data from API later
  const { streak, pagesRead } = useStreak();
  const { badges } = useAchievements();
  
  return (
    <div className="mt-8 bg-gradient-to-r from-secondary/90 to-secondary rounded-xl shadow-sm overflow-hidden text-white">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-2">Quran Growth Journey</h2>
        <p className="mb-4">Achieve Your Quran Goals</p>
        <p className="text-sm mb-6">Track Streaks, Create Custom Goals, Stay Consistent</p>
        
        {/* Achievement Cards */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {/* Streak Card */}
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <span className="material-symbols-rounded text-2xl mb-1">local_fire_department</span>
            <p className="text-xl font-bold">{streak}</p>
            <p className="text-xs">Day Streak</p>
          </div>
          
          {/* Pages Read Card */}
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <span className="material-symbols-rounded text-2xl mb-1">menu_book</span>
            <p className="text-xl font-bold">{pagesRead}</p>
            <p className="text-xs">Pages Read</p>
          </div>
          
          {/* Badges Card */}
          <div className="bg-white/10 rounded-lg p-3 text-center">
            <span className="material-symbols-rounded text-2xl mb-1">workspace_premium</span>
            <p className="text-xl font-bold">{badges.length}</p>
            <p className="text-xs">Badges</p>
          </div>
        </div>
        
        <Link href="/profile/goals">
          <a className="block w-full bg-white text-secondary py-3 rounded-lg text-center font-medium hover:bg-white/90 transition">
            Set a Daily Goal
          </a>
        </Link>
      </div>
    </div>
  );
}
