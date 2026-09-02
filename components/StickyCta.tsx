"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import GaLink from "@/components/GaLink";
import { journeyBySlug } from "@/lib/journey-links";
import { getNeighborhoodBySlug } from "@/lib/neighborhood-data";

const PILL_DISMISS_KEY = "sticky-cta-pill-dismissed";
const SCROLL_THRESHOLD = 500;
const EXCLUDED_PATHS = ["/contact", "/terms", "/policies"];

type Category = "buying" | "selling" | "relocation" | "neighborhood" | "general";

interface CtaContent {
  pill: string;
  subtitle: string;
  messageLabel: string;
  messageHref: string;
}

function neighborhoodSlug(pathname: string): string {
  return pathname.match(/^\/neighborhoods\/([^/]+)/)?.[1] ?? "";
}

function resolveContent(pathname: string): CtaContent | null {
  if (EXCLUDED_PATHS.some((p) => pathname === p)) return null;

  let category: Category = "general";
  let neighborhoodName: string | undefined;

  if (pathname.startsWith("/services/buying") || pathname.startsWith("/listings")) {
    category = "buying";
  } else if (pathname.startsWith("/services/selling")) {
    category = "selling";
  } else if (pathname.startsWith("/relocation")) {
    category = "relocation";
  } else {
    const slug = neighborhoodSlug(pathname);
    const blogMatch = pathname.match(/^\/blog\/([^/]+)/);
    if (slug) {
      const n = getNeighborhoodBySlug(slug);
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
        pill: "Ready to Find Your Home?",
        subtitle: "Looking for your next home? I'm happy to help.",
        messageLabel: "Send a Message",
        messageHref: "/contact?intent=buying&source=sticky-buying",
      };
    case "selling":
      return {
        pill: "Curious What Your Home Is Worth?",
        subtitle: "Wondering what your home is worth? Let's find out.",
        messageLabel: "Get My Home Value",
        messageHref: "/contact?intent=selling&source=sticky-selling",
      };
    case "relocation":
      return {
        pill: "Moving to Pensacola?",
        subtitle: "Thinking about a move to Pensacola? Let's talk it through.",
        messageLabel: "Send a Message",
        messageHref: "/contact?intent=relocation&source=sticky-relocation",
      };
    case "neighborhood":
      return {
        pill: `Want to Know More About ${neighborhoodName}?`,
        subtitle: `Have questions about ${neighborhoodName}? I'd love to share what I know.`,
        messageLabel: "Send a Message",
        messageHref: `/contact?intent=neighborhood&source=sticky-${neighborhoodSlug(pathname)}`,
      };
    default:
      return {
        pill: "Have Questions?",
        subtitle: "Call or send a message — whatever's easiest.",
        messageLabel: "Send a Message",
        messageHref: "/contact?source=sticky-general",
      };
  }
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.362 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.338 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MessageIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
    </svg>
  );
}

export default function StickyCta() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [pillDismissed, setPillDismissed] = useState(true); // hidden until sessionStorage checked, avoids hydration flash
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    setPillDismissed(sessionStorage.getItem(PILL_DISMISS_KEY) === "1");
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > SCROLL_THRESHOLD);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!expanded) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setExpanded(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [expanded]);

  // Collapse back to the pill state on navigation.
  useEffect(() => {
    setExpanded(false);
  }, [pathname]);

  const content = resolveContent(pathname);
  const visible = Boolean(content) && scrolled;

  if (!content) return null;

  const dismissPill = () => {
    sessionStorage.setItem(PILL_DISMISS_KEY, "1");
    setPillDismissed(true);
  };

  return (
    <div
      className={`fixed bottom-5 right-5 z-40 flex flex-col items-end gap-3 transition-all duration-300 ease-soft ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 translate-y-3 pointer-events-none"
      }`}
    >
      {expanded && visible && (
        <div className="w-[calc(100vw-2.5rem)] max-w-[300px] bg-paper rounded-2xl shadow-xl border border-tan/30 overflow-hidden">
          <div className="bg-nearblack text-cream px-5 py-4 relative">
            <button
              type="button"
              onClick={() => setExpanded(false)}
              aria-label="Close"
              className="absolute top-3 right-3 w-6 h-6 flex items-center justify-center text-cream/70 hover:text-cream transition-colors duration-300"
            >
              <span aria-hidden="true">×</span>
            </button>
            <p className="font-display text-lg leading-snug pr-6">Need anything?</p>
            <p className="text-cream/70 text-[0.82rem] mt-1.5 leading-relaxed pr-4">
              {content.subtitle}
            </p>
          </div>

          <div className="divide-y divide-tan/20">
            <GaLink
              href={site.company.phoneHref}
              event="phone_click"
              params={{ location: "sticky-cta" }}
              className="flex items-center gap-3.5 px-5 py-4 hover:bg-lighttan/30 transition-colors duration-300"
            >
              <span className="w-9 h-9 shrink-0 rounded-full bg-lighttan/60 text-warmbrown flex items-center justify-center">
                <PhoneIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-charcoal font-semibold text-[0.92rem]">
                  Call {site.agent.firstName}
                </span>
                <span className="block text-charcoal/55 text-[0.8rem] mt-0.5">
                  {site.company.phone}
                </span>
              </span>
            </GaLink>

            <Link
              href={content.messageHref}
              onClick={() => setExpanded(false)}
              className="flex items-center gap-3.5 px-5 py-4 hover:bg-lighttan/30 transition-colors duration-300"
            >
              <span className="w-9 h-9 shrink-0 rounded-full bg-lighttan/60 text-warmbrown flex items-center justify-center">
                <MessageIcon />
              </span>
              <span className="min-w-0">
                <span className="block text-charcoal font-semibold text-[0.92rem]">
                  {content.messageLabel}
                </span>
                <span className="block text-charcoal/55 text-[0.8rem] mt-0.5">
                  Get a reply within a business day
                </span>
              </span>
            </Link>
          </div>
        </div>
      )}

      <div className="flex items-center gap-3">
        {!expanded && !pillDismissed && (
          <div className="bg-paper border border-tan/40 rounded-full shadow-lg pl-4 pr-2 py-2 flex items-center gap-2">
            <span className="text-[0.8rem] text-charcoal">{content.pill}</span>
            <button
              type="button"
              onClick={dismissPill}
              aria-label="Dismiss"
              className="w-6 h-6 shrink-0 rounded-full flex items-center justify-center text-charcoal/40 hover:text-charcoal hover:bg-lighttan/50 transition-colors duration-300"
            >
              <span aria-hidden="true">×</span>
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={() => setExpanded((v) => !v)}
          aria-label={expanded ? "Close contact options" : "Open contact options"}
          aria-expanded={expanded}
          className="w-14 h-14 shrink-0 rounded-full bg-nearblack text-cream shadow-lg flex items-center justify-center hover:bg-warmbrown transition-colors duration-300"
        >
          {expanded ? (
            <span className="text-2xl leading-none" aria-hidden="true">×</span>
          ) : (
            <PhoneIcon />
          )}
        </button>
      </div>
    </div>
  );
}
