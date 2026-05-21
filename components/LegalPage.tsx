import { ReactNode } from "react";

interface LegalPageProps {
  eyebrow: string;
  title: string;
  scriptAccent?: string;
  effectiveDate?: string;
  children: ReactNode;
}

/**
 * Shared wrapper for /terms and /policies. Keeps both pages visually identical
 * to the rest of the site (max-w-editorial, paper background, prose-editorial)
 * so legal content reads as part of the brand rather than a bolt-on.
 */
export default function LegalPage({
  eyebrow,
  title,
  scriptAccent,
  effectiveDate,
  children,
}: LegalPageProps) {
  return (
    <>
      <section className="pt-40 pb-12 md:pt-48 md:pb-16 bg-paper">
        <div className="max-w-editorial mx-auto px-6 lg:px-10">
          <p className="eyebrow text-charcoal/60 mb-6">{eyebrow}</p>
          <h1 className="font-display text-5xl md:text-7xl text-warmbrown leading-[1.06] tracking-tight">
            {title}
            {scriptAccent && (
              <>
                {" "}
                <span className="script text-warmbrown/80 text-6xl md:text-8xl">
                  {scriptAccent}
                </span>
              </>
            )}
          </h1>
          {effectiveDate && (
            <p className="mt-6 text-sm tracking-editorial uppercase text-charcoal/60">
              Effective {effectiveDate}
            </p>
          )}
        </div>
      </section>

      <section className="pb-24 md:pb-32 bg-paper">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 prose-editorial">
          {children}
        </div>
      </section>
    </>
  );
}
