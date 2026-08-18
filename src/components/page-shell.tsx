import { ReactNode } from "react";
import { motion } from "motion/react";
import { SiteHeader, SiteFooter } from "./site-chrome";
import { WhatsAppFab } from "./whatsapp-fab";
import { Reveal } from "./motion/reveal";
import { SplitText } from "./motion/split-text";
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
          className="fixed inset-0 z-0 overflow-hidden pointer-events-none"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-ambient"
            style={{
              backgroundImage: `${backgroundOverlay ? `${backgroundOverlay}, ` : ""}url(${backgroundImage})`,
            }}
          />
        </div>
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
  srTitle,
  subtitle,
  children,
}: {
  eyebrow?: string;
  title: string;
  /** Extra descriptive text appended to the H1 for search engines and screen readers. */
  srTitle?: string;
  subtitle?: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative pt-36 pb-16 overflow-hidden">
      <div className="container-page text-center">
        <motion.img
          src={logoIso}
          alt=""
          className="mx-auto h-32 md:h-40 w-auto object-contain mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,0.6)]"
          initial={{ opacity: 0, y: -18, scale: 0.92 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        />
        <h1 className="font-display italic text-title-hero text-foreground text-glow-orange">
          <SplitText text={title} />
        </h1>

        {eyebrow && (
          <Reveal delay={0.25}>
            <p className="mt-4 text-primary text-xs uppercase tracking-[0.4em] font-sans font-semibold not-italic">
              {eyebrow}
            </p>
          </Reveal>
        )}
        {subtitle && (
          <Reveal delay={0.35}>
            <p className="mt-6 max-w-2xl mx-auto text-muted-foreground">
              {subtitle}
            </p>
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
