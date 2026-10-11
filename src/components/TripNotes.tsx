"use client";

import { useState } from "react";
import { useLocalJson } from "@/lib/use-local-json";

function storageKey(tripId: string): string {
  return `travel-hub:notes:${tripId}`;
}

export function TripNotes({
  tripId,
  seedNotes,
}: {
  tripId: string;
  seedNotes: string[];
}) {
  const [extra, setExtra] = useLocalJson<string[]>(storageKey(tripId));
  const [draft, setDraft] = useState("");
  const userNotes = extra ?? [];

  function addNote() {
    const text = draft.trim();
    if (!text) {
      return;
    }
    setExtra([...userNotes, text]);
    setDraft("");
  }

  function removeNote(index: number) {
    const next = userNotes.filter((_, i) => i !== index);
    setExtra(next.length > 0 ? next : null);
  }

  return (
    <div className="flex flex-col gap-4">
      <ul className="flex flex-col gap-2">
        {seedNotes.map((note) => (
          <li key={note} className="border-l-2 border-stamp pl-3 text-sm leading-6">
            {note}
          </li>
        ))}
        {userNotes.map((note, index) => (
          <li
            key={`${note}-${index}`}
            className="flex items-start justify-between gap-3 border-l-2 border-line pl-3 text-sm leading-6"
          >
            <span>{note}</span>
            <button
              type="button"
              onClick={() => removeNote(index)}
              className="shrink-0 text-xs text-muted underline hover:text-ink"
            >
              刪除
            </button>
          </li>
        ))}
      </ul>
      <form
        className="flex flex-col gap-2"
        onSubmit={(event) => {
          event.preventDefault();
          addNote();
        }}
      >
        <label htmlFor="trip-note" className="text-xs text-muted">
          加一則私人備忘（只存在呢部裝置）
        </label>
        <textarea
          id="trip-note"
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          rows={3}
          className="w-full resize-y border border-line bg-paper px-3 py-2 text-sm outline-none focus:border-ink"
          placeholder="例如：酒店確認號、集合時間…"
        />
        <button
          type="submit"
          className="self-start bg-ink px-3 py-2 text-sm text-paper hover:bg-ink/90"
        >
          儲存備忘
        </button>
      </form>
    </div>
  );
}
