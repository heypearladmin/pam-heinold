import Link from "next/link";
import {
  journeyBySlug,
  buyingJourneyLinks,
  sellingJourneyLinks,
} from "@/lib/journey-links";

export default function JourneyLinks({ slug }: { slug: string }) {
  const journey = journeyBySlug[slug];
  if (!journey) return null;

  if (journey === "dual") {
    return (
      <section className="py-14 bg-lighttan/25 border-t border-tan/40">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 text-center">
          <p className="eyebrow text-charcoal/55 mb-4">Continue Reading</p>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            <Link
              href="/services/buying"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Explore the Buying Guide →
            </Link>
            <Link
              href="/services/selling"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Explore the Selling Guide →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  const links = journey === "buying" ? buyingJourneyLinks : sellingJourneyLinks;
  const heading =
    journey === "buying" ? "Continue Your Buying Journey" : "Continue Your Selling Journey";

  return (
    <section className="py-16 md:py-20 bg-lighttan/25 border-t border-tan/40">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <p className="eyebrow text-charcoal/60 mb-8">{heading}</p>
        <ul className="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-3">
          {links.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[0.92rem] text-charcoal/85 hover:text-warmbrown underline decoration-tan/60 hover:decoration-warmbrown transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
