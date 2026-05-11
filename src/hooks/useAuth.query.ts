import { checkAuth, logout } from "@/api/authApi";
import { useMutation, useSuspenseQuery } from "@tanstack/react-query";

export const useCheckAuthQuery = () => {
  return useSuspenseQuery({
    queryKey: ["auth"],
    queryFn: checkAuth,
    staleTime: 5 * 60 * 1000,
    retry: false,
    refetchOnWindowFocus: true,
  });
};

export const useLogoutMutation = () => {
  return useMutation({
    mutationKey: ["logout"],
    mutationFn: logout,
  });
};
