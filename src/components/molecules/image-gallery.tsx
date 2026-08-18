"use client";

import * as React from "react";
import Image from "next/image";

import { cn } from "@/lib/utils";

type ImageGalleryProps = {
  images: string[];
  alt: string;
  badge?: React.ReactNode;
  className?: string;
};

function ImageGallery({ images, alt, badge, className }: ImageGalleryProps) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  const safeImages = images.length > 0 ? images : [];
  const current = safeImages[activeIdx] ?? safeImages[0];

  return (
    <div data-slot="image-gallery" className={cn("space-y-4", className)}>
      <div className="relative bg-[#F3F4F6] rounded-2xl overflow-hidden flex items-center justify-center aspect-square">
        {badge && <div className="absolute top-4 left-4 z-10">{badge}</div>}
        {current && (
          <Image
            src={current}
            alt={alt}
            width={600}
            height={600}
            className="object-contain w-full h-full p-8 sm:p-12"
            priority
          />
        )}
      </div>

      {safeImages.length > 1 && (
        <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 sm:gap-3">
          {safeImages.map((src, idx) => (
            <button
              key={src + idx}
              type="button"
              onClick={() => setActiveIdx(idx)}
              aria-label={`Lihat gambar ${idx + 1}`}
              aria-pressed={idx === activeIdx}
              className={cn(
                "relative bg-[#F3F4F6] rounded-lg overflow-hidden aspect-square transition-all flex items-center justify-center",
                idx === activeIdx
                  ? "ring-2 ring-[#16A34A] ring-offset-2"
                  : "hover:ring-1 hover:ring-gray-300",
              )}
            >
              <Image
                src={src}
                alt={`${alt} - thumbnail ${idx + 1}`}
                width={120}
                height={120}
                className="object-contain w-full h-full p-2"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export { ImageGallery };
