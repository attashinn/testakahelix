import { Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";

import ctaMolecules from "@/assets/cta-molecules.jpg";
import { company, nav, profiles } from "@/content/site";

import { Cta, TextLink } from "./Cta";
import { EASE, FadeUp, RevealText } from "./motion";
import { Wordmark } from "./Wordmark";

function ClosingPanel() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  return (
    <div className="container-x">
      <div ref={ref} className="surface-blue relative overflow-hidden rounded-[6px]">
        <motion.img
          src={ctaMolecules}
          alt=""
          aria-hidden
          width={1920}
          height={960}
          loading="lazy"
          style={{ scale }}
          className="absolute inset-0 h-full w-full object-cover [mask-image:radial-gradient(ellipse_38%_64%_at_center,transparent_62%,black_100%)] transform-gpu will-change-transform"
        />
        <div className="relative flex min-h-[30rem] flex-col items-center justify-center px-6 py-24 text-center md:min-h-[36rem]">
          <p className="label-mono mb-6 text-on-blue-muted">Start here</p>
          <RevealText
            as="h2"
            text="Planning a new lab, or paying too much for send-outs?"
            className="display-lg mx-auto max-w-[17ch]"
          />
          <FadeUp delay={0.2}>
            <p className="mx-auto mt-6 max-w-[46ch] text-on-blue-muted">
              Tell us what you test today and what you want to test tomorrow. In one call we map the route, the risks
              and the likely savings.
            </p>
          </FadeUp>
          <FadeUp delay={0.3} className="mt-10">
            <Cta to="/contact" variant="light" size="lg">
              Book a free scoping call
            </Cta>
          </FadeUp>
        </div>
      </div>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="relative overflow-hidden pt-8 md:pt-12">
      <ClosingPanel />

      <div className="container-x pt-20 md:pt-28">
        <div className="grid-12 gap-y-12">
          <div className="col-span-12 md:col-span-5">
            <Wordmark />
            <p className="mt-6 max-w-[38ch] text-[0.9375rem] text-muted-foreground">
              Planning, building and validating high-complexity molecular genetics, cytogenetics and oncology
              laboratories.
            </p>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="label-mono mb-4 text-muted-foreground">Site</p>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {nav.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="link-draw">
                    {n.label}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/contact" className="link-draw">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/sign-in" className="link-draw text-muted-foreground/75 hover:text-blue">
                  Client portal
                </Link>
              </li>
            </ul>
          </div>
          <div className="col-span-6 md:col-span-2">
            <p className="label-mono mb-4 text-muted-foreground">Founder record</p>
            <ul className="space-y-2.5 text-[0.9375rem]">
              {profiles.map((p) => (
                <li key={p.href}>
                  <TextLink href={p.href} className="font-normal">
                    {p.label}
                  </TextLink>
                </li>
              ))}
            </ul>
          </div>
          <div className="col-span-12 md:col-span-3 md:text-right">
            <p className="label-mono mb-4 text-muted-foreground">Contact</p>
            <p className="text-[0.9375rem]">{company.legal}</p>
            <p className="text-[0.9375rem] text-muted-foreground">{company.city}</p>
            <a href={`mailto:${company.email}`} className="link-draw mt-2 inline-block text-[0.9375rem] text-blue">
              {company.email}
            </a>
          </div>
        </div>
      </div>

      <div className="container-x mt-16 overflow-hidden">
        <motion.p
          initial={{ y: "40%" }}
          whileInView={{ y: "0%" }}
          viewport={{ once: true }}
          transition={{ duration: 1.6, ease: EASE }}
          className="select-none whitespace-nowrap text-center font-sans font-medium leading-[0.78] tracking-[-0.06em] text-mist-deep truncate max-w-full"
          style={{ fontSize: "clamp(3rem, 16vw, 19rem)" }}
          aria-hidden
        >
          AKAHELIX
        </motion.p>
      </div>
      <div className="container-x">
        <div className="label-mono flex flex-col justify-between gap-2 border-t border-border py-6 text-muted-foreground md:flex-row">
          <span>© 2026 {company.legal}</span>
          <span>Molecular genetics · Cytogenetics · Oncology tumour markers</span>
        </div>
      </div>
    </footer>
  );
}
