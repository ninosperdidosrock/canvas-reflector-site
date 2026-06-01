import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import bgSetlist from "@/assets/bg-setlist.png";
import carteAsset from "@/assets/se-busca-garfio.jpg.asset.json";

export const Route = createFileRoute("/setlist")({
  head: () => ({
    meta: [
      { title: "Setlist · Niños Perdidos" },
      { name: "description", content: "El setlist de los Niños Perdidos: canciones de Disney pasadas por el filtro del rock." },
    ],
  }),
  component: Setlist,
});

const songs = [
  "El Rey León", "Frozen", "Mulán", "Blancanieves", "Toy Story",
  "Aladdín", "La Sirenita", "Hércules", "Tarzán", "Mulán",
  "…y mucho más",
];

export default function Setlist() {
  return (
    <PageShell backgroundImage={bgSetlist}>
      <PageHero title="SETLIST" />
      <section className="pb-24">
        <div className="container-page grid md:grid-cols-[1fr_1.1fr] gap-12 items-start">
          <div>
            <p className="text-sm text-muted-foreground max-w-md mb-8">
              Cogemos los temas que crecieron con nosotros y los convertimos en
              el disco de rock más enérgico y rebelde que has escuchado. Nunca
              Jamás es el rock de los niños perdidos de Nunca Jamás.
            </p>
            <ul className="space-y-3">
              {songs.map((s, i) => (
                <li key={i} className="flex items-center gap-4 font-display italic text-lg text-foreground/90">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {s.toUpperCase()}
                </li>
              ))}
            </ul>
          </div>

          <aside className="flex justify-center">
            <img
              src={carteAsset.url}
              alt="Cartel Se busca: Capitán Garfio"
              className="w-full max-w-md h-auto shadow-2xl"
            />
          </aside>
        </div>
      </section>
    </PageShell>
  );
}
