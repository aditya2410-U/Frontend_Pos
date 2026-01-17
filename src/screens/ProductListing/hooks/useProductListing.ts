import { useState } from "react";
import { useProducts } from "@/api/queries/useProducts";
import type { ProductFilters, Product } from "@/api/schemas/product";

export const useProductListing = () => {
  const [filters, setFilters] = useState<ProductFilters>({});

  const { data: products = [], isLoading, error } = useProducts(filters);

  // Placeholder for simple local search until backend supports it fully
  const handleSearch = (term: string) => {
    setFilters((prev) => ({ ...prev, search: term }));
  };

  const handleAddToCart = (product: Product) => {
    // TODO: Connect to Cart Context/Store
    console.log("Adding to cart:", product);
    alert(`Added ${product.name} to cart! (Mock)`);
  };

  return {
    products,
    isLoading,
    error,
    filters,
    setFilters,
    handleSearch,
    handleAddToCart,
  };
};
