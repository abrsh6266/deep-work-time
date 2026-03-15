"use client";

import { useQuery } from "@tanstack/react-query";
import { api } from "@/lib/api";

export function useStats() {
  const dailyScoreQuery = useQuery({
    queryKey: ["stats", "daily-score"],
    queryFn: () => api.getDailyScore(),
    refetchInterval: 60000, // refetch every minute
  });

  const weeklyStatsQuery = useQuery({
    queryKey: ["stats", "weekly"],
    queryFn: () => api.getWeeklyStats(),
  });

  const overallStatsQuery = useQuery({
    queryKey: ["stats", "overall"],
    queryFn: () => api.getOverallStats(),
  });

  return {
    dailyScore: dailyScoreQuery.data,
    weeklyStats: weeklyStatsQuery.data || [],
    overallStats: overallStatsQuery.data,
    isLoading:
      dailyScoreQuery.isLoading ||
      weeklyStatsQuery.isLoading ||
      overallStatsQuery.isLoading,
    error:
      dailyScoreQuery.error ||
      weeklyStatsQuery.error ||
      overallStatsQuery.error,
  };
}
