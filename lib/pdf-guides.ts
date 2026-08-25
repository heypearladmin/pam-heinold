import fs from "node:fs";
import path from "node:path";

const PDF_DIR = path.join(process.cwd(), "public", "pdfs");

let cachedSlugs: Set<string> | null = null;

function getPdfSlugs(): Set<string> {
  if (cachedSlugs) return cachedSlugs;
  try {
    cachedSlugs = new Set(
      fs
        .readdirSync(PDF_DIR)
        .filter((f) => f.endsWith(".pdf"))
        .map((f) => f.replace(/\.pdf$/, ""))
    );
  } catch {
    cachedSlugs = new Set();
  }
  return cachedSlugs;
}

/** Whether a blog post has a matching downloadable PDF guide at /pdfs/{slug}.pdf. */
export function hasPdfGuide(slug: string): boolean {
  return getPdfSlugs().has(slug);
}
