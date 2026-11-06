import { AnimatePresence, motion, useMotionValueEvent, useScroll } from "motion/react";
import { useRef, useState } from "react";

import { phases } from "@/content/site";
import { cn } from "@/lib/utils";

import { EASE, FadeUp } from "./motion";

/** Desktop: pinned stage that advances through the five phases as you scroll. Mobile: a stacked list. */
export function PinnedPhases() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });
  const [active, setActive] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const next = Math.min(phases.length - 1, Math.max(0, Math.floor(v * phases.length)));
    setActive((prev) => (prev !== next ? next : prev));
  });

  const p = phases[active] ?? phases[0]!;

  return (
    <>
      {/* Desktop pinned version */}
      <div ref={ref} className="relative hidden md:block" style={{ height: `${phases.length * 75}vh` }}>
        <div className="sticky top-0 flex h-screen items-center">
          <div className="container-x grid-12 w-full">
            <div className="col-span-7 flex flex-col">
              <div className="label-mono mb-6 flex items-center gap-3 text-muted-foreground">
                <span>Phase</span>
                <span className="text-foreground">{p.n} / 05</span>
              </div>
              <div className="relative h-[1.08em] overflow-hidden text-[clamp(9rem,17vw,16rem)]">
                <AnimatePresence mode="popLayout" initial={false}>
                  <motion.p
                    key={p.n}
                    className="numeral absolute left-0 top-0 leading-[1.08] text-foreground"
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-100%" }}
                    transition={{ duration: 0.9, ease: EASE }}
                  >
                    {p.n}
                  </motion.p>
                </AnimatePresence>
              </div>
              <div className="relative mt-6 min-h-[10rem]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={p.n}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.5, ease: EASE }}
                  >
                    <h3 className="display-md">{p.title}.</h3>
                    <p className="lede mt-3 max-w-[34ch] text-muted-foreground">{p.short}</p>
                    <p className="label-mono mt-6 inline-flex items-center gap-2 text-foreground">
                      <span className="size-1.5 rounded-full bg-blue" />
                      Gate: {p.gate}
                    </p>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>

            <div className="col-span-4 col-start-9 flex items-center">
              <div className="relative w-full pl-8">
                <div className="absolute bottom-0 left-0 top-0 w-px bg-border" />
                <motion.div
                  className="absolute left-0 top-0 w-px origin-top bg-blue"
                  style={{ scaleY: scrollYProgress, height: "100%" }}
                />
                <ol className="space-y-7">
                  {phases.map((ph, i) => (
                    <li
                      key={ph.n}
                      className={cn(
                        "flex items-baseline gap-5 transition-all duration-700 ease-out-expo",
                        i === active ? "translate-x-2 text-foreground" : "text-muted-foreground/60",
                      )}
                    >
                      <span className="label-mono">{ph.n}</span>
                      <span className="font-display text-3xl tracking-tight">{ph.title}</span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile stacked version */}
      <div className="container-x md:hidden">
        <ol className="border-t border-border">
          {phases.map((ph, i) => (
            <FadeUp key={ph.n} delay={i * 0.05}>
              <li className="border-b border-border py-8">
                <div className="flex items-baseline justify-between">
                  <h3 className="font-display text-3xl">{ph.title}.</h3>
                  <span className="numeral text-5xl text-muted-foreground/50">{ph.n}</span>
                </div>
                <p className="mt-3 text-muted-foreground">{ph.short}</p>
                <p className="label-mono mt-4 flex items-center gap-2">
                  <span className="size-1.5 rounded-full bg-blue" />
                  Gate: {ph.gate}
                </p>
              </li>
            </FadeUp>
          ))}
        </ol>
      </div>
    </>
  );
}
