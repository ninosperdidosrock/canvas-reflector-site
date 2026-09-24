import { motion, useMotionValue, useSpring } from "motion/react";
import { useEffect, useRef, useState } from "react";

type FairyParticle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  decay: number;
  twinkle: number;
};

/**
 * Cursor personalizado (solo punteros finos): punto + halo que crece
 * sobre elementos interactivos.
 */
export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
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
    document.documentElement.classList.add("fairy-cursor-enabled");

    const canvas = canvasRef.current;
    if (!canvas) return;
    const context = canvas.getContext("2d");
    if (!context) return;

    const particles: FairyParticle[] = [];
    let animationFrame = 0;
    let lastX = -100;
    let lastY = -100;
    let lastSpawn = 0;

    const resize = () => {
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * ratio;
      canvas.height = window.innerHeight * ratio;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
    };

    const addDust = (mouseX: number, mouseY: number, amount: number) => {
      for (let i = 0; i < amount && particles.length < 72; i += 1) {
        particles.push({
          x: mouseX + (Math.random() - 0.5) * 9,
          y: mouseY + (Math.random() - 0.5) * 9,
          vx: -0.2 - Math.random() * 0.65,
          vy: (Math.random() - 0.7) * 0.7,
          size: 0.8 + Math.random() * 2.2,
          life: 1,
          decay: 0.018 + Math.random() * 0.018,
          twinkle: Math.random() * Math.PI * 2,
        });
      }
    };

    const draw = () => {
      context.clearRect(0, 0, window.innerWidth, window.innerHeight);
      const primary = getComputedStyle(document.documentElement)
        .getPropertyValue("--primary")
        .trim();

      for (let i = particles.length - 1; i >= 0; i -= 1) {
        const particle = particles[i];
        if (!particle) continue;
        particle.life -= particle.decay;
        if (particle.life <= 0) {
          particles.splice(i, 1);
          continue;
        }
        particle.x += particle.vx;
        particle.y += particle.vy;
        particle.vy += 0.006;
        particle.twinkle += 0.18;

        const shimmer = 0.58 + Math.sin(particle.twinkle) * 0.42;
        const alpha = particle.life * shimmer;
        context.save();
        context.globalAlpha = alpha;
        context.fillStyle = primary;
        context.shadowColor = primary;
        context.shadowBlur = 7 + particle.size * 2;

        if (particle.size > 2.25) {
          context.translate(particle.x, particle.y);
          context.rotate(Math.PI / 4);
          context.fillRect(-particle.size / 2, -particle.size / 2, particle.size, particle.size);
        } else {
          context.beginPath();
          context.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
          context.fill();
        }
        context.restore();
      }
      animationFrame = window.requestAnimationFrame(draw);
    };

    resize();
    animationFrame = window.requestAnimationFrame(draw);

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const now = performance.now();
      const distance = Math.hypot(e.clientX - lastX, e.clientY - lastY);
      if (distance > 3 && now - lastSpawn > 12) {
        addDust(e.clientX, e.clientY, distance > 28 ? 3 : 2);
        lastSpawn = now;
      }
      lastX = e.clientX;
      lastY = e.clientY;
      const el = e.target as HTMLElement | null;
      const interactive = el?.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor]",
      ) as HTMLElement | null;
      setActive(!!interactive);
      setLabel(interactive?.dataset?.cursor ?? null);
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", resize);
      window.cancelAnimationFrame(animationFrame);
      document.documentElement.classList.remove("fairy-cursor-enabled");
    };
  }, [x, y]);

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[100] hidden lg:block">
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
      <motion.div
        className="fairy-cursor-core absolute top-0 left-0 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary"
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
