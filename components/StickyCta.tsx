"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import { journeyBySlug } from "@/lib/journey-links";
import { getNeighborhoodBySlug } from "@/lib/neighborhood-data";

const DISMISS_KEY = "sticky-cta-dismissed";
const SCROLL_THRESHOLD = 500;
const EXCLUDED_PATHS = ["/contact", "/terms", "/policies"];

type Category = "buying" | "selling" | "relocation" | "neighborhood" | "general";

interface CtaContent {
  eyebrow: string;
  label: string;
  href: string;
  isPhone?: boolean;
}

function resolveContent(pathname: string): CtaContent | null {
  if (EXCLUDED_PATHS.some((p) => pathname === p)) return null;

  let category: Category = "general";
  let neighborhoodName: string | undefined;

  if (pathname.startsWith("/services/buying")) {
    category = "buying";
  } else if (pathname.startsWith("/services/selling")) {
    category = "selling";
  } else if (pathname.startsWith("/relocation")) {
    category = "relocation";
  } else {
    const neighborhoodMatch = pathname.match(/^\/neighborhoods\/([^/]+)/);
    const blogMatch = pathname.match(/^\/blog\/([^/]+)/);
    if (neighborhoodMatch) {
      const n = getNeighborhoodBySlug(neighborhoodMatch[1]);
      if (n) {
        category = "neighborhood";
        neighborhoodName = n.name;
      }
    } else if (blogMatch) {
      const journey = journeyBySlug[blogMatch[1]];
      if (journey === "buying") category = "buying";
      else if (journey === "selling") category = "selling";
    }
  }

  switch (category) {
    case "buying":
      return {
        eyebrow: "Ready to Find Your Home?",
        label: "Talk to Pam",
        href: "/contact?intent=buying&source=sticky-buying",
      };
    case "selling":
      return {
        eyebrow: "Curious What Your Home Is Worth?",
        label: "Get My Home Value",
        href: "/contact?intent=selling&source=sticky-selling",
      };
    case "relocation":
      return {
        eyebrow: "Moving to Pensacola?",
        label: "Talk to Pam",
        href: "/contact?intent=relocation&source=sticky-relocation",
      };
    case "neighborhood":
      return {
        eyebrow: `Want to Know More About ${neighborhoodName}?`,
        label: "Talk to Pam",
        href: `/contact?intent=neighborhood&source=sticky-${neighborhoodMatchSlug(pathname)}`,
      };
    default:
      return {
        eyebrow: "Have Questions?",
        label: `Call ${site.agent.firstName}`,
        href: site.company.phoneHref,
        isPhone: true,
      };
  }
}

function neighborhoodMatchSlug(pathname: string): string {
  return pathname.match(/^\/neighborhoods\/([^/]+)/)?.[1] ?? "neighborhood";
}

export default function StickyCta() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [dismissed, setDismissed] = useState(true); // hidden until we've checked sessionStorage, avoids hydration flash

  useEffect(() => {
    setDismissed(sessionStorage.getItem(DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const content = resolveContent(pathname);
  const visible = Boolean(content) && scrolled && !dismissed;

  const dismiss = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setDismissed(true);
  };

  if (!content) return null;

  return (
    <>
      {/* Desktop: floating card, bottom-right */}
      <div
        className={`hidden md:block fixed bottom-6 right-6 z-40 transition-all duration-300 ease-soft ${
          visible
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 translate-y-3 pointer-events-none"
        }`}
        role="complementary"
        aria-label="Contact Pam"
      >
        <div className="relative w-[300px] bg-paper/95 backdrop-blur-sm border border-tan/40 shadow-lg p-5">
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="absolute top-2 right-2 w-6 h-6 flex items-center justify-center text-charcoal/40 hover:text-charcoal transition-colors duration-300"
          >
            <span aria-hidden="true">×</span>
          </button>
          <p className="eyebrow text-warmbrown mb-3 pr-4">{content.eyebrow}</p>
          <Link
            href={content.href}
            className="inline-block w-full text-center bg-warmbrown text-cream px-5 py-3 text-[0.74rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
          >
            {content.label}
          </Link>
        </div>
      </div>

      {/* Mobile: full-width bottom bar */}
      <div
        className={`md:hidden fixed inset-x-0 bottom-0 z-40 transition-transform duration-300 ease-soft ${
          visible ? "translate-y-0" : "translate-y-full"
        }`}
        style={{ paddingBottom: "env(safe-area-inset-bottom)" }}
        role="complementary"
        aria-label="Contact Pam"
      >
        <div className="bg-paper border-t border-tan/40 shadow-lg flex items-stretch">
          <Link
            href={content.href}
            className="flex-1 flex items-center justify-center gap-2 bg-warmbrown text-cream py-4 text-[0.76rem] tracking-wider uppercase"
          >
            {content.isPhone && <span aria-hidden="true">📞</span>}
            {content.label}
          </Link>
          <button
            type="button"
            onClick={dismiss}
            aria-label="Dismiss"
            className="w-12 flex items-center justify-center text-charcoal/50 border-l border-tan/40"
          >
            <span aria-hidden="true">×</span>
          </button>
        </div>
      </div>
    </>
  );
}
