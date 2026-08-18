import * as React from "react";

import { cn } from "@/lib/utils";
import type { ProductSpec } from "@/data/products";

type ProductSpecsProps = {
  specs: ProductSpec[];
  title?: string;
  className?: string;
};

function ProductSpecs({
  specs,
  title = "Spesifikasi Produk",
  className,
}: ProductSpecsProps) {
  if (specs.length === 0) return null;

  return (
    <section
      data-slot="product-specs"
      className={cn(
        "bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 md:p-8",
        className,
      )}
    >
      <h2 className="font-bold text-xl sm:text-2xl mb-4 sm:mb-6">{title}</h2>
      <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between gap-4 py-2 border-b border-gray-100 last:border-0 sm:[&:nth-last-child(-n+2)]:border-0"
          >
            <dt className="text-sm text-muted-foreground">{spec.label}</dt>
            <dd className="text-sm font-semibold text-right">{spec.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

export { ProductSpecs };
