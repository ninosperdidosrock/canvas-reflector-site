import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Instagram, Youtube, Menu } from "lucide-react";
import { useState } from "react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import logoText from "@/assets/logo-text.png";
import { tourQueryOptions } from "@/lib/tour-query";

const MONTHS_FOOTER = ["ENE", "FEB", "MAR", "ABR", "MAY", "JUN", "JUL", "AGO", "SEP", "OCT", "NOV", "DIC"];
function formatGigDate(iso: string) {
  const d = new Date(iso);
  return `${String(d.getDate()).padStart(2, "0")} ${MONTHS_FOOTER[d.getMonth()]} ${d.getFullYear()}`;
}

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.77-4.06h-3.2v13.6a2.59 2.59 0 1 1-1.83-2.48v-3.27a5.86 5.86 0 1 0 5.03 5.8V8.78a7.49 7.49 0 0 0 4.37 1.4V6.97a4.28 4.28 0 0 1-.6-.02z" />
    </svg>
  );
}

export function SiteHeader() {
  const [open, setOpen] = useState(false);
  const nav = [
    { to: "/", label: "Inicio" },
    { to: "/banda", label: "Banda" },
    { to: "/setlist", label: "Setlist" },
    { to: "/galeria", label: "Galería" },
    { to: "/gira", label: "Gira" },
    { to: "/magia", label: "Magia" },
    { to: "/contacto", label: "Contacto" },
  ];
  return (
    <header className="absolute top-0 left-0 right-0 z-30">
      <div className="container-page flex items-center justify-between gap-4 py-5 md:py-7">
        <Link to="/" className="flex items-center gap-3 shrink-0">
          <img
            src={logoText}
            alt="Niños Perdidos"
            className="h-12 sm:h-16 md:h-20 lg:h-24 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />
        </Link>
        <nav className="hidden lg:flex items-center gap-10 xl:gap-12">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-base xl:text-lg uppercase tracking-[0.18em] text-foreground/85 hover:text-primary transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger
            aria-label="Abrir menú"
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-foreground hover:text-primary transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
          >
            <Menu className="h-8 w-8" />
          </SheetTrigger>
          <SheetContent side="right" className="bg-surface/95 backdrop-blur border-l border-border/40 w-[85vw] sm:w-[380px]">
            <SheetTitle className="sr-only">Navegación</SheetTitle>
            <nav className="flex flex-col gap-5 mt-10">
              {nav.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="text-2xl uppercase tracking-[0.18em] text-foreground/90 hover:text-primary transition-colors"
                  activeProps={{ className: "text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
            </nav>
            <div className="flex gap-5 mt-12 text-muted-foreground">
              <a href="https://www.instagram.com/ninosperdidos.rock" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram className="h-6 w-6" /></a>
              <a href="https://www.youtube.com/@ni%C3%B1osperdidos-rock" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube className="h-6 w-6" /></a>
              <a href="https://www.tiktok.com/@ninosperdidos.rock" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-primary transition-colors"><TikTokIcon className="h-6 w-6" /></a>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SiteFooter() {
  const { data } = useQuery(tourQueryOptions);
  const next = data?.upcoming?.[0];
  const locationParts = next?.location?.split(",").map((s) => s.trim()).filter(Boolean) ?? [];
  const city = locationParts[0];
  const venue = locationParts.slice(1).join(", ");
  return (
    <footer className="border-t border-border/40 bg-surface/80 backdrop-blur mt-24 relative z-10">
      <div className="container-page py-14 grid gap-10 md:grid-cols-3">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <img src={logoText} alt="Niños Perdidos" className="h-12 object-contain" />
          </div>
          <p className="text-sm text-muted-foreground max-w-xs">
            Disney · Animación · Nostalgia · Rock. La banda madrileña que
            convierte las canciones de tu infancia en himnos del rock ⚡
          </p>
          <div className="flex gap-3 mt-5 text-muted-foreground">
            <a href="https://www.instagram.com/ninosperdidos.rock" target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-primary transition-colors"><Instagram className="h-4 w-4" /></a>
            <a href="https://www.youtube.com/@ni%C3%B1osperdidos-rock" target="_blank" rel="noreferrer" aria-label="YouTube" className="hover:text-primary transition-colors"><Youtube className="h-4 w-4" /></a>
            <a href="https://www.tiktok.com/@ninosperdidosrock" target="_blank" rel="noreferrer" aria-label="TikTok" className="hover:text-primary transition-colors"><TikTokIcon className="h-4 w-4" /></a>
          </div>

        </div>

        <div>
          <h4 className="text-primary text-xs uppercase tracking-[0.2em] mb-4 not-italic font-sans font-semibold">
            Navegación
          </h4>
          <ul className="space-y-2 text-sm text-foreground/80">
            {["Inicio","La Banda","Setlist","Galería","Gira","Magia","Contacto"].map((l,i) => {
              const to = ["/", "/banda","/setlist","/galeria","/gira","/magia","/contacto"][i];
              return (
                <li key={l}>
                  <Link to={to} className="hover:text-primary transition-colors">{l}</Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div>
          <h4 className="text-primary text-xs uppercase tracking-[0.2em] mb-4 not-italic font-sans font-semibold">
            Contrátanos
          </h4>
          <p className="text-sm text-foreground/80 mb-4">
            Bodas · Fiestas patronales · Festivales · Salas de conciertos
          </p>
          <Link
            to="/contacto"
            className="inline-flex items-center gap-2 border border-primary text-primary px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-primary hover:text-primary-foreground transition-colors"
          >
            Habla con nosotros →
          </Link>
          <Link to="/gira" className="mt-6 block group">
            <p className="text-primary text-xs uppercase tracking-[0.2em] font-sans font-semibold mb-2">
              Próximo concierto
            </p>
            {next ? (
              <>
                <p className="text-sm group-hover:text-primary transition-colors">
                  {formatGigDate(next.start)}{city ? ` · ${city}` : ""}
                </p>
                {venue && (
                  <p className="text-xs text-muted-foreground">{venue}</p>
                )}
              </>
            ) : (
              <p className="text-sm text-muted-foreground group-hover:text-primary transition-colors">
                Sin fechas anunciadas
              </p>
            )}
          </Link>

        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="container-page py-4 flex flex-wrap items-center justify-between text-xs text-muted-foreground">
          <p>© 2026 Niños Perdidos · Todos los derechos reservados</p>
          <p className="tracking-[0.2em]">NUNCA JAMÁS LLAMA HOY</p>
        </div>
      </div>
    </footer>
  );
}
