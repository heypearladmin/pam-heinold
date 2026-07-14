import { blogPosts, type BlogPost } from "@/lib/blog-data";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface TOCItem {
  text: string;
  level: 2 | 3;
  id: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  slug: string;
  postSlug: string;
  postTitle: string;
  postCategory: string;
  lastUpdated: string;
}

// ── Utilities ─────────────────────────────────────────────────────────────────

export function headingToId(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function questionToSlug(question: string): string {
  return question
    .replace(/\*\*/g, "")
    .replace(/\?$/, "")
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .slice(0, 80);
}

/** Split prose into individual sentences. */
export function extractSentences(text: string): string[] {
  return text
    .split(/(?<=[.!?])\s+(?=[A-Z"'])/)
    .map((s) => s.trim())
    .filter((s) => s.length > 30);
}

/** First 1–2 sentences as a direct answer. */
export function extractQuickAnswer(answer: string): string {
  const sentences = extractSentences(answer);
  return sentences.slice(0, 2).join(" ");
}

/** Up to 5 key takeaways from the answer text. */
export function extractTakeaways(answer: string): string[] {
  return extractSentences(answer).slice(0, 5);
}

// ── TOC ───────────────────────────────────────────────────────────────────────

export function extractTOCItems(content: string[]): TOCItem[] {
  const items: TOCItem[] = [];
  for (const block of content) {
    if (block.startsWith("## Frequently Asked Questions")) break;
    if (block.startsWith("## ")) {
      const text = block.slice(3);
      items.push({ text, level: 2, id: headingToId(text) });
    } else if (block.startsWith("### ")) {
      const text = block.slice(4);
      items.push({ text, level: 3, id: headingToId(text) });
    }
  }
  return items;
}

// ── FAQ extraction ────────────────────────────────────────────────────────────

export function extractFAQs(
  content: string[],
  postSlug: string,
  postTitle: string,
  postCategory = "",
  lastUpdated = ""
): FAQItem[] {
  const items: FAQItem[] = [];
  let inFAQ = false;
  for (const block of content) {
    if (block.startsWith("## Frequently Asked Questions")) {
      inFAQ = true;
      continue;
    }
    if (!inFAQ) continue;
    const nlIdx = block.indexOf("\n");
    if (block.startsWith("**") && nlIdx !== -1) {
      const rawQ = block.slice(0, nlIdx).replace(/\*\*/g, "").trim();
      const answer = block.slice(nlIdx + 1).trim();
      items.push({
        question: rawQ,
        answer,
        slug: questionToSlug(rawQ),
        postSlug,
        postTitle,
        postCategory,
        lastUpdated,
      });
    }
  }
  return items;
}

export function stripFAQSection(content: string[]): string[] {
  const idx = content.findIndex((b) =>
    b.startsWith("## Frequently Asked Questions")
  );
  return idx === -1 ? content : content.slice(0, idx);
}

// ── Global FAQ registry ───────────────────────────────────────────────────────

export function getAllFAQs(): FAQItem[] {
  return blogPosts.flatMap((p) =>
    extractFAQs(p.content, p.slug, p.title, p.category, p.publishedAt)
  );
}

export function getFAQBySlug(faqSlug: string): FAQItem | undefined {
  return getAllFAQs().find((f) => f.slug === faqSlug);
}

/** Other FAQs from the same source post, excluding the current one. */
export function getRelatedFAQs(
  faqSlug: string,
  postSlug: string,
  count = 4
): FAQItem[] {
  return getAllFAQs()
    .filter((f) => f.postSlug === postSlug && f.slug !== faqSlug)
    .slice(0, count);
}

/** Blog posts in the same category, excluding the source post. */
export function getFAQRelatedPosts(
  postSlug: string,
  postCategory: string,
  count = 4
): BlogPost[] {
  const sameCategory = blogPosts.filter(
    (p) => p.slug !== postSlug && p.category === postCategory
  );
  const others = blogPosts.filter(
    (p) => p.slug !== postSlug && p.category !== postCategory
  );
  return [...sameCategory, ...others].slice(0, count);
}
