import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { tourQueryOptions } from "@/lib/tour-query";

function formatShort(iso: string) {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    timeZone: "Europe/Madrid",
  }).formatToParts(d);
  const day = parts.find((p) => p.type === "day")?.value ?? "";
  const month = (parts.find((p) => p.type === "month")?.value ?? "")
    .replace(".", "")
    .toUpperCase();
  const year = parts.find((p) => p.type === "year")?.value ?? "";
  return `${day} ${month} ${year}`;
}

export function NextGigBubble() {
  const { data } = useQuery({ ...tourQueryOptions });
  const next = data?.upcoming?.[0];
  if (!next) return null;

  return (
    <Link
      to="/gira"
      className="fixed bottom-6 left-4 sm:left-6 z-40 group flex items-center gap-3 border border-primary/40 bg-background/75 backdrop-blur-md pl-4 pr-4 sm:pr-5 py-3 shadow-lg shadow-primary/20 hover:border-primary hover:shadow-primary/30 hover:-translate-y-0.5 transition-all duration-200 max-w-[calc(100vw-8rem)]"
      aria-label="Ver el próximo concierto en la gira"
    >
      <span className="relative flex h-2.5 w-2.5 shrink-0" aria-hidden>
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60" />
        <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-primary" />
      </span>
      <span className="min-w-0">
        <span className="block text-[9px] sm:text-[10px] uppercase tracking-[0.3em] text-primary font-semibold">
          Próximo concierto
        </span>
        <span className="block truncate font-display italic text-sm sm:text-base text-foreground leading-tight">
          {formatShort(next.start)} · {next.summary}
        </span>
      </span>
      <ArrowRight className="h-4 w-4 shrink-0 text-primary group-hover:translate-x-0.5 transition-transform" />
    </Link>
  );
}
