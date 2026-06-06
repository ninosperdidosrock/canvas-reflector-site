import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { PageShell, PageHero } from "@/components/page-shell";
import { Sparkles, Send, Loader2 } from "lucide-react";
import bgMagiaAsset from "@/assets/bg-magia.png.asset.json";
const bgMagia = bgMagiaAsset.url;
import {
  bautizarNinoPerdido,
  consultarOraculo,
} from "@/lib/magia.functions";

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
  const [bautismo, setBautismo] = useState<string>("");
  const [oraculo, setOraculo] = useState<string>("");
  const [loadingB, setLoadingB] = useState(false);
  const [loadingO, setLoadingO] = useState(false);
  const [errB, setErrB] = useState<string | null>(null);
  const [errO, setErrO] = useState<string | null>(null);

  const bautizar = useServerFn(bautizarNinoPerdido);
  const oracle = useServerFn(consultarOraculo);

  async function handleBautismo() {
    if (!name.trim() || loadingB) return;
    setLoadingB(true);
    setErrB(null);
    setBautismo("");
    try {
      const res = await bautizar({ data: { name: name.trim() } });
      setBautismo(res.text);
    } catch (e) {
      setErrB(e instanceof Error ? e.message : "El ritual ha fallado");
    } finally {
      setLoadingB(false);
    }
  }

  async function handleOraculo() {
    if (!prompt.trim() || loadingO) return;
    setLoadingO(true);
    setErrO(null);
    setOraculo("");
    try {
      const res = await oracle({ data: { prompt: prompt.trim() } });
      setOraculo(res.text);
    } catch (e) {
      setErrO(e instanceof Error ? e.message : "El Capitán está ocupado");
    } finally {
      setLoadingO(false);
    }
  }

  return (
    <PageShell backgroundImage={bgMagia}>
      <PageHero title="LA MAGIA" />


      <section className="pb-16">
        <div className="container-page max-w-2xl text-center">
          <Sparkles className="mx-auto h-6 w-6 text-primary mb-4" />
          <h2 className="font-display italic text-3xl md:text-5xl">BAUTISMO DE NIÑO PERDIDO</h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed">
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
              onKeyDown={(e) => e.key === "Enter" && handleBautismo()}
              placeholder="Escribe aquí tu nombre…"
              maxLength={80}
              className="mt-2 w-full bg-transparent border-b border-border py-3 font-display italic text-xl placeholder:text-muted-foreground/60 focus:outline-none focus:border-primary"
            />
            <button
              onClick={handleBautismo}
              disabled={loadingB || !name.trim()}
              className="mt-6 w-full bg-primary text-primary-foreground py-3 text-xs uppercase tracking-[0.3em] font-semibold hover:brightness-110 transition disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
            >
              {loadingB ? (<><Loader2 className="h-4 w-4 animate-spin" /> Invocando…</>) : "Comenzar el ritual"}
            </button>
            {errB && <p className="mt-4 text-sm text-destructive">{errB}</p>}
            {bautismo && (
              <div className="mt-6 border-t border-border pt-5">
                <p className="text-primary text-[10px] uppercase tracking-[0.3em] font-semibold mb-2">El espíritu pronuncia</p>
                <p className="font-display italic text-lg leading-relaxed text-foreground">{bautismo}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="pb-24">
        <div className="container-page max-w-3xl text-center">
          <p className="text-primary text-2xl mb-3">⚓</p>
          <h2 className="font-display italic text-3xl md:text-5xl">EL ORÁCULO DEL CAPITÁN GARFIO</h2>
          <p className="mt-4 text-base text-muted-foreground leading-relaxed max-w-xl mx-auto">
            Sugiere canciones de Disney o dibujos de los 90 y deja que el
            Capitán decida si son dignas del repertorio de Nunca Jamás.
          </p>
          <div className="mt-8 border border-border bg-card/40 backdrop-blur p-6 text-left">
            <div className="min-h-[180px] text-sm">
              {loadingO ? (
                <div className="flex items-center gap-2 text-muted-foreground italic">
                  <Loader2 className="h-4 w-4 animate-spin" /> El Capitán medita…
                </div>
              ) : oraculo ? (
                <p className="font-display italic text-lg leading-relaxed text-foreground">{oraculo}</p>
              ) : errO ? (
                <p className="text-destructive">{errO}</p>
              ) : (
                <p className="text-muted-foreground/60 italic">El Capitán Garfio espera tu sugerencia con impaciencia…</p>
              )}
            </div>
            <div className="flex items-center gap-2 border-t border-border pt-4">
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleOraculo()}
                placeholder="Sugiere una canción, película o dibujo…"
                maxLength={200}
                className="flex-1 bg-transparent py-2 text-sm placeholder:text-muted-foreground/60 focus:outline-none"
              />
              <button
                onClick={handleOraculo}
                disabled={loadingO || !prompt.trim()}
                className="text-primary p-2 hover:bg-primary/10 transition disabled:opacity-40"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </section>
    </PageShell>
  );
}
