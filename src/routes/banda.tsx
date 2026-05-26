import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";

export const Route = createFileRoute("/banda")({
  head: () => ({
    meta: [
      { title: "La Banda · Niños Perdidos" },
      { name: "description", content: "Conoce a los Niños Perdidos: la banda que toca las canciones que todo el mundo, los que han marcado infancias." },
    ],
  }),
  component: Banda,
});

const members = [
  { name: "Eva Davó", role: "Voz", img: "" },
  { name: "Ricardo 'Ric' Galán", role: "Guitarra, coros y voz", img: "" },
  { name: "Manuel Alex 'Manu'", role: "Batería", img: "" },
  { name: "Pablo G. García", role: "Bajo y coros", img: "" },
  { name: "Sergio Buendía A. PEP", role: "Guitarra y coros", img: "" },
];

export default function Banda() {
  return (
    <PageShell>
      <section className="relative pt-32 pb-16">
        <div className="container-page max-w-3xl text-center">
          <p className="font-display italic text-xl md:text-2xl text-foreground leading-relaxed">
            "Esas canciones que conoce todo el mundo, las que han marcado infancias."
          </p>
          <div className="mt-8 space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Una banda madrileña que versiona el rock las canciones más míticas
              de Disney y de las grandes películas de animación de los años 90
              y 2000. Las que padres, madres y niños pueden cantar juntos…
              pero pasadas por guitarras, batería y actitud rockera.
            </p>
            <p>
              Una forma preciosa de acercar a los más pequeños y a sus familias
              al rock, de compartir música entre generaciones. Porque el rock
              también se hereda. Porque hay canciones que todos llevamos dentro.
            </p>
            <p>
              Y porque no hay nada más bonito que ver a padres, madres, hijos
              e hijas disfrutando del mismo concierto.
            </p>
          </div>
          <p className="mt-6 text-primary text-xs uppercase tracking-[0.3em] font-sans font-semibold">
            Disney · Animación · Nostalgia · Rock para toda la familia
          </p>
          <div className="mt-8">
            <a
              href="#niños-perdidos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold"
            >
              Contrátanos para tu evento →
            </a>
          </div>
        </div>
      </section>

      <section id="niños-perdidos" className="py-16">
        <div className="container-page">
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-2">Los Somos</p>
          <h2 className="font-display italic text-4xl md:text-6xl mb-12">NIÑOS PERDIDOS</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {members.map((m) => (
              <div
                key={m.name}
                className="relative aspect-[3/4] bg-card border border-border overflow-hidden group"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-muted to-card" />
                <div className="absolute inset-x-0 bottom-0 p-5 bg-gradient-to-t from-black/80 to-transparent">
                  <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">{m.role}</p>
                  <p className="font-display italic text-xl text-foreground">{m.name}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}
