import Image from "next/image";
import Link from "next/link";
import {
  Listing,
  formatListingAddress,
  formatListingPrice,
} from "@/lib/listing-data";

interface ListingCardProps {
  listing: Listing;
  priority?: boolean;
}

export default function ListingCard({ listing, priority }: ListingCardProps) {
  const cover = listing.images[0];

  return (
    <Link href={`/listings/${listing.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden bg-lighttan/40">
        {cover && (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            priority={priority}
            loading={priority ? undefined : "lazy"}
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
          />
        )}
        {listing.status !== "For Sale" && (
          <span className="absolute top-4 left-4 bg-nearblack/90 text-cream text-[0.68rem] tracking-editorial uppercase px-3 py-1.5">
            {listing.status}
          </span>
        )}
        <div
          className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-nearblack/80 via-nearblack/10 to-transparent"
          aria-hidden="true"
        />
        <p className="absolute bottom-5 left-6 font-display text-3xl text-cream tracking-tight">
          {formatListingPrice(listing.price)}
        </p>
      </div>

      <div className="mt-5">
        <h3 className="font-display text-xl text-warmbrown leading-snug">
          {listing.address}
        </h3>
        <p className="text-charcoal/70 text-sm mt-1">
          {formatListingAddress(listing)}
        </p>

        <div className="mt-4 flex items-center gap-4 text-[0.82rem] text-charcoal/80">
          <span>{listing.bedrooms} bd</span>
          <span aria-hidden="true">·</span>
          <span>{listing.bathrooms} ba</span>
          <span aria-hidden="true">·</span>
          <span>{listing.squareFeet.toLocaleString()} sq ft</span>
          {listing.acreage && (
            <>
              <span aria-hidden="true">·</span>
              <span>{listing.acreage} ac</span>
            </>
          )}
        </div>

        <p className="mt-3 text-charcoal/80 leading-relaxed text-[0.92rem]">
          {listing.highlight}
        </p>

        <p className="mt-4 text-[0.72rem] tracking-editorial uppercase text-warmbrown inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          View Property
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}
