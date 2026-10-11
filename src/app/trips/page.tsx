import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { StatusPill } from "@/components/StatusStamp";
import { formatZhRange } from "@/lib/dates";
import { countdownLabel } from "@/lib/labels";
import { getRequestHongKongToday } from "@/lib/today";
import { getActiveTrips, getTripLifecycle } from "@/lib/trips";

export const metadata: Metadata = {
  title: "旅程",
};

export default function TripsPage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">載入旅程…</p>}>
      <TripsBody />
    </Suspense>
  );
}

async function TripsBody() {
  const today = await getRequestHongKongToday();
  const trips = getActiveTrips(today);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">旅程</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          進行中同即將出發嘅行程。結束日已過或狀態為 archived 嘅紀錄，請到檔案。
        </p>
      </header>
      {trips.length === 0 ? (
        <p className="text-sm text-muted">暫時無進行中嘅旅程。</p>
      ) : (
        <ul className="divide-y divide-line border-y border-line">
          {trips.map((trip) => (
            <li key={trip.id} className="py-5">
              <div className="flex flex-wrap items-center gap-2">
                <Link
                  href={`/trips/${trip.id}`}
                  className="text-lg font-semibold tracking-tight text-ink no-underline hover:underline"
                >
                  {trip.title}
                </Link>
                <StatusPill lifecycle={getTripLifecycle(trip, today)} />
              </div>
              <p className="mt-1 font-mono text-xs text-muted">
                {formatZhRange(trip.startDate, trip.endDate)} ·{" "}
                {countdownLabel(trip, today)}
              </p>
              <p className="mt-2 text-sm leading-6 text-muted">{trip.place}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
