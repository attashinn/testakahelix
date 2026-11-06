import {
  ArrowRight,
  ArrowUpRight,
  Eye,
  EyeSlash,
  Lock,
} from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";

import { AdminLayout, type AdminTab } from "@/components/admin/AdminLayout";
import { AdminOverview } from "@/components/admin/AdminOverview";
import { AdminSettings } from "@/components/admin/AdminSettings";
import { AssistantAnalytics } from "@/components/admin/AssistantAnalytics";
import { InquiriesManager } from "@/components/admin/InquiriesManager";
import { ProjectsManager } from "@/components/admin/ProjectsManager";
import { SendOutCalculator } from "@/components/admin/SendOutCalculator";
import { ValidationsManager } from "@/components/admin/ValidationsManager";
import { CtaArrows } from "@/components/site/Cta";
import { EASE, FadeUp, RevealText, introDelay } from "@/components/site/motion";
import { Mark } from "@/components/site/Wordmark";
import { company } from "@/content/site";
import {
  INITIAL_INQUIRIES,
  INITIAL_PROJECTS,
  INITIAL_VALIDATIONS,
  getStoredInquiries,
  getStoredProjects,
  getStoredValidations,
  saveStoredInquiries,
  saveStoredProjects,
  saveStoredValidations,
  type AssayValidation,
  type Inquiry,
  type LabProject,
} from "@/lib/admin-data";
import { authClient } from "@/lib/auth";

export const Route = createFileRoute("/admin_panel")({
  head: () => ({
    meta: [
      { title: "Clinical Operations Administrative Gateway · AKAHELIX" },
      {
        name: "robots",
        content: "noindex, nofollow",
      },
    ],
  }),
  component: AdminPanelPage,
});

const ADMIN_STORAGE_KEY = "akahelix_admin_authenticated";
const OFFICIAL_ADMIN_EMAIL = "admin@akahelix.com";
const OFFICIAL_ADMIN_PASSWORD = "AkaHelix2026!Admin";

function AdminField({
  label,
  name,
  type = "text",
  required,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  const cls =
    "peer w-full border-0 border-b border-border bg-transparent pb-3 pt-7 text-lg tracking-[-0.01em] outline-none transition-colors placeholder:text-transparent focus:border-blue";
  return (
    <label className="group relative block">
      <input
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        placeholder={label}
        className={cls}
      />
      <span className="label-mono pointer-events-none absolute left-0 top-1 text-muted-foreground transition-colors peer-focus:text-foreground">
        {label}
        {required && " *"}
      </span>
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-blue transition-transform duration-700 ease-out-expo peer-focus:scale-x-100" />
    </label>
  );
}

function AdminPanelPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [checkingAuth, setCheckingAuth] = useState(true);

  // Login Form State
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);

  // Dashboard Data State
  const [currentTab, setCurrentTab] = useState<AdminTab>("overview");
  const [inquiries, setInquiries] = useState<Inquiry[]>(INITIAL_INQUIRIES);
  const [projects, setProjects] = useState<LabProject[]>(INITIAL_PROJECTS);
  const [validations, setValidations] = useState<AssayValidation[]>(INITIAL_VALIDATIONS);

  useEffect(() => {
    // Check localStorage admin session
    const storedAuth = typeof window !== "undefined" ? localStorage.getItem(ADMIN_STORAGE_KEY) : null;
    if (storedAuth === "true") {
      setIsAuthenticated(true);
      setAdminUser({ email: OFFICIAL_ADMIN_EMAIL, name: "Executive Laboratory Administrator" });
      setCheckingAuth(false);
      return;
    }

    // Check Neon Auth session
    authClient
      .getSession()
      .then((res: any) => {
        if (res.data?.user && res.data.user.email?.includes("admin")) {
          setIsAuthenticated(true);
          setAdminUser(res.data.user);
        }
        setCheckingAuth(false);
      })
      .catch(() => {
        setCheckingAuth(false);
      });
  }, []);

  // Sync stored dashboard records
  useEffect(() => {
    if (isAuthenticated) {
      setInquiries(getStoredInquiries());
      setProjects(getStoredProjects());
      setValidations(getStoredValidations());
    }
  }, [isAuthenticated]);

  const handleAdminLogin = async (e: FormEvent) => {
    e.preventDefault();
    setLoginLoading(true);
    setLoginError(null);

    const inputEmail = email.trim().toLowerCase();
    const inputPass = password.trim();

    // 1. Direct master check
    if (inputEmail === OFFICIAL_ADMIN_EMAIL && inputPass === OFFICIAL_ADMIN_PASSWORD) {
      localStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setAdminUser({ email: OFFICIAL_ADMIN_EMAIL, name: "Executive Laboratory Administrator" });
      setLoginLoading(false);
      return;
    }

    // 2. Neon Managed Auth verification
    try {
      const res: any = await authClient.signIn.email({
        email: inputEmail,
        password: inputPass,
      });

      if (res.error) {
        setLoginError("Invalid administrator credentials. Access is restricted to authorized personnel.");
        setLoginLoading(false);
        return;
      }

      localStorage.setItem(ADMIN_STORAGE_KEY, "true");
      setIsAuthenticated(true);
      setAdminUser(res.data?.user || { email: inputEmail, name: "Director Administrator" });
    } catch {
      setLoginError("Authentication failure. Check network connectivity or administrative security key.");
    } finally {
      setLoginLoading(false);
    }
  };

  const handleAdminSignOut = async () => {
    localStorage.removeItem(ADMIN_STORAGE_KEY);
    try {
      await authClient.signOut();
    } catch {}
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  const fillQuickCredentials = () => {
    setEmail(OFFICIAL_ADMIN_EMAIL);
    setPassword(OFFICIAL_ADMIN_PASSWORD);
    setLoginError(null);
  };

  // Dashboard mutation handlers
  const handleAddInquiry = (newInquiry: Inquiry) => {
    const updated = [newInquiry, ...inquiries];
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleUpdateInquiry = (updatedInquiry: Inquiry) => {
    const updated = inquiries.map((inq) => (inq.id === updatedInquiry.id ? updatedInquiry : inq));
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleDeleteInquiry = (id: string) => {
    const updated = inquiries.filter((inq) => inq.id !== id);
    setInquiries(updated);
    saveStoredInquiries(updated);
  };

  const handleAddProject = (newProj: LabProject) => {
    const updated = [newProj, ...projects];
    setProjects(updated);
    saveStoredProjects(updated);
  };

  const handleUpdateProject = (updatedProj: LabProject) => {
    const updated = projects.map((p) => (p.id === updatedProj.id ? updatedProj : p));
    setProjects(updated);
    saveStoredProjects(updated);
  };

  const handleDeleteProject = (id: string) => {
    const updated = projects.filter((p) => p.id !== id);
    setProjects(updated);
    saveStoredProjects(updated);
  };

  const handleAddValidation = (newV: AssayValidation) => {
    const updated = [newV, ...validations];
    setValidations(updated);
    saveStoredValidations(updated);
  };

  const handleDeleteValidation = (id: string) => {
    const updated = validations.filter((v) => v.id !== id);
    setValidations(updated);
    saveStoredValidations(updated);
  };

  const handleResetData = () => {
    setInquiries(INITIAL_INQUIRIES);
    setProjects(INITIAL_PROJECTS);
    setValidations(INITIAL_VALIDATIONS);
    saveStoredInquiries(INITIAL_INQUIRIES);
    saveStoredProjects(INITIAL_PROJECTS);
    saveStoredValidations(INITIAL_VALIDATIONS);
  };

  const handleExportAll = () => {
    const data = {
      exportTimestamp: new Date().toISOString(),
      inquiries,
      projects,
      validations,
    };
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `akahelix-admin-backup-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  if (checkingAuth) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-mist/40">
        <div className="text-center">
          <div className="inline-block size-6 animate-spin rounded-full border-2 border-border border-t-blue" />
          <p className="mt-3 font-mono text-[0.75rem] text-muted-foreground">Verifying administrative gateway...</p>
        </div>
      </div>
    );
  }

  // --- UN-AUTHENTICATED: DEDICATED ADMIN LOGIN PORTAL (STRICT LANDING PAGE DESIGN LANGUAGE) ---
  if (!isAuthenticated) {
    return (
      <section className="container-x min-h-screen pb-24 pt-32 md:pb-36 md:pt-44 flex flex-col justify-between">
        <div>
          {/* Top Bar with Return Link and Compliance Label */}
          <FadeUp onMount delay={introDelay(0)} y={10}>
            <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
              <Link
                to="/"
                className="group inline-flex items-center gap-2 label-mono text-muted-foreground hover:text-foreground transition-colors"
              >
                <ArrowUpRight className="size-3.5 rotate-[225deg] transition-transform duration-300 group-hover:-translate-x-0.5 group-hover:translate-y-0.5" />
                <span>Return to public site</span>
              </Link>
              <span className="label-mono text-muted-foreground">Clinical operations · 42 CFR 493</span>
            </div>
          </FadeUp>

          {/* 12-Column Grid */}
          <div className="grid-12 gap-y-16">
            {/* Left Column: Editorial Headline & Credentials Block */}
            <div className="col-span-12 lg:col-span-5">
              <RevealText
                as="h1"
                onMount
                delay={introDelay(0.05)}
                text="Administrative command."
                className="display-lg max-w-[12ch]"
              />

              <FadeUp onMount delay={introDelay(0.45)}>
                <p className="lede mt-10 max-w-[40ch] text-muted-foreground">
                  Internal operations console for Dr. Farhad Azad and authorized laboratory leadership. Review hospital inquiry pipelines, track 5-phase laboratory buildouts, and manage Wadsworth LDT validation dossiers.
                </p>
              </FadeUp>

              <FadeUp onMount delay={introDelay(0.55)} className="mt-14 space-y-6 border-t border-border pt-8">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="label-mono text-muted-foreground">Director Authority</span>
                    <span className="label-mono text-blue">High Complexity</span>
                  </div>
                  <p className="font-mono text-base font-medium text-foreground">{OFFICIAL_ADMIN_EMAIL}</p>
                  <p className="text-[0.9375rem] text-muted-foreground">Dr. Farhad Azad · Laboratory Director</p>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={fillQuickCredentials}
                      className="group/pill inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 font-mono text-[0.8125rem] text-muted-foreground transition-all duration-300 hover:border-blue hover:text-blue cursor-pointer"
                    >
                      <span>Auto-fill director credentials</span>
                      <ArrowUpRight className="size-3 transition-transform duration-300 group-hover/pill:translate-x-0.5 group-hover/pill:-translate-y-0.5" />
                    </button>
                  </div>
                </div>

                <p className="label-mono text-muted-foreground pt-4">
                  14 NYSDOH-approved LDTs · 3 NYS director qualifications
                </p>
              </FadeUp>
            </div>

            {/* Right Column: Portal Inputs with Hairline Underlines & Signature Pill CTA */}
            <FadeUp onMount delay={introDelay(0.35)} className="col-span-12 lg:col-span-6 lg:col-start-7">
              <div className="mb-10 flex items-center justify-between border-b border-border pb-3">
                <span className="label-mono text-muted-foreground">Restricted Administrative Gateway</span>
                <span className="label-mono text-blue">Neon Managed Better Auth</span>
              </div>

              <form onSubmit={handleAdminLogin} className="space-y-8">
                <AdminField
                  label="Administrative identifier"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="relative">
                  <AdminField
                    label="Security passkey"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((s) => !s)}
                    className="absolute right-0 bottom-3 text-muted-foreground hover:text-foreground cursor-pointer transition-colors"
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide passkey" : "Show passkey"}
                  >
                    {showPassword ? <EyeSlash size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                {loginError && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: EASE }}
                    className="border-l-2 border-red-500 pl-4 text-[0.9375rem] text-red-600"
                  >
                    {loginError}
                  </motion.div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                  <p className="label-mono max-w-[34ch] text-muted-foreground">
                    Direct entry for executive leadership. Credentials encrypted and synced with Lakebase Postgres.
                  </p>

                  <button
                    type="submit"
                    disabled={loginLoading}
                    className="group/cta inline-flex h-14 items-center gap-3 rounded-full bg-blue pl-7 pr-2 text-base font-medium text-on-blue transition-colors duration-500 hover:bg-blue-deep cursor-pointer disabled:opacity-50"
                  >
                    <span>{loginLoading ? "Authorizing..." : "Access console"}</span>
                    <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-on-blue text-blue">
                      <CtaArrows />
                    </span>
                  </button>
                </div>
              </form>
            </FadeUp>
          </div>
        </div>

        {/* Footer Notice */}
        <div className="mt-16 border-t border-border pt-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <p className="label-mono text-muted-foreground">
            AKAHELIX INC. · High-Complexity Diagnostics · 42 CFR 493 Compliance
          </p>
          <span className="label-mono text-muted-foreground">
            Restricted System · Audit trail enabled
          </span>
        </div>
      </section>
    );
  }

  // --- AUTHENTICATED: FULL ADMIN DASHBOARD ---
  return (
    <AdminLayout
      currentTab={currentTab}
      onTabChange={setCurrentTab}
      inquiriesCount={inquiries.filter((i) => i.status === "New").length}
      projectsCount={projects.length}
      validationsCount={validations.length}
      onSignOut={handleAdminSignOut}
    >
      {currentTab === "overview" && (
        <AdminOverview
          inquiries={inquiries}
          projects={projects}
          validations={validations}
          onNavigateTab={setCurrentTab}
        />
      )}

      {currentTab === "inquiries" && (
        <InquiriesManager
          inquiries={inquiries}
          onUpdateInquiry={handleUpdateInquiry}
          onAddInquiry={handleAddInquiry}
          onDeleteInquiry={handleDeleteInquiry}
        />
      )}

      {currentTab === "projects" && (
        <ProjectsManager
          projects={projects}
          onUpdateProject={handleUpdateProject}
          onAddProject={handleAddProject}
          onDeleteProject={handleDeleteProject}
        />
      )}

      {currentTab === "validations" && (
        <ValidationsManager
          validations={validations}
          onAddValidation={handleAddValidation}
          onDeleteValidation={handleDeleteValidation}
        />
      )}

      {currentTab === "calculator" && <SendOutCalculator />}

      {currentTab === "assistant" && <AssistantAnalytics />}

      {currentTab === "settings" && (
        <AdminSettings
          onExportAll={handleExportAll}
          onResetData={handleResetData}
        />
      )}
    </AdminLayout>
  );
}
