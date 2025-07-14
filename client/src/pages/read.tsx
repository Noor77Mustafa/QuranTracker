import { useEffect, useState } from "react";
import { Link } from "wouter";
import { surahs } from "@/lib/surahs";

type SortType = "ascending" | "descending";
type DisplayType = "surah" | "juz" | "revelation";

export default function Read() {
  const [sortOrder, setSortOrder] = useState<SortType>("ascending");
  const [displayType, setDisplayType] = useState<DisplayType>("surah");
  
  // Set page title
  useEffect(() => {
    document.title = "Read Quran - MyQuran";
  }, []);
  
  // Sort surahs based on current display type and sort order
  const sortedSurahs = [...surahs].sort((a, b) => {
    let compareValue;
    
    if (displayType === "juz") {
      // Sort by Juz number, then by surah number within the same Juz
      compareValue = (a.juzNumber || 0) - (b.juzNumber || 0);
      if (compareValue === 0) {
        compareValue = a.number - b.number;
      }
    } else if (displayType === "revelation") {
      // Sort by revelation order
      compareValue = (a.revelationOrder || 0) - (b.revelationOrder || 0);
    } else {
      // Sort by surah number (default)
      compareValue = a.number - b.number;
    }
    
    return sortOrder === "ascending" ? compareValue : -compareValue;
  });
  
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "ascending" ? "descending" : "ascending");
  };
  
  return (
    <main className="container mx-auto px-4 py-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold">Quran Explorer</h1>
        <button 
          onClick={toggleSortOrder}
          className="flex items-center text-primary text-sm"
        >
          <span>Sort by: {sortOrder === "ascending" ? "Ascending" : "Descending"}</span>
          <span className="material-symbols-rounded ml-1">
            {sortOrder === "ascending" ? "arrow_downward" : "arrow_upward"}
          </span>
        </button>
      </div>
      
      {/* Navigation tabs */}
      <div className="flex border-b border-gray-200 dark:border-gray-700 mb-6">
        <button 
          className={`px-4 py-2 ${displayType === "surah" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setDisplayType("surah")}
        >
          Surah
        </button>
        <button 
          className={`px-4 py-2 ${displayType === "juz" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setDisplayType("juz")}
        >
          Juz
        </button>
        <button 
          className={`px-4 py-2 ${displayType === "revelation" ? "border-b-2 border-primary text-primary font-medium" : "text-gray-500 dark:text-gray-400"}`}
          onClick={() => setDisplayType("revelation")}
        >
          Revelation Order
        </button>
      </div>
      
      {/* Surah List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {sortedSurahs.map((surah) => (
          <Link 
            key={surah.id} 
            href={`/surah/${surah.id}`}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 hover:shadow-md transition flex justify-between"
          >
            <div>
              <h3 className="font-medium">{surah.englishName}</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{surah.englishNameTranslation}</p>
              <div className="flex items-center gap-2 text-xs text-gray-400 dark:text-gray-500">
                <span>{surah.numberOfAyahs} Ayahs</span>
                <span>•</span>
                <span>{surah.revelationType}</span>
                {displayType === "juz" && surah.juzNumber && (
                  <>
                    <span>•</span>
                    <span>Juz {surah.juzNumber}</span>
                  </>
                )}
                {displayType === "revelation" && surah.revelationOrder && (
                  <>
                    <span>•</span>
                    <span>#{surah.revelationOrder}</span>
                  </>
                )}
              </div>
            </div>
            <div className="flex flex-col items-end">
              <span className="font-amiri text-xl">{surah.arabicNumber}</span>
              <span className="text-xs text-gray-400 dark:text-gray-500">
                {displayType === "juz" && surah.juzNumber ? `J${surah.juzNumber}` : 
                 displayType === "revelation" && surah.revelationOrder ? `R${surah.revelationOrder}` :
                 surah.number.toString().padStart(3, '0')}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
