// import apiClient from "../client";
import type { Product, ProductFilters } from "../schemas/product";

// Mock data
const MOCK_PRODUCTS: Product[] = Array.from({ length: 20 }).map((_, i) => ({
  id: `prod_${i + 1}`,
  name: `Medical Product ${i + 1}`,
  description: "High quality medical supply for professional use.",
  price: 100 + i * 15,
  sku: `MED-${1000 + i}`,
  stock_level: i % 3 === 0 ? 0 : 50,
  category: i % 2 === 0 ? "Pharmaceuticals" : "Equipment",
  min_order_quantity: 1,
  image: "https://placehold.co/400x400/png",
}));

export const productService = {
  getAll: async (filters?: ProductFilters): Promise<Product[]> => {
    // START: Mock implementation
    await new Promise((resolve) => setTimeout(resolve, 800));

    let filtered = [...MOCK_PRODUCTS];
    if (filters?.search) {
      const q = filters.search.toLowerCase();
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(q) || p.sku.toLowerCase().includes(q)
      );
    }
    if (filters?.category) {
      filtered = filtered.filter((p) => p.category === filters.category);
    }
    return filtered;
    // END: Mock implementation
  },

  getOne: async (id: string): Promise<Product> => {
    const product = MOCK_PRODUCTS.find((p) => p.id === id);
    if (!product) throw new Error("Product not found");
    return product;
  },
};
