import { useState } from "react";
import { Link } from "wouter";
import { surahs } from "@/lib/surahs";

type TabType = "surah" | "juz" | "revelation";

export default function SurahExplorer() {
  const [activeTab, setActiveTab] = useState<TabType>("surah");
  
  // Display all 114 surahs 
  const displayedSurahs = surahs;
  
  return (
    <div className="mt-8">
      <h2 className="text-lg font-semibold mb-4">Surahs</h2>
      
      {/* Surah Navigation */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-4">
        <button 
          className={`px-4 py-2 ${activeTab === "surah" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setActiveTab("surah")}
        >
          Surah
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === "juz" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setActiveTab("juz")}
        >
          Juz
        </button>
        <button 
          className={`px-4 py-2 ${activeTab === "revelation" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setActiveTab("revelation")}
        >
          Revelation Order
        </button>
      </div>
      
      {/* Surah List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
        {displayedSurahs.map((surah) => (
          <Link 
            key={surah.id} 
            href={`/surah/${surah.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition flex justify-between"
          >
            <div>
              <h3 className="font-medium">{surah.englishName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{surah.englishNameTranslation}</p>
              <div className="flex flex-wrap gap-2 mt-1">
                <p className="text-xs text-gray-400 dark:text-gray-500">{surah.numberOfAyahs} Ayahs</p>
                <span className="text-xs bg-primary/10 text-primary px-1.5 rounded">Juz {Math.ceil(surah.number / 5)}</span>
                <span className="text-xs bg-secondary/10 text-secondary px-1.5 rounded">Rev #{surah.revelationType === "Meccan" ? 114 - surah.number : Math.floor(surah.number / 2)}</span>
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-amiri text-xl">{surah.arabicNumber}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">{surah.number.toString().padStart(3, '0')}</span>
            </div>
          </Link>
        ))}
      </div>
      
      {/* Pagination is no longer needed since we're showing all surahs */}
    </div>
  );
}
