"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const NAV = [
  { href: "/", label: "首頁" },
  { href: "/trips", label: "旅程" },
  { href: "/guides", label: "指南" },
  { href: "/archive", label: "檔案" },
  { href: "/book", label: "外連" },
] as const;

function isActive(pathname: string, href: string): boolean {
  if (href === "/") {
    return pathname === "/";
  }
  return pathname === href || pathname.startsWith(`${href}/`);
}

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t border-line bg-paper/95 backdrop-blur-sm md:hidden"
      aria-label="流動導覽"
    >
      <ul className="mx-auto grid max-w-3xl grid-cols-5">
        {NAV.map((item) => {
          const active = isActive(pathname, item.href);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={`flex h-14 items-center justify-center text-[13px] no-underline ${
                  active ? "font-semibold text-stamp" : "text-muted"
                }`}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
