import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface User {
  id: number;
  username: string;
  displayName?: string;
  email?: string;
  level: number;
  xp: number;
  points: number;
  avatarUrl?: string;
  lastActive?: string;
  preferences?: {
    theme: string;
    fontSizeArabic: number;
    fontSizeTranslation: number;
    reciter: string;
    translationSource: string;
    showTajweed: boolean;
  };
}

export function useAuth() {
  const queryClient = useQueryClient();
  
  const { data: user, isLoading, error } = useQuery<User>({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await fetch("/api/auth/me");
      if (!response.ok) {
        if (response.status === 401) {
          return null; // Not authenticated
        }
        throw new Error("Failed to fetch user");
      }
      return response.json();
    },
    retry: false,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
  
  const logout = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/auth/logout", {
        method: "POST",
      });
      if (!response.ok) {
        throw new Error("Failed to logout");
      }
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["auth"] });
      
      // Clear all other queries as well to avoid stale data
      queryClient.invalidateQueries();
    },
  });
  
  return {
    user,
    isLoading,
    error,
    isAuthenticated: !!user,
    logout: logout.mutate,
    isLoggingOut: logout.isPending,
  };
}