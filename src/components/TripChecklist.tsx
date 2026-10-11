"use client";

import { useLocalJson } from "@/lib/use-local-json";
import type { ChecklistItem } from "@/lib/types";

function storageKey(tripId: string): string {
  return `travel-hub:checklist:${tripId}`;
}

export function TripChecklist({
  tripId,
  items,
}: {
  tripId: string;
  items: ChecklistItem[];
}) {
  const [stored, setStored] = useLocalJson<ChecklistItem[]>(storageKey(tripId));
  const list = stored && stored.length > 0 ? stored : items;
  const doneCount = list.filter((item) => item.done).length;

  function toggle(id: string) {
    setStored(
      list.map((item) => (item.id === id ? { ...item, done: !item.done } : item)),
    );
  }

  function reset() {
    setStored(null);
  }

  return (
    <div>
      <div className="mb-3 flex items-center justify-between gap-3">
        <p className="font-mono text-[11px] text-muted">
          {doneCount}/{list.length} 完成 · 只存在呢部裝置
        </p>
        <button
          type="button"
          onClick={reset}
          className="text-xs text-muted underline hover:text-ink"
        >
          重設清單
        </button>
      </div>
      <ul className="divide-y divide-line border-y border-line">
        {list.map((item) => (
          <li key={item.id}>
            <label className="flex cursor-pointer items-start gap-3 py-3">
              <input
                type="checkbox"
                checked={item.done}
                onChange={() => toggle(item.id)}
                className="mt-1 size-4 accent-[var(--stamp)]"
              />
              <span className={item.done ? "text-muted line-through" : ""}>
                {item.label}
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
