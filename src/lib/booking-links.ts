export type BookingSearchInput = {
  origin: string;
  destination: string;
  hotelQuery: string;
  departDate: string;
  returnDate: string;
};

export type OutboundLink = {
  id: string;
  label: string;
  href: string;
  kind: "flight" | "hotel";
  note: string;
};

function compactDate(iso: string): string {
  return iso.replaceAll("-", "").slice(2);
}

export function buildOutboundLinks(input: BookingSearchInput): OutboundLink[] {
  const { origin, destination, hotelQuery, departDate, returnDate } = input;
  const originCode = origin.trim().toUpperCase();
  const destCode = destination.trim().toUpperCase();
  const hotel = hotelQuery.trim();
  const flightQuery = `Flights from ${originCode} to ${destCode} on ${departDate} returning ${returnDate}`;

  return [
    {
      id: "google-flights",
      label: "Google 航班",
      kind: "flight",
      href: `https://www.google.com/travel/flights?hl=zh-HK&curr=HKD&q=${encodeURIComponent(flightQuery)}`,
      note: "外連搜尋 · 非即時報價",
    },
    {
      id: "skyscanner",
      label: "Skyscanner",
      kind: "flight",
      href: `https://www.skyscanner.com.hk/transport/flights/${originCode.toLowerCase()}/${destCode.toLowerCase()}/${compactDate(departDate)}/${compactDate(returnDate)}/`,
      note: "外連搜尋 · 非即時報價",
    },
    {
      id: "booking",
      label: "Booking.com",
      kind: "hotel",
      href: `https://www.booking.com/searchresults.zh-tw.html?ss=${encodeURIComponent(hotel)}&checkin=${departDate}&checkout=${returnDate}&lang=zh-tw`,
      note: "外連搜尋 · 非即時報價",
    },
    {
      id: "hotels",
      label: "Hotels.com",
      kind: "hotel",
      href: `https://hk.hotels.com/Hotel-Search?destination=${encodeURIComponent(hotel)}&startDate=${departDate}&endDate=${returnDate}&locale=zh_HK`,
      note: "外連搜尋 · 非即時報價",
    },
    {
      id: "trip",
      label: "Trip.com",
      kind: "hotel",
      href: `https://hk.trip.com/hotels/list?cityName=${encodeURIComponent(hotel)}&checkin=${departDate}&checkout=${returnDate}&locale=zh-HK`,
      note: "外連搜尋 · 非即時報價",
    },
  ];
}
