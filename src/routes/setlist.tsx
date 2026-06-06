import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import bgSetlist from "@/assets/bg-setlist.png";
import carteAsset from "@/assets/se-busca-garfio.jpg.asset.json";
import iconReyLeon from "@/assets/setlist-icons/rey-leon.png.asset.json";
import iconFrozen from "@/assets/setlist-icons/frozen.png.asset.json";
import iconMulan from "@/assets/setlist-icons/mulan.png.asset.json";
import iconBlancanieves from "@/assets/setlist-icons/blancanieves.png.asset.json";
import iconToyStory from "@/assets/setlist-icons/toy-story.png.asset.json";
import iconAladdin from "@/assets/setlist-icons/aladdin.png.asset.json";
import iconSirenita from "@/assets/setlist-icons/sirenita.png.asset.json";
import iconHercules from "@/assets/setlist-icons/hercules.png.asset.json";
import iconTarzan from "@/assets/setlist-icons/tarzan.png.asset.json";
import iconMas from "@/assets/setlist-icons/mas.png.asset.json";

export const Route = createFileRoute("/setlist")({
  head: () => ({
    meta: [
      { title: "Setlist · Niños Perdidos" },
      { name: "description", content: "El setlist de los Niños Perdidos: canciones de Disney pasadas por el filtro del rock." },
    ],
  }),
  component: Setlist,
});


const symbols = [
  { label: "El Rey León", url: iconReyLeon.url },
  { label: "Frozen", url: iconFrozen.url },
  { label: "Mulán", url: iconMulan.url },
  { label: "Blancanieves", url: iconBlancanieves.url },
  { label: "Toy Story", url: iconToyStory.url },
  { label: "Aladdín", url: iconAladdin.url },
  { label: "La Sirenita", url: iconSirenita.url },
  { label: "Hércules", url: iconHercules.url },
  { label: "Tarzán", url: iconTarzan.url },
  { label: "…y mucho más", url: iconMas.url },
];

export default function Setlist() {
  return (
    <PageShell backgroundImage={bgSetlist}>
      <PageHero title="SETLIST" />
      <section className="pb-24">
        <div className="container-page grid lg:grid-cols-[1.4fr_1fr] gap-12 items-start">
          <div>
            <div className="mb-10">
              <p className="text-primary text-xs uppercase tracking-[0.4em] font-sans font-semibold">
                Universos que pisamos
              </p>
              <h2 className="mt-4 font-display italic text-4xl md:text-5xl text-foreground text-glow-orange">
                LOS SÍMBOLOS
              </h2>
            </div>

            <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
              {symbols.map((s) => (
                <li
                  key={s.label}
                  className="group flex flex-col items-center justify-center gap-3 rounded-md border border-border/40 bg-surface/40 backdrop-blur-sm p-6 transition-all duration-300 hover:border-primary/50 hover:bg-surface/60 hover:shadow-[0_0_30px_oklch(0.9_0.05_80/0.25)]"
                >
                  <img
                    src={s.url}
                    alt={`Símbolo de ${s.label}`}
                    loading="lazy"
                    width={1024}
                    height={1024}
                    className="h-20 w-20 object-contain [filter:invert(1)] opacity-90 group-hover:opacity-100 transition-opacity"
                  />
                  <span className="font-display italic text-sm text-foreground/80 text-center">
                    {s.label}
                  </span>
                </li>
              ))}
            </ul>

            <p className="mt-12 max-w-2xl text-base text-muted-foreground leading-relaxed">
              Los temas de las películas de animación más reconocidas con el "filtro rockero" que las transforman en más épicas, si cabe.
            </p>
          </div>

          <aside className="flex justify-center lg:justify-end lg:sticky lg:top-28">
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
