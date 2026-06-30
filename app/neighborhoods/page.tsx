import NeighborhoodCard from "@/components/NeighborhoodCard";
import CTASection from "@/components/CTASection";
import Section from "@/components/Section";
import { neighborhoods } from "@/lib/neighborhood-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { breadcrumbSchema, webPageSchema, faqPageSchema } from "@/lib/seo/schema";
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
      <JsonLd schema={webPageSchema({ name: "Pensacola Neighborhoods — A Hyperlocal Guide", url: `${site.company.website}/neighborhoods`, description: "An editorial directory of Pensacola's most distinct neighborhoods — Marcus Pointe, Nature Trail, East Hill, downtown, Pensacola Beach, and Perdido Key." })} />
      <JsonLd schema={faqPageSchema([
        { question: "What is the best neighborhood in Pensacola, FL?", answer: "The best Pensacola neighborhood depends on your lifestyle. Marcus Pointe and Nature Trail are top choices for families seeking gated communities with strong schools. East Hill is ideal for buyers who want historic charm and walkability. Pensacola Beach and Perdido Key are best for waterfront living." },
        { question: "What is Marcus Pointe like?", answer: "Marcus Pointe is a gated golf community in Pensacola with approximately 500 homes. It features wooded lots, custom construction, and a private golf course. It is popular with families and professionals who want privacy, green space, and easy access to Pensacola's northwest side." },
        { question: "What is Nature Trail Pensacola like?", answer: "Nature Trail is a master-planned gated community in northwest Pensacola with approximately 600 homes. It features resort-style amenities including a clubhouse, pool, fitness center, and miles of walking trails through protected wetlands. It is one of Pensacola's most popular family communities." },
        { question: "What is East Hill Pensacola known for?", answer: "East Hill is one of Pensacola's oldest and most beloved historic neighborhoods, known for its bungalows, mature oak canopy, walkable streets, and proximity to downtown. It attracts buyers who value character, community, and a central location." },
        { question: "Is Pensacola Beach worth buying in?", answer: "Pensacola Beach on Santa Rosa Island offers Gulf-front and Gulf-view properties with some of the whitest sand beaches in the country. It is a strong vacation rental market and appeals to buyers seeking a primary residence with direct beach access." },
      ])} />
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

      {/* FAQ */}
      <Section eyebrow="Neighborhood Questions" title="What buyers ask" scriptAccent="about Pensacola neighborhoods." background="lighttan">
        <dl className="max-w-3xl divide-y divide-warmbrown/15">
          {[
            { q: "What is the best neighborhood in Pensacola for families?", a: "Marcus Pointe and Nature Trail are Pensacola's most popular family neighborhoods — both gated communities with strong schools, parks, and quiet streets. East Hill is a great choice for families who want historic character and walkability closer to downtown." },
            { q: "What is Marcus Pointe like?", a: "Marcus Pointe is a gated golf community in northwest Pensacola with approximately 500 homes. It features wooded lots, custom construction, and a private golf course — popular with families and professionals who want privacy and green space." },
            { q: "What is Nature Trail Pensacola like?", a: "Nature Trail is a master-planned gated community with approximately 600 homes, resort-style amenities, a clubhouse, pool, fitness center, and miles of walking trails through protected wetlands. One of Pensacola's most desirable family communities." },
            { q: "What is East Hill Pensacola known for?", a: "East Hill is one of Pensacola's oldest and most beloved neighborhoods — known for bungalows, mature oaks, walkable streets, and proximity to downtown. It attracts buyers who value character, community, and a central location." },
            { q: "Is Pensacola Beach a good place to buy a home?", a: "Pensacola Beach on Santa Rosa Island offers Gulf-front and Gulf-view properties with some of the whitest sand beaches in the country. It is a strong vacation rental market and appeals to buyers seeking primary residences with direct beach access." },
          ].map(({ q, a }) => (
            <div key={q} className="py-7">
              <dt className="font-display text-xl text-warmbrown leading-snug">{q}</dt>
              <dd className="mt-3 text-charcoal/80 leading-relaxed">{a}</dd>
            </div>
          ))}
        </dl>
      </Section>

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
