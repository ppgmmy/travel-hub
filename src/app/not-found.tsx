import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-3 py-10">
      <h1 className="text-2xl font-semibold tracking-tight">搵唔到呢一頁</h1>
      <p className="text-sm text-muted">或者呢段旅程／指南尚未寫入內容檔。</p>
      <Link href="/" className="text-sm">
        返回首頁
      </Link>
    </div>
  );
}
