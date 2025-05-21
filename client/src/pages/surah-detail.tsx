import { useEffect, useState, useRef } from "react";
import { useRoute, useLocation } from "wouter";
import { Surah, getSurah, Ayah } from "@/lib/quran-data";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements } from "@/hooks/use-achievements";
import { motion } from "framer-motion";
import { SurahSearchIndex } from "@/components/surah/surah-search-index";

export default function SurahDetail() {
  const [, params] = useRoute("/surah/:id");
  const [location] = useLocation();
  const surahId = params?.id ? parseInt(params.id) : 1;
  
  // Get ayah from URL query parameter if present
  const ayahParam = new URLSearchParams(location.split('?')[1]).get('ayah');
  
  const [surah, setSurah] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAyah, setCurrentAyah] = useState(ayahParam ? parseInt(ayahParam) : 1);
  const [showTranslation, setShowTranslation] = useState(true);
  const [showTransliteration, setShowTransliteration] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const { updateStreak, incrementPagesRead } = useStreak();
  const { checkForAchievements } = useAchievements();
  
  // Fetch surah data
  useEffect(() => {
    setIsLoading(true);
    setError(null);
    
    getSurah(surahId)
      .then((data) => {
        setSurah(data);
        setIsLoading(false);
        
        // Update page title
        document.title = `${data.englishName} (${data.englishNameTranslation}) - MyQuran`;
      })
      .catch((err) => {
        setError("Failed to load surah. Please try again.");
        setIsLoading(false);
        console.error("Error loading surah:", err);
      });
  }, [surahId]);
  
  // Update reading streak when visiting a surah
  useEffect(() => {
    if (surah) {
      updateStreak();
      incrementPagesRead(1);
      checkForAchievements({ pagesRead: 1, streak: 1 });
    }
  }, [surah]);
  
  // Handle audio playback
  useEffect(() => {
    if (audioRef.current && surah) {
      const audio = audioRef.current;
      
      const handleEnded = () => {
        if (currentAyah < surah.numberOfAyahs) {
          setCurrentAyah(currentAyah + 1);
        } else {
          setIsPlaying(false);
        }
      };
      
      audio.addEventListener("ended", handleEnded);
      
      // Load current ayah audio
      if (surah.ayahs[currentAyah - 1]?.audioUrl) {
        audio.src = surah.ayahs[currentAyah - 1].audioUrl || "";
        if (isPlaying) {
          audio.play().catch(err => console.error("Audio play error:", err));
        } else {
          audio.pause();
        }
      }
      
      return () => {
        audio.removeEventListener("ended", handleEnded);
      };
    }
  }, [currentAyah, isPlaying, surah]);
  
  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };
  
  const goToNextAyah = () => {
    if (surah && currentAyah < surah.numberOfAyahs) {
      setCurrentAyah(currentAyah + 1);
    }
  };
  
  const goToPrevAyah = () => {
    if (currentAyah > 1) {
      setCurrentAyah(currentAyah - 1);
    }
  };
  
  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading surah...</p>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200 p-4 rounded-lg">
          <h2 className="text-lg font-semibold mb-2">Error</h2>
          <p>{error}</p>
          <Button 
            variant="outline" 
            className="mt-4" 
            onClick={() => {
              setIsLoading(true);
              setError(null);
              getSurah(surahId)
                .then((data) => {
                  setSurah(data);
                  setIsLoading(false);
                })
                .catch((err) => {
                  setError("Failed to load surah. Please try again.");
                  setIsLoading(false);
                  console.error("Error loading surah:", err);
                });
            }}
          >
            Retry
          </Button>
        </div>
      </div>
    );
  }
  
  if (!surah) {
    return null;
  }
  
  const currentAyahData = surah.ayahs[currentAyah - 1];
  
  return (
    <main id="main-content" className="container mx-auto px-4 py-4">
      {/* Search component */}
      <div className="mb-4">
        <SurahSearchIndex />
      </div>
      
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-primary text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">{surah.englishName}</h1>
              <p className="text-white/80 text-sm">{surah.englishNameTranslation}</p>
            </div>
            <div className="text-right">
              <p className="font-amiri text-2xl">{surah.name}</p>
              <p className="text-white/80 text-sm" aria-label={`${surah.numberOfAyahs} Ayahs, ${surah.revelationType} revelation`}>
                {surah.numberOfAyahs} Ayahs • {surah.revelationType}
              </p>
            </div>
          </div>
        </div>
        
        {/* Current Ayah Display */}
        <div className="p-6">
          <div className="mb-6 flex flex-wrap justify-between items-center gap-2">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ayah {currentAyah} of {surah.numberOfAyahs}
            </h2>
            <div className="flex flex-wrap gap-2">
              <div className="flex items-center space-x-2">
                <Switch 
                  id="translation-toggle" 
                  checked={showTranslation} 
                  onCheckedChange={setShowTranslation}
                  aria-label="Toggle translation"
                />
                <Label htmlFor="translation-toggle">Translation</Label>
              </div>
              
              <div className="flex items-center space-x-2">
                <Switch 
                  id="transliteration-toggle" 
                  checked={showTransliteration} 
                  onCheckedChange={setShowTransliteration}
                  aria-label="Toggle transliteration"
                />
                <Label htmlFor="transliteration-toggle">Transliteration</Label>
              </div>
            </div>
          </div>
          
          {/* Arabic Text */}
          <motion.p 
            key={`arabic-${currentAyah}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-amiri text-2xl md:text-3xl leading-loose text-right mb-4 arabic-text"
            lang="ar"
            dir="rtl"
          >
            {currentAyahData.text}
          </motion.p>
          
          {/* Transliteration */}
          {showTransliteration && (
            <motion.p 
              key={`transliteration-${currentAyah}`}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.05 }}
              className="text-gray-600 dark:text-gray-400 italic mb-3 text-lg"
            >
              {currentAyahData.transliteration || "Transliteration not available for this ayah"}
            </motion.p>
          )}
          
          {/* Translation */}
          {showTranslation && (
            <motion.p 
              key={`translation-${currentAyah}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-gray-700 dark:text-gray-300 mb-6"
              lang="en"
            >
              {currentAyahData.translation}
            </motion.p>
          )}
          
          {/* Audio Player Controls */}
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              size="icon"
              onClick={goToPrevAyah}
              disabled={currentAyah === 1}
              className="transition-transform active:scale-95"
              aria-label="Previous ayah"
            >
              <span className="material-symbols-rounded">skip_previous</span>
            </Button>
            
            <Button
              variant="default"
              size="icon"
              className="h-14 w-14 rounded-full bg-primary text-white shadow-md transition-all active:scale-95 hover:shadow-lg"
              onClick={togglePlayPause}
              aria-label={isPlaying ? "Pause recitation" : "Play recitation"}
            >
              <span className="material-symbols-rounded text-2xl">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextAyah}
              disabled={currentAyah === surah.numberOfAyahs}
              className="transition-transform active:scale-95"
              aria-label="Next ayah"
            >
              <span className="material-symbols-rounded">skip_next</span>
            </Button>
            
            <div className="flex items-center">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 dark:text-gray-400"
                onClick={() => {
                  // Handle bookmark logic here
                  alert('Ayah bookmarked');
                }}
                aria-label="Bookmark this ayah"
              >
                <span className="material-symbols-rounded">bookmark_add</span>
              </Button>
              
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-500 dark:text-gray-400"
                onClick={() => {
                  // Handle share logic here
                  navigator.share?.({
                    title: `${surah.englishName} (Ayah ${currentAyah})`,
                    text: currentAyahData.translation,
                    url: window.location.href,
                  }).catch(() => {
                    alert('Shared ayah link copied to clipboard');
                  });
                }}
                aria-label="Share this ayah"
              >
                <span className="material-symbols-rounded">share</span>
              </Button>
            </div>
            
            <audio ref={audioRef} className="hidden" />
          </div>
        </div>
      </div>
      
      {/* Ayah Navigation */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">Navigate Ayahs</h3>
          <div className="flex items-center space-x-2">
            <button 
              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setCurrentAyah(1)}
            >
              First
            </button>
            <button 
              className="text-xs bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
              onClick={() => setCurrentAyah(surah.numberOfAyahs)}
            >
              Last
            </button>
          </div>
        </div>
        
        {/* Swipeable and scrollable row of ayah numbers */}
        <div className="overflow-x-auto overflow-y-hidden pb-2 no-scrollbar">
          <div className="flex gap-2 min-w-max px-1">
            {Array.from({ length: surah.numberOfAyahs }).map((_, index) => (
              <button
                key={index}
                className={`min-w-10 h-10 rounded-md transition-all ${
                  currentAyah === index + 1
                    ? "bg-primary text-white shadow-md scale-105 font-medium"
                    : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300"
                }`}
                onClick={() => setCurrentAyah(index + 1)}
                aria-label={`Go to Ayah ${index + 1}`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
        
        {/* Mobile-friendly ayah slider */}
        <div className="mt-4 px-2">
          <input
            type="range"
            min={1}
            max={surah.numberOfAyahs}
            value={currentAyah}
            onChange={(e) => setCurrentAyah(parseInt(e.target.value))}
            className="w-full accent-primary h-2 rounded-lg appearance-none cursor-pointer bg-gray-200 dark:bg-gray-700"
            aria-label="Ayah slider"
          />
          <div className="flex justify-between mt-1 text-xs text-gray-500 dark:text-gray-400">
            <span>1</span>
            <span>{Math.floor(surah.numberOfAyahs / 2)}</span>
            <span>{surah.numberOfAyahs}</span>
          </div>
        </div>
      </div>
    </main>
  );
}
