import tripsFile from "../../content/trips.json";
import type { ArchiveReason, Trip, TripLifecycle, TripStatus } from "./types";

const trips = tripsFile.trips as Trip[];

function assertNever(value: never): never {
  throw new Error(`未處理的旅程狀態：${String(value)}`);
}

export function getAllTrips(): Trip[] {
  return trips;
}

export function getTripById(id: string): Trip | undefined {
  return trips.find((trip) => trip.id === id);
}

export function isExplicitlyArchived(status: TripStatus): boolean {
  switch (status) {
    case "archived":
      return true;
    case "active":
      return false;
    default:
      return assertNever(status);
  }
}

export function isTripArchived(trip: Trip, today: string): boolean {
  return isExplicitlyArchived(trip.status) || trip.endDate < today;
}

export function getArchiveReason(trip: Trip, today: string): ArchiveReason | null {
  const byStatus = isExplicitlyArchived(trip.status);
  const byDate = trip.endDate < today;
  if (byStatus && byDate) {
    return "both";
  }
  if (byStatus) {
    return "status";
  }
  if (byDate) {
    return "end-date";
  }
  return null;
}

export function getTripLifecycle(trip: Trip, today: string): TripLifecycle {
  if (isTripArchived(trip, today)) {
    return "archived";
  }
  if (trip.startDate <= today && trip.endDate >= today) {
    return "ongoing";
  }
  return "upcoming";
}

export function getActiveTrips(today: string): Trip[] {
  return trips
    .filter((trip) => !isTripArchived(trip, today))
    .sort((a, b) => a.startDate.localeCompare(b.startDate));
}

export function getArchivedTrips(today: string): Trip[] {
  return trips
    .filter((trip) => isTripArchived(trip, today))
    .sort((a, b) => b.endDate.localeCompare(a.endDate));
}

export function getFeaturedTrip(today: string): Trip | undefined {
  const live = getActiveTrips(today);
  const ongoing = live.filter((trip) => getTripLifecycle(trip, today) === "ongoing");
  if (ongoing[0]) {
    return ongoing[0];
  }
  return live[0];
}
