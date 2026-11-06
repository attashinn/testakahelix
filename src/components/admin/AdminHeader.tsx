import {
  Bell,
  Clock,
  Command,
  MagnifyingGlass,
  Plus,
} from "@phosphor-icons/react";
import { type AdminTab } from "./AdminLayout";

interface AdminHeaderProps {
  currentTab: AdminTab;
  onOpenNewInquiry?: (() => void) | undefined;
  searchTerm?: string | undefined;
  onSearchChange?: ((val: string) => void) | undefined;
}

export function AdminHeader({
  currentTab,
  onOpenNewInquiry,
  searchTerm,
  onSearchChange,
}: AdminHeaderProps) {
  const titles: Record<AdminTab, { title: string; subtitle: string; category: string }> = {
    overview: {
      category: "Executive Command",
      title: "Clinical Operations & Lab Setup Overview",
      subtitle: "High-complexity molecular genetics, cytogenetics & Wadsworth LDT pipeline",
    },
    inquiries: {
      category: "Client Pipeline",
      title: "Hospital & Reference Lab Inquiries",
      subtitle: "Active scoping calls, test in-housing proposals, and contract reviews",
    },
    projects: {
      category: "Turnkey Engagements",
      title: "Five-Phase Laboratory Buildouts",
      subtitle: "Floor plans, clean airflow zoning, equipment procurement & milestone tracking",
    },
    validations: {
      category: "Regulatory Portfolio",
      title: "New York State Wadsworth Validated LDTs",
      subtitle: "Fourteen approved laboratory-developed test dossiers across cytogenetics & oncology",
    },
    calculator: {
      category: "Financial Analytics",
      title: "Send-Out In-Housing ROI Model",
      subtitle: "Real-time client economics, test volume break-even, and capital amortization",
    },
    assistant: {
      category: "AI Operations",
      title: "Clinical Scoping Assistant Telemetry",
      subtitle: "Live visitor chat inquiries, token latency, and prompt diagnostic sandbox",
    },
    settings: {
      category: "Director Governance",
      title: "Director Qualifications & Compliance",
      subtitle: "NYS CLEP Certificates of Qualification, CAP inspection history, and data backup",
    },
  };

  const meta = titles[currentTab];

  return (
    <header className="sticky top-0 z-30 flex h-16 w-full items-center justify-between border-b border-border bg-paper/95 px-6 backdrop-blur-xs">
      {/* Breadcrumb & Section Name */}
      <div className="flex items-center gap-3">
        <span className="label-mono text-muted-foreground">{meta.category}</span>
        <span className="text-border">/</span>
        <span className="font-sans text-[0.875rem] font-medium text-foreground">
          {meta.title}
        </span>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-3">
        {/* Status indicator */}
        <div className="hidden items-center gap-2 rounded-full border border-border bg-mist/60 px-3 py-1 font-mono text-[0.6875rem] text-muted-foreground md:flex">
          <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>CAP Inspector #2020 · NYSDOH CLEP Lead</span>
        </div>

        {onOpenNewInquiry && (
          <button
            type="button"
            onClick={onOpenNewInquiry}
            className="inline-flex items-center gap-1.5 rounded-[4px] bg-blue px-3 py-1.5 text-[0.78125rem] font-medium text-on-blue shadow-xs transition-colors hover:bg-blue-deep cursor-pointer"
          >
            <Plus size={14} weight="bold" />
            <span>New Client Inquiry</span>
          </button>
        )}
      </div>
    </header>
  );
}
