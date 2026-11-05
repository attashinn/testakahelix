import { createFileRoute } from "@tanstack/react-router";

import binders from "@/assets/sop-binders.jpg";
import floorplan from "@/assets/lab-floorplan.jpg";
import { Cta } from "@/components/site/Cta";
import { FadeUp, ImageReveal, RevealText } from "@/components/site/motion";
import { PinnedPhases } from "@/components/site/PinnedPhases";
import { PageHero, SectionLabel } from "@/components/site/Section";
import { boundaries, engagementModels } from "@/content/site";

export const Route = createFileRoute("/approach")({
  head: () => ({
    meta: [
      { title: "Approach — Five phases, a sign-off at every gate · AKAHELIX" },
      {
        name: "description",
        content:
          "Assess, Design, Validate, Prepare, Launch. How an AKAHELIX engagement runs, how it is priced, and what we will and will not do.",
      },
      { property: "og:title", content: "Approach — AKAHELIX" },
      {
        property: "og:description",
        content: "Five phases, each closed by a signed-off gate. Fixed fees, honest scope.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ApproachPage,
});

function ApproachPage() {
  return (
    <>
      <PageHero
        label="Approach"
        title="Five phases, each closed by a signed-off gate."
        lede="Every engagement moves through the same five phases, and you sign off each gate before the next phase is billed. A single test or category enters at phase 3; a new laboratory runs all five."
        image={floorplan}
        imageAlt="A scale model of a molecular laboratory with separate rooms on a one-way corridor"
        caption="Fig. 01 — Phase 02 output: a floor plan with one-way pre-PCR to post-PCR flow"
      />

      <section className="pb-12">
        <div className="container-x">
          <SectionLabel n="01">The phases</SectionLabel>
        </div>
        <PinnedPhases />
      </section>

      <section className="bg-mist py-24 md:py-36">
        <div className="container-x">
          <SectionLabel n="02">Ways to engage</SectionLabel>
          <div className="grid-12 mb-16 gap-y-6">
            <RevealText text="Fixed fees, agreed in writing after a free scoping call." className="display-lg col-span-12 max-w-[18ch] md:col-span-9" />
          </div>
          <div className="grid gap-px border border-rule bg-rule md:grid-cols-3">
            {engagementModels.map((m, i) => (
              <FadeUp key={m.model} delay={i * 0.08} className="bg-mist">
                <div className="flex h-full min-h-[20rem] flex-col justify-between p-8 md:p-10">
                  <div>
                    <span className="label-mono text-muted-foreground">E—0{i + 1}</span>
                    <h3 className="mt-6 font-display text-[2rem] tracking-[-0.025em]">{m.model}</h3>
                    <p className="label-mono mt-2 text-muted-foreground">{m.suited}</p>
                  </div>
                  <p className="mt-10 leading-relaxed">{m.basis}</p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      <section className="container-x py-24 md:py-36">
        <SectionLabel n="03">Scope and boundaries</SectionLabel>
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <RevealText text="We build the laboratory. Your directors hold the licences." className="display-md max-w-[16ch]" />
            <div className="mt-10 hidden md:block">
              <ImageReveal src={binders} alt="Quality manuals and SOP binders with blue index tabs" width={1280} height={1280} className="aspect-[4/3]" />
            </div>
          </div>
          <ul className="col-span-12 border-t border-border md:col-span-6 md:col-start-7">
            {boundaries.map((b, i) => (
              <FadeUp key={b.title} delay={0.04}>
                <li className="flex gap-6 border-b border-border py-7">
                  <span className="label-mono pt-1.5 text-muted-foreground">0{i + 1}</span>
                  <div>
                    <h3 className="font-display text-xl tracking-tight md:text-2xl">{b.title}</h3>
                    <p className="mt-2 text-muted-foreground">{b.body}</p>
                  </div>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
        <FadeUp className="mt-16">
          <Cta to="/contact" size="lg">
            Agree scope on a first call
          </Cta>
        </FadeUp>
      </section>
    </>
  );
}
