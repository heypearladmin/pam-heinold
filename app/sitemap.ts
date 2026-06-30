import type { MetadataRoute } from "next";
import { site } from "@/lib/site";
import { blogPosts } from "@/lib/blog-data";
import { neighborhoods } from "@/lib/neighborhood-data";

const base = site.company.website.replace(/\/$/, "");
const now = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  type Entry = {
    path: string;
    priority: number;
    changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"];
  };

  const staticPages: Entry[] = [
    { path: "", priority: 1.0, changeFrequency: "weekly" },
    { path: "/neighborhoods", priority: 0.9, changeFrequency: "monthly" },
    { path: "/relocation", priority: 0.9, changeFrequency: "monthly" },
    { path: "/blog", priority: 0.85, changeFrequency: "weekly" },
    { path: "/about", priority: 0.8, changeFrequency: "monthly" },
    { path: "/contact", priority: 0.8, changeFrequency: "monthly" },
    { path: "/pensacola-real-estate", priority: 0.95, changeFrequency: "monthly" },
    { path: "/policies", priority: 0.3, changeFrequency: "yearly" },
    { path: "/terms", priority: 0.3, changeFrequency: "yearly" },
  ];

  const neighborhoodEntries: MetadataRoute.Sitemap = neighborhoods.map((n) => ({
    url: `${base}/neighborhoods/${n.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const blogEntries: MetadataRoute.Sitemap = blogPosts.map((p) => ({
    url: `${base}/blog/${p.slug}`,
    lastModified: new Date(p.publishedAt ?? now),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  const staticEntries: MetadataRoute.Sitemap = staticPages.map(
    ({ path, priority, changeFrequency }) => ({
      url: `${base}${path}`,
      lastModified: now,
      changeFrequency,
      priority,
    })
  );

  return [...staticEntries, ...neighborhoodEntries, ...blogEntries];
}
