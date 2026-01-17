import React from "react";
import type { Product } from "@/api/schemas/product";

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
    <div className="group cursor-pointer flex flex-col h-full bg-transparent">
      {/* Image Container */}
      <div className="relative aspect-square bg-[#f6f6f6] flex items-center justify-center overflow-hidden transition-colors duration-500 group-hover:bg-[#e9f0db] rounded-sm">
        {/* Category Badge / Tag (Top Right) */}
        <span className="absolute top-4 right-4 z-10 bg-white/60 backdrop-blur-sm border border-neutral-200/50 rounded-full px-3 py-1 text-[10px] font-bold tracking-widest text-neutral-600 uppercase">
          {isOutOfStock ? "Sold Out" : "Best Seller"}
        </span>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.name}
          className="max-w-[70%] h-auto object-contain transition-transform duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-105 mix-blend-multiply"
          loading="lazy"
        />

        {/* Add to Cart Button (Sliding) */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (!isOutOfStock) onAddToCart?.(product);
          }}
          disabled={isOutOfStock}
          className="absolute bottom-0 left-0 w-full py-4 bg-[#3b3149] text-white border-none font-semibold text-xs tracking-[1.5px] uppercase cursor-pointer z-20 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] translate-y-full group-hover:translate-y-0 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isOutOfStock ? "Unavailable" : "Add to Cart"}
        </button>
      </div>

      {/* Product Details */}
      <div className="pt-5 flex flex-col items-start flex-grow">
        {/* Brand Name */}
        <p className="text-[11px] text-[#888] uppercase tracking-wider mb-2 font-medium">
          {product.brand || "Premium Brand"}
        </p>

        {/* Title and Price Row */}
        <div className="flex justify-between items-baseline w-full gap-4">
          <h3 className="text-[17px] m-0 font-normal text-[#1a1a1a] leading-tight group-hover:text-black transition-colors">
            {product.name}
          </h3>
          <span className="font-semibold text-[15px] text-[#1a1a1a] whitespace-nowrap">
            ${product.price.toFixed(0)}
          </span>
        </div>
      </div>
    </div>
  );
};
