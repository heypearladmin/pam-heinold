import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import Section from "@/components/Section";
import CTASection from "@/components/CTASection";
import { JsonLd } from "@/components/seo/JsonLd";
import { serviceSchema, breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "Pensacola Relocation Guidance",
  description:
    "Friendly, patient relocation guidance for buyers moving to Pensacola, FL. 22 years of hyperlocal expertise, neighborhood matching, school guidance, and luxury market strategy from Pam Heinold.",
  alternates: { canonical: "/relocation" },
};

export default function RelocationPage() {
  return (
    <>
      <JsonLd schema={serviceSchema({ name: "Pensacola Relocation Guidance", url: `${site.company.website}/relocation`, description: "22 years guiding families and luxury buyers through Pensacola relocation. Hyperlocal neighborhood matching, school guidance, and Gulf Coast market expertise." })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: site.company.website }, { name: "Relocation", url: `${site.company.website}/relocation` }])} />
      <JsonLd schema={webPageSchema({ name: "Pensacola Relocation Guide — Pam Heinold", url: `${site.company.website}/relocation`, description: "22 years guiding families and luxury buyers through Pensacola relocation. Hyperlocal neighborhood matching, school guidance, and Gulf Coast market expertise." })} />
      <Hero
        eyebrow="Relocating to Pensacola"
        headline="The Gulf is patient."
        scriptAccent="So am I."
        subheadline="22 years guiding families and luxury buyers through one of the warmest cities on the Gulf Coast. A friendly, thoughtful approach to making Pensacola feel like home."
        image="/images/relocation-hero.jpg"
        imageAlt="Pensacola Bay at golden hour with historic downtown skyline"
        primaryCta={{ label: "Begin a Conversation", href: "/contact" }}
        secondaryCta={{ label: "About Pam", href: "/about" }}
        height="standard"
      />

      <Section
        eyebrow="Moving to Pensacola"
        title="A city that welcomes you"
        scriptAccent="quietly, then completely."
        intro="Pensacola has a way of welcoming people. After 22 years guiding relocation buyers through this market, I've seen families arrive a little uncertain and settle in months later wondering why they didn't come sooner."
      >
        <div className="grid md:grid-cols-12 gap-12 items-start">
          <div className="md:col-span-7 space-y-5 text-charcoal/85 leading-relaxed text-[1.0625rem]">
            <p>
              The Gulf is part of it. The cost of living is part of it. The
              strong sense of community, the schools, the historic charm, and
              the everyday warmth of the people are part of it too.
            </p>
            <p>
              But the practical side of moving here matters just as much —
              and that&apos;s where good local guidance makes a real
              difference.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-lighttan/40">
              <Image
                src="/images/relocation-moving.jpg"
                alt="Welcoming Pensacola neighborhood street with mature oaks"
                fill
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Understanding Pensacola"
        title="One city,"
        scriptAccent="six very different lives."
        intro="Where you live in Pensacola changes the rhythm of your day. We talk through the neighborhoods carefully, matching the life you want to the place that will hold it."
        background="lighttan"
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              title: "By Lifestyle",
              body: "Walkability, the Gulf, gated calm, historic charm — every neighborhood delivers something different.",
            },
            {
              title: "By Schools",
              body: "Public, private, and faith-based — Pensacola has strong options across the city. We talk through each.",
            },
            {
              title: "By Architecture",
              body: "From historic East Hill to contemporary Nature Trail to coastal Pensacola Beach — the home itself signals the life.",
            },
            {
              title: "By Commute",
              body: "Pensacola feels small, but the daily drive matters. We map your real day before talking about homes.",
            },
            {
              title: "By Long-Term Value",
              body: "Different neighborhoods appreciate on different curves. Local context turns a guess into a strategy.",
            },
            {
              title: "By Pace",
              body: "Some Pensacola streets are central and active. Others are quiet by design. Both are right — what matters is the match.",
            },
          ].map((item) => (
            <div key={item.title} className="border-t border-warmbrown/30 pt-6">
              <h3 className="font-display text-2xl text-warmbrown leading-snug">
                {item.title}
              </h3>
              <p className="mt-3 text-charcoal/80 leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="Lifestyle Considerations"
        title="The smallest details"
        scriptAccent="decide the right neighborhood."
        intro="Coffee shops you can walk to. The morning light through the kitchen window. Whether the children can ride bikes safely. These are the things that decide whether a place feels like home."
      >
        <div className="grid md:grid-cols-2 gap-x-12 gap-y-10 text-charcoal/85">
          {[
            "Daily routines and walkability",
            "Outdoor access — Gulf, parks, trails",
            "Schools and faith-based community",
            "Historic charm vs. modern construction",
            "Family rhythms and weekend life",
            "Home-office and work-from-home flow",
            "Long-term plans and life stage",
            "Architectural taste and design preferences",
          ].map((item, i) => (
            <div key={i} className="flex items-start gap-5">
              <span className="font-display text-3xl text-warmbrown leading-none">
                {String(i + 1).padStart(2, "0")}
              </span>
              <p className="leading-relaxed pt-1">{item}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section
        eyebrow="A Note On Schools"
        title="School choice often shapes"
        scriptAccent="where families land."
        background="paper"
      >
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-5 text-charcoal/85 leading-relaxed text-[1.0625rem]">
            <p>
              Pensacola has strong public school options across both Escambia
              and Santa Rosa counties, plus a thoughtful set of private and
              faith-based schools that many families prioritize.
            </p>
            <p>
              School choice often shapes where families ultimately land — and
              I&apos;m happy to introduce you to administrators, parents, and
              other families when you want to dig in.
            </p>
          </div>
          <div className="space-y-5 text-charcoal/85 leading-relaxed text-[1.0625rem]">
            <p>
              We&apos;ll talk through which neighborhoods feed which schools,
              what the day-to-day rhythm looks like for each, and how that
              fits the life you want for your family.
            </p>
            <p>
              No rush. No pressure. Just the kind of careful guidance that a
              decision this important deserves.
            </p>
          </div>
        </div>
      </Section>

      <Section
        eyebrow="Why Local Guidance Matters"
        title="A relocation move isn't a search."
        scriptAccent="It's a translation."
        background="lighttan"
      >
        <div className="grid md:grid-cols-12 gap-10 md:gap-16">
          <div className="md:col-span-5">
            <p className="font-display text-3xl md:text-4xl text-warmbrown leading-[1.18] tracking-tight italic">
              &ldquo;Let&apos;s find the place that{" "}
              <span className="script text-warmbrown/80 not-italic text-4xl md:text-5xl">
                feels like home.
              </span>
              &rdquo;
            </p>
          </div>
          <div className="md:col-span-7 space-y-5 text-charcoal/85 leading-relaxed text-[1.0625rem]">
            <p>
              Online tools can tell you what a home cost. They can&apos;t
              tell you why it matters that the lot backs to a creek, or that
              the school just hired a wonderful new principal, or that the
              corridor a few streets over is about to redevelop.
            </p>
            <p>
              That&apos;s the work of an actual local. And when you&apos;re
              moving across the country, that translation is worth more than
              anything else in the process.
            </p>
            <Link
              href="/contact"
              className="inline-block mt-4 text-[0.78rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown pb-1 hover:text-nearblack hover:border-nearblack transition-colors duration-300"
            >
              Begin a Relocation Conversation →
            </Link>
          </div>
        </div>
      </Section>

      <CTASection
        eyebrow="Begin a Friendly Conversation"
        title="The slower the start,"
        scriptAccent="the better the move."
        body="Whether you're a year out or weeks away, a quiet conversation now will save months later. I'd love to hear what you're imagining."
        primaryCta={{ label: "Reach Out", href: "/contact" }}
        secondaryCta={{ label: "Explore Neighborhoods", href: "/neighborhoods" }}
      />
    </>
  );
}
