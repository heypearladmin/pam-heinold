import Link from "next/link";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema, faqPageSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "Buying & Selling Services in Pensacola, FL — Pam Heinold",
  description:
    "A Pensacola real estate resource center for buyers and sellers — guidance on getting pre-approved, finding a home, pricing, staging, offers, and closing from a 22-year local REALTOR®.",
  alternates: { canonical: "/services" },
};

const base = site.company.website;

export default function ServicesPage() {
  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: base },
          { name: "Services", url: `${base}/services` },
        ])}
      />
      <JsonLd
        schema={webPageSchema({
          name: "Buying & Selling Services in Pensacola, FL — Pam Heinold",
          url: `${base}/services`,
          description:
            "A Pensacola real estate resource center for buyers and sellers, from getting pre-approved to closing day.",
        })}
      />
      <JsonLd
        schema={faqPageSchema([
          {
            question: "Does Pam Heinold work with both buyers and sellers?",
            answer:
              "Yes. Pam represents both buyers and sellers across Pensacola, FL — from first-time buyers to luxury sellers preparing a Gulf-front listing. Her approach starts with an honest, no-pressure conversation about your goals.",
          },
          {
            question: "What real estate services does Pam Heinold offer in Pensacola?",
            answer:
              "Pam provides full-service buyer representation (pre-approval guidance, neighborhood matching, offer strategy, inspection support, closing coordination) and full-service seller representation (pricing strategy, staging guidance, marketing, offer negotiation, closing coordination) across Pensacola and the surrounding Gulf Coast.",
          },
        ])}
      />

      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-charcoal/60 mb-6">Services</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight max-w-4xl">
            Buying or selling in Pensacola,{" "}
            <span className="script text-warmbrown/80 text-6xl md:text-8xl">
              done right.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            Whether you&apos;re getting pre-approved for your first home or
            preparing a Gulf-front property for the luxury market, this is
            where the process is explained plainly — with 22 years of
            Pensacola-specific guidance behind every step.
          </p>
        </div>
      </section>

      <section className="pb-28 md:pb-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-8">
          <Link
            href="/services/buying"
            className="group block border border-tan/50 hover:border-warmbrown p-10 md:p-12 transition-colors duration-300"
          >
            <p className="eyebrow text-charcoal/55 mb-4">For Buyers</p>
            <h2 className="font-display text-3xl md:text-4xl text-warmbrown leading-tight">
              Buying a Home
            </h2>
            <p className="mt-5 text-charcoal/80 leading-relaxed">
              Pre-approval, neighborhood fit, making an offer, inspections,
              and closing day — the full path to the keys, explained clearly.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-[0.76rem] tracking-wider uppercase text-warmbrown group-hover:gap-3 transition-all duration-300">
              Explore the Buying Guide <span aria-hidden="true">→</span>
            </p>
          </Link>

          <Link
            href="/services/selling"
            className="group block border border-tan/50 hover:border-warmbrown p-10 md:p-12 transition-colors duration-300"
          >
            <p className="eyebrow text-charcoal/55 mb-4">For Sellers</p>
            <h2 className="font-display text-3xl md:text-4xl text-warmbrown leading-tight">
              Selling a Home
            </h2>
            <p className="mt-5 text-charcoal/80 leading-relaxed">
              Home value, preparing and staging, pricing strategy,
              marketing, negotiating offers, and closing — done with honest
              guidance from listing to sold.
            </p>
            <p className="mt-6 inline-flex items-center gap-2 text-[0.76rem] tracking-wider uppercase text-warmbrown group-hover:gap-3 transition-all duration-300">
              Explore the Selling Guide <span aria-hidden="true">→</span>
            </p>
          </Link>
        </div>
      </section>

      <Section
        eyebrow="Common Questions"
        title="What buyers and sellers ask"
        scriptAccent="before reaching out."
        background="lighttan"
      >
        <dl className="max-w-3xl divide-y divide-warmbrown/15">
          {[
            {
              q: "Does Pam Heinold work with both buyers and sellers?",
              a: "Yes. Pam represents both buyers and sellers across Pensacola, FL — from first-time buyers to luxury sellers preparing a Gulf-front listing. Her approach starts with an honest, no-pressure conversation about your goals.",
            },
            {
              q: "What real estate services does Pam Heinold offer in Pensacola?",
              a: "Full-service buyer representation — pre-approval guidance, neighborhood matching, offer strategy, inspection support, and closing coordination — and full-service seller representation — pricing strategy, staging guidance, marketing, offer negotiation, and closing coordination — across Pensacola and the Gulf Coast.",
            },
            {
              q: "Where do I start if I'm not sure whether I'm buying or selling first?",
              a: "That's one of the most common situations Pam works through with clients relocating within Pensacola. Start with a conversation — she'll help you think through timing, financing, and whether to list or search first based on your specific situation.",
            },
          ].map(({ q, a }) => (
            <div key={q} className="py-7">
              <dt className="font-display text-xl text-warmbrown leading-snug">
                {q}
              </dt>
              <dd className="mt-3 text-charcoal/80 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <CTASection
        eyebrow="Ready When You Are"
        title="No pressure,"
        scriptAccent="just a real conversation."
        body="Buying, selling, or just thinking it through — reach out whenever it feels right."
        primaryCta={{ label: "Talk With Pam", href: "/contact" }}
        secondaryCta={{ label: "About Pam", href: "/about" }}
      />
    </>
  );
}
