import {
  ArrowSquareOut,
  Buildings,
  Check,
  CheckCircle,
  DownloadSimple,
  EnvelopeSimple,
  MagnifyingGlass,
  Plus,
  Trash,
  X,
} from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { EASE } from "@/components/site/motion";
import { type Inquiry } from "@/lib/admin-data";
import { cn } from "@/lib/utils";

interface InquiriesManagerProps {
  inquiries: Inquiry[];
  onUpdateInquiry: (updated: Inquiry) => void;
  onAddInquiry: (newInq: Inquiry) => void;
  onDeleteInquiry: (id: string) => void;
}

export function InquiriesManager({
  inquiries,
  onUpdateInquiry,
  onAddInquiry,
  onDeleteInquiry,
}: InquiriesManagerProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("All");
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // New Inquiry form
  const [newClient, setNewClient] = useState("");
  const [newType, setNewType] = useState<Inquiry["institutionType"]>("Hospital System");
  const [newContact, setNewContact] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newScope, setNewScope] = useState("");
  const [newVolume, setNewVolume] = useState("");
  const [newSavings, setNewSavings] = useState("");
  const [newNotes, setNewNotes] = useState("");

  const filteredInquiries = useMemo(() => {
    return inquiries.filter((inq) => {
      const matchesStatus = statusFilter === "All" || inq.status === statusFilter;
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        inq.client.toLowerCase().includes(term) ||
        inq.contactPerson.toLowerCase().includes(term) ||
        inq.email.toLowerCase().includes(term) ||
        inq.projectScope.toLowerCase().includes(term);
      return matchesStatus && matchesSearch;
    });
  }, [inquiries, searchTerm, statusFilter]);

  const handleStatusChange = (inquiry: Inquiry, newStatus: Inquiry["status"]) => {
    const updated = { ...inquiry, status: newStatus };
    onUpdateInquiry(updated);
    if (selectedInquiry?.id === inquiry.id) {
      setSelectedInquiry(updated);
    }
  };

  const handleCreateInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newClient.trim() || !newContact.trim() || !newEmail.trim()) return;

    const newInq: Inquiry = {
      id: `INQ-2026-${Math.floor(100 + Math.random() * 900)}`,
      client: newClient.trim(),
      institutionType: newType,
      contactPerson: newContact.trim(),
      email: newEmail.trim(),
      phone: "Not provided",
      projectScope: newScope.trim() || "General laboratory scoping & validation consultation",
      testVolume: newVolume.trim() || "Pending discovery call",
      estimatedAnnualSavings: newSavings.trim() || "Pending financial audit",
      status: "New",
      date: new Date().toISOString().split("T")[0] ?? "2026-11-06",
      notes: newNotes.trim() || "Created manually by laboratory administrator.",
      targetAccreditation: ["CLIA", "CAP"],
    };

    onAddInquiry(newInq);
    setIsAddModalOpen(false);
    setNewClient("");
    setNewContact("");
    setNewEmail("");
    setNewScope("");
    setNewVolume("");
    setNewSavings("");
    setNewNotes("");
  };

  const exportCSV = () => {
    const headers = ["ID", "Client", "Institution Type", "Contact", "Email", "Status", "Date", "Scope", "Est Savings"];
    const rows = filteredInquiries.map((i) => [
      i.id,
      `"${i.client.replace(/"/g, '""')}"`,
      `"${i.institutionType}"`,
      `"${i.contactPerson.replace(/"/g, '""')}"`,
      i.email,
      i.status,
      i.date,
      `"${i.projectScope.replace(/"/g, '""')}"`,
      `"${i.estimatedAnnualSavings}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `akahelix_inquiries_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const statusOptions: Inquiry["status"][] = [
    "New",
    "Scoping Scheduled",
    "Proposal Sent",
    "Active Engagement",
    "Completed",
    "Archived",
  ];

  return (
    <div className="space-y-6">
      {/* Header and Action controls */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center border-b border-border pb-6">
        <div>
          <span className="label-mono text-muted-foreground">Inbound Pipeline</span>
          <h1 className="mt-1 font-display text-2xl font-normal tracking-[-0.03em] text-foreground sm:text-3xl">
            Hospital & Laboratory Inquiries
          </h1>
          <p className="mt-1 text-[0.875rem] text-muted-foreground">
            Manage incoming scoping requests, test in-housing evaluations, and validation engagements.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={exportCSV}
            className="inline-flex items-center gap-1.5 rounded-[3px] border border-border bg-paper px-3 py-1.5 text-[0.8125rem] font-medium text-foreground transition-colors hover:bg-mist cursor-pointer"
          >
            <DownloadSimple size={14} />
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-[3px] bg-blue px-3.5 py-1.5 text-[0.8125rem] font-medium text-on-blue transition-colors hover:bg-blue-deep cursor-pointer"
          >
            <Plus size={14} weight="bold" />
            <span>New Scoping Request</span>
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
            placeholder="Search by institution, lead director, email, or test scope..."
            className="w-full rounded-[3px] border border-border bg-mist/40 py-1.5 pl-9 pr-3 text-[0.8125rem] text-foreground placeholder:text-muted-foreground focus:border-blue focus:bg-paper focus:outline-hidden"
          />
        </div>

        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-0.5">
          {["All", ...statusOptions].map((status) => (
            <button
              key={status}
              type="button"
              onClick={() => setStatusFilter(status)}
              className={cn(
                "rounded-[3px] px-2.5 py-1 text-[0.75rem] font-medium transition-colors cursor-pointer shrink-0",
                statusFilter === status
                  ? "bg-foreground text-paper"
                  : "text-muted-foreground hover:bg-mist hover:text-foreground",
              )}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Data Table */}
      <div className="overflow-hidden rounded-[3px] border border-border bg-paper">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-[0.8125rem]">
            <thead className="border-b border-border bg-mist/30 text-[0.6875rem] uppercase tracking-wider text-muted-foreground font-mono">
              <tr>
                <th className="px-5 py-3 font-normal">Institution & Type</th>
                <th className="px-5 py-3 font-normal">Contact Person</th>
                <th className="px-5 py-3 font-normal">Scope & Volume</th>
                <th className="px-5 py-3 font-normal">Est. Annual Value</th>
                <th className="px-5 py-3 font-normal">Status</th>
                <th className="px-5 py-3 font-normal text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {filteredInquiries.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-muted-foreground">
                    No inquiries found matching your filters.
                  </td>
                </tr>
              ) : (
                filteredInquiries.map((inq) => (
                  <tr
                    key={inq.id}
                    onClick={() => setSelectedInquiry(inq)}
                    className="group cursor-pointer transition-colors hover:bg-mist/40"
                  >
                    <td className="px-5 py-3.5">
                      <div className="font-medium text-foreground group-hover:text-blue transition-colors">
                        {inq.client}
                      </div>
                      <div className="flex items-center gap-1.5 font-mono text-[0.6875rem] text-muted-foreground">
                        <span>{inq.id}</span>
                        <span>•</span>
                        <span>{inq.institutionType}</span>
                      </div>
                    </td>

                    <td className="px-5 py-3.5">
                      <div className="text-foreground">{inq.contactPerson}</div>
                      <div className="font-mono text-[0.6875rem] text-muted-foreground">
                        {inq.email}
                      </div>
                    </td>

                    <td className="max-w-xs px-5 py-3.5">
                      <p className="line-clamp-1 text-foreground">{inq.projectScope}</p>
                      <p className="font-mono text-[0.6875rem] text-muted-foreground">
                        {inq.testVolume}
                      </p>
                    </td>

                    <td className="px-5 py-3.5 font-mono text-foreground">
                      {inq.estimatedAnnualSavings}
                    </td>

                    <td className="px-5 py-3.5" onClick={(e) => e.stopPropagation()}>
                      <select
                        value={inq.status}
                        onChange={(e) =>
                          handleStatusChange(inq, e.target.value as Inquiry["status"])
                        }
                        className={cn(
                          "rounded-[3px] border px-2 py-0.5 font-mono text-[0.6875rem] font-medium cursor-pointer focus:outline-hidden",
                          inq.status === "New" && "border-blue/30 bg-blue/10 text-blue",
                          inq.status === "Scoping Scheduled" && "border-border bg-mist text-foreground",
                          inq.status === "Proposal Sent" && "border-border bg-mist text-foreground",
                          inq.status === "Active Engagement" && "border-emerald-200 bg-emerald-50 text-emerald-800",
                          inq.status === "Completed" && "border-border bg-mist text-muted-foreground",
                          inq.status === "Archived" && "border-border bg-mist text-muted-foreground/60",
                        )}
                      >
                        {statusOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                      <button
                        type="button"
                        onClick={() => onDeleteInquiry(inq.id)}
                        className="rounded-[3px] p-1 text-muted-foreground hover:bg-mist hover:text-red-600 transition-colors cursor-pointer"
                        title="Delete Inquiry"
                      >
                        <Trash size={14} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Slide-over Drawer for Inquiry Detail */}
      <AnimatePresence>
        {selectedInquiry && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedInquiry(null)}
              className="absolute inset-0 bg-black/25 backdrop-blur-[2px]"
            />

            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.4, ease: EASE }}
              className="relative z-10 flex h-full w-full max-w-xl flex-col border-l border-border bg-paper p-6 sm:p-8 shadow-2xl overflow-y-auto"
            >
              <div className="flex items-start justify-between border-b border-border pb-4">
                <div>
                  <span className="label-mono text-blue">{selectedInquiry.id}</span>
                  <h2 className="mt-1 font-display text-2xl font-normal text-foreground">
                    {selectedInquiry.client}
                  </h2>
                  <p className="font-mono text-[0.75rem] text-muted-foreground">
                    {selectedInquiry.institutionType} · Received {selectedInquiry.date}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setSelectedInquiry(null)}
                  className="rounded-[3px] p-1.5 text-muted-foreground hover:bg-mist hover:text-foreground cursor-pointer"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="mt-6 flex-1 space-y-6 text-[0.875rem]">
                {/* Contact strip */}
                <div className="rounded-[3px] border border-border bg-mist/30 p-4 space-y-2">
                  <span className="label-mono text-muted-foreground">Primary Institutional Lead</span>
                  <div className="font-medium text-foreground">{selectedInquiry.contactPerson}</div>
                  <div className="flex items-center gap-2 font-mono text-[0.75rem] text-muted-foreground">
                    <EnvelopeSimple size={14} />
                    <a href={`mailto:${selectedInquiry.email}`} className="text-blue hover:underline">
                      {selectedInquiry.email}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="label-mono text-muted-foreground">Clinical Scope & Targets</span>
                  <p className="mt-1.5 leading-relaxed text-foreground">
                    {selectedInquiry.projectScope}
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-[3px] border border-border p-4">
                  <div>
                    <span className="label-mono text-muted-foreground">Test Volume</span>
                    <div className="mt-1 font-mono font-medium text-foreground">
                      {selectedInquiry.testVolume}
                    </div>
                  </div>
                  <div>
                    <span className="label-mono text-muted-foreground">Financial Impact</span>
                    <div className="mt-1 font-mono font-medium text-emerald-700">
                      {selectedInquiry.estimatedAnnualSavings}
                    </div>
                  </div>
                </div>

                <div>
                  <span className="label-mono text-muted-foreground">Director Discovery Notes</span>
                  <p className="mt-1.5 rounded-[3px] border border-border/80 bg-mist/20 p-3.5 text-[0.8125rem] leading-relaxed text-muted-foreground">
                    {selectedInquiry.notes}
                  </p>
                </div>

                <div className="border-t border-border pt-4 space-y-3">
                  <span className="label-mono text-muted-foreground">Pipeline State</span>
                  <div className="flex flex-wrap gap-1.5">
                    {statusOptions.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleStatusChange(selectedInquiry, opt)}
                        className={cn(
                          "rounded-[3px] px-3 py-1 text-[0.75rem] font-medium transition-colors cursor-pointer",
                          selectedInquiry.status === opt
                            ? "bg-foreground text-paper"
                            : "border border-border bg-paper text-muted-foreground hover:bg-mist hover:text-foreground",
                        )}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Add New Inquiry Modal */}
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
              onSubmit={handleCreateInquiry}
              className="relative z-10 w-full max-w-lg rounded-[4px] border border-border bg-paper p-6 shadow-xl"
            >
              <div className="flex items-start justify-between border-b border-border pb-3">
                <div>
                  <span className="label-mono text-blue">Intake Lead</span>
                  <h3 className="font-display text-xl font-normal text-foreground">
                    Register Scoping Inquiry
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
                      Hospital / Laboratory *
                    </label>
                    <input
                      required
                      type="text"
                      value={newClient}
                      onChange={(e) => setNewClient(e.target.value)}
                      placeholder="e.g. Johns Hopkins Medicine"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Classification
                    </label>
                    <select
                      value={newType}
                      onChange={(e) => setNewType(e.target.value as Inquiry["institutionType"])}
                      className="mt-1 w-full rounded-[3px] border border-border bg-paper px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    >
                      <option value="Hospital System">Hospital System</option>
                      <option value="Academic Medical Center">Academic Medical Center</option>
                      <option value="Reference Laboratory">Reference Laboratory</option>
                      <option value="International Facility">International Facility</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Contact Name & Title *
                    </label>
                    <input
                      required
                      type="text"
                      value={newContact}
                      onChange={(e) => setNewContact(e.target.value)}
                      placeholder="e.g. Dr. Jane Smith"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Email Address *
                    </label>
                    <input
                      required
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder="e.g. jsmith@jhmi.edu"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                    Project Scope & Intent
                  </label>
                  <textarea
                    rows={2}
                    value={newScope}
                    onChange={(e) => setNewScope(e.target.value)}
                    placeholder="e.g. Bring SMA qPCR in-house, pre/post PCR zoning, and CAP inspection prep."
                    className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Monthly Volume
                    </label>
                    <input
                      type="text"
                      value={newVolume}
                      onChange={(e) => setNewVolume(e.target.value)}
                      placeholder="e.g. 400 samples/mo"
                      className="mt-1 w-full rounded-[3px] border border-border px-3 py-1.5 focus:border-blue focus:outline-hidden"
                    />
                  </div>

                  <div>
                    <label className="block text-[0.6875rem] font-medium uppercase font-mono text-muted-foreground">
                      Projected Annual Savings
                    </label>
                    <input
                      type="text"
                      value={newSavings}
                      onChange={(e) => setNewSavings(e.target.value)}
                      placeholder="e.g. $280,000 / year"
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
                    Register Lead
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
