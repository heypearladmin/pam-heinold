"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ease-soft ${
        scrolled
          ? "bg-paper/95 backdrop-blur-sm border-b border-tan/40"
          : "bg-transparent"
      }`}
    >
      <nav
        className="max-w-editorial mx-auto px-6 lg:px-10 flex items-center justify-between h-20"
        aria-label="Primary"
      >
        <Link
          href="/"
          className="flex items-center gap-3 leading-tight"
          aria-label="Pam Heinold — LPT Realty home"
        >
          <Image
            src={site.logo.primary}
            alt={site.logo.alt}
            width={140}
            height={56}
            className="h-9 w-auto md:h-11"
            priority
          />
          <span className="hidden sm:flex flex-col border-l border-tan/60 pl-3 ml-1">
            <span className="font-display text-lg leading-none text-warmbrown">
              Pam Heinold
            </span>
            <span className="text-[0.58rem] tracking-editorial uppercase text-charcoal/65 mt-1">
              REALTOR® · 22 Years in Pensacola
            </span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-9">
          {site.nav.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="text-[0.78rem] tracking-wider uppercase text-charcoal hover:text-warmbrown transition-colors duration-300"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

        <Link
          href="/contact"
          className="hidden md:inline-block text-[0.78rem] tracking-wider uppercase border border-warmbrown/50 text-warmbrown px-5 py-2.5 hover:bg-warmbrown hover:text-paper hover:border-warmbrown transition-colors duration-300"
        >
          Work With Pam
        </Link>

        <button
          aria-label="Toggle menu"
          aria-expanded={open}
          className="md:hidden p-2 -mr-2 text-charcoal"
          onClick={() => setOpen((v) => !v)}
        >
          <span className="block w-6 h-px bg-charcoal mb-1.5" />
          <span className="block w-6 h-px bg-charcoal mb-1.5" />
          <span className="block w-4 h-px bg-charcoal" />
        </button>
      </nav>

      {open && (
        <div className="md:hidden border-t border-tan/40 bg-paper">
          <ul className="px-6 py-6 space-y-5">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="block text-sm tracking-wider uppercase text-charcoal"
                  onClick={() => setOpen(false)}
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/contact"
                className="inline-block text-[0.78rem] tracking-wider uppercase border border-warmbrown/50 text-warmbrown px-5 py-2.5"
                onClick={() => setOpen(false)}
              >
                Work With Pam
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
