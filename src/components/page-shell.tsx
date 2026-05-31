import { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "./site-chrome";
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
  return (
    <div className={`relative min-h-screen flex flex-col ${backgroundImage ? "" : "bg-night"}`}>
      {backgroundImage && (
        <div
          aria-hidden
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat pointer-events-none"
          style={{
            backgroundImage: `${backgroundOverlay ? `${backgroundOverlay}, ` : ""}url(${backgroundImage})`,
          }}
        />
      )}
      <div className="relative z-10 flex flex-col min-h-screen">
        <SiteHeader />
        <main className="flex-1 relative">{children}</main>
        <SiteFooter />
      </div>
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
