import NeighborhoodCard from "@/components/NeighborhoodCard";
import CTASection from "@/components/CTASection";
import { neighborhoods } from "@/lib/neighborhood-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

export const metadata = {
  title: "Pensacola Neighborhoods — A Hyperlocal Guide",
  description:
    "An editorial directory of Pensacola's most distinct neighborhoods — Marcus Pointe, Nature Trail, East Hill, downtown, Pensacola Beach, and Perdido Key — by lifestyle, architecture, and long-term value.",
  alternates: { canonical: "/neighborhoods" },
};

export default function NeighborhoodsIndexPage() {
  return (
    <>
      <JsonLd schema={breadcrumbSchema([{ name: "Home", url: site.company.website }, { name: "Neighborhoods", url: `${site.company.website}/neighborhoods` }])} />
      <section className="pt-40 pb-16 md:pt-48 md:pb-20 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-charcoal/60 mb-6">Pensacola Neighborhoods</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight max-w-4xl">
            Six places that show how layered Pensacola{" "}
            <span className="script text-warmbrown/80 text-6xl md:text-8xl">
              really is.
            </span>
          </h1>
          <p className="mt-8 max-w-2xl text-charcoal/85 text-lg leading-relaxed">
            From the historic streets of East Hill to the gated calm of Marcus
            Pointe and the quiet beauty of the Gulf — six neighborhoods each
            with their own pace, architecture, and long-term story.
          </p>
        </div>
      </section>

      <section className="pb-28 md:pb-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {neighborhoods.map((n) => (
              <NeighborhoodCard key={n.slug} neighborhood={n} />
            ))}
          </div>
        </div>
      </section>

      <CTASection
        eyebrow="Don't See Yours?"
        title="Pensacola is layered. I can help you find"
        scriptAccent="the layer that fits."
        body="If you have a neighborhood in mind that isn't listed — or no idea where to start — that's the conversation I love to have first."
        primaryCta={{ label: "Talk With Pam", href: "/contact" }}
        secondaryCta={{ label: "Relocation Guidance", href: "/relocation" }}
      />
    </>
  );
}
