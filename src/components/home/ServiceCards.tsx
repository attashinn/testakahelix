import { ArrowRight, Check } from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import metaphase from "@/assets/metaphase-spread.jpg";
import binders from "@/assets/sop-binders.jpg";
import { ArrowBox } from "@/components/site/Cta";
import { EASE, FadeUp } from "@/components/site/motion";
import { homeServices } from "@/content/site";

type Visual = (typeof homeServices)[number]["visual"];

export function ServiceCards() {
  return (
    <div className="grid gap-3 lg:grid-cols-2">
      {homeServices.map((s, i) => (
        <FadeUp key={s.title} delay={(i % 2) * 0.08}>
          <Link
            to="/services"
            className="group flex h-full flex-col rounded-[4px] bg-paper p-6 text-ink transition-transform duration-700 ease-out-expo hover:-translate-y-1 md:p-8"
          >
            <div className="grid gap-4 md:grid-cols-[8.5rem_1fr]">
              <span className="label-mono text-muted-foreground">
                S—0{i + 1}
                <br />
                {s.label}
              </span>
              <div>
                <h3 className="text-[clamp(1.5rem,2.2vw,2rem)] leading-[1.08] tracking-[-0.04em]">{s.title}</h3>
                <p className="mt-3 max-w-[44ch] text-[0.9375rem] leading-relaxed text-muted-foreground">{s.body}</p>
              </div>
            </div>

            <div className="my-8 flex-1">
              <ServiceVisual kind={s.visual} />
            </div>

            <div className="flex items-end justify-between gap-4">
              <ArrowBox />
              <ul className="flex flex-wrap justify-end gap-1.5">
                {s.tags.map((t) => (
                  <li key={t} className="label-mono inline-flex items-center gap-1.5 rounded-[3px] bg-mist px-2 py-1">
                    <span className="size-1.5 bg-mist-deep" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </Link>
        </FadeUp>
      ))}
    </div>
  );
}

function ServiceVisual({ kind }: { kind: Visual }) {
  switch (kind) {
    case "cost":
      return <CostBars />;
    case "flow":
      return <FlowDiagram />;
    case "route":
      return <RouteSteps />;
    case "report":
      return <ReportMock />;
    case "binders":
      return <Photo src={binders} alt="A row of quality manuals and SOP binders with blue index tabs" />;
    case "spread":
      return <Photo src={metaphase} alt="A spread of metaphase chromosomes, the basis of a karyotype report" />;
  }
}

function Photo({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="h-56 overflow-hidden rounded-[3px] bg-mist md:h-64">
      <img
        src={src}
        alt={alt}
        loading="lazy"
        className="h-full w-full object-cover transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105"
      />
    </div>
  );
}

/** Reference lab vs in-house cost per sample, from the SMA case. */
function CostBars() {
  const rows = [
    { label: "Reference laboratory", value: 1, note: "Price per sample" },
    { label: "In-house assay", value: 0.34, note: "About one-third" },
  ];
  return (
    <div className="flex h-56 flex-col justify-center gap-6 rounded-[3px] bg-mist p-6 md:h-64">
      {rows.map((r, i) => (
        <div key={r.label}>
          <div className="mb-2 flex justify-between text-[0.8125rem]">
            <span>{r.label}</span>
            <span className="label-mono text-muted-foreground">{r.note}</span>
          </div>
          <div className="h-9 bg-paper">
            <motion.div
              className={i === 0 ? "h-full origin-left bg-mist-deep" : "h-full origin-left bg-blue"}
              style={{ width: `${r.value * 100}%` }}
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true, margin: "0px 0px -15% 0px" }}
              transition={{ duration: 1.4, ease: EASE, delay: 0.2 + i * 0.25 }}
            />
          </div>
        </div>
      ))}
      <p className="label-mono text-muted-foreground">SMA carrier screening case · 67% lower annual cost</p>
    </div>
  );
}

/** One-way workflow from clean to amplified areas. */
function FlowDiagram() {
  const rooms = [
    { name: "Reagent prep", zone: "Pre-PCR" },
    { name: "Sample prep", zone: "Pre-PCR" },
    { name: "Amplification", zone: "Post-PCR" },
    { name: "Analysis", zone: "Post-PCR" },
  ];
  return (
    <div className="flex h-56 flex-col justify-center rounded-[3px] bg-mist p-5 md:h-64 md:p-6">
      <div className="label-mono mb-3 grid grid-cols-2 text-muted-foreground">
        <span>Pre-PCR · clean</span>
        <span className="pl-2">Post-PCR · amplified</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5">
        {rooms.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.12 }}
            className={
              r.zone === "Pre-PCR"
                ? "flex aspect-[3/4] flex-col justify-between bg-paper p-2.5 md:p-3"
                : "flex aspect-[3/4] flex-col justify-between bg-blue p-2.5 text-on-blue md:p-3"
            }
          >
            <span className="label-mono opacity-70">0{i + 1}</span>
            <span className="hyphens-auto break-words text-[0.6875rem] leading-tight sm:text-[0.75rem] md:text-[0.8125rem]" lang="en">{r.name}</span>
          </motion.div>
        ))}
      </div>
      <div className="relative mt-4 h-px bg-mist-deep">
        <motion.span
          className="absolute -top-[3px] left-0 size-[7px] bg-blue"
          animate={{ left: ["0%", "100%"] }}
          transition={{ duration: 4, ease: "linear", repeat: Infinity }}
        />
      </div>
      <p className="label-mono mt-3 flex items-center gap-2 text-muted-foreground">
        One-way flow <ArrowRight className="size-3" /> samples never travel back
      </p>
    </div>
  );
}

/** The licensing route, step by step. */
function RouteSteps() {
  const steps = [
    { k: "CLIA", v: "High-complexity certificate" },
    { k: "NYS CLEP", v: "Permit categories and directors" },
    { k: "CAP", v: "Accreditation application" },
    { k: "ISO 15189", v: "For laboratories abroad" },
  ];
  return (
    <ol className="flex h-56 flex-col justify-center gap-0 rounded-[3px] bg-mist px-6 md:h-64">
      {steps.map((s, i) => (
        <motion.li
          key={s.k}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: EASE, delay: 0.1 + i * 0.12 }}
          className="flex items-center gap-4 border-b border-mist-deep py-2.5 last:border-b-0"
        >
          <span className="flex size-6 shrink-0 items-center justify-center bg-blue text-[0.6875rem] text-on-blue">{i + 1}</span>
          <span className="w-24 shrink-0 text-[0.9375rem] tracking-[-0.02em]">{s.k}</span>
          <span className="text-[0.8125rem] text-muted-foreground">{s.v}</span>
        </motion.li>
      ))}
    </ol>
  );
}

/** A validation summary, as delivered. Figures are from the published NGS chimerism validation. */
function ReportMock() {
  const checks = ["Accuracy", "Precision", "Reportable range", "Analytical sensitivity", "Analytical specificity"];
  return (
    <div className="flex h-56 items-end justify-center overflow-hidden rounded-[3px] bg-mist px-6 pt-6 md:h-64">
      <div className="w-full max-w-[22rem] translate-y-3 bg-paper p-5 shadow-[0_1px_0_var(--rule)] transition-transform duration-700 ease-out-expo group-hover:translate-y-0">
        <div className="flex items-center justify-between border-b border-border pb-3">
          <span className="label-mono">Validation summary</span>
          <span className="label-mono text-blue">LDT 104445</span>
        </div>
        <ul className="mt-3 space-y-1.5">
          {checks.map((c, i) => (
            <motion.li
              key={c}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 + i * 0.12 }}
              className="flex items-center justify-between text-[0.8125rem]"
            >
              <span>{c}</span>
              <Check weight="bold" className="size-3.5 text-blue" />
            </motion.li>
          ))}
        </ul>
        <div className="label-mono mt-4 flex justify-between border-t border-border pt-3 text-muted-foreground">
          <span>270 samples</span>
          <span>to 0.1% recipient DNA</span>
        </div>
      </div>
    </div>
  );
}
