import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import gaiaImg from "@/assets/banda-gaia.jpg";
import rickImg from "@/assets/banda-rick.jpg";
import manuImg from "@/assets/banda-manu.jpg";
import ridruImg from "@/assets/banda-ridru.jpg";
import hectorImg from "@/assets/banda-hector.jpg";
import bgBanda from "@/assets/bg-banda.png";

export const Route = createFileRoute("/banda")({
  head: () => ({
    meta: [
      { title: "La Banda · Niños Perdidos" },
      { name: "description", content: "Conoce a Niños Perdidos, la banda madrileña que convierte canciones míticas de la infancia en himnos de rock para toda la familia." },
    ],
  }),
  component: Banda,
});

const members = [
  { name: "Gaia Bravo", role: "Voz principal", img: gaiaImg },
  { name: "Ricardo Galán \"Rick\"", role: "Guitarra rítmica y voz", img: rickImg },
  { name: "Manu Alejo", role: "Batería", img: manuImg },
  { name: "Javier Ridruejo \"Ridru\"", role: "Bajo", img: ridruImg },
  { name: "Héctor Alonso", role: "Guitarra principal", img: hectorImg },
];

export default function Banda() {
  return (
    <PageShell backgroundImage={bgBanda}>
      <section className="relative pt-32 pb-16">
        <div className="container-page max-w-3xl text-center">
          <p className="font-display italic text-xl md:text-2xl text-foreground leading-relaxed">
            "Esas canciones que conoce todo el mundo, las que han marcado infancias."
          </p>
          <div className="mt-8 space-y-4 text-muted-foreground text-sm leading-relaxed">
            <p>
              Una banda madrileña que versiona al rock las canciones más míticas
              de Disney y de las grandes películas de animación de los años 90
              y 2000, para que familias enteras puedan cantarlas juntas.
            </p>
            <p>
              Niños Perdidos mezcla nostalgia, potencia y sentido del espectáculo
              para convertir cada concierto en una fiesta compartida entre generaciones.
            </p>
            <p>
              Porque el rock también se hereda, y hay melodías que todos llevamos dentro.
            </p>
          </div>
          <p className="mt-6 text-primary text-xs uppercase tracking-[0.3em] font-sans font-semibold">
            Disney · Animación · Nostalgia · Rock para toda la familia
          </p>
          <div className="mt-8">
            <a
              href="#ninos-perdidos"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold"
            >
              Contrátanos para tu evento →
            </a>
          </div>
        </div>
      </section>

      <section id="ninos-perdidos" className="py-16">
        <div className="container-page">
          <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-2">La banda</p>
          <h2 className="font-display italic text-4xl md:text-6xl mb-12">NIÑOS PERDIDOS</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {members.map((m) => (
              <article
                key={m.name}
                className="relative aspect-[3/4] bg-card border border-border overflow-hidden group"
              >
                <img
                  src={m.img}
                  alt={m.name}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/85" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">{m.role}</p>
                  <p className="font-display italic text-xl text-foreground">{m.name}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </PageShell>
  );
}

