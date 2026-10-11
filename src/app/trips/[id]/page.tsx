import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { ArchiveRuleNote } from "@/components/ArchiveRuleNote";
import { DayTimeline } from "@/components/DayTimeline";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusStamp } from "@/components/StatusStamp";
import { TripChecklist } from "@/components/TripChecklist";
import { TripNotes } from "@/components/TripNotes";
import { formatZhDateWithWeekday, formatZhRange } from "@/lib/dates";
import { archiveReasonLabel, countdownLabel } from "@/lib/labels";
import { getRequestHongKongToday } from "@/lib/today";
import {
  getAllTrips,
  getArchiveReason,
  getTripById,
  getTripLifecycle,
} from "@/lib/trips";

export function generateStaticParams() {
  return getAllTrips().map((trip) => ({ id: trip.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/trips/[id]">): Promise<Metadata> {
  const { id } = await params;
  const trip = getTripById(id);
  return { title: trip?.title ?? "旅程" };
}

export default function TripDetailPage({ params }: PageProps<"/trips/[id]">) {
  return (
    <Suspense fallback={<p className="text-sm text-muted">載入行程…</p>}>
      <TripDetailBody params={params} />
    </Suspense>
  );
}

async function TripDetailBody({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const trip = getTripById(id);
  if (!trip) {
    notFound();
  }

  const today = await getRequestHongKongToday();
  const lifecycle = getTripLifecycle(trip, today);
  const reason = getArchiveReason(trip, today);

  return (
    <article className="flex flex-col gap-10">
      <header className="flex items-start justify-between gap-4">
        <div>
          <p className="font-mono text-[11px] tracking-[0.16em] text-muted">
            {trip.id}
          </p>
          <h1 className="mt-1 text-3xl font-semibold tracking-tight">{trip.title}</h1>
          <p className="mt-2 font-mono text-sm text-muted">
            {formatZhRange(trip.startDate, trip.endDate)}
          </p>
          <p className="mt-1 text-sm text-muted">{trip.place}</p>
          <p className="mt-3 max-w-xl text-sm leading-6 text-pretty">{trip.summary}</p>
          <p className="mt-3 font-mono text-xs text-stamp">
            {countdownLabel(trip, today)}
          </p>
        </div>
        <StatusStamp lifecycle={lifecycle} />
      </header>

      {reason ? (
        <div className="flex flex-col gap-3">
          <ArchiveRuleNote />
          <p className="text-sm text-muted">
            呢次入檔原因：{archiveReasonLabel(reason)}。
          </p>
        </div>
      ) : null}

      <nav className="flex flex-wrap gap-x-4 gap-y-2 border-y border-line py-3 text-sm">
        <a href="#itinerary">日程</a>
        <a href="#checklist">清單</a>
        <a href="#notes">筆記</a>
        <Link href={`/guides/${trip.destinationId}`}>指南</Link>
        <Link href="/book">機票酒店外連</Link>
      </nav>

      <section id="itinerary">
        <SectionHeading
          kicker="日程"
          title={`${trip.itinerary.length} 日骨架 · ${formatZhDateWithWeekday(trip.startDate)} 起`}
        />
        <DayTimeline days={trip.itinerary} />
      </section>

      <section id="checklist">
        <SectionHeading kicker="清單" title="出發前核對" />
        <TripChecklist tripId={trip.id} items={trip.checklist} />
      </section>

      <section id="notes">
        <SectionHeading kicker="筆記" title="行程備忘" />
        <TripNotes tripId={trip.id} seedNotes={trip.notes} />
      </section>

      <section className="border-t border-line pt-6">
        <SectionHeading kicker="延伸" title="指南同外連" />
        <div className="flex flex-wrap gap-3">
          <Link
            href={`/guides/${trip.destinationId}`}
            className="border border-ink px-4 py-2 text-sm no-underline hover:bg-wash"
          >
            {trip.title}指南
          </Link>
          <Link
            href="/book"
            className="border border-line px-4 py-2 text-sm text-muted no-underline hover:border-ink hover:text-ink"
          >
            機票／酒店外連搜尋
          </Link>
        </div>
        <p className="mt-3 text-xs leading-5 text-muted">
          陸路過關行程唔需要機票。外連頁預設用呢次日期，方便你另查深圳或周邊城市。
        </p>
      </section>
    </article>
  );
}
