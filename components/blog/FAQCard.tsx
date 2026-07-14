import Link from "next/link";
import type { FAQItem } from "@/lib/blog-utils";

export default function FAQCard({ faq }: { faq: FAQItem }) {
  return (
    <Link
      href={`/faq/${faq.slug}`}
      className="group flex items-start justify-between gap-4 border border-tan/50 bg-paper px-6 py-5 hover:border-warmbrown/50 transition-colors duration-300"
    >
      <p className="text-charcoal/80 leading-snug text-[0.94rem] group-hover:text-warmbrown transition-colors duration-300">
        {faq.question}
      </p>
      <span className="shrink-0 text-warmbrown/50 text-sm mt-0.5 group-hover:text-warmbrown transition-colors duration-300">
        →
      </span>
    </Link>
  );
}
