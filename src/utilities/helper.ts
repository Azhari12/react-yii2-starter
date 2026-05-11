export const hasPermission = (
  userPermissions: string[],
  requiredPermissions?: string[]
): boolean => {
  if (!requiredPermissions || requiredPermissions.length === 0) return true;
  if (!userPermissions) return false;

  // Root/admin has access to everything
  if (userPermissions.includes("root")) return true;

  return requiredPermissions.some((perm) => userPermissions.includes(perm));
};
