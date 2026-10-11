export function SectionHeading({
  kicker,
  title,
  id,
}: {
  kicker?: string;
  title: string;
  id?: string;
}) {
  return (
    <header id={id} className="mb-4">
      {kicker ? (
        <p className="font-mono text-[11px] tracking-[0.16em] text-stamp uppercase">
          {kicker}
        </p>
      ) : null}
      <h2 className="text-xl font-semibold tracking-tight text-balance">{title}</h2>
    </header>
  );
}
