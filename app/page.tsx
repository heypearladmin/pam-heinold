import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import BlogCard from "@/components/BlogCard";
import NeighborhoodCard from "@/components/NeighborhoodCard";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/blog-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { localBusinessSchema, breadcrumbSchema, speakableSchema, faqPageSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";
import { neighborhoods } from "@/lib/neighborhood-data";

export const metadata = {
  title: "Pam Heinold — Pensacola Real Estate Authority",
  description:
    "22 years of cozy, elegant, hyperlocal Pensacola real estate guidance. Marcus Pointe, Nature Trail, East Hill, downtown, and the Gulf Coast waterfront.",
  alternates: { canonical: "/" },
};

export default function HomePage() {
  const featuredPosts = blogPosts.slice(0, 3);
  const featuredNeighborhoods = neighborhoods.slice(0, 6);

  return (
    <>
      <JsonLd schema={localBusinessSchema()} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: site.company.website }])} />
      <JsonLd schema={speakableSchema(["h1", "h2", ".hero-tagline", ".eyebrow"])} />
      <JsonLd schema={faqPageSchema([
        { question: "Who is Pam Heinold?", answer: "Pamela Heinold is a REALTOR® with LPT Realty and a 22-year Pensacola real estate authority. She specializes in hyperlocal buyer and seller guidance across Marcus Pointe, Nature Trail, East Hill, downtown Pensacola, Pensacola Beach, and Perdido Key." },
        { question: "What neighborhoods does Pam Heinold specialize in?", answer: "Pam Heinold specializes in Marcus Pointe, Nature Trail, East Hill, downtown Pensacola, Pensacola Beach, and Perdido Key. She has spent years as a hyperlocal specialist in Marcus Pointe (~500 homes) and Nature Trail (~600 homes)." },
        { question: "How do I buy a home in Pensacola, FL?", answer: "Buying a home in Pensacola starts with a friendly conversation about your goals, budget, and preferred lifestyle. Pam Heinold guides buyers through every step — from neighborhood selection and offer strategy to closing. Contact her at (850) 232-2332 or pam@pamheinold.com." },
        { question: "Is Pensacola a good place to live?", answer: "Pensacola, FL is consistently ranked among the best places to live on the Gulf Coast for its low cost of living, mild winters, strong schools, historic neighborhoods, and proximity to some of the country's most beautiful beaches." },
        { question: "How much do homes cost in Pensacola, FL?", answer: "Home prices in Pensacola vary widely by neighborhood. Historic East Hill and waterfront communities command premium prices, while inland neighborhoods like Marcus Pointe and Nature Trail offer excellent value for larger homes in gated communities. Contact Pam for current market data." },
      ])} />
      <Hero
        eyebrow="Pam Heinold · LPT Realty"
        headline="Let's find the place that"
        scriptAccent="feels like home."
        subheadline="22 years of warm, refined Pensacola real estate guidance — from the historic streets of East Hill to the gated calm of Marcus Pointe and the quiet beauty of the Gulf."
        image="/images/hero-pensacola.jpg"
        imageAlt="Pensacola East Hill historic neighborhood at golden hour with mature oaks"
        primaryCta={{ label: "Work With Pam", href: "/contact" }}
        secondaryCta={{ label: "Explore Neighborhoods", href: "/neighborhoods" }}
      />

      {/* Intro / Word From Pam */}
      <Section
        eyebrow="A Word From Pam"
        background="paper"
        padding="spacious"
      >
        <div className="grid md:grid-cols-12 gap-14 md:gap-20 items-start">
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-lighttan/40">
              <Image
                src={site.agent.headshot}
                alt={site.agent.headshotAlt}
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-5 text-[0.72rem] tracking-editorial uppercase text-charcoal/65">
              Pamela Heinold · REALTOR® · LPT Realty
            </p>
          </div>

          <div className="md:col-span-7 md:pt-10">
            <p className="font-display text-3xl md:text-[2.6rem] leading-[1.18] text-warmbrown tracking-tight">
              I&apos;ve spent 22 years walking these neighborhoods —{" "}
              <span className="script text-warmbrown/85 text-4xl md:text-5xl">
                street by street.
              </span>
            </p>
            <div className="mt-8 space-y-5 text-charcoal/85 leading-relaxed text-[1.0625rem]">
              <p>
                Pensacola is small enough to feel close-knit and layered enough
                that each neighborhood has its own clear personality. After two
                decades here, my work has become quieter and more careful —
                guiding luxury buyers and sellers through a market I know
                street by street.
              </p>
              <p>
                I work with families, professionals, and luxury buyers who
                value warmth, honesty, and the kind of guidance that comes
                from doing this for a long time. Most of my business comes
                from referrals and the relationships I&apos;ve built — and I
                like it that way.
              </p>
            </div>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-block border border-warmbrown/40 text-warmbrown px-6 py-3 text-[0.76rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
              >
                About Pam
              </Link>
              <Link
                href="/relocation"
                className="inline-block text-[0.76rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown pb-1 hover:text-nearblack hover:border-nearblack transition-colors duration-300"
              >
                Relocation Guidance →
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Hyperlocal callout — Marcus Pointe + Nature Trail */}
      <section className="bg-lighttan/40 py-20 md:py-28">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 text-center">
          <p className="eyebrow text-warmbrown mb-5">Pam&apos;s Hyperlocal Farms</p>
          <h2 className="font-display text-4xl md:text-5xl text-warmbrown leading-[1.1] tracking-tight max-w-3xl mx-auto">
            Two neighborhoods I know{" "}
            <span className="script text-warmbrown/80 text-5xl md:text-6xl">
              by name.
            </span>
          </h2>
          <p className="mt-6 text-charcoal/80 text-lg leading-relaxed max-w-2xl mx-auto">
            For years I&apos;ve carefully tended two of Pensacola&apos;s most
            established gated communities — Marcus Pointe (~500 homes) and
            Nature Trail (~600 homes). Hyperlocal means knowing the streets,
            not just the city.
          </p>
          <div className="mt-12 grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {neighborhoods
              .filter((n) => n.slug === "marcus-pointe" || n.slug === "nature-trail")
              .map((n) => (
                <Link
                  key={n.slug}
                  href={`/neighborhoods/${n.slug}`}
                  className="group block text-left bg-cream p-7 hover:shadow-lg transition-shadow duration-300"
                >
                  <p className="eyebrow text-warmbrown mb-3">
                    {n.lifestyleAngle}
                  </p>
                  <h3 className="font-display text-3xl text-warmbrown leading-snug">
                    {n.name}
                  </h3>
                  <p className="mt-3 text-charcoal/80 leading-relaxed">
                    {n.tagline}
                  </p>
                  <p className="mt-5 text-[0.72rem] tracking-editorial uppercase text-warmbrown inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                    Inside {n.name} →
                  </p>
                </Link>
              ))}
          </div>
        </div>
      </section>

      {/* All neighborhoods */}
      <Section
        eyebrow="Pensacola Neighborhoods"
        title="A city understood,"
        scriptAccent="one block at a time."
        intro="Six places that show how layered Pensacola really is — from historic East Hill to the Gulf-front communities of Pensacola Beach and Perdido Key."
        background="paper"
        padding="spacious"
      >
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {featuredNeighborhoods.map((n) => (
            <NeighborhoodCard key={n.slug} neighborhood={n} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/neighborhoods"
            className="inline-block border border-warmbrown/40 text-warmbrown px-7 py-3.5 text-[0.76rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
          >
            View All Neighborhoods
          </Link>
        </div>
      </Section>

      {/* Notes / Blog */}
      <Section
        eyebrow="Notes"
        title="Friendly thoughts on Pensacola"
        scriptAccent="real estate."
        intro="Market notes, neighborhood guides, and gentle relocation guidance — written the way I&apos;d talk to a friend across the kitchen table."
        background="cream"
      >
        <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
          {featuredPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link
            href="/blog"
            className="inline-block text-[0.76rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown pb-1 hover:text-nearblack hover:border-nearblack transition-colors duration-300"
          >
            Read All Notes →
          </Link>
        </div>
      </Section>

      {/* Relocation band */}
      <section className="relative bg-nearblack text-cream py-28 md:py-40 overflow-hidden">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-14 items-center">
          <div className="md:col-span-7">
            <p className="eyebrow text-cream/60 mb-5">
              Relocating to Pensacola
            </p>
            <h2 className="font-display text-4xl md:text-6xl leading-[1.08] tracking-tight">
              The Gulf is patient.{" "}
              <span className="script text-tan text-5xl md:text-7xl">
                So am I.
              </span>
            </h2>
            <p className="mt-7 max-w-xl text-cream/80 leading-relaxed text-lg">
              Most of my best work happens months before a move begins.
              Whether you&apos;re a year out or just beginning to think about
              Pensacola, I&apos;d love a slow, friendly conversation about
              what you&apos;re imagining.
            </p>
            <ul className="mt-10 grid sm:grid-cols-2 gap-x-8 gap-y-3 text-cream/85 text-sm">
              <li className="border-l border-warmbrown pl-4">
                Hyperlocal neighborhood matching
              </li>
              <li className="border-l border-warmbrown pl-4">
                Schools & community guidance
              </li>
              <li className="border-l border-warmbrown pl-4">
                Luxury and waterfront expertise
              </li>
              <li className="border-l border-warmbrown pl-4">
                Long-term value strategy
              </li>
            </ul>
            <div className="mt-10">
              <Link
                href="/relocation"
                className="inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-cream hover:text-warmbrown transition-colors duration-300"
              >
                Explore Relocation
              </Link>
            </div>
          </div>
          <div className="md:col-span-5 md:pl-6">
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src="/images/home-relocation-feature.jpg"
                alt="Pensacola waterfront home at sunset"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Lifestyle gallery */}
      <Section
        eyebrow="The Pensacola Lifestyle"
        title="A city of porches, oaks,"
        scriptAccent="and Gulf breezes."
        intro="Independent coffee shops on Palafox. Sunset on Pensacola Beach. The afternoon shade in East Hill. The quiet rhythm of a Sunday morning. Pensacola rewards people who pay attention to the small things."
        background="paper"
      >
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
          {[
            {
              src: "/images/lifestyle-palafox.jpg",
              alt: "Independent Pensacola coffee shop on Palafox",
            },
            {
              src: "/images/lifestyle-gulf.jpg",
              alt: "Pensacola Gulf beach with white sand at sunset",
            },
            {
              src: "/images/lifestyle-east-hill.jpg",
              alt: "East Hill historic Pensacola architectural detail",
            },
            {
              src: "/images/lifestyle-walkable.jpg",
              alt: "Walkable downtown Pensacola street with palms",
            },
          ].map((img, i) => (
            <div
              key={i}
              className={`relative overflow-hidden ${
                i % 2 === 0 ? "aspect-[3/4]" : "aspect-[3/4] md:translate-y-10"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </Section>

      {/* Video Authority */}
      <Section
        eyebrow="On Camera"
        title="Pensacola, in long form."
        intro="Neighborhood tours, market briefings, and friendly conversations — published on YouTube and across Pam's social channels."
        background="lighttan"
      >
        <div className="grid md:grid-cols-2 gap-6 md:gap-8">
          {[1, 2].map((i) => (
            <div
              key={i}
              className="relative aspect-video bg-nearblack/90 flex items-center justify-center group cursor-pointer overflow-hidden"
            >
              <div className="absolute inset-0 opacity-50 group-hover:opacity-65 transition-opacity duration-500">
                <Image
                  src={
                    i === 1
                      ? "/images/video-thumb-marcus-pointe-tour.jpg"
                      : "/images/video-thumb-market-briefing.jpg"
                  }
                  alt={
                    i === 1
                      ? "Marcus Pointe gated community video tour thumbnail"
                      : "Pensacola market briefing video thumbnail"
                  }
                  fill
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover"
                />
              </div>
              <div className="relative z-10 text-center text-cream px-6">
                <div className="w-16 h-16 mx-auto rounded-full border border-cream/70 flex items-center justify-center mb-5 group-hover:bg-warmbrown group-hover:border-warmbrown transition-colors duration-300">
                  <span className="ml-1 border-l-[10px] border-l-cream border-y-[7px] border-y-transparent" />
                </div>
                <p className="eyebrow text-cream/85">
                  {i === 1 ? "Neighborhood Tour" : "Market Briefing"}
                </p>
                <p className="font-display text-2xl md:text-3xl mt-2">
                  {i === 1
                    ? "Inside Marcus Pointe"
                    : "Pensacola Q2 — Where the Market Sits"}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 text-center">
          <a
            href={site.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[0.76rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown pb-1 hover:text-nearblack hover:border-nearblack transition-colors duration-300"
          >
            Visit Pam&apos;s YouTube Channel →
          </a>
        </div>
      </Section>

      {/* FAQ */}
      <Section eyebrow="Common Questions" title="What people ask" scriptAccent="before reaching out." background="paper">
        <dl className="max-w-3xl divide-y divide-warmbrown/15">
          {[
            { q: "What neighborhoods does Pam specialize in?", a: "Pam has spent years as a hyperlocal specialist in Marcus Pointe (~500 homes) and Nature Trail (~600 homes) — two of Pensacola's most established gated communities. She also covers East Hill, downtown, Pensacola Beach, and Perdido Key." },
            { q: "How do I get started buying a home in Pensacola?", a: "Start with a conversation. Pam walks buyers through neighborhood options, current market conditions, and what to expect at every stage — from first showing to closing. No rush, no pressure." },
            { q: "Is now a good time to buy or sell in Pensacola?", a: "Pensacola's Gulf Coast market has shown strong long-term appreciation. Timing depends on your specific situation — Pam can give you a clear picture of current inventory, pricing trends, and what that means for your goals." },
            { q: "Does Pam work with relocation buyers?", a: "Yes — relocation is one of Pam's specialties. She guides buyers moving from out of state through neighborhood selection, school research, commute planning, and remote offer strategy." },
            { q: "How long has Pam Heinold been in Pensacola real estate?", a: "22 years. Pam has guided hundreds of buyers and sellers across Pensacola's most desirable neighborhoods, building deep relationships and hyperlocal expertise that no algorithm can replicate." },
          ].map(({ q, a }) => (
            <div key={q} className="py-7">
              <dt className="font-display text-xl text-warmbrown leading-snug">{q}</dt>
              <dd className="mt-3 text-charcoal/80 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>

      {/* Testimonials */}
      <Section eyebrow="What Clients Say" title="22 years of relationships," scriptAccent="built one by one." background="lighttan">
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              quote: "Pam made the entire process feel completely effortless. Her knowledge of Marcus Pointe was remarkable — she knew every street, every builder, every detail. We couldn't have done it without her.",
              name: "The Reynolds Family",
              detail: "Bought in Marcus Pointe",
            },
            {
              quote: "We were relocating from Atlanta and had no idea where to start. Pam spent hours with us on the phone before we ever visited, and when we did come down she already knew exactly what we were looking for.",
              name: "Sarah & Michael T.",
              detail: "Relocated from Atlanta · Nature Trail",
            },
            {
              quote: "Pam sold our home in Nature Trail in under a week. Her pricing guidance was spot-on and she handled every detail with calm, professional care. I refer everyone I know to her.",
              name: "David L.",
              detail: "Sold in Nature Trail",
            },
          ].map(({ quote, name, detail }) => (
            <div key={name} className="bg-cream p-8 flex flex-col">
              <p className="font-display text-4xl text-warmbrown/30 leading-none mb-4">&ldquo;</p>
              <p className="text-charcoal/85 leading-relaxed flex-1">{quote}</p>
              <div className="mt-8 border-t border-warmbrown/20 pt-5">
                <p className="font-display text-lg text-warmbrown">{name}</p>
                <p className="text-[0.72rem] tracking-editorial uppercase text-charcoal/55 mt-1">{detail}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <a
            href={site.social.gbp}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-[0.76rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown pb-1 hover:text-nearblack hover:border-nearblack transition-colors duration-300"
          >
            Read Reviews on Google →
          </a>
        </div>
      </Section>

      {/* Soft CTA */}
      <CTASection
        eyebrow="When You're Ready"
        title="A friendly conversation"
        scriptAccent="goes a long way."
        body="Whether you're a year out or weeks away, I'd be glad to hear what you're imagining. There's no rush, no pressure, and no obligation — just a warm Pensacola voice on the other end of the line."
        primaryCta={{ label: "Reach Out", href: "/contact" }}
        secondaryCta={{ label: "About Pam", href: "/about" }}
      />
    </>
  );
}
