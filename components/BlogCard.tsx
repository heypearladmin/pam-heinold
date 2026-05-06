import Image from "next/image";
import Link from "next/link";
import { BlogPost } from "@/lib/blog-data";

interface BlogCardProps {
  post: BlogPost;
  layout?: "standard" | "feature";
}

export default function BlogCard({ post, layout = "standard" }: BlogCardProps) {
  const isFeature = layout === "feature";

  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`group block ${isFeature ? "md:col-span-2" : ""}`}
    >
      <div
        className={`relative overflow-hidden bg-lighttan/40 ${
          isFeature ? "aspect-[16/9]" : "aspect-[4/5]"
        }`}
      >
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes={
            isFeature
              ? "(min-width: 768px) 66vw, 100vw"
              : "(min-width: 768px) 33vw, 100vw"
          }
          className="object-cover transition-transform duration-700 ease-soft group-hover:scale-[1.03]"
        />
      </div>

      <div className={`mt-6 ${isFeature ? "md:max-w-2xl" : ""}`}>
        <p className="eyebrow text-warmbrown">{post.category}</p>
        <h3
          className={`font-display text-warmbrown mt-3 leading-[1.18] tracking-tight ${
            isFeature ? "text-3xl md:text-4xl" : "text-2xl"
          }`}
        >
          {post.title}
        </h3>
        <p className="mt-3 text-charcoal/80 leading-relaxed line-clamp-3">
          {post.excerpt}
        </p>
        <div className="mt-5 flex items-center gap-3 text-xs tracking-wider uppercase text-charcoal/55">
          <span>{post.publishedAt}</span>
          <span aria-hidden="true">·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}
