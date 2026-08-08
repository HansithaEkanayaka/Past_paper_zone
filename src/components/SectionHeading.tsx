export default function SectionHeading({
  eyebrow,
  title,
  body,
  align = "center",
}: {
  eyebrow: string;
  title: string;
  body?: string;
  align?: "center" | "left";
}) {
  return (
    <div className={align === "center" ? "text-center max-w-2xl mx-auto" : "max-w-2xl"}>
      <span className="inline-block rounded-full bg-maroon text-paper px-5 py-1.5 text-sm font-semibold tracking-wide">
        {eyebrow}
      </span>
      <h2 className="mt-5 font-display text-3xl sm:text-4xl font-semibold text-ink text-balance">
        {title}
      </h2>
      {body && <p className="mt-3 text-ink-soft text-balance">{body}</p>}
    </div>
  );
}
