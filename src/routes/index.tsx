import { ArrowUpRight, CheckCircle } from "@phosphor-icons/react";
import { Link, createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";

import portrait from "@/assets/azad-portrait.jpg";
import cover from "@/assets/genetic-blueprint-cover.jpg";
import chromosome from "@/assets/chromosome-white.jpg";
import flowCell from "@/assets/flow-cell.jpg";
import floorplan from "@/assets/lab-floorplan.jpg";
import pcrPlate from "@/assets/pcr-plate.jpg";
import { Hero } from "@/components/home/Hero";
import { ProcessStrand } from "@/components/home/ProcessStrand";
import { ServiceCards } from "@/components/home/ServiceCards";
import { Cta, TextLink } from "@/components/site/Cta";
import { Faq } from "@/components/site/Faq";
import { LdtTicker } from "@/components/site/LdtTicker";
import { Counter, EASE, FadeUp, ImageReveal, RevealText, ScrollFillText } from "@/components/site/motion";
import { Chip, SectionHead } from "@/components/site/Section";
import { audiences, ldts, pillars, proof, route, smaCase, standUp, whyUs } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "AKAHELIX — Genetics laboratories, built right the first time" },
      {
        name: "description",
        content:
          "AKAHELIX plans, builds and validates high-complexity molecular and cytogenetics laboratories, led by a practising CAP inspector and NYS-qualified laboratory director.",
      },
      { property: "og:title", content: "AKAHELIX — Genetics laboratories, built right the first time" },
      {
        property: "og:description",
        content: "Lab set-up, LDT validation and inspection readiness for molecular genetics, cytogenetics and oncology.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <Hero />
      <About />
      <ProofBar />
      <LdtTicker />
      <Focus />
      <Services />
      <CaseStudy />
      <ProcessStrand />
      <Record />
      <Founder />
      <Why />
      <FaqSection />
    </>
  );
}

function About() {
  return (
    <section className="container-x py-24 md:py-36">
      <div className="grid-12 gap-y-14">
        <div className="col-span-12 md:col-span-5">
          <FadeUp>
            <Chip>About AKAHELIX</Chip>
          </FadeUp>
          <ImageReveal
            src={chromosome}
            alt="A single metaphase chromosome rendered in cobalt blue"
            width={1280}
            height={1280}
            parallax={4}
            className="mt-8 aspect-square bg-paper"
          />
          <p className="label-mono mt-3 text-muted-foreground">Fig. 01 — Metaphase chromosome</p>
        </div>
        <div className="col-span-12 flex flex-col justify-between md:col-span-7 md:col-start-6 lg:col-span-6 lg:col-start-7">
          <ScrollFillText
            className="display-md md:pt-16"
            text="We take a genetics laboratory from floor plan to first patient result, and build it to pass CAP and New York State review the first time. The work is led by someone who inspects laboratories for a living."
          />
          <div className="mt-16">
            <p className="label-mono mb-5 text-muted-foreground">Who we work with</p>
            <ul className="grid gap-px border border-border bg-border sm:grid-cols-2">
              {audiences.map((a, i) => (
                <FadeUp key={a} delay={i * 0.06} className="bg-background">
                  <li className="flex h-full flex-col justify-between gap-8 p-5 md:p-6">
                    <span className="label-mono text-blue">0{i + 1}</span>
                    <span className="text-[1.0625rem] leading-snug tracking-[-0.015em]">{a}</span>
                  </li>
                </FadeUp>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofBar() {
  return (
    <section className="container-x pb-14">
      <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
        {proof.map((p, i) => (
          <FadeUp key={p.label} delay={i * 0.06} className={cn("rounded-[4px] bg-mist p-5 md:p-6", i === 0 && "col-span-2 md:col-span-1")}>
            <p className="numeral text-[clamp(2.5rem,4.2vw,3.75rem)] text-blue">
              {p.noCount ? (
                <span>
                  <span className="text-[0.4em] tracking-[-0.02em] text-muted-foreground">Since </span>
                  {p.value}
                </span>
              ) : (
                <Counter value={p.value} suffix={p.suffix} />
              )}
            </p>
            <p className="mt-6 max-w-[22ch] text-[0.8125rem] leading-snug text-muted-foreground">{p.label}</p>
          </FadeUp>
        ))}
      </div>
    </section>
  );
}

const focusImages = [
  { src: floorplan, alt: "A scale model of a molecular laboratory floor with a one-way corridor", fit: "object-cover" },
  { src: flowCell, alt: "A sequencing flow cell on a white block", fit: "object-cover" },
  { src: cover, alt: "Cover of Genetic Blueprint: Bench to Bed", fit: "object-contain p-10" },
];

function Focus() {
  return (
    <section className="container-x py-24 md:py-36">
      <SectionHead
        n="01"
        kicker="What we do"
        title="Three things, done by someone who has done them under inspection."
        body="Lab set-up, test validation, and the teaching behind both. Each one draws on the same record: fourteen tests through New York State review and five years on CAP inspection teams."
      />
      <div className="grid gap-3 md:grid-cols-3">
        {pillars.map((p, i) => {
          const img = focusImages[i]!;
          return (
            <FadeUp key={p.n} delay={i * 0.1}>
              <Link to={p.to} className="group chamfer flex h-full flex-col bg-mist">
                <div className="flex items-start justify-between p-6">
                  <h3 className="max-w-[12ch] text-[1.625rem] leading-[1.05] tracking-[-0.04em]">{p.title}</h3>
                  <span className="label-mono pr-8 text-muted-foreground">{p.n}</span>
                </div>
                <div className="relative mx-6 aspect-[4/3] overflow-hidden bg-mist-deep">
                  <img
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    className={cn("h-full w-full transition-transform duration-[1.4s] ease-out-expo group-hover:scale-105", img.fit)}
                  />
                </div>
                <div className="relative mt-6 flex flex-1 flex-col justify-between gap-8 overflow-hidden p-6">
                  <span className="absolute inset-0 origin-bottom scale-y-0 bg-blue transition-transform duration-700 ease-out-expo group-hover:scale-y-100" />
                  <p className="relative text-[0.9375rem] leading-relaxed text-muted-foreground transition-colors duration-500 group-hover:text-on-blue-muted">
                    {p.body}
                  </p>
                  <span className="relative inline-flex items-center gap-2 text-[0.875rem] font-medium transition-colors duration-500 group-hover:text-on-blue">
                    {p.cta}
                    <ArrowUpRight className="size-4 transition-transform duration-500 group-hover:rotate-45" />
                  </span>
                </div>
              </Link>
            </FadeUp>
          );
        })}
      </div>
    </section>
  );
}

function Services() {
  return (
    <section className="surface-blue py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          n="02"
          kicker="Services"
          tone="blue"
          title="Six ways we help. Take one, or the whole build."
          body="Every deliverable is written for you and anchored to the regulation or checklist it will be judged against."
        >
          <TextLink to="/services" className="mt-6 text-on-blue">
            All seven service lines
          </TextLink>
        </SectionHead>
        <ServiceCards />
        <FadeUp className="mt-3 grid-12 gap-y-4 rounded-[4px] border border-on-blue-line p-6 md:p-8">
          <p className="label-mono col-span-12 text-on-blue-muted md:col-span-3">What we can stand up</p>
          <p className="col-span-12 text-[1.125rem] leading-snug tracking-[-0.02em] md:col-span-9 md:text-[1.375rem]">{standUp}.</p>
        </FadeUp>
      </div>
    </section>
  );
}

function CaseStudy() {
  return (
    <section className="container-x py-24 md:py-36">
      <SectionHead n="03" kicker="Case study" title="SMA carrier screening, brought in-house." body={smaCase.intro} />
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 flex flex-col justify-between lg:col-span-7">
          <div className="flex flex-wrap items-end gap-x-8 gap-y-4 border-b border-border pb-10">
            <p className="numeral text-[clamp(6rem,15vw,12.5rem)] text-blue">
              <Counter value={67} suffix="%" duration={2.2} />
            </p>
            <p className="max-w-[18ch] pb-4 text-lg leading-snug tracking-[-0.02em]">lower annual cost for SMA testing</p>
          </div>

          <div className="mt-10 space-y-5">
            {[
              { label: "Before · national reference laboratory", w: 1, cls: "bg-mist-deep" },
              { label: "After · in-house assay, per sample", w: 0.34, cls: "bg-blue" },
            ].map((b, i) => (
              <div key={b.label}>
                <p className="label-mono mb-2 text-muted-foreground">{b.label}</p>
                <div className="h-12 bg-mist">
                  <motion.div
                    className={cn("h-full origin-left", b.cls)}
                    style={{ width: `${b.w * 100}%` }}
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                    transition={{ duration: 1.5, ease: EASE, delay: 0.15 + i * 0.3 }}
                  />
                </div>
              </div>
            ))}
          </div>

          <ul className="mt-12 grid gap-x-8 sm:grid-cols-2">
            {smaCase.points.map((p, i) => (
              <FadeUp key={p} delay={i * 0.06}>
                <li className="flex gap-3 border-t border-border py-5 text-[0.9375rem] leading-snug">
                  <CheckCircle weight="light" className="mt-0.5 size-5 shrink-0 text-blue" />
                  {p}
                </li>
              </FadeUp>
            ))}
          </ul>
          <FadeUp>
            <p className="mt-6 max-w-[56ch] text-[0.9375rem] text-muted-foreground">{smaCase.method}</p>
          </FadeUp>
        </div>

        <div className="col-span-12 lg:col-span-4 lg:col-start-9">
          <div className="relative">
            <ImageReveal
              src={pcrPlate}
              alt="A 96-well PCR plate and a strip of PCR tubes"
              width={1280}
              height={1280}
              className="aspect-[4/5]"
            />
            <FadeUp delay={0.3} className="absolute inset-x-4 bottom-4">
              <div className="chamfer bg-paper p-5 [--cut:1.25rem]">
                <p className="label-mono text-muted-foreground">On file with NYSDOH</p>
                <p className="mt-2 text-[1.0625rem] tracking-[-0.02em]">LDTs {smaCase.ldts}</p>
                <p className="label-mono mt-3 text-blue">Real-time qPCR · TaqMan genotyping</p>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

function Record() {
  const rows = ldts.slice(0, 6);
  const approved = ldts.filter((l) => l.status === "Approved").length;
  return (
    <section className="bg-mist py-24 md:py-36">
      <div className="container-x">
        <SectionHead
          n="05"
          kicker="Track record"
          title="Fourteen tests taken through New York State review."
          body="Every project is on file with the NYSDOH Wadsworth Center. New York review runs on top of federal CLIA rules."
        />
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 grid grid-cols-3 gap-3 lg:col-span-3 lg:grid-cols-1">
            {[
              { v: ldts.length, l: "Submitted" },
              { v: approved, l: "Approved" },
              { v: ldts.length - approved, l: "Conditional" },
            ].map((s) => (
              <FadeUp key={s.l} className="rounded-[4px] bg-paper p-5">
                <p className="numeral text-[clamp(2.5rem,4vw,3.5rem)]">
                  <Counter value={s.v} />
                </p>
                <p className="label-mono mt-3 text-muted-foreground">{s.l}</p>
              </FadeUp>
            ))}
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="rounded-[4px] bg-paper">
              <div className="label-mono hidden grid-cols-12 gap-4 border-b border-border px-6 py-4 text-muted-foreground md:grid">
                <span className="col-span-2">Project</span>
                <span className="col-span-6">Test</span>
                <span className="col-span-2">Method</span>
                <span className="col-span-2 text-right">Status</span>
              </div>
              <ul>
                {rows.map((l, i) => (
                  <FadeUp key={l.project} delay={i * 0.04} y={12}>
                    <li className="grid grid-cols-12 gap-x-4 gap-y-1 border-b border-border px-6 py-4 transition-colors duration-500 last:border-b-0 hover:bg-blue-soft md:items-baseline">
                      <span className="label-mono col-span-6 text-blue md:col-span-2">LDT {l.project}</span>
                      <span className="col-span-6 text-right md:hidden">
                        <StatusChip status={l.status} />
                      </span>
                      <span className="col-span-12 text-[1rem] leading-snug tracking-[-0.015em] md:col-span-6">{l.test}</span>
                      <span className="col-span-12 text-[0.8125rem] text-muted-foreground md:col-span-2">{l.method}</span>
                      <span className="hidden text-right md:col-span-2 md:block">
                        <StatusChip status={l.status} />
                      </span>
                    </li>
                  </FadeUp>
                ))}
              </ul>
            </div>
            <FadeUp className="mt-8">
              <Cta to="/track-record" variant="outline">
                See all fourteen
              </Cta>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusChip({ status }: { status: string }) {
  const ok = status === "Approved";
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-1.5 rounded-[3px] px-2 py-1",
        ok ? "bg-blue-soft text-blue" : "bg-mist text-muted-foreground",
      )}
    >
      <span className={cn("size-1.5", ok ? "bg-blue" : "bg-muted-foreground")} />
      {ok ? "Approved" : "Conditional"}
    </span>
  );
}

function Founder() {
  const facts = [
    { k: "NYS Certificate of Qualification", v: "Cytogenetics · Genetic testing · Molecular oncology" },
    { k: "CAP inspection teams", v: "Since 2020" },
    { k: "Peer-reviewed papers", v: "35, incl. CLSI NBS13" },
    { k: "Faculty", v: "Assistant Professor of Pathology, Einstein" },
  ];
  return (
    <section className="container-x py-24 md:py-36">
      <SectionHead
        n="06"
        kicker="The founder"
        title="The expert behind every validation."
        body="You work directly with the person who designs the lab, writes the validation and has sat on the inspection team."
      />
      <div className="grid-12 gap-y-12">
        <div className="col-span-12 md:col-span-5">
          <FadeUp>
            <Link to="/founder" className="group chamfer block bg-mist">
              <div className="relative aspect-[4/5] overflow-hidden">
                <img
                  src={portrait}
                  alt="Portrait of Dr. Abul Kalam Azad"
                  loading="lazy"
                  className="h-full w-full object-cover object-[58%_center] grayscale transition-[filter,transform] duration-[1.2s] ease-out-expo group-hover:scale-[1.03] group-hover:grayscale-0"
                />
              </div>
              <div className="flex items-end justify-between p-6">
                <div>
                  <p className="text-[1.625rem] tracking-[-0.04em]">Dr. Abul Kalam Azad</p>
                  <p className="label-mono mt-1 text-muted-foreground">MD, MSc, PhD · Founder & CEO</p>
                </div>
                <span className="label-mono text-blue">01 / 01</span>
              </div>
            </Link>
          </FadeUp>
        </div>
        <div className="col-span-12 flex flex-col justify-between md:col-span-6 md:col-start-7">
          <div>
            <RevealText text="Laboratory geneticist, laboratory director and CAP inspector." className="display-md max-w-[20ch]" />
            <FadeUp delay={0.1} className="mt-8 space-y-5 text-[1.0625rem] leading-relaxed">
              <p>
                Molecular pathology laboratory director at a New York academic medical center and Assistant Professor of
                Pathology. New York State–qualified technical director in cytogenetics, genetic testing and molecular
                oncology.
              </p>
              <p className="text-muted-foreground">
                Fellowship-trained in Laboratory Genetics and Genomics (ABMGG-accredited), with a PhD in Human Genetics
                from KU Leuven. Contributing author to the CLSI NBS13 guideline on newborn screening for SMA.
              </p>
            </FadeUp>
          </div>

          <dl className="mt-12 grid gap-3 sm:grid-cols-2">
            {facts.map((f, i) => (
              <FadeUp key={f.k} delay={i * 0.06} className="rounded-[4px] bg-mist p-5">
                <dt className="label-mono text-muted-foreground">{f.k}</dt>
                <dd className="mt-3 text-[1rem] leading-snug tracking-[-0.015em]">{f.v}</dd>
              </FadeUp>
            ))}
          </dl>

          <FadeUp delay={0.1} className="mt-12">
            <p className="label-mono mb-5 text-muted-foreground">Trained and worked across five continents</p>
            <ol className="relative flex justify-between">
              <span className="absolute left-0 right-0 top-[5px] h-px bg-border" />
              <motion.span
                className="absolute left-0 right-0 top-[5px] h-px origin-left bg-blue"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 2, ease: EASE, delay: 0.2 }}
              />
              {route.map((r, i) => (
                <motion.li
                  key={r.city}
                  className="relative flex flex-col items-center gap-3"
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, ease: EASE, delay: 0.3 + i * 0.3 }}
                >
                  <span className="size-[11px] rounded-full border-2 border-blue bg-background" />
                  <span className="text-[0.75rem] tracking-[-0.01em] sm:text-[0.875rem]">{r.city}</span>
                </motion.li>
              ))}
            </ol>
            <div className="mt-10">
              <TextLink to="/founder">Full profile</TextLink>
            </div>
          </FadeUp>
        </div>
      </div>
    </section>
  );
}

function Why() {
  return (
    <section className="bg-mist py-24 md:py-36">
      <div className="container-x">
        <SectionHead n="07" kicker="Why AKAHELIX" title="Prepared by someone who inspects labs for CAP." />
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {whyUs.map((w, i) => (
            <FadeUp key={w.title} delay={i * 0.08}>
              <div className="group flex h-full flex-col justify-between gap-12 rounded-[4px] bg-paper p-6 md:p-7">
                <div className="flex items-center justify-between">
                  <span className="label-mono text-blue">0{i + 1}</span>
                  <span className="h-px w-10 origin-right bg-border transition-all duration-700 ease-out-expo group-hover:w-16 group-hover:bg-blue" />
                </div>
                <div>
                  <h3 className="text-[1.375rem] leading-[1.12] tracking-[-0.035em]">{w.title}</h3>
                  <p className="mt-3 text-[0.9375rem] text-muted-foreground">{w.body}</p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  return (
    <section className="container-x py-24 md:py-36">
      <div className="grid-12 gap-y-10">
        <div className="col-span-12 md:col-span-4">
          <FadeUp>
            <Chip>Questions</Chip>
          </FadeUp>
          <RevealText text="Asked on almost every first call." className="display-md mt-5 max-w-[12ch]" />
        </div>
        <div className="col-span-12 md:col-span-8">
          <Faq />
        </div>
      </div>
    </section>
  );
}
