import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { surahs } from "@/lib/surahs";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface SurahSearchResult {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  numberOfAyahs: number;
  type: "surah";
}

interface AyahSearchResult {
  surahId: number;
  surahName: string;
  ayahNumber: number;
  type: "ayah";
}

type SearchResult = SurahSearchResult | AyahSearchResult;

export function SurahSearchIndex() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [, navigate] = useLocation();
  const searchInputRef = useRef<HTMLInputElement>(null);

  // Focus the search input when the dialog opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isOpen]);

  // Search logic
  useEffect(() => {
    if (!searchTerm.trim()) {
      // Show first 10 surahs when search is empty
      setSearchResults(
        surahs.slice(0, 10).map(surah => ({
          id: surah.number,
          name: surah.name,
          englishName: surah.englishName,
          englishNameTranslation: surah.englishNameTranslation,
          numberOfAyahs: surah.numberOfAyahs,
          type: "surah"
        }))
      );
      return;
    }
    
    const term = searchTerm.toLowerCase();
    const results: SearchResult[] = [];
    
    // Search through surahs
    surahs.forEach(surah => {
      // Check if search matches surah name or translation
      if (
        surah.englishName.toLowerCase().includes(term) ||
        surah.englishNameTranslation.toLowerCase().includes(term) ||
        surah.name.includes(term)
      ) {
        results.push({
          id: surah.number,
          name: surah.name,
          englishName: surah.englishName,
          englishNameTranslation: surah.englishNameTranslation,
          numberOfAyahs: surah.numberOfAyahs,
          type: "surah"
        });
      }
      
      // Check if search is in format "surah:ayah"
      const surahAyahMatch = term.match(/(\d+):(\d+)/);
      if (surahAyahMatch) {
        const [, surahNum, ayahNum] = surahAyahMatch;
        const surahId = parseInt(surahNum);
        const ayahNumber = parseInt(ayahNum);
        
        const matchedSurah = surahs.find(s => s.number === surahId);
        if (matchedSurah && ayahNumber <= matchedSurah.numberOfAyahs) {
          results.push({
            surahId,
            surahName: matchedSurah.englishName,
            ayahNumber,
            type: "ayah"
          });
        }
      }
      
      // Check if search is just an ayah number
      const ayahMatch = /^\d+$/.test(term);
      if (ayahMatch && surah.numberOfAyahs >= parseInt(term)) {
        results.push({
          surahId: surah.number,
          surahName: surah.englishName,
          ayahNumber: parseInt(term),
          type: "ayah"
        });
      }
    });
    
    setSearchResults(results.slice(0, 20)); // Limit to 20 results
  }, [searchTerm]);
  
  const handleResultClick = (result: SearchResult) => {
    if (result.type === "surah") {
      navigate(`/surah/${result.id}`);
    } else {
      // Navigate to specific ayah (will be scrolled to in the surah page)
      navigate(`/surah/${result.surahId}?ayah=${result.ayahNumber}`);
    }
    setIsOpen(false);
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="w-full flex justify-between items-center"
          aria-label="Search Surahs and Ayahs"
        >
          <span className="flex items-center">
            <span className="material-symbols-rounded mr-2" aria-hidden="true">search</span>
            Find Surah or Ayah
          </span>
          <span className="text-xs text-gray-500 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded ml-2" aria-hidden="true">⌘K</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Search Quran</DialogTitle>
        </DialogHeader>
        
        <div className="mt-2 space-y-4">
          <div className="relative">
            <Input
              ref={searchInputRef}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by surah or ayah (e.g., 'Fatiha' or '2:255')"
              className="pl-9"
            />
            <span 
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 material-symbols-rounded" 
              aria-hidden="true"
            >
              search
            </span>
          </div>
          
          <ScrollArea className="h-[300px] rounded-md border p-2">
            <div className="space-y-1">
              {searchResults.length === 0 ? (
                <p className="text-center py-4 text-gray-500">No results found</p>
              ) : (
                searchResults.map((result, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start text-left"
                    onClick={() => handleResultClick(result)}
                  >
                    {result.type === "surah" ? (
                      <div className="flex justify-between w-full">
                        <div>
                          <span className="font-medium">{result.englishName}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                            {result.englishNameTranslation}
                          </span>
                        </div>
                        <span className="arabic-text">{result.name}</span>
                      </div>
                    ) : (
                      <div className="flex justify-between w-full">
                        <div>
                          <span className="font-medium">{result.surahName}</span>
                          <span className="text-gray-500 dark:text-gray-400 ml-2 text-sm">
                            Ayah {result.ayahNumber}
                          </span>
                        </div>
                        <span className="text-primary">
                          {result.surahId}:{result.ayahNumber}
                        </span>
                      </div>
                    )}
                  </Button>
                ))
              )}
            </div>
          </ScrollArea>
        </div>
      </DialogContent>
    </Dialog>
  );
}