import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { ArrowRight } from "lucide-react";
import logoFull from "@/assets/logo-full.png";
import bgInicio from "@/assets/bg-inicio.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Niños Perdidos · Bienvenido a Nunca Jamás" },
      { name: "description", content: "Disney · Animación · Rock · Madrid. La banda que convierte tu infancia en himnos del rock." },
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
          <img
            src={logoFull}
            alt="Niños Perdidos"
            className="mx-auto w-full max-w-[200px] md:max-w-[240px] mb-8 drop-shadow-[0_8px_24px_rgba(0,0,0,0.7)]"
          />
          <h1 className="font-display italic text-6xl md:text-8xl lg:text-9xl leading-[0.95] text-foreground text-glow-orange">
            BIENVENIDO A<br />
            <span className="text-primary">NUNCA JAMÁS</span>
          </h1>
          <p className="mt-6 text-primary text-[11px] md:text-xs uppercase tracking-[0.4em] font-sans font-semibold drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
            Disney · Animación · Rock · Madrid
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/gira"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition shadow-lg shadow-primary/30"
            >
              Ver gira <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/banda"
              className="inline-flex items-center gap-2 border border-primary text-primary bg-background/30 backdrop-blur px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-primary hover:text-primary-foreground transition"
            >
              La Banda
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
