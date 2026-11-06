import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import portrait from "@/assets/azad-portrait.jpg";
import heroHelix from "@/assets/hero-helix.jpg";
import { Cta, TextLink } from "@/components/site/Cta";
import { Counter, EASE, FadeUp, RevealText, introDelay } from "@/components/site/motion";
import { Chip } from "@/components/site/Section";
import { company } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1.14]);

  return (
    <section className="container-x pt-[5.25rem] md:pt-[6.25rem]">
      <motion.div
        ref={ref}
        className="surface-blue relative flex flex-col overflow-hidden rounded-[6px] md:min-h-[min(86svh,860px)]"
        initial={{ clipPath: "inset(6% 4% 6% 4% round 6px)" }}
        animate={{ clipPath: "inset(0% 0% 0% 0% round 6px)" }}
        transition={{ duration: 1.4, ease: [0.76, 0, 0.24, 1], delay: introDelay(0) }}
      >
        {/* Image: full-bleed behind text on desktop, its own band on phones */}
        <div className="relative order-2 aspect-[5/4] overflow-hidden md:absolute md:inset-y-0 md:left-[22%] md:right-0 md:order-none md:aspect-auto md:[mask-image:linear-gradient(90deg,transparent,black_30%)]">
          <motion.img
            src={heroHelix}
            alt="A DNA double helix rendered in frosted glass on a cobalt blue background"
            width={1920}
            height={1088}
            style={{ y, scale }}
            className="h-full w-full object-cover object-[72%_center] md:object-center transform-gpu will-change-transform"
          />
        </div>

        <div className="relative order-1 flex flex-1 flex-col justify-between gap-12 p-6 md:p-10 lg:p-12">
          <FadeUp onMount delay={introDelay(0.5)} y={10} className="flex flex-wrap items-center justify-between gap-3">
            <Chip tone="blue">Laboratory consultancy · {company.city}</Chip>
            <span className="label-mono hidden text-on-blue-muted md:inline">CLIA · NYSDOH CLEP · CAP · ISO 15189</span>
          </FadeUp>

          <div className="max-w-[44rem]">
            <RevealText
              as="h1"
              onMount
              delay={introDelay(0.55)}
              stagger={0.055}
              text="Genetics laboratories, built right the first time."
              className="display-xl max-w-[12ch]"
            />
            <FadeUp onMount delay={introDelay(0.95)}>
              <p className="lede mt-8 max-w-[40ch] text-on-blue-muted">
                AKAHELIX plans, builds and validates high-complexity molecular and cytogenetics laboratories, led by a
                practising CAP inspector and New York State–qualified laboratory director.
              </p>
            </FadeUp>
            <FadeUp onMount delay={introDelay(1.05)} className="mt-10 flex flex-wrap items-center gap-6">
              <Cta to="/contact" variant="light" size="lg">
                Book a free scoping call
              </Cta>
              <TextLink to="/track-record" className="text-[0.9375rem] text-on-blue">
                See the NYSDOH record
              </TextLink>
            </FadeUp>
          </div>

          <SpecCard />
        </div>

        <div className="relative order-3 grid grid-cols-2 border-t border-on-blue-line/60 md:grid-cols-3">
          <Stat value={14} text="Lab-developed tests taken through New York State review" />
          <Stat value={3} text="NYS director qualifications: cytogenetics, genetic testing, oncology" />
          <FadeUp
            onMount
            delay={introDelay(1.2)}
            className="col-span-2 flex items-center gap-4 border-t border-on-blue-line/60 p-6 md:col-span-1 md:border-l md:border-t-0 md:p-8 lg:px-12"
          >
            <img
              src={portrait}
              alt="Dr. Abul Kalam Azad"
              width={56}
              height={56}
              className="size-12 shrink-0 rounded-full object-cover object-[58%_30%] grayscale"
            />
            <p className="text-[0.875rem] leading-snug">
              CAP laboratory inspector since 2020
              <span className="mt-1 block text-on-blue-muted">Dr. Abul Kalam Azad, founder</span>
            </p>
          </FadeUp>
        </div>
      </motion.div>
    </section>
  );
}

function Stat({ value, text }: { value: number; text: string }) {
  return (
    <FadeUp
      onMount
      delay={introDelay(1.1)}
      className="flex flex-col items-start gap-3 p-5 even:border-l sm:flex-row sm:items-end sm:gap-4 sm:p-6 even:border-on-blue-line/60 md:border-l md:border-on-blue-line/60 md:p-8 md:first:border-l-0 lg:px-12"
    >
      <span className="numeral text-[clamp(2.5rem,4vw,3.5rem)]">
        <Counter value={value} />
      </span>
      <span className="max-w-[22ch] pb-1 text-[0.8125rem] leading-snug text-on-blue-muted">{text}</span>
    </FadeUp>
  );
}

/** Floating record card, set like a specimen label. Desktop only. */
function SpecCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1, ease: EASE, delay: introDelay(1.3) }}
      className="chamfer absolute right-10 top-28 hidden w-[19rem] bg-on-blue p-5 text-ink [--cut:1.5rem] lg:block xl:right-12"
    >
      <div className="flex items-center justify-between">
        <span className="label-mono text-muted-foreground">Latest approval</span>
        <span className="label-mono text-blue">NYSDOH</span>
      </div>
      <p className="mt-4 text-[1.375rem] leading-tight tracking-[-0.03em]">Transplant donor chimerism</p>
      <p className="label-mono mt-1 text-muted-foreground">LDT 104445 · NGS</p>
      <div className="mt-5 space-y-2">
        <div className="flex justify-between text-[0.8125rem]">
          <span className="text-muted-foreground">Validation samples</span>
          <span>270</span>
        </div>
        <div className="flex justify-between text-[0.8125rem]">
          <span className="text-muted-foreground">Detects down to</span>
          <span>0.1% recipient DNA</span>
        </div>
      </div>
      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <span className="label-mono inline-flex items-center gap-2 text-blue">
          <span className="relative flex size-2">
            <span className="absolute inset-0 animate-ping bg-blue opacity-40" />
            <span className="relative size-2 bg-blue" />
          </span>
          Approved
        </span>
        <span className="label-mono text-muted-foreground">J Mol Diagn 2026</span>
      </div>
    </motion.div>
  );
}
