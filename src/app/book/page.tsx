import type { Metadata } from "next";
import { BookingForm } from "@/components/BookingForm";
import { getTripById } from "@/lib/trips";

export const metadata: Metadata = {
  title: "機票酒店外連",
};

export default function BookPage() {
  const seed = getTripById("qianhai-2026-10");

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">機票／酒店外連</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          一站式幫手組成搜尋連結。本站<strong>無即時報價</strong>、無庫存、無代訂。點擊後會去 Google
          航班、Skyscanner、Booking.com、Hotels.com 或 Trip.com。
        </p>
      </header>
      <aside className="border border-stamp/40 bg-wash px-3 py-3 text-sm leading-6">
        <p className="font-medium text-stamp">外連搜尋 · 非即時報價 · 本站不代訂</p>
        <p className="mt-1 text-muted">
          前海呢次係陸路過關（深圳灣），機票只係備用。酒店搜尋預設「海底世界 Rany Hotel／蛇口海上世界」，日期跟種子行程 10 月 12–14 日。
        </p>
      </aside>
      <BookingForm
        initial={{
          origin: "HKG",
          destination: "SZX",
          hotelQuery: "海底世界 Rany Hotel, 蛇口海上世界",
          departDate: seed?.startDate ?? "2026-10-12",
          returnDate: seed?.endDate ?? "2026-10-14",
        }}
      />
    </div>
  );
}
