import { ReactNode, useEffect, useRef } from "react";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { WhatsAppFab } from "./whatsapp-fab";
import logoIso from "@/assets/logo-iso.png";

export function PageShell({
  children,
  backgroundImage,
  backgroundOverlay = "linear-gradient(to bottom, oklch(0.12 0.02 180 / 0.55), oklch(0.12 0.02 180 / 0.92))",
}: {
  children: ReactNode;
  backgroundImage?: string;
  backgroundOverlay?: string;
}) {
  const bgRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!backgroundImage) return;
    const el = bgRef.current;
    if (!el) return;
    const reduce = typeof window !== "undefined" && window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let raf = 0;
    const update = () => {
      raf = 0;
      const y = window.scrollY || window.pageYOffset || 0;
      el.style.transform = `translate3d(0, ${y * 0.4}px, 0) scale(1.15)`;
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, [backgroundImage]);

  return (
    <div className={`relative min-h-screen flex flex-col ${backgroundImage ? "" : "bg-night"}`}>
      {backgroundImage && (
        <div
          ref={bgRef}
          aria-hidden
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none will-change-transform"
          style={{
            backgroundImage: `${backgroundOverlay ? `${backgroundOverlay}, ` : ""}url(${backgroundImage})`,
            transform: "translate3d(0,0,0) scale(1.15)",
          }}
        />
      )}
      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 relative">{children}</main>
        <SiteFooter />
      </div>
      <WhatsAppFab />
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden">
      <div className="container-page text-center">
        <img
          src={logoIso}
          alt=""
          className="mx-auto h-32 md:h-40 w-auto object-contain mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
        />
        <h1 className="font-display italic text-6xl md:text-8xl text-foreground text-glow-orange">
          {title}
        </h1>

        {eyebrow && (
          <p className="mt-4 text-primary text-xs uppercase tracking-[0.4em] font-sans font-semibold not-italic">
            {eyebrow}
          </p>
        )}
        {subtitle && (
          <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
