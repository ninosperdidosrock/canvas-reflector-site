import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { Mail, Instagram, Youtube } from "lucide-react";
import bgContacto from "@/assets/bg-banda.png";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Niños Perdidos" },
      { name: "description", content: "Contrataciones y prensa para Niños Perdidos. Bodas, fiestas patronales, festivales y salas." },
    ],
  }),
  component: Contacto,
});

const CONTACT_EMAIL = "contacto@niñosperdidos.es";
const WHATSAPP_NUMBER = "34677760670";
const WHATSAPP_MESSAGE = "¡Hola Niños Perdidos! Me gustaría hablar con vosotros sobre un evento.";

function TikTokIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.82a4.28 4.28 0 0 1-3.77-4.06h-3.2v13.6a2.59 2.59 0 1 1-1.83-2.48v-3.27a5.86 5.86 0 1 0 5.03 5.8V8.78a7.49 7.49 0 0 0 4.37 1.4V6.97a4.28 4.28 0 0 1-.6-.02z" />
    </svg>
  );
}

const SOCIALS = [
  {
    label: "Instagram",
    handle: "@ninosperdidos.rock",
    href: "https://www.instagram.com/ninosperdidos.rock",
    Icon: Instagram,
  },
  {
    label: "YouTube",
    handle: "@niñosperdidos-rock",
    href: "https://www.youtube.com/@ni%C3%B1osperdidos-rock",
    Icon: Youtube,
  },
  {
    label: "TikTok",
    handle: "@ninosperdidosrock",
    href: "https://www.tiktok.com/@ninosperdidosrock",
    Icon: TikTokIcon,
  },
];

export default function Contacto() {
  const waHref = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;

  return (
    <PageShell backgroundImage={bgContacto}>
      <PageHero title="CONTACTO" eyebrow="Contrataciones & Prensa" />

      <section className="pb-12">
        <div className="container-page">
          <div className="grid sm:grid-cols-3 gap-4">
            {SOCIALS.map(({ label, handle, href, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 border border-border bg-card/40 backdrop-blur p-5 hover:border-primary hover:bg-card/70 transition-colors"
              >
                <Icon className="h-7 w-7 text-primary shrink-0 transition-transform group-hover:scale-110" />
                <div className="min-w-0">
                  <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">
                    {label}
                  </p>
                  <p className="text-sm text-foreground/90 truncate">{handle}</p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <h2 className="font-display italic text-3xl md:text-5xl mb-4">
              SOMOS EL GRUPO PERFECTO PARA TU EVENTO
            </h2>
            <p className="text-base text-muted-foreground leading-relaxed mb-8">
              Bodas, fiestas patronales, festivales y salas de conciertos.
              ¿Preparando el viaje a Nunca Jamás? El Capitán responde cuando le
              da la gana — pero responde.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-primary" />
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="hover:text-primary transition-colors break-all"
                >
                  {CONTACT_EMAIL}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Instagram className="h-4 w-4 text-primary" />
                <a
                  href="https://www.instagram.com/ninosperdidos.rock"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-primary transition-colors"
                >
                  @ninosperdidos.rock
                </a>
              </li>
            </ul>

            <div className="mt-10 border border-primary/40 p-5">
              <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-3">¿Para qué?</p>
              <ul className="space-y-1.5 text-sm text-foreground/80">
                <li>• Bodas</li>
                <li>• Fiestas patronales</li>
                <li>• Festivales</li>
                <li>• Salas de conciertos</li>
                <li>• Eventos corporativos</li>
              </ul>
            </div>
          </div>

          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center justify-center gap-6 border border-primary/30 bg-card/50 backdrop-blur p-8 md:p-12 text-center hover:border-primary hover:bg-card/70 transition-all"
          >
            <div className="flex items-center justify-center w-20 h-20 rounded-full bg-[#25D366]/20 ring-1 ring-[#25D366]/40">
              <svg
                viewBox="0 0 32 32"
                fill="currentColor"
                aria-hidden="true"
                className="h-10 w-10 text-[#25D366]"
              >
                <path d="M16.003 3C9.374 3 4 8.373 4 15c0 2.385.696 4.604 1.895 6.475L4 29l7.7-1.864A11.94 11.94 0 0 0 16.003 27C22.632 27 28 21.627 28 15S22.632 3 16.003 3Zm0 21.799a9.81 9.81 0 0 1-4.992-1.365l-.358-.213-4.572 1.107 1.124-4.452-.234-.371A9.74 9.74 0 0 1 6.2 15c0-5.404 4.401-9.799 9.802-9.799S25.8 9.596 25.8 15s-4.398 9.799-9.797 9.799Zm5.376-7.34c-.294-.148-1.74-.86-2.01-.959-.27-.099-.467-.148-.664.149-.196.296-.762.96-.935 1.157-.172.197-.345.222-.639.074-.294-.148-1.243-.458-2.367-1.462-.875-.781-1.466-1.745-1.639-2.041-.172-.296-.018-.456.13-.604.133-.133.294-.345.442-.518.148-.172.197-.296.295-.493.099-.197.05-.37-.025-.518-.074-.148-.664-1.6-.91-2.193-.24-.576-.485-.498-.664-.508l-.566-.01c-.197 0-.518.074-.79.37-.27.296-1.034 1.01-1.034 2.462s1.059 2.855 1.207 3.052c.148.197 2.085 3.184 5.05 4.464.706.305 1.256.487 1.685.624.708.225 1.353.193 1.864.117.569-.085 1.74-.711 1.986-1.397.246-.686.246-1.273.172-1.397-.074-.124-.27-.197-.564-.345Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-display italic text-3xl md:text-4xl text-foreground leading-tight">
                Hablemos de tu próximo gran evento
              </h3>
              <p className="mt-3 text-sm text-muted-foreground">
                Respondemos a cualquier propuesta
              </p>
            </div>
            <span className="inline-flex items-center gap-2 bg-[#25D366] text-white px-6 py-3 text-xs uppercase tracking-[0.3em] font-semibold hover:brightness-110 transition">
              Escríbenos por WhatsApp
            </span>
          </a>
        </div>
      </section>
    </PageShell>
  );
}
