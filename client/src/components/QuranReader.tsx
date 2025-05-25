import { useState, useEffect } from "react";
import { getSurah, getVerses } from "@/lib/api-client";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface QuranReaderProps {
  surahId: number;
  initialVerseNumber?: number;
}

export default function QuranReader({ surahId, initialVerseNumber = 1 }: QuranReaderProps) {
  const [surah, setSurah] = useState<any>(null);
  const [verses, setVerses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  
  // Fetch surah details
  useEffect(() => {
    async function fetchSurahDetails() {
      setLoading(true);
      try {
        const surahData = await getSurah(surahId);
        setSurah(surahData);
      } catch (err) {
        setError("Could not load surah details. Please try again later.");
        console.error("Error fetching surah:", err);
      }
    }
    
    fetchSurahDetails();
  }, [surahId]);
  
  // Fetch verses
  useEffect(() => {
    async function fetchVerses() {
      if (!surah) return;
      
      setLoading(true);
      try {
        const versesData = await getVerses(surahId, currentPage);
        
        if (currentPage === 1) {
          setVerses(versesData);
        } else {
          setVerses(prev => [...prev, ...versesData]);
        }
        
        setHasMore(versesData.length > 0);
      } catch (err) {
        setError("Could not load verses. Please try again later.");
        console.error("Error fetching verses:", err);
      } finally {
        setLoading(false);
      }
    }
    
    fetchVerses();
  }, [surahId, currentPage, surah]);
  
  // Load more verses
  const loadMore = () => {
    setCurrentPage(prev => prev + 1);
  };
  
  if (error) {
    return (
      <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg text-red-800 dark:text-red-200">
        <h3 className="font-medium mb-2">Error Loading Quran Content</h3>
        <p>{error}</p>
        <Button 
          variant="outline" 
          onClick={() => window.location.reload()} 
          className="mt-4"
        >
          Try Again
        </Button>
      </div>
    );
  }
  
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-4">
      {/* Surah Header */}
      {surah ? (
        <div className="mb-6 text-center">
          <h2 className="text-2xl font-bold mb-1">{surah.name_arabic}</h2>
          <h3 className="text-lg mb-2">{surah.name_simple}</h3>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {surah.translated_name.name} • {surah.revelation_place} • {surah.verses_count} Verses
          </p>
          
          {/* Bismillah - display for all Surahs except At-Tawbah (9) */}
          {surah.id !== 9 && (
            <div className="my-6 text-center">
              <p className="text-xl rtl text-primary font-arabic">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
              <p className="text-sm mt-2 text-gray-600 dark:text-gray-400">In the name of Allah, the Entirely Merciful, the Especially Merciful</p>
            </div>
          )}
        </div>
      ) : (
        <div className="mb-6">
          <Skeleton className="h-8 w-2/3 mx-auto mb-2" />
          <Skeleton className="h-6 w-1/2 mx-auto mb-2" />
          <Skeleton className="h-4 w-1/3 mx-auto" />
        </div>
      )}
      
      {/* Verses */}
      <div className="space-y-6">
        {loading && verses.length === 0 ? (
          // Loading skeletons
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="border-b border-gray-200 dark:border-gray-700 pb-4">
              <Skeleton className="h-6 w-12 mb-2" />
              <Skeleton className="h-8 w-full mb-3" />
              <Skeleton className="h-4 w-full" />
            </div>
          ))
        ) : (
          // Actual verses
          verses.map(verse => (
            <div 
              key={verse.id} 
              className="verse-container border-b border-gray-200 dark:border-gray-700 pb-4 last:border-0"
            >
              <div className="flex items-center justify-between mb-2">
                <span className="bg-primary/10 text-primary px-2 py-1 rounded-full text-sm font-medium">
                  {verse.verse_number}
                </span>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="material-symbols-rounded text-gray-600 dark:text-gray-400">bookmark_add</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <span className="material-symbols-rounded text-gray-600 dark:text-gray-400">play_circle</span>
                  </Button>
                </div>
              </div>
              
              <p className="text-xl rtl text-right mb-3 font-arabic leading-loose">{verse.text_uthmani}</p>
              
              {verse.translations && verse.translations.length > 0 && (
                <p className="text-gray-700 dark:text-gray-300">{verse.translations[0].text}</p>
              )}
            </div>
          ))
        )}
      </div>
      
      {/* Load More */}
      {!loading && hasMore && (
        <div className="mt-6 text-center">
          <Button onClick={loadMore}>Load More Verses</Button>
        </div>
      )}
      
      {loading && verses.length > 0 && (
        <div className="mt-6 flex justify-center">
          <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
}