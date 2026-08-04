import { motion, useScroll, useTransform, useReducedMotion } from "motion/react";
import { useRef } from "react";

/**
 * Cinta de texto en movimiento continuo, con desplazamiento extra según scroll.
 */
export function MarqueeText({
  text,
  repeat = 6,
  reverse = false,
  className,
}: {
  text: string;
  repeat?: number;
  reverse?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const shift = useTransform(
    scrollYProgress,
    [0, 1],
    reverse ? ["6%", "-6%"] : ["-6%", "6%"],
  );

  const items = Array.from({ length: repeat * 2 });

  return (
    <div
      ref={ref}
      aria-hidden
      className={`relative overflow-hidden select-none py-6 ${className ?? ""}`}
      style={{
        maskImage:
          "linear-gradient(to right, transparent, black 8%, black 92%, transparent)",
      }}
    >
      <motion.div style={reduced ? undefined : { x: shift }}>
        <div
          className={`flex w-max gap-10 animate-marquee ${reverse ? "[animation-direction:reverse]" : ""}`}
        >
          {items.map((_, i) => (
            <span
              key={i}
              className="font-display italic text-4xl md:text-6xl whitespace-nowrap text-foreground/12"
            >
              {text}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
