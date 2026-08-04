import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useState } from "react";

/**
 * Cursor personalizado (solo punteros finos): punto + halo que crece
 * sobre elementos interactivos.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [active, setActive] = useState(false);
  const [label, setLabel] = useState<string | null>(null);
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const hx = useSpring(x, { stiffness: 280, damping: 28, mass: 0.5 });
  const hy = useSpring(y, { stiffness: 280, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine =
      window.matchMedia("(pointer: fine)").matches &&
      !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine) return;
    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      ) as HTMLElement | null;
      setActive(!!interactive);
      setLabel(interactive?.dataset?.cursor ?? null);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <motion.div
        className="absolute top-0 left-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
        style={{ x, y }}
      />
      <motion.div
        className="absolute top-0 left-0 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-primary/70"
        style={{ x: hx, y: hy }}
        animate={{
          width: active ? (label ? 84 : 56) : 32,
          height: active ? (label ? 84 : 56) : 32,
          opacity: active ? 1 : 0.5,
          backgroundColor: active
            ? "color-mix(in oklab, var(--color-primary) 12%, transparent)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 22 }}
      >
        {label && (
          <span className="text-[9px] uppercase tracking-[0.2em] text-primary font-semibold">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  );
}
