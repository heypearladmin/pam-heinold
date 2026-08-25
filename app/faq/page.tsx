import Link from "next/link";
import CTASection from "@/components/CTASection";
import { getAllFAQs } from "@/lib/blog-utils";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "Frequently Asked Questions — Pensacola Real Estate",
  description:
    "Every question Pam Heinold has answered about buying, selling, and relocating in Pensacola, FL — organized by topic, from a 22-year local real estate authority.",
  alternates: { canonical: "/faq" },
};

export default function FAQIndexPage() {
  const faqs = getAllFAQs();

  const categories = Array.from(new Set(faqs.map((f) => f.postCategory))).sort();

  return (
    <>
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: site.company.website },
          { name: "FAQ", url: `${site.company.website}/faq` },
        ])}
      />
      <JsonLd
        schema={webPageSchema({
          name: "Frequently Asked Questions — Pam Heinold",
          url: `${site.company.website}/faq`,
          description:
            "Every question Pam Heinold has answered about buying, selling, and relocating in Pensacola, FL — organized by topic.",
        })}
      />

      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-charcoal/60 mb-6">FAQ</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight max-w-4xl">
            Every question I&apos;ve answered,{" "}
            <span className="script text-warmbrown/80 text-6xl md:text-8xl">
              in one place.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            {faqs.length}+ real questions from buyers, sellers, and
            relocating families — pulled straight from the conversations I
            have every week, organized by topic so you can find yours
            quickly.
          </p>
        </div>
      </section>

      <section className="pb-28 md:pb-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <div className="space-y-16 md:space-y-20">
            {categories.map((category) => {
              const items = faqs.filter((f) => f.postCategory === category);
              return (
                <div
                  key={category}
                  className="border-t border-tan/60 pt-12 md:pt-16"
                >
                  <h2 className="font-display text-2xl md:text-3xl text-warmbrown mb-8">
                    {category}
                  </h2>
                  <ul className="grid md:grid-cols-2 gap-x-8 gap-y-3">
                    {items.map((faq) => (
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
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Don't See Your Question?"
        title="There's no such thing as"
        scriptAccent="a silly question."
        body="If I haven't answered it yet, I'd genuinely love to. Reach out whenever it feels right — there's no pressure, and no commitment."
        primaryCta={{ label: "Ask Pam", href: "/contact?source=faq-index-end" }}
        secondaryCta={{ label: "Read The Blog", href: "/blog" }}
      />
    </>
  );
}
