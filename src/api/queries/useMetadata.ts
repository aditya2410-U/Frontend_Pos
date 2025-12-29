import { useQuery } from "@tanstack/react-query";
import { roleService } from "../services/role";
import { outletService } from "../services/outlet";

export const useRoles = () => {
  return useQuery({
    queryKey: ["roles"],
    queryFn: roleService.getAll,
  });
};

export const useOutlets = () => {
  return useQuery({
    queryKey: ["outlets"],
    queryFn: outletService.getAll,
  });
};
