import {
  ArrowRight,
  Briefcase,
  Buildings,
  Calculator,
  CheckCircle,
  Flask,
  ShieldCheck,
} from "@phosphor-icons/react";
import { motion } from "motion/react";

import { EASE, FadeUp } from "@/components/site/motion";
import { type AssayValidation, type Inquiry, type LabProject } from "@/lib/admin-data";
import { cn } from "@/lib/utils";
import { type AdminTab } from "./AdminLayout";

interface AdminOverviewProps {
  inquiries: Inquiry[];
  projects: LabProject[];
  validations: AssayValidation[];
  onNavigateTab: (tab: AdminTab) => void;
}

export function AdminOverview({
  inquiries,
  projects,
  validations,
  onNavigateTab,
}: AdminOverviewProps) {
  const pendingInquiries = inquiries.filter(
    (i) => i.status === "New" || i.status === "Scoping Scheduled",
  );
  const activeProjects = projects.filter((p) => p.progressPercent < 100);

  return (
    <div className="space-y-10">
      {/* Editorial Headline Section */}
      <div className="border-b border-border pb-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <span className="label-mono text-muted-foreground">
              AKAHELIX · Laboratory Genetics Practice
            </span>
            <h1 className="mt-2 font-display text-[clamp(1.75rem,3.2vw,2.75rem)] font-normal leading-[1.05] tracking-[-0.04em] text-foreground">
              Clinical Command & LDT Pipeline
            </h1>
            <p className="mt-2.5 max-w-[58ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
              Executive oversight for turnkey molecular and cytogenetics facility builds, New York State Wadsworth Center assay validation packages, and hospital send-out in-housing economics.
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => onNavigateTab("calculator")}
              className="inline-flex items-center gap-2 rounded-[3px] border border-border bg-paper px-3.5 py-2 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-mist cursor-pointer"
            >
              <Calculator size={15} />
              <span>Model Send-Out ROI</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateTab("inquiries")}
              className="inline-flex items-center gap-2 rounded-[3px] bg-blue px-3.5 py-2 text-[0.8125rem] font-medium text-on-blue transition-colors hover:bg-blue-deep cursor-pointer"
            >
              <Buildings size={15} />
              <span>Review Leads ({pendingInquiries.length})</span>
            </button>
          </div>
        </div>
      </div>

      {/* 4 Clean Metric Blocks - Minimalist Editorial Grid */}
      <div className="grid grid-cols-1 gap-px bg-border sm:grid-cols-2 lg:grid-cols-4 rounded-[4px] overflow-hidden border border-border">
        {/* Metric 1 */}
        <div className="bg-paper p-6 transition-colors hover:bg-mist/30">
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted-foreground">01 · Scoping Leads</span>
            <span className="font-mono text-[0.6875rem] text-blue font-medium">
              +{pendingInquiries.length} Action
            </span>
          </div>
          <div className="mt-4 font-display text-4xl font-light tracking-[-0.05em] text-foreground">
            {inquiries.length}
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted-foreground leading-snug">
            Hospital systems & diagnostic labs in active discovery.
          </p>
        </div>

        {/* Metric 2 */}
        <div className="bg-paper p-6 transition-colors hover:bg-mist/30">
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted-foreground">02 · Lab Builds</span>
            <span className="font-mono text-[0.6875rem] text-muted-foreground">Phases 01-05</span>
          </div>
          <div className="mt-4 font-display text-4xl font-light tracking-[-0.05em] text-foreground">
            {activeProjects.length}
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted-foreground leading-snug">
            32,300 annual test capacity across ongoing buildouts.
          </p>
        </div>

        {/* Metric 3 */}
        <div className="bg-paper p-6 transition-colors hover:bg-mist/30">
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted-foreground">03 · Wadsworth LDTs</span>
            <span className="font-mono text-[0.6875rem] text-blue font-medium">100% Pass Rate</span>
          </div>
          <div className="mt-4 font-display text-4xl font-light tracking-[-0.05em] text-foreground">
            {validations.length}
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted-foreground leading-snug">
            Approved New York State LDT submission packages.
          </p>
        </div>

        {/* Metric 4 */}
        <div className="bg-paper p-6 transition-colors hover:bg-mist/30">
          <div className="flex items-center justify-between">
            <span className="label-mono text-muted-foreground">04 · Client ROI</span>
            <span className="font-mono text-[0.6875rem] text-blue font-medium">SMA Case</span>
          </div>
          <div className="mt-4 font-display text-4xl font-light tracking-[-0.05em] text-foreground">
            67%
          </div>
          <p className="mt-2 text-[0.8125rem] text-muted-foreground leading-snug">
            Testing cost reduction when bringing send-outs in-house.
          </p>
        </div>
      </div>

      {/* Two Column Section: Active Projects Pipeline & Inbound Scoping Queue */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Turnkey Build Pipeline (8 cols) */}
        <div className="space-y-4 lg:col-span-7">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <span className="label-mono text-muted-foreground">Turnkey Engagements</span>
              <h2 className="mt-0.5 text-base font-medium tracking-tight text-foreground">
                Active Five-Phase Laboratory Buildouts
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("projects")}
              className="inline-flex items-center gap-1 text-[0.8125rem] text-blue hover:underline cursor-pointer"
            >
              <span>Manage Projects</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="space-y-3">
            {projects.map((proj, idx) => (
              <motion.div
                key={proj.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: idx * 0.05 }}
                className="rounded-[3px] border border-border bg-paper p-5 transition-colors hover:border-blue/40"
              >
                <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[0.6875rem] font-semibold text-blue">
                        {proj.id}
                      </span>
                      <h3 className="font-sans text-[0.9375rem] font-medium text-foreground">
                        {proj.name}
                      </h3>
                    </div>
                    <p className="mt-1 font-mono text-[0.75rem] text-muted-foreground">
                      Client: {proj.client} • Target: {proj.targetAccreditation.join(", ")}
                    </p>
                  </div>

                  <div className="text-right">
                    <span className="font-mono text-sm font-semibold text-foreground">
                      {proj.progressPercent}%
                    </span>
                    <span className="block font-mono text-[0.625rem] uppercase text-muted-foreground">
                      Launch: {proj.targetLaunchDate}
                    </span>
                  </div>
                </div>

                {/* Clean progress hairline */}
                <div className="mt-4">
                  <div className="h-1 w-full overflow-hidden rounded-full bg-mist">
                    <div
                      className="h-full bg-blue transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      style={{ width: `${proj.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-3 flex items-center justify-between text-[0.75rem] text-muted-foreground">
                  <span>
                    Current Stage: <strong className="font-medium text-foreground">{proj.phase}</strong>
                  </span>
                  <span className="font-mono text-[0.6875rem]">
                    {proj.checklist.filter((c) => c.done).length} of {proj.checklist.length} milestones
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column: Inbound Scoping Leads (5 cols) */}
        <div className="space-y-4 lg:col-span-5">
          <div className="flex items-center justify-between border-b border-border pb-3">
            <div>
              <span className="label-mono text-muted-foreground">Lead Intake</span>
              <h2 className="mt-0.5 text-base font-medium tracking-tight text-foreground">
                Recent Scoping Inquiries
              </h2>
            </div>
            <button
              type="button"
              onClick={() => onNavigateTab("inquiries")}
              className="inline-flex items-center gap-1 text-[0.8125rem] text-blue hover:underline cursor-pointer"
            >
              <span>View All ({inquiries.length})</span>
              <ArrowRight size={13} />
            </button>
          </div>

          <div className="divide-y divide-border rounded-[3px] border border-border bg-paper">
            {inquiries.slice(0, 4).map((inq, idx) => (
              <motion.div
                key={inq.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                className="p-4 transition-colors hover:bg-mist/30"
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="font-sans text-[0.875rem] font-medium text-foreground">
                      {inq.client}
                    </span>
                    <p className="mt-0.5 line-clamp-1 text-[0.78125rem] text-muted-foreground">
                      {inq.projectScope}
                    </p>
                    <div className="mt-1.5 flex items-center gap-2 font-mono text-[0.6875rem] text-muted-foreground">
                      <span>{inq.contactPerson.split(",")[0]}</span>
                      <span>•</span>
                      <span>{inq.date}</span>
                    </div>
                  </div>

                  <span
                    className={cn(
                      "rounded-[3px] px-2 py-0.5 font-mono text-[0.625rem] font-medium tracking-wide shrink-0",
                      inq.status === "New" && "bg-blue/10 text-blue",
                      inq.status === "Scoping Scheduled" && "bg-mist-deep text-foreground",
                      inq.status === "Proposal Sent" && "bg-mist text-foreground/80",
                      inq.status === "Active Engagement" && "bg-emerald-50 text-emerald-800",
                    )}
                  >
                    {inq.status}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Quick Director Note Card */}
          <div className="rounded-[3px] border border-border bg-mist/40 p-4 text-[0.78125rem] text-muted-foreground leading-relaxed">
            <span className="label-mono block mb-1 text-foreground/80">Director Note</span>
            All validation submissions follow Wadsworth Center guidelines for New York State compliance. Laboratories outside New York adopt CAP and ISO 15189 accreditation checklists.
          </div>
        </div>
      </div>
    </div>
  );
}
