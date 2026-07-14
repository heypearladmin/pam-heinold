import BlogCard from "@/components/BlogCard";
import { blogPosts, type BlogPost } from "@/lib/blog-data";

function getRelated(post: BlogPost, count = 4): BlogPost[] {
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== post.slug && p.category === post.category
  );
  const others = blogPosts.filter(
    (p) => p.slug !== post.slug && p.category !== post.category
  );
  return [...sameCategory, ...others].slice(0, count);
}

export default function RelatedArticles({ post }: { post: BlogPost }) {
  const related = getRelated(post);
  if (related.length === 0) return null;

  return (
    <section className="py-20 md:py-28 bg-paper border-t border-tan/40">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <p className="eyebrow text-charcoal/60 mb-10">Related Notes</p>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-14">
          {related.map((p) => (
            <BlogCard key={p.slug} post={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
