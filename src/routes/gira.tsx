import { createFileRoute } from "@tanstack/react-router";
import { queryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { PageShell, PageHero } from "@/components/page-shell";
import { MapPin } from "lucide-react";
import bgGira from "@/assets/bg-gira.png";
import { getTourEvents, type GigEvent } from "@/lib/calendar.functions";

const tourQueryOptions = queryOptions({
  queryKey: ["tour-events"],
  queryFn: () => getTourEvents(),
  staleTime: 60_000,
  refetchInterval: 5 * 60_000,
});

export const Route = createFileRoute("/gira")({
  head: () => ({
    meta: [
      { title: "Gira · Niños Perdidos" },
      { name: "description", content: "Próximos conciertos y gira de Niños Perdidos por Nunca Jamás." },
    ],
  }),
  loader: ({ context }) => context.queryClient.ensureQueryData(tourQueryOptions),
  component: Gira,
});

const MONTHS = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];

function formatDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
}

function formatTime(iso: string, isAllDay: boolean) {
  if (isAllDay) return "—";
  const d = new Date(iso);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

function extractCity(location?: string) {
  if (!location) return "MADRID";
  const parts = location.split(",").map((p) => p.trim()).filter(Boolean);
  return (parts[parts.length - 2] ?? parts[0] ?? "").toUpperCase();
}

function Gira() {
  const { data } = useSuspenseQuery(tourQueryOptions);
  const { upcoming, past, error } = data;

  return (
    <PageShell backgroundImage={bgGira}>
      <PageHero title="GIRA" eyebrow="Rumbo a Nunca Jamás" />
      <section className="pb-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm text-muted-foreground max-w-xl mb-10">
            ¡No te pierdas el viaje a Nunca Jamás! Somos el grupo perfecto para
            tu boda, las fiestas de tu pueblo o el festival que más te gusta.
          </p>

          {error && (
            <div className="mb-6 border border-destructive/40 bg-destructive/10 text-destructive text-xs p-3">
              No se pudo cargar el calendario en vivo. Revisa la conexión de Google Calendar.
            </div>
          )}

          {upcoming.length === 0 ? (
            <p className="text-sm text-muted-foreground italic">No hay fechas próximas anunciadas.</p>
          ) : (
            <div className="border border-border bg-card/40 backdrop-blur divide-y divide-border">
              {upcoming.map((u: GigEvent) => (
                <div key={u.id} className="grid grid-cols-1 md:grid-cols-[140px_1fr_auto] gap-4 md:gap-6 items-start md:items-center p-5">
                  <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold">
                    {formatDate(u.start)}
                  </p>
                  <div className="min-w-0">
                    <p className="font-display italic text-xl text-foreground">{u.summary}</p>
                    {u.location && (
                      <p className="mt-1 flex items-start gap-2 text-sm text-muted-foreground">
                        <MapPin className="h-3.5 w-3.5 text-primary shrink-0 mt-0.5" />
                        <span>{u.location}</span>
                      </p>
                    )}
                  </div>
                  <div className="flex items-center gap-4 md:justify-end">
                    <p className="text-sm tabular-nums text-foreground/80">{formatTime(u.start, u.isAllDay)}</p>
                    {u.ticketUrl && (
                      <a
                        href={u.ticketUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 text-[11px] uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition"
                      >
                        Entradas →
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}


          {past.length > 0 && (
            <div className="mt-16">
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">CONCIERTOS ANTERIORES</p>
              <ul className="grid sm:grid-cols-2 gap-3">
                {past.map((p) => (
                  <li key={p.id} className="flex items-center gap-3 text-sm text-muted-foreground">
                    <span className="h-px flex-1 bg-border" />
                    <span className="font-mono">{formatDate(p.start)}</span>
                    <span className="h-px flex-1 bg-border" />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </section>
    </PageShell>
  );
}
