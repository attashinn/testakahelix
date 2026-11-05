import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import strand from "@/assets/process-strand.jpg";
import { DrawLine, EASE, FadeUp } from "@/components/site/motion";
import { SectionHead } from "@/components/site/Section";
import { phases } from "@/content/site";

// Card offsets (rem) so the phases sit at staggered heights above the strand.
const OFFSETS = [0, 8, 2.5, 10, 4.5];

export function ProcessStrand() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const x = useTransform(scrollYProgress, [0, 1], ["2%", "-4%"]);

  return (
    <section ref={ref} className="surface-blue relative overflow-hidden pt-24 md:pt-36">
      <div className="container-x">
        <SectionHead
          n="04"
          kicker="How it works"
          tone="blue"
          title="From floor plan to first patient result."
          body="Five phases, each closed by a gate you sign off before the next one is billed. A single new test starts at phase 3. A new laboratory runs all five."
        />
      </div>

      {/* Desktop: staggered cards with lines dropping onto the strand */}
      <div className="container-x relative z-10 hidden md:block">
        <div className="grid h-[34rem] grid-cols-5 gap-4">
          {phases.map((p, i) => (
            <div key={p.n} className="flex h-full flex-col items-start">
              <div style={{ height: `${OFFSETS[i]}rem` }} className="shrink-0" />
              <FadeUp delay={i * 0.12} className="w-full">
                <div className="rounded-[4px] border border-on-blue-line bg-blue p-5">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-[1.375rem] tracking-[-0.03em]">{p.title}</h3>
                    <span className="label-mono text-on-blue-muted">{p.n}</span>
                  </div>
                  <p className="mt-3 text-[0.875rem] leading-relaxed text-on-blue-muted">{p.short}</p>
                  <p className="label-mono mt-5 border-t border-on-blue-line pt-3 text-on-blue">Gate · {p.gate}</p>
                </div>
              </FadeUp>
              <div className="ml-6 flex flex-1 flex-col items-center">
                <DrawLine delay={0.3 + i * 0.15} className="flex-1 bg-on-blue/60" />
                <motion.span
                  className="block size-3 rounded-full border-2 border-on-blue bg-blue"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 1 + i * 0.15 }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Phone: a stacked list on a rail */}
      <ol className="container-x relative z-10 md:hidden">
        {phases.map((p, i) => (
          <FadeUp key={p.n} delay={i * 0.05}>
            <li className="relative border-l border-on-blue-line pb-8 pl-6">
              <span className="absolute -left-[6px] top-1 size-3 rounded-full border-2 border-on-blue bg-blue" />
              <div className="flex items-baseline justify-between">
                <h3 className="text-2xl tracking-[-0.03em]">{p.title}</h3>
                <span className="label-mono text-on-blue-muted">{p.n}</span>
              </div>
              <p className="mt-2 text-[0.9375rem] text-on-blue-muted">{p.short}</p>
              <p className="label-mono mt-3">Gate · {p.gate}</p>
            </li>
          </FadeUp>
        ))}
      </ol>

      <motion.img
        src={strand}
        alt="A long DNA strand, standing for the five phases of an engagement"
        width={1920}
        height={960}
        loading="lazy"
        style={{ x }}
        className="relative -mt-4 block w-[112%] max-w-none md:-mt-[25vw] md:w-[108%]"
      />
    </section>
  );
}
