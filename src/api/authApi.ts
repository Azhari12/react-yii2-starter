import { request } from "./apiClient";

export const checkAuth = async () => {
  const response = await request.get("/auth/check-login", {
    withCredentials: true,
    headers: {
      Accept: "application/json",
      "X-Requested-With": "XMLHttpRequest",
    },
  });
  return response.data;
};

export const logout = async () => {
  const response = await request.post("/auth/logout", {}, { withCredentials: true });
  return response.data;
};
