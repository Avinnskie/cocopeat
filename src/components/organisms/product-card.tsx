import * as React from "react";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { ProductImage } from "@/components/molecules/product-image";
import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
  className?: string;
  primaryActionLabel?: string;
  primaryHref?: string;
  showSecondaryAction?: boolean;
};

function ProductCard({
  product,
  className,
  primaryActionLabel = "Lihat Detail Product",
  primaryHref,
  showSecondaryAction = true,
}: ProductCardProps) {
  const href = primaryHref ?? `/products/${product.slug}`;

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
      <ProductImage
        src={product.image}
        alt={product.name}
        badge={badgeNode}
      />

      <div className="p-5 flex flex-col flex-1">
        <div className="flex items-baseline justify-between mb-2">
          <h3 className="font-bold text-base">{product.name}</h3>
          <Price value={product.price} />
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
          <Button
            asChild
            className="flex-1 bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold h-11 text-sm"
          >
            <Link href={href}>{primaryActionLabel}</Link>
          </Button>
          {showSecondaryAction && (
            <Button
              asChild
              variant="outline"
              size="icon"
              className="h-11 w-11 shrink-0"
              aria-label={`Buka ${product.name}`}
            >
              <Link href={href}>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

export { ProductCard };
export type { ProductCardProps };
