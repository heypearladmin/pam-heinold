"use client";
import { useState } from "react";
import type { TOCItem } from "@/lib/blog-utils";

export default function TableOfContents({ items }: { items: TOCItem[] }) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <nav aria-label="Table of contents">
      {/* Mobile: collapsible */}
      <div className="lg:hidden border border-tan/60 bg-paper mb-8">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-5 py-4 text-left"
          aria-expanded={open}
          aria-controls="toc-list-mobile"
        >
          <span className="eyebrow text-charcoal/70 text-[0.68rem]">
            On This Page
          </span>
          <span className="text-charcoal/50 text-xs">{open ? "▲" : "▼"}</span>
        </button>
        {open && (
          <ul
            id="toc-list-mobile"
            className="px-5 pb-4 space-y-1.5 border-t border-tan/40"
          >
            {items.map((item) => (
              <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
                <a
                  href={`#${item.id}`}
                  onClick={() => setOpen(false)}
                  className="text-sm text-charcoal/70 hover:text-warmbrown transition-colors duration-200 block py-0.5 leading-snug"
                >
                  {item.text}
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Desktop: sticky sidebar */}
      <div className="hidden lg:block sticky top-32">
        <p className="eyebrow text-charcoal/55 text-[0.66rem] mb-4 pb-3 border-b border-tan/40">
          On This Page
        </p>
        <ul className="space-y-2">
          {items.map((item) => (
            <li key={item.id} className={item.level === 3 ? "pl-3" : ""}>
              <a
                href={`#${item.id}`}
                className="text-[0.81rem] text-charcoal/60 hover:text-warmbrown transition-colors duration-200 leading-snug block"
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
