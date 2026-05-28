import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { PageShell } from "@/components/page-shell";
import { Sparkles, Send } from "lucide-react";
import bgMagia from "@/assets/bg-magia.png";

export const Route = createFileRoute("/magia")({
  head: () => ({
    meta: [
      { title: "Magia · Niños Perdidos" },
      { name: "description", content: "La magia de Nunca Jamás: bautismo de niño perdido y el oráculo del Capitán Garfio." },
    ],
  }),
  component: Magia,
});

export default function Magia() {
  const [name, setName] = useState("");
  const [prompt, setPrompt] = useState("");
  return (
    <PageShell backgroundImage={bgMagia}>
      <section className="relative pt-32 pb-20">
        <div className="container-page">
          <div className="inline-flex items-center gap-2 mb-6">
            <div className="h-10 w-10 rounded-full border-2 border-primary flex items-center justify-center text-primary font-display italic">NP</div>
            <span className="font-display italic text-primary tracking-wider">NIÑOS PERDIDOS</span>
          </div>
          <h1 className="font-display italic text-5xl md:text-7xl leading-[0.95] max-w-3xl text-glow-orange">
            LA MAGIA DE<br />NUNCA JAMÁS
          </h1>
          <p className="mt-4 text-primary text-xs uppercase tracking-[0.4em] font-semibold">
            Inteligencia Artificial
          </p>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-page max-w-2xl text-center">
          <Sparkles className="mx-auto h-6 w-6 text-primary mb-4" />
          <h2 className="font-display italic text-3xl md:text-4xl">BAUTISMO DE NIÑO PERDIDO</h2>
          <p className="mt-4 text-sm text-muted-foreground">
            Escribe tu nombre mortal sobre la corteza sagrada y recibe tu identidad
            en Nunca Jamás. El ritual no se puede deshacer.
          </p>
          <div className="mt-8 border border-border bg-card/40 backdrop-blur p-6 text-left">
            <label className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold">
              Tu nombre mortal
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Escribe aquí tu nombre…"
              className="mt-2 w-full bg-transparent border-b border-border py-3 font-display italic text-xl placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
            />
            <button className="mt-6 w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.3em] font-semibold hover:brightness-110 transition">
              Comenzar el ritual
            </button>
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page max-w-3xl text-center">
          <p className="text-primary text-2xl mb-3">⚓</p>
          <h2 className="font-display italic text-3xl md:text-4xl">EL ORÁCULO DEL CAPITÁN GARFIO</h2>
          <p className="mt-4 text-sm text-muted-foreground max-w-xl mx-auto">
            Sugiere canciones de Disney o dibujos de los 90 y deja que el
            Capitán decida si son dignas del repertorio de Nunca Jamás.
          </p>
          <div className="mt-8 border border-border bg-card/40 backdrop-blur p-6 text-left">
            <div className="min-h-[180px] text-sm text-muted-foreground/60 italic">
              El Capitán Garfio espera tu sugerencia con impaciencia…
            </div>
            <div className="flex items-center gap-2 border-t border-border pt-4">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Sugiere una canción, película o dibujo…"
                className="flex-1 bg-transparent py-2 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button className="text-primary p-2 hover:bg-primary/10 transition">
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
