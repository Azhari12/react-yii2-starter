import {
  assignPermission,
  assignRole,
  assignRoutes,
  assignUser,
  createPermission,
  createRole,
  deletePermission,
  deleteRole,
  getItemAssignment,
  getPermissionById,
  getPermissions,
  getRoleById,
  getRoles,
  getRoutes,
  getUserAssignment,
  removeRoutes,
  unassignPermission,
  unassignRole,
  unassignUser,
  updatePermission,
  updateRole,
} from "@/api/rbacApi";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useRoutesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["routes"],
    queryFn: getRoutes,
    staleTime: 5 * 60 * 1000,
  });
};

export const useAssignRoutesMutation = () => {
  return useMutation({ mutationKey: ["assign-routes"], mutationFn: assignRoutes });
};

export const useRemoveRoutesMutation = () => {
  return useMutation({ mutationKey: ["remove-routes"], mutationFn: removeRoutes });
};

export const usePermissionsQuery = () => {
  return useSuspenseQuery({
    queryKey: ["permissions"],
    queryFn: getPermissions,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreatePermissionMutation = () => {
  return useMutation({ mutationKey: ["create-permission"], mutationFn: createPermission });
};

export const useUpdatePermissionMutation = () => {
  return useMutation({
    mutationKey: ["update-permission"],
    mutationFn: async ({ data, id }: { data: { AuthItem: { name: string } }; id: string }) => {
      return updatePermission(data, id);
    },
  });
};

export const useDeletePermissionMutation = () => {
  return useMutation({
    mutationKey: ["delete-permission"],
    mutationFn: async (id: string) => deletePermission(id),
  });
};

export const useGetPermissionByIdQuery = ({ id }: { id: string }) => {
  return useSuspenseQuery({
    queryKey: [`permission-${id}`],
    queryFn: () => getPermissionById(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAssignPermissionMutation = () => {
  return useMutation({
    mutationKey: ["assign-permission"],
    mutationFn: async ({ data, id }: { data: { items: string[] }; id: string }) => {
      return assignPermission(data, id);
    },
  });
};

export const useUnassignPermissionMutation = () => {
  return useMutation({
    mutationKey: ["unassign-permission"],
    mutationFn: async ({ data, id }: { data: { items: string[] }; id: string }) => {
      return unassignPermission(data, id);
    },
  });
};

export const useRolesQuery = () => {
  return useSuspenseQuery({
    queryKey: ["roles"],
    queryFn: getRoles,
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateRoleMutation = () => {
  return useMutation({ mutationKey: ["create-role"], mutationFn: createRole });
};

export const useUpdateRoleMutation = () => {
  return useMutation({
    mutationKey: ["update-role"],
    mutationFn: async ({ data, id }: { data: { AuthItem: { name: string } }; id: string }) => {
      return updateRole(data, id);
    },
  });
};

export const useDeleteRoleMutation = () => {
  return useMutation({
    mutationKey: ["delete-role"],
    mutationFn: async (id: string) => deleteRole(id),
  });
};

export const useGetRoleByIdQuery = ({ id }: { id: string }) => {
  return useSuspenseQuery({
    queryKey: [`role-${id}`],
    queryFn: () => getRoleById(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAssignRoleMutation = () => {
  return useMutation({
    mutationKey: ["assign-role"],
    mutationFn: async ({ data, id }: { data: { items: string[] }; id: string }) => {
      return assignRole(data, id);
    },
  });
};

export const useUnassignRoleMutation = () => {
  return useMutation({
    mutationKey: ["unassign-role"],
    mutationFn: async ({ data, id }: { data: { items: string[] }; id: string }) => {
      return unassignRole(data, id);
    },
  });
};

export const useGetUserAssignment = ({ page, pageSize, name }: { page: number; pageSize: number; name: string }) => {
  return useSuspenseQuery({
    queryKey: [`assignment-${page}-${pageSize}-${name}`],
    queryFn: () => getUserAssignment(page, pageSize, name),
    staleTime: 5 * 60 * 1000,
  });
};

export const useGetItemAssignmentQuery = ({ id }: { id: string }) => {
  return useSuspenseQuery({
    queryKey: [`assignment-${id}`],
    queryFn: () => getItemAssignment(id),
    staleTime: 5 * 60 * 1000,
  });
};

export const useAssignUserMutation = () => {
  return useMutation({
    mutationKey: ["assign-user"],
    mutationFn: async ({ data, id }: { data: { items: string[] }; id: string }) => {
      return assignUser(data, id);
    },
  });
};

export const useUnassignUserMutation = () => {
  return useMutation({
    mutationKey: ["unassign-user"],
    mutationFn: async ({ data, id }: { data: { items: string[] }; id: string }) => {
      return unassignUser(data, id);
    },
  });
};
