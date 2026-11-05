import { createFileRoute } from "@tanstack/react-router";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef } from "react";

import cover from "@/assets/genetic-blueprint-cover.jpg";
import { Cta } from "@/components/site/Cta";
import { Counter, EASE, FadeUp, RevealText, introDelay } from "@/components/site/motion";
import { SectionLabel } from "@/components/site/Section";
import { book } from "@/content/site";

export const Route = createFileRoute("/book")({
  head: () => ({
    meta: [
      { title: "Genetic Blueprint: Bench to Bed — An Integrated Review of Medical Laboratory Genetics" },
      {
        name: "description",
        content:
          "Study guides and notes written to the ABMGG General and LGG blueprints, by Dr. Abul Kalam Azad. One book, seven credentials. First edition, 2026.",
      },
      { property: "og:title", content: "Genetic Blueprint: Bench to Bed — First Edition, 2026" },
      {
        property: "og:description",
        content: "61 content areas across seven credentials: 42 taught in full, 11 in part, and plain about where the other 8 stop.",
      },
      { property: "og:type", content: "book" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: BookPage,
});

function TiltCover() {
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 120, damping: 16 });
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 120, damping: 16 });

  return (
    <div className="[perspective:1400px]">
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current?.getBoundingClientRect();
          if (!r) return;
          mx.set((e.clientX - r.left) / r.width - 0.5);
          my.set((e.clientY - r.top) / r.height - 0.5);
        }}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
        }}
        style={{ rotateX: rx, rotateY: ry }}
        initial={{ opacity: 0, y: 60 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.3, ease: EASE, delay: introDelay(0.25) }}
        className="relative shadow-[0_40px_80px_-30px_color-mix(in_oklab,var(--ink)_45%,transparent)]"
      >
        <img
          src={cover}
          alt="Front cover of Genetic Blueprint: Bench to Bed, first edition 2026"
          width={1360}
          height={1760}
          className="block w-full"
        />
        <div className="pointer-events-none absolute inset-y-0 left-0 w-3 bg-ink/10" />
      </motion.div>
    </div>
  );
}

function BookPage() {
  return (
    <>
      <section className="container-x pb-24 pt-32 md:pb-36 md:pt-44">
        <div className="grid-12 gap-y-14">
          <div className="col-span-12 md:col-span-7">
            <FadeUp onMount delay={introDelay(0)} y={10}>
              <p className="label-mono mb-8 text-muted-foreground">Education & publications · {book.edition}</p>
            </FadeUp>
            <RevealText as="h1" onMount delay={introDelay(0.05)} text={`${book.title}:`} className="display-xl" />
            <RevealText as="p" onMount delay={introDelay(0.25)} text={book.subtitle} className="display-xl text-blue" />
            <FadeUp onMount delay={introDelay(0.5)}>
              <p className="lede mt-10 max-w-[40ch] text-muted-foreground">{book.tagline}. Study guides and notes written to the ABMGG General and LGG blueprints, 2026.</p>
            </FadeUp>
            <FadeUp onMount delay={introDelay(0.6)} className="mt-10 grid max-w-xl grid-cols-2 border-t border-border">
              {book.exams.map((e) => (
                <div key={e.name} className="border-b border-border py-5 pr-4">
                  <p className="font-display text-2xl">{e.name}</p>
                  <p className="label-mono mt-1 text-muted-foreground">{e.detail}</p>
                </div>
              ))}
            </FadeUp>
            <FadeUp onMount delay={introDelay(0.7)} className="mt-10 flex flex-wrap items-center gap-6">
              <Cta to="/contact">Register interest</Cta>
              <span className="label-mono text-muted-foreground">ISBN {book.isbn}</span>
            </FadeUp>
          </div>
          <div className="col-span-12 md:col-span-5">
            <TiltCover />
          </div>
        </div>
      </section>

      <section className="surface-blue py-24 md:py-36">
        <div className="container-x">
          <SectionLabel n="01" tone="blue">
            One book · seven credentials
          </SectionLabel>
          <div className="grid-12 gap-y-12">
            <div className="col-span-12 md:col-span-6">
              <RevealText text="Six other boards. 61 content areas a candidate actually sits." className="display-md max-w-[18ch]" />
              <FadeUp>
                <p className="mt-8 max-w-[44ch] text-on-blue-muted">
                  The book teaches 42 of them in full and 11 in part, and says plainly where the other 8 stop.
                </p>
              </FadeUp>
            </div>
            <div className="col-span-12 grid grid-cols-3 self-end border-t border-on-blue-line md:col-span-5 md:col-start-8">
              {[
                { v: 42, l: "Taught in full" },
                { v: 11, l: "In part" },
                { v: 8, l: "Where it stops" },
              ].map((s, i) => (
                <div key={s.l} className={i > 0 ? "border-l border-on-blue-line py-6 pl-4" : "py-6"}>
                  <p className="numeral text-[clamp(3rem,6vw,5rem)]">
                    <Counter value={s.v} />
                  </p>
                  <p className="label-mono mt-2 text-on-blue-muted">{s.l}</p>
                </div>
              ))}
            </div>
          </div>

          <ul className="mt-20 border-t border-on-blue-line">
            {book.boards.map((b, i) => (
              <FadeUp key={b.code} delay={0.03}>
                <li className="grid-12 items-center gap-y-3 border-b border-on-blue-line py-6">
                  <span className="col-span-3 font-sans text-lg font-semibold tracking-[0.06em] md:col-span-1">{b.code}</span>
                  <span className="col-span-9 text-[0.9375rem] md:col-span-4">
                    {b.name}
                    <span className="label-mono ml-2 text-on-blue-muted">{b.detail}</span>
                  </span>
                  <div className="col-span-9 h-px bg-on-blue-line md:col-span-6">
                    <motion.div
                      className={b.coverage === null ? "h-[3px] -translate-y-px bg-blue" : "h-[3px] -translate-y-px bg-on-blue"}
                      initial={{ width: 0 }}
                      whileInView={{ width: `${b.coverage ?? 100}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.6, ease: EASE, delay: 0.1 + i * 0.05 }}
                    />
                  </div>
                  <span className="label-mono col-span-3 text-right md:col-span-1">
                    {b.coverage === null ? "Written to it" : `${b.coverage}%`}
                  </span>
                </li>
              </FadeUp>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x py-24 md:py-36">
        <SectionLabel n="02">Eleven teaching documents</SectionLabel>
        <ol className="grid border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {book.documents.map((d, i) => (
            <FadeUp key={d} delay={(i % 4) * 0.05} className="group border-b border-r border-border">
              <li className="flex aspect-[4/3] flex-col justify-between p-6 transition-colors duration-700 group-hover:bg-mist">
                <span className="numeral text-5xl text-muted-foreground/40 transition-colors duration-700 group-hover:text-blue">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="font-display text-2xl tracking-tight">{d}</span>
              </li>
            </FadeUp>
          ))}
          <li className="flex aspect-[4/3] flex-col justify-end border-b border-r border-border bg-ink p-6 text-on-blue">
            <span className="label-mono text-on-blue-muted">Document 11 is written from the inspector's side of the clipboard.</span>
          </li>
        </ol>
      </section>

      <section className="container-x pb-24 md:pb-36">
        <div className="grid-12 gap-y-10 border-t border-border pt-14">
          <p className="label-mono col-span-12 text-muted-foreground md:col-span-3">Why provenance matters</p>
          <div className="col-span-12 md:col-span-8">
            <RevealText
              as="p"
              text="One condition was the subject of his doctorate; the other is an assay he designed, validated as an LDT, holds the New York permit for, and signs out."
              className="display-md"
            />
            <FadeUp>
              <p className="mt-8 max-w-[56ch] text-muted-foreground">
                Cystic fibrosis and spinal muscular atrophy — the two conditions offered to every prospective parent
                regardless of ancestry. None of it is a qualification to teach. It is provenance, and provenance is
                checkable.
              </p>
              <p className="label-mono mt-8 text-muted-foreground">Published by {book.publisher}</p>
            </FadeUp>
          </div>
        </div>
      </section>
    </>
  );
}
