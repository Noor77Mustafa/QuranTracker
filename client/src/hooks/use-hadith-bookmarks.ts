import { useEffect, useState } from "react";

export interface HadithBookmark {
  id: string;
  hadithId: string;
  collection: string;
  englishText?: string;
  arabicText?: string | null;
  timestamp: number;
}

export function useHadithBookmarks() {
  const [bookmarks, setBookmarks] = useState<HadithBookmark[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("hadith-bookmarks");
    if (saved) {
      try {
        setBookmarks(JSON.parse(saved));
      } catch (err) {
        console.error("Failed to parse hadith bookmarks", err);
        localStorage.removeItem("hadith-bookmarks");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hadith-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const addBookmark = (
    bookmark: Omit<HadithBookmark, "id" | "timestamp">
  ) => {
    const newBookmark: HadithBookmark = {
      ...bookmark,
      id: `${bookmark.hadithId}-${Date.now()}`,
      timestamp: Date.now(),
    };
    setBookmarks((prev) => [...prev, newBookmark]);
    return newBookmark;
  };

  const removeBookmark = (id: string) => {
    setBookmarks((prev) => prev.filter((b) => b.id !== id));
  };

  const isBookmarked = (hadithId: string) =>
    bookmarks.some((b) => b.hadithId === hadithId);

  const getBookmark = (hadithId: string) =>
    bookmarks.find((b) => b.hadithId === hadithId);

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, getBookmark };
}
