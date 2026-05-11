import { request } from "./apiClient";

export const getDashboardSummary = async () => {
  const response = await request.get("/api/dashboard/summary");
  return response.data;
};

export const getDashboardStats = async () => {
  const response = await request.get("/api/dashboard/stats");
  return response.data;
};
