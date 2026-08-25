import Link from "next/link";

interface InlineCtaProps {
  eyebrow: string;
  title: string;
  body: string;
  cta: { label: string; href: string };
  download?: boolean;
}

export default function InlineCta({ eyebrow, title, body, cta, download }: InlineCtaProps) {
  return (
    <section className="pb-4 bg-paper">
      <div className="max-w-editorial mx-auto px-6 lg:px-10">
        <div className="border-l-4 border-warmbrown bg-lighttan/25 px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
          <div className="flex-1">
            <p className="eyebrow text-warmbrown mb-2 text-[0.66rem]">{eyebrow}</p>
            <p className="font-display text-xl text-warmbrown leading-snug mb-1.5">{title}</p>
            <p className="text-charcoal/80 leading-relaxed text-[0.95rem]">{body}</p>
          </div>
          <Link
            href={cta.href}
            {...(download ? { download: true } : {})}
            className="shrink-0 inline-block text-center bg-warmbrown text-cream px-6 py-3 text-[0.74rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
          >
            {cta.label}
          </Link>
        </div>
      </div>
    </section>
  );
}
