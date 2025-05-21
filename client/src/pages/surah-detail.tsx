import { useEffect, useState, useRef } from "react";
import { useRoute } from "wouter";
import { Surah, getSurah, Ayah } from "@/lib/quran-data";
import { Button } from "@/components/ui/button";
import { useStreak } from "@/hooks/use-streak";
import { useAchievements } from "@/hooks/use-achievements";
import { motion } from "framer-motion";

export default function SurahDetail() {
  const [, params] = useRoute("/surah/:id");
  const surahId = params?.id ? parseInt(params.id) : 1;
  
  const [surah, setSurah] = useState<Surah | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentAyah, setCurrentAyah] = useState(1);
  const [showTranslation, setShowTranslation] = useState(true);
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
            onClick={() => window.location.reload()}
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
    <main className="container mx-auto px-4 py-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden mb-6">
        <div className="bg-primary text-white p-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-xl font-semibold">{surah.englishName}</h1>
              <p className="text-white/80 text-sm">{surah.englishNameTranslation}</p>
            </div>
            <div className="text-right">
              <p className="font-amiri text-2xl">{surah.name}</p>
              <p className="text-white/80 text-sm">{surah.numberOfAyahs} Ayahs • {surah.revelationType}</p>
            </div>
          </div>
        </div>
        
        {/* Current Ayah Display */}
        <div className="p-6">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400">
              Ayah {currentAyah} of {surah.numberOfAyahs}
            </h2>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowTranslation(!showTranslation)}
            >
              {showTranslation ? "Hide" : "Show"} Translation
            </Button>
          </div>
          
          {/* Arabic Text */}
          <motion.p 
            key={`arabic-${currentAyah}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="font-amiri text-2xl md:text-3xl leading-loose text-right mb-4 arabic-text"
          >
            {currentAyahData.text}
          </motion.p>
          
          {/* Translation */}
          {showTranslation && (
            <motion.p 
              key={`translation-${currentAyah}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
              className="text-gray-700 dark:text-gray-300 mb-6"
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
            >
              <span className="material-symbols-rounded">skip_previous</span>
            </Button>
            
            <Button
              variant="default"
              size="icon"
              className="h-12 w-12 rounded-full bg-primary text-white"
              onClick={togglePlayPause}
            >
              <span className="material-symbols-rounded">
                {isPlaying ? "pause" : "play_arrow"}
              </span>
            </Button>
            
            <Button
              variant="outline"
              size="icon"
              onClick={goToNextAyah}
              disabled={currentAyah === surah.numberOfAyahs}
            >
              <span className="material-symbols-rounded">skip_next</span>
            </Button>
            
            <audio ref={audioRef} className="hidden" />
          </div>
        </div>
      </div>
      
      {/* Ayah Navigation */}
      <div className="grid grid-cols-5 sm:grid-cols-10 gap-2 mb-8">
        {Array.from({ length: surah.numberOfAyahs }).map((_, index) => (
          <button
            key={index}
            className={`h-10 rounded-md transition-colors ${
              currentAyah === index + 1
                ? "bg-primary text-white"
                : "bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600"
            }`}
            onClick={() => setCurrentAyah(index + 1)}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </main>
  );
}
