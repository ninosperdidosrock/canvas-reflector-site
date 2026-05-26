import { ReactNode } from "react";
import { SiteHeader, SiteFooter } from "./site-chrome";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-night flex flex-col">
      <SiteHeader />
      <main className="flex-1">{children}</main>
      <SiteFooter />
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
    <section className="relative pt-40 pb-20 overflow-hidden">
      <div className="absolute inset-0 -z-10 opacity-30 bg-[radial-gradient(circle_at_30%_20%,oklch(0.35_0.05_180),transparent_60%),radial-gradient(circle_at_80%_60%,oklch(0.3_0.06_60/.4),transparent_60%)]" />
      <div className="container-page text-center">
        <div className="inline-flex h-14 w-14 rounded-full border-2 border-primary/70 mb-6 items-center justify-center text-primary font-display italic">
          NP
        </div>
        <h1 className="font-display italic text-5xl md:text-7xl text-foreground text-glow-orange">
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
