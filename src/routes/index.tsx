import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { PageShell } from "@/components/page-shell";
import { TestimonialsCarousel } from "@/components/testimonials-carousel";
import { Reveal } from "@/components/motion/reveal";
import { MaskLine } from "@/components/motion/split-text";
import { Magnetic } from "@/components/motion/magnetic";
import { MarqueeText } from "@/components/motion/marquee-text";
import { ArrowRight } from "lucide-react";
import logoFull from "@/assets/logo-full.png";
import bgInicio from "@/assets/bg-inicio.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Niños Perdidos · Bienvenido a Nunca Jamás" },
      { name: "description", content: "Disney · Animación · Rock · Madrid. La banda que convierte tu infancia en himnos del rock." },
      { property: "og:title", content: "Niños Perdidos · Bienvenido a Nunca Jamás" },
      { property: "og:description", content: "Disney · Animación · Rock · Madrid. La banda que convierte tu infancia en himnos del rock." },
      { property: "og:url", content: "https://xn--niosperdidos-bhb.es/" },
    ],
    links: [
      { rel: "canonical", href: "https://xn--niosperdidos-bhb.es/" },
      { rel: "preload", as: "image", href: bgInicio, fetchpriority: "high" },
      { rel: "preload", as: "image", href: logoFull, fetchpriority: "high" },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell
      backgroundImage={bgInicio}
      backgroundOverlay="linear-gradient(to bottom, oklch(0.1 0.02 180 / 0.4) 0%, oklch(0.1 0.02 180 / 0.65) 60%, oklch(0.1 0.02 180 / 0.95) 100%)"
    >
      <section className="relative min-h-[100vh] flex items-center justify-center">
        <div className="container-page text-center pt-28 pb-24">
          <motion.img
            src={logoFull}
            alt="Niños Perdidos"
            width={760}
            height={760}
            fetchPriority="high"
            decoding="async"
            className="mx-auto w-full max-w-[300px] md:max-w-[380px] h-auto mb-10 drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
            initial={{ opacity: 0, scale: 0.9, filter: "blur(14px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          />
          <h1 className="font-display italic text-7xl md:text-9xl lg:text-[10rem] leading-[0.95] text-foreground text-glow-orange">
            <MaskLine delay={0.15}>BIENVENIDO A</MaskLine>
            <MaskLine delay={0.3}>
              <span className="text-primary">NUNCA JAMÁS</span>
            </MaskLine>
          </h1>
          <Reveal delay={0.5}>
            <p className="mt-6 text-primary text-[11px] md:text-xs uppercase tracking-[0.4em] font-sans font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
              Disney · Animación · Rock · Madrid
            </p>
          </Reveal>
          <Reveal delay={0.62}>
            <div className="mt-10 flex flex-wrap gap-4 justify-center">
              <Magnetic>
                <Link
                  to="/gira"
                  className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition shadow-lg shadow-primary/30"
                >
                  Ver gira <ArrowRight className="h-4 w-4" />
                </Link>
              </Magnetic>
              <Magnetic>
                <Link
                  to="/banda"
                  className="inline-flex items-center gap-2 border border-primary text-primary bg-background/30 backdrop-blur px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-primary hover:text-primary-foreground transition"
                >
                  La Banda
                </Link>
              </Magnetic>
            </div>
          </Reveal>
          <Reveal delay={0.75}>
            <TestimonialsCarousel />
          </Reveal>
        </div>
      </section>

      <MarqueeText text="NIÑOS PERDIDOS · NUNCA JAMÁS · " repeat={4} />
    </PageShell>
  );
}
