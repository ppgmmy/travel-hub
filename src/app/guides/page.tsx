import type { Metadata } from "next";
import Link from "next/link";
import { formatZhDate } from "@/lib/dates";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "指南",
};

export default function GuidesPage() {
  const guides = getAllGuides();

  return (
    <div className="flex flex-col gap-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight">指南</h1>
        <p className="mt-2 max-w-xl text-sm leading-6 text-muted">
          公開目的地筆記：過關、交通、食住同注意事項。唔係廣告，亦唔係官方時間表。
        </p>
      </header>
      <ul className="divide-y divide-line border-y border-line">
        {guides.map((guide) => (
          <li key={guide.slug} className="py-5">
            <Link
              href={`/guides/${guide.slug}`}
              className="text-lg font-semibold tracking-tight text-ink no-underline hover:underline"
            >
              {guide.title}
            </Link>
            <p className="mt-1 text-xs text-muted">{guide.place}</p>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted">{guide.excerpt}</p>
            <p className="mt-2 font-mono text-[11px] text-muted">
              更新：{formatZhDate(guide.updated)}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
