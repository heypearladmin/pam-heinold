import GaLink from "@/components/GaLink";

export default function PdfDownloadCta({ slug, title }: { slug: string; title: string }) {
  return (
    <div className="mt-14 border-l-4 border-warmbrown bg-lighttan/25 px-6 py-6 flex flex-col sm:flex-row sm:items-center gap-5 sm:gap-8">
      <div className="flex-1">
        <p className="eyebrow text-warmbrown mb-2 text-[0.66rem]">Free Download</p>
        <p className="text-charcoal leading-relaxed text-[0.98rem]">
          Want to save this or read it later? Get &ldquo;{title}&rdquo; as a
          PDF — no email required.
        </p>
      </div>
      <GaLink
        href={`/pdfs/${slug}.pdf`}
        download
        event="pdf_download"
        params={{ slug }}
        className="shrink-0 inline-block text-center bg-warmbrown text-cream px-6 py-3 text-[0.74rem] tracking-wider uppercase hover:bg-nearblack transition-colors duration-300"
      >
        Download the Guide
      </GaLink>
    </div>
  );
}
