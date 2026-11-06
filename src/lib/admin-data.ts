// Persistent state management & seed data for the AKAHELIX Admin Console

export interface Inquiry {
  id: string;
  client: string;
  institutionType: "Hospital System" | "Academic Medical Center" | "Reference Laboratory" | "International Facility";
  contactPerson: string;
  email: string;
  phone: string;
  projectScope: string;
  testVolume: string;
  estimatedAnnualSavings: string;
  status: "New" | "Scoping Scheduled" | "Proposal Sent" | "Active Engagement" | "Completed" | "Archived";
  date: string;
  notes: string;
  targetAccreditation: string[];
}

export interface LabProject {
  id: string;
  name: string;
  client: string;
  phase: "01 Scope & Financial Model" | "02 Facility & Clean Flow Plan" | "03 Equipment Sourcing & LIS" | "04 Assay Validation & NYS Filing" | "05 Inspection Readiness & Go-Live";
  phaseNumber: number;
  progressPercent: number;
  targetAccreditation: ("CLIA" | "NYSDOH CLEP" | "CAP" | "ISO 15189")[];
  directorLead: string;
  targetLaunchDate: string;
  annualSampleVolume: number;
  budgetStatus: "On Track" | "Optimized" | "Pending Review";
  checklist: { item: string; done: boolean }[];
}

export interface AssayValidation {
  id: string;
  ldtId: string;
  testName: string;
  category: "Molecular Genetics" | "Cytogenetics" | "Oncology Tumour Markers";
  platform: string;
  clinicalIndication: string;
  approvalDate: string;
  nysdohStatus: "Approved & Certified" | "In Review" | "Validation Protocol in Progress";
  validationCohortSize: number;
  analyticalSensitivity: string;
  analyticalSpecificity: string;
  directorSignOff: string;
}

export interface AssistantLog {
  id: string;
  timestamp: string;
  topic: string;
  userPromptSummary: string;
  latencyMs: number;
  status: "Answered" | "Scoping Call Requested" | "Technical Inquiry";
}

const STORAGE_KEYS = {
  INQUIRIES: "akahelix_admin_inquiries_v1",
  PROJECTS: "akahelix_admin_projects_v1",
  VALIDATIONS: "akahelix_admin_validations_v1",
  SETTINGS: "akahelix_admin_settings_v1",
};

export const INITIAL_INQUIRIES: Inquiry[] = [
  {
    id: "INQ-2026-104",
    client: "Mount Sinai Health System",
    institutionType: "Hospital System",
    contactPerson: "Dr. Sarah Lin, Vice Chair of Pathology",
    email: "sarah.lin@mountsinai.org",
    phone: "+1 (212) 659-8500",
    projectScope: "In-housing high-volume SMA carrier screening qPCR and multiplex CFTR panels to cut external reference lab bills.",
    testVolume: "480 samples / month",
    estimatedAnnualSavings: "$320,000 / year",
    status: "Proposal Sent",
    date: "2026-11-04",
    notes: "Executive pathology committee reviewed our financial model showing 67% reduction in test cost.",
    targetAccreditation: ["CLIA", "NYSDOH CLEP"],
  },
  {
    id: "INQ-2026-103",
    client: "Helix Clinical Diagnostics (New Jersey)",
    institutionType: "Reference Laboratory",
    contactPerson: "Marcus Vance, VP Clinical Operations",
    email: "mvance@helixclinical.com",
    phone: "+1 (973) 441-2900",
    projectScope: "Complete New York State LDT submission package for 54-gene myeloid malignancy panel on Illumina NovaSeq.",
    testVolume: "220 samples / month",
    estimatedAnnualSavings: "Market entry permit",
    status: "Scoping Scheduled",
    date: "2026-11-05",
    notes: "Scoping call booked for Friday with Dr. Azad to review validation dataset and Wadsworth standards.",
    targetAccreditation: ["NYSDOH CLEP", "CAP"],
  },
  {
    id: "INQ-2026-102",
    client: "Montefiore Medical Center",
    institutionType: "Academic Medical Center",
    contactPerson: "Dr. Robert Keller, Clinical Laboratory Director",
    email: "rkeller@montefiore.org",
    phone: "+1 (718) 920-4321",
    projectScope: "Pre-inspection CAP mock audit across molecular and cytogenetics benches prior to biennial review.",
    testVolume: "Entire clinical menu",
    estimatedAnnualSavings: "Zero deficiency guarantee",
    status: "Active Engagement",
    date: "2026-10-28",
    notes: "Mock inspection checklists delivered; competency assessment SOPs standardized.",
    targetAccreditation: ["CAP", "CLIA"],
  },
  {
    id: "INQ-2026-101",
    client: "Genomika Diagnostic Centre (Dubai Healthcare City)",
    institutionType: "International Facility",
    contactPerson: "Dr. Tariq Al-Mansoor, Director of Genetics",
    email: "almansoor@genomika.ae",
    phone: "+971 4 362 4700",
    projectScope: "Complete turnkey design and build of a 3,400 sq ft molecular cytogenetics laboratory meeting CAP & ISO 15189.",
    testVolume: "1,200 samples / month (projected)",
    estimatedAnnualSavings: "Local diagnostic independence",
    status: "New",
    date: "2026-11-06",
    notes: "Requires unidirectional pre/post-PCR floor plan and Illumina NextSeq instrument procurement matrix.",
    targetAccreditation: ["CAP", "ISO 15189"],
  },
  {
    id: "INQ-2026-100",
    client: "Weill Cornell Medicine",
    institutionType: "Academic Medical Center",
    contactPerson: "Dr. Elena Rostova, Hematopathology",
    email: "erostova@med.cornell.edu",
    phone: "+1 (212) 746-5454",
    projectScope: "NGS transplant donor-chimerism assay validation with 0.1% recipient DNA sensitivity threshold.",
    testVolume: "180 samples / month",
    estimatedAnnualSavings: "$195,000 / year",
    status: "Active Engagement",
    date: "2026-10-15",
    notes: "Validation dataset verified across 270 samples in African American & Hispanic populations.",
    targetAccreditation: ["NYSDOH CLEP", "CAP"],
  },
];

export const INITIAL_PROJECTS: LabProject[] = [
  {
    id: "PRJ-01",
    name: "Mount Sinai Molecular In-Housing",
    client: "Mount Sinai Health System",
    phase: "03 Equipment Sourcing & LIS",
    phaseNumber: 3,
    progressPercent: 62,
    targetAccreditation: ["CLIA", "NYSDOH CLEP", "CAP"],
    directorLead: "Dr. Abul Kalam Azad, MD, PhD",
    targetLaunchDate: "March 2027",
    annualSampleVolume: 5800,
    budgetStatus: "On Track",
    checklist: [
      { item: "Send-out cost audit & business case approval", done: true },
      { item: "Unidirectional pre- and post-PCR floor plan sign-off", done: true },
      { item: "Applied Biosystems 7500 & QuantStudio procurement", done: true },
      { item: "Bidirectional LIS HL7 integration & barcode scanning", done: false },
      { item: "Validation cohort assembly & run protocols", done: false },
      { item: "NYSDOH CLEP submission dossier", done: false },
    ],
  },
  {
    id: "PRJ-02",
    name: "Genomika Dubai Molecular & Cytogenetics Turnkey",
    client: "Genomika Diagnostic Centre",
    phase: "02 Facility & Clean Flow Plan",
    phaseNumber: 2,
    progressPercent: 38,
    targetAccreditation: ["CAP", "ISO 15189"],
    directorLead: "Dr. Abul Kalam Azad, MD, PhD",
    targetLaunchDate: "August 2027",
    annualSampleVolume: 14400,
    budgetStatus: "Optimized",
    checklist: [
      { item: "Clinical test menu & volume forecast", done: true },
      { item: "Clean air cascade & positive/negative pressure zoning", done: true },
      { item: "G-banded karyotyping & FISH darkroom room layout", done: false },
      { item: "Sequencer specification: Illumina NextSeq 2000", done: false },
      { item: "ISO 15189 quality manual drafting", done: false },
    ],
  },
  {
    id: "PRJ-03",
    name: "Hudson Valley Regional LDT NYSDOH Package",
    client: "Hudson Valley Genetics Laboratory",
    phase: "04 Assay Validation & NYS Filing",
    phaseNumber: 4,
    progressPercent: 88,
    targetAccreditation: ["NYSDOH CLEP"],
    directorLead: "Dr. Abul Kalam Azad, MD, PhD",
    targetLaunchDate: "December 2026",
    annualSampleVolume: 3200,
    budgetStatus: "On Track",
    checklist: [
      { item: "Analytical sensitivity and specificity matrix (n=120)", done: true },
      { item: "Inter-run and intra-run precision statistics", done: true },
      { item: "Interfering substance robustness testing", done: true },
      { item: "Clinical concordance against Sanger sequencing gold standard", done: true },
      { item: "Final Wadsworth submission dossier dispatch", done: false },
    ],
  },
  {
    id: "PRJ-04",
    name: "Montefiore Biennial Inspection Mock Audit",
    client: "Montefiore Medical Center",
    phase: "05 Inspection Readiness & Go-Live",
    phaseNumber: 5,
    progressPercent: 95,
    targetAccreditation: ["CAP", "CLIA"],
    directorLead: "Dr. Abul Kalam Azad, MD, PhD",
    targetLaunchDate: "November 2026",
    annualSampleVolume: 8900,
    budgetStatus: "On Track",
    checklist: [
      { item: "Staff 6-month & annual competency files review", done: true },
      { item: "CAP proficiency testing (PT) survey logs & alt assessments", done: true },
      { item: "Reagent temperature & instrument calibration binders", done: true },
      { item: "Mock inspection walkthrough with CAP inspector checklist", done: true },
      { item: "Post-audit corrective action close-outs", done: false },
    ],
  },
];

export const INITIAL_VALIDATIONS: AssayValidation[] = [
  {
    id: "VAL-14",
    ldtId: "LDT 104445",
    testName: "NGS Transplant Donor Chimerism Assay",
    category: "Molecular Genetics",
    platform: "Illumina NextSeq / MiSeq (Targeted NGS)",
    clinicalIndication: "Bone marrow and hematopoietic stem-cell transplant monitoring",
    approvalDate: "2026",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 270,
    analyticalSensitivity: "0.10% recipient DNA",
    analyticalSpecificity: "99.94%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
  {
    id: "VAL-13",
    ldtId: "LDT 103210",
    testName: "Spinal Muscular Atrophy (SMA) SMN1/SMN2 qPCR",
    category: "Molecular Genetics",
    platform: "Applied Biosystems 7500 Real-Time PCR",
    clinicalIndication: "Population carrier screening for SMN1 exon 7 copy number deletion",
    approvalDate: "2025",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 320,
    analyticalSensitivity: "100% copy number concordance",
    analyticalSpecificity: "100%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
  {
    id: "VAL-12",
    ldtId: "LDT 102981",
    testName: "Myeloid Malignancy 54-Gene Comprehensive Panel",
    category: "Oncology Tumour Markers",
    platform: "Illumina NovaSeq 6000",
    clinicalIndication: "AML, MDS, and MPN diagnostic mutation profiling",
    approvalDate: "2025",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 185,
    analyticalSensitivity: "2.0% Variant Allele Frequency (VAF)",
    analyticalSpecificity: "99.85%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
  {
    id: "VAL-11",
    ldtId: "LDT 101844",
    testName: "High-Resolution Metaphase Cytogenetics",
    category: "Cytogenetics",
    platform: "Olympus BX61 automated karyotyping system",
    clinicalIndication: "Constitutional & hematologic structural chromosome aberrations",
    approvalDate: "2024",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 150,
    analyticalSensitivity: "550-band ISCN resolution",
    analyticalSpecificity: "100%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
  {
    id: "VAL-10",
    ldtId: "LDT 101532",
    testName: "BCR-ABL1 Dual-Color Dual-Fusion FISH",
    category: "Cytogenetics",
    platform: "Fluorescence In-Situ Hybridization",
    clinicalIndication: "t(9;22)(q34.1;q11.2) Philadelphia chromosome detection in CML/ALL",
    approvalDate: "2024",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 100,
    analyticalSensitivity: "0.5% nuclei detection",
    analyticalSpecificity: "99.7%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
  {
    id: "VAL-09",
    ldtId: "LDT 101120",
    testName: "Fragile X FMR1 CGG Repeat Primed PCR",
    category: "Molecular Genetics",
    platform: "ABI 3500xl Capillary Electrophoresis",
    clinicalIndication: "Premutation and full mutation triplet repeat expansion detection",
    approvalDate: "2023",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 95,
    analyticalSensitivity: "Detects >200 repeats without allele dropout",
    analyticalSpecificity: "100%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
  {
    id: "VAL-08",
    ldtId: "LDT 100891",
    testName: "Solid Tumour Comprehensive Genomic Profiling",
    category: "Oncology Tumour Markers",
    platform: "Illumina NextSeq 2000",
    clinicalIndication: "Somatic variants, TMB, MSI in non-small cell lung cancer & colorectal",
    approvalDate: "2023",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 140,
    analyticalSensitivity: "3% VAF at 500x mean depth",
    analyticalSpecificity: "99.9%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
  {
    id: "VAL-07",
    ldtId: "LDT 099432",
    testName: "Bone Marrow Karyotyping for MDS/AML",
    category: "Cytogenetics",
    platform: "Automated Metaphase Finding & G-Banding",
    clinicalIndication: "Monosomy 7, del(5q), trisomy 8, complex karyotypes",
    approvalDate: "2022",
    nysdohStatus: "Approved & Certified",
    validationCohortSize: 110,
    analyticalSensitivity: "Detects 2/20 abnormal metaphases",
    analyticalSpecificity: "100%",
    directorSignOff: "Dr. Abul Kalam Azad",
  },
];

export const INITIAL_ASSISTANT_LOGS: AssistantLog[] = [
  {
    id: "LOG-581",
    timestamp: "12 mins ago",
    topic: "NYSDOH CLEP LDT Submission",
    userPromptSummary: "Visitor asked about Wadsworth validation sample requirements for targeted NGS oncology panels.",
    latencyMs: 1140,
    status: "Answered",
  },
  {
    id: "LOG-580",
    timestamp: "44 mins ago",
    topic: "Send-out cost audit (SMA)",
    userPromptSummary: "Hospital lab manager inquired about capital equipment costs and ROI for bringing SMA screening in-house.",
    latencyMs: 1280,
    status: "Scoping Call Requested",
  },
  {
    id: "LOG-579",
    timestamp: "2 hours ago",
    topic: "Pre/Post-PCR Clean Air Zoning",
    userPromptSummary: "Inquiry on positive vs negative pressure requirements between reagent prep and template addition areas.",
    latencyMs: 980,
    status: "Answered",
  },
  {
    id: "LOG-578",
    timestamp: "4 hours ago",
    topic: "CAP Biennial Inspection Prep",
    userPromptSummary: "Asked how a mock CAP audit is conducted by Dr. Azad and what checklists are utilized.",
    latencyMs: 1350,
    status: "Scoping Call Requested",
  },
  {
    id: "LOG-577",
    timestamp: "Yesterday",
    topic: "Genetic Blueprint Book",
    userPromptSummary: "Inquired about institutional discounts for resident training copies of the First Edition (2026).",
    latencyMs: 890,
    status: "Technical Inquiry",
  },
];

export function getStoredInquiries(): Inquiry[] {
  if (typeof window === "undefined") return INITIAL_INQUIRIES;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
    if (!raw) return INITIAL_INQUIRIES;
    return JSON.parse(raw);
  } catch {
    return INITIAL_INQUIRIES;
  }
}

export function saveStoredInquiries(data: Inquiry[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist inquiries", err);
  }
}

export function getStoredProjects(): LabProject[] {
  if (typeof window === "undefined") return INITIAL_PROJECTS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.PROJECTS);
    if (!raw) return INITIAL_PROJECTS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_PROJECTS;
  }
}

export function saveStoredProjects(data: LabProject[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist projects", err);
  }
}

export function getStoredValidations(): AssayValidation[] {
  if (typeof window === "undefined") return INITIAL_VALIDATIONS;
  try {
    const raw = localStorage.getItem(STORAGE_KEYS.VALIDATIONS);
    if (!raw) return INITIAL_VALIDATIONS;
    return JSON.parse(raw);
  } catch {
    return INITIAL_VALIDATIONS;
  }
}

export function saveStoredValidations(data: AssayValidation[]): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(STORAGE_KEYS.VALIDATIONS, JSON.stringify(data));
  } catch (err) {
    console.error("Failed to persist validations", err);
  }
}
