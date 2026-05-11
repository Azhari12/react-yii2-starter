import { getDashboardSummary, getDashboardStats } from "@/api/dashboardApi";
import { useSuspenseQuery } from "@tanstack/react-query";

export const useDashboardSummaryQuery = () => {
  return useSuspenseQuery({
    queryKey: ["dashboard-summary"],
    queryFn: getDashboardSummary,
    staleTime: 2 * 60 * 1000,
  });
};

export const useDashboardStatsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["dashboard-stats"],
    queryFn: getDashboardStats,
    staleTime: 2 * 60 * 1000,
  });
};
