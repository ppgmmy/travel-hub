import { nearbyKindLabel } from "@/lib/labels";
import type { NearbyKind, NearbyPlace } from "@/lib/types";

const KIND_ORDER: NearbyKind[] = ["attraction", "shopping", "food", "practical"];

function groupByKind(places: NearbyPlace[]): { kind: NearbyKind; items: NearbyPlace[] }[] {
  return KIND_ORDER.flatMap((kind) => {
    const items = places.filter((place) => place.kind === kind);
    return items.length > 0 ? [{ kind, items }] : [];
  });
}

export function NearbyPlaces({
  places,
  intro,
}: {
  places: NearbyPlace[];
  intro?: string;
}) {
  const groups = groupByKind(places);

  return (
    <div className="flex flex-col gap-6">
      {intro ? <p className="text-sm leading-6 text-muted text-pretty">{intro}</p> : null}
      {groups.map((group) => (
        <section key={group.kind}>
          <h3 className="font-mono text-[11px] tracking-widest text-stamp">
            {nearbyKindLabel(group.kind)}
          </h3>
          <ul className="mt-2 divide-y divide-line border-y border-line">
            {group.items.map((place) => (
              <li key={`${place.kind}-${place.name}`} className="py-3">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <p className="font-medium">{place.name}</p>
                  <p className="font-mono text-[11px] text-muted">
                    {place.cluster}
                    {place.dayHint ? ` · ${place.dayHint}` : ""}
                  </p>
                </div>
                <p className="mt-1 text-sm leading-6 text-muted text-pretty">{place.note}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
