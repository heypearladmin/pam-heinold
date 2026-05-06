import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import BlogCard from "@/components/BlogCard";
import { blogPosts, getPostBySlug, getRelatedPosts } from "@/lib/blog-data";
import { site } from "@/lib/site";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return blogPosts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return { title: "Note Not Found" };
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
  };
}

function ContentBlock({ block }: { block: string }) {
  if (block.includes("\n-") || block.startsWith("- ")) {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    return (
      <ul>
        {lines.map((line, i) => (
          <li key={i}>{line.replace(/^-+\s*/, "")}</li>
        ))}
      </ul>
    );
  }
  return <p>{block}</p>;
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const related = getRelatedPosts(post.slug, 3);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    author: {
      "@type": "Person",
      name: "Pamela Heinold",
      url: "https://pamheinold.com/about",
    },
    publisher: {
      "@type": "Organization",
      name: "ERA American Real Estate",
      url: "https://pamheinold.com",
    },
    mainEntityOfPage: `https://pamheinold.com/blog/${post.slug}`,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Title block */}
      <section className="pt-32 md:pt-40 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <Link
            href="/blog"
            className="inline-block text-[0.72rem] tracking-editorial uppercase text-charcoal/60 hover:text-warmbrown transition-colors duration-300"
          >
            ← Notes
          </Link>
        </div>

        <div className="mt-12 md:mt-16 max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-warmbrown mb-6">{post.category}</p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl text-warmbrown leading-[1.06] tracking-tight max-w-4xl">
            {post.title}
          </h1>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-xs tracking-editorial uppercase text-charcoal/60">
            <span>By Pam Heinold</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedAt}</span>
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
      </section>

      {/* Article body */}
      <article className="py-20 md:py-28 bg-paper">
        <div className="max-w-prose mx-auto px-6 lg:px-0 prose-editorial">
          {post.content.map((block, i) => (
            <ContentBlock key={i} block={block} />
          ))}
        </div>
      </article>

      {/* Meet Pam */}
      <section className="bg-lighttan/50 py-20 md:py-28">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 grid md:grid-cols-12 gap-10 md:gap-16 items-center">
          <div className="md:col-span-4">
            <div className="relative aspect-[4/5] overflow-hidden bg-lighttan/60">
              <Image
                src={site.agent.headshot}
                alt={site.agent.headshotAlt}
                fill
                sizes="(min-width: 768px) 30vw, 100vw"
                className="object-cover"
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

      {related.length > 0 && (
        <section className="py-20 md:py-28 bg-paper">
          <div className="max-w-editorial mx-auto px-6 lg:px-10">
            <p className="eyebrow text-charcoal/60 mb-10">More Notes</p>
            <div className="grid md:grid-cols-3 gap-x-8 gap-y-14">
              {related.map((p) => (
                <BlogCard key={p.slug} post={p} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
