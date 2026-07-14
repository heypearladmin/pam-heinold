import { blogPosts } from "@/lib/blog-data";

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
}

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

export function extractFAQs(
  content: string[],
  postSlug: string,
  postTitle: string
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

export function getAllFAQs(): FAQItem[] {
  return blogPosts.flatMap((p) =>
    extractFAQs(p.content, p.slug, p.title)
  );
}

export function getFAQBySlug(faqSlug: string): FAQItem | undefined {
  return getAllFAQs().find((f) => f.slug === faqSlug);
}
