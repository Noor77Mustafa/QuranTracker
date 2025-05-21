/**
 * API Client for Quran API
 * Based on the resources from https://api-docs.quran.foundation/ and https://github.com/quran/quran.com-api
 */

// API base URLs
const QURAN_COM_API_URL = "https://api.quran.com/api/v4";
const AUDIO_QURAN_URL = "https://audio.quran.com/api/v1";

// Data types
export interface Surah {
  id: number;
  revelation_place: string;
  revelation_order: number;
  name_simple: string; 
  name_arabic: string;
  name_complex: string;
  verses_count: number;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface Verse {
  id: number;
  verse_key: string;
  text_uthmani: string;
  verse_number: number;
  translations: {
    id: number;
    text: string;
    resource_id: number;
  }[];
  audio: {
    url: string;
  } | null;
}

export interface Reciter {
  id: number;
  name: string;
  recitation_style: string;
  style: string;
}

export interface Translation {
  id: number;
  name: string;
  language_name: string;
  translator_name: string;
}

// API functions
export async function getSurahs(language = "en"): Promise<Surah[]> {
  try {
    const response = await fetch(`${QURAN_COM_API_URL}/chapters?language=${language}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch surahs: ${response.status}`);
    }
    const data = await response.json();
    return data.chapters || [];
  } catch (error) {
    console.error("Error fetching surahs:", error);
    // Return an empty array if there's an error
    return [];
  }
}

export async function getSurah(surahId: number, language = "en"): Promise<Surah | null> {
  try {
    const response = await fetch(`${QURAN_COM_API_URL}/chapters/${surahId}?language=${language}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch surah: ${response.status}`);
    }
    const data = await response.json();
    return data.chapter || null;
  } catch (error) {
    console.error(`Error fetching surah ${surahId}:`, error);
    return null;
  }
}

export async function getVerses(
  surahId: number, 
  page = 1, 
  translationId = 131, // Default to English (Saheeh International)
  wordByWord = false,
  limit = 10
): Promise<Verse[]> {
  try {
    let url = `${QURAN_COM_API_URL}/verses/by_chapter/${surahId}?language=en&page=${page}&limit=${limit}`;
    
    // Add translation if requested
    if (translationId) {
      url += `&translations=${translationId}`;
    }
    
    // Add word by word if requested
    if (wordByWord) {
      url += "&word_fields=text_uthmani,text_indopak&words=true";
    }
    
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to fetch verses: ${response.status}`);
    }
    const data = await response.json();
    return data.verses || [];
  } catch (error) {
    console.error(`Error fetching verses for surah ${surahId}:`, error);
    return [];
  }
}

export async function getAudioForVerse(
  verseKey: string, 
  reciterId = 7 // Default to Mishari Rashid al-Afasy
): Promise<string | null> {
  try {
    const response = await fetch(`${QURAN_COM_API_URL}/recitations/${reciterId}/by_ayah/${verseKey}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.status}`);
    }
    const data = await response.json();
    return data.audio_file?.url || null;
  } catch (error) {
    console.error(`Error fetching audio for verse ${verseKey}:`, error);
    return null;
  }
}

export async function getReciters(): Promise<Reciter[]> {
  try {
    const response = await fetch(`${QURAN_COM_API_URL}/resources/recitations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch reciters: ${response.status}`);
    }
    const data = await response.json();
    return data.reciters || [];
  } catch (error) {
    console.error("Error fetching reciters:", error);
    return [];
  }
}

export async function getTranslations(language = "en"): Promise<Translation[]> {
  try {
    const response = await fetch(`${QURAN_COM_API_URL}/resources/translations?language=${language}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.status}`);
    }
    const data = await response.json();
    return data.translations || [];
  } catch (error) {
    console.error("Error fetching translations:", error);
    return [];
  }
}

export async function searchQuran(
  query: string, 
  language = "en", 
  size = 20, 
  page = 0
): Promise<any> {
  try {
    const response = await fetch(
      `${QURAN_COM_API_URL}/search?q=${encodeURIComponent(query)}&size=${size}&page=${page}&language=${language}`
    );
    if (!response.ok) {
      throw new Error(`Failed to search: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    return { search: { results: [] } };
  }
}

export default {
  getSurahs,
  getSurah,
  getVerses,
  getAudioForVerse,
  getReciters,
  getTranslations,
  searchQuran
};