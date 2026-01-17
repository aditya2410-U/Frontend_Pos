export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  image?: string;
  stock_level: number;
  category: string;
  brand?: string;
  unit_of_measure?: string;
  min_order_quantity?: number;
}

export interface ProductFilters {
  search?: string;
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}
