import * as React from "react";
import { Star } from "lucide-react";

import { cn } from "@/lib/utils";

type RatingProps = {
  value: number;
  reviewCount?: number;
  size?: "sm" | "md" | "lg";
  className?: string;
};

const sizeMap = {
  sm: { star: "w-3.5 h-3.5", text: "text-xs" },
  md: { star: "w-4 h-4", text: "text-sm" },
  lg: { star: "w-5 h-5", text: "text-base" },
};

function Rating({ value, reviewCount, size = "md", className }: RatingProps) {
  const dims = sizeMap[size];
  const rounded = Math.round(value * 10) / 10;

  return (
    <div
      data-slot="rating"
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <div className="inline-flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, idx) => {
          const filled = idx < Math.floor(value);
          return (
            <Star
              key={idx}
              className={cn(
                dims.star,
                filled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-gray-200 text-gray-200",
              )}
            />
          );
        })}
      </div>
      <span className={cn("font-semibold", dims.text)}>{rounded.toFixed(1)}</span>
      {reviewCount !== undefined && (
        <span className={cn("text-muted-foreground", dims.text)}>
          ({reviewCount} ulasan)
        </span>
      )}
    </div>
  );
}

export { Rating };
