import ListingCard from "@/components/ListingCard";
import CTASection from "@/components/CTASection";
import { getActiveListings } from "@/lib/listing-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "Pensacola Area Listings — Homes for Sale",
  description:
    "Featured homes for sale in and around Pensacola, FL, hand-picked and presented by Pam Heinold, LPT Realty. Browse current listings or reach out to schedule a private showing.",
  alternates: { canonical: "/listings" },
};

export default function ListingsIndexPage() {
  const listings = getActiveListings();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: site.company.website },
          { name: "Listings", url: `${site.company.website}/listings` },
        ])}
      />
      <JsonLd
        schema={webPageSchema({
          name: "Pensacola Area Listings — Homes for Sale",
          url: `${site.company.website}/listings`,
          description:
            "Featured homes for sale in and around Pensacola, FL, presented by Pam Heinold, LPT Realty.",
        })}
      />

      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-charcoal/60 mb-6">Featured Listings</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight max-w-4xl">
            Listings
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            A hand-picked selection of homes currently available in and
            around Pensacola. Every property here has been walked, vetted,
            and priced with the same care Pam brings to her own clients — not
            pulled from a syndicated feed.
          </p>
        </div>
      </section>

      <section className="pb-28 md:pb-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          {listings.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {listings.map((listing, i) => (
                <ListingCard
                  key={listing.id}
                  listing={listing}
                  priority={i === 0}
                />
              ))}
            </div>
          ) : (
            <div className="max-w-xl mx-auto text-center py-20 border border-tan/40 bg-lighttan/30">
              <p className="eyebrow text-warmbrown mb-4">Coming Soon</p>
              <h2 className="font-display text-3xl text-warmbrown mb-4">
                New listings are on the way.
              </h2>
              <p className="text-charcoal/80 leading-relaxed">
                Pam is preparing featured listings for this page. In the
                meantime, reach out directly — she can share what&apos;s
                currently available or coming to market before it&apos;s
                posted here.
              </p>
            </div>
          )}
        </div>
      </section>

      <CTASection
        eyebrow="Don't See the Right Fit?"
        title="Let's find a home that isn't"
        scriptAccent="on this page yet."
        body="Many of the best opportunities in Pensacola never make it to a public listings page. Tell Pam what you're looking for and she'll help you find it."
        primaryCta={{ label: "Talk With Pam", href: "/contact?intent=buying&source=listings-index" }}
        secondaryCta={{ label: "Explore Neighborhoods", href: "/neighborhoods" }}
      />
    </>
  );
}
