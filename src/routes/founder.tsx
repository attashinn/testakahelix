import { createFileRoute } from "@tanstack/react-router";

import portrait from "@/assets/azad-portrait.jpg";
import { Cta, TextLink } from "@/components/site/Cta";
import { FadeUp, ImageReveal, RevealText, introDelay } from "@/components/site/motion";
import { SectionLabel } from "@/components/site/Section";
import { book, credentials, profiles, route, teaching } from "@/content/site";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Dr. Abul Kalam Azad, MD, MSc, PhD — Founder · AKAHELIX" },
      {
        name: "description",
        content:
          "Laboratory geneticist, molecular pathology laboratory director, CAP inspector since 2020 and NYS-qualified technical director in cytogenetics, genetic testing and molecular oncology.",
      },
      { property: "og:title", content: "Dr. Abul Kalam Azad — Founder of AKAHELIX" },
      {
        property: "og:description",
        content: "Trained and worked across five continents, from Dhaka and Bangkok to Leuven, Toronto, Houston and New York.",
      },
      { property: "og:type", content: "profile" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: FounderPage,
});

function FounderPage() {
  return (
    <>
      <section className="container-x pb-20 pt-32 md:pb-32 md:pt-44">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-7">
            <FadeUp onMount delay={introDelay(0)} y={10}>
              <p className="label-mono mb-8 text-muted-foreground">Founder & CEO</p>
            </FadeUp>
            <RevealText as="h1" onMount delay={introDelay(0.05)} text="Abul Kalam Azad" className="display-xl max-w-[9ch]" />
            <FadeUp onMount delay={introDelay(0.4)}>
              <p className="label-mono mt-6 text-muted-foreground">MD, MSc, PhD · Port Chester & Bronx, New York</p>
            </FadeUp>
            <FadeUp onMount delay={introDelay(0.5)} className="mt-12 max-w-[56ch] space-y-5 text-[1.0625rem] leading-relaxed">
              <p>
                Laboratory geneticist and molecular pathology laboratory director at a New York academic medical
                center, and Assistant Professor of Pathology at Albert Einstein College of Medicine. He develops and
                validates in-house molecular and cytogenetic assays — among them NGS somatic mutation panels and a
                real-time qPCR assay for SMA carrier screening.
              </p>
              <p className="text-muted-foreground">
                His research spans somatic and germline variation, molecular pathogenesis and cancer genomics. He curates
                variants and genes for NIH ClinVar and ClinGen and for the Leiden Open Variation Database, reviews for
                eight journals, inspects laboratories for the College of American Pathologists, and teaches medical
                students, residents and fellows.
              </p>
            </FadeUp>
          </div>
          <div className="col-span-12 md:col-span-5">
            <ImageReveal
              src={portrait}
              alt="Portrait of Dr. Abul Kalam Azad"
              width={1800}
              height={1200}
              priority
              parallax={5}
              delay={introDelay(0.2)}
              className="aspect-[4/5] md:mt-20"
              imgClassName="object-[58%_center] grayscale transition-[filter] duration-1000 hover:grayscale-0"
            />
            <p className="label-mono mt-3 text-muted-foreground">Bronx, New York</p>
          </div>
        </div>
      </section>

      <section className="container-x pb-24 md:pb-36">
        <SectionLabel n="01">Credentials</SectionLabel>
        <dl className="grid gap-x-12 md:grid-cols-2">
          {credentials.map((c, i) => (
            <FadeUp key={c.k} delay={(i % 2) * 0.06}>
              <div className="border-b border-border py-7">
                <dt className="label-mono text-muted-foreground">{c.k}</dt>
                <dd className="mt-3 font-display text-xl leading-snug tracking-tight md:text-[1.4rem]">{c.v}</dd>
              </div>
            </FadeUp>
          ))}
        </dl>
      </section>

      <section className="surface-blue py-24 md:py-36">
        <div className="container-x">
          <SectionLabel n="02" tone="blue">
            The route
          </SectionLabel>
          <div className="grid-12 mb-16">
            <RevealText
              text="Trained and worked across five continents, so labs fit their setting, in the US or abroad."
              className="display-md col-span-12 max-w-[24ch] md:col-span-9"
            />
          </div>
          <ol className="border-t border-on-blue-line">
            {route.map((r, i) => (
              <FadeUp key={r.city} delay={0.04}>
                <li className="group grid-12 items-baseline gap-y-2 border-b border-on-blue-line py-8">
                  <span className="label-mono col-span-2 text-on-blue-muted md:col-span-1">0{i + 1}</span>
                  <span className="col-span-10 font-display text-[clamp(2.25rem,5vw,4.25rem)] leading-none tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-3 md:col-span-4">
                    {r.city}
                  </span>
                  <span className="label-mono col-span-12 text-on-blue-muted md:col-span-2">{r.years}</span>
                  <span className="col-span-12 text-on-blue-muted md:col-span-5">{r.what}</span>
                </li>
              </FadeUp>
            ))}
          </ol>
        </div>
      </section>

      <section className="container-x py-24 md:py-36">
        <SectionLabel n="03">On teaching</SectionLabel>
        <div className="grid-12 mb-16">
          <RevealText
            text="“The most rewarding part is watching a trainee move from asking what a result means to asking whether to believe it.”"
            className="display-md col-span-12 max-w-[28ch] md:col-span-10"
          />
        </div>
        <div className="grid gap-px border border-border bg-border md:grid-cols-3">
          {teaching.map((t, i) => (
            <FadeUp key={t.title} delay={i * 0.08} className="bg-background">
              <div className="flex h-full flex-col justify-between gap-10 p-8 md:p-10">
                <span className="label-mono text-muted-foreground">Principle 0{i + 1}</span>
                <div>
                  <h3 className="font-display text-2xl tracking-tight">{t.title}</h3>
                  <p className="mt-3 text-muted-foreground">{t.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      <section className="container-x pb-24 md:pb-36">
        <SectionLabel n="04">Public record</SectionLabel>
        <div className="grid-12 gap-y-10">
          <FadeUp className="col-span-12 md:col-span-6">
            <p className="font-display text-2xl leading-snug tracking-tight md:text-3xl">“{book.provenance}”</p>
            <p className="label-mono mt-6 text-muted-foreground">From the author's note, {book.title}</p>
          </FadeUp>
          <ul className="col-span-12 border-t border-border md:col-span-5 md:col-start-8">
            {profiles.map((p) => (
              <li key={p.href} className="border-b border-border py-5">
                <TextLink href={p.href} className="font-display text-2xl tracking-tight">
                  {p.label}
                </TextLink>
              </li>
            ))}
          </ul>
        </div>
        <FadeUp className="mt-16">
          <Cta to="/contact" size="lg">
            Talk to Dr. Azad
          </Cta>
        </FadeUp>
      </section>
    </>
  );
}
