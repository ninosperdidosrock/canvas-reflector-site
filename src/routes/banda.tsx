import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { Reveal, StaggerGroup, StaggerItem } from "@/components/motion/reveal";
import { SplitText } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { MarqueeText } from "@/components/motion/marquee-text";
import { ParallaxImage } from "@/components/motion/parallax-image";
import gaiaImg from "@/assets/banda-gaia.jpg";
import rickImg from "@/assets/banda-rick.jpg";
import manuImg from "@/assets/banda-manu.jpg";
import ridruImg from "@/assets/banda-ridru.jpg";
import hectorImg from "@/assets/banda-hector.jpg";
import bgBanda from "@/assets/bg-contacto.png";

export const Route = createFileRoute("/banda")({
  head: () => ({
    meta: [
      { title: "La Banda · Niños Perdidos" },
      { name: "description", content: "Conoce a Niños Perdidos, la banda madrileña que convierte canciones míticas de la infancia en himnos de rock para toda la familia." },
      { property: "og:title", content: "La Banda · Niños Perdidos" },
      { property: "og:description", content: "Conoce a los cinco Niños Perdidos: la banda madrileña que convierte canciones míticas de la infancia en himnos de rock." },
      { property: "og:url", content: "https://canvas-reflector-site.lovable.app/banda" },
    ],
    links: [
      { rel: "canonical", href: "https://canvas-reflector-site.lovable.app/banda" },
    ],
  }),
  component: Banda,
});

const members = [
  { name: "Gaia Bravo \"Gato\"", role: "Voz principal", img: gaiaImg },
  { name: "Manuel Alejo \"Manu\"", role: "Batería", img: manuImg },
  { name: "Javier Ridruejo \"Ridru\"", role: "Bajo", img: ridruImg },
  { name: "Ricardo Galán \"Rick\"", role: "Guitarra rítmica y voz", img: rickImg },
  { name: "Héctor Alonso \"Mike\"", role: "Guitarra principal", img: hectorImg },
];


export default function Banda() {
  return (
    <PageShell backgroundImage={bgBanda}>
      <PageHero title="LA BANDA" eyebrow="Disney · Animación · Nostalgia · Rock" />
      <section className="pb-16">
        <div className="container-page max-w-3xl text-center">
          <Reveal>
            <p className="font-display italic text-xl md:text-2xl text-foreground leading-relaxed">
              "Esas canciones que conoce todo el mundo, las que han marcado infancias."
            </p>
          </Reveal>
          <StaggerGroup className="mt-8 space-y-4 text-muted-foreground text-base leading-relaxed">
            <StaggerItem>
              <p>
                Una banda madrileña que versiona al rock las canciones más míticas
                de Disney y de las grandes películas de animación de los años 90
                y 2000, para que familias enteras puedan cantarlas juntas.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Niños Perdidos mezcla nostalgia, potencia y sentido del espectáculo
                para convertir cada concierto en una fiesta compartida entre generaciones.
              </p>
            </StaggerItem>
            <StaggerItem>
              <p>
                Porque el rock también se hereda, y hay melodías que todos llevamos dentro.
              </p>
            </StaggerItem>
          </StaggerGroup>
          <Reveal delay={0.15}>
            <div className="mt-8">
              <Magnetic>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold"
                >
                  Contrátanos para tu evento →
                </Link>
              </Magnetic>
            </div>
          </Reveal>
        </div>
      </section>

      <MarqueeText text="NIÑOS PERDIDOS · " repeat={5} reverse />

      <section id="ninos-perdidos" className="py-16">
        <div className="container-page">
          <Reveal>
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-2">La banda</p>
          </Reveal>
          <h2 className="font-display italic text-3xl md:text-5xl mb-12">
            <SplitText text="NIÑOS PERDIDOS" />
          </h2>
          <StaggerGroup className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
            {members.slice(0, 3).map((m) => (
              <StaggerItem key={m.name}>
                <MemberCard member={m} />
              </StaggerItem>
            ))}
          </StaggerGroup>
          <StaggerGroup className="grid sm:grid-cols-2 gap-6 mt-6 md:max-w-[66%] md:mx-auto">
            {members.slice(3).map((m) => (
              <StaggerItem key={m.name}>
                <MemberCard member={m} />
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </section>
    </PageShell>
  );
}

function MemberCard({ member }: { member: { name: string; role: string; img: string } }) {
  return (
    <article
      data-cursor="Banda"
      className="relative aspect-[3/4] bg-card border border-border overflow-hidden group transition-all duration-500 hover:border-primary/70 hover:-translate-y-1"
    >
      <ParallaxImage
        src={member.img}
        alt={member.name}
        amount={6}
        className="transition-transform duration-700 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/85" />
      <div className="absolute inset-x-0 bottom-0 p-5 transition-transform duration-500 group-hover:-translate-y-1">
        <p className="text-primary text-xs md:text-sm uppercase tracking-[0.3em] font-semibold">{member.role}</p>
        <p className="font-display italic text-2xl md:text-3xl text-foreground">{member.name}</p>
      </div>
    </article>
  );
}

