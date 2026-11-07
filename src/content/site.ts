// Single source of truth for AKAHELIX site copy and records.
// Sources: AKAHELIX Website Copy, Lab Setup Capability Portfolio (3 Nov 2026),
// Genetic Blueprint cover + About the Author, Teaching Portfolio (public facts only).

export const company = {
  name: "AKAHELIX",
  legal: "AKAHELIX INC.",
  city: "Port Chester, New York",
  email: "azadak71@proton.me",
  founder: "Dr. Abul Kalam Azad",
  founderCreds: "MD, MSc, PhD",
  coOwner1: "Abu Sufian",
  coOwner1Creds: "MS, MB(ASCPi)",
  coOwner: "Dr. Rauful Alam",
  coOwnerCreds: "PhD",
  coOwner2: "Dr. Mohammad Badrul Anam",
  coOwner2Creds: "PhD",
  coOwner3: "Dr. Md. Abedul Haque",
  coOwner3Creds: "PhD, MB(ASCP)ᶜᵐ",
  coOwner4: "Dr. Mohammad Belayat Hossain",
  coOwner4Creds: "PhD",
  coOwner5: "Ashish Kumar Mozumder",
  coOwner5Creds: "MS",
  coOwner6: "Dr. Tangir Ahamed",
  coOwner6Creds: "PhD",
  coOwner7: "Dr. Mohammad Arif",
  coOwner7Creds: "PhD, FACMG",
};

export const profiles = [
  {
    label: "Dr. Abul Kalam Azad · LinkedIn",
    href: "https://www.linkedin.com/in/abul-kalam-azad-75496362/",
  },
  {
    label: "Abu Sufian · LinkedIn",
    href: "https://www.linkedin.com/in/abu-sufian-ms-mb-ascpi-769b1a96/",
  },
  {
    label: "Dr. Rauful Alam · LinkedIn",
    href: "https://www.linkedin.com/in/rauful-alam-phd-12536365/",
  },
  {
    label: "Dr. Mohammad Badrul Anam · LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-badrul-anam-14340b41/",
  },
  {
    label: "Dr. Md. Abedul Haque · LinkedIn",
    href: "https://www.linkedin.com/in/md-abedul-haque-ph-d-mb-ascp-96baa2199/",
  },
  {
    label: "Dr. Mohammad Belayat Hossain · LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-belayat-hossain-ph-d-b3b0aa82/",
  },
  {
    label: "Ashish Kumar Mozumder · LinkedIn",
    href: "https://www.linkedin.com/in/ashish-mozumder-47a5b2186/",
  },
  {
    label: "Dr. Tangir Ahamed · LinkedIn",
    href: "https://www.linkedin.com/in/tangir-ahamed-bb26b259/",
  },
  {
    label: "Dr. Mohammad Arif · LinkedIn",
    href: "https://www.linkedin.com/in/mohammad-arif-arif-phd-facmg-7019a436/",
  },
  {
    label: "PubMed bibliography",
    href: "https://www.ncbi.nlm.nih.gov/myncbi/abul%20kalam.azad.1/bibliography/public/",
  },
  { label: "ORCID", href: "https://orcid.org/0000-0002-9236-9598" },
  { label: "Einstein faculty", href: "https://einsteinmed.edu/faculty/16957/abul-k-azad" },
];

export const nav = [
  { to: "/services", label: "Services" },
  { to: "/approach", label: "Approach" },
  { to: "/track-record", label: "Track record" },
  { to: "/founder", label: "Leadership" },
  { to: "/book", label: "Book" },
] as const;

export const proof = [
  { value: 14, suffix: "", label: "lab-developed tests taken through New York State review" },
  {
    value: 3,
    suffix: "",
    label: "NYS director qualifications: cytogenetics, genetic testing, oncology",
  },
  { value: 2020, suffix: "", prefix: "Since ", label: "CAP laboratory inspector", noCount: true },
  { value: 67, suffix: "%", label: "lower annual testing cost in our SMA in-house case" },
  { value: 35, suffix: "", label: "peer-reviewed publications, incl. CLSI NBS13" },
];

export const audiences = [
  "Hospitals and health systems bringing costly send-out tests in-house",
  "New reference and specialty labs seeking CLIA, CAP and New York State permits",
  "Labs outside the US building to CAP or ISO 15189 standard",
  "Established labs adding a test, a platform or a new permit category",
];

export const pillars = [
  {
    n: "01",
    title: "Laboratory set-up",
    body: "High-complexity molecular genetics, cytogenetics and oncology tumour-marker laboratories, planned from floor plan to first patient sample and built to pass CAP and NYSDOH review.",
    to: "/services" as const,
    cta: "See the services",
  },
  {
    n: "02",
    title: "Test and protocol validation",
    body: "Validation plans, summary reports and complete New York State LDT submission packages, written by someone who has taken fourteen of them through Wadsworth.",
    to: "/track-record" as const,
    cta: "See the record",
  },
  {
    n: "03",
    title: "Education and publications",
    body: "Genetic Blueprint: Bench to Bed, an integrated review of medical laboratory genetics written to the ABMGG blueprints. First edition, 2026.",
    to: "/book" as const,
    cta: "About the book",
  },
];

export const servicesShort = [
  {
    title: "Bring send-outs in-house",
    body: "We compare what you pay a reference lab with what the same test would cost you to run, and show when in-house testing pays for itself.",
  },
  {
    title: "Laboratory design and set-up",
    body: "Floor plan with clean pre- and post-PCR flow, instruments, LIS and a realistic budget, sized to your test menu and volume.",
  },
  {
    title: "Licensing and accreditation",
    body: "One clear route through CLIA, New York State (CLEP), CAP and, for labs abroad, ISO 15189.",
  },
  {
    title: "Assay validation and LDTs",
    body: "Validation plans and reports that stand up to review, and complete New York State LDT submission packages.",
  },
  {
    title: "Quality and inspection readiness",
    body: "SOPs, QC, proficiency testing and competency, then a mock CAP inspection run by a working CAP inspector.",
  },
  {
    title: "Reporting and staff training",
    body: "Report templates, ACMG/ClinGen variant classification, ISCN cytogenetic nomenclature, and bench-ready staff.",
  },
];

// Home page service cards: same six services as servicesShort, with a label,
// tags and the explanatory visual each card shows.
export const homeServices = [
  {
    slug: "bring-send-outs-in-house",
    label: "Cost model",
    title: "Bring send-outs in-house",
    body: servicesShort[0]!.body,
    tags: ["Volumes", "Invoices", "Break-even"],
    visual: "cost" as const,
  },
  {
    slug: "feasibility-and-laboratory-design",
    label: "Floor plan",
    title: "Laboratory design and set-up",
    body: servicesShort[1]!.body,
    tags: ["Pre-PCR", "Post-PCR", "LIS", "Budget"],
    visual: "flow" as const,
  },
  {
    slug: "licensing-and-regulatory-pathway",
    label: "Permits",
    title: "Licensing and accreditation",
    body: servicesShort[2]!.body,
    tags: ["CLIA", "NYS CLEP", "CAP", "ISO 15189"],
    visual: "route" as const,
  },
  {
    slug: "assay-validation-and-verification",
    label: "Validation",
    title: "Assay validation and LDTs",
    body: servicesShort[3]!.body,
    tags: ["LDT", "Verification", "NYSDOH"],
    visual: "report" as const,
  },
  {
    slug: "quality-management-system",
    label: "Quality",
    title: "Quality and inspection readiness",
    body: servicesShort[4]!.body,
    tags: ["SOPs", "QC", "PT", "Mock CAP"],
    visual: "binders" as const,
  },
  {
    slug: "interpretation-and-reporting",
    label: "Sign-out",
    title: "Reporting and staff training",
    body: servicesShort[5]!.body,
    tags: ["ACMG/AMP", "ClinGen", "ISCN"],
    visual: "spread" as const,
  },
];

export const smaCase = {
  intro:
    "A large New York academic health system was sending every spinal muscular atrophy (SMA) carrier screen to a national reference laboratory. Our founder led the team that built and validated an in-house replacement.",
  method:
    "The same build-versus-buy method applies to any high-volume send-out test. We start from your volumes and invoices, and show the numbers before you commit.",
  points: [
    "67% lower annual cost for SMA testing",
    "About one-third of the reference-lab price per sample",
    "Pays its own way at Medicare rates at current volume, before counting the savings",
    "Adds silent-carrier (2+0) detection, on two assays approved through New York State review",
  ],
  ldts: "61639 · 67140 · 102892 · 102893",
};

export interface ServiceDetail {
  slug: string;
  number: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  receives: string;
  anchor: string;
  timeline: string;
  leadSpecialists: string;
  deliverables: Array<{
    title: string;
    description: string;
  }>;
  regulatoryFramework: Array<{
    code: string;
    description: string;
  }>;
  methodologySteps: Array<{
    phase: string;
    title: string;
    description: string;
  }>;
  caseHighlight: {
    heading: string;
    text: string;
    metrics?: string[];
  };
}

export const detailedServices: ServiceDetail[] = [
  {
    slug: "bring-send-outs-in-house",
    number: "01",
    title: "Bring send-outs in-house",
    shortTitle: "Send-out feasibility & build-vs-buy modeling",
    tagline: "Forensic invoice audits, micro-cost modeling, and volume break-even analysis.",
    summary:
      "Reference lab fees consume critical operating margins on high-volume molecular, oncologic, and cytogenetic tests. We audit your last 12 months of send-out invoices, calculate realistic internal cost-per-test figures (including reagents, controls, calibrators, plastics, and hands-on technologist time), and establish the exact volume threshold where in-house testing pays for itself.",
    receives:
      "12-month invoice audit, CPT fee crosswalk, per-sample micro-costing, instrument capital vs. reagent rental analysis, and an executive decision brief for hospital leadership.",
    anchor: "CLIA '88 · 42 CFR 493 · CAP Economics & Resource Planning · Medicare PAMA",
    timeline: "2–4 weeks",
    leadSpecialists: "Dr. A.K. Azad & Senior Advisory Team",
    deliverables: [
      {
        title: "Forensic Send-Out Invoice & CPT Audit",
        description:
          "Reconciling 12 months of external reference laboratory invoices against internal billing manifests to isolate true annual spend by test type.",
      },
      {
        title: "Direct Cost-Per-Test Micro-Model",
        description:
          "Itemized direct cost modeling covering extraction kits, primers/probes, NGS sequencing flow cells, calibrators, daily QC controls, and technologist minutes per specimen.",
      },
      {
        title: "CapEx vs. Reagent Rental Evaluation",
        description:
          "Side-by-side comparison of upfront instrument capital expenditure versus reagent rental commitments, factoring in service contracts, validation reagents, and depreciation.",
      },
      {
        title: "Volume Sensitivity & Break-Even Curves",
        description:
          "Dynamic financial sensitivity curves mapping break-even points across variable test volumes, turnaround time impact, and payer reimbursement scenarios.",
      },
      {
        title: "Executive Board Decision Dossier",
        description:
          "Clear, publication-grade executive presentation for hospital leadership and C-suite finance detailing payback timelines, net margin projections, and clinical risk assessments.",
      },
    ],
    regulatoryFramework: [
      {
        code: "42 CFR 493 (CLIA)",
        description:
          "High-complexity test classification requirements and operational feasibility standards.",
      },
      {
        code: "Medicare PAMA Fee Schedule",
        description:
          "Reimbursement rate benchmarking against current national clinical laboratory fee schedules.",
      },
      {
        code: "CAP Resource Allocation",
        description:
          "Staffing ratios, supervisory requirements, and technical personnel time allocations.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Data Intake & Invoice Reconcilement",
        description:
          "We collect 12 months of send-out invoices, CPT billing reports, and specimen accession logs, classifying tests by complexity and volume tier.",
      },
      {
        phase: "Phase 2",
        title: "Micro-Costing & Platform Benchmarking",
        description:
          "We build detailed cost-per-test projections for target assays, comparing open platforms versus closed systems and calculating reagent efficiency.",
      },
      {
        phase: "Phase 3",
        title: "Sensitivity Analysis & Space Audit",
        description:
          "We evaluate physical laboratory capacity, technologist availability, and variable volume thresholds to establish realistic payback horizons.",
      },
      {
        phase: "Phase 4",
        title: "Strategic Decision Brief & Roadmapping",
        description:
          "We deliver the finalized financial model and executive deck, outlining the recommended go/no-go decision and step-by-step implementation milestones.",
      },
    ],
    caseHighlight: {
      heading: "New York Academic Health System SMA Carrier Screening",
      text: "A prominent New York academic hospital was sending out all spinal muscular atrophy (SMA) carrier screening. Our founder led the team that designed, validated, and launched an in-house real-time qPCR replacement with silent-carrier (2+0) detection.",
      metrics: [
        "67% reduction in total annual testing expense",
        "Per-sample cost reduced to ~1/3 of reference lab rates",
        "Fully profitable at standard Medicare reimbursement",
        "Approved under NYSDOH LDT permits (61639 & 102892)",
      ],
    },
  },
  {
    slug: "feasibility-and-laboratory-design",
    number: "02",
    title: "Feasibility and laboratory design",
    shortTitle: "Architectural blueprint & unidirectional workflow",
    tagline: "Unidirectional pre/post-PCR flow, HVAC pressure zoning, and instrument sizing.",
    summary:
      "Aerosol amplicon contamination can permanently corrupt molecular diagnostic spaces before validation even begins. We design clinical molecular and cytogenetics facilities featuring physical containment barriers, dedicated positive/negative pressure cascades, clean electrical distribution, and ergonomic technologist benching sized for your volume.",
    receives:
      "Architectural CAD layouts, unidirectional pre- to post-PCR routing, cytogenetics harvest/imaging bays, HVAC differential pressure schedules, emergency power specs, and LIS data drop plans.",
    anchor: "CAP Molecular Pathology and Cytogenetics checklists; CLSI MM01-A3; CDC/NIH Biosafety",
    timeline: "4–8 weeks",
    leadSpecialists: "Dr. A.K. Azad, Dr. Mohammad Belayat Hossain & Tangir Ahamed",
    deliverables: [
      {
        title: "Unidirectional CAD Architectural Layouts",
        description:
          "Dimensioned CAD floor plans enforcing strict one-way material and personnel flow: Reagent Preparation → Specimen Extraction → Amplification Setup → Post-Amplification / Detection.",
      },
      {
        title: "Differential Airflow & HVAC Schedule",
        description:
          "Zoned positive-pressure reagent cleanrooms and negative-pressure template addition/amplification suites with dedicated air handling, air change rates (ACH), and HEPA filtration.",
      },
      {
        title: "Cytogenetics Suite Architecture",
        description:
          "Dedicated biological safety harvest bays, controlled-humidity drying chambers for metaphase chromosome spreading, and darkroom multi-station automated FISH imaging rooms.",
      },
      {
        title: "Electrical, Utility & Emergency Redundancy",
        description:
          "Load calculations specifying uninterruptible power supplies (UPS) and emergency generator-backed circuits for -80°C freezers, sequencers, and incubation arrays.",
      },
      {
        title: "Instrument Footprint & LIS Integration Plan",
        description:
          "Equipment sizing, bench clearance specifications, barcode scanner stations, and hardwired network drops for bidirectional LIS instrument interfacing.",
      },
    ],
    regulatoryFramework: [
      {
        code: "CAP MOL.11000",
        description:
          "Physical separation of pre-amplification and post-amplification laboratory areas.",
      },
      {
        code: "CLSI MM01-A3",
        description:
          "Molecular diagnostic methods for genetic diseases facility design requirements.",
      },
      {
        code: "NYS CLEP Physical Standards",
        description:
          "New York State sanitary code safety, chemical hygiene, and eyewash/emergency shower distances.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Space & Menu Throughput Audit",
        description:
          "We analyze available square footage, ceiling heights, existing HVAC capacity, and projected daily sample volumes to calculate square footage allocations.",
      },
      {
        phase: "Phase 2",
        title: "Zoning & Workflow Schematics",
        description:
          "We establish physical partitions, pass-through boxes, dedicated airlocks, and distinct gowning zones to prevent molecular cross-contamination.",
      },
      {
        phase: "Phase 3",
        title: "Architectural & MEP Engineering Coordination",
        description:
          "We collaborate directly with your facilities engineers and architects on mechanical, electrical, plumbing (MEP), and casework specifications.",
      },
      {
        phase: "Phase 4",
        title: "Commissioning & Pre-Inspection Punch List",
        description:
          "We perform on-site room-by-room commissioning, airflow smoke testing, sound/vibration checks, and regulatory sign-off readiness walkthroughs.",
      },
    ],
    caseHighlight: {
      heading: "Dual Cleanroom High-Throughput Genomics Suite",
      text: "Designed a 3,200 sq. ft. clinical genetics facility featuring separate pre-PCR cleanrooms with HEPA filtration, dedicated robotic liquid handling bays, and an isolated cytogenetics tissue culture room. Passed initial state physical inspection with zero citations.",
      metrics: [
        "Zero amplicon cross-contamination incidents across 4+ years",
        "Continuous +15 Pa positive pressure in reagent cleanroom",
        "Seamless expansion accommodating 3 additional NGS sequencers",
      ],
    },
  },
  {
    slug: "licensing-and-regulatory-pathway",
    number: "03",
    title: "Licensing and regulatory pathway",
    shortTitle: "CLIA, NYS CLEP & CAP accreditation",
    tagline:
      "High-complexity certificates, NYSDOH permit categories, and director qualification mapping.",
    summary:
      "New York State CLEP is recognized as the most rigorous clinical laboratory standard globally. We map your test menu to exact state permit categories, evaluate medical director and technical supervisor qualifications, compile federal CMS-116 applications, and guide your team across the accreditation finish line.",
    receives:
      "CLIA high-complexity filing dossier, NYS CLEP permit application with mapped categories, personnel qualification packages, CAP LAP pre-audit filing, and ISO 15189 international crosswalks.",
    anchor:
      "42 CFR 493 (CLIA '88); NYS Public Health Law Art. 5, Title V; Subpart 58-6 (Sep 2026); CAP LAP",
    timeline: "6–16 weeks (aligned with state review schedules)",
    leadSpecialists: "Dr. A.K. Azad & Dr. Mohammad Arif (PhD, FACMG)",
    deliverables: [
      {
        title: "CMS-116 CLIA High-Complexity Dossier",
        description:
          "Complete federal application package including test complexity crosswalk, specialty/subspecialty classifications, and projected annual test volume disclosures.",
      },
      {
        title: "New York State CLEP Permit Submission",
        description:
          "Comprehensive NYSDOH permit application mapped to specific categories: Genetic Testing – Molecular, Cytogenetics, Oncology – Molecular and Cellular, and Hematology.",
      },
      {
        title: "Director & Supervisory Credential Portfolios",
        description:
          "Auditing and formatting medical director certificates of qualification (C.Q.), ABMGG/FACMG certifications, doctoral transcripts, and clinical experience documentation.",
      },
      {
        title: "CAP LAP Accreditation Pre-Packet",
        description:
          "College of American Pathologists registration, test specialty profiling, activity list compilation, and pre-inspection master profile documentation.",
      },
      {
        title: "State & Federal Agency Liaison Management",
        description:
          "Direct representation, telephone conferences, and formal response drafting to agency deficiency inquiries and requests for additional information (RAI).",
      },
    ],
    regulatoryFramework: [
      {
        code: "42 CFR 493.1443",
        description:
          "Federal qualification standards for Laboratory Directors of high-complexity testing.",
      },
      {
        code: "NYS Subpart 58-6 (Sep 2026)",
        description:
          "Updated New York State clinical laboratory permit requirements and category thresholds.",
      },
      {
        code: "CAP LAP Standards for Accreditation",
        description:
          "Accreditation prerequisites, inspector checklists, and director responsibilities.",
      },
      {
        code: "ISO 15189:2022",
        description:
          "Requirements for quality and competence in international medical laboratories.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Regulatory Gap Analysis & Scope Alignment",
        description:
          "We cross-reference every planned test against CLIA high-complexity criteria and NYSDOH CLEP category definitions to identify required permits.",
      },
      {
        phase: "Phase 2",
        title: "Personnel Credential Verification",
        description:
          "We evaluate board qualifications (ABMGG, ABP, ABB) and state CQ credentials for director-of-record and technical supervisor positions.",
      },
      {
        phase: "Phase 3",
        title: "Dossier Compilation & Submission",
        description:
          "We assemble all application forms, fee vouchers, floor plans, quality manuals, and validation binders into structured regulatory packets.",
      },
      {
        phase: "Phase 4",
        title: "State Review Defense & Final Permit Issuance",
        description:
          "We shepherd the submission through agency review, coordinating formal responses to state feedback until certificates and permits are granted.",
      },
    ],
    caseHighlight: {
      heading: "Multi-Category New York State CLEP Approval",
      text: "Secured full NYSDOH CLEP permit categories for Genetic Testing – Molecular, Oncology – Molecular and Cellular, and Cytogenetics for a reference laboratory within 6 months of initial submission, navigating updated Subpart 58-6 compliance seamlessly.",
      metrics: [
        "100% first-pass approval on director qualification dossiers",
        "Zero administrative rejections across all state application filings",
        "Seamless transition from CMS CLIA Certificate of Waiver to High-Complexity",
      ],
    },
  },
  {
    slug: "assay-validation-and-verification",
    number: "04",
    title: "Assay validation and verification",
    shortTitle: "LDT validation packages & 6 CLIA analytical parameters",
    tagline:
      "Statistical validation protocols, NYSDOH LDT dossiers, and analytical performance reports.",
    summary:
      "Under 42 CFR 493.1253(b), all laboratory-developed tests (LDTs) and modified FDA-cleared assays require rigorous analytical validation before clinical reporting. We author statistical validation protocols, oversee wet-bench execution, analyze clinical concordance, and compile turnkey submission dossiers satisfying CLIA, CAP, and NYSDOH reviewers.",
    receives:
      "Master validation protocol and summary report covering all 6 CLIA parameters, verification protocols for unmodified kits, and turnkey NYSDOH LDT submission packages.",
    anchor:
      "42 CFR 493.1253(b); NYSDOH Genetic Testing – Molecular & Oncology checklists; CLSI EP series",
    timeline: "6–12 weeks",
    leadSpecialists: "Dr. A.K. Azad, Dr. M. Badrul Anam, Dr. Md. Abedul Haque & Dr. Mohammad Arif",
    deliverables: [
      {
        title: "6-Parameter Statistical Validation Protocol",
        description:
          "Experimental matrices testing Accuracy, Precision (repeatability & intermediate precision), Reportable Range, Analytical Sensitivity (LoD/LoQ), Analytical Specificity (interference & cross-reactivity), and Reference Intervals.",
      },
      {
        title: "NYSDOH CLEP LDT Submission Dossier",
        description:
          "Complete executive summary, detailed methodology, reagent formulation, raw run outputs, orthogonal confirmation data, and clinical utility justification.",
      },
      {
        title: "FDA-Cleared Assay Verification Protocols",
        description:
          "Streamlined verification protocols demonstrating manufacturer performance claims for unmodified IVD/FDA assays under 42 CFR 493.1253(a).",
      },
      {
        title: "Specimen Stability & Shipping Stress Validation",
        description:
          "Studies establishing acceptable temperature, transport time, freeze-thaw cycles, and collection tube stability (EDTA, Streck, PAXgene, FFPE).",
      },
      {
        title: "Orthogonal Concordance & Clinical Sensitivity Data",
        description:
          "Bland-Altman, Probit analysis, receiver operating characteristic (ROC) curves, and Cohen's Kappa concordance against established gold-standard reference assays.",
      },
    ],
    regulatoryFramework: [
      {
        code: "42 CFR 493.1253(b)",
        description:
          "Establishment of performance specifications for nonwaived, modified, and in-house developed tests.",
      },
      {
        code: "NYSDOH CLEP Validation Checklist",
        description:
          "Genetic Testing – Molecular, Oncology, and Somatic Hotspot assay submission criteria.",
      },
      {
        code: "CLSI EP05-A3 & EP17-A2",
        description:
          "Evaluation of precision performance and protocols for determination of limits of detection and quantitation.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Protocol Authoring & Sample Cohort Curation",
        description:
          "We establish sample size power calculations, procure characterized reference materials (Coriell, ATCC, clinical retains), and draft the master validation protocol.",
      },
      {
        phase: "Phase 2",
        title: "Wet-Bench Run Execution & Multi-Operator Testing",
        description:
          "We supervise analytical runs across multiple days, operators, reagent lots, and instrument channels to capture true intra- and inter-assay variability.",
      },
      {
        phase: "Phase 3",
        title: "Biostatistical Analysis & Discrepancy Resolution",
        description:
          "We calculate 95% confidence intervals, Probit LoD, analytical specificity matrices, and resolve any discordant results with orthogonal Sanger or digital PCR.",
      },
      {
        phase: "Phase 4",
        title: "Dossier Compilation & Regulatory Submission",
        description:
          "We assemble the full validation report binder, complete with raw chromatograms, run logs, and SOP references, ready for regulatory filing.",
      },
    ],
    caseHighlight: {
      heading: "14 Approved NYSDOH Laboratory-Developed Tests",
      text: "Our scientific leaders have successfully taken 14 complex LDTs through the New York State Department of Health review process across carrier screening, constitutional genetics, oncology NGS panels, and hematologic malignancies.",
      metrics: [
        "NYSDOH LDTs: 61639, 102892, 67140, 102893, 75119, 71879, 103269, 92280, 87881, 61500, 104118, 70280, 102890, 104445",
        "Zero experimental redesign requests from state reviewers",
        "Comprehensive coverage from single-gene qPCR to 500+ gene NGS panels",
      ],
    },
  },
  {
    slug: "quality-management-system",
    number: "05",
    title: "Quality management system",
    shortTitle: "Turnkey SOP library, statistical QC & CAPA",
    tagline:
      "Inspection-grade SOPs, Westgard multi-rules, proficiency testing, and CAPA workflows.",
    summary:
      "A clinical quality management system cannot simply exist on paper; it must operate smoothly under daily clinical pressures and withstand aggressive inspection scrutiny. We install complete, CLSI-formatted standard operating procedure (SOP) libraries, statistical quality control rules, Levey-Jennings tracking, and robust corrective action systems.",
    receives:
      "Customized SOP library in CLSI GP02-A5 format, Westgard QC rules, proficiency testing enrollment matrix, alternative performance assessment protocols, and CAPA tracking workflows.",
    anchor: "42 CFR 493.1256; 42 CFR 493.1236(c); CAP Laboratory General checklist; CLSI GP02-A5",
    timeline: "4–8 weeks",
    leadSpecialists: "Dr. A.K. Azad & Ashish K. Mozumder",
    deliverables: [
      {
        title: "Complete CLSI GP02-A5 SOP Library",
        description:
          "Turnkey SOP collection covering Pre-Analytical (accessioning, specimen rejection), Analytical (extraction, amplification, sequencing), and Post-Analytical (curation, sign-out) operations.",
      },
      {
        title: "Statistical QC & Westgard Multi-Rule System",
        description:
          "Custom Levey-Jennings control charts, standard deviation baseline calculations, and Westgard multi-rule violation protocols (1-2s, 1-3s, 2-2s, R-4s, 4-1s, 10x) for quantitative and qualitative assays.",
      },
      {
        title: "Proficiency Testing (PT) Management Plan",
        description:
          "Enrollment schedules for CAP, API, or UK NEQAS surveys, handling SOPs prohibiting PT communication/referral, and annual PT performance reviews.",
      },
      {
        title: "Alternative Performance Assessment (APA) Protocols",
        description:
          "Documented semi-annual alternative assessment protocols for orphan genetic tests or rare biomarkers where commercial PT surveys do not exist.",
      },
      {
        title: "CAPA & Non-Conformance Tracking Framework",
        description:
          "Formal Corrective and Preventive Action workflow with root-cause analysis (Ishikawa fishbone, 5 Whys), containment actions, and 90-day effectiveness checks.",
      },
      {
        title: "Lot-to-Lot Reagent Verification Protocols",
        description:
          "Parallel testing SOPs and acceptance criteria for comparing new reagent and calibrator lots against currently validated lots before clinical release.",
      },
    ],
    regulatoryFramework: [
      {
        code: "42 CFR 493.1256",
        description:
          "CLIA control procedures, positive/negative controls, and run acceptance criteria.",
      },
      {
        code: "42 CFR 493.1236(c)",
        description:
          "Alternative assessment requirements for analytes without commercial proficiency testing.",
      },
      {
        code: "CAP GEN.13000-20000",
        description:
          "College of American Pathologists quality management and document control standards.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Quality System Baseline Audit",
        description:
          "We examine current laboratory documentation, logs, and quality indicators against the latest CAP Laboratory General and specialty checklists.",
      },
      {
        phase: "Phase 2",
        title: "SOP Authoring & Bench Customization",
        description:
          "We draft and adapt SOPs to your exact equipment model numbers, reagent part numbers, LIS data fields, and personnel roles.",
      },
      {
        phase: "Phase 3",
        title: "QC Limits & PT Enrollment Setup",
        description:
          "We establish statistical mean and standard deviation limits for run controls, configure lot tracking logs, and enroll tests in appropriate survey programs.",
      },
      {
        phase: "Phase 4",
        title: "Document Control & Staff Rollout",
        description:
          "We implement formal version numbering, annual director sign-off matrices, and train all testing staff on non-conformance logging and CAPA escalation.",
      },
    ],
    caseHighlight: {
      heading: "Zero-Deficiency Quality Management Architecture",
      text: "Architected the complete QMS framework for newly licensed molecular laboratories, deploying over 90 customized SOPs and an electronic CAPA tracker. Labs achieved full CAP accreditation on their inaugural inspection without a single document-control citation.",
      metrics: [
        "90+ CLSI GP02-A5 standardized SOPs authored and approved",
        "100% compliance on semi-annual alternative performance assessments",
        "Average CAPA closure cycle time under 21 calendar days",
      ],
    },
  },
  {
    slug: "inspection-readiness",
    number: "06",
    title: "Inspection readiness",
    shortTitle: "Mock CAP inspections & deficiency remediation",
    tagline:
      "Unannounced dry run surveys by active CAP inspectors, tracer audits, and remediation packages.",
    summary:
      "Surprise regulatory inspections and accreditation surveys create immense organizational stress. As active CAP team inspectors, we walk your laboratory with the exact scrutiny, interview techniques, and checklist rigor that state and federal surveyors employ—surfacing Phase I and Phase II deficiencies and remediating them before official inspectors arrive.",
    receives:
      "Comprehensive on-site or simulated mock survey, itemized deficiency gap report, specimen tracer trails, personnel file audit, and rapid remediation response narratives.",
    anchor:
      "CAP LAP checklists (Team Leader, Laboratory General, Molecular, Cytogenetics); CMS State Operations Manual",
    timeline: "2–4 weeks",
    leadSpecialists: "Dr. A.K. Azad (Active CAP Inspector) & Senior Leadership",
    deliverables: [
      {
        title: "Full-Scale Mock CAP / State Survey",
        description:
          "End-to-end dry run inspection mirroring unannounced CAP or State DOH surveyor entrance conferences, bench observations, and summation conferences.",
      },
      {
        title: "Itemized Phase I & Phase II Deficiency Report",
        description:
          "Checklist-by-checklist citation report classifying findings into Phase I (recommendations) and Phase II (critical citations that risk accreditation loss).",
      },
      {
        title: "Specimen Tracer & Audit Trails",
        description:
          "Comprehensive tracer audits tracking randomly selected patient specimens from initial accessioning through reagent logs, raw data, QC sheets, and physician report delivery.",
      },
      {
        title: "Personnel File & Competency Audit",
        description:
          "Forensic review of staff credentials, diplomas, transcripts, state licenses, job descriptions, initial training documentation, and semi-annual/annual competency evaluations.",
      },
      {
        title: "Turnkey Deficiency Remediation Packages",
        description:
          "Pre-authored corrective action plans, policy adjustments, and evidence packets ready for immediate submission to accreditation bodies.",
      },
      {
        title: "Staff Interview Coaching",
        description:
          "Practical coaching for bench technologists, supervisors, and directors on answering inspector inquiries truthfully, precisely, and without volunteering out-of-scope information.",
      },
    ],
    regulatoryFramework: [
      {
        code: "CAP Team Leader Checklist (TL)",
        description:
          "Director oversight, delegation of authority, quality indicators, and physical facility safety.",
      },
      {
        code: "CMS SOM Appendix C",
        description:
          "State Operations Manual guidelines used by CMS and state health department inspectors.",
      },
      {
        code: "CAP Molecular Pathology (MOL)",
        description:
          "Specialty checklists for sequencing, PCR, extraction, and reporting integrity.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Pre-Inspection Discovery & Document Audit",
        description:
          "We review your QMS manuals, past PT survey results, reagent lot logs, equipment maintenance records, and personnel binders ahead of the survey.",
      },
      {
        phase: "Phase 2",
        title: "On-Site / Virtual Mock Survey Execution",
        description:
          "We conduct bench-level observations, interview testing staff, inspect storage temperature charts, and trace multiple clinical specimens through the system.",
      },
      {
        phase: "Phase 3",
        title: "Summation Conference & Executive Debrief",
        description:
          "We present an unfiltered debrief to laboratory leadership, highlighting critical risk areas, potential citations, and urgent remedial priorities.",
      },
      {
        phase: "Phase 4",
        title: "Remediation Package & Follow-Up Verification",
        description:
          "We write the corrective action documentation and verify that all identified gaps are resolved before the official inspection window opens.",
      },
    ],
    caseHighlight: {
      heading: "Pre-Survey Deficiency Discovery & Remediation",
      text: "Conducted an intensive mock CAP survey for a high-volume genetic testing center prior to their biennial inspection. Surfaced 12 hidden Phase II citations in reagent expiration tracking, pipettor calibration logs, and competency evaluations, remediating all items within 14 days and securing clean accreditation.",
      metrics: [
        "12 critical Phase II deficiencies resolved prior to official survey",
        "Zero repeat citations on official CAP inspection report",
        "100% staff interview confidence rating during live surveyor rounds",
      ],
    },
  },
  {
    slug: "interpretation-and-reporting",
    number: "07",
    title: "Interpretation and reporting",
    shortTitle: "ACMG/AMP variant curation & ISCN clinical reports",
    tagline:
      "ACMG 5-tier variant curation, ClinGen rules, ISCN nomenclature, and clinical report templates.",
    summary:
      "Generating molecular and cytogenetic data is only half the battle; providing clear, defensible, actionable clinical reports to ordering physicians is what protects patients and laboratory reputation. We build end-to-end variant curation workflows, ClinGen-based classification rules, and physician-friendly diagnostic report templates.",
    receives:
      "CLIA-compliant report templates, ACMG/AMP variant classification rubrics, ClinGen CNV scoring protocols, ISCN cytogenetic nomenclature templates, and secondary findings reporting policies.",
    anchor: "42 CFR 493.1291; ACMG/AMP 2015/2024; ClinGen; ISCN 2024 Cytogenetic Nomenclature",
    timeline: "3–6 weeks",
    leadSpecialists: "Dr. A.K. Azad, Dr. Mohammad Arif (PhD, FACMG) & Dr. Raful Alam",
    deliverables: [
      {
        title: "CLIA §493.1291 Compliant Report Templates",
        description:
          "Turnkey diagnostic report layouts including all mandatory regulatory elements: laboratory name/address, CLIA number, medical director, patient identifiers, accession dates, test methodology, limitations, and reference intervals.",
      },
      {
        title: "ACMG/AMP 5-Tier Sequence Variant Curation Protocol",
        description:
          "Standardized operating procedures for classifying variants into Pathogenic, Likely Pathogenic, VUS, Likely Benign, and Benign using population databases (gnomAD), disease databases (ClinVar), in-silico algorithms, and functional literature.",
      },
      {
        title: "ClinGen Gene-Disease & CNV Scoring Framework",
        description:
          "Systematic scoring rubrics for copy number variations (deletions and duplications) based on ACMG/ClinGen technical standards.",
      },
      {
        title: "ISCN 2024 Cytogenomic Nomenclature Standardization",
        description:
          "Standardized diagnostic string templates for karyotype, interphase/metaphase FISH, and chromosomal microarray (CMA) interpretations.",
      },
      {
        title: "ACMG SF v3.2 Secondary Findings Reporting Policy",
        description:
          "Institutional opt-in/opt-out policies and reporting algorithms for actionable secondary findings across the 81 medically actionable genes.",
      },
      {
        title: "LIS Automated Interpretation Boilerplate Rules",
        description:
          "Engineered interpretive paragraphs, variant-specific commentary, and genetic counseling recommendations pre-coded for LIS integration.",
      },
    ],
    regulatoryFramework: [
      {
        code: "42 CFR 493.1291",
        description:
          "CLIA mandatory elements for clinical test reports and amended report procedures.",
      },
      {
        code: "Richards et al. (ACMG/AMP)",
        description: "Standards and guidelines for the interpretation of sequence variants.",
      },
      {
        code: "Riggs et al. (ACMG/ClinGen)",
        description:
          "Technical standards for the interpretation and reporting of constitutional copy number variants.",
      },
      {
        code: "ISCN 2024",
        description: "International System for Human Cytogenomic Nomenclature standard formatting.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Report Architecture & Physician UX Design",
        description:
          "We structure clinical report layouts ensuring key findings, actionability, and clinical guidance are immediately readable on page 1 for ordering clinicians.",
      },
      {
        phase: "Phase 2",
        title: "Curation Workflow & Database Integration",
        description:
          "We establish standard operating procedures for querying population frequencies, computational predictors, published case reports, and internal allele frequencies.",
      },
      {
        phase: "Phase 3",
        title: "VUS Management & Reclassification Rules",
        description:
          "We establish clear institutional thresholds for variants of uncertain significance (VUS), family segregation protocols, and annual variant re-curation schedules.",
      },
      {
        phase: "Phase 4",
        title: "LIS Template Sign-Off & Director Shadowing",
        description:
          "We upload templates into your LIS, test automated field population, and mentor clinical directors on high-concordance sign-out workflows.",
      },
    ],
    caseHighlight: {
      heading: "Clinical Reporting for Over 20,000 Complex Cases",
      text: "Designed and overseen clinical reporting pipelines across comprehensive somatic oncology NGS panels, prenatal cytogenetics, and constitutional carrier screens, creating report templates praised by ordering oncologists and genetic counselors for clarity and rigor.",
      metrics: [
        "Over 20,000 clinical cases signed out using these curation frameworks",
        "Zero diagnostic report amendments resulting from nomenclature ambiguity",
        "100% adherence to ACMG/ClinGen variant interpretation criteria",
      ],
    },
  },
  {
    slug: "staff-training-and-handover",
    number: "08",
    title: "Staff training and handover",
    shortTitle: "Bench competency checklists & director sign-out mentorship",
    tagline:
      "Hands-on wet bench immersion, 6-point CLIA competency evaluations, and director mentoring.",
    summary:
      "Even the most sophisticated laboratory facility and assay validation are worthless without a competent, confident scientific team. We train your laboratory technologists on pipetting ergonomics, library preparation, and instrument operation, while mentoring your medical and technical directors on clinical sign-out and quality oversight.",
    receives:
      "6-point CLIA competency assessment checklists, bench technician training modules, director sign-out shadowing, training matrices, and post-launch operational support.",
    anchor:
      "CLIA Personnel Standards 42 CFR 493.1441–1489; CAP General Personnel Checklist GEN.50000",
    timeline: "4–8 weeks",
    leadSpecialists: "Dr. A.K. Azad & Full AKAHELIX Scientific Team",
    deliverables: [
      {
        title: "6-Point CLIA Competency Assessment Checklists",
        description:
          "Formal assessment modules satisfying all 6 federal criteria: direct observation, recording/reporting monitoring, review of test records, maintenance observation, blind sample testing, and problem-solving evaluation.",
      },
      {
        title: "Wet-Bench Immersion & Protocol Modules",
        description:
          "Hands-on training modules for DNA/RNA extraction, quality control metrics (Qubit, Bioanalyzer/TapeStation), qPCR master mixes, NGS library prep, and sequencer loading.",
      },
      {
        title: "Medical & Technical Director Mentorship",
        description:
          "Side-by-side sign-out training covering borderline QC runs, variant re-curation, difficult cytogenetic mosaicism interpretations, and regulatory incident handling.",
      },
      {
        title: "Master Training & Competency Matrix",
        description:
          "Institutional tracking dashboard recording initial orientation, 6-month first-year evaluations, and annual competency re-certifications across all personnel.",
      },
      {
        title: "Troubleshooting & Escalation Playbooks",
        description:
          "Actionable wet-lab troubleshooting guides covering cluster density issues, baseline drift, primer-dimer amplification, and reagent precipitate management.",
      },
      {
        title: "Post-Launch Operational Stabilization",
        description:
          "Scheduled weekly or bi-weekly technical check-ins and dedicated on-call advisory support following live clinical test launch.",
      },
    ],
    regulatoryFramework: [
      {
        code: "42 CFR 493.1451",
        description:
          "Technical supervisor responsibility for evaluating competency of testing personnel.",
      },
      {
        code: "42 CFR 493.1489",
        description:
          "Qualifications for testing personnel in high-complexity clinical laboratories.",
      },
      {
        code: "CAP GEN.55500",
        description:
          "Mandatory 6-element competency assessment protocol and annual re-evaluation standards.",
      },
    ],
    methodologySteps: [
      {
        phase: "Phase 1",
        title: "Personnel Baseline & Skills Assessment",
        description:
          "We evaluate existing bench technologist competencies, past experience, and educational background against target assay protocol requirements.",
      },
      {
        phase: "Phase 2",
        title: "Hands-On Bench Training & Mock Runs",
        description:
          "We execute parallel wet-lab runs side-by-side with your technicians, reinforcing pipetting technique, contamination prevention, and instrument maintenance.",
      },
      {
        phase: "Phase 3",
        title: "Formal 6-Element Competency Sign-Off",
        description:
          "We administer blind proficiency challenges, review intermediate worksheets, and document formal competency evaluations for every staff member's personnel file.",
      },
      {
        phase: "Phase 4",
        title: "Director Handover & Ongoing Advisory Support",
        description:
          "We transition daily analytical oversight to your team, providing structured escalation channels and periodic quality check-ins.",
      },
    ],
    caseHighlight: {
      heading: "Qualified Over 30 Technologists and Clinical Directors",
      text: "Our leaders have trained and qualified more than 30 laboratory technologists, bioinformaticians, and lab directors across hospital and reference settings, achieving 100% first-attempt competency audit compliance during state and CAP inspections.",
      metrics: [
        "100% personnel compliance on state and CAP competency audits",
        "Over 30 bench technologists and directors trained and qualified",
        "Zero testing personnel qualification citations across all partner labs",
      ],
    },
  },
];

export function getDetailedService(slug: string): ServiceDetail | undefined {
  return detailedServices.find((s) => s.slug === slug);
}

export function getAllDetailedServices(): ServiceDetail[] {
  return detailedServices;
}

export const serviceLines = [
  {
    slug: "bring-send-outs-in-house",
    title: "Bring send-outs in-house",
    receives:
      "12-month invoice audit; CPT fee crosswalk; direct per-sample micro-costing; instrument capital vs. reagent rental analysis; executive decision brief for hospital leadership.",
    anchor: "CLIA '88 · 42 CFR 493 · CAP Economics & Resource Planning · Medicare PAMA",
  },
  {
    slug: "feasibility-and-laboratory-design",
    title: "Feasibility and laboratory design",
    receives:
      "Test menu and volume model; floor plan with one-way pre-PCR / post-PCR separation and a cytogenetics culture area; instrument, reagent and LIS shortlist; capital and running budget.",
    anchor: "CAP Molecular Pathology and Cytogenetics checklists; CLSI guidance",
  },
  {
    slug: "licensing-and-regulatory-pathway",
    title: "Licensing and regulatory pathway",
    receives:
      "CLIA high-complexity certificate plan; NYS CLEP permit categories mapped to the director and technical-director roles each one needs; CAP accreditation application; for non-US labs, CAP international or ISO 15189 route.",
    anchor: "42 CFR 493; NYS Subpart 58-6 (Sep 2026); CAP LAP",
  },
  {
    slug: "assay-validation-and-verification",
    title: "Assay validation and verification",
    receives:
      "Validation plans and summary reports for LDTs and modified FDA-cleared tests: accuracy, precision, reportable range, analytical sensitivity and specificity, reference intervals. Verification of unmodified kits. NYSDOH LDT submission packages.",
    anchor: "42 CFR 493.1253(b); NYSDOH Genetic Testing – Molecular checklist",
  },
  {
    slug: "quality-management-system",
    title: "Quality management system",
    receives:
      "SOP library, document control, QC rules, proficiency testing and an alternative-assessment plan for analytes with no PT, competency assessment, corrective action and quality indicators.",
    anchor: "42 CFR 493.1256, 493.1236(c); CAP Laboratory General checklist",
  },
  {
    slug: "inspection-readiness",
    title: "Inspection readiness",
    receives:
      "Mock CAP inspection run by a working CAP inspector against current checklists; a prioritised deficiency list; help drafting deficiency responses.",
    anchor: "CAP LAP checklists",
  },
  {
    slug: "interpretation-and-reporting",
    title: "Interpretation and reporting",
    receives:
      "Report templates with every required element; ACMG/AMP and ClinGen-based variant and CNV classification workflow; ISCN nomenclature for karyotype, FISH and microarray results.",
    anchor: "42 CFR 493.1291; ACMG/AMP; ClinGen; ISCN",
  },
  {
    slug: "staff-training-and-handover",
    title: "Staff training and handover",
    receives:
      "Training plan, bench-level competency checklists, sign-out training for the directors, and post-launch support for a period agreed in each engagement.",
    anchor: "CLIA personnel requirements, 42 CFR 493.1443–1489",
  },
];

export const testMenu = [
  {
    area: "Carrier and newborn screening",
    tests:
      "SMA carrier screening with silent-carrier (SMN1 2+0) detection; fragile X FMR1 CGG repeat sizing; SMA newborn screening design; limits of short-read NGS for SMA carrier status.",
    platforms: "Real-time qPCR copy number, TaqMan SNV genotyping, NGS",
    evidence: "NYSDOH LDTs 61639, 102892, 67140, 102893, 75119; Lab Med 2020; CLSI NBS13",
  },
  {
    area: "Constitutional cytogenetics",
    tests:
      "Prenatal and postnatal karyotype, interphase FISH, chromosomal microarray, mosaicism work-up.",
    platforms: "G-banding, FISH, CMA on cultured and uncultured cells",
    evidence: "Mol Cytogenet 2020; NYS qualification in Cytogenetics",
  },
  {
    area: "Solid tumour molecular",
    tests:
      "Solid tumour NGS panel; somatic hotspots (BRAF, EGFR, KRAS, NRAS); EGFR exon 20 insertions; MET exon 14 skipping; ALK fusions.",
    platforms: "NGS, RT-PCR",
    evidence: "Int J Surg Pathol 2025; J Mol Diagn 2021, 2024; NYSDOH LDTs 71879, 103269",
  },
  {
    area: "Haematologic malignancy",
    tests:
      "BCR-ABL1 p190 and p210 quantitation; FLT3-ITD including biallelic ITD; NPM1 quantification; CALR; myeloid neoplasm NGS panel.",
    platforms: "RT-qPCR (incl. GeneXpert), PCR with capillary electrophoresis, NGS",
    evidence:
      "J Mol Diagn 2022; Genet Med 2026; NYSDOH LDTs 92280, 87881, 61500, 104118, 70280, 102890",
  },
  {
    area: "Transplant monitoring",
    tests: "Post-transplant donor chimerism.",
    platforms: "NGS chimerism, STR",
    evidence: "NYSDOH LDT 104445; J Mol Diagn 2026; Hum Immunol 2026",
  },
  {
    area: "Germline variant interpretation",
    tests: "Hereditary cancer and rare-disease variant and gene–disease classification.",
    platforms: "Bioinformatic review against ClinGen / ACMG frameworks",
    evidence: "ClinGen expert panel service; LOVD biocurator for SCNN1A/B/G",
  },
];

export const standUp =
  "SMA carrier screening with silent-carrier detection · fragile X · karyotype, FISH and chromosomal microarray · solid-tumour and myeloid NGS panels · BCR-ABL1, FLT3, NPM1 and CALR · NGS transplant chimerism";

export const phases = [
  {
    n: "01",
    title: "Assess",
    short: "We size your test menu, volume and budget, and find the gaps.",
    gate: "Signed-off scope, volumes and budget",
  },
  {
    n: "02",
    title: "Design",
    short: "Floor plan, instruments, LIS, and your licensing route.",
    gate: "Approved layout, equipment list and regulatory route",
  },
  {
    n: "03",
    title: "Validate",
    short: "Instruments qualified, assays validated, LDT files written.",
    gate: "Validation reports and submission packages accepted",
  },
  {
    n: "04",
    title: "Prepare",
    short: "Quality system in place and a mock CAP inspection run, with every finding closed.",
    gate: "Mock inspection closed, every finding resolved",
  },
  {
    n: "05",
    title: "Launch",
    short: "Staff trained, first patient samples run, keys handed over.",
    gate: "First patient results released, handover signed",
  },
];

export const engagementModels = [
  {
    model: "Phase package",
    suited: "One new test, platform or permit category",
    basis: "Fixed fee per phase. Part at mobilisation, the balance at gate sign-off.",
  },
  {
    model: "Full build",
    suited: "A new laboratory",
    basis:
      "Fixed fee across all five phases, with pass-through costs and a contingency agreed in writing.",
  },
  {
    model: "Advisory retainer",
    suited: "Operating laboratories",
    basis: "Monthly retainer for QMS review, PT failures and new-assay advice.",
  },
];

export const boundaries = [
  {
    title: "No director of record.",
    body: "We do not serve as your CLIA or New York laboratory director. Since New York's September 2026 rule change that role needs its own Certificate of Qualification. We help you recruit and document qualified directors.",
  },
  {
    title: "Technical director roles by separate agreement only.",
    body: "New York caps a technical director at five laboratories and requires at least eight hours a week on site. Any such role is agreed case by case.",
  },
  {
    title: "No conflict with CAP inspection.",
    body: "Dr. Azad does not join a CAP inspection team for a laboratory AKAHELIX has advised.",
  },
  {
    title: "No outcome guarantee.",
    body: "Readiness work lowers the risk of deficiencies. The accreditor and the state decide the result.",
  },
  {
    title: "No employer material.",
    body: "No SOPs, validation data or confidential documents from any employer are reused. Every deliverable is written for you.",
  },
  {
    title: "Not legal advice.",
    body: "Regulatory analysis is technical guidance. Contracts and licensure filings should be reviewed by your counsel.",
  },
];

export type LdtStatus = "Approved" | "Conditionally approved";
export type LdtCategory = "Oncology" | "Genetic Testing – Molecular" | "Transplant Monitoring";

export const ldts: {
  project: string;
  test: string;
  method: string;
  category: LdtCategory;
  status: LdtStatus;
}[] = [
  {
    project: "104445",
    test: "Transplant donor chimerism assessment",
    method: "NGS",
    category: "Transplant Monitoring",
    status: "Approved",
  },
  {
    project: "104118",
    test: "NPM1 mutation detection and quantification",
    method: "RT-qPCR",
    category: "Oncology",
    status: "Approved",
  },
  {
    project: "103269",
    test: "Solid tumor NGS panel (FFPE)",
    method: "NGS",
    category: "Oncology",
    status: "Conditionally approved",
  },
  {
    project: "102893",
    test: "SMN1 c.*3+80T>G silent-carrier variant (modification)",
    method: "Real-time qPCR",
    category: "Genetic Testing – Molecular",
    status: "Approved",
  },
  {
    project: "102892",
    test: "SMN1 copy number assessment, SMA screening (modification)",
    method: "Real-time qPCR",
    category: "Genetic Testing – Molecular",
    status: "Approved",
  },
  {
    project: "102890",
    test: "Myeloid neoplasm panel",
    method: "NGS",
    category: "Oncology",
    status: "Approved",
  },
  {
    project: "92280",
    test: "BCR-ABL1 p190 quantitation",
    method: "RT-qPCR",
    category: "Oncology",
    status: "Approved",
  },
  {
    project: "87881",
    test: "BCR-ABL1 p210 quantitation (modification)",
    method: "RT-qPCR",
    category: "Oncology",
    status: "Approved",
  },
  {
    project: "75119",
    test: "Fragile X, FMR1 CGG repeat analysis (modification)",
    method: "PCR and capillary electrophoresis",
    category: "Genetic Testing – Molecular",
    status: "Approved",
  },
  {
    project: "71879",
    test: "Somatic hotspot variants: BRAF, EGFR indel and SNV, KRAS, NRAS (FFPE)",
    method: "NGS",
    category: "Oncology",
    status: "Approved",
  },
  {
    project: "70280",
    test: "CALR mutation detection",
    method: "PCR and capillary electrophoresis",
    category: "Oncology",
    status: "Approved",
  },
  {
    project: "67140",
    test: "SMN1 c.*3+80T>G silent-carrier variant",
    method: "TaqMan genotyping real-time qPCR",
    category: "Genetic Testing – Molecular",
    status: "Conditionally approved",
  },
  {
    project: "61639",
    test: "SMN1 copy number assessment (SMA screening)",
    method: "Real-time qPCR",
    category: "Genetic Testing – Molecular",
    status: "Approved",
  },
  {
    project: "61500",
    test: "FLT3-ITD detection",
    method: "PCR and capillary electrophoresis",
    category: "Oncology",
    status: "Approved",
  },
];

export const selectedWork = [
  {
    year: "2026",
    work: "Workgroup member, Cancer Genomics Consortium Geneticist Toolkit for clinical laboratory geneticists",
    type: "National resource",
  },
  {
    year: "2026",
    work: "NGS donor-chimerism validation: 270 samples, detection down to 0.1% recipient DNA, verified in a mainly African American and Hispanic population (J Mol Diagn)",
    type: "Assay validation",
  },
  {
    year: "2026",
    work: "Chimerism by NGS in a patient with a complex near-triploid karyotype (Hum Immunol)",
    type: "Molecular–cytogenetic correlation",
  },
  {
    year: "2026",
    work: "Biallelic FLT3-ITD in routine testing (Genet Med abstract, top-rated poster)",
    type: "Oncology molecular",
  },
  {
    year: "2025",
    work: "CLSI NBS13, Newborn Screening for Spinal Muscular Atrophy, 1st ed.",
    type: "Consensus standard",
  },
  {
    year: "2025",
    work: "DCTN1::ALK fusion found by NGS leads to ALK-inhibitor therapy (Int J Surg Pathol)",
    type: "Oncology molecular",
  },
  {
    year: "2024",
    work: "Short-read NGS can misjudge SMA carrier risk (J Mol Diagn abstract)",
    type: "Method limitation",
  },
  {
    year: "2022",
    work: "BCR-ABL1 p190 analytical validation on GeneXpert Dx (J Mol Diagn abstract)",
    type: "Assay validation",
  },
  {
    year: "2020–",
    work: "CAP Laboratory Accreditation Program inspection teams",
    type: "Accreditation",
  },
  {
    year: "2020",
    work: "SMA silent-carrier TaqMan assay: 198 specimens, 100% concordance in the pilot cohort, CV 1–4% (Lab Med)",
    type: "Assay development",
  },
  {
    year: "2020",
    work: "Prenatal mosaic monosomy 21 resolved by FISH, microarray and karyotype in ISCN 2016 (Mol Cytogenet)",
    type: "Cytogenetics",
  },
];

export const whyUs = [
  {
    title: "We know what inspectors look for, because we are one.",
    body: "Your lab is prepared by someone who inspects labs for CAP.",
  },
  {
    title: "Genetics is all we do.",
    body: "Molecular and cytogenetics only. Not a general lab consultancy learning on your project.",
  },
  {
    title: "Proven with regulators.",
    body: "Fourteen lab-developed tests taken through New York State's own review, which runs on top of federal CLIA rules.",
  },
  {
    title: "Honest scope.",
    body: "Your own directors hold the licences and sign results. We build, validate and advise, and we never inspect a lab we have advised.",
  },
];

export const faqs = [
  {
    q: "Will you act as our laboratory director?",
    a: "No. Your own qualified directors hold the licences and sign results. We help you recruit them and document their qualifications.",
  },
  {
    q: "Can you help with just one test?",
    a: "Yes. A single test or platform starts at the validation phase. You do not need the full build.",
  },
  {
    q: "Do you work outside the US?",
    a: "Yes. We help laboratories abroad build to CAP or ISO 15189 standard, including carrier and newborn screening programmes.",
  },
  {
    q: "How is the work priced?",
    a: "Fixed fees per phase, agreed in writing after a free scoping call. You approve each phase before the next one starts.",
  },
  {
    q: "Can you guarantee accreditation?",
    a: "No one honestly can. The accreditor and the state decide. We make sure you walk into the inspection ready.",
  },
];

export const credentials = [
  {
    k: "NYS Certificate of Qualification",
    v: "Technical director in Cytogenetics; Genetic Testing; Oncology – Molecular and Cellular Tumor Markers. Since 2020.",
  },
  { k: "CAP Laboratory Accreditation Program", v: "Inspection team member since 2020." },
  {
    k: "NYSDOH LDT submissions",
    v: "14 laboratory-developed tests: 12 approved, 2 conditionally approved.",
  },
  {
    k: "CLSI NBS13 (2025)",
    v: "Contributing author and committee member, Newborn Screening for SMA.",
  },
  {
    k: "Fellowship",
    v: "Laboratory Genetics and Genomics, ABMGG-accredited, Einstein / Montefiore, 2017–2020.",
  },
  {
    k: "ClinGen curation",
    v: "Sequence Variant Expert Panel, ITGA2B/ITGB3; Hereditary Cancer Gene Curation Expert Panel, AXIN2.",
  },
  {
    k: "Faculty",
    v: "Assistant Professor, Department of Pathology, Albert Einstein College of Medicine.",
  },
  { k: "Publications", v: "35 original papers in peer-reviewed journals." },
];

export const route = [
  { city: "Dhaka", years: "–1999", what: "MD (MBBS), Sir Salimullah Medical College" },
  {
    city: "Bangkok",
    years: "2002",
    what: "MSc Bioprocess Technology, Asian Institute of Technology",
  },
  {
    city: "Leuven",
    years: "2009",
    what: "PhD Human Genetics, KU Leuven — ENaC in cystic fibrosis and CF-like disease",
  },
  {
    city: "Toronto",
    years: "2009–2014",
    what: "CIHR postdoctoral fellow in cancer genetics, Princess Margaret Cancer Centre",
  },
  { city: "Houston", years: "2014–2017", what: "Research Scientist, MD Anderson Cancer Center" },
  {
    city: "New York",
    years: "2017–",
    what: "ABMGG fellowship, then Laboratory Director, Molecular Pathology, and Assistant Professor of Pathology",
  },
];

export const alamCredentials = [
  {
    k: "Doctoral Degree",
    v: "PhD in Organic Chemistry, Stockholm University, Sweden (2012–2016).",
  },
  {
    k: "Postdoctoral Fellowship",
    v: "University of Pennsylvania (UPenn), with Prof. Gary A. Molander (2016–2018).",
  },
  {
    k: "Industry Leadership",
    v: "Principal Scientist at PTC Therapeutics, New Jersey (Translational & Medicinal Discovery).",
  },
  {
    k: "Core Specialization",
    v: "RNA Splicing, Central Nervous System (CNS) Targets, Anti-inflammatory Targets.",
  },
  {
    k: "Methodological Scope",
    v: "Synthetic Organic Chemistry, Small-Molecule RNA Modulators, Medicinal Chemistry & Assay Optimization.",
  },
  {
    k: "Publications & Patents",
    v: "Author of high-impact research in leading ACS, JACS, and Wiley chemical biology journals.",
  },
];

export const alamRoute = [
  { city: "Chittagong", years: "–2008", what: "BSc & MSc in Chemistry, University of Chittagong" },
  {
    city: "Stockholm",
    years: "2012–2016",
    what: "PhD in Organic Chemistry, Stockholm University — Catalytic & stereoselective transformations",
  },
  {
    city: "Philadelphia",
    years: "2016–2018",
    what: "Postdoctoral Researcher, University of Pennsylvania (UPenn) — Photoredox & organoboron catalysis",
  },
  {
    city: "New Jersey",
    years: "2018–",
    what: "Principal Scientist, PTC Therapeutics — RNA splicing modulation & CNS therapeutics",
  },
];

export const anamCredentials = [
  { k: "Doctoral Degree", v: "PhD in Medical & Life Sciences, Kumamoto University, Japan." },
  {
    k: "Postdoctoral Fellowship",
    v: "SUNY Upstate Medical University, New York — Translational Neuroscience & Alzheimer's Models.",
  },
  {
    k: "Industry & Operations",
    v: "Over 10 years of pharmaceutical operations leadership, manufacturing setup & commercialization.",
  },
  {
    k: "Core Specialization",
    v: "Developmental Neurobiology, Cancer Cell Reprogramming, Stem Cell Technology & Translational CRO Operations.",
  },
  {
    k: "Diagnostic Leadership",
    v: "Former Laboratory Director and Project Lead at the Institute for Developing Science and Health Initiatives (ideSHi).",
  },
  {
    k: "Research Publications",
    v: "Author of peer-reviewed research in developmental biology, neurodegeneration, and biomedical mechanisms.",
  },
];

export const anamRoute = [
  {
    city: "Dhaka",
    years: "–2009",
    what: "BSc & MSc in Biochemistry & Molecular Biology, University of Dhaka",
  },
  {
    city: "Kumamoto",
    years: "2010–2014",
    what: "PhD in Medical Sciences, Kumamoto University — Developmental neurobiology & stem cell reprogramming",
  },
  {
    city: "Pharma & ideSHi",
    years: "2014–2021",
    what: "Pharmaceutical operations leadership, manufacturing scale-up, and diagnostic laboratory director at ideSHi",
  },
  {
    city: "New York",
    years: "2021–",
    what: "Postdoctoral Research Associate, SUNY Upstate Medical University — Translational neuroscience & neurodegenerative disease models",
  },
];

export const haqueCredentials = [
  {
    k: "Doctoral Degree & Certification",
    v: "PhD in Biological Sciences; Certified Technologist in Molecular Biology, MB(ASCP)ᶜᵐ.",
  },
  {
    k: "Clinical Pathology Leadership",
    v: "Montefiore Medical Center & Albert Einstein College of Medicine, New York — Molecular Pathology Diagnostics.",
  },
  {
    k: "Oncology Research Foundation",
    v: "UT MD Anderson Cancer Center, Houston — Department of Hematopathology; and Emory University.",
  },
  {
    k: "Core Specialization",
    v: "High-Throughput Molecular Genetics, Next-Generation Sequencing (NGS), Chimerism & Somatic Cancer Diagnostics.",
  },
  {
    k: "Diagnostic Scope",
    v: "10+ years in high-complexity molecular diagnostics, assay validation, quality systems & clinical laboratory workflows.",
  },
  {
    k: "Research Publications",
    v: "Author and co-investigator of high-impact research in genomic oncology, hematopathology, and molecular therapeutics.",
  },
];

export const haqueRoute = [
  {
    city: "Doctoral Training",
    years: "PhD",
    what: "Doctoral research in molecular biology, biochemistry, and cellular mechanisms",
  },
  {
    city: "Atlanta",
    years: "Emory",
    what: "Postdoctoral fellow in molecular pathology & signaling mechanisms, Emory University",
  },
  {
    city: "Houston",
    years: "MD Anderson",
    what: "Research Scientist, Department of Hematopathology, University of Texas MD Anderson Cancer Center",
  },
  {
    city: "New York",
    years: "Montefiore",
    what: "Molecular diagnostics scientist, Montefiore Medical Center & Albert Einstein College of Medicine",
  },
];

export const sufianCredentials = [
  {
    k: "Education & Board Certification",
    v: "BSc & MSc in Biochemistry & Molecular Biology (University of Dhaka); Certified Technologist in Molecular Biology, MB(ASCPi).",
  },
  {
    k: "Diagnostic Laboratory Leadership",
    v: "Junior Consultant at DNA Solution Ltd. — Designed, validated, and optimized high-throughput clinical molecular diagnostic assays.",
  },
  {
    k: "Forensic Genetics & Human ID",
    v: "Scientific Officer & DNA Analyst, National Forensic DNA Profiling Laboratory (NFDPL), Dhaka Medical College.",
  },
  {
    k: "Core Methodologies",
    v: "Quantitative PCR, Sanger Sequencing, Next-Generation Sequencing (NGS), STR Multiplexing & Pharmacogenomics (PGx).",
  },
  {
    k: "Diagnostic Specialization",
    v: "Thalassemia genetic screening, oncology molecular panels, human identification (HID), and quality assurance to ISO 15189.",
  },
  {
    k: "Research Contributions",
    v: "Author of peer-reviewed investigations in forensic DNA analysis, genetic variation, and diagnostic assay workflows.",
  },
];

export const sufianRoute = [
  {
    city: "Dhaka",
    years: "BSc & MSc",
    what: "Biochemistry and Molecular Biology, University of Dhaka — Molecular biology and diagnostic biochemistry foundation",
  },
  {
    city: "Forensic Lab",
    years: "NFDPL",
    what: "Scientific Officer and DNA Analyst, National Forensic DNA Profiling Laboratory at Dhaka Medical College",
  },
  {
    city: "Clinical Lab",
    years: "DNA Solution",
    what: "Junior Consultant, DNA Solution Ltd. — Molecular diagnostic assay design, PCR, sequencing, PGx, and thalassemia panels",
  },
  {
    city: "Global",
    years: "ASCP",
    what: "Board-certified Technologist in Molecular Biology (ASCPi) and Co-Owner of AKAHELIX",
  },
];

export const belayatCredentials = [
  {
    k: "Education & Cancer Biology",
    v: "PhD in Molecular Oncology & Cancer Biology; >15 years of leadership in cancer research, cell and gene therapy, and cancer epigenetics.",
  },
  {
    k: "Cell & Gene Therapy (CGT) Leadership",
    v: "Lentiviral Vector Analytical Development Team Lead at an established clinical-stage T cell therapy biotechnology company (Immatics).",
  },
  {
    k: "Translational Neuro-Oncology",
    v: "Postdoctoral Fellow & Instructor, Department of Neuro-Oncology & Viroimmunotherapy Laboratory, The University of Texas MD Anderson Cancer Center.",
  },
  {
    k: "Analytical & Vector Methodologies",
    v: "Lentiviral vector characterization, titer & potency assay development, ddPCR, quantitative RT-PCR, flow cytometry, and cGMP tech transfer.",
  },
  {
    k: "Mechanistic Oncology & Therapeutics",
    v: "TIE2 receptor tyrosine kinase signaling, tumor microenvironment, DNA damage response mechanisms, oncolytic virotherapy, and mouse disease models.",
  },
  {
    k: "Scholarly Record",
    v: "High-impact peer-reviewed publications in neuro-oncology, cancer immunology, and viroimmunotherapy, supported by national grants and scientific awards.",
  },
];

export const belayatRoute = [
  {
    city: "Doctoral Training",
    years: "PhD",
    what: "Doctoral research in cancer biology, molecular oncology, epigenetics, and cellular signaling",
  },
  {
    city: "Houston",
    years: "MD Anderson",
    what: "Postdoctoral Fellow & Instructor, Department of Neuro-Oncology & Viroimmunotherapy Laboratory, UT MD Anderson Cancer Center",
  },
  {
    city: "Biotech",
    years: "Immatics",
    what: "Lentiviral Vector Analytical Development Team Lead, clinical T cell receptor (TCR) therapy biotechnology",
  },
  {
    city: "Global",
    years: "AKAHELIX",
    what: "Co-Owner & Principal Scientist, cell and gene therapy vector analytics, molecular immunology, and oncology assays",
  },
];

export const mozumderCredentials = [
  {
    k: "Education & Academic Foundation",
    v: "BSc (Hons) & MSc in Biochemistry, University of Dhaka (1998, 1999); advanced foundation in biochemical genetics and analytical biochemistry.",
  },
  {
    k: "Forensic Genetics & DVI Leadership",
    v: "Senior Scientist & DNA Analyst, National Forensic DNA Profiling Laboratory (NFDPL), Dhaka Medical College; leading national disaster victim identification missions.",
  },
  {
    k: "Clinical Molecular Research",
    v: "Senior diagnostic collaborator and clinical molecular assay design specialist with DNA Solution Ltd.",
  },
  {
    k: "Core Methodologies",
    v: "Capillary Electrophoresis, Autosomal & Y-STR Multiplexing, Quantitative Fluorescence PCR (QF-PCR), Sanger Sequencing, and Thalassemia Screening.",
  },
  {
    k: "Population Genomics & Standards",
    v: "Development of national population genetic databases, allele frequency distributions, and laboratory quality management to ISO 15189.",
  },
  {
    k: "Scholarly Record",
    v: "Extensive peer-reviewed publications in forensic DNA profiling, population genetics, and molecular diagnostic methodologies.",
  },
];

export const mozumderRoute = [
  {
    city: "Dhaka",
    years: "BSc & MSc",
    what: "Biochemistry, University of Dhaka — Honors and Master's foundation in biochemical genetics and analytical biochemistry",
  },
  {
    city: "Forensic Lab",
    years: "NFDPL",
    what: "Senior Scientist and DNA Analyst, National Forensic DNA Profiling Laboratory, Dhaka Medical College",
  },
  {
    city: "Clinical Lab",
    years: "DNA Solution",
    what: "Senior molecular diagnostic researcher, population genetics, hemoglobinopathy detection, and QF-PCR",
  },
  {
    city: "Global",
    years: "AKAHELIX",
    what: "Co-Owner & Senior Forensic Geneticist, STR multiplexing, clinical validation, and laboratory quality assurance",
  },
];

export const ahamedCredentials = [
  {
    k: "Education & Bioprocess Engineering",
    v: "PhD in Biotechnology & Bioprocess Engineering, Delft University of Technology (TU Delft), Netherlands; specialized in rational downstream bioprocess synthesis.",
  },
  {
    k: "Biopharma & Cell Therapy MSAT",
    v: "Senior MSAT (Manufacturing Science & Technology) and CMC development leader across cell and gene therapy, viral vectors, and biologics (Bristol Myers Squibb).",
  },
  {
    k: "Quality-by-Design & Process Validation",
    v: "Quality-by-Design (QbD), process characterization, analytical comparability, and cGMP technology transfer for viral vectors and therapeutic proteins.",
  },
  {
    k: "Downstream & Vector Purification",
    v: "Expertise in downstream bioprocessing, chromatographic separation modeling, viral vector downstream purification, and protein phase behavior.",
  },
  {
    k: "Multimodal Biopharmaceutical Scope",
    v: "Experience spanning therapeutic proteins, viral gene therapy vectors, monoclonal antibodies, and antibody-drug conjugates.",
  },
  {
    k: "Scholarly Record",
    v: "Peer-reviewed publications in leading journals including the Journal of Chromatography A and Biophysical Journal on protein separation and bioprocess modeling.",
  },
];

export const ahamedRoute = [
  {
    city: "Delft",
    years: "PhD",
    what: "Biotechnology & Bioprocess Engineering, Delft University of Technology (TU Delft), Netherlands",
  },
  {
    city: "Biotech / Pharma",
    years: "MSAT & CMC",
    what: "Bioprocess industrialization, Quality-by-Design (QbD), and downstream purification process development",
  },
  {
    city: "Cell Therapy",
    years: "BMS",
    what: "Cell and gene therapy manufacturing science and viral vector process validation, Bristol Myers Squibb",
  },
  {
    city: "Global",
    years: "AKAHELIX",
    what: "Co-Owner & Principal Scientist, bioprocess CMC development, viral vector manufacturing science, and analytical validation",
  },
];

export const arifCredentials = [
  {
    k: "Board Certification & Fellowship",
    v: "Diplomate of the American Board of Medical Genetics and Genomics (ABMGG) in Clinical Molecular Genetics; Fellow of the American College of Medical Genetics and Genomics (FACMG).",
  },
  {
    k: "Clinical Molecular Pathology Leadership",
    v: "Director of Molecular Pathology, Northwell Health / North Shore University Hospital; Assistant Professor at Donald and Barbara Zucker School of Medicine at Hofstra/Northwell.",
  },
  {
    k: "Doctoral & Postdoctoral Training",
    v: "PhD in Molecular Biology of Disease from Yokohama City University, Japan; Postdoctoral Fellow in Cytogenetics & Molecular Genetics at Icahn School of Medicine at Mount Sinai, New York.",
  },
  {
    k: "Neurodevelopmental & Human Genetics",
    v: "Investigator at the New York State Institute for Basic Research in Developmental Disabilities (IBR), specializing in exome analysis, spinocerebellar ataxia, and rare pediatric genetic syndromes.",
  },
  {
    k: "Core Diagnostic Specialization",
    v: "High-complexity clinical next-generation sequencing (NGS), ACMG variant classification, report sign-out oversight, and regulatory validation to CAP and NYSDOH standards.",
  },
  {
    k: "Scholarly Record & Impact",
    v: "Extensive peer-reviewed publications in PNAS, Journal of Biological Chemistry, and Cold Spring Harbor Molecular Case Studies across neurogenetics and tauopathies.",
  },
];

export const arifRoute = [
  {
    city: "Yokohama",
    years: "PhD",
    what: "Doctoral research in molecular biology of disease, Yokohama City University School of Medicine, Japan",
  },
  {
    city: "New York",
    years: "Mount Sinai",
    what: "Clinical cytogenetics & molecular genetics postdoctoral fellow, Icahn School of Medicine at Mount Sinai",
  },
  {
    city: "Staten Island",
    years: "IBR",
    what: "Research Scientist in neurochemistry & human genetics, NYS Institute for Basic Research in Developmental Disabilities",
  },
  {
    city: "Manhasset",
    years: "Northwell",
    what: "Director of Molecular Pathology at Northwell Health / North Shore University Hospital and Assistant Professor at Zucker School of Medicine",
  },
  {
    city: "Global",
    years: "AKAHELIX",
    what: "Co-Owner & Clinical Molecular Geneticist, ABMGG diagnostic oversight, ACMG variant interpretation, and lab validation",
  },
];

export const teaching = [
  {
    title: "Teach the method before the answer.",
    body: "A trainee who understands how a signal is generated can recognise when it is artifact.",
  },
  {
    title: "Teach from failure.",
    body: "The discordant cases — a silent SMA carrier that short-read sequencing calls normal, a biallelic FLT3-ITD hidden in a routine result — teach diagnostic humility better than any correct case can.",
  },
  {
    title: "Teach the consequences.",
    body: "Every result has a clinician on the other end and a patient behind the clinician.",
  },
];

export const book = {
  title: "Genetic Blueprint",
  subtitle: "Bench to Bed",
  tagline: "An Integrated Review of Medical Laboratory Genetics",
  edition: "First Edition · 2026",
  isbn: "979-8-234-24155-9",
  publisher: "AKA HELIX INC.",
  boards: [
    {
      code: "ABMGG",
      name: "American Board of Medical Genetics and Genomics",
      detail: "9 areas",
      coverage: null as number | null,
    },
    {
      code: "CCMG",
      name: "Canadian College of Medical Geneticists",
      detail: "13 areas, unweighted",
      coverage: 96,
    },
    {
      code: "ASCP",
      name: "Technologist in molecular biology",
      detail: "6 areas, weighted",
      coverage: 94,
    },
    {
      code: "MGP",
      name: "ABPath · molecular genetic pathology",
      detail: "17 areas, unweighted",
      coverage: 85,
    },
    {
      code: "HCLD",
      name: "ABB · high-complexity lab director",
      detail: "molecular route, 2 of 9",
      coverage: 75,
    },
    {
      code: "GC",
      name: "ABGC · certified genetic counselor",
      detail: "14 areas, weighted",
      coverage: 69,
    },
    {
      code: "ABIM",
      name: "Hematology, medical oncology, internal medicine",
      detail: "9 areas, weighted",
      coverage: 64,
    },
  ],
  documents: [
    "Genome",
    "Population",
    "Methods",
    "Metabolic",
    "Single Gene",
    "Del/Dup",
    "ISCN",
    "Variant Naming",
    "Cancer",
    "Reproductive",
    "Management",
  ],
  exams: [
    { name: "General", detail: "100 questions · 2 blocks of 50 · 2.5 hours" },
    { name: "LGG", detail: "150 questions · 3 blocks of 50 · 3.5 hours" },
  ],
  provenance:
    "A fellow revising from a borrowed set of notes is entitled to know whether whoever wrote them has signed out the report, sat on the inspection team, argued the variant before an expert panel and paid for the reagents.",
};

// Help desk widget (bottom-right on every page).
export const assistant = {
  greeting: "Hello.",
  question: "How can we help with your laboratory?",
  suggestions: [
    "Can you help us bring a send-out test in-house?",
    "What does a New York State LDT submission involve?",
    "Can you help with just one test?",
    "Will you act as our laboratory director?",
  ],
  updates: [
    {
      tag: "Book",
      date: "2026",
      title: "Genetic Blueprint: Bench to Bed, first edition",
      body: "An integrated review of medical laboratory genetics, written to the ABMGG blueprints.",
      to: "/book" as const,
    },
    {
      tag: "Approval",
      date: "2026",
      title: "NGS transplant donor chimerism approved by NYSDOH",
      body: "LDT 104445. 270 validation samples, detection down to 0.1% recipient DNA.",
      to: "/track-record" as const,
    },
    {
      tag: "Standard",
      date: "2025",
      title: "CLSI NBS13 published",
      body: "Newborn Screening for Spinal Muscular Atrophy, first edition. Dr. Azad is a contributing author.",
      to: "/founder" as const,
    },
    {
      tag: "Resource",
      date: "2026",
      title: "Cancer Genomics Consortium Geneticist Toolkit",
      body: "Workgroup member for the national toolkit for clinical laboratory geneticists.",
      to: "/track-record" as const,
    },
  ],
};
