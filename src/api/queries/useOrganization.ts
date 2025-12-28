import { useMutation, useQuery, useQueryClient, useInfiniteQuery } from "@tanstack/react-query";
import { organizationService } from "../services/organization";
import type { CreateOrganizationInput, UpdateOrganizationInput } from "../schemas/organization";
import { toast } from "sonner";

export const useInfiniteOrganizations = (limit = 10, search = "") => {
  return useInfiniteQuery({
    queryKey: ["organizations", "infinite", limit, search],
    queryFn: ({ pageParam = 1 }) => organizationService.getAll(pageParam, limit, search),
    getNextPageParam: (lastPage) => {
      if (lastPage.page < lastPage.totalPages) {
        return lastPage.page + 1;
      }
      return undefined;
    },
    initialPageParam: 1,
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useOrganizations = (page = 1, limit = 10, search = "") => {
  return useQuery({
    queryKey: ["organizations", page, limit, search],
    queryFn: () => organizationService.getAll(page, limit, search),
    staleTime: 1000 * 60 * 5, // 5 minutes
  });
};

export const useOrganization = (id: string) => {
  return useQuery({
    queryKey: ["organizations", id],
    queryFn: () => organizationService.getById(id),
    enabled: !!id,
  });
};

export const useCreateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateOrganizationInput) => organizationService.create(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success("Organization created successfully");
    },
    onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to create organization");
    }
  });
};

export const useUpdateOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateOrganizationInput }) => 
      organizationService.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", id] });
      toast.success("Organization updated successfully");
    },
    onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to update organization");
    }
  });
};

export const useSuspendOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => organizationService.suspend(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      queryClient.invalidateQueries({ queryKey: ["organizations", id] });
      toast.success("Organization suspended successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to suspend organization");
    },
  });
};

export const useActivateOrganization = () => {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => organizationService.activate(id),
      onSuccess: (_, id) => {
        queryClient.invalidateQueries({ queryKey: ["organizations"] });
        queryClient.invalidateQueries({ queryKey: ["organizations", id] });
        toast.success("Organization activated successfully");
      },
      onError: (error: any) => {
        toast.error(error.response?.data?.message || "Failed to activate organization");
      },
    });
  };

export const useDeleteOrganization = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => organizationService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["organizations"] });
      toast.success("Organization deleted successfully");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.message || "Failed to delete organization");
    },
  });
};
