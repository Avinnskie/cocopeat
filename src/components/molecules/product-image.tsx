import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type ProductImageProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  badge?: React.ReactNode;
  className?: string;
  imageClassName?: string;
};

function ProductImage({
  src,
  alt,
  width = 240,
  height = 240,
  badge,
  className,
  imageClassName,
}: ProductImageProps) {
  return (
    <div
      data-slot="product-image"
      className={cn(
        "relative bg-[#F3F4F6] p-6 flex items-center justify-center h-64",
        className,
      )}
    >
      {badge && (
        <div className="absolute top-4 left-4 z-10">{badge}</div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={cn("object-contain h-full w-auto", imageClassName)}
      />
    </div>
  );
}

export { ProductImage };
