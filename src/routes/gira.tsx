import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { MapPin } from "lucide-react";

export const Route = createFileRoute("/gira")({
  head: () => ({
    meta: [
      { title: "Gira · Niños Perdidos" },
      { name: "description", content: "Próximos conciertos y gira de Niños Perdidos por Nunca Jamás." },
    ],
  }),
  component: Gira,
});

const upcoming = [
  { date: "06 ABR 2026", city: "MADRID", venue: "FIESTA EN COLEGIO PÚBLICO DE MADRID", time: "20:00" },
  { date: "17 MAY 2026", city: "MADRID", venue: "Mercat (Hangman's Tres)", time: "23:00" },
  { date: "08 JUN 2026", city: "MADRID", venue: "A pilú y palé Fest", time: "20:00" },
  { date: "12 JUL 2026", city: "MADRID", venue: "Fiestas de Pinguers", time: "23:00" },
  { date: "23 AGO 2026", city: "MADRID", venue: "Sala Rock-ville", time: "00:00" },
];

const past = ["29 OCT 2025", "12 OCT 2025", "06 SEP 2025", "23 AGO 2025", "12 JUL 2025"];

export default function Gira() {
  return (
    <PageShell>
      <PageHero title="GIRA" eyebrow="Rumbo a Nunca Jamás" />
      <section className="pb-16">
        <div className="container-page max-w-4xl">
          <p className="text-sm text-muted-foreground max-w-xl mb-10">
            ¡No te pierdas el viaje a Nunca Jamás! Somos el grupo perfecto para
            tu boda, las fiestas de tu pueblo o el festival que más te gusta.
          </p>

          <div className="border border-border bg-card/40 backdrop-blur divide-y divide-border">
            {upcoming.map((u) => (
              <div key={u.date} className="grid grid-cols-[120px_1fr_auto] gap-6 items-center p-5">
                <p className="text-primary text-xs uppercase tracking-[0.2em] font-semibold">{u.date}</p>
                <div>
                  <p className="flex items-center gap-2 text-foreground"><MapPin className="h-3 w-3 text-primary" /> {u.city}</p>
                  <p className="text-xs text-muted-foreground mt-0.5">{u.venue}</p>
                </div>
                <p className="text-sm tabular-nums text-foreground/80">{u.time}</p>
              </div>
            ))}
          </div>

          <div className="mt-16">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-4">CONCIERTOS ANTERIORES</p>
            <ul className="grid sm:grid-cols-2 gap-3">
              {past.map((p) => (
                <li key={p} className="flex items-center gap-3 text-sm text-muted-foreground">
                  <span className="h-px flex-1 bg-border" />
                  <span className="font-mono">{p}</span>
                  <span className="h-px flex-1 bg-border" />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
