import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import CTASection from "@/components/CTASection";
import NeighborhoodCard from "@/components/NeighborhoodCard";
import { neighborhoods, getNeighborhoodBySlug } from "@/lib/neighborhood-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { neighborhoodPageSchema, breadcrumbSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return neighborhoods.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) return { title: "Neighborhood Not Found" };
  return {
    title: `${n.name} — A Pensacola Neighborhood Guide`,
    description: n.shortDescription,
    alternates: { canonical: `/neighborhoods/${n.slug}` },
    openGraph: {
      title: `${n.name} — A Pensacola Neighborhood Guide`,
      description: n.shortDescription,
      images: [{ url: n.image, alt: n.imageAlt }],
    },
  };
}

export default async function NeighborhoodDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const n = getNeighborhoodBySlug(slug);
  if (!n) notFound();

  const others = neighborhoods.filter((x) => x.slug !== n.slug).slice(0, 3);

  const pageUrl = `${site.company.website}/neighborhoods/${n.slug}`;

  return (
    <>
      <JsonLd schema={neighborhoodPageSchema({ title: `${n.name} — A Pensacola Neighborhood Guide`, description: n.shortDescription, url: pageUrl, image: n.image })} />
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: site.company.website }, { name: "Neighborhoods", url: `${site.company.website}/neighborhoods` }, { name: n.name, url: pageUrl }])} />

      {/* Hero */}
      <section className="relative w-full min-h-[80vh] flex items-end overflow-hidden">
        <Image
          src={n.image}
          alt={n.imageAlt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-nearblack/15 via-nearblack/25 to-nearblack/75" />
        <div className="relative max-w-editorial mx-auto w-full px-6 lg:px-10 pb-16 md:pb-24">
          <Link
            href="/neighborhoods"
            className="inline-block text-[0.72rem] tracking-editorial uppercase text-cream/85 hover:text-tan transition-colors duration-300 mb-8"
          >
            ← All Neighborhoods
          </Link>
          <p className="eyebrow text-cream/85 mb-5">
            Pensacola Neighborhood · {n.lifestyleAngle}
          </p>
          <h1 className="font-display text-cream text-5xl md:text-7xl lg:text-[5.5rem] leading-[1.04] tracking-tight">
            {n.name}
          </h1>
          <p className="mt-6 max-w-2xl font-display italic text-2xl md:text-3xl text-cream/90 leading-snug">
            {n.tagline}
          </p>
        </div>
      </section>

      {/* Overview */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-4">
            <p className="eyebrow text-warmbrown mb-5">Overview</p>
            <p className="font-display text-2xl md:text-3xl text-warmbrown leading-[1.22] tracking-tight">
              {n.shortDescription}
            </p>
          </div>
          <div className="md:col-span-8 space-y-5 text-charcoal/85 leading-relaxed text-[1.0625rem]">
            <p>{n.overview}</p>
          </div>
        </div>
      </section>

      {/* Detail grid */}
      <section className="py-20 md:py-24 bg-lighttan/50">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-2 gap-x-14 gap-y-14">
          {[
            { label: "Lifestyle", body: n.lifestyle },
            { label: "Real Estate Style", body: n.realEstateStyle },
            { label: "Architecture", body: n.architecture },
            { label: "Walkability", body: n.walkability },
            { label: "Schools", body: n.schools },
            { label: "Community Vibe", body: n.communityVibe },
          ].map((item) => (
            <div key={item.label} className="border-t border-warmbrown/30 pt-7">
              <p className="eyebrow text-charcoal/60 mb-4">{item.label}</p>
              <p className="text-charcoal/85 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Why people move + attractions */}
      <section className="py-20 md:py-28 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-12 md:gap-20">
          <div className="md:col-span-7">
            <p className="eyebrow text-warmbrown mb-5">Why People Move Here</p>
            <h2 className="font-display text-3xl md:text-5xl text-warmbrown leading-[1.12] tracking-tight">
              The decision behind{" "}
              <span className="script text-warmbrown/80 text-4xl md:text-6xl">
                the address.
              </span>
            </h2>
            <p className="mt-7 text-charcoal/85 leading-relaxed text-[1.0625rem]">
              {n.whyPeopleMove}
            </p>
          </div>
          <div className="md:col-span-5">
            <p className="eyebrow text-charcoal/60 mb-5">Local Highlights</p>
            <ul className="space-y-3">
              {n.attractions.map((a, i) => (
                <li
                  key={i}
                  className="border-b border-tan/60 pb-3 text-charcoal/85"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow={`Considering ${n.name}?`}
        title={`Let's talk about ${n.name}`}
        scriptAccent="the way it deserves."
        body="Every neighborhood has nuances that don't show up in a listing photo or an online estimate. The conversation starts there."
        primaryCta={{ label: "Reach Out", href: "/contact" }}
        secondaryCta={{ label: "Other Neighborhoods", href: "/neighborhoods" }}
      />

      {others.length > 0 && (
        <section className="py-20 md:py-28 bg-paper">
          <div className="max-w-editorial mx-auto px-6 lg:px-10">
            <p className="eyebrow text-charcoal/60 mb-10">
              Other Pensacola Neighborhoods
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {others.map((o) => (
                <NeighborhoodCard key={o.slug} neighborhood={o} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
