import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { getAllFAQs, getFAQBySlug } from "@/lib/blog-utils";
import { breadcrumbSchema } from "@/lib/seo/schema";
import { site } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllFAQs().map((f) => ({ slug: f.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);
  if (!faq) return { title: "Not Found" };
  const description = faq.answer.slice(0, 160);
  return {
    title: faq.question,
    description,
    alternates: { canonical: `/faq/${faq.slug}` },
    openGraph: {
      title: faq.question,
      description,
      type: "article",
    },
    twitter: {
      card: "summary",
      title: faq.question,
      description,
    },
  };
}

export default async function FAQPage({ params }: Props) {
  const { slug } = await params;
  const faq = getFAQBySlug(slug);
  if (!faq) notFound();

  const pageUrl = `${site.company.website}/faq/${faq.slug}`;

  const questionSchema = {
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

  return (
    <>
      <JsonLd schema={questionSchema} />
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

      <section className="pt-32 md:pt-40 pb-12 bg-paper">
        <div className="max-w-prose mx-auto px-6 lg:px-0">
          <Link
            href={`/blog/${faq.postSlug}`}
            className="inline-block text-[0.72rem] tracking-editorial uppercase text-charcoal/60 hover:text-warmbrown transition-colors duration-300"
          >
            ← {faq.postTitle}
          </Link>

          <div className="mt-12">
            <p className="eyebrow text-warmbrown mb-4">Frequently Asked Question</p>
            <h1 className="font-display text-3xl md:text-5xl text-warmbrown leading-[1.1] tracking-tight">
              {faq.question}
            </h1>
          </div>
        </div>
      </section>

      <article className="pb-24 md:pb-32 bg-paper">
        <div className="max-w-prose mx-auto px-6 lg:px-0 prose-editorial">
          <div className="border-l-4 border-warmbrown bg-lighttan/20 pl-6 pr-4 py-4 mb-12">
            <p className="text-charcoal leading-relaxed text-lg">{faq.answer}</p>
          </div>

          <div className="mt-10 pt-10 border-t border-tan/50">
            <p className="text-charcoal/60 text-sm mb-5">
              This answer is excerpted from a longer article:
            </p>
            <Link
              href={`/blog/${faq.postSlug}`}
              className="inline-block border border-warmbrown/40 text-warmbrown px-6 py-3 text-[0.76rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
            >
              Read the Full Article →
            </Link>
          </div>
        </div>
      </article>

      <section className="bg-lighttan/30 py-16">
        <div className="max-w-prose mx-auto px-6 lg:px-0 text-center">
          <p className="eyebrow text-charcoal/55 mb-4">Have More Questions?</p>
          <p className="text-charcoal/75 leading-relaxed mb-7 max-w-md mx-auto">
            Pam Heinold has been answering Pensacola real estate questions for
            22 years. Reach out directly — there&apos;s no pressure, just a
            friendly conversation.
          </p>
          <Link
            href="/contact"
            className="inline-block bg-warmbrown text-cream px-7 py-3.5 text-[0.78rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
          >
            Ask Pam Directly
          </Link>
        </div>
      </section>
    </>
  );
}
