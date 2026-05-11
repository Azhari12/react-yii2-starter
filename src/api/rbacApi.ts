import { request } from "./apiClient";

// Routes
export const getRoutes = async () => {
  const response = await request.get("/api/rbac/routes");
  return response.data;
};

export const assignRoutes = async (data: { items: string[] }) => {
  const response = await request.post("/api/rbac/assign-routes", data);
  return response.data;
};

export const removeRoutes = async (data: { items: string[] }) => {
  const response = await request.post("/api/rbac/remove-routes", data);
  return response.data;
};

// Permissions
export const getPermissions = async () => {
  const response = await request.get("/api/rbac/permissions");
  return response.data;
};

export const createPermission = async (data: { AuthItem: { name: string } }) => {
  const response = await request.post("/api/rbac/create-permission", data);
  return response.data;
};

export const updatePermission = async (data: { AuthItem: { name: string } }, id: string) => {
  const response = await request.put("/api/rbac/update-permission/" + id, data);
  return response.data;
};

export const deletePermission = async (id: string) => {
  const response = await request.delete("/api/rbac/delete-permission/" + id);
  return response.data;
};

export const getPermissionById = async (id: string) => {
  const response = await request.get("/api/rbac/get-permission-by-id/" + id);
  return response.data;
};

export const assignPermission = async (data: { items: string[] }, id: string) => {
  const response = await request.post("/api/rbac/assign-permission/" + id, data);
  return response.data;
};

export const unassignPermission = async (data: { items: string[] }, id: string) => {
  const response = await request.post("/api/rbac/remove-permission/" + id, data);
  return response.data;
};

// Roles
export const getRoles = async () => {
  const response = await request.get("/api/rbac/roles");
  return response.data;
};

export const createRole = async (data: { AuthItem: { name: string } }) => {
  const response = await request.post("/api/rbac/create-role", data);
  return response.data;
};

export const updateRole = async (data: { AuthItem: { name: string } }, id: string) => {
  const response = await request.put("/api/rbac/update-role/" + id, data);
  return response.data;
};

export const deleteRole = async (id: string) => {
  const response = await request.delete("/api/rbac/delete-role/" + id);
  return response.data;
};

export const getRoleById = async (id: string) => {
  const response = await request.get("/api/rbac/get-role-by-id/" + id);
  return response.data;
};

export const assignRole = async (data: { items: string[] }, id: string) => {
  const response = await request.post("/api/rbac/assign-role/" + id, data);
  return response.data;
};

export const unassignRole = async (data: { items: string[] }, id: string) => {
  const response = await request.post("/api/rbac/remove-role/" + id, data);
  return response.data;
};

// Assignment
export const getUserAssignment = async (page: number, pageSize: number, name: string) => {
  const qParam = `?page=${page}&page_size=${pageSize}&name=${name}`;
  const response = await request.get("/api/rbac/get-user-assignment" + qParam);
  return response.data;
};

export const getItemAssignment = async (id: string) => {
  const response = await request.get("/api/rbac/get-item-assignment/" + id);
  return response.data;
};

export const assignUser = async (data: { items: string[] }, id: string) => {
  const response = await request.post("/api/rbac/assign-user/" + id, data);
  return response.data;
};

export const unassignUser = async (data: { items: string[] }, id: string) => {
  const response = await request.post("/api/rbac/remove-user-assign/" + id, data);
  return response.data;
};
