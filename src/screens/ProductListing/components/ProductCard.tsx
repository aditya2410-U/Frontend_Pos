import React from "react";
import type { Product } from "@/api/schemas/product";
import { Card, CardHeader, CardContent } from "@/common/@atoms/card";
import { Button } from "@/common/@atoms/Button";
import CustomText from "@/common/@atoms/Text/CustomText";

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
    <Card className="group cursor-pointer flex flex-col h-full bg-transparent border-0 shadow-none rounded-none">
      {/* Image Container */}
      <CardHeader className="p-0">
        <div className="relative aspect-square bg-[#f6f6f6] flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-[#e9f0db] rounded-sm">
          {/* Category Badge / Tag (Top Right) */}
          <div className="absolute top-4 right-4 z-10 bg-white/60 backdrop-blur-sm border border-neutral-200/50 rounded-full px-3 py-1">
            <CustomText
              type="MicroBold"
              className="tracking-widest text-neutral-600 uppercase"
            >
              {isOutOfStock ? "Sold Out" : "Best Seller"}
            </CustomText>
          </div>

          {/* Product Image */}
          <img
            src={product.image}
            alt={product.name}
            className="max-w-[70%] h-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 mix-blend-multiply"
            loading="lazy"
          />

          {/* Add to Cart Button (Sliding) */}
          <Button
            variant="unstyled"
            onClick={(e) => {
              e.stopPropagation();
              if (!isOutOfStock) onAddToCart?.(product);
            }}
            disabled={isOutOfStock}
            className="absolute bottom-0 left-0 w-full rounded-none py-5 h-auto bg-[#3b3149] text-white border-none font-semibold text-xs tracking-[1.5px] uppercase z-20 transition-all duration-[400ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-full opacity-0 group-hover:translate-y-0 group-hover:opacity-100 disabled:bg-gray-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isOutOfStock ? "Unavailable" : "Add to Cart"}
          </Button>
        </div>
      </CardHeader>

      {/* Product Details */}
      <CardContent className="p-0 pt-5 flex flex-col items-start flex-grow">
        {/* Brand Name */}
        <CustomText
          type="Micro"
          fontWeight={500}
          color="#888888"
          className="uppercase tracking-wider mb-2"
        >
          {product.brand || "Premium Brand"}
        </CustomText>

        {/* Title and Price Row */}
        <div className="flex justify-between items-baseline w-full gap-4">
          <CustomText
            type="H2"
            className="m-0 font-normal text-[#1a1a1a] leading-tight group-hover:text-black transition-colors"
            style={{ fontSize: "17px" }}
          >
            {product.name}
          </CustomText>
          <CustomText
            type="Body2"
            fontWeight={600}
            color="#1a1a1a"
            className="whitespace-nowrap"
            style={{ fontSize: "15px" }}
          >
            ${product.price.toFixed(0)}
          </CustomText>
        </div>
      </CardContent>
    </Card>
  );
};
