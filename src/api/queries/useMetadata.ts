import { useQuery } from "@tanstack/react-query";
import { roleService } from "../services/role";
import { outletService } from "../services/outlet";
import { STALE_TIME } from "@/lib/constants";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getAll,
    staleTime: STALE_TIME.STANDARD,
  });
};

export const useOutlets = () => {
  return useQuery({
    queryKey: ["outlets"],
    queryFn: outletService.getAll,
    staleTime: STALE_TIME.STANDARD,
  });
};
