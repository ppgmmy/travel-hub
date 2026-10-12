import type { RouteStop } from "@/lib/types";

const FALLBACK_STOPS: RouteStop[] = [
  { title: "香港", hint: "專線巴士" },
  { title: "深圳灣口岸", hint: "主口岸" },
  { title: "前海", hint: "桂灣／媽灣" },
];

export function RouteStrip({
  stops = FALLBACK_STOPS,
}: {
  stops?: RouteStop[];
}) {
  const display = stops.length >= 3 ? stops.slice(0, 3) : FALLBACK_STOPS;
  const start = display[0];
  const mid = display[1];
  const end = display[2];
  if (!start || !mid || !end) {
    return null;
  }

  return (
    <div
      className="border-y border-line py-4"
      aria-label={`過關路線：${start.title}、${mid.title}、${end.title}`}
    >
      <ol className="grid grid-cols-3 gap-2 text-center">
        <li>
          <p className="text-sm font-semibold">{start.title}</p>
          <p className="font-mono text-[11px] text-muted">{start.hint}</p>
        </li>
        <li>
          <p className="text-sm font-semibold text-stamp">{mid.title}</p>
          <p className="font-mono text-[11px] text-muted">{mid.hint}</p>
        </li>
        <li>
          <p className="text-sm font-semibold">{end.title}</p>
          <p className="font-mono text-[11px] text-muted">{end.hint}</p>
        </li>
      </ol>
      <div className="relative mt-3 h-px bg-line">
        <span className="absolute top-1/2 left-[16%] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink" />
        <span className="absolute top-1/2 left-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-stamp" />
        <span className="absolute top-1/2 right-[16%] h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-ink" />
      </div>
    </div>
  );
}
