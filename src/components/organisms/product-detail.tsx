"use client";

import * as React from "react";
import { ShoppingCart, Heart, Share2, Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Price } from "@/components/ui/price";
import { Rating } from "@/components/ui/rating";
import { ImageGallery } from "@/components/molecules/image-gallery";
import { QuantitySelector } from "@/components/molecules/quantity-selector";
import { BatchTraceability } from "@/components/molecules/batch-traceability";
import { SustainabilityBadges } from "@/components/molecules/sustainability-badges";
import { FarmerPartnership } from "@/components/molecules/farmer-partnership";
import type { Product } from "@/data/products";

type ProductDetailProps = {
  product: Product;
  className?: string;
};

function ProductDetail({ product, className }: ProductDetailProps) {
  const [quantity, setQuantity] = React.useState(1);

  const galleryImages =
    product.gallery && product.gallery.length > 0
      ? product.gallery
      : [product.image];

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

  const inStock = (product.stock ?? 0) > 0;
  const discount =
    product.originalPrice && product.originalPrice > product.price
      ? Math.round(
          ((product.originalPrice - product.price) / product.originalPrice) *
            100,
        )
      : 0;

  return (
    <div
      data-slot="product-detail"
      className={cn(
        "grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <ImageGallery
          images={galleryImages}
          alt={product.name}
          badge={badgeNode}
        />
      </div>

      <div className="flex flex-col gap-5 sm:gap-6">
        <div className="space-y-3">
          <div className="flex items-center gap-2 mb-2">
            {product.rating !== undefined && (
              <Rating
                value={product.rating}
                reviewCount={product.reviewCount}
              />
            )}
            {inStock && (
              <>
                <span className="mx-2 text-gray-300">|</span>
                <span className="text-sm text-[#16A34A] font-medium">
                  Stok Tersedia
                </span>
              </>
            )}
          </div>
          <h1 className="font-extrabold text-2xl sm:text-3xl md:text-4xl leading-tight">
            {product.name}
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {product.longDescription ?? product.description}
          </p>
        </div>

        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <div className="flex flex-wrap items-start justify-between gap-6 mb-6">
            <div className="flex flex-col">
              <Price
                value={product.price}
                size="xl"
                className="text-3xl sm:text-4xl font-black"
              />
              <span className="text-sm text-muted-foreground">
                Per 50kg Sack (Volume ~75L)
              </span>
            </div>
            {product.batchInfo && (
              <BatchTraceability batchInfo={product.batchInfo} />
            )}
          </div>

          <div className="flex gap-3">
            <Button
              disabled={!inStock}
              className="flex-1 bg-[#46EC13] hover:bg-[#3BD410] text-black font-bold h-12 text-sm sm:text-base shadow-lg shadow-[#46EC13]/20 hover:-translate-y-0.5 transition-all"
            >
              <ShoppingCart className="w-4 h-4" />
              Tambah ke Keranjang
            </Button>
          </div>
        </div>

        {product.highlights && product.highlights.length > 0 && (
          <div className="border-t border-gray-100 pt-6">
            <h3 className="font-bold text-lg mb-3">Fitur Utama</h3>
            <ul className="space-y-2">
              {product.highlights.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-2 text-sm sm:text-base"
                >
                  <span className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-[#16A34A]/10 text-[#16A34A]">
                    <Check className="w-3 h-3" />
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex items-center gap-3 pt-2 border-t border-gray-100">
          <Button
            variant="ghost"
            size="sm"
            className="text-muted-foreground hover:text-foreground"
          >
            <Share2 className="w-4 h-4" />
            Bagikan
          </Button>
        </div>
      </div>
    </div>
  );
}

export { ProductDetail };
