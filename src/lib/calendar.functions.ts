import { createServerFn } from "@tanstack/react-start";

const GATEWAY_URL = "https://connector-gateway.lovable.dev/google_calendar/calendar/v3";

export type GigEvent = {
  id: string;
  start: string; // ISO datetime or YYYY-MM-DD
  end?: string;
  summary: string;
  location?: string;
  isAllDay: boolean;
};

type RawEvent = {
  id: string;
  summary?: string;
  location?: string;
  start?: { dateTime?: string; date?: string };
  end?: { dateTime?: string; date?: string };
};

async function fetchEvents(params: URLSearchParams): Promise<GigEvent[]> {
  const LOVABLE_API_KEY = process.env.LOVABLE_API_KEY;
  if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY is not configured");
  const GOOGLE_CALENDAR_API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
  if (!GOOGLE_CALENDAR_API_KEY) throw new Error("GOOGLE_CALENDAR_API_KEY is not configured");

  const calendarId = encodeURIComponent("primary");
  const url = `${GATEWAY_URL}/calendars/${calendarId}/events?${params.toString()}`;

  const res = await fetch(url, {
    headers: {
      Authorization: `Bearer ${LOVABLE_API_KEY}`,
      "X-Connection-Api-Key": GOOGLE_CALENDAR_API_KEY,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Google Calendar API failed [${res.status}]: ${text}`);
  }
  const data = (await res.json()) as { items?: RawEvent[] };
  return (data.items ?? []).map((e) => {
    const isAllDay = !!e.start?.date && !e.start?.dateTime;
    return {
      id: e.id,
      summary: e.summary ?? "(sin título)",
      location: e.location,
      start: (e.start?.dateTime ?? e.start?.date) as string,
      end: e.end?.dateTime ?? e.end?.date,
      isAllDay,
    };
  });
}

export const getTourEvents = createServerFn({ method: "GET" }).handler(async () => {
  const now = new Date();
  const sixMonthsAgo = new Date(now);
  sixMonthsAgo.setMonth(now.getMonth() - 12);
  const oneYearAhead = new Date(now);
  oneYearAhead.setFullYear(now.getFullYear() + 1);

  const upcomingParams = new URLSearchParams({
    timeMin: now.toISOString(),
    timeMax: oneYearAhead.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50",
  });
  const pastParams = new URLSearchParams({
    timeMin: sixMonthsAgo.toISOString(),
    timeMax: now.toISOString(),
    singleEvents: "true",
    orderBy: "startTime",
    maxResults: "50",
  });

  try {
    const [upcoming, past] = await Promise.all([
      fetchEvents(upcomingParams),
      fetchEvents(pastParams),
    ]);
    return { upcoming, past: past.reverse(), error: null as string | null };
  } catch (err) {
    console.error("Calendar fetch failed", err);
    return {
      upcoming: [] as GigEvent[],
      past: [] as GigEvent[],
      error: err instanceof Error ? err.message : "Unknown error",
    };
  }
});
