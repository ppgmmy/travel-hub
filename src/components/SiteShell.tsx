import { Suspense, type ReactNode } from "react";
import { BottomNav } from "./BottomNav";
import { SiteFooter } from "./SiteFooter";
import { SiteHeader } from "./SiteHeader";

export function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-full flex-col bg-paper text-ink">
      <SiteHeader />
      <main className="mx-auto w-full max-w-3xl flex-1 px-4 pb-24 pt-6 md:pb-12">
        {children}
      </main>
      <SiteFooter />
      <Suspense fallback={null}>
        <BottomNav />
      </Suspense>
    </div>
  );
}
