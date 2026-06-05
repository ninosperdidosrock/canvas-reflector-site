import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { Mail, Instagram, Youtube, MessageCircle } from "lucide-react";
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
  const send = useServerFn(submitContactMessage);
  const [submitting, setSubmitting] = useState(false);

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      phone: String(fd.get("phone") ?? ""),
      eventType: String(fd.get("eventType") ?? ""),
      message: String(fd.get("message") ?? ""),
    };

    if (!payload.name.trim() || !payload.email.trim()) {
      toast.error("Por favor rellena nombre y email.");
      return;
    }

    setSubmitting(true);
    try {
      await send({ data: payload });
      toast.success("¡Mensaje enviado! Te responderemos pronto.");
      form.reset();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Error al enviar el mensaje.");
    } finally {
      setSubmitting(false);
    }
  };

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
            <p className="text-sm text-muted-foreground mb-8">
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

          <form onSubmit={onSubmit} className="border border-border bg-card/40 backdrop-blur p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Nombre *</label>
                <input name="name" required maxLength={200} className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Email *</label>
                <input name="email" type="email" required maxLength={320} className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Teléfono</label>
                <input name="phone" maxLength={50} className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="+34 000 000 000" />
              </div>
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Tipo de evento</label>
                <select name="eventType" defaultValue="" className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option value="">Selecciona…</option>
                  <option>Boda</option>
                  <option>Fiestas patronales</option>
                  <option>Festival</option>
                  <option>Sala de conciertos</option>
                  <option>Evento corporativo</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Mensaje</label>
              <textarea name="message" rows={5} maxLength={5000} className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" placeholder="Cuéntanos sobre tu evento, fecha, lugar…" />
            </div>
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.3em] font-semibold hover:brightness-110 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {submitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" /> Enviando…
                </>
              ) : (
                <>
                  <Send className="h-4 w-4" /> Enviar mensaje
                </>
              )}
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
