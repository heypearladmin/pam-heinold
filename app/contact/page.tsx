import Image from "next/image";
import ContactForm from "@/components/ContactForm";
import { site } from "@/lib/site";

export const metadata = {
  title: "Contact Pam Heinold",
  description:
    "Begin a friendly conversation with Pam Heinold, REALTOR® with ERA American Real Estate. 22 years of warm, refined Pensacola real estate guidance.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  const { company, social, agent } = site;

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    name: `${agent.fullName} — ${company.name}`,
    image: agent.headshot,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Pensacola",
      addressRegion: "FL",
      addressCountry: "US",
    },
    telephone: company.phone,
    email: company.email,
    url: company.website,
    sameAs: [social.facebook, social.instagram, social.linkedin, social.youtube],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />

      <section className="pt-40 pb-20 md:pt-48 md:pb-28 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-12 md:gap-20 items-start">
          <div className="md:col-span-7">
            <p className="eyebrow text-charcoal/60 mb-6">Contact</p>
            <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight">
              Begin a friendly{" "}
              <span className="script text-warmbrown/80 text-6xl md:text-8xl">
                conversation.
              </span>
            </h1>
            <p className="mt-8 max-w-xl text-charcoal/85 text-lg leading-relaxed">
              Whether you&apos;re months away from buying, just thinking about
              Pensacola, or considering selling a home you love — I&apos;d be
              glad to hear what you&apos;re imagining. No pressure, no pitch.
            </p>

            <div className="mt-14 grid sm:grid-cols-2 gap-y-10 gap-x-12">
              <div>
                <p className="eyebrow text-warmbrown mb-3">Phone</p>
                <a
                  href={company.phoneHref}
                  className="font-display text-2xl text-warmbrown link-underline"
                >
                  {company.phone}
                </a>
              </div>
              <div>
                <p className="eyebrow text-warmbrown mb-3">Email</p>
                <a
                  href={company.emailHref}
                  className="font-display text-2xl text-warmbrown link-underline break-words"
                >
                  {company.email}
                </a>
              </div>
              <div>
                <p className="eyebrow text-warmbrown mb-3">Hyperlocal Area</p>
                <p className="font-display text-2xl text-warmbrown leading-snug">
                  {company.hyperlocalArea}
                </p>
                <p className="mt-1 text-sm text-charcoal/65">
                  {company.name} · {company.independenceLine}
                </p>
              </div>
              <div>
                <p className="eyebrow text-warmbrown mb-3">Website</p>
                <a
                  href={company.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-2xl text-warmbrown link-underline break-words"
                >
                  pamheinold.com
                </a>
              </div>
            </div>

            <div className="mt-16">
              <p className="eyebrow text-charcoal/60 mb-5">Connect</p>
              <ul className="flex flex-wrap gap-x-7 gap-y-3 text-[0.78rem] tracking-editorial uppercase">
                <li>
                  <a
                    href={social.instagram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-warmbrown transition-colors duration-300"
                  >
                    Instagram
                  </a>
                </li>
                <li>
                  <a
                    href={social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-warmbrown transition-colors duration-300"
                  >
                    Facebook
                  </a>
                </li>
                <li>
                  <a
                    href={social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-warmbrown transition-colors duration-300"
                  >
                    LinkedIn
                  </a>
                </li>
                <li>
                  <a
                    href={social.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-charcoal hover:text-warmbrown transition-colors duration-300"
                  >
                    YouTube
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden bg-lighttan/40">
              <Image
                src={agent.headshot}
                alt={agent.headshotAlt}
                fill
                priority
                sizes="(min-width: 768px) 40vw, 100vw"
                className="object-cover"
              />
            </div>
            <p className="mt-5 text-[0.72rem] tracking-editorial uppercase text-charcoal/60">
              Pamela Heinold · REALTOR® · ERA American Real Estate
            </p>
          </div>
        </div>
      </section>

      {/* Form */}
      <section className="py-20 md:py-28 bg-lighttan/50">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <p className="eyebrow text-warmbrown mb-5 text-center">Send a Note</p>
          <h2 className="font-display text-3xl md:text-5xl text-warmbrown leading-[1.12] tracking-tight text-center">
            A few details, in your{" "}
            <span className="script text-warmbrown/80 text-4xl md:text-6xl">
              own words.
            </span>
          </h2>
          <p className="mt-6 text-charcoal/80 leading-relaxed text-center max-w-xl mx-auto">
            Share what&apos;s on your mind. I read every message personally
            and respond within one business day.
          </p>

          <ContactForm />
        </div>
      </section>
    </>
  );
}
