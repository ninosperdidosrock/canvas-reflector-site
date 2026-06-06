import { queryOptions } from "@tanstack/react-query";
import { getTourEvents } from "@/lib/calendar.functions";

export const tourQueryOptions = queryOptions({
  queryKey: ["tour-events"],
  queryFn: () => getTourEvents(),
  staleTime: 60_000,
  refetchInterval: 5 * 60_000,
});
