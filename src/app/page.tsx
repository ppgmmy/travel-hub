import Link from "next/link";
import { Suspense } from "react";
import { RouteStrip } from "@/components/RouteStrip";
import { SectionHeading } from "@/components/SectionHeading";
import { StatusStamp } from "@/components/StatusStamp";
import { formatZhRange } from "@/lib/dates";
import { getAllGuides } from "@/lib/guides";
import { countdownLabel } from "@/lib/labels";
import { getRequestHongKongToday } from "@/lib/today";
import { getArchivedTrips, getFeaturedTrip, getTripLifecycle } from "@/lib/trips";

export default function HomePage() {
  return (
    <Suspense fallback={<HomeFallback />}>
      <HomeBody />
    </Suspense>
  );
}

async function HomeBody() {
  const today = await getRequestHongKongToday();
  const featured = getFeaturedTrip(today);
  const archived = getArchivedTrips(today);
  const guide = getAllGuides().find((item) => item.slug === featured?.destinationId);

  return (
    <div className="flex flex-col gap-10">
      <section>
        <p className="font-mono text-[11px] tracking-[0.2em] text-stamp">口岸手帳</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight text-balance">
          行程、指南、外連，同一個樞紐
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-muted text-pretty">
          進行中嘅旅程睇日程同清單；目的地指南寫過關同交通；機票酒店只係外連搜尋，唔顯示即時價錢。
        </p>
      </section>

      {featured ? (
        <section className="border-t border-line pt-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-mono text-[11px] tracking-[0.16em] text-stamp">
                當前／即將出發
              </p>
              <h2 className="mt-1 text-2xl font-semibold tracking-tight">
                {featured.title}
              </h2>
              <p className="mt-2 font-mono text-sm text-muted">
                {formatZhRange(featured.startDate, featured.endDate)}
              </p>
              <p className="mt-1 text-sm text-muted">{featured.place}</p>
              <p className="mt-3 max-w-xl text-sm leading-6 text-pretty">
                {featured.summary}
              </p>
              <p className="mt-3 font-mono text-xs text-stamp">
                {countdownLabel(featured, today)}
              </p>
            </div>
            <StatusStamp lifecycle={getTripLifecycle(featured, today)} />
          </div>
          <div className="mt-6">
            <RouteStrip stops={featured.route} />
          </div>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link
              href={`/trips/${featured.id}`}
              className="bg-stamp px-4 py-2 text-sm text-paper no-underline hover:bg-stamp/90"
            >
              打開行程
            </Link>
            <Link
              href={`/guides/${featured.destinationId}`}
              className="border border-ink px-4 py-2 text-sm text-ink no-underline hover:bg-wash"
            >
              目的地指南
            </Link>
            <Link
              href="/book"
              className="border border-line px-4 py-2 text-sm text-muted no-underline hover:border-ink hover:text-ink"
            >
              機票酒店外連
            </Link>
          </div>
        </section>
      ) : (
        <p className="text-sm text-muted">而家無進行中或即將出發嘅旅程。</p>
      )}

      {guide ? (
        <section>
          <SectionHeading kicker="指南" title={`${guide.title}實用筆記`} />
          <p className="max-w-xl text-sm leading-6 text-muted text-pretty">
            {guide.excerpt}
          </p>
          <Link
            href={`/guides/${guide.slug}`}
            className="mt-3 inline-block text-sm text-ink"
          >
            閱讀指南
          </Link>
        </section>
      ) : null}

      <section>
        <SectionHeading kicker="檔案" title="已結束嘅旅程" />
        {archived.length === 0 ? (
          <p className="text-sm text-muted">未有封存紀錄。</p>
        ) : (
          <ul className="divide-y divide-line border-y border-line">
            {archived.map((trip) => (
              <li key={trip.id} className="flex items-baseline justify-between gap-3 py-3">
                <Link href={`/trips/${trip.id}`} className="text-sm text-ink">
                  {trip.title}
                </Link>
                <span className="font-mono text-[11px] text-muted">
                  {formatZhRange(trip.startDate, trip.endDate)}
                </span>
              </li>
            ))}
          </ul>
        )}
        <Link href="/archive" className="mt-3 inline-block text-sm text-ink">
          瀏覽全部檔案
        </Link>
      </section>
    </div>
  );
}

function HomeFallback() {
  return <p className="text-sm text-muted">載入今日行程狀態…</p>;
}
