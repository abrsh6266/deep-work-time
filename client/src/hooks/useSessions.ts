"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useSessions(page = 1, limit = 20) {
  const queryClient = useQueryClient();

  const sessionsQuery = useQuery({
    queryKey: ["sessions", page, limit],
    queryFn: () => api.getSessions(page, limit),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteSession(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
    },
  });

  return {
    sessions: sessionsQuery.data?.data || [],
    total: sessionsQuery.data?.total || 0,
    totalPages: sessionsQuery.data?.totalPages || 0,
    isLoading: sessionsQuery.isLoading,
    error: sessionsQuery.error,
    deleteSession: deleteMutation.mutate,
  };
}
