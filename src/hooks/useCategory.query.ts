import { createCategory, deleteCategory, getCategories, updateCategory } from "@/api/categoryApi";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useCategoriesQuery = ({ page, pageSize, name }: { page: number; pageSize: number; name?: string }) => {
  return useSuspenseQuery({
    queryKey: ["categories", page, pageSize, name],
    queryFn: () => getCategories(page, pageSize, name),
    staleTime: 5 * 60 * 1000,
  });
};

export const useCreateCategoryMutation = () => {
  return useMutation({
    mutationKey: ["create-category"],
    mutationFn: createCategory,
  });
};

export const useUpdateCategoryMutation = () => {
  return useMutation({
    mutationKey: ["update-category"],
    mutationFn: async ({ id, data }: { id: number; data: { name: string; description?: string; is_active?: boolean } }) => {
      return updateCategory(id, data);
    },
  });
};

export const useDeleteCategoryMutation = () => {
  return useMutation({
    mutationKey: ["delete-category"],
    mutationFn: async (id: number) => deleteCategory(id),
  });
};
