import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient, apiRequest } from "@/lib/queryClient";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";

export interface Bookmark {
  id: number;
  userId: number;
  surahId: number;
  ayahNumber: number;
  note: string | null;
  color: string | null;
  createdAt: string;
}

export interface BookmarkInput {
  surahId: number;
  ayahNumber: number;
  note?: string;
  color?: string;
}

export function useBookmarks() {
  const { user } = useAuth();
  const { toast } = useToast();

  // Fetch bookmarks from database
  const { data: bookmarks = [], isLoading } = useQuery({
    queryKey: ['/api/bookmarks'],
    enabled: !!user,
  });

  // Add bookmark mutation
  const addBookmarkMutation = useMutation({
    mutationFn: async (bookmark: BookmarkInput) => {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bookmark),
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to add bookmark');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "Bookmark added",
        description: "The ayah has been bookmarked successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to add bookmark. Please try again.",
        variant: "destructive",
      });
    },
  });

  // Remove bookmark mutation
  const removeBookmarkMutation = useMutation({
    mutationFn: async (bookmarkId: number) => {
      const response = await fetch(`/api/bookmarks/${bookmarkId}`, {
        method: 'DELETE',
        credentials: 'include',
      });
      if (!response.ok) {
        throw new Error('Failed to remove bookmark');
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/bookmarks'] });
      toast({
        title: "Bookmark removed",
        description: "The bookmark has been removed successfully",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to remove bookmark. Please try again.",
        variant: "destructive",
      });
    },
  });

  const addBookmark = (bookmark: BookmarkInput) => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please login to bookmark ayahs",
        variant: "destructive",
      });
      return;
    }
    addBookmarkMutation.mutate(bookmark);
  };

  const removeBookmark = (bookmarkId: number) => {
    removeBookmarkMutation.mutate(bookmarkId);
  };

  const isBookmarked = (surahId: number, ayahNumber: number) => {
    return (bookmarks as Bookmark[]).some(
      (bookmark) => bookmark.surahId === surahId && bookmark.ayahNumber === ayahNumber
    );
  };

  const getBookmark = (surahId: number, ayahNumber: number) => {
    return (bookmarks as Bookmark[]).find(
      (bookmark) => bookmark.surahId === surahId && bookmark.ayahNumber === ayahNumber
    );
  };

  return {
    bookmarks,
    isLoading,
    addBookmark,
    removeBookmark,
    isBookmarked,
    getBookmark,
  };
}