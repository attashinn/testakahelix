import {
  Check,
  CheckCircle,
  DownloadSimple,
  Flask,
  MagnifyingGlass,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { EASE } from "@/components/site/motion";
import { type AssayValidation } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

interface ValidationsManagerProps {
  validations: AssayValidation[];
  onAddValidation: (newVal: AssayValidation) => void;
  onDeleteValidation: (id: string) => void;
}

export function ValidationsManager({
  validations,
  onAddValidation,
  onDeleteValidation,
}: ValidationsManagerProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New validation form
  const [newLdtId, setNewLdtId] = useState("");
  const [newName, setNewName] = useState("");
  const [newCat, setNewCat] = useState<AssayValidation["category"]>("Molecular Genetics");
  const [newPlatform, setNewPlatform] = useState("");
  const [newIndication, setNewIndication] = useState("");
  const [newCohort, setNewCohort] = useState("120");
  const [newSensitivity, setNewSensitivity] = useState("99.9%");
  const [newSpecificity, setNewSpecificity] = useState("99.9%");

  const categories = ["All", "Molecular Genetics", "Cytogenetics", "Oncology Tumour Markers"];

  const filtered = validations.filter((v) => {
    const matchesCat = categoryFilter === "All" || v.category === categoryFilter;
    const term = searchTerm.toLowerCase();
    const matchesSearch =
      v.ldtId.toLowerCase().includes(term) ||
      v.testName.toLowerCase().includes(term) ||
      v.platform.toLowerCase().includes(term) ||
      v.clinicalIndication.toLowerCase().includes(term);
    return matchesCat && matchesSearch;
  });

  const handleCreateValidation = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPlatform.trim()) return;

    const newVal: AssayValidation = {
      id: `VAL-${validations.length + 1}`,
      ldtId: newLdtId.trim() || `LDT ${Math.floor(100000 + Math.random() * 90000)}`,
      testName: newName.trim(),
      category: newCat,
      platform: newPlatform.trim(),
      clinicalIndication: newIndication.trim() || "Clinical diagnostic testing",
      approvalDate: "2026",
      nysdohStatus: "Approved & Certified",
      validationCohortSize: parseInt(newCohort, 10) || 120,
      analyticalSensitivity: newSensitivity.trim(),
      analyticalSpecificity: newSpecificity.trim(),
      directorSignOff: "Dr. Abul Kalam Azad",
    };

    onAddValidation(newVal);
    setIsAddModalOpen(false);
    setNewLdtId("");
    setNewName("");
    setNewPlatform("");
    setNewIndication("");
  };

  const exportValidationSummary = () => {
    const headers = [
      "LDT ID",
      "Test Name",
      "Category",
      "Platform",
      "Indication",
      "Approval Year",
      "Status",
      "Validation Cohort (n)",
      "Analytical Sensitivity",
      "Analytical Specificity",
      "Director",
    ];
    const rows = filtered.map((v) => [
      v.ldtId,
      `"${v.testName.replace(/"/g, '""')}"`,
      v.category,
      `"${v.platform.replace(/"/g, '""')}"`,
      `"${v.clinicalIndication.replace(/"/g, '""')}"`,
      v.approvalDate,
      v.nysdohStatus,
      v.validationCohortSize,
      `"${v.analyticalSensitivity}"`,
      `"${v.analyticalSpecificity}"`,
      `"${v.directorSignOff}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `akahelix_ldt_validations_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border pb-6">
        <div>
          <span className="label-mono text-muted-foreground">Wadsworth Center Standards</span>
          <h1 className="mt-1 font-display text-2xl font-normal tracking-[-0.03em] text-foreground sm:text-3xl">
            New York State Validated LDTs
          </h1>
          <p className="mt-1 text-[0.875rem] text-muted-foreground">
            Fourteen clinical validation dossiers submitted, reviewed, and approved across high-complexity molecular, cytogenetic, and oncology categories.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={exportValidationSummary}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-border bg-paper px-3 py-1.5 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-mist cursor-pointer"
          >
            <DownloadSimple size={14} />
            <span>Export Portfolio</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-[3px] bg-blue px-3.5 py-1.5 text-[0.8125rem] font-medium text-on-blue transition-colors hover:bg-blue-deep cursor-pointer"
          >
            <Plus size={14} weight="bold" />
            <span>Register LDT Package</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="flex flex-col gap-3 rounded-[3px] border border-border bg-paper p-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1">
          <MagnifyingGlass
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground"
          />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by LDT tracking code, gene, instrument, or indication..."
            className="w-full rounded-[3px] border border-border bg-mist/40 py-1.5 pl-9 pr-3 text-[0.8125rem] text-foreground placeholder:text-muted-foreground focus:border-blue focus:bg-paper focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setCategoryFilter(cat)}
              className={cn(
                "rounded-[3px] px-2.5 py-1 text-[0.75rem] font-medium transition-colors cursor-pointer shrink-0",
                categoryFilter === cat
                  ? "bg-foreground text-paper"
                  : "text-muted-foreground hover:bg-mist hover:text-foreground",
              )}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Validations Cards Grid */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {filtered.map((val, idx) => (
          <motion.div
            key={val.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, ease: EASE, delay: idx * 0.04 }}
            className="rounded-[3px] border border-border bg-paper p-6 transition-colors hover:border-blue/40"
          >
            <div className="flex items-start justify-between gap-3 border-b border-border pb-3.5">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.75rem] font-semibold text-blue">
                    {val.ldtId}
                  </span>
                  <span className="rounded-[3px] border border-border bg-mist px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
                    {val.category}
                  </span>
                </div>
                <h3 className="mt-1 font-sans text-[1.0625rem] font-medium text-foreground">
                  {val.testName}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <span className="font-mono text-[0.6875rem] text-muted-foreground">
                  Approved {val.approvalDate}
                </span>
                <button
                  type="button"
                  onClick={() => onDeleteValidation(val.id)}
                  className="rounded-[3px] p-1 text-muted-foreground hover:bg-mist hover:text-red-600 transition-colors cursor-pointer"
                  title="Delete"
                >
                  <Trash size={14} />
                </button>
              </div>
            </div>

            <p className="mt-3 text-[0.8125rem] leading-relaxed text-muted-foreground">
              {val.clinicalIndication}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2 rounded-[3px] border border-border/70 bg-mist/30 p-2.5 font-mono text-[0.75rem]">
              <div>
                <span className="block text-[0.625rem] uppercase text-muted-foreground">Platform</span>
                <span className="font-medium text-foreground truncate block">{val.platform}</span>
              </div>
              <div>
                <span className="block text-[0.625rem] uppercase text-muted-foreground">Cohort (n)</span>
                <span className="font-medium text-foreground">{val.validationCohortSize} samples</span>
              </div>
              <div>
                <span className="block text-[0.625rem] uppercase text-muted-foreground">Sensitivity</span>
                <span className="font-medium text-foreground">{val.analyticalSensitivity}</span>
              </div>
            </div>

            <div className="mt-3 flex items-center justify-between font-mono text-[0.6875rem] text-muted-foreground">
              <span>Technical Director: {val.directorSignOff}</span>
              <span className="text-blue">NYSDOH CLEP Certified</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Validation Modal */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-black/30 backdrop-blur-[2px]"
            />

            <motion.form
              initial={{ opacity: 0, scale: 0.97, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 10 }}
              transition={{ duration: 0.25, ease: EASE }}
              onSubmit={handleCreateValidation}
              className="relative z-10 w-full max-w-lg rounded-[4px] border border-border bg-paper p-6 shadow-xl"
            >
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <span className="label-mono text-blue">Wadsworth Dossier</span>
                  <h3 className="font-display text-xl font-normal text-foreground">
                    Register NYS LDT Package
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="rounded-[3px] p-1 text-muted-foreground hover:bg-mist hover:text-foreground cursor-pointer"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="mt-4 space-y-3 text-[0.8125rem]">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      LDT Tracking Number *
                    </label>
                    <input
                      type="text"
                      value={newLdtId}
                      onChange={(e) => setNewLdtId(e.target.value)}
                      placeholder="e.g. LDT 105200"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Discipline
                    </label>
                    <select
                      value={newCat}
                      onChange={(e) => setNewCat(e.target.value as AssayValidation["category"])}
                      className="mt-1 w-full rounded-[3px] border border-border bg-paper px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    >
                      <option value="Molecular Genetics">Molecular Genetics</option>
                      <option value="Cytogenetics">Cytogenetics</option>
                      <option value="Oncology Tumour Markers">Oncology Tumour Markers</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                    Assay Name *
                  </label>
                  <input
                    required
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Solid Tumour Targeted Hotspot NGS"
                    className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                    Platform *
                  </label>
                  <input
                    required
                    type="text"
                    value={newPlatform}
                    onChange={(e) => setNewPlatform(e.target.value)}
                    placeholder="e.g. Illumina NextSeq 2000"
                    className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                    Clinical Indication
                  </label>
                  <input
                    type="text"
                    value={newIndication}
                    onChange={(e) => setNewIndication(e.target.value)}
                    placeholder="e.g. Somatic variant profiling in non-small cell lung carcinoma"
                    className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Cohort (n)
                    </label>
                    <input
                      type="number"
                      value={newCohort}
                      onChange={(e) => setNewCohort(e.target.value)}
                      placeholder="120"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Sensitivity
                    </label>
                    <input
                      type="text"
                      value={newSensitivity}
                      onChange={(e) => setNewSensitivity(e.target.value)}
                      placeholder="99.9%"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Specificity
                    </label>
                    <input
                      type="text"
                      value={newSpecificity}
                      onChange={(e) => setNewSpecificity(e.target.value)}
                      placeholder="99.9%"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>
                </div>

                <div className="flex items-center justify-end gap-2 border-t border-border pt-4">
                  <button
                    type="button"
                    onClick={() => setIsAddModalOpen(false)}
                    className="rounded-[3px] border border-border px-3.5 py-1.5 text-foreground hover:bg-mist cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="rounded-[3px] bg-blue px-3.5 py-1.5 text-on-blue hover:bg-blue-deep cursor-pointer"
                  >
                    Save Dossier
                  </button>
                </div>
              </div>
            </motion.form>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
