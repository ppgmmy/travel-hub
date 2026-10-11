import Link from "next/link";

const NAV = [
  { href: "/", label: "首頁" },
  { href: "/trips", label: "旅程" },
  { href: "/guides", label: "指南" },
  { href: "/archive", label: "檔案" },
  { href: "/book", label: "機票酒店" },
] as const;

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-paper/95 backdrop-blur-sm">
      <div className="mx-auto flex h-14 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-baseline gap-2 no-underline">
          <span className="text-[15px] font-semibold tracking-tight text-ink">
            旅遊樞紐
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.18em] text-muted uppercase sm:inline">
            Travel Hub
          </span>
        </Link>
        <nav className="hidden items-center gap-4 text-sm text-muted md:flex" aria-label="主要導覽">
          {NAV.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-ink">
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
