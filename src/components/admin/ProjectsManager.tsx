import {
  Briefcase,
  Check,
  CheckCircle,
  Circle,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";

import { EASE } from "@/components/site/motion";
import { type LabProject } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

interface ProjectsManagerProps {
  projects: LabProject[];
  onUpdateProject: (updated: LabProject) => void;
  onAddProject: (newProj: LabProject) => void;
  onDeleteProject: (id: string) => void;
}

export function ProjectsManager({
  projects,
  onUpdateProject,
  onAddProject,
  onDeleteProject,
}: ProjectsManagerProps) {
  const [selectedPhase, setSelectedPhase] = useState<string>("All");
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Project form state
  const [newName, setNewName] = useState("");
  const [newClient, setNewClient] = useState("");
  const [newPhase, setNewPhase] = useState<LabProject["phase"]>("01 Scope & Financial Model");
  const [newDate, setNewDate] = useState("Q2 2027");
  const [newVolume, setNewVolume] = useState("5000");

  const phasesList: LabProject["phase"][] = [
    "01 Scope & Financial Model",
    "02 Facility & Clean Flow Plan",
    "03 Equipment Sourcing & LIS",
    "04 Assay Validation & NYS Filing",
    "05 Inspection Readiness & Go-Live",
  ];

  const filteredProjects = projects.filter(
    (p) => selectedPhase === "All" || p.phase === selectedPhase,
  );

  const toggleChecklistItem = (project: LabProject, itemIndex: number) => {
    const updatedChecklist = project.checklist.map((c, i) =>
      i === itemIndex ? { ...c, done: !c.done } : c,
    );
    const doneCount = updatedChecklist.filter((c) => c.done).length;
    const progressPercent = Math.round((doneCount / updatedChecklist.length) * 100);

    onUpdateProject({
      ...project,
      checklist: updatedChecklist,
      progressPercent,
    });
  };

  const handlePhaseChange = (project: LabProject, phase: LabProject["phase"]) => {
    const phaseNumber = parseInt(phase.slice(0, 2), 10);
    onUpdateProject({
      ...project,
      phase,
      phaseNumber,
    });
  };

  const handleCreateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newClient.trim()) return;

    const phaseNumber = parseInt(newPhase.slice(0, 2), 10);
    const newProj: LabProject = {
      id: `PRJ-0${projects.length + 1}`,
      name: newName.trim(),
      client: newClient.trim(),
      phase: newPhase,
      phaseNumber,
      progressPercent: 20,
      targetAccreditation: ["CLIA", "CAP"],
      directorLead: "Dr. Abul Kalam Azad, MD, PhD",
      targetLaunchDate: newDate,
      annualSampleVolume: parseInt(newVolume, 10) || 4500,
      budgetStatus: "On Track",
      checklist: [
        { item: "Scope of testing, clinical menu & throughput sizing", done: true },
        { item: "Floor plan pre/post-PCR directional airflow blueprint", done: false },
        { item: "Equipment vendor procurement & service contracts", done: false },
        { item: "Assay analytical validation protocol (sensitivity & specificity)", done: false },
        { item: "Mock inspection & CAP competency file closeout", done: false },
      ],
    };

    onAddProject(newProj);
    setIsAddModalOpen(false);
    setNewName("");
    setNewClient("");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border pb-6">
        <div>
          <span className="label-mono text-muted-foreground">Turnkey Buildouts</span>
          <h1 className="mt-1 font-display text-2xl font-normal tracking-[-0.03em] text-foreground sm:text-3xl">
            Laboratory Set-Up Engagements
          </h1>
          <p className="mt-1 text-[0.875rem] text-muted-foreground">
            Tracking execution across the five turnkey stages: business case, clean airflow floor plan, equipment, LDT validation, and inspection.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setIsAddModalOpen(true)}
          className="inline-flex items-center gap-1.5 rounded-[3px] bg-blue px-3.5 py-1.5 text-[0.8125rem] font-medium text-on-blue transition-colors hover:bg-blue-deep cursor-pointer"
        >
          <Plus size={14} weight="bold" />
          <span>New Build Project</span>
        </button>
      </div>

      {/* Phase Filters */}
      <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar rounded-[3px] border border-border bg-paper p-1.5">
        <button
          type="button"
          onClick={() => setSelectedPhase("All")}
          className={cn(
            "rounded-[3px] px-3 py-1 text-[0.75rem] font-medium transition-colors cursor-pointer shrink-0",
            selectedPhase === "All"
              ? "bg-foreground text-paper"
              : "text-muted-foreground hover:bg-mist hover:text-foreground",
          )}
        >
          All Stages ({projects.length})
        </button>
        {phasesList.map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => setSelectedPhase(p)}
            className={cn(
              "rounded-[3px] px-3 py-1 text-[0.75rem] font-medium transition-colors cursor-pointer shrink-0",
              selectedPhase === p
                ? "bg-foreground text-paper"
                : "text-muted-foreground hover:bg-mist hover:text-foreground",
            )}
          >
            {p.split(" ")[0]} {p.split(" ")[1]}
          </button>
        ))}
      </div>

      {/* Projects List */}
      <div className="space-y-6">
        {filteredProjects.map((project, idx) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: idx * 0.05 }}
            className="rounded-[3px] border border-border bg-paper p-6"
          >
            <div className="flex flex-col justify-between gap-4 border-b border-border pb-5 lg:flex-row lg:items-center">
              <div>
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="font-mono text-[0.75rem] font-semibold text-blue">
                    {project.id}
                  </span>
                  <h2 className="font-display text-xl font-normal text-foreground">
                    {project.name}
                  </h2>
                  <span className="rounded-[3px] border border-border bg-mist px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
                    {project.client}
                  </span>
                </div>

                <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1 font-mono text-[0.75rem] text-muted-foreground">
                  <span>
                    Director: <strong className="font-medium text-foreground">{project.directorLead}</strong>
                  </span>
                  <span>•</span>
                  <span>
                    Accreditation:{" "}
                    <strong className="font-medium text-foreground">
                      {project.targetAccreditation.join(", ")}
                    </strong>
                  </span>
                  <span>•</span>
                  <span>
                    Capacity:{" "}
                    <strong className="font-medium text-foreground">
                      {project.annualSampleVolume.toLocaleString()} samples/yr
                    </strong>
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-5">
                <div className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <span className="font-mono text-xl font-medium text-foreground">
                      {project.progressPercent}%
                    </span>
                    <span className="rounded-[3px] border border-border bg-mist px-2 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
                      {project.budgetStatus}
                    </span>
                  </div>
                  <span className="font-mono text-[0.6875rem] text-muted-foreground">
                    Target: {project.targetLaunchDate}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteProject(project.id)}
                  className="rounded-[3px] p-1.5 text-muted-foreground hover:bg-mist hover:text-red-600 transition-colors cursor-pointer"
                  title="Remove Project"
                >
                  <Trash size={15} />
                </button>
              </div>
            </div>

            {/* Stage Selector & Milestone Checklist */}
            <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-12">
              <div className="lg:col-span-4 space-y-3">
                <span className="label-mono text-muted-foreground">Phase Assignment</span>
                <select
                  value={project.phase}
                  onChange={(e) => handlePhaseChange(project, e.target.value as LabProject["phase"])}
                  className="w-full rounded-[3px] border border-border bg-mist/30 px-3 py-2 text-[0.8125rem] text-foreground focus:border-blue focus:outline-hidden"
                >
                  {phasesList.map((phase) => (
                    <option key={phase} value={phase}>
                      {phase}
                    </option>
                  ))}
                </select>

                <p className="rounded-[3px] border border-border/80 bg-mist/30 p-3 text-[0.75rem] text-muted-foreground leading-relaxed">
                  Milestones verified against NYSDOH Wadsworth CLEP and CAP General and Molecular Pathology accreditation standards.
                </p>
              </div>

              <div className="lg:col-span-8">
                <span className="label-mono text-muted-foreground">Milestones Completed</span>
                <div className="mt-2 space-y-1.5">
                  {project.checklist.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => toggleChecklistItem(project, idx)}
                      className={cn(
                        "flex w-full items-center gap-3 rounded-[3px] border p-2 text-left text-[0.8125rem] transition-colors cursor-pointer",
                        item.done
                          ? "border-border bg-mist/50 text-foreground"
                          : "border-border/60 bg-paper text-muted-foreground hover:bg-mist/30",
                      )}
                    >
                      <div
                        className={cn(
                          "flex size-4 items-center justify-center rounded-[2px] border text-paper transition-colors shrink-0",
                          item.done ? "border-blue bg-blue" : "border-muted-foreground/40",
                        )}
                      >
                        {item.done && <Check size={11} weight="bold" />}
                      </div>
                      <span className={cn(item.done && "font-medium text-foreground")}>
                        {item.item}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add Project Modal */}
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
              onSubmit={handleCreateProject}
              className="relative z-10 w-full max-w-lg rounded-[4px] border border-border bg-paper p-6 shadow-xl"
            >
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <span className="label-mono text-blue">New Engagement</span>
                  <h3 className="font-display text-xl font-normal text-foreground">
                    Initiate Laboratory Buildout
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
                <div>
                  <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                    Project Title *
                  </label>
                  <input
                    required
                    type="text"
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="e.g. Montefiore Molecular Pathology Lab"
                    className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                    Client Institution *
                  </label>
                  <input
                    required
                    type="text"
                    value={newClient}
                    onChange={(e) => setNewClient(e.target.value)}
                    placeholder="e.g. Montefiore Medical Center"
                    className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Initial Phase
                    </label>
                    <select
                      value={newPhase}
                      onChange={(e) => setNewPhase(e.target.value as LabProject["phase"])}
                      className="mt-1 w-full rounded-[3px] border border-border bg-paper px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    >
                      {phasesList.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Target Launch Date
                    </label>
                    <input
                      type="text"
                      value={newDate}
                      onChange={(e) => setNewDate(e.target.value)}
                      placeholder="e.g. Q3 2027"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                    Expected Annual Sample Volume
                  </label>
                  <input
                    type="number"
                    value={newVolume}
                    onChange={(e) => setNewVolume(e.target.value)}
                    placeholder="e.g. 5500"
                    className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                  />
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
                    Launch Buildout
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
