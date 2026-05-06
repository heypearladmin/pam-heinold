import Image from "next/image";
import Link from "next/link";
import { Neighborhood } from "@/lib/neighborhood-data";

interface NeighborhoodCardProps {
  neighborhood: Neighborhood;
}

export default function NeighborhoodCard({
  neighborhood,
}: NeighborhoodCardProps) {
  return (
    <Link href={`/neighborhoods/${neighborhood.slug}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-lighttan/40">
        <Image
          src={neighborhood.image}
          alt={neighborhood.imageAlt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.04]"
        />
        <div
          className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-nearblack/55"
          aria-hidden="true"
        />
        <div className="absolute inset-x-0 bottom-0 p-7">
          <p className="text-[0.7rem] tracking-editorial uppercase text-cream/85 mb-2">
            {neighborhood.lifestyleAngle}
          </p>
          <h3 className="font-display text-3xl md:text-4xl text-cream leading-tight tracking-tight">
            {neighborhood.name}
          </h3>
        </div>
      </div>

      <div className="mt-5">
        <p className="font-display text-lg text-warmbrown italic">
          {neighborhood.tagline}
        </p>
        <p className="mt-2 text-charcoal/80 leading-relaxed">
          {neighborhood.shortDescription}
        </p>
        <p className="mt-4 text-[0.72rem] tracking-editorial uppercase text-warmbrown inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
          Inside {neighborhood.name}
          <span aria-hidden="true">→</span>
        </p>
      </div>
    </Link>
  );
}
