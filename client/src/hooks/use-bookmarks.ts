import { useState, useEffect } from "react";

export interface Bookmark {
  id: string;
  surahId: number;
  surahName: string;
  ayahNumber: number;
  timestamp: number;
  notes?: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  
  // Load bookmarks from localStorage on mount
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("quran-bookmarks");
    if (savedBookmarks) {
      try {
        setBookmarks(JSON.parse(savedBookmarks));
      } catch (error) {
        console.error("Failed to parse bookmarks:", error);
        // Reset bookmarks if there's an issue with the stored data
        localStorage.removeItem("quran-bookmarks");
      }
    }
  }, []);
  
  // Save bookmarks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("quran-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);
  
  /**
   * Add a new bookmark
   */
  const addBookmark = (bookmark: Omit<Bookmark, "id" | "timestamp">) => {
    const newBookmark: Bookmark = {
      ...bookmark,
      id: `${bookmark.surahId}-${bookmark.ayahNumber}-${Date.now()}`,
      timestamp: Date.now()
    };
    
    setBookmarks(prev => [...prev, newBookmark]);
    return newBookmark;
  };
  
  /**
   * Update an existing bookmark
   */
  const updateBookmark = (id: string, updates: Partial<Omit<Bookmark, "id">>) => {
    setBookmarks(prev => 
      prev.map(bookmark => 
        bookmark.id === id 
          ? { ...bookmark, ...updates } 
          : bookmark
      )
    );
  };
  
  /**
   * Remove a bookmark by ID
   */
  const removeBookmark = (id: string) => {
    setBookmarks(prev => prev.filter(bookmark => bookmark.id !== id));
  };
  
  /**
   * Check if a specific ayah is bookmarked
   */
  const isBookmarked = (surahId: number, ayahNumber: number) => {
    return bookmarks.some(
      bookmark => bookmark.surahId === surahId && bookmark.ayahNumber === ayahNumber
    );
  };
  
  /**
   * Get bookmark by surah and ayah
   */
  const getBookmark = (surahId: number, ayahNumber: number) => {
    return bookmarks.find(
      bookmark => bookmark.surahId === surahId && bookmark.ayahNumber === ayahNumber
    );
  };
  
  return {
    bookmarks,
    addBookmark,
    updateBookmark,
    removeBookmark,
    isBookmarked,
    getBookmark
  };
}