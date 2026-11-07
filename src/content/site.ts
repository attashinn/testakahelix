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
  coOwner: "Dr. Rauful Alam",
  coOwnerCreds: "PhD",
  coOwner2: "Dr. Mohammad Badrul Anam",
  coOwner2Creds: "PhD",
};

export const profiles = [
  { label: "Dr. Abul Kalam Azad · LinkedIn", href: "https://www.linkedin.com/in/abul-kalam-azad-75496362/" },
  { label: "Dr. Rauful Alam · LinkedIn", href: "https://www.linkedin.com/in/rauful-alam-phd-12536365/" },
  { label: "Dr. Mohammad Badrul Anam · LinkedIn", href: "https://www.linkedin.com/in/mohammad-badrul-anam-14340b41/" },
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
  { value: 3, suffix: "", label: "NYS director qualifications: cytogenetics, genetic testing, oncology" },
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
    label: "Cost model",
    title: "Bring send-outs in-house",
    body: servicesShort[0]!.body,
    tags: ["Volumes", "Invoices", "Break-even"],
    visual: "cost" as const,
  },
  {
    label: "Floor plan",
    title: "Laboratory design and set-up",
    body: servicesShort[1]!.body,
    tags: ["Pre-PCR", "Post-PCR", "LIS", "Budget"],
    visual: "flow" as const,
  },
  {
    label: "Permits",
    title: "Licensing and accreditation",
    body: servicesShort[2]!.body,
    tags: ["CLIA", "NYS CLEP", "CAP", "ISO 15189"],
    visual: "route" as const,
  },
  {
    label: "Validation",
    title: "Assay validation and LDTs",
    body: servicesShort[3]!.body,
    tags: ["LDT", "Verification", "NYSDOH"],
    visual: "report" as const,
  },
  {
    label: "Quality",
    title: "Quality and inspection readiness",
    body: servicesShort[4]!.body,
    tags: ["SOPs", "QC", "PT", "Mock CAP"],
    visual: "binders" as const,
  },
  {
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

export const serviceLines = [
  {
    title: "Feasibility and laboratory design",
    receives:
      "Test menu and volume model; floor plan with one-way pre-PCR / post-PCR separation and a cytogenetics culture area; instrument, reagent and LIS shortlist; capital and running budget.",
    anchor: "CAP Molecular Pathology and Cytogenetics checklists; CLSI guidance",
  },
  {
    title: "Licensing and regulatory pathway",
    receives:
      "CLIA high-complexity certificate plan; NYS CLEP permit categories mapped to the director and technical-director roles each one needs; CAP accreditation application; for non-US labs, CAP international or ISO 15189 route.",
    anchor: "42 CFR 493; NYS Subpart 58-6 (Sep 2026); CAP LAP",
  },
  {
    title: "Assay validation and verification",
    receives:
      "Validation plans and summary reports for LDTs and modified FDA-cleared tests: accuracy, precision, reportable range, analytical sensitivity and specificity, reference intervals. Verification of unmodified kits. NYSDOH LDT submission packages.",
    anchor: "42 CFR 493.1253(b); NYSDOH Genetic Testing – Molecular checklist",
  },
  {
    title: "Quality management system",
    receives:
      "SOP library, document control, QC rules, proficiency testing and an alternative-assessment plan for analytes with no PT, competency assessment, corrective action and quality indicators.",
    anchor: "42 CFR 493.1256, 493.1236(c); CAP Laboratory General checklist",
  },
  {
    title: "Inspection readiness",
    receives:
      "Mock CAP inspection run by a working CAP inspector against current checklists; a prioritised deficiency list; help drafting deficiency responses.",
    anchor: "CAP LAP checklists",
  },
  {
    title: "Interpretation and reporting",
    receives:
      "Report templates with every required element; ACMG/AMP and ClinGen-based variant and CNV classification workflow; ISCN nomenclature for karyotype, FISH and microarray results.",
    anchor: "42 CFR 493.1291; ACMG/AMP; ClinGen; ISCN",
  },
  {
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
    tests: "Prenatal and postnatal karyotype, interphase FISH, chromosomal microarray, mosaicism work-up.",
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
    evidence: "J Mol Diagn 2022; Genet Med 2026; NYSDOH LDTs 92280, 87881, 61500, 104118, 70280, 102890",
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
    basis: "Fixed fee across all five phases, with pass-through costs and a contingency agreed in writing.",
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
  { project: "104445", test: "Transplant donor chimerism assessment", method: "NGS", category: "Transplant Monitoring", status: "Approved" },
  { project: "104118", test: "NPM1 mutation detection and quantification", method: "RT-qPCR", category: "Oncology", status: "Approved" },
  { project: "103269", test: "Solid tumor NGS panel (FFPE)", method: "NGS", category: "Oncology", status: "Conditionally approved" },
  { project: "102893", test: "SMN1 c.*3+80T>G silent-carrier variant (modification)", method: "Real-time qPCR", category: "Genetic Testing – Molecular", status: "Approved" },
  { project: "102892", test: "SMN1 copy number assessment, SMA screening (modification)", method: "Real-time qPCR", category: "Genetic Testing – Molecular", status: "Approved" },
  { project: "102890", test: "Myeloid neoplasm panel", method: "NGS", category: "Oncology", status: "Approved" },
  { project: "92280", test: "BCR-ABL1 p190 quantitation", method: "RT-qPCR", category: "Oncology", status: "Approved" },
  { project: "87881", test: "BCR-ABL1 p210 quantitation (modification)", method: "RT-qPCR", category: "Oncology", status: "Approved" },
  { project: "75119", test: "Fragile X, FMR1 CGG repeat analysis (modification)", method: "PCR and capillary electrophoresis", category: "Genetic Testing – Molecular", status: "Approved" },
  { project: "71879", test: "Somatic hotspot variants: BRAF, EGFR indel and SNV, KRAS, NRAS (FFPE)", method: "NGS", category: "Oncology", status: "Approved" },
  { project: "70280", test: "CALR mutation detection", method: "PCR and capillary electrophoresis", category: "Oncology", status: "Approved" },
  { project: "67140", test: "SMN1 c.*3+80T>G silent-carrier variant", method: "TaqMan genotyping real-time qPCR", category: "Genetic Testing – Molecular", status: "Conditionally approved" },
  { project: "61639", test: "SMN1 copy number assessment (SMA screening)", method: "Real-time qPCR", category: "Genetic Testing – Molecular", status: "Approved" },
  { project: "61500", test: "FLT3-ITD detection", method: "PCR and capillary electrophoresis", category: "Oncology", status: "Approved" },
];

export const selectedWork = [
  { year: "2026", work: "Workgroup member, Cancer Genomics Consortium Geneticist Toolkit for clinical laboratory geneticists", type: "National resource" },
  { year: "2026", work: "NGS donor-chimerism validation: 270 samples, detection down to 0.1% recipient DNA, verified in a mainly African American and Hispanic population (J Mol Diagn)", type: "Assay validation" },
  { year: "2026", work: "Chimerism by NGS in a patient with a complex near-triploid karyotype (Hum Immunol)", type: "Molecular–cytogenetic correlation" },
  { year: "2026", work: "Biallelic FLT3-ITD in routine testing (Genet Med abstract, top-rated poster)", type: "Oncology molecular" },
  { year: "2025", work: "CLSI NBS13, Newborn Screening for Spinal Muscular Atrophy, 1st ed.", type: "Consensus standard" },
  { year: "2025", work: "DCTN1::ALK fusion found by NGS leads to ALK-inhibitor therapy (Int J Surg Pathol)", type: "Oncology molecular" },
  { year: "2024", work: "Short-read NGS can misjudge SMA carrier risk (J Mol Diagn abstract)", type: "Method limitation" },
  { year: "2022", work: "BCR-ABL1 p190 analytical validation on GeneXpert Dx (J Mol Diagn abstract)", type: "Assay validation" },
  { year: "2020–", work: "CAP Laboratory Accreditation Program inspection teams", type: "Accreditation" },
  { year: "2020", work: "SMA silent-carrier TaqMan assay: 198 specimens, 100% concordance in the pilot cohort, CV 1–4% (Lab Med)", type: "Assay development" },
  { year: "2020", work: "Prenatal mosaic monosomy 21 resolved by FISH, microarray and karyotype in ISCN 2016 (Mol Cytogenet)", type: "Cytogenetics" },
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
  { k: "NYS Certificate of Qualification", v: "Technical director in Cytogenetics; Genetic Testing; Oncology – Molecular and Cellular Tumor Markers. Since 2020." },
  { k: "CAP Laboratory Accreditation Program", v: "Inspection team member since 2020." },
  { k: "NYSDOH LDT submissions", v: "14 laboratory-developed tests: 12 approved, 2 conditionally approved." },
  { k: "CLSI NBS13 (2025)", v: "Contributing author and committee member, Newborn Screening for SMA." },
  { k: "Fellowship", v: "Laboratory Genetics and Genomics, ABMGG-accredited, Einstein / Montefiore, 2017–2020." },
  { k: "ClinGen curation", v: "Sequence Variant Expert Panel, ITGA2B/ITGB3; Hereditary Cancer Gene Curation Expert Panel, AXIN2." },
  { k: "Faculty", v: "Assistant Professor, Department of Pathology, Albert Einstein College of Medicine." },
  { k: "Publications", v: "35 original papers in peer-reviewed journals." },
];

export const route = [
  { city: "Dhaka", years: "–1999", what: "MD (MBBS), Sir Salimullah Medical College" },
  { city: "Bangkok", years: "2002", what: "MSc Bioprocess Technology, Asian Institute of Technology" },
  { city: "Leuven", years: "2009", what: "PhD Human Genetics, KU Leuven — ENaC in cystic fibrosis and CF-like disease" },
  { city: "Toronto", years: "2009–2014", what: "CIHR postdoctoral fellow in cancer genetics, Princess Margaret Cancer Centre" },
  { city: "Houston", years: "2014–2017", what: "Research Scientist, MD Anderson Cancer Center" },
  { city: "New York", years: "2017–", what: "ABMGG fellowship, then Laboratory Director, Molecular Pathology, and Assistant Professor of Pathology" },
];

export const alamCredentials = [
  { k: "Doctoral Degree", v: "PhD in Organic Chemistry, Stockholm University, Sweden (2012–2016)." },
  { k: "Postdoctoral Fellowship", v: "University of Pennsylvania (UPenn), with Prof. Gary A. Molander (2016–2018)." },
  { k: "Industry Leadership", v: "Principal Scientist at PTC Therapeutics, New Jersey (Translational & Medicinal Discovery)." },
  { k: "Core Specialization", v: "RNA Splicing, Central Nervous System (CNS) Targets, Anti-inflammatory Targets." },
  { k: "Methodological Scope", v: "Synthetic Organic Chemistry, Small-Molecule RNA Modulators, Medicinal Chemistry & Assay Optimization." },
  { k: "Publications & Patents", v: "Author of high-impact research in leading ACS, JACS, and Wiley chemical biology journals." },
];

export const alamRoute = [
  { city: "Chittagong", years: "–2008", what: "BSc & MSc in Chemistry, University of Chittagong" },
  { city: "Stockholm", years: "2012–2016", what: "PhD in Organic Chemistry, Stockholm University — Catalytic & stereoselective transformations" },
  { city: "Philadelphia", years: "2016–2018", what: "Postdoctoral Researcher, University of Pennsylvania (UPenn) — Photoredox & organoboron catalysis" },
  { city: "New Jersey", years: "2018–", what: "Principal Scientist, PTC Therapeutics — RNA splicing modulation & CNS therapeutics" },
];

export const anamCredentials = [
  { k: "Doctoral Degree", v: "PhD in Medical & Life Sciences, Kumamoto University, Japan." },
  { k: "Postdoctoral Fellowship", v: "SUNY Upstate Medical University, New York — Translational Neuroscience & Alzheimer's Models." },
  { k: "Industry & Operations", v: "Over 10 years of pharmaceutical operations leadership, manufacturing setup & commercialization." },
  { k: "Core Specialization", v: "Developmental Neurobiology, Cancer Cell Reprogramming, Stem Cell Technology & Translational CRO Operations." },
  { k: "Diagnostic Leadership", v: "Former Laboratory Director and Project Lead at the Institute for Developing Science and Health Initiatives (ideSHi)." },
  { k: "Research Publications", v: "Author of peer-reviewed research in developmental biology, neurodegeneration, and biomedical mechanisms." },
];

export const anamRoute = [
  { city: "Dhaka", years: "–2009", what: "BSc & MSc in Biochemistry & Molecular Biology, University of Dhaka" },
  { city: "Kumamoto", years: "2010–2014", what: "PhD in Medical Sciences, Kumamoto University — Developmental neurobiology & stem cell reprogramming" },
  { city: "Pharma & ideSHi", years: "2014–2021", what: "Pharmaceutical operations leadership, manufacturing scale-up, and diagnostic laboratory director at ideSHi" },
  { city: "New York", years: "2021–", what: "Postdoctoral Research Associate, SUNY Upstate Medical University — Translational neuroscience & neurodegenerative disease models" },
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
    { code: "ABMGG", name: "American Board of Medical Genetics and Genomics", detail: "9 areas", coverage: null as number | null },
    { code: "CCMG", name: "Canadian College of Medical Geneticists", detail: "13 areas, unweighted", coverage: 96 },
    { code: "ASCP", name: "Technologist in molecular biology", detail: "6 areas, weighted", coverage: 94 },
    { code: "MGP", name: "ABPath · molecular genetic pathology", detail: "17 areas, unweighted", coverage: 85 },
    { code: "HCLD", name: "ABB · high-complexity lab director", detail: "molecular route, 2 of 9", coverage: 75 },
    { code: "GC", name: "ABGC · certified genetic counselor", detail: "14 areas, weighted", coverage: 69 },
    { code: "ABIM", name: "Hematology, medical oncology, internal medicine", detail: "9 areas, weighted", coverage: 64 },
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
    { tag: "Book", date: "2026", title: "Genetic Blueprint: Bench to Bed, first edition", body: "An integrated review of medical laboratory genetics, written to the ABMGG blueprints.", to: "/book" as const },
    { tag: "Approval", date: "2026", title: "NGS transplant donor chimerism approved by NYSDOH", body: "LDT 104445. 270 validation samples, detection down to 0.1% recipient DNA.", to: "/track-record" as const },
    { tag: "Standard", date: "2025", title: "CLSI NBS13 published", body: "Newborn Screening for Spinal Muscular Atrophy, first edition. Dr. Azad is a contributing author.", to: "/founder" as const },
    { tag: "Resource", date: "2026", title: "Cancer Genomics Consortium Geneticist Toolkit", body: "Workgroup member for the national toolkit for clinical laboratory geneticists.", to: "/track-record" as const },
  ],
};
