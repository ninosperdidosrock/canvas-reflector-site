import { useState } from "react";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

const INSTAGRAM_PROFILE = "https://instagram.com/ninosperdidos.rock";
const INSTAGRAM_APP_STORY = "instagram://story-camera";

export function EasterEgg() {
  const [open, setOpen] = useState(false);

  const handleStory = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const isMobile = /android|iphone|ipad|ipod/i.test(navigator.userAgent);

    if (!isMobile) {
      window.open(INSTAGRAM_PROFILE, "_blank", "noopener,noreferrer");
      return;
    }

    let left = false;
    const onHide = () => {
      if (document.visibilityState === "hidden") left = true;
    };
    document.addEventListener("visibilitychange", onHide);

    // Intento de abrir la app en la cámara de Stories.
    window.location.href = INSTAGRAM_APP_STORY;

    window.setTimeout(() => {
      document.removeEventListener("visibilitychange", onHide);
      if (!left && document.visibilityState === "visible") {
        window.location.href = INSTAGRAM_PROFILE;
      }
    }, 1500);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="✦"
        title=""
        data-cursor="?"
        className="inline-block align-super select-none text-primary/25 hover:text-primary transition-colors duration-500 text-[0.7em] leading-none cursor-default focus:outline-none"
      >
        ✷
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-[92vw] sm:max-w-md rounded-lg border-primary/30 bg-surface/95 backdrop-blur-xl p-6 max-h-[90vh] overflow-y-auto">
          <DialogTitle className="font-display italic text-2xl sm:text-3xl text-primary text-center text-glow-orange">
            ¡HAS ENCONTRADO EL PREMIO! 🎁
          </DialogTitle>
          <DialogDescription className="text-center text-sm text-muted-foreground">
            ¡Enhorabuena! Para reclamar la camiseta en este concierto, sé el
            PRIMERO en subir una Story a Instagram cumpliendo estos pasos:
          </DialogDescription>

          <ol className="mt-2 space-y-3 text-sm text-foreground/90">
            {[
              "Haz una foto o vídeo del concierto en directo.",
              "Etiqueta a la banda.",
              <>
                Escribe en la foto la palabra clave de hoy:{" "}
                <span className="font-semibold text-primary">#NUNCAJAMAS</span>
              </>,
            ].map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-primary/50 text-xs font-semibold text-primary">
                  {i + 1}
                </span>
                <span className="pt-0.5">{step}</span>
              </li>
            ))}
          </ol>

          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            onClick={handleStory}
            className="mt-5 flex w-full items-center justify-center rounded-md bg-primary px-5 py-4 text-sm font-semibold uppercase tracking-wider text-primary-foreground transition-transform active:scale-[0.98] hover:brightness-110"
          >
            SUBIR STORY AHORA 📸
          </a>

          <a
            href={INSTAGRAM_PROFILE}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-1 block text-center text-xs text-muted-foreground underline underline-offset-4 hover:text-primary"
          >
            @ninosperdidos.rock
          </a>
        </DialogContent>
      </Dialog>
    </>
  );
}
