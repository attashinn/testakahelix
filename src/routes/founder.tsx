import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowSquareOut,
  BookBookmark,
  Certificate,
  CheckCircle,
  Dna,
  FileText,
  Flask,
  GraduationCap,
  IdentificationBadge,
  Kanban,
  Microscope,
  ShieldCheck,
  WarningOctagon,
} from "@phosphor-icons/react";

import portrait from "@/assets/azad-portrait.jpg";
import { Cta, TextLink } from "@/components/site/Cta";
import { FadeUp, ImageReveal, RevealText, introDelay } from "@/components/site/motion";
import { Chip } from "@/components/site/Section";
import { TrajectoryMap } from "@/components/site/TrajectoryMap";
import { book, company, credentials, proof, route } from "@/content/site";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/founder")({
  head: () => ({
    meta: [
      { title: "Dr. Abul Kalam Azad, MD, MSc, PhD · Founder & CEO · AKAHELIX" },
      {
        name: "description",
        content:
          "Founder profile of Dr. Abul Kalam Azad: NYS-qualified Laboratory Director in Cytogenetics, Genetic Testing, and Oncology, practicing CAP Inspector, and Assistant Professor of Pathology at Albert Einstein College of Medicine.",
      },
      { property: "og:title", content: "Dr. Abul Kalam Azad, MD, MSc, PhD — Founder & CEO · AKAHELIX" },
      {
        property: "og:description",
        content:
          "Directing high-complexity clinical molecular genetics, cytogenetics, and oncology laboratories. Practicing CAP Inspector and author of Genetic Blueprint: Bench to Bed.",
      },
      { property: "og:type", content: "profile" },
      { property: "og:url", content: "https://www.akahelix.com/founder" },
      { property: "og:image", content: "https://www.akahelix.com/og-image.jpg" },
      { property: "og:image:secure_url", content: "https://www.akahelix.com/og-image.jpg" },
      { property: "og:image:type", content: "image/jpeg" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Dr. Abul Kalam Azad — Founder & CEO of AKAHELIX" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Dr. Abul Kalam Azad, MD, MSc, PhD — Founder & CEO · AKAHELIX" },
      {
        name: "twitter:description",
        content:
          "Directing high-complexity clinical molecular genetics, cytogenetics, and oncology laboratories. Practicing CAP Inspector and author of Genetic Blueprint: Bench to Bed.",
      },
      { name: "twitter:image", content: "https://www.akahelix.com/og-image.jpg" },
    ],
  }),
  component: DedicatedFounderPage,
});

// Technical qualification pillars for Dr. Azad
const CQ_PILLARS = [
  {
    id: "cytogenetics",
    num: "01",
    title: "Cytogenetics",
    status: "Comprehensive Technical Director",
    authority: "NYS CLEP · CQ Since 2020",
    badgeTone: "border-blue/30 text-blue bg-blue/5",
    summary:
      "Full diagnostic directorship across constitutional and acquired neoplastic cytogenetics, resolving complex structural rearrangements and numerical chromosomal abnormalities.",
    technologies: [
      { name: "High-Resolution G-Banding Karyotyping", desc: "400–550 band resolution for prenatal, constitutional, and bone marrow/leukemia specimen analysis" },
      { name: "Chromosomal Microarray (CMA / aCGH)", desc: "Whole-genome oligo-SNP microarrays for copy number variations (CNVs) and loss of heterozygosity (LOH)" },
      { name: "Fluorescence In Situ Hybridization (FISH)", desc: "Dual-color break-apart, dual-fusion, and enumeration probes across hematologic malignancies and microdeletions" },
      { name: "ISCN Nomenclature Standard", desc: "Clinical report governance adhering to the latest International System for Human Cytogenomic Nomenclature" },
    ],
    specimens: ["Bone marrow aspirates", "Peripheral whole blood", "Amniotic fluid / CVS", "Fresh tissue biopsies", "FFPE tumor sections"],
    regulatoryAnchor: "NYSDOH CLEP Cytogenetics Standard §58-1 · CAP Cytogenetics Checklist (CYT)",
  },
  {
    id: "molecular",
    num: "02",
    title: "Genetic Testing (Molecular)",
    status: "High-Complexity Technical Director",
    authority: "NYS CLEP · CQ Since 2020",
    badgeTone: "border-emerald-500/30 text-emerald-700 bg-emerald-500/5 dark:text-emerald-400",
    summary:
      "Engineering, analytical validation, and clinical diagnostic sign-out of high-throughput next-generation sequencing, copy number assays, and targeted disease screening.",
    technologies: [
      { name: "Clinical Next-Generation Sequencing (NGS)", desc: "Targeted gene panels and exome platforms on Illumina NovaSeq/NextSeq with validated secondary bioinformatic pipelines" },
      { name: "Quantitative Real-Time PCR & Digital PCR", desc: "Multiplex qPCR and ddPCR for absolute copy number enumeration and rare variant detection down to 0.1% VAF" },
      { name: "Fragment Analysis & Capillary Electrophoresis", desc: "Triplet repeat expansion sizing for FMR1 (Fragile X), HD (Huntington), and myotonic dystrophy loci" },
      { name: "ACMG / ClinGen Variant Classification", desc: "Rigorous 5-tier sequence variant interpretation (P, LP, VUS, LB, B) with expert panel consensus evidence" },
    ],
    specimens: ["EDTA whole blood", "Saliva / buccal swabs", "Purified genomic DNA", "Cell-free plasma (cfDNA)", "Dry blood spots (NBS)"],
    regulatoryAnchor: "NYSDOH CLEP Molecular Genetics Standard §58-1 · CAP Molecular Pathology Checklist (MOL)",
  },
  {
    id: "oncology",
    num: "03",
    title: "Oncology (Tumor Markers)",
    status: "Molecular & Cellular Director",
    authority: "NYS CLEP · CQ Since 2020",
    badgeTone: "border-violet-500/30 text-violet-700 bg-violet-500/5 dark:text-violet-400",
    summary:
      "Precision oncology assays for somatic variant detection, prognostic stratification, therapy matching, minimal residual disease (MRD), and liquid biopsy profiling.",
    technologies: [
      { name: "Somatic Mutation & Fusion Profiling", desc: "Comprehensive hematologic and solid tumor panels detecting SNVs, Indels, and oncogenic gene fusions (e.g. BCR::ABL1, PML::RARA)" },
      { name: "Minimal Residual Disease (MRD)", desc: "Ultra-sensitive monitoring of clonal immunoglobulin and T-cell receptor rearrangements or recurrent somatic markers" },
      { name: "Liquid Biopsy / cfDNA Analysis", desc: "Circulating tumor DNA analysis for therapy resistance mutations and non-invasive disease tracking" },
      { name: "Transplant Donor Chimerism", desc: "NGS-based quantitative post-allogeneic stem cell transplant engraftment monitoring (validated down to 0.1% recipient DNA)" },
    ],
    specimens: ["FFPE tumor blocks", "Bone marrow core biopsies", "Streck cell-free DNA tubes", "Fine-needle aspirates", "Pleural fluid"],
    regulatoryAnchor: "NYSDOH CLEP Oncology Standards §58-1 · CAP Anatomic Pathology / Hematology Checklists",
  },
];

// 4-Phase LDT Submission Pipeline designed by Dr. Azad
const LDT_PIPELINE = [
  {
    phase: "Phase 01",
    title: "Analytical Protocol & Limit of Detection",
    focus: "Analytical Specificity, Sensitivity & Precision",
    description:
      "Establish wet-lab standard operating procedures, primer/probe specificity, reagent QC thresholds, and empirical determination of the Limit of Detection (LOD) and Limit of Blank (LOB) using orthogonal reference standards (e.g., NIST, Coriell, CAP surveys).",
    deliverables: ["Assay Design Document", "Primer-Probe Specificity In Silico Audit", "LOD/LOB Validation Protocol"],
  },
  {
    phase: "Phase 02",
    title: "Clinical Concordance & Matrix Verification",
    focus: "100+ Characterized Patient Specimens",
    description:
      "Run blinded prospective and retrospective clinical specimens side-by-side against validated gold-standard platforms. Calculate diagnostic sensitivity, specificity, positive predictive value (PPV), and evaluate interfering substances across distinct pre-analytical tubes.",
    deliverables: ["Cross-Platform Concordance Matrix", "Intra-run & Inter-run Precision Logs", "Sample Stability & Freeze-Thaw Study"],
  },
  {
    phase: "Phase 03",
    title: "NYSDOH Wadsworth Submission Dossier",
    focus: "Full Regulatory Narrative & Package Insert",
    description:
      "Draft the comprehensive submission package mandated by the Wadsworth Center: clinical utility justification, standard operating procedures (SOPs), package inserts, physician test requisitions, sample patient reports, and validation summary charts.",
    deliverables: ["Complete NYSDOH Narrative Application", "Quality Assurance & QC Plan", "Physician Requisition & Report Template"],
  },
  {
    phase: "Phase 04",
    title: "Inspection Readiness & Clinical Sign-Out",
    focus: "Mock CAP Audit & Competency Assessment",
    description:
      "Establish bench personnel competency assessment files, instrument calibration records, proficiency testing schedules, and a formal mock CAP inspection to ensure zero-deficiency operation prior to first clinical patient sign-out.",
    deliverables: ["CAP-Compliant Quality Binder", "Staff Training Sign-Off Records", "LIS Integration & Validation Sign-Off"],
  },
];

// Common pitfalls caught during CAP inspections
const CAP_INSPECTOR_CHECKLIST = [
  {
    tag: "Pre-Analytical",
    title: "Physical Unidirectional Workflow & Aerosol Containment",
    inspectorNote:
      "The #1 citation in molecular genetics is physical crossover between pre-amplification template extraction and post-PCR library indexing. Dedicated clean air, positive-pressure pre-PCR hoods, and separate air handling are non-negotiable.",
  },
  {
    tag: "Reagents & Lots",
    title: "Parallel Lot-to-Lot Verification Before Clinical Deployment",
    inspectorNote:
      "Laboratories frequently introduce new master-mix or enzyme lots without running parallel tests against current validated lots on known positive and low-titer controls. Every single lot change requires documented parallel sign-off by the director.",
  },
  {
    tag: "Variant Evidence",
    title: "Documented ClinGen/ACMG Curation Escalation Protocols",
    inspectorNote:
      "Inspectors review whether the laboratory has a written rule for how Variants of Uncertain Significance (VUS) are escalated, how somatic tiers (AMP/ASCO/CAP Tiers I–IV) are tracked, and how re-classification of prior patient reports is executed.",
  },
  {
    tag: "Competency",
    title: "Direct Observation Across All 6 CLIA Competency Elements",
    inspectorNote:
      "Annual competency is not just a quiz. It requires semiannual direct observation of test performance during the first year, review of worksheets, instrument maintenance logs, and blind specimen re-analysis for every testing personnel.",
  },
];

export function DedicatedFounderPage() {
  const [activePillar, setActivePillar] = useState<string>("cytogenetics");
  const selectedPillar = CQ_PILLARS.find((p) => p.id === activePillar) || CQ_PILLARS[0];

  return (
    <>
      {/* ----------------- 01: HERO / FOUNDER MASTHEAD ----------------- */}
      <section className="container-x pb-16 pt-32 md:pb-24 md:pt-44">
        <div className="grid-12 gap-y-12 items-start">
          <div className="col-span-12 lg:col-span-7">
            <FadeUp onMount delay={introDelay(0)} y={10}>
              <div className="flex flex-wrap items-center gap-2.5 mb-6">
                <Chip tone="blue">Founder & Chief Executive Officer</Chip>
                <span className="label-mono text-muted-foreground border border-border px-2.5 py-1 rounded-[3px] text-[0.75rem]">
                  Ref #AKA-DIR-AZAD
                </span>
                <span className="label-mono text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-[3px] text-[0.75rem] flex items-center gap-1.5 font-medium">
                  <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Practicing CAP Inspector
                </span>
              </div>
            </FadeUp>

            <RevealText
              as="h1"
              onMount
              delay={introDelay(0.05)}
              text="Dr. Abul Kalam Azad"
              className="display-xl tracking-[-0.04em]"
            />

            <FadeUp onMount delay={introDelay(0.15)}>
              <p className="mt-3 text-[1.125rem] text-blue font-medium tracking-tight">
                MD, MSc, PhD · Technical Laboratory Director & Assistant Professor of Pathology
              </p>
            </FadeUp>

            <FadeUp onMount delay={introDelay(0.25)} className="mt-8 max-w-[58ch] space-y-4 text-[1.0625rem] leading-relaxed text-foreground/90">
              <p>
                Dr. Abul Kalam Azad is the founder and CEO of AKAHELIX INC., a practicing College of American Pathologists (CAP)
                laboratory inspector, and Assistant Professor of Pathology at the Albert Einstein College of Medicine in New York.
              </p>
              <p className="text-muted-foreground">
                Holding three distinct New York State Department of Health (NYSDOH) Certificate of Qualification (CQ) technical directorships
                in <strong className="text-foreground font-medium">Cytogenetics</strong>, <strong className="text-foreground font-medium">Genetic Testing (Molecular)</strong>,
                and <strong className="text-foreground font-medium">Oncology (Molecular & Cellular Tumor Markers)</strong>, he directs high-complexity
                academic diagnostics and has taken fourteen clinical laboratory-developed tests (LDTs) through rigorous New York State review.
              </p>
            </FadeUp>

            {/* Quick Access Badges & Public Record Links */}
            <FadeUp onMount delay={introDelay(0.35)} className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href="https://einsteinmed.edu/faculty/16957/abul-k-azad"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[3px] border border-border bg-mist px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:border-blue hover:text-blue"
              >
                <GraduationCap className="size-4 text-blue" />
                <span>Einstein Faculty Profile (ID 16957)</span>
                <ArrowSquareOut className="size-3.5 opacity-60" />
              </a>

              <a
                href="https://orcid.org/0000-0002-9236-9598"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[3px] border border-border bg-mist px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:border-blue hover:text-blue"
              >
                <IdentificationBadge className="size-4 text-emerald-600" />
                <span>ORCID 0000-0002-9236-9598</span>
                <ArrowSquareOut className="size-3.5 opacity-60" />
              </a>

              <a
                href="https://www.ncbi.nlm.nih.gov/myncbi/abul%20kalam.azad.1/bibliography/public/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[3px] border border-border bg-mist px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:border-blue hover:text-blue"
              >
                <BookBookmark className="size-4 text-violet-600" />
                <span>PubMed (35+ Publications)</span>
                <ArrowSquareOut className="size-3.5 opacity-60" />
              </a>

              <a
                href="https://www.linkedin.com/in/abul-kalam-azad-75496362/"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-[3px] border border-border bg-mist px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:border-blue hover:text-blue"
              >
                <span>LinkedIn</span>
                <ArrowSquareOut className="size-3.5 opacity-60" />
              </a>
            </FadeUp>
          </div>

          {/* Portrait & Visual Credential Specimen Card */}
          <div className="col-span-12 lg:col-span-5">
            <div className="relative">
              <div className="chamfer bg-mist overflow-hidden border border-border shadow-sm">
                <ImageReveal
                  src={portrait}
                  alt="Dr. Abul Kalam Azad, MD, MSc, PhD — Founder and CEO of AKAHELIX"
                  width={1800}
                  height={1200}
                  priority
                  parallax={4}
                  delay={introDelay(0.2)}
                  className="aspect-[4/5]"
                  imgClassName="object-[58%_center] grayscale transition-[filter] duration-700 hover:grayscale-0"
                />

                {/* Director Specimen Caption Footer */}
                <div className="p-5 border-t border-border bg-paper/90 backdrop-blur-sm">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-display font-medium text-sm">Dr. Abul Kalam Azad</p>
                      <p className="label-mono text-[0.6875rem] text-muted-foreground mt-0.5">
                        Albert Einstein College of Medicine · Montefiore · AKAHELIX
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="label-mono text-[0.6875rem] font-medium text-blue px-2 py-0.5 rounded bg-blue/10">
                        NYS CLEP CQ Active
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-border/60 grid grid-cols-3 gap-2 text-center">
                    <div className="bg-mist p-2 rounded-[3px]">
                      <p className="font-display text-lg font-semibold text-foreground">14</p>
                      <p className="label-mono text-[0.625rem] text-muted-foreground mt-0.5">NYSDOH LDTs</p>
                    </div>
                    <div className="bg-mist p-2 rounded-[3px]">
                      <p className="font-display text-lg font-semibold text-foreground">3</p>
                      <p className="label-mono text-[0.625rem] text-muted-foreground mt-0.5">NYS CQ Permits</p>
                    </div>
                    <div className="bg-mist p-2 rounded-[3px]">
                      <p className="font-display text-lg font-semibold text-foreground">2020</p>
                      <p className="label-mono text-[0.625rem] text-muted-foreground mt-0.5">CAP Inspector</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Sub-note pointing to co-owner leadership roster */}
              <div className="mt-4 flex items-center justify-between text-xs text-muted-foreground px-1">
                <span>Looking for the 9-member leadership team?</span>
                <Link to="/leadership" className="font-medium text-blue hover:underline">
                  View Executive Team →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 02: VISUAL CREDENTIAL MATRIX (NYS CQ SCOPE) ----------------- */}
      <section className="container-x border-t border-border py-20 md:py-28">
        <div className="max-w-[70ch]">
          <FadeUp y={10}>
            <span className="label-mono text-blue">01 / DIRECTorship authority</span>
            <h2 className="display-lg mt-3">Triple-Category NYS Certificate of Qualification (CQ)</h2>
            <p className="lede mt-4 text-muted-foreground">
              New York State operates the most rigorous clinical laboratory permitting standard in the United States. Dr. Azad holds technical directorship across three comprehensive categories under NYSDOH CLEP.
            </p>
          </FadeUp>
        </div>

        {/* Interactive Pillar Selector Tabs */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
          {CQ_PILLARS.map((p) => {
            const isSelected = p.id === activePillar;
            return (
              <button
                key={p.id}
                type="button"
                onClick={() => setActivePillar(p.id)}
                className={cn(
                  "chamfer text-left p-6 transition-all duration-300 border flex flex-col justify-between cursor-pointer",
                  isSelected
                    ? "bg-paper border-blue ring-1 ring-blue shadow-sm"
                    : "bg-mist/70 border-border hover:bg-mist hover:border-foreground/20",
                )}
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="label-mono text-xs text-muted-foreground">{p.num}</span>
                    <span className={cn("label-mono text-[0.6875rem] px-2 py-0.5 rounded-[3px] border", p.badgeTone)}>
                      {p.authority}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-medium text-foreground tracking-tight">{p.title}</h3>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.summary}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60 flex items-center justify-between text-xs">
                  <span className="label-mono text-muted-foreground">{p.technologies.length} core methodologies</span>
                  <span className={cn("font-medium transition-colors", isSelected ? "text-blue" : "text-muted-foreground")}>
                    {isSelected ? "Active Specification" : "View Details →"}
                  </span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Selected Pillar Technical Specification Panel */}
        <div className="mt-6 rounded-[6px] border border-border bg-paper p-8 md:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-border">
            <div>
              <div className="flex items-center gap-3">
                <span className="label-mono text-blue">{selectedPillar.num}</span>
                <span className="label-mono text-muted-foreground">{selectedPillar.authority}</span>
              </div>
              <h3 className="font-display text-2xl font-semibold mt-1">{selectedPillar.title}</h3>
              <p className="label-mono text-xs text-muted-foreground mt-1">{selectedPillar.status}</p>
            </div>
            <div className="label-mono text-xs bg-mist px-3.5 py-2 rounded-[4px] border border-border max-w-fit">
              {selectedPillar.regulatoryAnchor}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mt-8">
            <div className="lg:col-span-8">
              <h4 className="label-mono text-xs text-muted-foreground mb-4">Validated Platforms & Diagnostic Methodologies</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {selectedPillar.technologies.map((t) => (
                  <div key={t.name} className="p-4 rounded-[4px] bg-mist/60 border border-border/80">
                    <p className="font-display text-[0.9375rem] font-medium text-foreground">{t.name}</p>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{t.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-4 border-t lg:border-t-0 lg:border-l border-border pt-6 lg:pt-0 lg:pl-8 flex flex-col justify-between">
              <div>
                <h4 className="label-mono text-xs text-muted-foreground mb-4">Sample Matrices Handled</h4>
                <ul className="space-y-2">
                  {selectedPillar.specimens.map((s) => (
                    <li key={s} className="flex items-center gap-2 text-xs text-foreground/80">
                      <CheckCircle className="size-3.5 text-blue shrink-0" />
                      <span>{s}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8 pt-4 border-t border-border/60">
                <p className="label-mono text-[0.6875rem] text-muted-foreground">DIRECTOR RESPONSIBILITY</p>
                <p className="text-xs text-foreground/80 mt-1 leading-relaxed">
                  Every run requires review of positive/negative run controls, instrument telemetry, background noise metrics, and final medical report authorization.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 03: VISUAL TIMELINE / GLOBAL PATHWAY ----------------- */}
      <section className="container-x border-t border-border py-20 md:py-28 bg-mist/40">
        <div className="max-w-[70ch]">
          <FadeUp y={10}>
            <span className="label-mono text-blue">02 / ACADEMIC & CLINICAL ROOTS</span>
            <h2 className="display-lg mt-3">The Global Trajectory</h2>
            <p className="lede mt-4 text-muted-foreground">
              A quarter-century progression through leading medical faculties, European human genetics research institutes, top North American cancer centers, and New York academic health systems.
            </p>
          </FadeUp>
        </div>

        {/* Interactive World Trajectory Map with Detailed Station Dossier */}
        <div className="mt-12">
          <FadeUp delay={0.1}>
            <TrajectoryMap />
          </FadeUp>
        </div>
      </section>

      {/* ----------------- 04: VISUAL TECHNICAL DIAGRAM: THE LDT PIPELINE ----------------- */}
      <section className="container-x border-t border-border py-20 md:py-28">
        <div className="max-w-[70ch]">
          <FadeUp y={10}>
            <span className="label-mono text-blue">03 / METHODOLOGY & BLUEPRINTS</span>
            <h2 className="display-lg mt-3">From Assay Concept to NYSDOH Approval</h2>
            <p className="lede mt-4 text-muted-foreground">
              Dr. Azad's four-phase architecture for building, verifying, and taking laboratory-developed tests through New York State review with zero unresolvable deficiencies.
            </p>
          </FadeUp>
        </div>

        {/* Visual Multi-Phase Pipeline Grid */}
        <div className="mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {LDT_PIPELINE.map((step, idx) => (
            <FadeUp key={step.phase} delay={idx * 0.08}>
              <div className="h-full flex flex-col justify-between chamfer border border-border bg-paper p-6 relative">
                <div>
                  <div className="flex items-center justify-between pb-4 border-b border-border/70 mb-4">
                    <span className="label-mono text-xs font-semibold text-blue">{step.phase}</span>
                    <span className="label-mono text-[0.625rem] text-muted-foreground uppercase">{step.focus}</span>
                  </div>
                  <h3 className="font-display text-lg font-medium tracking-tight text-foreground">{step.title}</h3>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{step.description}</p>
                </div>

                <div className="mt-6 pt-4 border-t border-border/60">
                  <p className="label-mono text-[0.625rem] text-muted-foreground mb-2">KEY DELIVERABLES</p>
                  <ul className="space-y-1.5">
                    {step.deliverables.map((d) => (
                      <li key={d} className="text-xs flex items-center gap-1.5 text-foreground/80">
                        <span className="size-1 rounded-full bg-blue shrink-0" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ----------------- 05: SIGNATURE CASE STUDY: THE SMA CONVERSION ----------------- */}
      <section className="container-x border-t border-border py-20 md:py-28 bg-paper">
        <div className="rounded-[6px] border border-border bg-mist/50 p-8 md:p-14">
          <div className="grid-12 gap-y-10 items-center">
            <div className="col-span-12 lg:col-span-7">
              <span className="label-mono text-blue text-xs">04 / PROVEN IMPACT · CASE STUDY</span>
              <h2 className="display-md mt-2">
                In-House SMA Carrier Screening: 67% Cost Reduction & 48-Hour Turnaround
              </h2>
              <p className="mt-6 text-[1.0625rem] leading-relaxed text-foreground/90">
                A major New York academic medical center was sending out thousands of spinal muscular atrophy (SMA) carrier screens annually to commercial reference laboratories, incurring steep per-sample fees and 10–14 day turnaround delays.
              </p>
              <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
                Dr. Azad led the in-house development and clinical validation of a multiplex real-time qPCR assay. Beyond standard SMN1 exon 7 copy number loss, the assay incorporated detection of the g.27134T&gt;G single nucleotide polymorphism associated with "silent carriers" (2+0 alleles), delivering superior clinical sensitivity.
              </p>

              <div className="mt-8 grid grid-cols-2 sm:grid-cols-3 gap-4 pt-6 border-t border-border">
                <div>
                  <p className="font-display text-3xl font-bold text-blue">67%</p>
                  <p className="label-mono text-xs text-muted-foreground mt-1">Cost savings per sample</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">48 hrs</p>
                  <p className="label-mono text-xs text-muted-foreground mt-1">Turnaround vs. 14 days</p>
                </div>
                <div>
                  <p className="font-display text-3xl font-bold text-foreground">2+0</p>
                  <p className="label-mono text-xs text-muted-foreground mt-1">Silent carrier detection</p>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 text-xs text-muted-foreground">
                <span className="label-mono">NYSDOH LDT PERMITS:</span>
                <span className="font-mono bg-paper px-2 py-0.5 rounded border border-border">61639</span>
                <span className="font-mono bg-paper px-2 py-0.5 rounded border border-border">67140</span>
                <span className="font-mono bg-paper px-2 py-0.5 rounded border border-border">102892</span>
              </div>
            </div>

            {/* Regulatory Anchor Box */}
            <div className="col-span-12 lg:col-span-5">
              <div className="chamfer bg-paper border border-border p-6 shadow-sm">
                <div className="flex items-center gap-2.5 pb-4 border-b border-border">
                  <Certificate className="size-5 text-blue" />
                  <span className="font-display font-medium text-sm">CLSI Standard Co-Authorship</span>
                </div>
                <p className="text-xs text-muted-foreground mt-4 leading-relaxed">
                  Based on this frontline clinical work, Dr. Azad was selected as a contributing author and committee member for:
                </p>
                <div className="mt-3 p-3.5 rounded bg-mist border border-border/80">
                  <p className="font-display font-semibold text-sm text-foreground">CLSI NBS13 (2025)</p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    <em>Newborn Screening for Spinal Muscular Atrophy</em>, 1st Edition. Clinical and Laboratory Standards Institute.
                  </p>
                </div>
                <div className="mt-6 pt-4 border-t border-border/60">
                  <p className="label-mono text-[0.6875rem] text-muted-foreground">CLINGEN EXPERT PANELS</p>
                  <ul className="mt-2 space-y-1.5 text-xs text-foreground/85">
                    <li className="flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-emerald-500" />
                      <span>Sequence Variant Expert Panel: ITGA2B / ITGB3</span>
                    </li>
                    <li className="flex items-center gap-1.5">
                      <span className="size-1 rounded-full bg-emerald-500" />
                      <span>Hereditary Cancer Gene Curation Panel: AXIN2</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 06: AUTHOR OF GENETIC BLUEPRINT ----------------- */}
      <section className="container-x border-t border-border py-20 md:py-28">
        <div className="grid-12 gap-y-12 items-center">
          <div className="col-span-12 lg:col-span-6">
            <span className="label-mono text-blue text-xs">05 / SCHOLARLY WORK & TEXTBOOK</span>
            <h2 className="display-lg mt-3">Author of Genetic Blueprint: Bench to Bed</h2>
            <p className="label-mono text-xs text-muted-foreground mt-2">
              First Edition · 2026 · ISBN {book.isbn} · Published by AKA HELIX INC.
            </p>

            <p className="mt-6 text-[1.0625rem] leading-relaxed text-foreground/90">
              An exhaustive, integrated review of medical laboratory genetics written specifically to the test specifications of the American Board of Medical Genetics and Genomics (ABMGG) and Canadian College of Medical Geneticists (CCMG).
            </p>
            <p className="mt-4 text-[0.9375rem] leading-relaxed text-muted-foreground">
              Synthesizing molecular genetics, biochemical pathways, cytogenetic nomenclature, and clinical reporting principles into an authoritative reference manual for laboratory directors, fellows, and genetic counselors.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/book"
                className="inline-flex items-center gap-2 rounded-[3px] bg-blue px-4 py-2.5 text-[0.875rem] font-medium text-on-blue transition-colors hover:bg-blue-deep"
              >
                <span>Read more about the book</span>
                <span aria-hidden="true">→</span>
              </Link>
              <span className="label-mono text-xs text-muted-foreground">
                9 core domains · ABMGG blueprint coverage
              </span>
            </div>
          </div>

          <div className="col-span-12 lg:col-span-6">
            <div className="chamfer bg-mist border border-border p-8">
              <h3 className="label-mono text-xs text-muted-foreground mb-4">BOARD BLUEPRINT ALIGNMENT</h3>
              <div className="space-y-3">
                {book.boards.slice(0, 5).map((b) => (
                  <div key={b.code} className="bg-paper p-3.5 rounded-[4px] border border-border/80 flex items-center justify-between">
                    <div>
                      <span className="font-mono font-semibold text-xs text-blue mr-2">[{b.code}]</span>
                      <span className="text-xs font-medium text-foreground">{b.name}</span>
                    </div>
                    {b.coverage && (
                      <span className="label-mono text-xs font-medium text-emerald-600 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded">
                        {b.coverage}% Coverage
                      </span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ----------------- 07: THE CAP INSPECTOR'S PRE-FLIGHT CHECKLIST ----------------- */}
      <section className="container-x border-t border-border py-20 md:py-28 bg-mist/30">
        <div className="max-w-[70ch]">
          <FadeUp y={10}>
            <span className="label-mono text-blue">06 / INSPECTION READINESS</span>
            <h2 className="display-lg mt-3">How a Working CAP Inspector Evaluates Your Lab</h2>
            <p className="lede mt-4 text-muted-foreground">
              Most deficiencies that delay CLIA, CAP, or NYSDOH permits stem not from platform failure, but from gaps in audit trails, unvalidated lot changes, and lack of unidirectional workflow.
            </p>
          </FadeUp>
        </div>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
          {CAP_INSPECTOR_CHECKLIST.map((item, i) => (
            <FadeUp key={item.title} delay={i * 0.08}>
              <div className="h-full rounded-[6px] border border-border bg-paper p-6 flex flex-col justify-between shadow-sm">
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-border mb-3">
                    <span className="label-mono text-xs font-semibold text-blue">{item.tag}</span>
                    <span className="label-mono text-[0.6875rem] text-muted-foreground">Audit Focus</span>
                  </div>
                  <h3 className="font-display text-lg font-medium tracking-tight text-foreground">{item.title}</h3>
                  <p className="text-xs text-foreground/80 mt-3 leading-relaxed bg-mist p-3 rounded-[3px] border border-border/60">
                    {item.inspectorNote}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-border/40 flex items-center gap-1.5 text-[0.75rem] text-emerald-600 dark:text-emerald-400 font-medium">
                  <ShieldCheck className="size-4 shrink-0" />
                  <span>Covered in AKAHELIX Mock Inspection</span>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ----------------- 08: CALL TO ACTION ----------------- */}
      <section className="container-x border-t border-border py-20 md:py-28">
        <div className="chamfer bg-blue text-on-blue p-8 md:p-14">
          <div className="grid-12 gap-y-8 items-center">
            <div className="col-span-12 lg:col-span-8">
              <span className="label-mono text-on-blue-muted text-xs">DIRECT CONSULTATION</span>
              <h2 className="display-lg mt-2 text-on-blue">
                Work directly with Dr. Azad on your laboratory build or validation.
              </h2>
              <p className="mt-4 max-w-[54ch] text-[1.0625rem] text-on-blue-muted leading-relaxed">
                Whether you need a full turnkey build, an LDT submission package taken through New York State review, or a mock CAP inspection prior to survey, Dr. Azad leads every technical engagement.
              </p>
            </div>

            <div className="col-span-12 lg:col-span-4 lg:text-right flex flex-col items-start lg:items-end gap-3">
              <Cta to="/contact" variant="solid" size="lg" className="bg-paper text-blue hover:bg-mist font-medium">
                Book a scoping discussion
              </Cta>
              <Link to="/leadership" className="text-xs text-on-blue-muted hover:text-on-blue underline mt-2">
                Explore the executive co-owner team →
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
