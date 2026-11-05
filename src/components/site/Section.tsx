import type { ReactNode } from "react";

import { cn } from "@/lib/utils";

import { DrawRule, FadeUp, ImageReveal, RevealText, introDelay } from "./motion";

type Tone = "paper" | "blue";

/** Small chip label with a square marker, as on a specimen tag. */
export function Chip({ children, tone = "paper", className }: { children: ReactNode; tone?: Tone; className?: string }) {
  return (
    <span
      className={cn(
        "label-mono inline-flex items-center gap-2 rounded-[3px] px-2 py-1",
        tone === "blue" ? "bg-on-blue/12 text-on-blue" : "bg-mist text-foreground",
        className,
      )}
    >
      <span className={cn("size-1.5", tone === "blue" ? "bg-on-blue" : "bg-blue")} />
      {children}
    </span>
  );
}

/** Numbered section label with a drawn rule. Used on inner pages. */
export function SectionLabel({ n, children, className, tone = "paper" }: { n: string; children: ReactNode; className?: string; tone?: Tone }) {
  return (
    <div className={cn("mb-10 md:mb-14", className)}>
      <div className="flex items-center justify-between pb-4">
        <Chip tone={tone}>{children}</Chip>
        <span className={cn("label-mono", tone === "blue" ? "text-on-blue-muted" : "text-muted-foreground")}>{n}</span>
      </div>
      <DrawRule className={tone === "blue" ? "bg-on-blue-line" : undefined} />
    </div>
  );
}

/** Large section head: big index number, title, supporting text on the right. */
export function SectionHead({
  n,
  kicker,
  title,
  body,
  tone = "paper",
  className,
  children,
}: {
  n: string;
  kicker: string;
  title: string;
  body?: string;
  tone?: Tone;
  className?: string;
  children?: ReactNode;
}) {
  return (
    <div className={cn("grid-12 gap-y-6 pb-12 md:pb-16", className)}>
      <FadeUp className="col-span-12 md:col-span-2">
        <span className={cn("numeral block text-[clamp(2.5rem,4vw,3.75rem)]", tone === "blue" ? "text-on-blue" : "text-foreground")}>
          {n}
        </span>
      </FadeUp>
      <div className="col-span-12 md:col-span-6">
        <FadeUp>
          <Chip tone={tone}>{kicker}</Chip>
        </FadeUp>
        <RevealText text={title} className="display-lg mt-5 max-w-[18ch]" />
      </div>
      {(body || children) && (
        <FadeUp delay={0.15} className="col-span-12 self-end md:col-span-4">
          {body && <p className={cn("text-[0.9375rem] leading-relaxed", tone === "blue" ? "text-on-blue-muted" : "text-muted-foreground")}>{body}</p>}
          {children}
        </FadeUp>
      )}
    </div>
  );
}

/** Hero for inner pages, with an optional wide image panel. */
export function PageHero({
  label,
  title,
  lede,
  image,
  imageAlt = "",
  caption,
  children,
}: {
  label: string;
  title: string;
  lede?: string;
  image?: string;
  imageAlt?: string;
  caption?: string;
  children?: ReactNode;
}) {
  return (
    <section className="container-x pb-16 pt-32 md:pb-24 md:pt-40">
      <FadeUp onMount delay={introDelay(0)} y={10}>
        <Chip className="mb-8">{label}</Chip>
      </FadeUp>
      <div className="grid-12 gap-y-10">
        <RevealText as="h1" onMount delay={introDelay(0.05)} text={title} className="display-xl col-span-12 lg:col-span-10" />
        {lede && (
          <FadeUp onMount delay={introDelay(0.45)} className="col-span-12 md:col-span-7 md:col-start-6 lg:col-span-5 lg:col-start-8">
            <p className="lede text-muted-foreground">{lede}</p>
          </FadeUp>
        )}
      </div>
      {image && (
        <div className="mt-14 md:mt-20">
          <ImageReveal
            src={image}
            alt={imageAlt}
            priority
            delay={introDelay(0.3)}
            className="aspect-[4/3] w-full md:aspect-[21/8]"
          />
          {caption && (
            <div className="label-mono mt-3 flex justify-between text-muted-foreground">
              <span>{caption}</span>
              <span className="hidden md:inline">AKAHELIX</span>
            </div>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
