import { formatZhDate, formatZhRange } from "@/lib/dates";
import type { Lodging } from "@/lib/types";

export function TripLodging({ lodging }: { lodging: Lodging }) {
  return (
    <dl className="grid gap-3 border-y border-line py-4 text-sm">
      <div>
        <dt className="font-mono text-[11px] tracking-widest text-stamp">酒店</dt>
        <dd className="mt-1 text-lg font-semibold tracking-tight">{lodging.name}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted">位置</dt>
        <dd className="mt-0.5">{lodging.area}</dd>
      </div>
      <div>
        <dt className="text-xs text-muted">入住／退房</dt>
        <dd className="mt-0.5 font-mono">
          {formatZhRange(lodging.checkInDate, lodging.checkOutDate)}
        </dd>
      </div>
      {lodging.earliestCheckIn ? (
        <div>
          <dt className="text-xs text-muted">最早入住</dt>
          <dd className="mt-0.5">
            <span className="font-mono font-semibold">{lodging.earliestCheckIn}</span>
            <span className="text-muted">
              {" "}
              （{formatZhDate(lodging.checkInDate)} 朝早 8 時起）
            </span>
          </dd>
        </div>
      ) : null}
      {lodging.note ? (
        <div>
          <dt className="text-xs text-muted">備註</dt>
          <dd className="mt-0.5 leading-6 text-pretty">{lodging.note}</dd>
        </div>
      ) : null}
    </dl>
  );
}
