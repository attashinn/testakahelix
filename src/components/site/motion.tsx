import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type HTMLMotionProps,
} from "motion/react";
import { useEffect, useRef, type ReactNode } from "react";

import { cn } from "@/lib/utils";

export const EASE = [0.16, 1, 0.3, 1] as const;

/** Delay hero animations on a full page load so they follow the intro curtain. */
export function introDelay(base = 0) {
  if (typeof window === "undefined") return base + 1.25;
  return performance.now() < 2200 ? base + 1.25 : base;
}

type RevealTextProps = {
  text: string;
  as?: "h1" | "h2" | "h3" | "p" | "span";
  className?: string;
  delay?: number;
  stagger?: number;
  onMount?: boolean;
};

/** Word-by-word masked reveal, the Framer/Webflow headline move. */
export function RevealText({
  text,
  as = "h2",
  className,
  delay = 0,
  stagger = 0.045,
  onMount = false,
}: RevealTextProps) {
  const Tag = motion[as];
  const words = text.split(" ");
  const trigger = onMount
    ? { initial: "hidden", animate: "show" }
    : { initial: "hidden", whileInView: "show", viewport: { once: true, margin: "0px 0px -12% 0px" } };

  return (
    <Tag className={cn("break-words", className)} {...trigger} aria-label={text}>
      {words.map((w, i) => (
        <span
          key={i}
          aria-hidden
          className="inline-block overflow-hidden pb-[0.12em] -mb-[0.12em] align-top mr-[0.28em] last:mr-0"
        >
          <motion.span
            className="inline-block will-change-transform"
            variants={{
              hidden: { y: "108%" },
              show: { y: "0%", transition: { duration: 1, ease: EASE, delay: delay + i * stagger } },
            }}
          >
            {w}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

type FadeUpProps = HTMLMotionProps<"div"> & { delay?: number; y?: number; onMount?: boolean };

export function FadeUp({ delay = 0, y = 28, onMount = false, className, children, ...rest }: FadeUpProps) {
  const trigger = onMount
    ? { animate: { opacity: 1, y: 0 } }
    : { whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      {...trigger}
      transition={{ duration: 1, ease: EASE, delay }}
      className={className}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/** Thin rule that draws itself left to right. */
export function DrawRule({ className, delay = 0 }: { className?: string | undefined; delay?: number }) {
  return (
    <motion.div
      className={cn("hairline origin-left", className)}
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1.4, ease: EASE, delay }}
    />
  );
}

type ImageRevealProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  width?: number;
  height?: number;
  priority?: boolean;
  parallax?: number;
  delay?: number;
};

/** Clip-path wipe + slow scale-down + scroll parallax. */
export function ImageReveal({
  src,
  alt,
  className,
  imgClassName,
  width,
  height,
  priority,
  parallax = 8,
  delay = 0,
}: ImageRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [`-${parallax}%`, `${parallax}%`]);

  return (
    <motion.div
      ref={ref}
      className={cn("grain relative overflow-hidden bg-mist [isolation:isolate] [clip-path:inset(0)]", className)}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay }}
    >
      <motion.img
        src={src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : "lazy"}
        style={reduce ? {} : { y }}
        className={cn("h-full w-full object-cover", imgClassName)}
      />
    </motion.div>
  );
}

/** Paragraph whose words fill from grey to ink as it scrolls through the viewport. */
export function ScrollFillText({ text, className, muted }: { text: string; className?: string; muted?: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.85", "end 0.45"] });
  const words = text.split(" ");
  return (
    <p ref={ref} className={className} aria-label={text}>
      {words.map((w, i) => (
        <FillWord key={i} word={w} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} muted={muted} />
      ))}
    </p>
  );
}

function FillWord({
  word,
  progress,
  range,
  muted,
}: {
  word: string;
  progress: ReturnType<typeof useScroll>["scrollYProgress"];
  range: [number, number];
  muted?: string | undefined;
}) {
  const opacity = useTransform(progress, range, [0.18, 1]);
  return (
    <span aria-hidden className={cn("relative inline-block mr-[0.28em] last:mr-0", muted)}>
      <motion.span style={{ opacity }}>{word}</motion.span>
    </span>
  );
}

/** Vertical line that draws downward when it enters view. */
export function DrawLine({ className, delay = 0 }: { className?: string; delay?: number }) {
  return (
    <motion.div
      className={cn("w-px origin-top", className)}
      initial={{ scaleY: 0 }}
      whileInView={{ scaleY: 1 }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE, delay }}
    />
  );
}

/** Number that ticks up when scrolled into view. */
export function Counter({
  value,
  prefix = "",
  suffix = "",
  duration = 1.8,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });

  useEffect(() => {
    if (!inView || !ref.current) return;
    const node = ref.current;
    const controls = animate(0, value, {
      duration,
      ease: EASE,
      onUpdate: (v) => {
        node.textContent = `${prefix}${Math.round(v)}${suffix}`;
      },
    });
    return () => controls.stop();
  }, [inView, value, prefix, suffix, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {value}
      {suffix}
    </span>
  );
}

/** Element that leans toward the cursor. */
export function Magnetic({ children, strength = 0.3, className }: { children: ReactNode; strength?: number; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });

  return (
    <motion.div
      ref={ref}
      className={cn("inline-block", className)}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current?.getBoundingClientRect();
        if (!r) return;
        x.set((e.clientX - (r.left + r.width / 2)) * strength);
        y.set((e.clientY - (r.top + r.height / 2)) * strength);
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/** Infinite horizontal ticker. Content is duplicated for a seamless loop. */
export function Marquee({
  children,
  duration = 60,
  className,
}: {
  children: ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div className={cn("marquee relative flex w-full max-w-full overflow-hidden contain-paint [isolation:isolate]", className)}>
      <div
        className="marquee-track flex shrink-0 items-center will-change-transform"
        style={{ ["--marquee-duration" as string]: `${duration}s` }}
      >
        <div className="flex shrink-0 items-center">{children}</div>
        <div className="flex shrink-0 items-center" aria-hidden>
          {children}
        </div>
      </div>
    </div>
  );
}
