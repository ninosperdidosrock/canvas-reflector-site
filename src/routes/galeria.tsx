import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería · Niños Perdidos" },
      { name: "description", content: "Momentos del escenario: fotos en directo de Niños Perdidos." },
    ],
  }),
  component: Galeria,
});

export default function Galeria() {
  const tiles = Array.from({ length: 8 });
  return (
    <PageShell>
      <PageHero title="GALERÍA" eyebrow="Momentos del escenario" />
      <section className="pb-24">
        <div className="container-page grid grid-cols-2 md:grid-cols-4 gap-3">
          {tiles.map((_, i) => (
            <div
              key={i}
              className={`relative bg-card border border-border overflow-hidden ${
                i % 5 === 0 ? "row-span-2 aspect-[3/4]" : "aspect-square"
              }`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-muted via-card to-surface" />
            </div>
          ))}
        </div>
      </section>
    </PageShell>
  );
}
