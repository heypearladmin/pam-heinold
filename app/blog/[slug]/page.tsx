import React from "react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { blogPosts, getPostBySlug } from "@/lib/blog-data";
import {
  extractTOCItems,
  extractFAQs,
  stripFAQSection,
  headingToId,
} from "@/lib/blog-utils";
import { JsonLd } from "@/components/seo/JsonLd";
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqPageSchema,
} from "@/lib/seo/schema";
import { site } from "@/lib/site";
import QuickAnswer from "@/components/blog/QuickAnswer";
import TableOfContents from "@/components/blog/TableOfContents";
import FAQCard from "@/components/blog/FAQCard";
import RelatedArticles from "@/components/blog/RelatedArticles";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Not Found" };
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${post.slug}` },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.publishedAt,
      images: [{ url: post.image, alt: post.imageAlt }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  };
}

// ── Inline rendering ──────────────────────────────────────────────────────────

function renderInline(text: string): React.ReactNode {
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, i) =>
    part.startsWith("**") && part.endsWith("**") ? (
      <strong key={i}>{part.slice(2, -2)}</strong>
    ) : (
      part
    )
  );
}

function ContentBlock({ block }: { block: string }) {
  if (block.startsWith("## ")) {
    const text = block.slice(3);
    return <h2 id={headingToId(text)}>{text}</h2>;
  }
  if (block.startsWith("### ")) {
    const text = block.slice(4);
    return <h3 id={headingToId(text)}>{text}</h3>;
  }
  if (block.includes("\n-") || block.startsWith("- ")) {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    return (
      <ul>
        {lines.map((line, i) => (
          <li key={i}>{renderInline(line.replace(/^-+\s*/, ""))}</li>
        ))}
      </ul>
    );
  }
  return <p>{renderInline(block)}</p>;
}

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const pageUrl = `${site.company.website}/blog/${post.slug}`;
  const tocItems = extractTOCItems(post.content);
  const faqs = extractFAQs(post.content, post.slug, post.title);
  const mainContent = stripFAQSection(post.content);

  return (
    <>
      {/* ── Structured data ── */}
      <JsonLd
        schema={blogPostingSchema({
          title: post.title,
          description: post.excerpt,
          url: pageUrl,
          image: post.image,
          datePublished: post.publishedAt,
        })}
      />
      <JsonLd
        schema={breadcrumbSchema([
          { name: "Home", url: site.company.website },
          { name: "Notes", url: `${site.company.website}/blog` },
          { name: post.title, url: pageUrl },
        ])}
      />
      {faqs.length > 0 && (
        <JsonLd
          schema={faqPageSchema(
            faqs.map((f) => ({ question: f.question, answer: f.answer }))
          )}
        />
      )}

      {/* ── Hero ── */}
      <header className="pt-32 md:pt-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-2 text-[0.72rem] tracking-editorial uppercase text-charcoal/55">
              <li>
                <Link
                  href="/"
                  className="hover:text-warmbrown transition-colors duration-300"
                >
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link
                  href="/blog"
                  className="hover:text-warmbrown transition-colors duration-300"
                >
                  Notes
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-charcoal/40 truncate max-w-[200px]">
                {post.category}
              </li>
            </ol>
          </nav>
        </div>

        <div className="mt-10 md:mt-14 max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-warmbrown mb-5">{post.category}</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-warmbrown leading-[1.06] tracking-tight max-w-4xl">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs tracking-editorial uppercase text-charcoal/55">
            <span>By Pam Heinold</span>
            <span aria-hidden="true">·</span>
            <time dateTime={post.publishedAt}>{post.publishedAt}</time>
            <span aria-hidden="true">·</span>
            <span>{post.readTime}</span>
          </div>
        </div>

        <div className="mt-14 md:mt-20">
          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.imageAlt}
              fill
              priority
              sizes="100vw"
              className="object-cover"
            />
          </div>
        </div>
      </header>

      {/* ── Article body ── */}
      <div className="bg-paper py-16 md:py-24">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <div className="lg:grid lg:grid-cols-[220px_minmax(0,1fr)] lg:gap-16 lg:items-start">

            {/* TOC — handles mobile collapsible + desktop sticky internally */}
            <aside aria-label="Article navigation">
              <TableOfContents items={tocItems} />
            </aside>

            {/* Main content */}
            <div>
              <QuickAnswer text={post.excerpt} />

              <article className="prose-editorial" aria-label="Article content">
                {mainContent.map((block, i) => (
                  <ContentBlock key={i} block={block} />
                ))}
              </article>

              {faqs.length > 0 && (
                <section
                  className="mt-16 pt-12 border-t border-tan/50"
                  aria-labelledby="faq-heading"
                >
                  <p className="eyebrow text-charcoal/55 mb-2 text-[0.68rem]">
                    Common Questions
                  </p>
                  <h2
                    id="faq-heading"
                    className="font-display text-2xl md:text-3xl text-warmbrown mb-8 leading-tight tracking-tight"
                  >
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-3">
                    {faqs.map((faq) => (
                      <FAQCard key={faq.slug} faq={faq} />
                    ))}
                  </div>
                </section>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ── Meet Pam ── */}
      <section
        className="bg-lighttan/50 py-20 md:py-28"
        aria-label="About Pam Heinold"
      >
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-lighttan/60">
              <Image
                src={site.agent.headshot}
                alt={site.agent.headshotAlt}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
                loading="lazy"
              />
            </div>
          </div>
          <div className="md:col-span-8">
            <p className="eyebrow text-warmbrown mb-5">Meet Pam Heinold</p>
            <h2 className="font-display text-3xl md:text-5xl text-warmbrown leading-[1.12] tracking-tight">
              22 years guiding Pensacola{" "}
              <span className="script text-warmbrown/85 text-4xl md:text-6xl">
                buyers and sellers.
              </span>
            </h2>
            <p className="mt-6 text-charcoal/85 text-lg leading-relaxed max-w-xl">
              Pam works with luxury buyers, sellers, and relocation families
              across Pensacola — from the historic streets of East Hill to the
              gated calm of Marcus Pointe and the Gulf-front communities of
              Pensacola Beach and Perdido Key.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link
                href="/about"
                className="inline-block border border-warmbrown/40 text-warmbrown px-6 py-3 text-[0.76rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
              >
                About Pam
              </Link>
              <Link
                href="/contact"
                className="inline-block bg-warmbrown text-cream px-6 py-3 text-[0.76rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
              >
                Begin a Conversation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── Related articles ── */}
      <RelatedArticles post={post} />

      {/* ── Subtle CTA ── */}
      <section className="bg-paper py-14 border-t border-tan/40">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 text-center">
          <p className="eyebrow text-charcoal/50 mb-3">Need Guidance?</p>
          <p className="text-charcoal/65 leading-relaxed max-w-md mx-auto mb-6 text-[0.95rem]">
            This resource is part of Pam&apos;s ongoing effort to share honest,
            local knowledge. When you&apos;re ready to talk, she&apos;s always
            glad to listen.
          </p>
          <Link
            href="/contact"
            className="inline-block border border-warmbrown/40 text-warmbrown px-6 py-3 text-[0.76rem] tracking-wider uppercase hover:bg-warmbrown hover:text-cream transition-colors duration-300"
          >
            Begin a Quiet Conversation
          </Link>
        </div>
      </section>
    </>
  );
}
