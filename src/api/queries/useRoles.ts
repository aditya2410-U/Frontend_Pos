import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { roleService } from "../services/role";
import type { CreateRoleInput } from "../schemas/role";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { STALE_TIME } from "@/lib/constants";

export const useCreateRole = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (data: CreateRoleInput) => roleService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["roles"] });
      toast.success("Role created successfully");
      navigate("/roles");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to create role");
    },
  });
};

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getAll,
    staleTime: STALE_TIME.STANDARD,
  });
};
