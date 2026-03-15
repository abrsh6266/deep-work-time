"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useBlockList() {
  const queryClient = useQueryClient();

  const blocklistQuery = useQuery({
    queryKey: ["blocklist"],
    queryFn: () => api.getBlocklist(),
  });

  const addMutation = useMutation({
    mutationFn: (domain: string) => api.addBlockedSite(domain),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocklist"] });
    },
  });

  const toggleMutation = useMutation({
    mutationFn: (id: string) => api.toggleBlockedSite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocklist"] });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => api.deleteBlockedSite(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blocklist"] });
    },
  });

  return {
    sites: blocklistQuery.data || [],
    isLoading: blocklistQuery.isLoading,
    error: blocklistQuery.error,
    addSite: addMutation.mutate,
    toggleSite: toggleMutation.mutate,
    deleteSite: deleteMutation.mutate,
  };
}
