import { ReactNode } from "react";

interface SectionProps {
  eyebrow?: string;
  title?: string;
  scriptAccent?: string;
  intro?: string;
  children: ReactNode;
  background?: "paper" | "cream" | "lighttan" | "nearblack" | "transparent";
  padding?: "standard" | "compact" | "spacious";
  align?: "left" | "center";
  id?: string;
}

export default function Section({
  eyebrow,
  title,
  scriptAccent,
  intro,
  children,
  background = "paper",
  padding = "standard",
  align = "left",
  id,
}: SectionProps) {
  const bg =
    background === "cream"
      ? "bg-cream"
      : background === "lighttan"
      ? "bg-lighttan/50"
      : background === "nearblack"
      ? "bg-nearblack text-cream"
      : background === "transparent"
      ? ""
      : "bg-paper";

  const pad =
    padding === "compact"
      ? "py-16 md:py-20"
      : padding === "spacious"
      ? "py-28 md:py-40"
      : "py-20 md:py-28";

  const alignClasses = align === "center" ? "text-center mx-auto" : "";
  const isDark = background === "nearblack";

  return (
    <section id={id} className={`${bg} ${pad}`}>
      <div className={`max-w-editorial mx-auto px-6 lg:px-10 ${alignClasses}`}>
        {(eyebrow || title || intro) && (
          <header
            className={`mb-14 md:mb-20 ${
              align === "center" ? "max-w-3xl mx-auto" : "max-w-3xl"
            }`}
          >
            {eyebrow && (
              <p
                className={`eyebrow mb-5 ${
                  isDark ? "text-cream/60" : ""
                }`}
              >
                {eyebrow}
              </p>
            )}
            {title && (
              <h2
                className={`font-display text-4xl md:text-5xl leading-[1.08] tracking-tight ${
                  isDark ? "text-cream" : "text-warmbrown"
                }`}
              >
                {title}
                {scriptAccent && (
                  <>
                    {" "}
                    <span
                      className={`script text-4xl md:text-5xl ${
                        isDark ? "text-tan" : "text-warmbrown/80"
                      }`}
                    >
                      {scriptAccent}
                    </span>
                  </>
                )}
              </h2>
            )}
            {intro && (
              <p
                className={`mt-6 text-lg leading-relaxed ${
                  isDark ? "text-cream/80" : "text-charcoal/85"
                }`}
              >
                {intro}
              </p>
            )}
          </header>
        )}
        {children}
      </div>
    </section>
  );
}
