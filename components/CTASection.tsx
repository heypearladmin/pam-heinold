import Link from "next/link";

interface CTASectionProps {
  eyebrow?: string;
  title: string;
  scriptAccent?: string;
  body?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  background?: "nearblack" | "lighttan" | "cream" | "paper";
}

export default function CTASection({
  eyebrow = "Begin a Friendly Conversation",
  title,
  scriptAccent,
  body,
  primaryCta,
  secondaryCta,
  background = "nearblack",
}: CTASectionProps) {
  const bg =
    background === "nearblack"
      ? "bg-nearblack text-cream"
      : background === "lighttan"
      ? "bg-lighttan/50 text-charcoal"
      : background === "cream"
      ? "bg-cream text-charcoal"
      : "bg-paper text-charcoal";

  const isDark = background === "nearblack";

  return (
    <section className={`${bg} py-24 md:py-32`}>
      <div className="max-w-editorial mx-auto px-6 lg:px-10 text-center">
        <p
          className={`eyebrow ${
            isDark ? "text-cream/60" : "text-charcoal/55"
          }`}
        >
          {eyebrow}
        </p>
        <h2
          className={`font-display text-4xl md:text-6xl mt-5 leading-[1.08] tracking-tight max-w-3xl mx-auto ${
            isDark ? "text-cream" : "text-warmbrown"
          }`}
        >
          {title}
          {scriptAccent && (
            <>
              {" "}
              <span
                className={`script text-4xl md:text-6xl ${
                  isDark ? "text-tan" : "text-warmbrown/80"
                }`}
              >
                {scriptAccent}
              </span>
            </>
          )}
        </h2>
        {body && (
          <p
            className={`mt-7 max-w-xl mx-auto leading-relaxed text-lg ${
              isDark ? "text-cream/80" : "text-charcoal/80"
            }`}
          >
            {body}
          </p>
        )}
        {(primaryCta || secondaryCta) && (
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            {primaryCta && (
              <Link
                href={primaryCta.href}
                className={`inline-block px-7 py-3.5 text-[0.78rem] tracking-wider uppercase transition-colors duration-300 ${
                  isDark
                    ? "bg-warmbrown text-cream hover:bg-cream hover:text-warmbrown"
                    : "bg-warmbrown text-cream hover:bg-nearblack"
                }`}
              >
                {primaryCta.label}
              </Link>
            )}
            {secondaryCta && (
              <Link
                href={secondaryCta.href}
                className={`inline-block border px-7 py-3.5 text-[0.78rem] tracking-wider uppercase transition-colors duration-300 ${
                  isDark
                    ? "border-cream/40 text-cream hover:bg-cream hover:text-warmbrown"
                    : "border-warmbrown/40 text-warmbrown hover:bg-warmbrown hover:text-cream"
                }`}
              >
                {secondaryCta.label}
              </Link>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
