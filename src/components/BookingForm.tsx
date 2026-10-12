"use client";

import { useMemo, useState } from "react";
import { buildOutboundLinks, type BookingSearchInput } from "@/lib/booking-links";

const PRESETS = [
  { origin: "HKG", destination: "SZX", hotelQuery: "海底世界 Rany Hotel, 蛇口海上世界" },
  { origin: "HKG", destination: "CAN", hotelQuery: "廣州塔, 廣州" },
  { origin: "HKG", destination: "MFM", hotelQuery: "澳門半島" },
] as const;

export function BookingForm({ initial }: { initial: BookingSearchInput }) {
  const [input, setInput] = useState(initial);
  const links = useMemo(() => buildOutboundLinks(input), [input]);

  return (
    <div className="flex flex-col gap-8">
      <form className="grid gap-4 sm:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <Field
          id="origin"
          label="出發機場代碼"
          value={input.origin}
          onChange={(value) => setInput((prev) => ({ ...prev, origin: value }))}
        />
        <Field
          id="destination"
          label="到達機場代碼"
          value={input.destination}
          onChange={(value) => setInput((prev) => ({ ...prev, destination: value }))}
        />
        <Field
          id="departDate"
          label="出發／入住"
          type="date"
          value={input.departDate}
          onChange={(value) => setInput((prev) => ({ ...prev, departDate: value }))}
        />
        <Field
          id="returnDate"
          label="回程／退房"
          type="date"
          value={input.returnDate}
          onChange={(value) => setInput((prev) => ({ ...prev, returnDate: value }))}
        />
        <div className="sm:col-span-2">
          <Field
            id="hotelQuery"
            label="酒店搜尋地點"
            value={input.hotelQuery}
            onChange={(value) => setInput((prev) => ({ ...prev, hotelQuery: value }))}
          />
        </div>
      </form>

      <div className="flex flex-wrap gap-2">
        {PRESETS.map((preset) => (
          <button
            key={preset.destination}
            type="button"
            className="border border-line px-2.5 py-1 text-xs text-muted hover:border-ink hover:text-ink"
            onClick={() =>
              setInput((prev) => ({
                ...prev,
                origin: preset.origin,
                destination: preset.destination,
                hotelQuery: preset.hotelQuery,
              }))
            }
          >
            {preset.origin} → {preset.destination}
          </button>
        ))}
      </div>

      <section>
        <h2 className="mb-3 text-sm font-semibold tracking-tight">外連搜尋結果</h2>
        <p className="mb-4 text-sm leading-6 text-muted">
          以下按鈕只會打開第三方搜尋頁。本站無預訂 API，亦唔會顯示或估算價錢。
        </p>
        <ul className="divide-y divide-line border-y border-line">
          {links.map((link) => (
            <li key={link.id} className="flex items-center justify-between gap-3 py-3">
              <div>
                <p className="font-medium">{link.label}</p>
                <p className="font-mono text-[11px] text-muted">
                  {link.kind === "flight" ? "機票" : "酒店"} · {link.note}
                </p>
              </div>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="shrink-0 border border-stamp px-3 py-1.5 text-sm text-stamp no-underline hover:bg-stamp hover:text-paper"
              >
                打開搜尋
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function Field({
  id,
  label,
  value,
  onChange,
  type = "text",
}: {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: "text" | "date";
}) {
  return (
    <label htmlFor={id} className="flex flex-col gap-1 text-sm">
      <span className="text-xs text-muted">{label}</span>
      <input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="border border-line bg-paper px-3 py-2 font-mono text-sm outline-none focus:border-ink"
      />
    </label>
  );
}
