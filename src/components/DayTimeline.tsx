import { formatZhDateWithWeekday } from "@/lib/dates";
import type { ItineraryDay } from "@/lib/types";

export function DayTimeline({ days }: { days: ItineraryDay[] }) {
  return (
    <div className="flex flex-col gap-8">
      {days.map((day) => (
        <section key={`${day.day}-${day.date}`} id={`day-${day.day}`}>
          <header className="mb-3 flex items-end justify-between gap-3 border-b border-line pb-2">
            <div>
              <p className="font-mono text-[11px] tracking-widest text-stamp">
                DAY {day.day}
              </p>
              <h3 className="text-lg font-semibold tracking-tight">{day.title}</h3>
            </div>
            <p className="text-right text-xs text-muted">
              {formatZhDateWithWeekday(day.date)}
            </p>
          </header>
          <ol className="flex flex-col">
            {day.items.map((item, index) => (
              <li
                key={`${day.day}-${item.time}-${item.title}`}
                className="grid grid-cols-[4.25rem_1fr] gap-3 py-3"
              >
                <time className="font-mono text-sm tabular-nums text-ink">
                  {item.time}
                </time>
                <div className={index < day.items.length - 1 ? "border-b border-line pb-3" : ""}>
                  <p className="font-medium">{item.title}</p>
                  {item.place ? (
                    <p className="mt-0.5 text-xs text-muted">{item.place}</p>
                  ) : null}
                  {item.detail ? (
                    <p className="mt-1 text-sm leading-6 text-ink/80 text-pretty">
                      {item.detail}
                    </p>
                  ) : null}
                </div>
              </li>
            ))}
          </ol>
        </section>
      ))}
    </div>
  );
}
