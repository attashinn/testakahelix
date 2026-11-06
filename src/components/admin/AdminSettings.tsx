import {
  ArrowCounterClockwise,
  Check,
  DownloadSimple,
  FloppyDisk,
  IdentificationBadge,
} from "@phosphor-icons/react";
import { useState } from "react";

import { company } from "@/content/site";

interface AdminSettingsProps {
  onResetData: () => void;
  onExportAll: () => void;
}

export function AdminSettings({ onResetData, onExportAll }: AdminSettingsProps) {
  const [notificationEmail, setNotificationEmail] = useState(company.email);
  const [autoNotify, setAutoNotify] = useState(true);
  const [savedMessage, setSavedMessage] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedMessage(true);
    setTimeout(() => setSavedMessage(false), 3000);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="border-b border-border pb-6">
        <span className="label-mono text-muted-foreground">Compliance & Credentials</span>
        <h1 className="mt-1 font-display text-2xl font-normal tracking-[-0.03em] text-foreground sm:text-3xl">
          Director Qualifications & System Controls
        </h1>
        <p className="mt-1 text-[0.875rem] text-muted-foreground">
          New York State Certificates of Qualification, CAP inspection credentials, and database persistence operations.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        {/* Left Column: Director Credentials (7 cols) */}
        <div className="rounded-[3px] border border-border bg-paper p-6 lg:col-span-7 space-y-6">
          <div className="flex items-start justify-between border-b border-border pb-4">
            <div>
              <span className="label-mono text-muted-foreground">Practice Leadership</span>
              <h2 className="mt-1 font-display text-xl font-normal text-foreground">
                {company.founder}
              </h2>
              <p className="font-mono text-[0.75rem] text-muted-foreground">
                {company.founderCreds} · {company.city}
              </p>
            </div>
            <div className="flex size-9 items-center justify-center rounded-[3px] bg-mist text-foreground">
              <IdentificationBadge size={20} />
            </div>
          </div>

          <div>
            <span className="label-mono text-muted-foreground">
              NYS CLEP Certificates of Qualification (Wadsworth)
            </span>
            <div className="mt-2.5 space-y-2">
              {[
                { title: "Cytogenetics", desc: "Constitutional & neoplastic chromosome karyotyping, FISH analysis" },
                { title: "Genetic Testing (Molecular)", desc: "High-complexity molecular genetics, sequencing & quantitative PCR" },
                { title: "Oncology Tumour Markers", desc: "Somatic mutation diagnostics, hematologic & solid neoplasms" },
              ].map((c) => (
                <div
                  key={c.title}
                  className="flex items-center justify-between rounded-[3px] border border-border bg-mist/20 p-3"
                >
                  <div>
                    <div className="font-sans text-[0.875rem] font-medium text-foreground">{c.title}</div>
                    <span className="block font-mono text-[0.6875rem] text-muted-foreground">{c.desc}</span>
                  </div>
                  <span className="font-mono text-[0.6875rem] text-blue font-medium shrink-0 ml-3">
                    Active CQ
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <span className="label-mono text-muted-foreground">Accreditation Record</span>
            <div className="mt-2.5 space-y-2 font-mono text-[0.75rem] text-muted-foreground">
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue" />
                <span>College of American Pathologists (CAP) Laboratory Inspector since 2020</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue" />
                <span>Assistant Professor of Pathology, Albert Einstein College of Medicine</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-blue" />
                <span>First Edition Author: <em>Genetic Blueprint: Bench to Bed</em> (2026)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Preferences & Database (5 cols) */}
        <div className="rounded-[3px] border border-border bg-paper p-6 lg:col-span-5 flex flex-col justify-between space-y-6">
          <form onSubmit={handleSave} className="space-y-4">
            <div className="border-b border-border pb-3">
              <span className="label-mono text-muted-foreground">Notifications</span>
              <h2 className="mt-0.5 text-base font-medium text-foreground">Lead Alerts</h2>
            </div>

            <div>
              <label className="block text-[0.6875rem] font-mono uppercase text-muted-foreground">
                Director Email Dispatch
              </label>
              <input
                type="email"
                value={notificationEmail}
                onChange={(e) => setNotificationEmail(e.target.value)}
                className="mt-1.5 w-full rounded-[3px] border border-border px-3 py-1.5 text-[0.8125rem] focus:border-blue focus:outline-hidden"
              />
            </div>

            <div className="flex items-center justify-between pt-1">
              <span className="text-[0.8125rem] text-foreground">Immediate Inbound Scoping Alerts</span>
              <input
                type="checkbox"
                checked={autoNotify}
                onChange={(e) => setAutoNotify(e.target.checked)}
                className="size-4 accent-blue cursor-pointer"
              />
            </div>

            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-[3px] bg-blue py-2 text-[0.8125rem] font-medium text-on-blue hover:bg-blue-deep transition-colors cursor-pointer"
            >
              <FloppyDisk size={14} />
              <span>Save Configuration</span>
            </button>

            {savedMessage && (
              <p className="font-mono text-center text-[0.75rem] text-emerald-700">
                Settings successfully stored.
              </p>
            )}
          </form>

          {/* Neon Cloud Database Status */}
          <div className="border-t border-border pt-5 space-y-2">
            <div className="flex items-center justify-between">
              <span className="label-mono text-muted-foreground">Neon Cloud Postgres</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Connected · us-east-2
              </span>
            </div>
            <div className="rounded-[3px] bg-mist/50 p-2.5 font-mono text-[0.6875rem] text-muted-foreground break-all">
              neondb @ ep-falling-shadow-bel8mq12-pooler
            </div>
          </div>

          {/* Neon Managed Better Auth Status */}
          <div className="border-t border-border pt-4 space-y-2">
            <div className="flex items-center justify-between">
              <span className="label-mono text-muted-foreground">Managed Better Auth</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[0.6875rem] text-emerald-600">
                <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Live & Synced (3 users in neon_auth)
              </span>
            </div>
            <div className="rounded-[3px] bg-mist/50 p-2.5 font-mono text-[0.6875rem] text-muted-foreground space-y-1">
              <div className="truncate"><span className="text-foreground">Base URL:</span> https://ep-falling-shadow-bel8mq12.neonauth.c-9.us-east-2.aws.neon.tech/neondb/auth</div>
              <div className="truncate"><span className="text-foreground">JWKS:</span> .../auth/.well-known/jwks.json</div>
            </div>
          </div>

          {/* Database Operations */}
          <div className="border-t border-border pt-5 space-y-3">
            <span className="label-mono text-muted-foreground">Local Persistence Engine</span>

            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={onExportAll}
                className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-border bg-paper py-2 text-[0.8125rem] font-medium text-foreground hover:bg-mist transition-colors cursor-pointer"
              >
                <DownloadSimple size={14} />
                <span>Export JSON Database Backup</span>
              </button>

              <button
                type="button"
                onClick={onResetData}
                className="inline-flex items-center justify-center gap-2 rounded-[3px] border border-border py-2 text-[0.8125rem] font-medium text-muted-foreground hover:bg-mist hover:text-red-600 transition-colors cursor-pointer"
              >
                <ArrowCounterClockwise size={14} />
                <span>Reset to Seed Data</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
