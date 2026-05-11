import { request } from "./apiClient";

export const getCategories = async (page: number, pageSize: number, name?: string) => {
  const params = new URLSearchParams({
    page: String(page),
    page_size: String(pageSize),
  });
  if (name) params.append("name", name);
  const response = await request.get("/api/category?" + params.toString());
  return response.data;
};

export const getCategoryById = async (id: number) => {
  const response = await request.get(`/api/category/${id}`);
  return response.data;
};

export const createCategory = async (data: { name: string; description?: string; is_active?: boolean }) => {
  const response = await request.post("/api/category", data);
  return response.data;
};

export const updateCategory = async (id: number, data: { name: string; description?: string; is_active?: boolean }) => {
  const response = await request.put(`/api/category/${id}`, data);
  return response.data;
};

export const deleteCategory = async (id: number) => {
  const response = await request.delete(`/api/category/${id}`);
  return response.data;
};
