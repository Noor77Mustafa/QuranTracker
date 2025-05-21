/**
 * Quran API Service
 * Provides functions to fetch data from the Quran API
 * Based on the API documentation at https://api-docs.quran.foundation/
 */

import { apiRequest } from "./queryClient";

// Base URLs for different API sources
const QURAN_API_BASE_URL = "https://api.quran.com/api/v4";
const QURAN_FOUNDATION_API = "https://api.quran.foundation/v1";

// Types for API responses
export interface QuranEdition {
  id: number;
  name: string;
  language_name: string;
  translator_name?: string;
}

export interface QuranChapter {
  id: number;
  revelation_place: string;
  revelation_order: number;
  bismillah_pre: boolean;
  name_simple: string;
  name_arabic: string;
  name_complex: string;
  verses_count: number;
  translated_name: {
    name: string;
    language_name: string;
  };
}

export interface QuranVerse {
  id: number;
  verse_key: string;
  verse_number: number;
  text_uthmani: string;
  text_indopak?: string;
  text_imlaei?: string;
  juz_number: number;
  translations: {
    id: number;
    text: string;
    resource_name: string;
  }[];
  audio?: {
    url: string;
  };
}

export interface QuranJuz {
  id: number;
  juz_number: number;
  verse_mapping: Record<string, string>;
}

// Get all available Quran translations/editions
export async function getQuranEditions(): Promise<QuranEdition[]> {
  try {
    const response = await fetch(`${QURAN_API_BASE_URL}/resources/translations`);
    if (!response.ok) {
      throw new Error(`Failed to fetch translations: ${response.statusText}`);
    }
    const data = await response.json();
    return data.translations || [];
  } catch (error) {
    console.error("Error fetching Quran editions:", error);
    return [];
  }
}

// Get all chapters (surahs) of the Quran
export async function getQuranChapters(language = "en"): Promise<QuranChapter[]> {
  try {
    const response = await fetch(`${QURAN_API_BASE_URL}/chapters?language=${language}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chapters: ${response.statusText}`);
    }
    const data = await response.json();
    return data.chapters || [];
  } catch (error) {
    console.error("Error fetching Quran chapters:", error);
    return [];
  }
}

// Get a specific chapter (surah) by ID
export async function getChapter(chapterId: number, language = "en"): Promise<QuranChapter | null> {
  try {
    const response = await fetch(`${QURAN_API_BASE_URL}/chapters/${chapterId}?language=${language}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch chapter: ${response.statusText}`);
    }
    const data = await response.json();
    return data.chapter || null;
  } catch (error) {
    console.error(`Error fetching chapter ${chapterId}:`, error);
    return null;
  }
}

// Get verses for a specific chapter (surah)
export async function getVerses(
  chapterId: number, 
  translationId = 131, // Default to English translation
  page = 1,
  limit = 50
): Promise<QuranVerse[]> {
  try {
    const response = await fetch(
      `${QURAN_API_BASE_URL}/verses/by_chapter/${chapterId}?translation_fields=text&fields=text_uthmani,verse_key,verse_number&translations=${translationId}&page=${page}&limit=${limit}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch verses: ${response.statusText}`);
    }
    const data = await response.json();
    return data.verses || [];
  } catch (error) {
    console.error(`Error fetching verses for chapter ${chapterId}:`, error);
    return [];
  }
}

// Get audio recitation for a specific verse
export async function getVerseAudio(
  verseKey: string,
  recitationId = 7 // Default to Mishari Rashid al-Afasy
): Promise<string | null> {
  try {
    const response = await fetch(
      `${QURAN_API_BASE_URL}/recitations/${recitationId}/by_ayah/${verseKey}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch audio: ${response.statusText}`);
    }
    const data = await response.json();
    return data.audio_file?.audio_url || null;
  } catch (error) {
    console.error(`Error fetching audio for verse ${verseKey}:`, error);
    return null;
  }
}

// Get all Juz (parts) of the Quran
export async function getJuzs(): Promise<QuranJuz[]> {
  try {
    const response = await fetch(`${QURAN_API_BASE_URL}/juzs`);
    if (!response.ok) {
      throw new Error(`Failed to fetch juzs: ${response.statusText}`);
    }
    const data = await response.json();
    return data.juzs || [];
  } catch (error) {
    console.error("Error fetching juzs:", error);
    return [];
  }
}

// Search the Quran for specific keywords
export async function searchQuran(
  query: string,
  language = "en",
  size = 20,
  page = 0
): Promise<any> {
  try {
    const response = await fetch(
      `${QURAN_API_BASE_URL}/search?q=${encodeURIComponent(query)}&size=${size}&page=${page}&language=${language}`
    );
    if (!response.ok) {
      throw new Error(`Failed to search: ${response.statusText}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Error searching for "${query}":`, error);
    return { search: { result: [] }};
  }
}

// ---- Quran Foundation API methods ----

// Get tafsir (commentary) for a specific verse
export async function getTafsir(
  verseKey: string,
  language = "en",
  tafsirId = 1 // Default to Ibn Kathir
): Promise<any> {
  try {
    const response = await fetch(
      `${QURAN_FOUNDATION_API}/tafsir/${tafsirId}/by_ayah/${verseKey}?language=${language}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch tafsir: ${response.statusText}`);
    }
    const data = await response.json();
    return data.tafsir || null;
  } catch (error) {
    console.error(`Error fetching tafsir for verse ${verseKey}:`, error);
    return null;
  }
}

export default {
  getQuranEditions,
  getQuranChapters,
  getChapter,
  getVerses,
  getVerseAudio,
  getJuzs,
  searchQuran,
  getTafsir
};