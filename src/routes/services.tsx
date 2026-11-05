import { createFileRoute } from "@tanstack/react-router";

import metaphase from "@/assets/metaphase-spread.jpg";
import microscope from "@/assets/microscope.jpg";
import { Cta } from "@/components/site/Cta";
import { FadeUp, ImageReveal, RevealText } from "@/components/site/motion";
import { PageHero, SectionLabel } from "@/components/site/Section";
import { serviceLines, testMenu } from "@/content/site";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — AKAHELIX laboratory set-up, licensing and validation" },
      {
        name: "description",
        content:
          "Seven service lines from feasibility and lab design to CLIA, NYSDOH and CAP licensing, assay validation, quality systems, inspection readiness and staff training.",
      },
      { property: "og:title", content: "Services — AKAHELIX" },
      {
        property: "og:description",
        content: "From first floor plan to steady-state operation. Take the full set, or any one of them.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title="From first floor plan to steady-state operation."
        lede="Seven services cover a laboratory end to end. Clients take the full set or any one of them, and every deliverable is anchored to the regulation or checklist it will be judged against."
        image={metaphase}
        imageAlt="A spread of metaphase chromosomes in cobalt blue"
        caption="Fig. 01 — Metaphase spread, the starting point of a karyotype"
      />

      <section className="container-x pb-24 md:pb-36">
        <SectionLabel n="01">Service lines</SectionLabel>
        <ol className="border-t border-border">
          {serviceLines.map((s, i) => (
            <FadeUp key={s.title} delay={0.04}>
              <li className="group grid-12 gap-y-4 border-b border-border py-10 md:py-12">
                <span className="numeral col-span-12 text-5xl text-muted-foreground/45 transition-colors duration-700 group-hover:text-foreground md:col-span-1 md:text-4xl">
                  {i + 1}
                </span>
                <h2 className="col-span-12 font-display text-[clamp(1.75rem,3vw,2.6rem)] leading-[1.05] tracking-[-0.025em] md:col-span-4">
                  {s.title}
                </h2>
                <div className="col-span-12 md:col-span-6 md:col-start-7">
                  <p className="label-mono mb-2 text-muted-foreground">What you receive</p>
                  <p className="leading-relaxed">{s.receives}</p>
                  <p className="label-mono mt-6 flex gap-2 text-muted-foreground">
                    <span className="text-foreground">Anchored to</span>
                    <span>{s.anchor}</span>
                  </p>
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
            <p className="label-mono mt-3 text-muted-foreground">Fig. 02 — Bench microscopy for cytogenetics</p>
          </div>
          <div className="col-span-12 flex flex-col justify-end md:col-span-4 md:col-start-9">
            <RevealText text="Only what has been validated, signed out or published on." className="display-md" />
            <FadeUp>
              <p className="mt-6 text-muted-foreground">
                The menu below is limited to testing Dr. Azad has validated, signed out or published on. Each row cites
                its evidence.
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
                    <h3 className="mt-3 font-display text-2xl tracking-[-0.02em] md:text-[1.9rem]">{t.area}</h3>
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
            <p className="max-w-[44ch] font-display text-2xl tracking-tight">Need one test, not a whole lab? That starts at phase 3.</p>
            <Cta to="/approach" variant="outline">
              How an engagement runs
            </Cta>
          </FadeUp>
        </div>
      </section>
    </>
  );
}
