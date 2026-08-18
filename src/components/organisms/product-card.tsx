import * as React from "react";
import Link from "next/link";
import { ArrowUpRight, ShoppingBag } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { ProductImage } from "@/components/molecules/product-image";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  className?: string;
};

function ProductCard({ product, className }: ProductCardProps) {
  const detailHref = `/products/${product.slug}`;

  const badgeNode = product.badge ? (
    <span
      className={cn(
        "text-black text-xs font-bold px-3 py-1 rounded-full",
        product.badgeColor ?? "bg-[#46EC13]",
      )}
    >
      {product.badge}
    </span>
  ) : null;

  return (
    <article
      data-slot="product-card"
      className={cn(
        "bg-white rounded-2xl border border-gray-100 overflow-hidden flex flex-col",
        className,
      )}
    >
      <ProductImage src={product.image} alt={product.name} badge={badgeNode} />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-bold text-base">{product.name}</h3>
          {product.price > 0 && <Price value={product.price} />}
        </div>

        {product.originalPrice && (
          <Price
            value={product.originalPrice}
            variant="original"
            size="sm"
            className="mb-2"
          />
        )}

        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex items-center gap-3">
          {product.shopeeUrl ? (
            <Button
              asChild
              className="flex-1 bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold h-11 text-sm"
            >
              <a
                href={product.shopeeUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <ShoppingBag className="w-4 h-4" />
                Beli di Shopee
              </a>
            </Button>
          ) : (
            <Button
              disabled
              className="flex-1 bg-gray-200 text-gray-500 font-bold h-11 text-sm cursor-not-allowed"
            >
              Tidak tersedia
            </Button>
          )}
          <Button
            asChild
            variant="outline"
            size="icon"
            className="h-11 w-11 shrink-0"
            aria-label={`Detail ${product.name}`}
          >
            <Link href={detailHref}>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </div>
    </article>
  );
}

export { ProductCard };
export type { ProductCardProps };
