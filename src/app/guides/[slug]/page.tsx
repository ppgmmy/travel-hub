import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatZhDate } from "@/lib/dates";
import { getAllGuides, getGuideBySlug } from "@/lib/guides";
import { getAllTrips } from "@/lib/trips";

export function generateStaticParams() {
  return getAllGuides().map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/guides/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  return { title: guide ? `${guide.title}指南` : "指南" };
}

export default async function GuidePage({ params }: PageProps<"/guides/[slug]">) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);
  if (!guide) {
    notFound();
  }

  const relatedTrip = getAllTrips().find((trip) => trip.destinationId === guide.slug);

  return (
    <article className="flex flex-col gap-8">
      <header>
        <p className="font-mono text-[11px] tracking-[0.16em] text-stamp">目的地指南</p>
        <h1 className="mt-1 text-3xl font-semibold tracking-tight">{guide.title}</h1>
        <p className="mt-2 text-sm text-muted">{guide.place}</p>
        <p className="mt-3 max-w-xl text-sm leading-6 text-pretty">{guide.excerpt}</p>
        <p className="mt-2 font-mono text-[11px] text-muted">
          更新：{formatZhDate(guide.updated)}
        </p>
      </header>

      <nav className="flex flex-wrap gap-x-4 gap-y-2 border-y border-line py-3 text-sm">
        {guide.sections.map((section) => (
          <a key={section.id} href={`#${section.id}`}>
            {section.title}
          </a>
        ))}
      </nav>

      {guide.sections.map((section) => (
        <section key={section.id} id={section.id}>
          <h2 className="text-xl font-semibold tracking-tight">{section.title}</h2>
          <div className="mt-3 flex flex-col gap-3">
            {section.body.map((paragraph) => (
              <p key={paragraph} className="text-sm leading-7 text-pretty">
                {paragraph}
              </p>
            ))}
          </div>
          {section.tips && section.tips.length > 0 ? (
            <ul className="mt-4 list-disc space-y-1 pl-5 text-sm leading-6 text-muted">
              {section.tips.map((tip) => (
                <li key={tip}>{tip}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ))}

      {relatedTrip ? (
        <footer className="border-t border-line pt-6">
          <p className="text-sm text-muted">相關旅程</p>
          <Link
            href={`/trips/${relatedTrip.id}`}
            className="mt-2 inline-block text-sm font-medium"
          >
            {relatedTrip.title}行程
          </Link>
        </footer>
      ) : null}
    </article>
  );
}
