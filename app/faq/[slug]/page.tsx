import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  getAllFAQs,
  getFAQBySlug,
  getRelatedFAQs,
  getFAQRelatedPosts,
  extractQuickAnswer,
  extractTakeaways,
} from "@/lib/blog-utils";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";
import BlogCard from "@/components/BlogCard";

interface Props {
  params: Promise<{ slug: string }>;
}

// ── Static sources by category ────────────────────────────────────────────────

const SOURCES: Record<string, { label: string; href: string }[]> = {
  "Buyer Guide": [
    {
      label: "Consumer Financial Protection Bureau — Mortgages",
      href: "https://www.consumerfinance.gov/owning-a-home/",
    },
    {
      label: "FEMA Flood Map Service Center",
      href: "https://msc.fema.gov/portal/home",
    },
    {
      label: "Escambia County Property Appraiser",
      href: "https://www.escpa.org/",
    },
    {
      label: "Florida Department of Business & Professional Regulation",
      href: "https://www.myfloridalicense.com/DBPR/real-estate-commission/",
    },
  ],
  "Seller Strategy": [
    {
      label: "Florida Realtors",
      href: "https://www.floridarealtors.org/",
    },
    {
      label: "National Association of Realtors",
      href: "https://www.nar.realtor/",
    },
    {
      label: "Escambia County Property Appraiser",
      href: "https://www.escpa.org/",
    },
  ],
  "Hyperlocal": [
    {
      label: "City of Pensacola",
      href: "https://www.cityofpensacola.com/",
    },
    {
      label: "Escambia County Property Appraiser",
      href: "https://www.escpa.org/",
    },
    {
      label: "Pensacola Association of Realtors",
      href: "https://www.pensacolarealtors.com/",
    },
  ],
  "Neighborhood Guide": [
    {
      label: "City of Pensacola",
      href: "https://www.cityofpensacola.com/",
    },
    {
      label: "Escambia County Property Appraiser",
      href: "https://www.escpa.org/",
    },
    {
      label: "Walk Score — Pensacola",
      href: "https://www.walkscore.com/FL/Pensacola",
    },
  ],
  "Market Notes": [
    {
      label: "Florida Realtors",
      href: "https://www.floridarealtors.org/",
    },
    {
      label: "National Association of Realtors",
      href: "https://www.nar.realtor/",
    },
    {
      label: "Pensacola Association of Realtors",
      href: "https://www.pensacolarealtors.com/",
    },
  ],
  Relocation: [
    {
      label: "City of Pensacola",
      href: "https://www.cityofpensacola.com/",
    },
    {
      label: "Escambia County School District",
      href: "https://www.escambiaschools.org/",
    },
    {
      label: "Visit Pensacola",
      href: "https://www.visitpensacola.com/",
    },
  ],
  Waterfront: [
    {
      label: "FEMA Flood Map Service Center",
      href: "https://msc.fema.gov/portal/home",
    },
    {
      label: "Florida Division of Emergency Management",
      href: "https://www.floridadisaster.org/",
    },
    {
      label: "Escambia County Property Appraiser",
      href: "https://www.escpa.org/",
    },
  ],
  Lifestyle: [
    {
      label: "Visit Pensacola",
      href: "https://www.visitpensacola.com/",
    },
    {
      label: "City of Pensacola",
      href: "https://www.cityofpensacola.com/",
    },
    {
      label: "Pensacola Chamber of Commerce",
      href: "https://www.pensacolachamber.com/",
    },
  ],
};

const DEFAULT_SOURCES = [
  {
    label: "Florida Realtors",
    href: "https://www.floridarealtors.org/",
  },
  {
    label: "Escambia County Property Appraiser",
    href: "https://www.escpa.org/",
  },
  {
    label: "National Association of Realtors",
    href: "https://www.nar.realtor/",
  },
];

// ── Route generation ──────────────────────────────────────────────────────────

export async function generateStaticParams() {
  return getAllFAQs().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);
  if (!faq) return { title: "Not Found" };
  const description = extractQuickAnswer(faq.answer) || faq.answer.slice(0, 160);
  return {
    title: `${faq.question} — Pam Heinold`,
    description,
    alternates: { canonical: `/faq/${faq.slug}` },
    openGraph: {
      title: faq.question,
      description,
      type: "article",
      publishedTime: faq.lastUpdated,
    },
    twitter: {
      card: "summary",
      title: faq.question,
      description,
    },
  };
}

// ── Page ──────────────────────────────────────────────────────────────────────

export default async function FAQPage({ params }: Props) {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);
  if (!faq) notFound();

  const pageUrl = `${site.company.website}/faq/${faq.slug}`;
  const quickAnswer = extractQuickAnswer(faq.answer);
  const takeaways = extractTakeaways(faq.answer);
  const relatedFAQs = getRelatedFAQs(faq.slug, faq.postSlug);
  const relatedPosts = getFAQRelatedPosts(faq.postSlug, faq.postCategory);
  const sources = SOURCES[faq.postCategory] ?? DEFAULT_SOURCES;

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: faq.answer,
        },
      },
    ],
  };

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: faq.question,
    description: quickAnswer,
    url: pageUrl,
    datePublished: faq.lastUpdated,
    dateModified: faq.lastUpdated,
    author: { "@id": `${site.company.website}/#person` },
    publisher: { "@id": `${site.company.website}/#agent` },
    mainEntityOfPage: { "@type": "WebPage", "@id": pageUrl },
  };

  return (
    <>
      {/* ── Structured data ── */}
      <JsonLd schema={faqSchema} />
      <JsonLd schema={articleSchema} />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: site.company.website },
          { name: "Notes", url: `${site.company.website}/blog` },
          {
            name: faq.postTitle,
            url: `${site.company.website}/blog/${faq.postSlug}`,
          },
          { name: faq.question, url: pageUrl },
        ])}
      />

      {/* ── Hero ─────────────────────────────────────────────────────────── */}
      <header className="pt-32 md:pt-40 pb-14 md:pb-20 bg-paper border-b border-tan/40">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">

          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb">
            <ol className="flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.72rem] tracking-editorial uppercase text-charcoal/50">
              <li>
                <Link href="/" className="hover:text-warmbrown transition-colors duration-300">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="hover:text-warmbrown transition-colors duration-300">
                  Notes
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href={`/blog/${faq.postSlug}`}
                  className="hover:text-warmbrown transition-colors duration-300 truncate max-w-[160px]"
                >
                  {faq.postTitle}
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-charcoal/35">FAQ</li>
            </ol>
          </nav>

          {/* Title block */}
          <div className="mt-10 max-w-4xl">
            <p className="eyebrow text-warmbrown mb-5">Frequently Asked Question</p>
            <h1 className="font-display text-3xl md:text-5xl lg:text-6xl text-warmbrown leading-[1.08] tracking-tight">
              {faq.question}
            </h1>

            {/* Meta */}
            <div className="mt-7 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-xs tracking-editorial uppercase text-charcoal/50">
              <span>By Pam Heinold</span>
              <span aria-hidden="true">·</span>
              <span>{faq.postCategory}</span>
              <span aria-hidden="true">·</span>
              <span>
                Last Updated:{" "}
                <time dateTime={faq.lastUpdated}>{faq.lastUpdated}</time>
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* ── Main content ─────────────────────────────────────────────────── */}
      <div className="bg-paper py-14 md:py-20">
        <div className="max-w-prose mx-auto px-6 lg:px-0">

          {/* Quick Answer */}
          <div
            id="quick-answer"
            className="border-l-4 border-warmbrown bg-lighttan/25 px-6 py-5 mb-10"
            aria-label="Quick answer"
          >
            <p className="eyebrow text-warmbrown mb-2 text-[0.66rem]">
              Quick Answer
            </p>
            <p className="text-charcoal leading-relaxed text-[1.05rem]">
              {quickAnswer || faq.answer}
            </p>
          </div>

          {/* Key Takeaways */}
          {takeaways.length > 0 && (
            <section aria-labelledby="takeaways-heading" className="mb-12">
              <h2
                id="takeaways-heading"
                className="font-display text-xl md:text-2xl text-warmbrown mb-5 tracking-tight leading-tight"
              >
                Key Takeaways
              </h2>
              <ul className="space-y-3" role="list">
                {takeaways.map((point, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span
                      className="mt-0.5 shrink-0 w-5 h-5 flex items-center justify-center rounded-full bg-warmbrown/10 text-warmbrown text-xs font-bold"
                      aria-hidden="true"
                    >
                      ✓
                    </span>
                    <span className="text-charcoal/85 leading-relaxed text-[0.95rem]">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Expanded Answer */}
          <article
            className="prose-editorial"
            aria-labelledby="full-answer-heading"
          >
            <h2
              id="full-answer-heading"
              className="font-display text-xl md:text-2xl text-warmbrown mb-5 tracking-tight leading-tight"
            >
              The Full Answer
            </h2>
            <p className="text-charcoal/85 leading-relaxed text-[1.02rem]">
              {faq.answer}
            </p>

            {/* Source article link */}
            <div className="mt-10 pt-8 border-t border-tan/50">
              <p className="text-charcoal/60 text-sm mb-4 tracking-wide">
                This answer is part of a longer article by Pam Heinold:
              </p>
              <Link
                href={`/blog/${faq.postSlug}`}
                className="inline-flex items-center gap-2 border border-warmbrown/40 text-warmbrown px-5 py-2.5 text-[0.76rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
              >
                Read the Full Article
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        </div>
      </div>

      {/* ── Related Questions ─────────────────────────────────────────────── */}
      {relatedFAQs.length > 0 && (
        <section
          className="bg-lighttan/20 py-16 md:py-20 border-t border-tan/40"
          aria-labelledby="related-q-heading"
        >
          <div className="max-w-editorial mx-auto px-6 lg:px-10">
            <p className="eyebrow text-charcoal/55 mb-2 text-[0.68rem]">
              From the Same Article
            </p>
            <h2
              id="related-q-heading"
              className="font-display text-2xl md:text-3xl text-warmbrown mb-10 tracking-tight leading-tight"
            >
              Related Questions
            </h2>
            <div className="grid md:grid-cols-2 gap-3">
              {relatedFAQs.map((f) => (
                <Link
                  key={f.slug}
                  href={`/faq/${f.slug}`}
                  className="group flex items-start justify-between gap-4 bg-paper border border-tan/50 px-6 py-5 hover:border-warmbrown/50 transition-colors duration-300"
                >
                  <p className="text-charcoal/80 leading-snug text-[0.93rem] group-hover:text-warmbrown transition-colors duration-300">
                    {f.question}
                  </p>
                  <span
                    className="shrink-0 text-warmbrown/45 text-sm mt-0.5 group-hover:text-warmbrown transition-colors duration-300"
                    aria-hidden="true"
                  >
                    →
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Sources ───────────────────────────────────────────────────────── */}
      <section
        className="bg-paper py-14 border-t border-tan/40"
        aria-labelledby="sources-heading"
      >
        <div className="max-w-prose mx-auto px-6 lg:px-0">
          <h2
            id="sources-heading"
            className="font-display text-xl text-warmbrown mb-6 tracking-tight"
          >
            Sources
          </h2>
          <ul className="space-y-3">
            {sources.map((src) => (
              <li key={src.href} className="flex items-start gap-2.5">
                <span
                  className="mt-1 shrink-0 w-1.5 h-1.5 rounded-full bg-warmbrown/50"
                  aria-hidden="true"
                />
                <a
                  href={src.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.9rem] text-charcoal/75 hover:text-warmbrown underline underline-offset-4 decoration-warmbrown/30 hover:decoration-warmbrown transition-colors duration-300 leading-relaxed"
                >
                  {src.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── Related Articles ──────────────────────────────────────────────── */}
      {relatedPosts.length > 0 && (
        <section
          className="bg-paper py-16 md:py-24 border-t border-tan/40"
          aria-labelledby="related-articles-heading"
        >
          <div className="max-w-editorial mx-auto px-6 lg:px-10">
            <p className="eyebrow text-charcoal/55 mb-2 text-[0.68rem]">
              Keep Reading
            </p>
            <h2
              id="related-articles-heading"
              className="font-display text-2xl md:text-3xl text-warmbrown mb-10 tracking-tight leading-tight"
            >
              Related Notes
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
              {relatedPosts.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── Subtle CTA ────────────────────────────────────────────────────── */}
      <section className="bg-lighttan/30 py-16 border-t border-tan/40">
        <div className="max-w-prose mx-auto px-6 lg:px-0 text-center">
          <p className="eyebrow text-charcoal/55 mb-3">Have More Questions?</p>
          <p className="font-display text-2xl md:text-3xl text-warmbrown leading-tight tracking-tight mb-3">
            Ask Pam directly.
          </p>
          <p className="text-charcoal/65 leading-relaxed mb-8 max-w-sm mx-auto text-[0.95rem]">
            22 years of Pensacola real estate knowledge, shared freely. No
            pressure — just a friendly conversation.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-warmbrown/40 text-warmbrown px-6 py-3 text-[0.76rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
          >
            Begin a Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
