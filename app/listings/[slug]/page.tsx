import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import ListingCard from "@/components/ListingCard";
import ListingGallery from "@/components/ListingGallery";
import GaLink from "@/components/GaLink";
import {
  listings,
  getListingBySlug,
  getActiveListings,
  formatListingAddress,
  formatListingPrice,
} from "@/lib/listing-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, listingSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return listings.map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) return { title: "Listing Not Found" };

  const title = `${listing.address}, ${formatListingAddress(listing)} | ${formatListingPrice(listing.price)}`;
  return {
    title,
    description: listing.highlight,
    alternates: { canonical: `/listings/${listing.slug}` },
    openGraph: {
      title,
      description: listing.highlight,
      images: listing.images[0]
        ? [{ url: listing.images[0].src, alt: listing.images[0].alt }]
        : undefined,
    },
  };
}

export default async function ListingDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const listing = getListingBySlug(slug);
  if (!listing) notFound();

  const others = getActiveListings()
    .filter((l) => l.slug !== listing.slug)
    .slice(0, 3);

  const pageUrl = `${site.company.website}/listings/${listing.slug}`;
  const agent = listing.agent ?? {
    name: site.agent.fullName,
    phone: site.company.phone,
    phoneHref: site.company.phoneHref,
    email: site.company.email,
    emailHref: site.company.emailHref,
  };

  return (
    <>
      <JsonLd
        schema={listingSchema({
          name: `${listing.address}, ${formatListingAddress(listing)}`,
          description: listing.description,
          url: pageUrl,
          images: listing.images.map((img) => img.src),
          price: listing.price,
          address: {
            street: listing.address,
            city: listing.city,
            state: listing.state,
            zip: listing.zip,
          },
          bedrooms: listing.bedrooms,
          bathrooms: listing.bathrooms,
          squareFeet: listing.squareFeet,
          status: listing.status,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: site.company.website },
          { name: "Listings", url: `${site.company.website}/listings` },
          { name: listing.address, url: pageUrl },
        ])}
      />

      <section className="pt-32 pb-10 md:pt-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <Link
            href="/listings"
            className="inline-block text-[0.72rem] tracking-editorial uppercase text-charcoal/60 hover:text-warmbrown transition-colors duration-300 mb-8"
          >
            ← All Listings
          </Link>

          <ListingGallery images={listing.images} />

          <div className="mt-10 grid md:grid-cols-12 gap-10 md:gap-16">
            <div className="md:col-span-8">
              {listing.status !== "For Sale" && (
                <span className="inline-block bg-nearblack text-cream text-[0.68rem] tracking-editorial uppercase px-3 py-1.5 mb-5">
                  {listing.status}
                </span>
              )}
              <h1 className="font-display text-4xl md:text-5xl text-warmbrown leading-[1.08] tracking-tight">
                {listing.address}
              </h1>
              <p className="mt-2 text-charcoal/70 text-lg">
                {formatListingAddress(listing)}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-charcoal/85 border-y border-tan/40 py-5">
                <span className="font-display text-2xl text-warmbrown">
                  {formatListingPrice(listing.price)}
                </span>
                <span aria-hidden="true" className="text-tan">·</span>
                <span>{listing.bedrooms} Beds</span>
                <span aria-hidden="true" className="text-tan">·</span>
                <span>{listing.bathrooms} Baths</span>
                <span aria-hidden="true" className="text-tan">·</span>
                <span>{listing.squareFeet.toLocaleString()} Sq Ft</span>
                {listing.acreage && (
                  <>
                    <span aria-hidden="true" className="text-tan">·</span>
                    <span>{listing.acreage} Acres</span>
                  </>
                )}
              </div>

              <div className="mt-10">
                <p className="eyebrow text-warmbrown mb-4">About This Home</p>
                <p className="text-charcoal/85 leading-relaxed text-[1.0625rem] whitespace-pre-line">
                  {listing.description}
                </p>
              </div>

              {listing.features.length > 0 && (
                <div className="mt-12">
                  <p className="eyebrow text-warmbrown mb-5">Key Features</p>
                  <ul className="grid sm:grid-cols-2 gap-x-8 gap-y-3">
                    {listing.features.map((feature) => (
                      <li
                        key={feature}
                        className="text-charcoal/85 border-b border-tan/40 pb-3"
                      >
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-12 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-[0.92rem]">
                <div className="border-t border-warmbrown/30 pt-4">
                  <p className="eyebrow text-charcoal/60 mb-1.5">Property Type</p>
                  <p className="text-charcoal/85">Single-Family Residence</p>
                </div>
                {listing.yearBuilt && (
                  <div className="border-t border-warmbrown/30 pt-4">
                    <p className="eyebrow text-charcoal/60 mb-1.5">Year Built</p>
                    <p className="text-charcoal/85">{listing.yearBuilt}</p>
                  </div>
                )}
                <div className="border-t border-warmbrown/30 pt-4">
                  <p className="eyebrow text-charcoal/60 mb-1.5">Location</p>
                  <p className="text-charcoal/85">{formatListingAddress(listing)}</p>
                </div>
                {listing.mlsNumber && (
                  <div className="border-t border-warmbrown/30 pt-4">
                    <p className="eyebrow text-charcoal/60 mb-1.5">MLS Number</p>
                    <p className="text-charcoal/85">{listing.mlsNumber}</p>
                  </div>
                )}
              </div>
            </div>

            <div className="md:col-span-4">
              <div className="sticky top-28 border border-tan/40 bg-lighttan/30 p-7">
                <p className="eyebrow text-charcoal/60 mb-2">Interested?</p>
                <h2 className="font-display text-2xl text-warmbrown leading-snug">
                  Schedule a Showing
                </h2>
                <p className="mt-3 text-charcoal/80 text-[0.92rem] leading-relaxed">
                  Reach out to {agent.name} to schedule a private showing or
                  ask a question about this home.
                </p>
                <div className="mt-6 flex flex-col gap-3">
                  <Link
                    href={`/contact?intent=buying&source=listing-${listing.slug}`}
                    className="inline-block text-center bg-warmbrown text-cream px-6 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
                  >
                    Request Information
                  </Link>
                  <GaLink
                    href={agent.phoneHref}
                    event="phone_click"
                    params={{ location: `listing-${listing.slug}` }}
                    className="inline-block text-center border border-warmbrown/50 text-warmbrown px-6 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
                  >
                    Call {agent.phone}
                  </GaLink>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Ready for the Next Step?"
        title="Let's schedule a"
        scriptAccent="private showing."
        body="Every home deserves an in-person visit before a decision. I'm happy to walk it with you."
        primaryCta={{ label: "Contact Pam", href: `/contact?intent=buying&source=listing-${listing.slug}` }}
        secondaryCta={{ label: "All Listings", href: "/listings" }}
      />

      {others.length > 0 && (
        <section className="py-20 md:py-28 bg-paper">
          <div className="max-w-editorial mx-auto px-6 lg:px-10">
            <p className="eyebrow text-charcoal/60 mb-10">Other Listings</p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {others.map((o) => (
                <ListingCard key={o.id} listing={o} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
