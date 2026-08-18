import Link from "next/link";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import BlogCard from "@/components/BlogCard";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
  serviceSchema,
} from "@/lib/seo/schema";
import { site } from "@/lib/site";
import { getPostBySlug } from "@/lib/blog-data";
import { getAllFAQs } from "@/lib/blog-utils";

export const metadata = {
  title: "Selling a Home in Pensacola, FL — A Complete Seller's Guide",
  description:
    "A step-by-step guide to selling a home in Pensacola, FL — home value, preparing and staging, pricing strategy, marketing, negotiating offers, and closing, from a 22-year local REALTOR®.",
  alternates: { canonical: "/services/selling" },
};

const base = site.company.website;

const resourceSlugs = [
  "biggest-seller-mistakes-before-listing-pensacola",
  "why-pensacola-homes-sit-on-market",
  "what-buyers-expect-pensacola-sellers-2026",
  "how-to-know-home-is-priced-right-pensacola",
  "preparing-your-pensacola-home-for-luxury-market",
  "pensacola-luxury-market-insights-2026",
];

export default function SellingServicesPage() {
  const resources = resourceSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedFAQs = getAllFAQs()
    .filter((f) => f.postCategory === "Seller Strategy")
    .slice(0, 8);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: base },
          { name: "Services", url: `${base}/services` },
          { name: "Selling", url: `${base}/services/selling` },
        ])}
      />
      <JsonLd
        schema={webPageSchema({
          name: "Selling a Home in Pensacola, FL — A Complete Seller's Guide",
          url: `${base}/services/selling`,
          description:
            "A step-by-step guide to selling a home in Pensacola, FL — home value, preparing and staging, pricing, marketing, offers, and closing.",
        })}
      />
      <JsonLd
        schema={serviceSchema({
          name: "Home Selling Services in Pensacola, FL",
          url: `${base}/services/selling`,
          description:
            "Seller representation across Pensacola, FL — pricing strategy, staging guidance, marketing, offer negotiation, and closing coordination.",
          category: "Real Estate Seller Representation",
        })}
      />
      <JsonLd
        schema={faqPageSchema([
          {
            question: "How do I find out what my Pensacola home is worth?",
            answer:
              "The most accurate home value comes from a comparative market analysis built from recent, comparable sales on your specific street — not an automated online estimate. Pam Heinold provides a free, honest valuation based on real local data.",
          },
          {
            question: "How long does it take to sell a house in Pensacola?",
            answer:
              "Well-prepared, accurately priced homes in desirable Pensacola neighborhoods typically sell within 30–60 days. Homes that are overpriced or under-prepared tend to sit considerably longer, which is why pricing and preparation are the two most important decisions a seller makes.",
          },
          {
            question: "Do I need to stage my home to sell it in Pensacola?",
            answer:
              "Staging isn't required, but it consistently helps homes photograph better, show better, and sell faster — particularly at higher price points where buyers are comparing several well-presented listings. Even light staging (decluttering, depersonalizing, refreshing key rooms) makes a measurable difference.",
          },
        ])}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 max-w-3xl">
          <p className="eyebrow text-charcoal/60 mb-6">Selling a Home</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight">
            Selling your Pensacola home,{" "}
            <span className="script text-warmbrown/80 text-6xl md:text-8xl">
              with clarity and confidence.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            Every home sale follows roughly the same path — know your value,
            prepare and price it right, market it well, negotiate the offer,
            and close. This guide walks through each step, with the honest
            pricing guidance Pensacola sellers deserve.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
            >
              Get Your Home Value
            </Link>
            <Link
              href="/contact"
              className="inline-block border border-warmbrown text-warmbrown px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
            >
              Let&apos;s Talk About Selling
            </Link>
          </div>
        </div>
      </section>

      <section className="pb-4 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <div className="border-l-4 border-warmbrown bg-lighttan/25 px-6 py-5">
            <p className="eyebrow text-warmbrown mb-2 text-[0.66rem]">
              Quick Answer
            </p>
            <p className="text-charcoal leading-relaxed text-[1.02rem]">
              Selling a home in Pensacola typically takes 30–60 days from
              listing to closing when priced accurately. The process runs:
              get a real home valuation, prepare and price the home, market
              it professionally, negotiate the offer, and close — with
              pricing discipline making the biggest difference in how
              quickly and confidently it sells.
            </p>
          </div>
        </div>
      </section>

      <Section
        id="whats-my-home-worth"
        eyebrow="Step One"
        title="What's my home worth?"
        scriptAccent="a real answer, not a guess."
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Online home-value estimators are a starting point, not an
            answer — they can miss a renovated kitchen, a golf-course lot,
            or the simple fact that no two homes on your street are quite
            the same. A real valuation comes from recent, comparable sales
            and a walkthrough of what actually makes your home distinct.
          </p>
          <p>
            Pricing discipline is the single biggest factor in how a home
            performs on the market. Further reading:{" "}
            <Link
              href="/blog/how-to-know-home-is-priced-right-pensacola"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              How to Know If a Pensacola Home Is Priced Right
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/why-pensacola-homes-sit-on-market"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Why Some Pensacola Homes Sit on the Market
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        id="home-staging"
        eyebrow="Step Two"
        title="Preparing your home"
        scriptAccent="and staging it well."
        background="lighttan"
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Today&apos;s buyers form an opinion before they ever walk through
            the front door — through photos, video, and the listing
            narrative. Decluttering, small repairs, fresh paint, and
            professional staging consistently pay for themselves in faster
            sales and stronger offers, especially at higher price points.
          </p>
          <p>
            Further reading:{" "}
            <Link
              href="/blog/preparing-your-pensacola-home-for-luxury-market"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Preparing Your Pensacola Home for the Luxury Market
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/biggest-seller-mistakes-before-listing-pensacola"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              The Biggest Mistakes Pensacola Sellers Make Before Listing
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        id="marketing-your-home"
        eyebrow="Step Three"
        title="Marketing your home"
        scriptAccent="the way today's buyers search."
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Professional photography and video are no longer optional — many
            Pensacola buyers, especially those relocating from out of state,
            make their first decision through a screen. Beyond the listing
            itself, marketing that tells the story of the neighborhood — the
            morning walk, the porch culture, the golf course view — performs
            better than photos of an empty room.
          </p>
          <p>
            A well-marketed listing also reaches the right buyer pool
            through the MLS, syndication to major search portals, and
            targeted outreach to agents actively working with buyers in
            that price range and neighborhood.
          </p>
        </div>
      </Section>

      <Section
        id="negotiating-offers"
        eyebrow="Step Four"
        title="Understanding & negotiating offers"
        scriptAccent="without leaving money behind."
        background="lighttan"
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Not every offer is what it looks like on paper. Price matters,
            but so do financing terms, contingencies, closing timeline, and
            the buyer&apos;s actual readiness to close. Understanding what a
            buyer is really asking for — and where there&apos;s room to
            negotiate without losing the sale — is where experience matters
            most.
          </p>
          <p>
            Further reading:{" "}
            <Link
              href="/blog/what-buyers-expect-pensacola-sellers-2026"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              What Today&apos;s Buyers Actually Expect When They Walk Into a
              Pensacola Home
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        id="closing-the-sale"
        eyebrow="Step Five"
        title="Closing the sale"
        scriptAccent="the final steps."
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Once an offer is accepted, the closing period is about keeping
            the sale on track — the buyer&apos;s inspection and financing
            contingencies, appraisal, and any repair negotiations that
            follow. A seller&apos;s agent who stays ahead of these details is
            what keeps a good offer from falling apart before closing day.
          </p>
          <p>
            Many sellers also choose a pre-listing inspection to catch
            issues before a buyer does — see the buyer&apos;s side of this
            process in{" "}
            <Link
              href="/services/buying#home-inspections"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Home Inspections
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        eyebrow="For Luxury Sellers"
        title="Selling at the upper end"
        scriptAccent="of the Pensacola market."
        background="lighttan"
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Luxury sellers are marketing to a buyer pool that has seen a lot
            of listings and knows what a well-prepared home looks like.
            Professional staging, cinematic video, and precise — not
            aspirational — pricing consistently outperform overpricing and
            waiting for the right buyer.
          </p>
          <p>
            Further reading:{" "}
            <Link
              href="/blog/pensacola-luxury-market-insights-2026"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Pensacola Luxury Market 2026: What Discerning Buyers and
              Sellers Need to Know
            </Link>
            .
          </p>
        </div>
      </Section>

      {/* Resource grid */}
      {resources.length > 0 && (
        <section className="pb-28 md:pb-40 bg-paper">
          <div className="max-w-editorial mx-auto px-6 lg:px-10">
            <div className="border-t border-tan/60 pt-16 md:pt-20">
              <p className="eyebrow text-charcoal/60 mb-10">
                More Selling Resources
              </p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
                {resources.map((post) => (
                  <BlogCard key={post.slug} post={post} />
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {relatedFAQs.length > 0 && (
        <Section
          eyebrow="Seller Questions"
          title="Questions sellers ask"
          scriptAccent="most often."
          background="lighttan"
        >
          <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3 max-w-4xl">
            {relatedFAQs.map((faq) => (
              <li key={faq.slug}>
                <Link
                  href={`/faq/${faq.slug}`}
                  className="text-charcoal/85 hover:text-warmbrown leading-relaxed underline decoration-tan/60 hover:decoration-warmbrown transition-colors"
                >
                  {faq.question}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}

      <section className="pb-4 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 text-center">
          <p className="text-charcoal/60 text-sm">
            Buying instead of selling?{" "}
            <Link
              href="/services/buying"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              See the Home Buying Guide →
            </Link>
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to List?"
        title="Let's talk about"
        scriptAccent="selling your home."
        body="A no-pressure conversation about your timeline, your goals, and what your home is really worth in today's Pensacola market."
        primaryCta={{ label: "Let's Talk About Selling", href: "/contact" }}
        secondaryCta={{ label: "Buying Instead?", href: "/services/buying" }}
      />
    </>
  );
}
