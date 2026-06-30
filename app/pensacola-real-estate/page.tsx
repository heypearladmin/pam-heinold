import Link from "next/link";
import CTASection from "@/components/CTASection";
import Section from "@/components/Section";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  realEstateAgentSchema,
  breadcrumbSchema,
  webPageSchema,
  faqPageSchema,
  serviceSchema,
} from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "Pensacola, FL Real Estate — Pam Heinold, LPT Realty",
  description:
    "Buy or sell a home in Pensacola, FL with Pam Heinold — 22-year local REALTOR® with LPT Realty. Hyperlocal expertise in Marcus Pointe, Nature Trail, East Hill, Pensacola Beach, and the Gulf Coast.",
  alternates: { canonical: "/pensacola-real-estate" },
};

const base = site.company.website;

export default function PensacolaRealEstatePage() {
  return (
    <>
      <JsonLd schema={realEstateAgentSchema()} />
      <JsonLd schema={breadcrumbSchema([
        { name: "Home", url: base },
        { name: "Pensacola Real Estate", url: `${base}/pensacola-real-estate` },
      ])} />
      <JsonLd schema={webPageSchema({
        name: "Pensacola, FL Real Estate — Pam Heinold",
        url: `${base}/pensacola-real-estate`,
        description: "Buy or sell a home in Pensacola, FL with Pam Heinold — 22-year local REALTOR® with LPT Realty. Hyperlocal expertise across Marcus Pointe, Nature Trail, East Hill, and the Gulf Coast.",
      })} />
      <JsonLd schema={serviceSchema({
        name: "Pensacola Real Estate Services",
        url: `${base}/pensacola-real-estate`,
        description: "Buyer and seller representation across Pensacola, FL and the Gulf Coast. 22 years of hyperlocal expertise with LPT Realty.",
        category: "Real Estate Agent",
      })} />
      <JsonLd schema={faqPageSchema([
        { question: "Who is the best real estate agent in Pensacola, FL?", answer: "Pamela Heinold is a 22-year Pensacola REALTOR® with LPT Realty known for her hyperlocal expertise, warm approach, and deep knowledge of neighborhoods like Marcus Pointe, Nature Trail, and East Hill. She can be reached at (850) 232-2332." },
        { question: "What is the Pensacola, FL real estate market like?", answer: "Pensacola offers one of the most affordable coastal real estate markets in Florida. The Gulf Coast location, strong schools, and low cost of living attract buyers from across the country. Inventory and pricing vary by neighborhood — contact Pam for current market conditions." },
        { question: "How do I sell my home in Pensacola, FL?", answer: "Selling a home in Pensacola starts with a no-pressure conversation about your timeline, goals, and property. Pam Heinold provides honest pricing guidance, professional marketing, and experienced negotiation. Call (850) 232-2332 to get started." },
        { question: "What is the average home price in Pensacola, FL?", answer: "Home prices in Pensacola range widely — from affordable starter homes to luxury Gulf-front properties. Gated communities like Marcus Pointe and Nature Trail offer custom homes in the mid-range market. Contact Pam Heinold for current pricing in the neighborhood you're considering." },
        { question: "Is Pensacola, FL a good place to invest in real estate?", answer: "Pensacola has shown strong long-term appreciation as one of Florida's most affordable Gulf Coast markets. The combination of military presence, growing tourism, low taxes, and a desirable lifestyle makes it a strong long-term investment market." },
      ])} />

      {/* Hero */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 max-w-3xl">
          <p className="eyebrow text-charcoal/60 mb-6">Pensacola, FL Real Estate</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight">
            Pensacola real estate,{" "}
            <span className="script text-warmbrown/80 text-6xl md:text-8xl">
              understood deeply.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            Pamela Heinold is a REALTOR® with LPT Realty and a 22-year
            Pensacola real estate authority. Whether you are buying your first
            Gulf Coast home, selling a property you love, or relocating from
            across the country — this is the local guidance that makes it
            feel less like a transaction and more like a good decision.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href="/contact"
              className="inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
            >
              Talk With Pam
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

      {/* Why Pensacola */}
      <Section
        eyebrow="Why Pensacola"
        title="What makes this market worth knowing"
        scriptAccent="by name."
        background="lighttan"
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            { title: "Gulf Coast Access", body: "Miles of white-sand beaches, waterfront properties, and a coastal lifestyle at a fraction of what Naples or Sarasota cost." },
            { title: "Affordable Pricing", body: "One of Florida's most affordable Gulf Coast markets. Strong long-term appreciation with entry points well below the state average." },
            { title: "Strong Schools", body: "Public, private, and faith-based schools across Escambia and Santa Rosa counties — a key driver for family relocation buyers." },
            { title: "Military Community", body: "Home to NAS Pensacola and a strong military community that brings stability, diversity, and consistent housing demand." },
            { title: "Historic Character", body: "East Hill, North Hill, and downtown Pensacola offer historic architecture and walkable neighborhoods unlike anything else on the Gulf Coast." },
            { title: "Low Property Taxes", body: "Florida's homestead exemption and no state income tax make Pensacola an especially attractive destination for buyers coming from high-tax states." },
          ].map((item) => (
            <div key={item.title} className="border-t border-warmbrown/30 pt-6">
              <h3 className="font-display text-xl text-warmbrown leading-snug">{item.title}</h3>
              <p className="mt-3 text-charcoal/80 leading-relaxed text-sm">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Neighborhoods */}
      <Section
        eyebrow="Hyperlocal Knowledge"
        title="What neighborhood should you buy in"
        scriptAccent="in Pensacola?"
      >
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-8 text-charcoal/85">
          {[
            { name: "Marcus Pointe", slug: "marcus-pointe", desc: "Gated golf community · ~500 homes · Custom construction · Northwest Pensacola" },
            { name: "Nature Trail", slug: "nature-trail", desc: "Master-planned gated · ~600 homes · Resort amenities · Walking trails" },
            { name: "East Hill", slug: "east-hill", desc: "Historic bungalows · Walkable · Mature oaks · Near downtown" },
            { name: "Downtown Pensacola", slug: "downtown-pensacola", desc: "Urban living · Arts district · Bayfront access · Restaurant row" },
            { name: "Pensacola Beach", slug: "pensacola-beach", desc: "Gulf-front living · Santa Rosa Island · Vacation rental market" },
            { name: "Perdido Key", slug: "perdido-key", desc: "Secluded · Gulf & bay access · Near Alabama border · Low density" },
          ].map((n) => (
            <Link
              key={n.slug}
              href={`/neighborhoods/${n.slug}`}
              className="group border-b border-warmbrown/20 pb-6 hover:border-warmbrown transition-colors duration-300"
            >
              <p className="font-display text-xl text-warmbrown group-hover:text-nearblack transition-colors">{n.name} →</p>
              <p className="mt-1 text-sm text-charcoal/60">{n.desc}</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* Buyer + Seller */}
      <Section eyebrow="How Pam Can Help" title="Buying or selling in Pensacola," scriptAccent="done right." background="lighttan">
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-warmbrown">Buying a Home in Pensacola</h3>
            <p className="text-charcoal/80 leading-relaxed">
              Pam guides buyers through neighborhood selection, school research, commute planning, offer strategy, and every step to closing. Whether you are buying locally or relocating from out of state, the process is calm, clear, and unhurried.
            </p>
            <Link href="/contact" className="inline-block text-[0.78rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown pb-1 hover:text-nearblack hover:border-nearblack transition-colors duration-300">
              Start the Conversation →
            </Link>
          </div>
          <div className="space-y-4">
            <h3 className="font-display text-2xl text-warmbrown">Selling a Home in Pensacola</h3>
            <p className="text-charcoal/80 leading-relaxed">
              Sellers benefit from Pam's 22 years of pricing insight, local buyer network, and professional marketing. No pressure, no inflated promises — just honest guidance and experienced execution from listing to close.
            </p>
            <Link href="/contact" className="inline-block text-[0.78rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown pb-1 hover:text-nearblack hover:border-nearblack transition-colors duration-300">
              Get a Seller Consultation →
            </Link>
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Common Questions" title="What buyers and sellers ask" scriptAccent="about Pensacola real estate.">
        <dl className="max-w-3xl divide-y divide-warmbrown/15">
          {[
            { q: "What is the Pensacola, FL real estate market like?", a: "Pensacola offers one of the most affordable coastal real estate markets in Florida. The Gulf Coast location, strong schools, and low cost of living attract buyers from across the country. Inventory and pricing shift seasonally — contact Pam for current conditions." },
            { q: "How do I sell my home in Pensacola?", a: "Selling starts with an honest conversation about your timeline and goals. Pam provides pricing guidance based on real local data, professional marketing, and experienced negotiation. Most Pensacola homes sell within 30–60 days when priced correctly." },
            { q: "What is the average home price in Pensacola, FL?", a: "Home prices range from the mid $200s for starter homes to $1M+ for Gulf-front properties. Gated communities like Marcus Pointe and Nature Trail typically fall in the $350K–$600K range. Contact Pam for current pricing in a specific neighborhood." },
            { q: "Is Pensacola a good place to retire?", a: "Yes — Pensacola is consistently ranked among Florida's best retirement destinations for its mild climate, affordable housing, no state income tax, excellent healthcare, and Gulf Coast lifestyle. It offers a slower pace than Miami or Tampa without sacrificing amenities." },
            { q: "Do I need a local REALTOR® to buy in Pensacola?", a: "Hyperlocal knowledge makes a meaningful difference in Pensacola's market. Knowing which streets flood, which neighborhoods are appreciating, and which listings are overpriced requires years of local experience — not just access to MLS data." },
          ].map(({ q, a }) => (
            <div key={q} className="py-7">
              <dt className="font-display text-xl text-warmbrown leading-snug">{q}</dt>
              <dd className="mt-3 text-charcoal/80 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTASection
        eyebrow="Ready to Move?"
        title="22 years. One city."
        scriptAccent="Let's talk."
        body="Whether you are buying, selling, or just starting to think about it — a friendly conversation with Pam is the best first step."
        primaryCta={{ label: "Contact Pam", href: "/contact" }}
        secondaryCta={{ label: "About Pam", href: "/about" }}
      />
    </>
  );
}
