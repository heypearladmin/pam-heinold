import Image from "next/image";
import Link from "next/link";
import { site } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="bg-nearblack text-cream/90 mt-32">
      {/* ERA red accent stripe — used sparingly per brand */}
      <div className="h-1 bg-erared" aria-hidden="true" />

      <div className="max-w-editorial mx-auto px-6 lg:px-10 py-20 grid gap-14 md:grid-cols-12">
        <div className="md:col-span-5">
          <Image
            src={site.logo.light}
            alt={site.logo.alt}
            width={200}
            height={80}
            className="h-14 w-auto mb-7 opacity-95"
          />
          <p className="font-display text-3xl md:text-4xl leading-tight text-cream">
            Let&apos;s find the place that{" "}
            <span className="script text-tan text-4xl md:text-5xl">
              feels like home.
            </span>
          </p>
          <p className="mt-7 max-w-md text-cream/70 leading-relaxed">
            22 years guiding Pensacola buyers and sellers — from the historic
            streets of East Hill to the gated calm of Marcus Pointe and the
            quiet beauty of the Gulf.
          </p>
          <p className="mt-6 text-xs tracking-editorial uppercase text-cream/55">
            {site.company.name} · {site.company.independenceLine}
          </p>
        </div>

        <div className="md:col-span-3">
          <p className="eyebrow text-cream/60 mb-5">Explore</p>
          <ul className="space-y-3 text-sm">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-cream/85 hover:text-tan transition-colors duration-300"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="md:col-span-4">
          <p className="eyebrow text-cream/60 mb-5">Contact</p>
          <address className="not-italic text-sm leading-relaxed text-cream/85 space-y-1">
            <div>{site.company.hyperlocalArea}</div>
            <div className="pt-3">
              <a href={site.company.phoneHref} className="link-underline">
                {site.company.phone}
              </a>
            </div>
            <div>
              <a href={site.company.emailHref} className="link-underline">
                {site.company.email}
              </a>
            </div>
          </address>

          <ul className="flex gap-5 mt-6 text-[0.72rem] tracking-editorial uppercase">
            <li>
              <a
                href={site.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/85 hover:text-tan transition-colors duration-300"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href={site.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/85 hover:text-tan transition-colors duration-300"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href={site.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/85 hover:text-tan transition-colors duration-300"
              >
                LinkedIn
              </a>
            </li>
            <li>
              <a
                href={site.social.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream/85 hover:text-tan transition-colors duration-300"
              >
                YouTube
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-cream/10">
        <div className="max-w-editorial mx-auto px-6 lg:px-10 py-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-cream/55">
          <p>
            © {new Date().getFullYear()} Pamela Heinold · ERA American Real
            Estate · Independently owned & operated
          </p>
          <p className="tracking-editorial uppercase">
            Pensacola, Florida — every street, by name.
          </p>
        </div>
      </div>
    </footer>
  );
}
