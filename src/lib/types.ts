export type TripStatus = "active" | "archived";

export type ChecklistItem = {
  id: string;
  label: string;
  done: boolean;
};

export type ItineraryItem = {
  time: string;
  title: string;
  place?: string;
  detail?: string;
};

export type ItineraryDay = {
  day: number;
  date: string;
  title: string;
  items: ItineraryItem[];
};

export type RouteStop = {
  title: string;
  hint: string;
};

export type Lodging = {
  name: string;
  area: string;
  checkInDate: string;
  checkOutDate: string;
  earliestCheckIn?: string;
  note?: string;
};

export type NearbyKind = "attraction" | "shopping" | "food" | "practical";

export type NearbyPlace = {
  name: string;
  kind: NearbyKind;
  cluster: string;
  note: string;
  dayHint?: string;
};

export type Trip = {
  id: string;
  title: string;
  status: TripStatus;
  startDate: string;
  endDate: string;
  place: string;
  destinationId: string;
  crossing?: string;
  summary: string;
  sample?: boolean;
  lodging?: Lodging;
  nearby?: NearbyPlace[];
  route?: RouteStop[];
  itinerary: ItineraryDay[];
  notes: string[];
  checklist: ChecklistItem[];
};

export type GuideSection = {
  id: string;
  title: string;
  body: string[];
  tips?: string[];
};

export type Guide = {
  slug: string;
  title: string;
  place: string;
  excerpt: string;
  updated: string;
  sections: GuideSection[];
};

export type ArchiveReason = "status" | "end-date" | "both";

export type TripLifecycle = "upcoming" | "ongoing" | "archived";
