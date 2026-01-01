import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "../services/auth";
import type { LoginInput, RegisterInput } from "../schemas/auth";
import { STORAGE_KEYS, STALE_TIME } from "@/lib/constants";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: LoginInput) => authService.login(data),
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(
        STORAGE_KEYS.USER_DETAILS,
        JSON.stringify(data.user)
      );
      queryClient.invalidateQueries({ queryKey: ["auth", "me"] });
      toast.success("Logged in successfully");
      navigate("/dashboard");
    },
  });
};

export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (data: RegisterInput) => authService.register(data),
    onSuccess: (data) => {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, data.token);
      localStorage.setItem(
        STORAGE_KEYS.USER_DETAILS,
        JSON.stringify(data.user)
      );
      toast.success("Registered successfully");
      navigate("/");
    },
  });
};

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: async () => {
      // Client-side only logout
      return Promise.resolve();
    },
    onSuccess: () => {
      localStorage.removeItem(STORAGE_KEYS.AUTH_TOKEN);
      localStorage.removeItem(STORAGE_KEYS.USER_DETAILS);
      queryClient.clear();
      toast.success("Logged out successfully");
      navigate("/login");
    },
  });
};

export const useMe = () => {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: authService.me,
    retry: false,
    staleTime: STALE_TIME.STANDARD,
  });
};
