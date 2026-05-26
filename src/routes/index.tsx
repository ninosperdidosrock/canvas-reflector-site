import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell } from "@/components/page-shell";
import { ArrowRight } from "lucide-react";

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
    <PageShell>
      <section className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,oklch(0.28_0.06_60/.35),transparent_60%),radial-gradient(ellipse_at_top,oklch(0.25_0.04_180),oklch(0.12_0.02_180))]" />
        {/* Faux silhouette tree backdrop */}
        <div className="absolute inset-x-0 bottom-0 -z-10 h-1/2 bg-[linear-gradient(to_top,oklch(0.1_0.02_180)_10%,transparent)]" />

        <div className="container-page text-center pt-32 pb-24">
          <div className="inline-flex flex-col items-center mb-8">
            <div className="h-20 w-20 rounded-full border-2 border-primary flex items-center justify-center text-primary font-display italic text-2xl mb-3">
              NP
            </div>
            <span className="font-display italic text-primary text-2xl tracking-wider">
              NIÑOS PERDIDOS
            </span>
          </div>
          <h1 className="font-display italic text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-glow-orange">
            BIENVENIDO A<br />
            <span className="text-primary">NUNCA JAMÁS</span>
          </h1>
          <p className="mt-6 text-primary text-xs uppercase tracking-[0.4em] font-sans font-semibold">
            Disney · Animación · Rock · Madrid
          </p>
          <div className="mt-10 flex flex-wrap gap-4 justify-center">
            <Link
              to="/gira"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:brightness-110 transition"
            >
              Ver gira <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/banda"
              className="inline-flex items-center gap-2 border border-primary text-primary px-7 py-3 text-sm uppercase tracking-[0.2em] font-semibold hover:bg-primary hover:text-primary-foreground transition"
            >
              La Banda
            </Link>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
