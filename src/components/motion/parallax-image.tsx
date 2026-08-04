import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Imagen con parallax interno: se desplaza unos pocos px dentro de su marco
 * al hacer scroll. El marco se mantiene siempre cubierto (scale > 1).
 */
export function ParallaxImage({
  src,
  alt,
  className,
  objectPosition,
  amount = 8,
  loading = "lazy",
}: {
  src: string;
  alt: string;
  className?: string;
  objectPosition?: string;
  amount?: number;
  loading?: "lazy" | "eager";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${amount}%`, `${amount}%`]);

  return (
    <div ref={ref} className={`absolute inset-0 overflow-hidden ${className ?? ""}`}>
      <motion.img
        src={src}
        alt={alt}
        loading={loading}
        draggable={false}
        style={{
          objectPosition,
          y: reduced ? 0 : y,
          scale: reduced ? 1 : 1 + amount / 50,
        }}
        className="absolute inset-0 h-full w-full object-cover will-change-transform"
      />
    </div>
  );
}
