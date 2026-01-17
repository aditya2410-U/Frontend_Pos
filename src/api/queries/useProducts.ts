import { useQuery } from "@tanstack/react-query";
import { productService } from "../services/product";
import type { ProductFilters } from "../schemas/product";
import { STALE_TIME } from "@/lib/constants";

export const useProducts = (filters?: ProductFilters) => {
  return useQuery({
    queryKey: ["products", filters],
    queryFn: () => productService.getAll(filters),
    staleTime: STALE_TIME.SHORT,
  });
};
