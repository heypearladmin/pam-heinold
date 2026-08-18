"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/site";
import type { NavItem } from "@/lib/site";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!activeMenu) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveMenu(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeMenu]);

  const openMenu = (label: string) => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setActiveMenu(label);
  };

  const scheduleClose = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setActiveMenu(null), 150);
  };

  const closeAll = () => {
    setOpen(false);
    setMobileServicesOpen(false);
  };

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
          {(site.nav as NavItem[]).map((item) =>
            item.menu ? (
              <li
                key={item.href}
                className="relative"
                onMouseEnter={() => openMenu(item.label)}
                onMouseLeave={scheduleClose}
              >
                <Link
                  href={item.href}
                  className="inline-flex items-center gap-1.5 text-[0.78rem] tracking-wider uppercase text-charcoal hover:text-warmbrown transition-colors duration-300"
                  aria-haspopup="true"
                  aria-expanded={activeMenu === item.label}
                  onFocus={() => openMenu(item.label)}
                >
                  {item.label}
                  <span
                    aria-hidden="true"
                    className={`text-[0.6rem] transition-transform duration-300 ease-soft ${
                      activeMenu === item.label ? "-rotate-180" : ""
                    }`}
                  >
                    ▾
                  </span>
                </Link>

                <div
                  className={`absolute left-1/2 -translate-x-1/2 top-full pt-4 transition-all duration-200 ease-soft ${
                    activeMenu === item.label
                      ? "opacity-100 translate-y-0 pointer-events-auto"
                      : "opacity-0 -translate-y-1 pointer-events-none"
                  }`}
                >
                  <div className="w-[560px] bg-paper border border-tan/40 shadow-lg p-8 grid grid-cols-2 gap-10">
                    {item.menu.map((col) => (
                      <div key={col.heading}>
                        <Link
                          href={col.href}
                          className="eyebrow text-warmbrown mb-4 block hover:text-nearblack transition-colors duration-300"
                          onClick={() => setActiveMenu(null)}
                        >
                          {col.heading}
                        </Link>
                        <ul className="space-y-2.5">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="text-[0.82rem] text-charcoal/80 hover:text-warmbrown transition-colors duration-300"
                                onClick={() => setActiveMenu(null)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                        <Link
                          href={col.href}
                          className="mt-4 inline-block text-[0.7rem] tracking-wider uppercase text-warmbrown border-b border-warmbrown/50 pb-0.5 hover:text-nearblack hover:border-nearblack transition-colors duration-300"
                          onClick={() => setActiveMenu(null)}
                        >
                          {col.viewAllLabel} →
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-[0.78rem] tracking-wider uppercase text-charcoal hover:text-warmbrown transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            )
          )}
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
        <div className="md:hidden border-t border-tan/40 bg-paper max-h-[calc(100vh-5rem)] overflow-y-auto">
          <ul className="px-6 py-6 space-y-5">
            {(site.nav as NavItem[]).map((item) =>
              item.menu ? (
                <li key={item.href}>
                  <button
                    className="w-full flex items-center justify-between text-sm tracking-wider uppercase text-charcoal"
                    aria-expanded={mobileServicesOpen}
                    onClick={() => setMobileServicesOpen((v) => !v)}
                  >
                    {item.label}
                    <span
                      aria-hidden="true"
                      className={`text-xs transition-transform duration-300 ease-soft ${
                        mobileServicesOpen ? "-rotate-180" : ""
                      }`}
                    >
                      ▾
                    </span>
                  </button>

                  {mobileServicesOpen && (
                    <div className="mt-4 space-y-6 border-l border-tan/50 pl-4">
                      <Link
                        href={item.href}
                        className="block text-xs tracking-wider uppercase text-warmbrown"
                        onClick={closeAll}
                      >
                        All Services →
                      </Link>
                      {item.menu.map((col) => (
                        <div key={col.heading}>
                          <Link
                            href={col.href}
                            className="eyebrow text-warmbrown mb-3 block"
                            onClick={closeAll}
                          >
                            {col.heading}
                          </Link>
                          <ul className="space-y-3">
                            {col.links.map((link) => (
                              <li key={link.href}>
                                <Link
                                  href={link.href}
                                  className="block text-[0.83rem] text-charcoal/80"
                                  onClick={closeAll}
                                >
                                  {link.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              ) : (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="block text-sm tracking-wider uppercase text-charcoal"
                    onClick={closeAll}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            )}
            <li className="pt-2">
              <Link
                href="/contact"
                className="inline-block text-[0.78rem] tracking-wider uppercase border border-warmbrown/50 text-warmbrown px-5 py-2.5"
                onClick={closeAll}
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
