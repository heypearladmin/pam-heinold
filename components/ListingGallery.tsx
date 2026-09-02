"use client";

import Image from "next/image";
import { useState } from "react";
import type { ListingImage } from "@/lib/listing-data";

interface ListingGalleryProps {
  images: ListingImage[];
}

export default function ListingGallery({ images }: ListingGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const active = images[activeIndex];

  if (images.length === 0) return null;

  return (
    <div>
      <div className="relative aspect-[4/3] md:aspect-[16/10] overflow-hidden bg-lighttan/40">
        <Image
          src={active.src}
          alt={active.alt}
          fill
          priority={activeIndex === 0}
          sizes="(min-width: 1024px) 1100px, 100vw"
          className="object-cover"
        />
      </div>

      {images.length > 1 && (
        <div className="mt-3 flex gap-3 overflow-x-auto no-scrollbar pb-1">
          {images.map((img, i) => (
            <button
              key={img.src}
              type="button"
              onClick={() => setActiveIndex(i)}
              aria-label={`View photo ${i + 1} of ${images.length}`}
              aria-current={i === activeIndex}
              className={`relative shrink-0 w-24 h-20 md:w-28 md:h-20 overflow-hidden border transition-colors duration-300 ${
                i === activeIndex
                  ? "border-warmbrown"
                  : "border-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image
                src={img.src}
                alt=""
                fill
                loading="lazy"
                sizes="112px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
