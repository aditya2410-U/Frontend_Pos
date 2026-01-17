import React from "react";
// import { PageHeader } from "@/common/@atoms/PageHeader/PageHeader";
import { ProductGrid } from "./components/ProductGrid";
import { useProductListing } from "./hooks/useProductListing";
import { Input } from "@/common/@atoms/input";
import { Search } from "lucide-react";
import { Button } from "@/common/@atoms/Button/Button";

const ProductListingPage: React.FC = () => {
  const { products, isLoading, handleSearch, handleAddToCart, filters } =
    useProductListing();

  return (
    <div className="flex flex-col h-full bg-gray-50/30 min-h-screen">
      <div className="p-6 pb-4 bg-background border-b sticky top-0 z-10">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">All Products</h1>
            <p className="text-sm text-muted-foreground">
              Browse and order from our catalog.
            </p>
          </div>
          <div>
            {/* TODO: Cart Summary / Header Actions */}
            <Button variant="outlined">View Cart</Button>
          </div>
        </div>

        <div className="flex gap-4 items-center">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              className="pl-8 bg-white"
              value={filters.search || ""}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>
          {/* Placeholder for Filters Trigger */}
          <Button variant="dashed" size="sm">
            Filters
          </Button>
        </div>
      </div>

      <div className="flex-1 p-6 overflow-auto">
        <ProductGrid
          products={products}
          isLoading={isLoading}
          onAddToCart={handleAddToCart}
        />
      </div>
    </div>
  );
};

export default ProductListingPage;
