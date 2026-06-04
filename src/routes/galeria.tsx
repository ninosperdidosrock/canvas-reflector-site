import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { PageShell, PageHero } from "@/components/page-shell";
import { Youtube, Loader2 } from "lucide-react";
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
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";


export const Route = createFileRoute("/galeria")({
  head: () => ({
    meta: [
      { title: "Galería · Niños Perdidos" },
      { name: "description", content: "Momentos del escenario y vídeos en directo de Niños Perdidos." },
    ],
  }),
  component: Galeria,
});

export default function Galeria() {
  const fetchVideos = useServerFn(getYoutubeVideos);
  const { data, isLoading } = useQuery({
    queryKey: ["yt-videos"],
    queryFn: () => fetchVideos(),
    staleTime: 5 * 60_000,
    refetchInterval: 10 * 60_000,
  });

  const photos = [
    {
      src: bandaCompleta.url,
      alt: "Niños Perdidos al completo sobre el escenario",
      className: "md:col-span-8 md:row-span-2 aspect-[16/9] md:aspect-auto md:min-h-[420px]",
      position: "object-center",
    },
    {
      src: manuDirecto.url,
      alt: "Manu cantando y tocando la guitarra en directo",
      className: "md:col-span-4 md:row-span-2 aspect-[3/4] md:aspect-auto md:min-h-[420px]",
      position: "object-top",
    },
    {
      src: ridruDirecto.url,
      alt: "Ridru tocando la guitarra en directo",
      className: "md:col-span-3 aspect-[3/4]",
      position: "object-top",
    },
    {
      src: hectorDirecto.url,
      alt: "Héctor cantando al bajo en directo",
      className: "md:col-span-3 aspect-[3/4]",
      position: "object-top",
    },
    {
      src: gaiaDirecto.url,
      alt: "Gaia cantando en directo",
      className: "md:col-span-2 aspect-[3/4]",
      position: "object-top",
    },
    {
      src: rickDirecto.url,
      alt: "Rick tocando la batería entre haces de luz",
      className: "md:col-span-4 aspect-[4/5]",
      position: "object-center",
    },
    {
      src: gaiaManuDirecto.url,
      alt: "Gaia y Manu cantando juntos en directo",
      className: "md:col-span-3 aspect-[3/4]",
      position: "object-top",
    },
    {
      src: conPublico.url,
      alt: "Niños Perdidos con el público al final del concierto",
      className: "md:col-span-5 aspect-[16/10]",
      position: "object-center",
    },
  ];

  return (
    <PageShell backgroundImage={bgGaleria}>
      <PageHero title="GALERÍA" eyebrow="Momentos del escenario" />
      <section className="pb-16">
        <div className="container-page grid grid-cols-2 md:grid-cols-12 auto-rows-auto gap-3">
          {photos.map((p, i) => (
            <figure
              key={i}
              className={`group relative bg-card border border-border overflow-hidden ${p.className}`}
            >
              <img
                src={p.src}
                alt={p.alt}
                loading="lazy"
                className={`absolute inset-0 w-full h-full object-cover ${p.position} transition-transform duration-700 group-hover:scale-[1.04]`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />
            </figure>
          ))}
        </div>
      </section>


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

