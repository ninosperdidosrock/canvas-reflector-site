import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState, useMemo } from "react";
import { PageShell, PageHero } from "@/components/page-shell";
import { Youtube, Loader2, Camera, X } from "lucide-react";
import bgGaleria from "@/assets/bg-galeria.png";
import { getYoutubeVideos } from "@/lib/youtube.functions";
import bandaCompleta from "@/assets/galeria/banda-completa.jpg.asset.json";
import conPublico from "@/assets/galeria/con-publico.jpg.asset.json";
import manuDirecto from "@/assets/galeria/manu-directo.jpg.asset.json";
import ridruDirecto from "@/assets/galeria/ridru-directo.jpg.asset.json";
import hectorDirecto from "@/assets/galeria/hector-directo.jpg.asset.json";
import gaiaDirecto from "@/assets/galeria/gaia-directo.jpg.asset.json";
import rickDirecto from "@/assets/galeria/rick-directo.jpg.asset.json";
import gaiaManuDirecto from "@/assets/galeria/gaia-manu-directo.jpg.asset.json";
import mf643 from "@/assets/galeria/mangafest/P1430643.jpg.asset.json";
import mf677 from "@/assets/galeria/mangafest/P1430677.jpg.asset.json";
import mf684 from "@/assets/galeria/mangafest/P1430684.jpg.asset.json";
import mf732 from "@/assets/galeria/mangafest/P1430732.jpg.asset.json";
import mf747 from "@/assets/galeria/mangafest/P1430747.jpg.asset.json";
import mf764 from "@/assets/galeria/mangafest/P1430764.jpg.asset.json";
import mf776 from "@/assets/galeria/mangafest/P1430776.jpg.asset.json";
import mf806 from "@/assets/galeria/mangafest/P1430806.jpg.asset.json";
import mf865 from "@/assets/galeria/mangafest/P1430865.jpg.asset.json";
import cs498 from "@/assets/galeria/cadillac/DSC09498.jpg.asset.json";
import cs500 from "@/assets/galeria/cadillac/DSC09500.jpg.asset.json";
import cs709 from "@/assets/galeria/cadillac/DSC09709.jpg.asset.json";
import cs711 from "@/assets/galeria/cadillac/DSC09711.jpg.asset.json";
import cs728 from "@/assets/galeria/cadillac/DSC09728.jpg.asset.json";
import cs758 from "@/assets/galeria/cadillac/DSC09758.jpg.asset.json";
import cs789 from "@/assets/galeria/cadillac/DSC09789.jpg.asset.json";
import cs806 from "@/assets/galeria/cadillac/DSC09806.jpg.asset.json";
import cs811 from "@/assets/galeria/cadillac/DSC09811.jpg.asset.json";
import cs830 from "@/assets/galeria/cadillac/DSC09830.jpg.asset.json";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería · Niños Perdidos" },
      { name: "description", content: "Momentos del escenario y vídeos en directo de Niños Perdidos." },
      { property: "og:title", content: "Galería · Niños Perdidos" },
      { property: "og:description", content: "Fotos en directo y vídeos en YouTube de los conciertos de Niños Perdidos." },
      { property: "og:url", content: "https://canvas-reflector-site.lovable.app/galeria" },
    ],
    links: [
      { rel: "canonical", href: "https://canvas-reflector-site.lovable.app/galeria" },
    ],
  }),
  component: Galeria,
});

type Photo = { src: string; alt: string; focus?: string };
type Concert = {
  slug: string;
  name: string;
  date: string; // display
  isoDate: string;
  location?: string;
  cover: string;
  coverFocus?: string;
  photos: Photo[];
};

// Encuadre guiado por caras: object-position por foto para que la cara del
// sujeto quede visible dentro del marco, sea cual sea el aspect-ratio.
const FOCUS: Record<string, string> = {
  [bandaCompleta.url]: "50% 28%",
  [gaiaDirecto.url]: "38% 26%",
  [ridruDirecto.url]: "38% 18%",
  [hectorDirecto.url]: "45% 32%",
  [manuDirecto.url]: "55% 28%",
  [rickDirecto.url]: "45% 34%",
  [gaiaManuDirecto.url]: "50% 42%",
  [conPublico.url]: "50% 55%",
  [mf643.url]: "60% 25%",
  [mf677.url]: "50% 40%",
  [mf684.url]: "55% 35%",
  [mf732.url]: "35% 22%",
  [mf747.url]: "55% 32%",
  [mf764.url]: "45% 28%",
  [mf776.url]: "50% 45%",
  [mf806.url]: "40% 22%",
  [mf865.url]: "50% 45%",
};
const focusOf = (src: string, override?: string) => override ?? FOCUS[src] ?? "center";

const favorites: Photo[] = [
  { src: bandaCompleta.url, alt: "Niños Perdidos al completo sobre el escenario" },
  { src: mf684.url, alt: "Manu y Ridru espalda contra espalda sonriendo en Mangafest Sevilla" },
  { src: gaiaDirecto.url, alt: "Gaia cantando en directo" },
  { src: ridruDirecto.url, alt: "Ridru tocando la guitarra en directo" },
  { src: hectorDirecto.url, alt: "Héctor cantando al bajo en directo" },
  { src: manuDirecto.url, alt: "Manu cantando y tocando la guitarra" },
  { src: rickDirecto.url, alt: "Rick a la batería entre haces de luz" },
  { src: gaiaManuDirecto.url, alt: "Gaia y Manu cantando juntos" },
  { src: conPublico.url, alt: "Niños Perdidos con el público al final del concierto" },
];

const concerts: Concert[] = [
  {
    slug: "revi-live",
    name: "Revi Live",
    date: "01 · 02 · 2026",
    isoDate: "2026-02-01",
    cover: bandaCompleta.url,
    photos: [
      { src: bandaCompleta.url, alt: "Banda completa en Revi Live" },
      { src: conPublico.url, alt: "Con el público en Revi Live" },
    ],
  },
  {
    slug: "cadillac-solitario",
    name: "Cadillac Solitario",
    date: "18 · 04 · 2026",
    isoDate: "2026-04-18",
    cover: manuDirecto.url,
    photos: [
      { src: manuDirecto.url, alt: "Manu en Cadillac Solitario" },
      { src: ridruDirecto.url, alt: "Ridru en Cadillac Solitario" },
      { src: hectorDirecto.url, alt: "Héctor en Cadillac Solitario" },
    ],
  },
  {
    slug: "mangafest-sevilla",
    name: "Mangafest Sevilla",
    date: "21 · 06 · 2026",
    isoDate: "2026-06-21",
    cover: mf677.url,
    coverFocus: "50% 42%",
    photos: [
      { src: mf677.url, alt: "Niños Perdidos al completo en el escenario del Mangafest Sevilla" },
      { src: mf684.url, alt: "Manu y Ridru espalda contra espalda en Mangafest Sevilla" },
      { src: mf776.url, alt: "La banda desde el escenario frente al público del Mangafest Sevilla" },
      { src: mf865.url, alt: "Foto de familia con el público al final del concierto en Mangafest Sevilla" },
      { src: mf732.url, alt: "Manu con la guitarra bajo luz azul en Mangafest Sevilla" },
      { src: mf764.url, alt: "Ridru al bajo en Mangafest Sevilla" },
      { src: mf747.url, alt: "Rick a la batería en Mangafest Sevilla" },
      { src: mf643.url, alt: "Rick tocando la batería en Mangafest Sevilla" },
      { src: mf806.url, alt: "Héctor a la guitarra en Mangafest Sevilla" },
    ],
  },
];

function FavoritesStrip() {
  // Duplicate list for seamless marquee loop
  const loop = useMemo(() => [...favorites, ...favorites], []);
  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div className="flex gap-4 w-max animate-marquee group-hover:[animation-play-state:paused]">
        {loop.map((p, i) => (
          <figure
            key={i}
            className="relative shrink-0 h-48 md:h-64 w-72 md:w-96 overflow-hidden border border-border bg-card"
          >
            <img
              src={p.src}
              alt={p.alt}
              loading="lazy"
              draggable={false}
              style={{ objectPosition: focusOf(p.src, p.focus) }}
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background/50 via-transparent to-transparent" />
          </figure>
        ))}
      </div>
    </div>
  );
}

function ConcertCard({ concert, onOpen }: { concert: Concert; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative text-left overflow-hidden border border-border bg-card/40 backdrop-blur transition-all hover:border-primary/70 hover:-translate-y-1 hover:shadow-[0_20px_50px_-20px_rgba(0,0,0,0.7)]"
    >
      <div className="relative aspect-[4/5] overflow-hidden">
        <img
          src={concert.cover}
          alt={`Concierto ${concert.name}`}
          loading="lazy"
          style={{ objectPosition: focusOf(concert.cover, concert.coverFocus) }}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 p-5 md:p-6">
          <p className="text-[10px] md:text-xs text-primary uppercase tracking-[0.3em] font-semibold">
            {concert.date}
          </p>
          <h3 className="mt-2 font-display italic text-2xl md:text-3xl text-foreground text-glow-orange">
            {concert.name}
          </h3>
          <p className="mt-3 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <Camera className="h-3.5 w-3.5" />
            {concert.photos.length} {concert.photos.length === 1 ? "foto" : "fotos"}
          </p>
        </div>
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <span className="inline-flex items-center border border-primary/70 bg-background/70 text-primary text-[10px] uppercase tracking-[0.3em] font-semibold px-3 py-1.5 backdrop-blur">
            Ver galería →
          </span>
        </div>
      </div>
    </button>
  );
}

function ConcertLightbox({
  concert,
  onClose,
}: {
  concert: Concert | null;
  onClose: () => void;
}) {
  const open = !!concert;
  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent
        className="max-w-[min(1200px,95vw)] w-full border-primary/40 bg-background/95 backdrop-blur-xl p-0 gap-0 [&>button]:hidden"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Cerrar galería"
          className="absolute top-4 right-4 z-20 inline-flex h-10 w-10 items-center justify-center border border-border bg-background/70 text-foreground hover:text-primary hover:border-primary transition"
        >
          <X className="h-5 w-5" />
        </button>
        {concert && (
          <div className="p-6 md:p-10">
            <DialogTitle asChild>
              <h2 className="font-display italic text-3xl md:text-5xl text-foreground text-glow-orange">
                {concert.name}
              </h2>
            </DialogTitle>
            <DialogDescription asChild>
              <p className="mt-1 text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold">
                {concert.date}
              </p>
            </DialogDescription>

            <div className="mt-8">
              <Carousel opts={{ loop: true, align: "center" }} className="w-full">
                <CarouselContent>
                  {concert.photos.map((p, i) => (
                    <CarouselItem key={i}>
                      <figure className="relative w-full aspect-[16/10] md:aspect-[16/9] bg-card border border-border overflow-hidden">
                        <img
                          src={p.src}
                          alt={p.alt}
                          style={{ objectPosition: focusOf(p.src, p.focus) }}
                          className="absolute inset-0 w-full h-full object-cover"
                        />
                      </figure>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="left-2 md:-left-6" />
                <CarouselNext className="right-2 md:-right-6" />
              </Carousel>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

export default function Galeria() {
  const fetchVideos = useServerFn(getYoutubeVideos);
  const { data, isLoading } = useQuery({
    queryKey: ["yt-videos"],
    queryFn: () => fetchVideos(),
    staleTime: 5 * 60_000,
    refetchInterval: 10 * 60_000,
  });

  const [openConcert, setOpenConcert] = useState<Concert | null>(null);

  return (
    <PageShell backgroundImage={bgGaleria}>
      <PageHero title="GALERÍA" eyebrow="Momentos del escenario" />

      <section className="pb-6">
        <div className="mb-6 container-page">
          <p className="text-primary text-[10px] md:text-xs uppercase tracking-[0.3em] font-semibold">
            Favoritas · en movimiento
          </p>
        </div>
        <FavoritesStrip />
      </section>

      <section className="pt-12 pb-20">
        <div className="container-page">
          <div className="mb-8">
            <h2 className="font-display italic text-3xl md:text-5xl text-foreground">CONCIERTOS</h2>
            <p className="mt-2 text-sm text-muted-foreground max-w-xl">
              Cada marco recoge las fotos de un directo. Iremos añadiendo más poco a poco.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {concerts.map((c) => (
              <ConcertCard key={c.slug} concert={c} onOpen={() => setOpenConcert(c)} />
            ))}
          </div>
        </div>
      </section>

      <ConcertLightbox concert={openConcert} onClose={() => setOpenConcert(null)} />

      <section className="pb-24">
        <div className="container-page">
          <div className="mb-10">
            <p className="text-primary text-xs uppercase tracking-[0.3em] font-semibold mb-2 inline-flex items-center gap-2">
              <Youtube className="h-4 w-4" /> En directo desde YouTube
            </p>
          </div>

          {isLoading ? (
            <div className="flex items-center gap-2 text-muted-foreground"><Loader2 className="h-4 w-4 animate-spin" /> Cargando vídeos…</div>
          ) : data?.error ? (
            <p className="text-sm text-muted-foreground border border-border p-5 bg-card/40 backdrop-blur">
              No se han podido cargar los vídeos: {data.error}.
            </p>
          ) : data && data.videos.length > 0 ? (
            (() => {
              const aftermovie =
                data.videos.find((v) => /aftermovie/i.test(v.title)) ?? data.videos[0];
              const rest = data.videos.filter((v) => v.id !== aftermovie.id);
              return (
                <>
                  <article className="border border-border bg-card/40 backdrop-blur overflow-hidden mb-16">
                    <div className="relative aspect-video">
                      <iframe
                        src={`https://www.youtube.com/embed/${aftermovie.id}`}
                        title={aftermovie.title}
                        loading="lazy"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>
                    <div className="p-6">
                      <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-semibold">
                        Aftermovie · {new Date(aftermovie.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                      </p>
                      <p className="mt-2 font-display italic text-2xl md:text-3xl text-foreground">{aftermovie.title}</p>
                    </div>
                  </article>

                  {rest.length > 0 && (
                    <div>
                      <div className="flex items-end justify-between flex-wrap gap-4 mb-6">
                        <h2 className="font-display italic text-3xl md:text-5xl">ÚLTIMOS VÍDEOS</h2>
                        {data.channelUrl && (
                          <a
                            href={data.channelUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-2 border border-primary text-primary px-5 py-2.5 text-xs uppercase tracking-[0.3em] font-semibold hover:bg-primary hover:text-primary-foreground transition"
                          >
                            Ver canal →
                          </a>
                        )}
                      </div>
                      <Carousel opts={{ align: "start" }} className="w-full">
                        <CarouselContent className="-ml-4">
                          {rest.map((v) => (
                            <CarouselItem key={v.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                              <article className="border border-border bg-card/40 backdrop-blur overflow-hidden h-full">
                                <div className="relative aspect-video">
                                  <iframe
                                    src={`https://www.youtube.com/embed/${v.id}`}
                                    title={v.title}
                                    loading="lazy"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                    className="absolute inset-0 w-full h-full"
                                  />
                                </div>
                                <div className="p-4">
                                  <p className="text-[10px] text-primary uppercase tracking-[0.3em] font-semibold">
                                    {new Date(v.publishedAt).toLocaleDateString("es-ES", { year: "numeric", month: "long", day: "numeric" })}
                                  </p>
                                  <p className="mt-1 font-display italic text-base text-foreground line-clamp-2">{v.title}</p>
                                </div>
                              </article>
                            </CarouselItem>
                          ))}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                      </Carousel>
                    </div>
                  )}
                </>
              );
            })()
          ) : (
            <p className="text-sm text-muted-foreground">Aún no hay vídeos publicados.</p>
          )}
        </div>
      </section>
    </PageShell>
  );
}
