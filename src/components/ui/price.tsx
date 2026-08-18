import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const priceVariants = cva("inline-block", {
  variants: {
    variant: {
      default: "text-[#16A34A] font-bold text-base",
      original: "text-muted-foreground line-through",
      muted: "text-muted-foreground",
    },
    size: {
      sm: "text-xs",
      md: "text-sm",
      lg: "text-base",
      xl: "text-lg",
    },
  },
  defaultVariants: {
    variant: "default",
    size: "lg",
  },
});

function formatPrice(value: number, currency: string = "Rp"): string {
  return `${currency} ${value.toLocaleString("id-ID")}`;
}

type PriceProps = React.ComponentProps<"span"> &
  VariantProps<typeof priceVariants> & {
    value: number;
    currency?: string;
  };

function Price({
  className,
  variant,
  size,
  value,
  currency = "Rp",
  ...props
}: PriceProps) {
  return (
    <span
      data-slot="price"
      data-variant={variant}
      className={cn(priceVariants({ variant, size }), className)}
      {...props}
    >
      {formatPrice(value, currency)}
    </span>
  );
}

export { Price, priceVariants, formatPrice };
