import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { Instagram, Youtube } from "lucide-react";
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
      <div className="container-page flex items-center py-7">
        <Link to="/" className="flex items-center gap-3">
          <img
            src={logoText}
            alt="Niños Perdidos"
            className="h-14 md:h-16 object-contain drop-shadow-[0_2px_8px_rgba(0,0,0,0.5)]"
          />
        </Link>
        <nav className="hidden md:flex items-center gap-9 ml-auto">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="text-sm uppercase tracking-[0.2em] text-foreground/85 hover:text-primary transition-colors drop-shadow-[0_1px_2px_rgba(0,0,0,0.8)]"
              activeProps={{ className: "text-primary" }}
              activeOptions={{ exact: n.to === "/" }}
            >
              {n.label}
            </Link>
          ))}
        </nav>
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
          <div className="mt-6">
            <p className="text-primary text-xs uppercase tracking-[0.2em] font-sans font-semibold mb-2">
              Próximo concierto
            </p>
            <p className="text-sm">06 Abr 2026 · Madrid</p>
            <p className="text-xs text-muted-foreground">Sala Caelius Solitaria</p>
          </div>
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
