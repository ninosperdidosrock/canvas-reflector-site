import { useEffect, useState } from "react";
import { Instagram, ExternalLink } from "lucide-react";
import { SiTiktok, SiYoutube } from "@icons-pack/react-simple-icons";
import { testimonials, type TestimonialPlatform } from "@/lib/testimonials";

function PlatformIcon({ platform }: { platform: TestimonialPlatform }) {
  const cls = "h-4 w-4";
  if (platform === "instagram") return <Instagram className={cls} />;
  if (platform === "tiktok") return <SiTiktok className={cls} />;
  return <SiYoutube className={cls} />;
}

export function TestimonialsCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="mt-16 max-w-2xl mx-auto">
      <p className="text-primary text-[10px] md:text-xs uppercase tracking-[0.4em] font-sans font-semibold mb-4 drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
        Lo que dicen de nosotros
      </p>
      <div className="relative min-h-[180px] md:min-h-[160px]">
        {testimonials.map((t, i) => (
          <a
            key={i}
            href={t.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-hidden={i !== index}
            tabIndex={i !== index ? -1 : 0}
            className={`absolute inset-0 flex flex-col justify-center gap-3 rounded-lg border border-primary/30 bg-background/40 backdrop-blur-md px-6 py-5 md:px-8 md:py-6 transition-opacity duration-700 hover:border-primary/60 ${
              i === index ? "opacity-100" : "opacity-0 pointer-events-none"
            }`}
          >
            <p className="text-foreground/95 text-sm md:text-base leading-relaxed italic">
              "{t.text}"
            </p>
            <div className="flex items-center justify-between gap-3 text-primary">
              <span className="inline-flex items-center gap-2 text-xs md:text-sm font-semibold uppercase tracking-[0.15em]">
                <PlatformIcon platform={t.platform} />
                {t.author}
              </span>
              <ExternalLink className="h-3.5 w-3.5 opacity-70" />
            </div>
          </a>
        ))}
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {testimonials.map((_, i) => (
          <button
            key={i}
            aria-label={`Ver reseña ${i + 1}`}
            onClick={() => setIndex(i)}
            className={`h-1.5 rounded-full transition-all ${
              i === index ? "w-6 bg-primary" : "w-1.5 bg-primary/40 hover:bg-primary/70"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
