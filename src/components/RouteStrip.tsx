export function RouteStrip() {
  return (
    <div
      className="border-y border-line py-4"
      aria-label="過關路線：香港、皇崗口岸、福田"
    >
      <ol className="grid grid-cols-3 gap-2 text-center">
        <li>
          <p className="text-sm font-semibold">香港</p>
          <p className="font-mono text-[11px] text-muted">落馬洲</p>
        </li>
        <li>
          <p className="text-sm font-semibold text-stamp">皇崗口岸</p>
          <p className="font-mono text-[11px] text-muted">黃崗 · 24h</p>
        </li>
        <li>
          <p className="text-sm font-semibold">福田</p>
          <p className="font-mono text-[11px] text-muted">深圳</p>
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
