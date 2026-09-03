import Link from "next/link";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import BlogCard from "@/components/BlogCard";
import InlineCta from "@/components/InlineCta";
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
  title: "Buying a Home in Pensacola, FL — A Complete Buyer's Guide",
  description:
    "A step-by-step guide to buying a home in Pensacola, FL — getting pre-approved, finding the right neighborhood, making an offer, inspections, and closing day, from a 22-year local REALTOR®.",
  alternates: { canonical: "/services/buying" },
};

const base = site.company.website;

const resourceSlugs = [
  "va-loan-guide-pensacola-military-buyers",
  "pensacola-rental-property-investment-guide",
  "first-time-homebuyer-guide-pensacola",
  "what-being-ready-to-buy-means-pensacola",
  "what-changes-your-monthly-payment-pensacola",
  "why-same-price-homes-feel-different-pensacola",
  "new-construction-vs-existing-homes-pensacola",
  "future-home-maintenance-costs-pensacola",
  "what-protects-home-value-pensacola",
  "pensacola-homeowners-insurance-guide",
];

export default function BuyingServicesPage() {
  const resources = resourceSlugs
    .map((slug) => getPostBySlug(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  const relatedFAQs = getAllFAQs()
    .filter((f) => f.postCategory === "Buyer Guide")
    .slice(0, 8);

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: base },
          { name: "Services", url: `${base}/services` },
          { name: "Buying", url: `${base}/services/buying` },
        ])}
      />
      <JsonLd
        schema={webPageSchema({
          name: "Buying a Home in Pensacola, FL — A Complete Buyer's Guide",
          url: `${base}/services/buying`,
          description:
            "A step-by-step guide to buying a home in Pensacola, FL — pre-approval, neighborhood fit, offers, inspections, and closing.",
        })}
      />
      <JsonLd
        schema={serviceSchema({
          name: "Home Buying Services in Pensacola, FL",
          url: `${base}/services/buying`,
          description:
            "Buyer representation across Pensacola, FL — pre-approval guidance, neighborhood matching, offer strategy, inspection support, and closing coordination.",
          category: "Real Estate Buyer Representation",
        })}
      />
      <JsonLd
        schema={faqPageSchema([
          {
            question: "How do I start buying a home in Pensacola, FL?",
            answer:
              "Start by getting pre-approved with a lender so you know your real budget, then work with a local agent to identify neighborhoods that fit your lifestyle. Pam Heinold walks every buyer through this process from the first conversation, not just once you've found a house.",
          },
          {
            question: "How much money do I need to buy a house in Pensacola?",
            answer:
              "Beyond your down payment (as low as 3–5% for conventional loans, 0% for VA-eligible buyers), budget for closing costs of roughly 2–5% of the purchase price, plus a home inspection and the first year of homeowners, flood, and wind insurance — which in Pensacola should be quoted early, not assumed.",
          },
          {
            question: "Do I need a buyer's agent in Pensacola?",
            answer:
              "A buyer's agent's services are typically paid by the seller side of the transaction, so most Pensacola buyers use one at no direct cost. A local agent's value is in knowing which neighborhoods and streets fit your life, negotiating on your behalf, and catching issues before they become expensive surprises.",
          },
        ])}
      />

      {/* Hero */}
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 max-w-3xl">
          <p className="eyebrow text-charcoal/60 mb-6">Buying a Home</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight">
            Buying a home in Pensacola,{" "}
            <span className="script text-warmbrown/80 text-6xl md:text-8xl">
              made calm and clear.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            Every home purchase follows roughly the same path — pre-approval,
            search, offer, inspection, closing — but the details that matter
            are specific to Pensacola. This guide walks through each step,
            with honest local guidance at every one.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact?intent=buying&source=services-buying-hero"
              className="inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
            >
              Start Your Home Search
            </Link>
            <Link
              href="/neighborhoods"
              className="inline-block border border-warmbrown text-warmbrown px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
            >
              Explore Neighborhoods
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
              Buying a home in Pensacola typically takes 30–60 days from
              accepted offer to closing. The process runs: get pre-approved,
              identify the right neighborhood, make a competitive offer,
              complete inspections, and close — each step benefiting from
              guidance specific to this market's insurance, flood, and
              neighborhood variables.
            </p>
          </div>
        </div>
      </section>

      <Section
        id="getting-pre-approved"
        eyebrow="Step One"
        title="Getting pre-approved"
        scriptAccent="before you shop."
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Pre-approval is the single step that changes everything else
            about your search. It tells you your real budget — not an
            estimate — and it tells sellers you&apos;re a serious buyer, which
            matters in a market where well-priced homes still move quickly.
          </p>
          <p>
            In Pensacola specifically, your monthly payment is shaped by more
            than principal and interest — property taxes, homeowners
            insurance, and (depending on the neighborhood) flood or wind
            coverage all factor in. A lender who understands the local
            insurance landscape will give you a far more honest number than
            a national online calculator.
          </p>
          <p>
            Further reading:{" "}
            <Link
              href="/blog/what-changes-your-monthly-payment-pensacola"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              What Changes Your Monthly Mortgage Payment the Most
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/what-being-ready-to-buy-means-pensacola"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              What &quot;Being Ready to Buy&quot; Actually Means
            </Link>
            .
          </p>
        </div>
      </Section>

      <InlineCta
        eyebrow="Free Download"
        title="Get the First-Time Buyer Guide"
        body="Every step from pre-approval to closing day, written specifically for Pensacola — yours as a PDF, no email required."
        cta={{ label: "Download the Guide", href: "/pdfs/first-time-homebuyer-guide-pensacola.pdf" }}
        download
      />

      <Section
        id="finding-the-right-home"
        eyebrow="Step Two"
        title="Finding the right home"
        scriptAccent="in the right neighborhood."
        background="lighttan"
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Two homes at the same price in Pensacola can live completely
            differently depending on the neighborhood — commute, schools,
            flood zone, and community feel all shift the equation. This is
            where local knowledge earns its keep: knowing which streets sit
            higher and stay drier, which lots see more traffic, and which
            neighborhoods match the pace of life you actually want.
          </p>
          <p>
            Start with{" "}
            <Link
              href="/neighborhoods"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              a tour of Pensacola&apos;s neighborhoods
            </Link>
            , or read{" "}
            <Link
              href="/blog/why-same-price-homes-feel-different-pensacola"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Why Two Pensacola Homes at the Same Price Feel Completely
              Different
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        id="making-an-offer"
        eyebrow="Step Three"
        title="Making an offer"
        scriptAccent="that actually wins."
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            A strong offer in Pensacola is rarely just the highest number.
            Terms matter — inspection contingencies, closing timeline,
            escrow amount, and how the offer is presented all shape whether
            a seller says yes. Pam builds each offer around the specific
            listing and seller situation, not a generic template.
          </p>
          <p>
            That means knowing how long the home has sat, what similar
            homes nearby actually closed for (not just listed for), and
            what the seller&apos;s real motivation is — timeline, price, or
            both. That context changes what a winning offer looks like.
          </p>
        </div>
      </Section>

      <Section
        id="home-inspections"
        eyebrow="Step Four"
        title="Home inspections"
        scriptAccent="and what they protect."
        background="lighttan"
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            An inspection isn&apos;t just a formality before closing — it&apos;s
            where you learn what a home will actually cost to own long-term.
            In Pensacola&apos;s climate, roof age, HVAC condition, and moisture
            management deserve particular attention, along with anything
            that could affect an insurance renewal down the line.
          </p>
          <p>
            Further reading:{" "}
            <Link
              href="/blog/future-home-maintenance-costs-pensacola"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Why Smart Buyers Ask About Future Maintenance Costs
            </Link>{" "}
            and{" "}
            <Link
              href="/blog/what-protects-home-value-pensacola"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              What Actually Protects Your Home&apos;s Value in Pensacola
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        id="closing"
        eyebrow="Step Five"
        title="Closing costs & closing day"
        scriptAccent="the last details."
      >
        <div className="max-w-3xl space-y-6 text-charcoal/85 leading-relaxed">
          <div>
            <h3 className="font-display text-xl text-warmbrown mb-3">
              Closing Costs
            </h3>
            <p>
              Plan for roughly 2–5% of the purchase price in closing costs —
              lender fees, title insurance, recording fees, and prepaid
              items like the first year of homeowners insurance. In
              Pensacola, insurance is the variable that surprises the most
              buyers, so get real quotes early rather than at the closing
              table.
            </p>
          </div>
          <div>
            <h3 className="font-display text-xl text-warmbrown mb-3">
              Closing Day
            </h3>
            <p>
              Closing day itself is largely paperwork — a final walkthrough,
              signing at the title company, and receiving the keys. The work
              that makes it smooth happens in the weeks before: clear title,
              a completed final loan approval, and insurance in place before
              the deadline.
            </p>
          </div>
          <p>
            Further reading:{" "}
            <Link
              href="/blog/pensacola-homeowners-insurance-guide"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              Pensacola Homeowners Insurance: What Every Buyer Needs to Know
              Before Closing
            </Link>
            .
          </p>
        </div>
      </Section>

      <Section
        id="luxury-home-buying"
        eyebrow="For Luxury Buyers"
        title="Buying at the upper end"
        scriptAccent="of the Pensacola market."
        background="lighttan"
      >
        <div className="max-w-3xl space-y-5 text-charcoal/85 leading-relaxed">
          <p>
            Luxury buyers in Pensacola are often relocating from larger
            metros and comparing this market against places like Naples,
            Destin, or 30A. The process follows the same fundamentals — but
            with more attention to waterfront insurance, gated-community
            due diligence, and a buyer pool that moves carefully and does
            its homework.
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
                More Buying Resources
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
          eyebrow="Buyer Questions"
          title="Questions buyers ask"
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
            Selling instead of buying?{" "}
            <Link
              href="/services/selling"
              className="text-warmbrown border-b border-warmbrown/40 hover:border-warmbrown transition-colors duration-300"
            >
              See the Home Selling Guide →
            </Link>
          </p>
        </div>
      </section>

      <CTASection
        eyebrow="Ready to Look?"
        title="Let's find the home"
        scriptAccent="that feels like yours."
        body="No pressure, no rush — just an honest conversation about what you're looking for and where to find it in Pensacola."
        primaryCta={{ label: "Start Your Home Search", href: "/contact?intent=buying&source=services-buying-end" }}
        secondaryCta={{ label: "Selling Instead?", href: "/services/selling" }}
      />
    </>
  );
}
