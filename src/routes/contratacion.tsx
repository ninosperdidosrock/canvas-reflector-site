import { createFileRoute, Link } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { Reveal } from "@/components/motion/reveal";
import { Mail, FileDown, MapPin, Clock, Users, Music, Sparkles } from "lucide-react";
import bgAsset from "@/assets/bg-contacto.webp.asset.json";
import riderAsset from "@/assets/rider-tecnico.pdf.asset.json";

const bg = bgAsset.url;
const RIDER_URL = riderAsset.url;
const CONTACT_EMAIL = "contacto@niñosperdidos.es";
const WHATSAPP_NUMBER = "34677760670";
const WHATSAPP_MESSAGE =
  "Hola Niños Perdidos, soy organizador/a de un evento y me gustaría pedir presupuesto y disponibilidad.";

export const Route = createFileRoute("/contratacion")({
  head: () => ({
    meta: [
      { title: "Contratación de grupos para fiestas y festivales · Niños Perdidos" },
      {
        name: "description",
        content:
          "Banda de rock con canciones Disney y de animación para fiestas patronales, festivales y eventos. Show familiar y milenial, rider técnico descargable y desplazamiento a toda España.",
      },
      { property: "og:title", content: "Contratación · Niños Perdidos" },
      {
        property: "og:description",
        content:
          "Grupo de versiones rock de Disney y animación para ayuntamientos, promotores y festivales. Rider técnico, formato de show y contacto directo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "https://xn--niosperdidos-bhb.es/contratacion" },
    ],
    links: [{ rel: "canonical", href: "https://xn--niosperdidos-bhb.es/contratacion" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "MusicGroup",
          name: "Niños Perdidos",
          genre: ["Rock", "Versiones", "Música Disney"],
          url: "https://xn--niosperdidos-bhb.es",
          foundingLocation: { "@type": "Place", name: "Madrid, España" },
          areaServed: { "@type": "Country", name: "España" },
          email: CONTACT_EMAIL,
          sameAs: [
            "https://www.instagram.com/ninosperdidos.rock",
            "https://www.tiktok.com/@ninosperdidos.rock",
            "https://www.youtube.com/@ni%C3%B1osperdidos-rock",
          ],
        }),
      },
    ],
  }),
  component: Contratacion,
});

const FIT = [
  {
    Icon: Users,
    title: "Público de 8 a 80",
    text: "Los niños reconocen las canciones y sus padres las cantan de memoria. Un mismo show que funciona para toda la plaza.",
  },
  {
    Icon: Music,
    title: "Rock de verdad, repertorio conocido",
    text: "Clásicos Disney y de animación llevados al rock: nadie necesita conocer la banda para cantar desde el primer tema.",
  },
  {
    Icon: Sparkles,
    title: "Encaja en cualquier cartel",
    text: "Fiestas patronales, festivales, salas, ferias, eventos corporativos y bodas. Nostalgia milenial sin bajar la energía.",
  },
];

const LOGISTICS = [
  { Icon: Users, label: "Formación", value: "5 músicos en escena (voz, dos guitarras, bajo y batería)" },
  { Icon: Clock, label: "Duración", value: "Show adaptable; se cierra con el organizador según cartel" },
  { Icon: MapPin, label: "Desplazamiento", value: "Nos desplazamos a todos los rincones de España" },
  { Icon: FileDown, label: "Producción", value: "Rider técnico y necesidades de escenario en PDF" },
];

function Contratacion() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <PageShell backgroundImage={bg}>
      <PageHero
        title="CONTRATACIÓN"
        srTitle="Contratación de Niños Perdidos para fiestas patronales, festivales y eventos en toda España"
        eyebrow="Promotores · Ayuntamientos · Festivales"
        subtitle="Un directo rock de canciones Disney y de animación pensado para llenar plazas: nostalgia milenial, formato familiar y producción sencilla."
      />

      <section className="pb-16">
        <div className="container-page grid md:grid-cols-3 gap-4">
          {FIT.map((f, i) => (
            <Reveal key={f.title} delay={0.05 * i}>
              <div className="h-full border border-border bg-card/40 backdrop-blur p-6">
                <f.Icon className="h-7 w-7 text-primary mb-4" />
                <h2 className="font-display italic text-title-section leading-tight mb-3">{f.title}</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">{f.text}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page">
          <Reveal>
            <h2 className="font-display italic text-title-section mb-6">DATOS DE PRODUCCIÓN</h2>
          </Reveal>
          <div className="grid sm:grid-cols-2 gap-4">
            {LOGISTICS.map((l, i) => (
              <Reveal key={l.label} delay={0.05 * i}>
                <div className="flex gap-4 border border-border bg-card/40 backdrop-blur p-5 h-full">
                  <l.Icon className="h-5 w-5 text-primary shrink-0 mt-1" />
                  <div>
                    <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold mb-1">
                      {l.label}
                    </p>
                    <p className="text-sm text-foreground/85">{l.value}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page grid lg:grid-cols-2 gap-6">
          <Reveal>
            <div className="border border-primary/40 bg-card/50 backdrop-blur p-8 h-full flex flex-col justify-between gap-6">
              <div>
                <h2 className="font-display italic text-title-section mb-3">RIDER TÉCNICO</h2>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Descarga el rider técnico 2026 con backline, canales de sonido y necesidades de escenario
                  para valorarlo con tu equipo de producción.
                </p>
              </div>
              <a
                href={RIDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 self-start border border-primary text-primary px-5 py-3 text-xs uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <FileDown className="h-4 w-4" /> Descargar rider (PDF)
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="border border-primary/40 bg-card/50 backdrop-blur p-8 h-full flex flex-col justify-between gap-6">
              <div>
                <h2 className="font-display italic text-title-section mb-3">PIDE DISPONIBILIDAD</h2>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4">
                  Dinos fecha, localidad y tipo de evento y te respondemos con disponibilidad y presupuesto.
                </p>
                <p className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-primary" />
                  <a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors break-all">
                    {CONTACT_EMAIL}
                  </a>
                </p>
              </div>
              <div className="flex flex-wrap gap-3">
                <a
                  href={waHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-[#25D366] text-white px-5 py-3 text-xs uppercase tracking-[0.25em] font-semibold hover:brightness-110 transition"
                >
                  WhatsApp directo
                </a>
                <Link
                  to="/contacto"
                  className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-3 text-xs uppercase tracking-[0.25em] hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  Más formas de contacto
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </PageShell>
  );
}
