const WEEKDAYS = ["日", "一", "二", "三", "四", "五", "六"] as const;

export function getHongKongToday(now = new Date()): string {
  return now.toLocaleDateString("en-CA", { timeZone: "Asia/Hong_Kong" });
}

export function formatZhDate(iso: string): string {
  const parts = iso.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  if (!year || !month || !day) {
    return iso;
  }
  return `${year}年${month}月${day}日`;
}

export function formatZhRange(start: string, end: string): string {
  return `${formatZhDate(start)} 至 ${formatZhDate(end)}`;
}

export function weekdayLabel(iso: string): string {
  const parts = iso.split("-").map(Number);
  const year = parts[0];
  const month = parts[1];
  const day = parts[2];
  if (!year || !month || !day) {
    return "";
  }
  const date = new Date(Date.UTC(year, month - 1, day));
  return WEEKDAYS[date.getUTCDay()] ?? "";
}

export function formatZhDateWithWeekday(iso: string): string {
  const weekday = weekdayLabel(iso);
  return weekday ? `${formatZhDate(iso)}（${weekday}）` : formatZhDate(iso);
}

export function daysUntil(iso: string, today: string): number {
  const start = Date.parse(`${iso}T00:00:00+08:00`);
  const now = Date.parse(`${today}T00:00:00+08:00`);
  return Math.round((start - now) / 86_400_000);
}
