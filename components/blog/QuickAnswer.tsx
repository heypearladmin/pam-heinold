export default function QuickAnswer({ text }: { text: string }) {
  return (
    <div
      id="quick-answer"
      className="border-l-4 border-warmbrown bg-lighttan/25 px-6 py-5 mb-10"
    >
      <p className="eyebrow text-warmbrown mb-2 text-[0.66rem]">Quick Answer</p>
      <p className="text-charcoal leading-relaxed text-[1.02rem]">{text}</p>
    </div>
  );
}
