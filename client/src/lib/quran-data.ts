// This is a simplified version. In a real app, we would use a more comprehensive API
// or complete data source for Quran content.

export interface Ayah {
  number: number;
  text: string;
  translation: string;
  transliteration?: string;
  audioUrl?: string;
}

export interface Surah {
  id: number;
  name: string;
  englishName: string;
  englishNameTranslation: string;
  revelationType: "Meccan" | "Medinan";
  numberOfAyahs: number;
  ayahs: Ayah[];
}

const quranApiBaseUrl = "https://api.alquran.cloud/v1";

export const fetchSurah = async (surahNumber: number): Promise<Surah> => {
  try {
    // Fetch Arabic text
    const arabicResponse = await fetch(
      `${quranApiBaseUrl}/surah/${surahNumber}`
    );
    const arabicData = await arabicResponse.json();
    
    // Fetch English translation
    const translationResponse = await fetch(
      `${quranApiBaseUrl}/surah/${surahNumber}/en.asad`
    );
    const translationData = await translationResponse.json();
    
    if (arabicData.code !== 200 || translationData.code !== 200) {
      throw new Error("Failed to fetch surah data");
    }
    
    const ayahs = arabicData.data.ayahs.map((ayah: any, index: number) => ({
      number: ayah.numberInSurah,
      text: ayah.text,
      translation: translationData.data.ayahs[index].text,
      audioUrl: `https://cdn.islamic.network/quran/audio/128/ar.alafasy/${ayah.number}.mp3`,
    }));
    
    return {
      id: arabicData.data.number,
      name: arabicData.data.name,
      englishName: arabicData.data.englishName,
      englishNameTranslation: arabicData.data.englishNameTranslation,
      revelationType: arabicData.data.revelationType,
      numberOfAyahs: arabicData.data.numberOfAyahs,
      ayahs,
    };
  } catch (error) {
    console.error("Error fetching surah:", error);
    throw error;
  }
};

// Cache for storing already fetched surahs
const surahCache = new Map<number, Surah>();

export const getSurah = async (surahNumber: number): Promise<Surah> => {
  // Check if the surah is in the cache
  if (surahCache.has(surahNumber)) {
    return surahCache.get(surahNumber)!;
  }
  
  // If not, fetch it and store in cache
  const surah = await fetchSurah(surahNumber);
  surahCache.set(surahNumber, surah);
  return surah;
};
