import type { TripLifecycle } from "@/lib/types";

const COPY: Record<TripLifecycle, string> = {
  upcoming: "即將出發",
  ongoing: "進行中",
  archived: "已封存",
};

export function StatusStamp({ lifecycle }: { lifecycle: TripLifecycle }) {
  const tone =
    lifecycle === "archived"
      ? "border-muted text-muted"
      : "border-stamp text-stamp";

  return (
    <span
      className={`inline-flex h-16 w-16 rotate-[-8deg] items-center justify-center rounded-full border-2 text-center font-semibold leading-tight ${tone}`}
    >
      <span className="text-[11px] tracking-widest">{COPY[lifecycle]}</span>
    </span>
  );
}

export function StatusPill({ lifecycle }: { lifecycle: TripLifecycle }) {
  const tone =
    lifecycle === "archived"
      ? "border-line text-muted"
      : "border-stamp/40 text-stamp";

  return (
    <span
      className={`inline-flex rounded-full border px-2 py-0.5 font-mono text-[11px] tracking-wide ${tone}`}
    >
      {COPY[lifecycle]}
    </span>
  );
}
