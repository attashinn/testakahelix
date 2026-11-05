import { createFileRoute } from "@tanstack/react-router";
import { AnimatePresence, LayoutGroup, motion } from "motion/react";
import { useMemo, useState } from "react";

import flowCell from "@/assets/flow-cell.jpg";
import { TextLink } from "@/components/site/Cta";
import { Counter, EASE, FadeUp, RevealText } from "@/components/site/motion";
import { PageHero, SectionLabel } from "@/components/site/Section";
import { ldts, selectedWork, type LdtCategory } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/track-record")({
  head: () => ({
    meta: [
      { title: "Track record — 14 NYSDOH lab-developed tests · AKAHELIX" },
      {
        name: "description",
        content:
          "Fourteen laboratory-developed tests on file with the NYSDOH Wadsworth Center: 12 approved, 2 conditionally approved, across molecular genetics, oncology and transplant monitoring.",
      },
      { property: "og:title", content: "Track record — AKAHELIX" },
      {
        property: "og:description",
        content: "14 NYSDOH LDTs, a CLSI standard co-written, and validations published.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: TrackRecordPage,
});

const filters: ("All" | LdtCategory)[] = ["All", "Oncology", "Genetic Testing – Molecular", "Transplant Monitoring"];

function TrackRecordPage() {
  const [filter, setFilter] = useState<(typeof filters)[number]>("All");
  const rows = useMemo(() => (filter === "All" ? ldts : ldts.filter((l) => l.category === filter)), [filter]);
  const approved = ldts.filter((l) => l.status === "Approved").length;

  return (
    <>
      <PageHero
        label="Track record"
        title="Fourteen tests taken through New York State review."
        lede="Every project below is on file with the NYSDOH Wadsworth Center for a NYSDOH-permitted academic molecular laboratory, as of 3 November 2026. New York review runs on top of federal CLIA rules."
        image={flowCell}
        imageAlt="A sequencing flow cell resting on a white block"
        caption="Fig. 01 — NGS accounts for four of the fourteen approved tests"
      />

      <section className="container-x pb-16">
        <div className="grid grid-cols-3 border-y border-border">
          {[
            { v: ldts.length, l: "LDTs submitted" },
            { v: approved, l: "Approved" },
            { v: ldts.length - approved, l: "Conditionally approved" },
          ].map((s, i) => (
            <FadeUp key={s.l} delay={i * 0.08} className={cn("py-8 md:py-10", i > 0 && "border-l border-border pl-4 md:pl-8")}>
              <p className="numeral text-[clamp(3rem,7vw,6rem)]">
                <Counter value={s.v} />
              </p>
              <p className="label-mono mt-3 text-muted-foreground">{s.l}</p>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="container-x pb-24 md:pb-36">
        <SectionLabel n="01">NYSDOH LDT submissions</SectionLabel>

        <LayoutGroup>
          <div className="mb-8 flex flex-wrap gap-2" role="tablist" aria-label="Filter by permit category">
            {filters.map((f) => (
              <button
                key={f}
                type="button"
                role="tab"
                aria-selected={filter === f}
                onClick={() => setFilter(f)}
                className={cn(
                  "relative rounded-full border px-4 py-2 text-[0.8125rem] transition-colors duration-300",
                  filter === f ? "border-blue text-on-blue" : "border-border text-muted-foreground hover:text-foreground",
                )}
              >
                {filter === f && (
                  <motion.span
                    layoutId="filter-pill"
                    className="absolute inset-0 rounded-full bg-blue"
                    transition={{ duration: 0.5, ease: EASE }}
                  />
                )}
                <span className="relative">{f}</span>
              </button>
            ))}
          </div>

          <div className="label-mono hidden grid-cols-12 gap-4 border-b border-foreground pb-3 text-muted-foreground md:grid">
            <span className="col-span-1">Project</span>
            <span className="col-span-5">Test</span>
            <span className="col-span-2">Method</span>
            <span className="col-span-2">Permit category</span>
            <span className="col-span-2 text-right">Status</span>
          </div>

          <motion.ul layout className="relative">
            <AnimatePresence initial={false} mode="popLayout">
              {rows.map((l) => (
                <motion.li
                  layout
                  key={l.project}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="group grid grid-cols-12 gap-x-4 gap-y-2 border-b border-border py-5 transition-colors duration-500 hover:bg-blue-soft md:items-baseline"
                >
                  <span className="label-mono col-span-6 text-muted-foreground md:col-span-1">{l.project}</span>
                  <span className="col-span-6 flex justify-end md:hidden">
                    <Status status={l.status} />
                  </span>
                  <span className="col-span-12 font-display text-xl leading-snug tracking-tight md:col-span-5">{l.test}</span>
                  <span className="col-span-6 text-[0.875rem] text-muted-foreground md:col-span-2 md:text-foreground">{l.method}</span>
                  <span className="col-span-6 text-right text-[0.875rem] text-muted-foreground md:col-span-2 md:text-left">{l.category}</span>
                  <span className="hidden md:col-span-2 md:flex md:justify-end">
                    <Status status={l.status} />
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
          </motion.ul>
        </LayoutGroup>

        <FadeUp className="mt-8 max-w-[70ch] text-[0.875rem] text-muted-foreground">
          Every project appears in the public Wadsworth Center approved-LDT database, which lists the facility rather
          than the submitter. Authorship is Dr. Azad's own record.{" "}
          <TextLink href="https://www.wadsworth.org/regulatory/clep" className="text-foreground">
            Wadsworth CLEP
          </TextLink>
        </FadeUp>
      </section>

      <section className="surface-blue py-24 md:py-36">
        <div className="container-x">
          <SectionLabel n="02" tone="blue">
            Selected work
          </SectionLabel>
          <div className="grid-12 mb-16">
            <RevealText
              text="Assays validated and approved, a national standard co-written, and validations published."
              className="display-md col-span-12 max-w-[26ch] md:col-span-9"
            />
          </div>
          <ol className="border-t border-on-blue-line">
            {selectedWork.map((w, i) => (
              <FadeUp key={i} delay={0.03}>
                <li className="grid-12 gap-y-2 border-b border-on-blue-line py-7">
                  <span className="numeral col-span-12 text-3xl md:col-span-2">{w.year}</span>
                  <span className="col-span-12 text-[1.0625rem] leading-snug md:col-span-7">{w.work}</span>
                  <span className="label-mono col-span-12 text-on-blue-muted md:col-span-3 md:text-right">{w.type}</span>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>
    </>
  );
}

function Status({ status }: { status: string }) {
  return (
    <span className="label-mono inline-flex items-center gap-2 whitespace-nowrap">
      <span className={cn("size-1.5 rounded-full", status === "Approved" ? "bg-blue" : "bg-muted-foreground")} />
      {status === "Approved" ? "Approved" : "Conditional"}
    </span>
  );
}
