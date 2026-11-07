import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle,
  ShieldCheck,
  Clock,
  FileText,
  UserCheck,
} from "@phosphor-icons/react";

import assayValidation from "@/assets/assay-validation.png";
import costModel from "@/assets/cost-model.png";
import floorPlan from "@/assets/floor-plan.png";
import flowCell from "@/assets/flow-cell.jpg";
import licensingPermits from "@/assets/licensing-permits.png";
import metaphase from "@/assets/metaphase-spread.jpg";
import microscope from "@/assets/microscope.jpg";
import binders from "@/assets/sop-binders.jpg";
import { Cta } from "@/components/site/Cta";
import { FadeUp } from "@/components/site/motion";
import { SectionLabel } from "@/components/site/Section";
import { getAllDetailedServices, getDetailedService } from "@/content/site";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const service = getDetailedService(params.slug);
    if (!service) {
      return {
        meta: [{ title: "Service Not Found — AKAHELIX" }],
      };
    }
    return {
      meta: [
        { title: `${service.title} — AKAHELIX Clinical Laboratory Services` },
        { name: "description", content: service.summary },
        { property: "og:title", content: `${service.title} — AKAHELIX` },
        { property: "og:description", content: service.tagline },
        { property: "og:type", content: "website" },
      ],
    };
  },
  component: ServiceDetailPage,
});

const serviceImageMap: Record<string, { src: string; alt: string; caption: string }> = {
  "bring-send-outs-in-house": {
    src: costModel,
    alt: "Send-out feasibility and build-versus-buy financial modeling",
    caption: "Fig. S-01 — Forensic invoice audit, reagent rental vs. CapEx, and break-even curves",
  },
  "feasibility-and-laboratory-design": {
    src: floorPlan,
    alt: "Laboratory design and set-up floor plan with clean unidirectional flow",
    caption: "Fig. S-02 — Scaled CAD layout enforcing unidirectional pre- and post-PCR workflow",
  },
  "licensing-and-regulatory-pathway": {
    src: licensingPermits,
    alt: "Licensing and accreditation pathway for CLIA, NYS CLEP and CAP",
    caption: "Fig. S-03 — High-complexity regulatory roadmap through CLIA, NYSDOH CLEP and CAP",
  },
  "assay-validation-and-verification": {
    src: assayValidation,
    alt: "Assay validation and New York State LDT submission packages",
    caption: "Fig. S-04 — 6-parameter analytical validation plan and NYS LDT dossier",
  },
  "quality-management-system": {
    src: binders,
    alt: "Quality management system and SOP library",
    caption: "Fig. S-05 — CLSI GP02-A5 SOP library, Westgard QC rules, and CAPA logs",
  },
  "inspection-readiness": {
    src: microscope,
    alt: "Inspection readiness and mock CAP surveys",
    caption:
      "Fig. S-06 — Unannounced mock CAP survey protocol, tracer audits, and deficiency clearance",
  },
  "interpretation-and-reporting": {
    src: metaphase,
    alt: "Interpretation and clinical diagnostic reporting",
    caption: "Fig. S-07 — ACMG/AMP variant curation SOPs, ISCN nomenclature, and report design",
  },
  "staff-training-and-handover": {
    src: flowCell,
    alt: "Staff training and hands-on wet bench handover",
    caption:
      "Fig. S-08 — 6-point CLIA competency checklists, bench immersion, and director mentorship",
  },
};

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = getDetailedService(slug);
  const allServices = getAllDetailedServices();

  if (!service) {
    return (
      <div className="container-x py-32 text-center">
        <h1 className="font-display text-4xl">Service Not Found</h1>
        <p className="mt-4 text-muted-foreground">
          The requested service offering does not exist in our catalog.
        </p>
        <div className="mt-8">
          <Cta to="/services">Back to All Services</Cta>
        </div>
      </div>
    );
  }

  const currentIndex = allServices.findIndex((s) => s.slug === slug);
  const prevService = currentIndex > 0 ? allServices[currentIndex - 1] : null;
  const nextService = currentIndex < allServices.length - 1 ? allServices[currentIndex + 1] : null;

  const visual =
    serviceImageMap[service.slug] ?? serviceImageMap["assay-validation-and-verification"]!;

  return (
    <>
      {/* Breadcrumb Navigation */}
      <div className="border-b border-border/80 bg-mist/40 py-3.5">
        <div className="container-x flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-muted-foreground">
            <Link to="/services" className="hover:text-foreground transition-colors">
              Services
            </Link>
            <span>/</span>
            <span className="text-foreground font-medium truncate max-w-[220px] sm:max-w-none">
              {service.title}
            </span>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-muted-foreground">
              Service {service.number} of {String(allServices.length).padStart(2, "0")}
            </span>
          </div>
        </div>
      </div>

      {/* Hero Header */}
      <header className="container-x pt-12 pb-16 md:pt-16 md:pb-20 border-b border-border">
        <div className="grid-12 gap-y-10">
          <div className="col-span-12 lg:col-span-8">
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 rounded-[3px] bg-blue/10 px-2.5 py-1 text-xs font-mono font-medium text-blue">
                SERVICE {service.number}
              </span>
              <span className="label-mono text-muted-foreground">{service.shortTitle}</span>
            </div>

            <h1 className="font-display text-[clamp(2.25rem,4.5vw,3.75rem)] leading-[1.05] tracking-[-0.03em] text-ink">
              {service.title}
            </h1>

            <p className="mt-6 text-xl md:text-2xl font-light text-muted-foreground leading-relaxed max-w-[46ch]">
              {service.tagline}
            </p>

            {/* Quick Metadata Matrix */}
            <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border pt-6">
              <div>
                <p className="label-mono text-xs text-muted-foreground flex items-center gap-1.5">
                  <Clock className="size-3.5 text-blue" />
                  Estimated Timeline
                </p>
                <p className="mt-1 font-mono text-sm font-medium text-foreground">
                  {service.timeline}
                </p>
              </div>

              <div>
                <p className="label-mono text-xs text-muted-foreground flex items-center gap-1.5">
                  <ShieldCheck className="size-3.5 text-blue" />
                  Regulatory Anchor
                </p>
                <p className="mt-1 text-xs font-mono text-foreground leading-snug">
                  {service.anchor}
                </p>
              </div>

              <div>
                <p className="label-mono text-xs text-muted-foreground flex items-center gap-1.5">
                  <UserCheck className="size-3.5 text-blue" />
                  Scientific Leadership
                </p>
                <p className="mt-1 text-xs text-foreground leading-snug">
                  {service.leadSpecialists}
                </p>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Cta to="/book">Schedule Scoping Call</Cta>
              <Cta to="/contact" variant="outline">
                Inquire on Test Menu
              </Cta>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-4">
            <div className="overflow-hidden rounded-[4px] border border-border bg-paper shadow-sm">
              <img
                src={visual.src}
                alt={visual.alt}
                className="w-full aspect-[4/3] object-cover"
                loading="eager"
              />
              <div className="p-3 border-t border-border bg-mist/30">
                <p className="label-mono text-[0.6875rem] text-muted-foreground">
                  {visual.caption}
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Executive Summary */}
      <section className="container-x py-16 md:py-24 border-b border-border">
        <div className="grid-12 gap-y-6">
          <div className="col-span-12 md:col-span-3">
            <SectionLabel n="01">Scope & Purpose</SectionLabel>
          </div>
          <div className="col-span-12 md:col-span-9 max-w-[70ch]">
            <p className="text-xl md:text-2xl leading-relaxed font-light text-ink">
              {service.summary}
            </p>
          </div>
        </div>
      </section>

      {/* Deliverables Section */}
      <section className="container-x py-16 md:py-24 border-b border-border">
        <SectionLabel n="02">What You Receive — Itemized Deliverables</SectionLabel>
        <p className="mb-10 max-w-[65ch] text-muted-foreground text-sm">
          Every document, protocol, CAD layout, and validation dossier produced under this service
          line is delivered as an inspection-ready, defensible clinical artifact.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {service.deliverables.map((item, idx) => (
            <FadeUp key={item.title} delay={idx * 0.05}>
              <div className="h-full rounded-[4px] border border-border bg-paper p-6 md:p-8 flex flex-col justify-between shadow-2xs hover:border-blue/50 transition-colors">
                <div>
                  <div className="flex items-center justify-between gap-4 mb-4">
                    <span className="font-mono text-xs font-semibold text-blue bg-blue/10 px-2 py-0.5 rounded-[2px]">
                      DELIVERABLE {String(idx + 1).padStart(2, "0")}
                    </span>
                    <FileText className="size-4 text-muted-foreground" />
                  </div>
                  <h3 className="font-display text-xl tracking-tight text-ink">{item.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {item.description}
                  </p>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* Phased Methodology */}
      <section className="bg-mist/50 py-16 md:py-24 border-b border-border">
        <div className="container-x">
          <SectionLabel n="03">Step-by-Step Phased Execution</SectionLabel>
          <p className="mb-12 max-w-[65ch] text-muted-foreground text-sm">
            Engagements follow a structured four-phase roadmap designed to eliminate experimental
            ambiguity and prevent regulatory review delays.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.methodologySteps.map((step, idx) => (
              <FadeUp key={step.phase} delay={idx * 0.08}>
                <div className="relative h-full rounded-[4px] border border-border bg-paper p-6 flex flex-col justify-between">
                  <div>
                    <span className="font-mono text-xs font-bold text-blue tracking-wider">
                      {step.phase}
                    </span>
                    <h4 className="mt-2 font-display text-lg text-ink">{step.title}</h4>
                    <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
                      {step.description}
                    </p>
                  </div>
                  <div className="mt-6 pt-4 border-t border-border/60 flex items-center gap-1.5 text-xs text-muted-foreground font-mono">
                    <CheckCircle className="size-3.5 text-blue" />
                    <span>Phase gate sign-off</span>
                  </div>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* Regulatory Framework */}
      <section className="container-x py-16 md:py-24 border-b border-border">
        <div className="grid-12 gap-y-8">
          <div className="col-span-12 md:col-span-4">
            <SectionLabel n="04">Regulatory Compliance</SectionLabel>
            <h3 className="mt-4 font-display text-2xl md:text-3xl text-ink">
              Benchmarked directly to the governing standards.
            </h3>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Every deliverable is formatted according to the exact checklist questions that
              federal, state, and CAP surveyors grade against.
            </p>
          </div>

          <div className="col-span-12 md:col-span-7 md:col-start-6 space-y-4">
            {service.regulatoryFramework.map((reg) => (
              <div
                key={reg.code}
                className="rounded-[4px] border border-border bg-paper p-5 flex flex-col sm:flex-row sm:items-baseline gap-3 sm:gap-6"
              >
                <span className="font-mono text-xs font-semibold text-blue bg-blue/10 px-2.5 py-1 rounded-[3px] shrink-0 self-start">
                  {reg.code}
                </span>
                <p className="text-sm text-ink leading-relaxed">{reg.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Highlight */}
      <section className="container-x py-16 md:py-24 border-b border-border">
        <div className="rounded-[4px] border border-blue/30 bg-blue/5 p-8 md:p-12">
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="font-mono text-xs font-semibold text-blue uppercase tracking-wider">
              REAL-WORLD BENCHMARK
            </span>
          </div>

          <h3 className="font-display text-2xl md:text-3xl text-ink max-w-[42ch]">
            {service.caseHighlight.heading}
          </h3>

          <p className="mt-4 text-base md:text-lg text-muted-foreground leading-relaxed max-w-[70ch]">
            {service.caseHighlight.text}
          </p>

          {service.caseHighlight.metrics && service.caseHighlight.metrics.length > 0 && (
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-blue/20 pt-6">
              {service.caseHighlight.metrics.map((metric) => (
                <div key={metric} className="flex items-start gap-2.5">
                  <CheckCircle className="size-4 text-blue shrink-0 mt-0.5" />
                  <span className="text-sm font-medium text-ink">{metric}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Next / Previous Pagination */}
      <nav className="container-x py-12 border-b border-border" aria-label="Service Pagination">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {prevService ? (
            <Link
              to={`/services/${prevService.slug}` as any}
              className="group flex items-center gap-3 text-left w-full sm:w-auto"
            >
              <div className="size-10 rounded-[4px] border border-border flex items-center justify-center group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-colors">
                <ArrowLeft className="size-4" />
              </div>
              <div>
                <p className="label-mono text-[0.6875rem] text-muted-foreground">
                  Previous Service
                </p>
                <p className="font-display text-base text-ink group-hover:text-blue transition-colors">
                  {prevService.title}
                </p>
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}

          <Link
            to="/services"
            className="label-mono text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            All 8 Services
          </Link>

          {nextService ? (
            <Link
              to={`/services/${nextService.slug}` as any}
              className="group flex items-center gap-3 text-right w-full sm:w-auto sm:justify-end"
            >
              <div>
                <p className="label-mono text-[0.6875rem] text-muted-foreground">Next Service</p>
                <p className="font-display text-base text-ink group-hover:text-blue transition-colors">
                  {nextService.title}
                </p>
              </div>
              <div className="size-10 rounded-[4px] border border-border flex items-center justify-center group-hover:border-blue group-hover:bg-blue group-hover:text-white transition-colors">
                <ArrowRight className="size-4" />
              </div>
            </Link>
          ) : (
            <div className="hidden sm:block" />
          )}
        </div>
      </nav>

      {/* Bottom Conversion Banner */}
      <section className="bg-ink text-paper py-20 md:py-28">
        <div className="container-x text-center max-w-[65ch] mx-auto">
          <span className="font-mono text-xs uppercase tracking-widest text-blue-light mb-3 inline-block">
            ENGAGEMENT SCOPING
          </span>
          <h2 className="font-display text-3xl md:text-5xl text-paper tracking-tight">
            Ready to implement {service.shortTitle}?
          </h2>
          <p className="mt-6 text-muted-foreground text-base md:text-lg leading-relaxed">
            Schedule a confidential 30-minute scoping discussion directly with Dr. Azad and our
            leadership team to evaluate your test menu, volume requirements, and regulatory
            timeline.
          </p>
          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <Cta to="/book" variant="primary">
              Book a Scoping Call
            </Cta>
            <Cta
              to="/services"
              variant="outline"
              className="text-paper border-border hover:bg-paper/10"
            >
              Browse All Services
            </Cta>
          </div>
        </div>
      </section>
    </>
  );
}
