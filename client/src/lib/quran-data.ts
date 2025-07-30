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
    if (arabicData.code !== 200) {
      throw new Error("Failed to fetch surah data");
    }

    // Fetch English translation
    const translationResponse = await fetch(
      `${quranApiBaseUrl}/surah/${surahNumber}/en.asad`
    );
    const translationData = await translationResponse.json();
    if (translationData.code !== 200) {
      throw new Error("Failed to fetch surah data");
    }
    
    // Fetch transliteration
    const transliterationResponse = await fetch(
      `${quranApiBaseUrl}/surah/${surahNumber}/en.transliteration`
    );
    const transliterationData = await transliterationResponse.json();
    
    if (arabicData.code !== 200 || translationData.code !== 200) {
      throw new Error("Failed to fetch surah data");
    }
    
    // Include transliteration if available
    const hasTransliteration = transliterationData.code === 200;
    
    const ayahs = arabicData.data.ayahs.map((ayah: any, index: number) => ({
      number: ayah.numberInSurah,
      text: ayah.text,
      translation: translationData.data.ayahs[index].text,
      transliteration: hasTransliteration ? transliterationData.data.ayahs[index].text : undefined,
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

export const getSurah = async (surahNumber: number): Promise<Surah> => {
  return fetchSurah(surahNumber);
};
