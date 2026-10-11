import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ArchiveRuleNote } from "@/components/ArchiveRuleNote";
import { formatZhRange } from "@/lib/dates";
import { archiveReasonLabel } from "@/lib/labels";
import { getRequestHongKongToday } from "@/lib/today";
import { getArchiveReason, getArchivedTrips } from "@/lib/trips";

export const metadata: Metadata = {
  title: "檔案",
};

export default function ArchivePage() {
  return (
    <Suspense fallback={<p className="text-sm text-muted">載入檔案…</p>}>
      <ArchiveBody />
    </Suspense>
  );
}

async function ArchiveBody() {
  const today = await getRequestHongKongToday();
  const trips = getArchivedTrips(today);

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">檔案</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          已結束或已封存嘅旅程紀錄。可以按日期回看過往行程。
        </p>
      </header>
      <ArchiveRuleNote />
      {trips.length === 0 ? (
        <p className="text-sm text-muted">未有封存紀錄。</p>
      ) : (
        <ol className="divide-y divide-line border-y border-line">
          {trips.map((trip) => {
            const reason = getArchiveReason(trip, today);
            return (
              <li key={trip.id} className="py-5">
                <Link
                  href={`/trips/${trip.id}`}
                  className="text-lg font-semibold tracking-tight text-ink no-underline hover:underline"
                >
                  {trip.title}
                </Link>
                <p className="mt-1 font-mono text-xs text-muted">
                  {formatZhRange(trip.startDate, trip.endDate)}
                </p>
                <p className="mt-2 text-sm leading-6 text-muted">{trip.summary}</p>
                {reason ? (
                  <p className="mt-2 font-mono text-[11px] text-muted">
                    入檔原因：{archiveReasonLabel(reason)}
                  </p>
                ) : null}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}
