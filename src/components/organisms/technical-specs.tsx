import * as React from "react";
import { BarChart3 } from "lucide-react";

import { cn } from "@/lib/utils";
import type { TechnicalSpec } from "@/data/products";

type TechnicalSpecsProps = {
  specs: TechnicalSpec[];
  title?: string;
  className?: string;
};

function TechnicalSpecs({
  specs,
  title = "Spesifikasi Teknis",
  className,
}: TechnicalSpecsProps) {
  if (specs.length === 0) return null;

  return (
    <section
      data-slot="technical-specs"
      className={cn(
        "bg-white rounded-2xl border border-gray-100 p-5 sm:p-6 md:p-8",
        className,
      )}
    >
      <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
        <BarChart3 className="w-5 h-5 text-[#46EC13]" />
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-3">
        {specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between gap-4 py-2 border-b border-dashed border-gray-100 last:border-0"
          >
            <dt className="text-sm text-muted-foreground">{spec.label}</dt>
            <dd className="text-sm font-bold text-right">
              {spec.label === "EC Level" ? (
                <span className="text-[#16A34A]">{spec.value}</span>
              ) : (
                spec.value
              )}
            </dd>
          </div>
        ))}
      </div>
    </section>
  );
}

export { TechnicalSpecs };
