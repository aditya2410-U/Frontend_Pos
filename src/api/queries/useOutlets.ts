import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { outletService } from "../services/outlet";
import type { CreateOutletInput } from "../schemas/outlet";
import { toast } from "sonner";
import { STALE_TIME } from "@/lib/constants";

export const useOutlets = () => {
  return useQuery({
    queryKey: ["outlets"],
    queryFn: outletService.getAll,
    staleTime: STALE_TIME.STANDARD,
  });
};

export const useCreateOutlet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateOutletInput) => outletService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outlets"] });
      toast.success("Outlet created successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to create outlet");
    },
  });
};

export const useDeleteOutlet = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => outletService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["outlets"] });
      toast.success("Outlet deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.message || "Failed to delete outlet");
    },
  });
};
