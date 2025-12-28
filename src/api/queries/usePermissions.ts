import { useQuery } from "@tanstack/react-query";
import { permissionService } from "../services/permission";

export const usePermissions = () => {
  return useQuery({
    queryKey: ["permissions"],
    queryFn: permissionService.getAll,
  });
};
