import { ArrowUpRight, EnvelopeSimple, MapPin } from "@phosphor-icons/react";
import { createFileRoute } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useState, type FormEvent } from "react";

import { EASE, FadeUp, RevealText, introDelay } from "@/components/site/motion";
import { company } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Book a free scoping call — AKAHELIX" },
      {
        name: "description",
        content:
          "Tell us what you test today and what you want to test tomorrow. In one call we map the route, the risks and the likely savings.",
      },
      { property: "og:title", content: "Book a free scoping call — AKAHELIX" },
      {
        property: "og:description",
        content: "A first call agrees scope, the entry phase and the gate criteria. A written proposal follows.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ContactPage,
});

const interests = ["New laboratory", "Bring send-outs in-house", "One test or platform", "Inspection readiness", "Lab outside the US", "The book"];

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
}) {
  const cls =
    "peer w-full border-0 border-b border-border bg-transparent pb-3 pt-7 text-lg tracking-[-0.01em] outline-none transition-colors placeholder:text-transparent focus:border-blue";
  return (
    <label className="group relative block">
      {textarea ? (
        <textarea name={name} required={required} rows={4} placeholder={label} className={cn(cls, "resize-none")} />
      ) : (
        <input name={name} type={type} required={required} placeholder={label} className={cls} />
      )}
      <span className="label-mono pointer-events-none absolute left-0 top-1 text-muted-foreground transition-colors peer-focus:text-foreground">
        {label}
        {required && " *"}
      </span>
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-blue transition-transform duration-700 ease-out-expo peer-focus:scale-x-100" />
    </label>
  );
}

function ContactPage() {
  const [picked, setPicked] = useState<string[]>([]);
  const [sent, setSent] = useState(false);

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const get = (k: string) => String(f.get(k) ?? "").trim();
    const subject = `Scoping call — ${get("organisation") || get("name")}`;
    const body = [
      `Name: ${get("name")}`,
      `Email: ${get("email")}`,
      `Organisation: ${get("organisation")}`,
      `Interested in: ${picked.join(", ") || "—"}`,
      "",
      "What we test today / want to test tomorrow:",
      get("message"),
    ].join("\n");
    window.location.href = `mailto:${company.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSent(true);
  }

  return (
    <section className="container-x pb-24 pt-32 md:pb-36 md:pt-44">
      <FadeUp onMount delay={introDelay(0)} y={10}>
        <p className="label-mono mb-8 text-muted-foreground">Contact</p>
      </FadeUp>
      <div className="grid-12 gap-y-16">
        <div className="col-span-12 lg:col-span-5">
          <RevealText as="h1" onMount delay={introDelay(0.05)} text="Book a free scoping call." className="display-lg max-w-[11ch]" />
          <FadeUp onMount delay={introDelay(0.45)}>
            <p className="lede mt-10 max-w-[40ch] text-muted-foreground">
              Tell us what you test today and what you want to test tomorrow. A first call agrees scope, the entry phase
              and the gate criteria; a written proposal follows.
            </p>
          </FadeUp>
          <FadeUp onMount delay={introDelay(0.55)} className="mt-14 space-y-5 border-t border-border pt-8">
            <a href={`mailto:${company.email}`} className="group flex items-center gap-4">
              <EnvelopeSimple weight="light" className="size-5" />
              <span className="link-draw text-lg">{company.email}</span>
            </a>
            <p className="flex items-center gap-4">
              <MapPin weight="light" className="size-5" />
              <span className="text-lg">{company.legal} · {company.city}</span>
            </p>
          </FadeUp>
        </div>

        <FadeUp onMount delay={introDelay(0.35)} className="col-span-12 lg:col-span-6 lg:col-start-7">
          <form onSubmit={onSubmit} className="space-y-8">
            <div className="grid gap-8 md:grid-cols-2">
              <Field label="Your name" name="name" required />
              <Field label="Email" name="email" type="email" required />
            </div>
            <Field label="Organisation / laboratory" name="organisation" />

            <fieldset>
              <legend className="label-mono mb-4 text-muted-foreground">What are you planning?</legend>
              <div className="flex flex-wrap gap-2">
                {interests.map((it) => {
                  const on = picked.includes(it);
                  return (
                    <button
                      key={it}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setPicked((p) => (on ? p.filter((x) => x !== it) : [...p, it]))}
                      className={cn(
                        "rounded-full border px-4 py-2 text-[0.875rem] transition-all duration-300",
                        on ? "border-blue bg-blue text-on-blue" : "border-border hover:border-foreground",
                      )}
                    >
                      {it}
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <Field label="What you test today, and what you want to test tomorrow" name="message" textarea required />

            <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
              <p className="label-mono max-w-[34ch] text-muted-foreground">
                Opens your email app with the details filled in. Fixed fees per phase, agreed in writing.
              </p>
              <button
                type="submit"
                className="group/cta inline-flex h-14 items-center gap-3 rounded-full bg-blue pl-7 pr-2 text-base font-medium text-on-blue transition-colors duration-500 hover:bg-blue-deep"
              >
                Send request
                <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-on-blue text-blue">
                  <ArrowUpRight className="size-4 transition-transform duration-500 ease-out-expo group-hover/cta:-translate-y-5 group-hover/cta:translate-x-5" />
                  <ArrowUpRight className="absolute size-4 -translate-x-5 translate-y-5 transition-transform duration-500 ease-out-expo group-hover/cta:translate-x-0 group-hover/cta:translate-y-0" />
                </span>
              </button>
            </div>
            {sent && (
              <motion.p
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EASE }}
                className="border-l-2 border-blue pl-4 text-[0.9375rem]"
              >
                Your email app should now be open with the request ready to send. If it didn't open, write to{" "}
                <a className="underline" href={`mailto:${company.email}`}>
                  {company.email}
                </a>
                .
              </motion.p>
            )}
          </form>
        </FadeUp>
      </div>
    </section>
  );
}
