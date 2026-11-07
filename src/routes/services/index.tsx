import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "@phosphor-icons/react";

import assayValidation from "@/assets/assay-validation.png";
import costModel from "@/assets/cost-model.png";
import floorPlan from "@/assets/floor-plan.png";
import flowCell from "@/assets/flow-cell.jpg";
import licensingPermits from "@/assets/licensing-permits.png";
import metaphase from "@/assets/metaphase-spread.jpg";
import microscope from "@/assets/microscope.jpg";
import binders from "@/assets/sop-binders.jpg";
import { Cta } from "@/components/site/Cta";
import { FadeUp, ImageReveal, RevealText } from "@/components/site/motion";
import { PageHero, SectionLabel } from "@/components/site/Section";
import { serviceLines, testMenu } from "@/content/site";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — AKAHELIX laboratory set-up, licensing and validation" },
      {
        name: "description",
        content:
          "Eight comprehensive service lines from send-out feasibility and lab design to CLIA, NYSDOH and CAP licensing, assay validation, quality systems, inspection readiness and staff training.",
      },
      { property: "og:title", content: "Services — AKAHELIX" },
      {
        property: "og:description",
        content:
          "From first floor plan to steady-state operation. Take the full set, or any one of them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesIndexPage,
});

const serviceVisuals: Record<number, { src: string; alt: string; caption: string }> = {
  0: {
    src: costModel,
    alt: "Send-out feasibility and build-versus-buy financial modeling",
    caption: "Fig. S-01 — Forensic invoice audit and per-sample break-even curves",
  },
  1: {
    src: floorPlan,
    alt: "Laboratory design and set-up floor plan with clean unidirectional flow",
    caption: "Fig. S-02 — Floor plan with unidirectional pre- and post-PCR flow",
  },
  2: {
    src: licensingPermits,
    alt: "Licensing and accreditation pathway for CLIA, NYS CLEP and CAP",
    caption: "Fig. S-03 — Licensing pathway through CLIA, NYS CLEP and CAP",
  },
  3: {
    src: assayValidation,
    alt: "Assay validation and New York State LDT submission packages",
    caption: "Fig. S-04 — Validation plans and New York State LDT submission packages",
  },
  4: {
    src: binders,
    alt: "Quality management system and SOP library",
    caption: "Fig. S-05 — SOP library, QC rules and proficiency testing",
  },
  5: {
    src: microscope,
    alt: "Inspection readiness and mock CAP surveys",
    caption: "Fig. S-06 — Mock CAP inspections and deficiency remediation",
  },
  6: {
    src: metaphase,
    alt: "Interpretation and clinical diagnostic reporting",
    caption: "Fig. S-07 — ACMG/AMP variant curation and ISCN nomenclature",
  },
  7: {
    src: flowCell,
    alt: "Staff training and hands-on wet bench handover",
    caption: "Fig. S-08 — Bench competency checklists and director sign-out",
  },
};

function ServicesIndexPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="From first floor plan to steady-state operation."
        lede="Eight comprehensive service lines cover a clinical molecular and cytogenetics laboratory end to end. Clients take the full set or any one of them, and every deliverable is anchored to the exact federal, state, or CAP regulation it will be judged against."
        image={metaphase}
        imageAlt="A spread of metaphase chromosomes in cobalt blue"
        caption="Fig. 01 — Metaphase spread, the starting point of a karyotype"
      />

      <section className="container-x pb-24 md:pb-36">
        <SectionLabel n="01">Service lines</SectionLabel>
        <p className="mb-8 max-w-[65ch] text-muted-foreground text-sm">
          Select any service line below to inspect its itemized deliverables, regulatory compliance
          crosswalk, step-by-step phased timeline, and case evidence.
        </p>

        <ol className="border-t border-border">
          {serviceLines.map((s, i) => (
            <FadeUp key={s.title} delay={0.04}>
              <li className="group grid-12 gap-y-6 border-b border-border py-12 md:py-16">
                <span className="numeral col-span-12 text-5xl text-muted-foreground/45 transition-colors duration-700 group-hover:text-blue md:col-span-1 md:text-4xl">
                  {String(i + 1).padStart(2, "0")}
                </span>

                <div className="col-span-12 md:col-span-4">
                  <Link
                    to={`/services/${s.slug}` as any}
                    className="inline-block group-hover:text-blue transition-colors duration-300"
                  >
                    <h2 className="font-display text-[clamp(1.75rem,3vw,2.5rem)] leading-[1.08] tracking-[-0.025em]">
                      {s.title}
                    </h2>
                  </Link>

                  {serviceVisuals[i] && (
                    <Link
                      to={`/services/${s.slug}` as any}
                      className="block mt-6 overflow-hidden rounded-[4px] border border-border bg-paper shadow-2xs transition-all duration-500 hover:border-blue/50"
                    >
                      <img
                        src={serviceVisuals[i]!.src}
                        alt={serviceVisuals[i]!.alt}
                        loading="lazy"
                        decoding="async"
                        className="w-full object-cover aspect-[16/10] transition-transform duration-700 ease-out-expo group-hover:scale-[1.03] transform-gpu"
                      />
                      <p className="label-mono border-t border-border bg-mist/30 px-3 py-2 text-[0.6875rem] text-muted-foreground">
                        {serviceVisuals[i]!.caption}
                      </p>
                    </Link>
                  )}
                </div>

                <div className="col-span-12 md:col-span-6 md:col-start-7 flex flex-col justify-between">
                  <div>
                    <p className="label-mono mb-2 text-muted-foreground">What you receive</p>
                    <p className="leading-relaxed text-lg text-ink">{s.receives}</p>
                  </div>

                  <div className="mt-8 space-y-4 border-t border-border/60 pt-4">
                    <p className="label-mono flex flex-wrap gap-2 text-muted-foreground">
                      <span className="text-foreground font-medium">Anchored to</span>
                      <span>{s.anchor}</span>
                    </p>

                    <div className="pt-2">
                      <Link
                        to={`/services/${s.slug}` as any}
                        className="inline-flex items-center gap-2 rounded-[3px] bg-blue/10 px-3.5 py-2 text-xs font-mono font-medium text-blue transition-colors hover:bg-blue hover:text-white"
                      >
                        <span>View dedicated service page & specifications</span>
                        <ArrowUpRight className="size-3.5" />
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            </FadeUp>
          ))}
        </ol>
      </section>

      <section className="container-x pb-24 md:pb-36">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 md:col-span-7">
            <ImageReveal
              src={microscope}
              alt="A laboratory microscope with blue stage and focus controls"
              width={1280}
              height={1280}
              className="aspect-[4/3]"
            />
            <p className="label-mono mt-3 text-muted-foreground">
              Fig. 02 — Bench microscopy for cytogenetics
            </p>
          </div>
          <div className="col-span-12 flex flex-col justify-end md:col-span-4 md:col-start-9">
            <RevealText
              text="Only what has been validated, signed out or published on."
              className="display-md"
            />
            <FadeUp>
              <p className="mt-6 text-muted-foreground">
                The menu below is limited to testing Dr. Azad and our leadership have validated,
                signed out or published on. Each row cites its regulatory evidence and publication
                benchmark.
              </p>
            </FadeUp>
          </div>
        </div>
      </section>

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x">
          <SectionLabel n="02">Test menu we can stand up</SectionLabel>
          <div className="border-t border-rule">
            {testMenu.map((t, i) => (
              <FadeUp key={t.area} delay={0.03}>
                <div className="grid-12 gap-y-4 border-b border-rule py-9">
                  <div className="col-span-12 md:col-span-4">
                    <span className="label-mono text-muted-foreground">M—0{i + 1}</span>
                    <h3 className="mt-3 font-display text-2xl tracking-[-0.02em] md:text-[1.9rem]">
                      {t.area}
                    </h3>
                  </div>
                  <p className="col-span-12 leading-relaxed md:col-span-4">{t.tests}</p>
                  <dl className="col-span-12 space-y-4 md:col-span-3 md:col-start-10">
                    <div>
                      <dt className="label-mono text-muted-foreground">Platforms</dt>
                      <dd className="mt-1 text-[0.9375rem]">{t.platforms}</dd>
                    </div>
                    <div>
                      <dt className="label-mono text-muted-foreground">Evidence</dt>
                      <dd className="mt-1 text-[0.875rem] text-muted-foreground">{t.evidence}</dd>
                    </div>
                  </dl>
                </div>
              </FadeUp>
            ))}
          </div>
          <FadeUp className="mt-14 flex flex-wrap items-center justify-between gap-6">
            <p className="max-w-[44ch] font-display text-2xl tracking-tight">
              Need one test, not a whole lab? That starts at phase 3.
            </p>
            <Cta to="/approach" variant="outline">
              How an engagement runs
            </Cta>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
