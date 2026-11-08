import { useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  CalendarBlank,
  Certificate,
  Compass,
  Crosshair,
  Dna,
  Flask,
  GraduationCap,
  MapPin,
  Microscope,
  ShieldCheck,
} from "@phosphor-icons/react";

import {
  FEATURED_COUNTRY_PATHS,
  WORLD_LAND_PATH,
  WORLD_MAP_HEIGHT,
  WORLD_MAP_WIDTH,
} from "./worldMapData";
import { cn } from "@/lib/utils";

export interface TrajectoryStation {
  id: string;
  stepNumber: string;
  city: string;
  country: string;
  region: string;
  flag: string;
  iso: string;
  years: string;
  duration: string;
  institution: string;
  department: string;
  appointment: string;
  focusTitle: string;
  scientificNarrative: string[];
  methodologies: string[];
  artifacts: string[];
  x: number;
  y: number;
  labelPosition?: "top" | "bottom" | "left" | "right";
}

export const TRAJECTORY_STATIONS: TrajectoryStation[] = [
  {
    id: "dhaka",
    stepNumber: "01",
    city: "Dhaka",
    country: "Bangladesh",
    region: "South Asia",
    flag: "🇧🇩",
    iso: "BD",
    years: "Prior to 1999",
    duration: "Medical Degree & Clinical Internship",
    institution: "Sir Salimullah Medical College (SSMC) & Mitford Hospital",
    department: "Faculty of Medicine, University of Dhaka",
    appointment: "MBBS (Doctor of Medicine equivalent) & Inpatient Clinical Resident",
    focusTitle: "Clinical Medicine, Pathophysiology & Endemic Hemoglobinopathies",
    scientificNarrative: [
      "Completed a rigorous 5-year clinical medical curriculum followed by a full 1-year inpatient hospital residency rotation across Internal Medicine, Pediatrics, Clinical Pathology, and Hematology at one of the country's largest tertiary academic hospitals.",
      "Managed high patient volumes presenting with severe monogenic blood disorders endemic to the region: β-thalassemia major, β-thalassemia minor/trait, and Hemoglobin E (HbE) hemoglobinopathy variants.",
      "Conducted bedside patient workups, bone marrow aspirate cytology reviews, and family pedigree analyses, establishing the core clinical conviction that every diagnostic test carries profound treatment, transfusion, and genetic counseling implications.",
    ],
    methodologies: [
      "Clinical differential diagnosis",
      "Peripheral blood cytology & differential counting",
      "Cellulose acetate hemoglobin electrophoresis interpretation",
      "Bone marrow examination & aspirate assessment",
      "Genetic pedigree documentation",
    ],
    artifacts: [
      "Conferred MBBS Medical Degree (MD equivalent)",
      "Registered Medical Practitioner (BMDC)",
      "Bedside clinical foundation for future laboratory sign-out oversight",
    ],
    x: 751.1,
    y: 204.0,
    labelPosition: "bottom",
  },
  {
    id: "bangkok",
    stepNumber: "02",
    city: "Bangkok",
    country: "Thailand",
    region: "Southeast Asia",
    flag: "🇹🇭",
    iso: "TH",
    years: "2000–2002",
    duration: "2 Years",
    institution: "Asian Institute of Technology (AIT)",
    department: "School of Advanced Technologies · Bioprocess Technology Program",
    appointment: "Master of Science (MSc) Candidate & Graduate Researcher",
    focusTitle: "Biochemical Separation, Chromatography & Bio-Analytical Instrumentation",
    scientificNarrative: [
      "Bridged bedside medicine with engineering and biochemical physics, undertaking advanced postgraduate training in macromolecular separation, enzyme kinetics, and downstream bioprocess modeling.",
      "Specialized in high-resolution liquid chromatography, operating and calibrating HPLC and FPLC systems for the selective purification and fractionation of nucleic acids and functional proteins.",
      "Mastered statistical quality control (SQC), measurement uncertainty estimation, and instrument drift calibration—quantitative principles that later formed the technical foundation of his clinical laboratory validation and CAP inspection expertise.",
    ],
    methodologies: [
      "High-Performance Liquid Chromatography (HPLC / FPLC)",
      "Ion-exchange & size-exclusion macromolecular chromatography",
      "Spectrophotometric kinetics & enzyme assay modeling",
      "Analytical calibration curve validation & limit of blank",
      "Statistical quality control (SQC) & precision charting",
    ],
    artifacts: [
      "Conferred Master of Science (MSc) in Bioprocess Technology",
      "AIT Academic Fellowship award recipient",
      "Master's thesis on downstream macromolecular separation protocols",
    ],
    x: 779.2,
    y: 223.7,
    labelPosition: "bottom",
  },
  {
    id: "leuven",
    stepNumber: "03",
    city: "Leuven",
    country: "Belgium",
    region: "Western Europe",
    flag: "🇧🇪",
    iso: "BE",
    years: "2004–2009",
    duration: "5 Years",
    institution: "Katholieke Universiteit Leuven (KU Leuven)",
    department: "Center for Human Genetics (Centrum Menselijke Erfelijkheid)",
    appointment: "Doctor of Philosophy (PhD) in Human Genetics",
    focusTitle: "Epithelial Sodium Channel (ENaC) Genomics & Cystic Fibrosis-like Disease",
    scientificNarrative: [
      "Completed five years of intensive doctoral research at KU Leuven's renowned Center for Human Genetics, investigating the molecular genetics and ion transport physiology of the Epithelial Sodium Channel (ENaC) genes (SCNN1A, SCNN1B, and SCNN1G).",
      "Investigated European patient cohorts presenting with classic cystic fibrosis symptoms (bronchiectasis, chronic Pseudomonas colonization, elevated sweat chloride) who tested negative for pathogenic CFTR mutations.",
      "Engineered site-directed mutant constructs and microinjected cRNA into Xenopus laevis oocytes, executing two-electrode voltage-clamp (TEVC) electrophysiology to measure amiloride-sensitive sodium currents (INa).",
      "Demonstrated that gain-of-function ENaC variants accelerate transepithelial sodium hyperabsorption, depleting airway surface liquid (ASL) and causing severe pulmonary disease independent of CFTR.",
    ],
    methodologies: [
      "Capillary Sanger DNA sequencing & chromatogram deconvolution",
      "Site-directed in vitro mutagenesis & plasmid cloning",
      "Two-electrode voltage-clamp (TEVC) electrophysiology",
      "Xenopus laevis oocyte microinjection & membrane current profiling",
      "Denaturing Gradient Gel Electrophoresis (DGGE) mutation scanning",
      "Genotype-phenotype correlation across European CF registries",
    ],
    artifacts: [
      "Conferred Doctor of Philosophy (PhD) in Human Genetics (KU Leuven)",
      "Lead-author publication in Human Mutation (doi:10.1002/humu.20963)",
      "Published research in Pediatric Pulmonology on ENaC subunit mutations",
      "Invited presentation at the European Human Genetics Conference (ESHG)",
    ],
    x: 513.1,
    y: 144.2,
    labelPosition: "top",
  },
  {
    id: "toronto",
    stepNumber: "04",
    city: "Toronto",
    country: "Canada",
    region: "North America",
    flag: "🇨🇦",
    iso: "CA",
    years: "2009–2014",
    duration: "5 Years",
    institution: "Princess Margaret Cancer Centre / University Health Network (UHN)",
    department: "Department of Medical Biophysics, University of Toronto",
    appointment: "CIHR Postdoctoral Research Fellow in Cancer Genetics & Genomic Instability",
    focusTitle: "Somatic Copy Number Alterations, Genomic Instability & Cancer Genomics",
    scientificNarrative: [
      "Awarded a prestigious, competitive postdoctoral research fellowship by the Canadian Institutes of Health Research (CIHR) to conduct translational cancer genomics at Princess Margaret Cancer Centre—one of the top 5 oncology research institutes in the world.",
      "Investigated the molecular mechanisms of chromosomal instability (CIN), DNA double-strand break repair deficiencies, and somatic copy number alterations (SCNAs) across primary patient tumor cohorts.",
      "Developed computational segmentation and analytical pipelines for high-density Affymetrix and Illumina SNP microarrays, characterizing focal deletions, oncogenic amplifications, and copy-neutral loss of heterozygosity (cnLOH).",
      "Participated in the clinical translation of next-generation sequencing (NGS), mapping mutational signatures and transcriptomic networks to identify novel predictive biomarkers for oncology therapy.",
    ],
    methodologies: [
      "High-density oligonucleotide & SNP microarrays (Affymetrix / Illumina)",
      "Copy number variation (CNV) segmentation algorithms & LOH mapping",
      "Early-generation clinical Next-Generation Sequencing (NGS) workflows",
      "Quantitative real-time RT-PCR (qPCR) gene expression assays",
      "Western blotting, immunoprecipitation, and confocal immunofluorescence",
      "Primary human tumor tissue biobanking & nucleic acid quality control",
    ],
    artifacts: [
      "Canadian Institutes of Health Research (CIHR) Postdoctoral Fellowship Award",
      "Co-authored publications in Cancer Research, Oncogene, and Blood",
      "Mentored graduate students and clinical fellows in molecular pathology",
      "Member, American Association for Cancer Research (AACR)",
    ],
    x: 279.5,
    y: 161.5,
    labelPosition: "left",
  },
  {
    id: "houston",
    stepNumber: "05",
    city: "Houston, TX",
    country: "USA",
    region: "North America",
    flag: "🇺🇸",
    iso: "US",
    years: "2014–2017",
    duration: "3 Years",
    institution: "The University of Texas MD Anderson Cancer Center",
    department: "Division of Pathology and Laboratory Medicine · Department of Molecular Oncology",
    appointment: "Research Scientist in Molecular Oncology & Precision Diagnostics",
    focusTitle: "Precision Oncology Panels, FFPE Low-Input NGS & Clinical Trial Biomarkers",
    scientificNarrative: [
      "Conducted translational molecular oncology research at the nation's #1 cancer hospital (MD Anderson Cancer Center, Texas Medical Center, Houston), evaluating molecular tumor markers for clinical trial patient stratification.",
      "Engineered and validated high-throughput targeted NGS hybrid-capture gene panels optimized for challenging, low-input formalin-fixed paraffin-embedded (FFPE) patient biopsies.",
      "Solved critical technical bottlenecks in clinical FFPE sequencing: chemical deamination artifact filtering, low-frequency somatic variant detection (VAF down to 1–2%), and complex oncogenic fusion detection (ALK, ROS1, RET, NTRK).",
      "Drafted comprehensive analytical assay validation reports matching emerging College of American Pathologists (CAP) and CLIA requirements for clinical molecular pathology.",
    ],
    methodologies: [
      "Formalin-Fixed Paraffin-Embedded (FFPE) nucleic acid extraction & QC",
      "Targeted hybrid-capture & amplicon Next-Generation Sequencing (NGS)",
      "Variant Allele Frequency (VAF) deconvolution & low-titer calling",
      "Droplet Digital PCR (ddPCR) for absolute copy number & rare somatic variants",
      "CLIA/CAP clinical assay validation protocol development",
      "Clinical trial biomarker data integration for precision oncology",
    ],
    artifacts: [
      "Contributed to precision oncology trial panels matching targeted therapies",
      "Authored translational oncology papers in Cancer Discovery and Clin Cancer Res",
      "Formulated quality metrics for clinical FFPE next-generation sequencing",
    ],
    x: 235.1,
    y: 191.8,
    labelPosition: "bottom",
  },
  {
    id: "new-york",
    stepNumber: "06",
    city: "New York, NY",
    country: "USA",
    region: "North America",
    flag: "🇺🇸",
    iso: "US",
    years: "2017–Present",
    duration: "Active Directorship",
    institution: "Albert Einstein College of Medicine & Montefiore Medical Center / AKAHELIX INC.",
    department: "Department of Pathology · Division of Molecular Pathology",
    appointment: "Assistant Professor of Pathology · Technical Laboratory Director · CAP Inspector · Founder & CEO",
    focusTitle: "Dual LGG Directorship, 14 NYSDOH LDT Submissions, CAP Inspection & AKAHELIX",
    scientificNarrative: [
      "Completed the rigorous, dual ACGME/ABMGG-accredited Fellowship in Laboratory Genetics and Genomics (LGG) (2017–2020) at Albert Einstein College of Medicine and Montefiore Medical Center, achieving clinical mastery in both cytogenetics and molecular diagnostics.",
      "Appointed Assistant Professor of Pathology at Einstein and Technical Director of Molecular Pathology; awarded New York State Department of Health (NYSDOH) Certificate of Qualification (CQ) technical directorships in Cytogenetics, Genetic Testing (Molecular), and Oncology.",
      "Qualified as an active inspection team member for the College of American Pathologists (CAP) Laboratory Accreditation Program, leading on-site inspections of clinical genetics laboratories nationwide.",
      "Built and validated 14 Laboratory-Developed Tests (LDTs) submitted to the NYSDOH Wadsworth Center, including an in-house SMA carrier screening assay that saved an academic health system 67% annually, and an ultra-sensitive NGS post-transplant donor chimerism assay.",
      "Appointed to NIH ClinGen Variant and Gene Curation Expert Panels (ITGA2B/ITGB3, AXIN2); co-authored national clinical standard CLSI NBS13 (2025); authored the 2026 textbook Genetic Blueprint: Bench to Bed (ISBN 979-8-234-24155-9); and founded AKAHELIX INC. to provide turnkey laboratory build and inspection execution.",
    ],
    methodologies: [
      "High-resolution G-band karyotyping (400–550 bands) & ISCN nomenclature",
      "Chromosomal microarrays (CMA / aCGH) for constitutional & neoplastic cases",
      "Dual-color break-apart & dual-fusion metaphase/interphase FISH",
      "Clinical NGS somatic & germline panel sign-out & variant classification (ACMG)",
      "NYSDOH Wadsworth Center LDT submission narrative & validation authoring",
      "Full CLIA/CAP quality management systems & mock inspection execution",
    ],
    artifacts: [
      "3 NYS Certificate of Qualification (CQ) Directorship categories",
      "14 NYSDOH LDT packages submitted (12 approved, 2 conditionally approved)",
      "CAP Laboratory Inspector (LAP inspection team member since 2020)",
      "Co-author, Clinical and Laboratory Standards Institute CLSI NBS13 (2025)",
      "Author, Genetic Blueprint: Bench to Bed (First Edition, 2026)",
      "Founder & Chief Executive Officer, AKAHELIX INC.",
    ],
    x: 294.4,
    y: 168.2,
    labelPosition: "right",
  },
];

// Flight arcs connecting stations sequentially
const FLIGHT_ARCS = [
  { from: TRAJECTORY_STATIONS[0], to: TRAJECTORY_STATIONS[1], curve: -15 }, // Dhaka -> Bangkok
  { from: TRAJECTORY_STATIONS[1], to: TRAJECTORY_STATIONS[2], curve: -60 }, // Bangkok -> Leuven
  { from: TRAJECTORY_STATIONS[2], to: TRAJECTORY_STATIONS[3], curve: -70 }, // Leuven -> Toronto
  { from: TRAJECTORY_STATIONS[3], to: TRAJECTORY_STATIONS[4], curve: -25 }, // Toronto -> Houston
  { from: TRAJECTORY_STATIONS[4], to: TRAJECTORY_STATIONS[5], curve: -20 }, // Houston -> New York
];

export function TrajectoryMap() {
  const [activeId, setActiveId] = useState<string>("new-york");
  const activeStation =
    TRAJECTORY_STATIONS.find((s) => s.id === activeId) || TRAJECTORY_STATIONS[0]!;

  const currentIndex = TRAJECTORY_STATIONS.findIndex((s) => s.id === activeId);
  const prevStation =
    currentIndex > 0 ? TRAJECTORY_STATIONS[currentIndex - 1] : null;
  const nextStation =
    currentIndex < TRAJECTORY_STATIONS.length - 1
      ? TRAJECTORY_STATIONS[currentIndex + 1]
      : null;

  return (
    <div className="w-full">
      {/* ---------------- MAP CARD CONTAINER ---------------- */}
      <div className="chamfer relative w-full overflow-hidden border border-border bg-paper shadow-sm">
        {/* Map Header Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border bg-mist/60 px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex size-2 rounded-full bg-blue animate-pulse" />
            <span className="label-mono text-xs font-semibold text-foreground">
              GLOBAL SCIENTIFIC & CLINICAL TRAJECTORY
            </span>
            <span className="label-mono hidden sm:inline text-xs text-muted-foreground">
              · 6 Academic & Diagnostic Stations
            </span>
          </div>

          <div className="flex items-center gap-2">
            <span className="label-mono text-[0.6875rem] text-muted-foreground">
              CLICK ANY POINT TO INSPECT
            </span>
            <div className="label-mono text-xs bg-paper border border-border px-2.5 py-0.5 rounded text-blue font-medium">
              {activeStation.stepNumber} / 06 · {activeStation.city}
            </div>
          </div>
        </div>

        {/* Vector SVG World Map Canvas */}
        <div className="relative w-full aspect-[2/1] min-h-[320px] max-h-[560px] bg-[#fbfcfd] dark:bg-[#0c1017] select-none">
          <svg
            viewBox={`0 0 ${WORLD_MAP_WIDTH} ${WORLD_MAP_HEIGHT}`}
            className="w-full h-full block"
            aria-label="Interactive world map of Dr. Abul Kalam Azad's clinical and academic training trajectory"
          >
            <defs>
              {/* Subtle map background grid pattern */}
              <pattern
                id="mapGrid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border/30 dark:text-border/15"
                />
              </pattern>

              {/* Glowing gradient for flight arcs */}
              <linearGradient
                id="arcGlow"
                x1="0%"
                y1="0%"
                x2="100%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#2563eb" stopOpacity="0.4" />
                <stop offset="50%" stopColor="#3b82f6" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#2563eb" stopOpacity="0.4" />
              </linearGradient>
            </defs>

            {/* Grid background */}
            <rect
              width={WORLD_MAP_WIDTH}
              height={WORLD_MAP_HEIGHT}
              fill="url(#mapGrid)"
            />

            {/* Latitude / Longitude hairline reference graticules */}
            <line
              x1="0"
              y1="250"
              x2="1000"
              y2="250"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              className="text-border/50 dark:text-border/30"
            />
            <line
              x1="500"
              y1="0"
              x2="500"
              y2="500"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeDasharray="4 4"
              className="text-border/50 dark:text-border/30"
            />

            {/* World Landmass Base Outline */}
            <path
              d={WORLD_LAND_PATH}
              fill="currentColor"
              stroke="currentColor"
              strokeWidth="0.75"
              strokeLinejoin="round"
              className="text-mist-deep/45 dark:text-muted/15"
            />

            {/* Featured Countries: Bangladesh, Thailand, Belgium, Canada, USA */}
            {Object.entries(FEATURED_COUNTRY_PATHS).map(([iso, path]) => {
              const isSelectedCountry = activeStation.iso === iso;
              return (
                <path
                  key={iso}
                  d={path}
                  fill="currentColor"
                  stroke="currentColor"
                  strokeWidth={isSelectedCountry ? "1.5" : "0.75"}
                  className={cn(
                    "transition-all duration-300",
                    isSelectedCountry
                      ? "text-blue/20 stroke-blue dark:text-blue/30"
                      : "text-blue/8 stroke-blue/40 hover:text-blue/15",
                  )}
                />
              );
            })}

            {/* Curved Flight Trajectory Arcs */}
            {FLIGHT_ARCS.map((arc, i) => {
              const dx = arc.to.x - arc.from.x;
              const dy = arc.to.y - arc.from.y;
              const midX = (arc.from.x + arc.to.x) / 2;
              const midY = (arc.from.y + arc.to.y) / 2 + arc.curve;
              const pathD = `M ${arc.from.x} ${arc.from.y} Q ${midX} ${midY} ${arc.to.x} ${arc.to.y}`;

              const isArcActive =
                arc.from.id === activeId || arc.to.id === activeId;

              return (
                <g key={`arc-${i}`}>
                  {/* Subtle backdrop line */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeDasharray="3 3"
                    className={cn(
                      "transition-all duration-300",
                      isArcActive
                        ? "text-blue stroke-blue"
                        : "text-border/80 dark:text-border/60",
                    )}
                  />
                </g>
              );
            })}

            {/* Interactive Location Points */}
            {TRAJECTORY_STATIONS.map((station) => {
              const isSelected = station.id === activeId;

              return (
                <g
                  key={station.id}
                  className="cursor-pointer group"
                  onClick={() => setActiveId(station.id)}
                  tabIndex={0}
                  role="button"
                  aria-pressed={isSelected}
                  aria-label={`${station.city}, ${station.country} (${station.years})`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setActiveId(station.id);
                    }
                  }}
                >
                  {/* Outer pulse wave on selected point */}
                  {isSelected && (
                    <circle
                      cx={station.x}
                      cy={station.y}
                      r="16"
                      fill="none"
                      stroke="#2563eb"
                      strokeWidth="1.5"
                      strokeOpacity="0.4"
                      className="animate-ping"
                    />
                  )}

                  {/* Halo hover circle */}
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={isSelected ? "11" : "8"}
                    fill={isSelected ? "#2563eb" : "#ffffff"}
                    fillOpacity={isSelected ? "0.2" : "0.85"}
                    stroke={isSelected ? "#2563eb" : "#64748b"}
                    strokeWidth={isSelected ? "1.8" : "1.2"}
                    className="transition-all duration-200 group-hover:scale-125"
                  />

                  {/* Core Pin Dot */}
                  <circle
                    cx={station.x}
                    cy={station.y}
                    r={isSelected ? "5" : "3.5"}
                    fill={isSelected ? "#2563eb" : "#0f172a"}
                    stroke="#ffffff"
                    strokeWidth="1.5"
                    className="transition-all duration-200 shadow-sm"
                  />

                  {/* Station Label Badge */}
                  <g
                    transform={`translate(${
                      station.labelPosition === "left"
                        ? station.x - 10
                        : station.labelPosition === "right"
                        ? station.x + 10
                        : station.x
                    }, ${
                      station.labelPosition === "top"
                        ? station.y - 12
                        : station.labelPosition === "bottom"
                        ? station.y + 16
                        : station.y + 3
                    })`}
                    className={cn(
                      "transition-opacity duration-200",
                      isSelected
                        ? "opacity-100"
                        : "opacity-80 group-hover:opacity-100",
                    )}
                  >
                    <text
                      textAnchor={
                        station.labelPosition === "left"
                          ? "end"
                          : station.labelPosition === "right"
                          ? "start"
                          : "middle"
                      }
                      fontSize="9.5"
                      fontFamily="var(--font-mono, monospace)"
                      fontWeight={isSelected ? "600" : "500"}
                      fill={isSelected ? "#2563eb" : "currentColor"}
                      className="text-foreground select-none"
                    >
                      {station.stepNumber} {station.city}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>

          {/* Map Compass Rose / Legend Stamp */}
          <div className="absolute bottom-3 left-4 hidden sm:flex items-center gap-2 label-mono text-[0.625rem] text-muted-foreground bg-paper/85 backdrop-blur-sm px-2.5 py-1 rounded border border-border/80">
            <Compass className="size-3.5 text-blue" />
            <span>Natural Earth / Miller Cylindrical Projection</span>
          </div>

          <div className="absolute bottom-3 right-4 label-mono text-[0.625rem] text-muted-foreground bg-paper/85 backdrop-blur-sm px-2.5 py-1 rounded border border-border/80">
            <span>Click any node to expand clinical record</span>
          </div>
        </div>

        {/* ---------------- HORIZONTAL STEPPER SELECTOR ---------------- */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 border-t border-border bg-mist/30">
          {TRAJECTORY_STATIONS.map((station) => {
            const isSelected = station.id === activeId;
            return (
              <button
                key={station.id}
                type="button"
                onClick={() => setActiveId(station.id)}
                className={cn(
                  "p-3.5 text-left transition-all duration-200 border-r last:border-r-0 border-b lg:border-b-0 border-border/80 flex flex-col justify-between cursor-pointer",
                  isSelected
                    ? "bg-paper text-foreground ring-1 ring-inset ring-blue"
                    : "hover:bg-mist text-muted-foreground hover:text-foreground",
                )}
              >
                <div className="flex items-center justify-between w-full">
                  <span
                    className={cn(
                      "label-mono text-[0.6875rem] font-semibold",
                      isSelected ? "text-blue" : "text-muted-foreground",
                    )}
                  >
                    {station.stepNumber}
                  </span>
                  <span className="text-xs">{station.flag}</span>
                </div>
                <div className="mt-2">
                  <p
                    className={cn(
                      "font-display text-sm font-medium leading-tight",
                      isSelected ? "text-foreground font-semibold" : "",
                    )}
                  >
                    {station.city}
                  </p>
                  <p className="label-mono text-[0.625rem] text-muted-foreground mt-0.5 font-mono truncate">
                    {station.years}
                  </p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ---------------- EXPANDABLE IN-DEPTH DOSSIER PANEL ---------------- */}
      <div className="mt-6 chamfer border border-border bg-paper p-6 md:p-10 shadow-sm relative animate-in fade-in duration-300">
        {/* Top Header of the Selected Station */}
        <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6 pb-6 border-b border-border">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="label-mono text-xs font-semibold text-blue bg-blue/10 px-2.5 py-0.5 rounded-[3px]">
                STATION {activeStation.stepNumber} OF 06
              </span>
              <span className="label-mono text-xs text-muted-foreground border border-border px-2 py-0.5 rounded-[3px]">
                {activeStation.flag} {activeStation.country.toUpperCase()} ·{" "}
                {activeStation.region.toUpperCase()}
              </span>
              <span className="label-mono text-xs text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 px-2 py-0.5 rounded-[3px]">
                {activeStation.years}
              </span>
            </div>

            <h3 className="display-sm mt-3 tracking-tight text-foreground">
              {activeStation.city}, {activeStation.country}
            </h3>
            <p className="font-display text-[1.0625rem] font-medium text-blue mt-1">
              {activeStation.focusTitle}
            </p>
          </div>

          {/* Stepper Navigation buttons (Previous / Next station) */}
          <div className="flex items-center gap-2 shrink-0">
            {prevStation && (
              <button
                type="button"
                onClick={() => setActiveId(prevStation.id)}
                className="inline-flex items-center gap-1.5 rounded-[3px] border border-border bg-mist px-3 py-1.5 text-xs font-medium text-foreground transition-colors hover:border-blue hover:text-blue cursor-pointer"
              >
                <ArrowLeft className="size-3.5" />
                <span>Prev: {prevStation.city}</span>
              </button>
            )}

            {nextStation && (
              <button
                type="button"
                onClick={() => setActiveId(nextStation.id)}
                className="inline-flex items-center gap-1.5 rounded-[3px] bg-blue px-3.5 py-1.5 text-xs font-medium text-on-blue transition-colors hover:bg-blue-deep cursor-pointer"
              >
                <span>Next: {nextStation.city}</span>
                <ArrowRight className="size-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Institution & Appointment Header Banner */}
        <div className="mt-6 p-4 rounded-[4px] bg-mist/60 border border-border flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <p className="label-mono text-[0.6875rem] text-muted-foreground uppercase">
              Host Academic / Diagnostic Institution
            </p>
            <p className="font-display font-semibold text-foreground text-sm mt-0.5">
              {activeStation.institution}
            </p>
            <p className="text-xs text-muted-foreground">{activeStation.department}</p>
          </div>

          <div className="md:text-right border-t md:border-t-0 pt-2 md:pt-0 border-border/60">
            <p className="label-mono text-[0.6875rem] text-muted-foreground uppercase">
              Formal Role / Degree
            </p>
            <p className="font-display font-semibold text-foreground text-sm mt-0.5 text-blue">
              {activeStation.appointment}
            </p>
            <p className="text-xs text-muted-foreground">{activeStation.duration}</p>
          </div>
        </div>

        {/* Deep Scientific Narrative & Methodologies Breakdown */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Narrative Column */}
          <div className="lg:col-span-7 space-y-4">
            <h4 className="label-mono text-xs text-muted-foreground flex items-center gap-2">
              <Microscope className="size-4 text-blue" />
              <span>Scientific Investigation & Clinical Discoveries</span>
            </h4>

            <div className="space-y-3.5 text-[0.9375rem] leading-relaxed text-foreground/90">
              {activeStation.scientificNarrative.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>
          </div>

          {/* Side Column: Methodologies & Tangible Milestones */}
          <div className="lg:col-span-5 space-y-6 lg:border-l lg:border-border lg:pl-8">
            {/* Validated Methodologies */}
            <div>
              <h4 className="label-mono text-xs text-muted-foreground flex items-center gap-2 mb-3">
                <Flask className="size-4 text-emerald-600" />
                <span>Laboratory Methodologies Deployed</span>
              </h4>
              <ul className="space-y-2">
                {activeStation.methodologies.map((m) => (
                  <li
                    key={m}
                    className="text-xs flex items-start gap-2 text-foreground/85 leading-snug bg-mist/40 p-2 rounded-[3px] border border-border/50"
                  >
                    <span className="size-1.5 rounded-full bg-blue shrink-0 mt-1" />
                    <span>{m}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tangible Scholarly Artifacts */}
            <div>
              <h4 className="label-mono text-xs text-muted-foreground flex items-center gap-2 mb-3">
                <Certificate className="size-4 text-violet-600" />
                <span>Key Milestones & Clinical Artifacts</span>
              </h4>
              <ul className="space-y-2">
                {activeStation.artifacts.map((a) => (
                  <li
                    key={a}
                    className="text-xs flex items-start gap-2 text-foreground/85 leading-snug"
                  >
                    <span className="size-1.5 rounded-full bg-emerald-500 shrink-0 mt-1" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
