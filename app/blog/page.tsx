import BlogCard from "@/components/BlogCard";
import CTASection from "@/components/CTASection";
import { blogPosts } from "@/lib/blog-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "Notes — Friendly Pensacola Real Estate Thoughts",
  description:
    "Market notes, neighborhood guides, and gentle relocation guidance from Pam Heinold — written the way she'd talk to a friend across the kitchen table.",
  alternates: { canonical: "/blog" },
};

export default function BlogIndexPage() {
  const [feature, ...rest] = blogPosts;

  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: site.company.website }, { name: "Notes", url: `${site.company.website}/blog` }])} />
      <JsonLd schema={webPageSchema({ name: "Pensacola Real Estate Notes — Pam Heinold", url: `${site.company.website}/blog`, description: "Friendly, honest thoughts on Pensacola real estate from Pam Heinold — 22-year local authority with LPT Realty." })} />
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-charcoal/60 mb-6">Notes</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight max-w-4xl">
            Friendly thoughts on Pensacola{" "}
            <span className="script text-warmbrown/80 text-6xl md:text-8xl">
              real estate.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            Market notes, neighborhood guides, and gentle relocation guidance —
            written the way I&apos;d talk to a friend across the kitchen
            table.
          </p>
        </div>
      </section>

      <section className="pb-20 md:pb-28 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <BlogCard post={feature} layout="feature" />
        </div>
      </section>

      <section className="pb-28 md:pb-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <div className="border-t border-tan/60 pt-16 md:pt-20">
            <p className="eyebrow text-charcoal/60 mb-10">More Notes</p>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
              {rest.map((post) => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Stay Close To The Work"
        title="Substance over noise,"
        scriptAccent="warmth over hype."
        body="When the timing is right, I'd love to hear what you're thinking about. There's no pressure in starting a quiet conversation."
        primaryCta={{ label: "Reach Out", href: "/contact" }}
        secondaryCta={{ label: "Explore Neighborhoods", href: "/neighborhoods" }}
      />
    </>
  );
}
