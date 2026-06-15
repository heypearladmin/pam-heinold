import Image from "next/image";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { personSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "About Pam Heinold",
  description:
    "Pamela Heinold is a 22-year Pensacola real estate authority with LPT Realty. Cozy, elegant, relatable guidance for luxury buyers and sellers across the Gulf Coast.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <JsonLd schema={personSchema()} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: site.company.website }, { name: "About", url: `${site.company.website}/about` }])} />
      {/* Editorial header */}
      <section className="pt-40 pb-20 md:pt-48 md:pb-28 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-12 md:gap-16 items-end">
          <div className="md:col-span-7">
            <p className="eyebrow text-charcoal/65 mb-6">About · Pam Heinold</p>
            <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight">
              22 years.
              <br />
              One Pensacola.
              <br />
              <span className="script text-warmbrown/85 text-6xl md:text-8xl">
                One careful career.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-charcoal/85 text-lg leading-relaxed">
              I&apos;ve built my work the slow way — relationship by
              relationship, neighborhood by neighborhood, year by year. Most
              of my business comes from referrals, and I like it that way.
            </p>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-lighttan/40">
              <Image
                src={site.agent.headshot}
                alt={site.agent.headshotAlt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Bio + Philosophy */}
      <Section background="paper" padding="standard">
        <div className="grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-5">
            <p className="eyebrow text-warmbrown mb-5">Philosophy</p>
            <p className="font-display text-3xl md:text-4xl text-warmbrown leading-[1.18] tracking-tight">
              Cozy. Elegant. Relatable.{" "}
              <span className="script text-warmbrown/80 text-4xl md:text-5xl">
                Always honest.
              </span>
            </p>
          </div>

          <div className="md:col-span-7 space-y-6 text-charcoal/85 leading-relaxed text-[1.0625rem]">
            <p>
              I started my real estate career 22 years ago and have stayed
              right here in Pensacola the whole time. That continuity is the
              heart of how I work — I know the neighborhoods, the schools,
              the agents, the inspectors, the lenders, and the people who
              make a smooth closing happen.
            </p>
            <p>
              My approach is warm and refined. I move at a pace that respects
              the size of the decision in front of you. I don&apos;t pressure.
              I don&apos;t push. I tell the truth, even when the truth is the
              quieter answer.
            </p>
            <p>
              Most of my clients come to me through someone else they trust —
              a friend, a family member, a previous client. I&apos;d be
              honored to earn that kind of trust with you.
            </p>
          </div>
        </div>
      </Section>

      {/* Approved line / pull quote */}
      <section className="bg-nearblack text-cream py-24 md:py-32">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 text-center">
          <p className="eyebrow text-cream/55 mb-6">A Promise</p>
          <p className="font-display text-3xl md:text-5xl leading-[1.18] tracking-tight max-w-4xl mx-auto">
            &ldquo;Let&apos;s find the place that{" "}
            <span className="script text-tan text-4xl md:text-6xl">
              feels like home.
            </span>
            &rdquo;
          </p>
        </div>
      </section>

      {/* What that looks like */}
      <Section
        eyebrow="In Practice"
        title="What thoughtful Pensacola"
        scriptAccent="real estate looks like."
        intro="The work happens before any contract is signed — in the conversations, the neighborhood drives, and the small details that decide between a transaction and a long, satisfying chapter."
      >
        <div className="grid md:grid-cols-3 gap-10 md:gap-12">
          {[
            {
              n: "01",
              title: "Listen first.",
              body: "Before any property comes up, the conversation is about how you want your day to feel. The home follows from that.",
            },
            {
              n: "02",
              title: "Map the neighborhoods.",
              body: "I translate lifestyle into the right Pensacola micro-markets — by schools, commute, walkability, architecture, and long-term value.",
            },
            {
              n: "03",
              title: "Move with intention.",
              body: "Negotiation, diligence, and timing handled with the discipline of someone who has watched these neighborhoods for two decades.",
            },
          ].map((step) => (
            <div key={step.n} className="border-t border-tan pt-7">
              <p className="font-display text-2xl text-warmbrown">{step.n}</p>
              <h3 className="font-display text-2xl text-warmbrown mt-2 leading-snug">
                {step.title}
              </h3>
              <p className="mt-4 text-charcoal/80 leading-relaxed">
                {step.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Who I work with */}
      <Section
        eyebrow="Who I Work With"
        title="Kind, easy people who"
        scriptAccent="value the long view."
        background="lighttan"
      >
        <div className="grid md:grid-cols-3 gap-10">
          {[
            {
              title: "Luxury Buyers",
              body: "Discerning buyers — many of them relocating from larger metros — looking for the right Pensacola address and the right local guidance.",
            },
            {
              title: "Luxury Sellers",
              body: "Owners who want their home presented and positioned with the precision the home itself deserves.",
            },
            {
              title: "Long-Term Relationships",
              body: "Clients who become friends, who refer their family and their colleagues, and who stay in touch for years.",
            },
          ].map((g) => (
            <div key={g.title}>
              <h3 className="font-display text-2xl text-warmbrown leading-snug">
                {g.title}
              </h3>
              <p className="mt-3 text-charcoal/80 leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <CTASection
        eyebrow="Begin a Friendly Conversation"
        title="When the timing feels right,"
        scriptAccent="I'd love to hear from you."
        body="A year out or actively looking — the best Pensacola decisions tend to start with the slowest, friendliest conversations."
        primaryCta={{ label: "Contact Pam", href: "/contact" }}
        secondaryCta={{ label: "Read the Notes", href: "/blog" }}
      />
    </>
  );
}
