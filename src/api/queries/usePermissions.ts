import { useQuery } from "@tanstack/react-query";
import { permissionService } from "../services/permission";
import { STALE_TIME } from "@/lib/constants";

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: permissionService.getAll,
    staleTime: STALE_TIME.STANDARD,
  });
};
