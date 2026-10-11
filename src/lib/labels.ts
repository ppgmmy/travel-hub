import { daysUntil } from "./dates";
import type { ArchiveReason, Trip, TripLifecycle } from "./types";

export function lifecycleLabel(lifecycle: TripLifecycle): string {
  switch (lifecycle) {
    case "upcoming":
      return "即將出發";
    case "ongoing":
      return "進行中";
    case "archived":
      return "已封存";
    default: {
      const exhaustive: never = lifecycle;
      return exhaustive;
    }
  }
}

export function archiveReasonLabel(reason: ArchiveReason): string {
  switch (reason) {
    case "status":
      return "狀態 = archived";
    case "end-date":
      return "結束日已過";
    case "both":
      return "結束日已過，且狀態 = archived";
    default: {
      const exhaustive: never = reason;
      return exhaustive;
    }
  }
}

export function countdownLabel(trip: Trip, today: string): string {
  const untilStart = daysUntil(trip.startDate, today);
  if (untilStart > 1) {
    return `還有 ${untilStart} 日`;
  }
  if (untilStart === 1) {
    return "聽日出發";
  }
  if (untilStart === 0) {
    return "今日出發";
  }
  const untilEnd = daysUntil(trip.endDate, today);
  if (untilEnd >= 0) {
    return "行程進行中";
  }
  return "已結束";
}
