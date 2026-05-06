interface TestimonialCardProps {
  quote: string;
  attribution: string;
  context?: string;
}

/**
 * TestimonialCard renders a pull-quote / editorial quotation block.
 *
 * No fake testimonials are used. This component is provided for when real,
 * attributable client testimonials are added.
 */
export default function TestimonialCard({
  quote,
  attribution,
  context,
}: TestimonialCardProps) {
  return (
    <figure className="border-l-2 border-warmbrown pl-7 py-2">
      <blockquote>
        <p className="font-display text-2xl md:text-3xl text-warmbrown leading-snug tracking-tight">
          &ldquo;{quote}&rdquo;
        </p>
      </blockquote>
      <figcaption className="mt-5 text-[0.72rem] tracking-editorial uppercase text-charcoal/65">
        {attribution}
        {context && <span className="text-charcoal/45"> — {context}</span>}
      </figcaption>
    </figure>
  );
}
