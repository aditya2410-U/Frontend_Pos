import React from "react";
import type { Product } from "@/api/schemas/product";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/common/@atoms/card";
import { Badge } from "@/common/@atoms/badge";
import { Button } from "@/common/@atoms/Button/Button";
import { ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
}) => {
  const isOutOfStock = product.stock_level === 0;

  return (
    <Card className="h-full hover:shadow-md transition-shadow">
      <CardHeader className="p-0">
        <div className="aspect-square relative w-full overflow-hidden rounded-t-xl bg-gray-100 dark:bg-gray-800">
          {/* Placeholder for real image implementation using AspectRatio if needed */}
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-full h-full"
            loading="lazy"
          />
          {isOutOfStock && (
            <div className="absolute top-2 right-2">
              <Badge variant="destructive">Out of Stock</Badge>
            </div>
          )}
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <p className="text-xs text-muted-foreground uppercase font-bold tracking-wider">
              {product.category}
            </p>
            <h3 className="font-semibold text-lg line-clamp-2 leading-tight min-h-[3rem]">
              {product.name}
            </h3>
          </div>
          <div className="text-right">
            <span className="block font-bold text-lg">
              ${product.price.toFixed(2)}
            </span>
          </div>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-2 h-10 mb-2">
          {product.description}
        </p>
        <p className="text-xs text-gray-500">SKU: {product.sku}</p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button
          className="w-full"
          disabled={isOutOfStock}
          onClick={() => onAddToCart?.(product)}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {isOutOfStock ? "Unavailable" : "Add to Cart"}
        </Button>
      </CardFooter>
    </Card>
  );
};
