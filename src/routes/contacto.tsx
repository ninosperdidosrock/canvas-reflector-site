import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHero } from "@/components/page-shell";
import { Mail, Phone, Instagram, Send } from "lucide-react";
import bgContacto from "@/assets/bg-contacto.png";

export const Route = createFileRoute("/contacto")({
  head: () => ({
    meta: [
      { title: "Contacto · Niños Perdidos" },
      { name: "description", content: "Contrataciones y prensa para Niños Perdidos. Bodas, fiestas patronales, festivales y salas." },
    ],
  }),
  component: Contacto,
});

export default function Contacto() {
  return (
    <PageShell backgroundImage={bgContacto}>
      <section className="relative pt-32 pb-16">
        <div className="container-page">
          <h1 className="font-display italic text-6xl md:text-8xl text-glow-orange">CONTACTO</h1>
          <p className="mt-4 text-primary text-xs uppercase tracking-[0.4em] font-semibold">
            Contrataciones & Prensa
          </p>
        </div>
      </section>


      <section className="pb-24">
        <div className="container-page grid lg:grid-cols-[1fr_1.4fr] gap-12">
          <div>
            <h2 className="font-display italic text-2xl md:text-3xl mb-4">
              SOMOS EL GRUPO PERFECTO PARA TU EVENTO
            </h2>
            <p className="text-sm text-muted-foreground mb-8">
              Bodas, fiestas patronales, festivales y salas de conciertos.
              ¿Preparando el viaje a Nunca Jamás? El Capitán responde cuando le
              da la gana — pero responde.
            </p>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-3"><Mail className="h-4 w-4 text-primary" /> ninosperdidosrock@gmail.com</li>
              <li className="flex items-center gap-3"><Instagram className="h-4 w-4 text-primary" /> @ninosperdidos.rock</li>
              <li className="flex items-center gap-3"><Phone className="h-4 w-4 text-primary" /> Niños Perdidos (ninosperdidos-rock)</li>
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

          <form className="border border-border bg-card/40 backdrop-blur p-6 md:p-8 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Nombre *</label>
                <input className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="Tu nombre" />
              </div>
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Email *</label>
                <input type="email" className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="tu@email.com" />
              </div>
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Teléfono</label>
                <input className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary" placeholder="+34 000 000 000" />
              </div>
              <div>
                <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">Tipo de evento</label>
                <select className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary">
                  <option>Selecciona…</option>
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
              <textarea rows={5} className="mt-2 w-full bg-input/40 border border-border px-3 py-2.5 text-sm focus:outline-none focus:border-primary resize-none" placeholder="Cuéntanos sobre tu evento, fecha, lugar…" />
            </div>
            <button type="submit" className="w-full inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.3em] font-semibold hover:brightness-110 transition">
              <Send className="h-4 w-4" /> Enviar mensaje
            </button>
          </form>
        </div>
      </section>
    </PageShell>
  );
}
