import { ArrowUpRight, EnvelopeSimple, MapPin } from "@phosphor-icons/react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";

import { CtaArrows } from "@/components/site/Cta";
import { EASE, FadeUp, RevealText, introDelay } from "@/components/site/motion";
import { company } from "@/content/site";
import { getStoredInquiries, saveStoredInquiries, type Inquiry } from "@/lib/admin-data";
import { authClient } from "@/lib/auth";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/sign-in")({
  head: () => ({
    meta: [
      { title: "Sign in — AKAHELIX Client Portal" },
      {
        name: "description",
        content:
          "Sign in to access your laboratory validation dossiers, send-out economic models, and regulatory filings. Or request institutional access.",
      },
      { property: "og:title", content: "Sign in — AKAHELIX" },
      { property: "og:type", content: "website" },
    ],
  }),
  component: SignInPage,
});

const scopes = [
  "Bring send-outs in-house",
  "Laboratory design & buildout",
  "Assay validation & NYS LDT",
  "Inspection readiness (CAP / CLIA)",
  "Sign-out & interpretation training",
];

function Field({
  label,
  name,
  type = "text",
  required,
  textarea,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  textarea?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
}) {
  const cls =
    "peer w-full border-0 border-b border-border bg-transparent pb-3 pt-7 text-lg tracking-[-0.01em] outline-none transition-colors placeholder:text-transparent focus:border-blue";
  return (
    <label className="group relative block">
      {textarea ? (
        <textarea
          name={name}
          required={required}
          rows={4}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={cn(cls, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          required={required}
          value={value}
          onChange={onChange}
          placeholder={label}
          className={cls}
        />
      )}
      <span className="label-mono pointer-events-none absolute left-0 top-1 text-muted-foreground transition-colors peer-focus:text-foreground">
        {label}
        {required && " *"}
      </span>
      <span className="pointer-events-none absolute bottom-0 left-0 h-px w-full origin-left scale-x-0 bg-blue transition-transform duration-700 ease-out-expo peer-focus:scale-x-100" />
    </label>
  );
}

function SignInPage() {
  const [mode, setMode] = useState<"signin" | "signup" | "request">("signin");
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Form Inputs
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Request Access inputs
  const [org, setOrg] = useState("");
  const [pickedScope, setPickedScope] = useState<string[]>([scopes[0]!]);
  const [details, setDetails] = useState("");
  const [requestRef, setRequestRef] = useState<string | null>(null);

  useEffect(() => {
    authClient.getSession().then((res: any) => {
      if (res.data?.user) {
        setCurrentUser(res.data.user);
      }
    });
  }, []);

  const handleSignIn = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res: any = await authClient.signIn.email({
        email: email.trim(),
        password,
      });

      if (res.error) {
        setErrorMessage(res.error.message || "Invalid credentials. Please verify your institutional email and password.");
        setLoading(false);
        return;
      }

      const sessionRes: any = await authClient.getSession();
      if (sessionRes.data?.user) {
        setCurrentUser(sessionRes.data.user);
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Authentication failed. Please verify your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignUp = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      const res: any = await authClient.signUp.email({
        email: email.trim(),
        password,
        name: name.trim() || "Laboratory Partner",
      });

      if (res.error) {
        setErrorMessage(res.error.message || "Sign up could not be completed. Please check your credentials.");
        setLoading(false);
        return;
      }

      const sessionRes: any = await authClient.getSession();
      if (sessionRes.data?.user) {
        setCurrentUser(sessionRes.data.user);
      } else if (res.data?.user) {
        setCurrentUser(res.data.user);
      } else {
        setSuccessMessage("Account created successfully. You can now sign in.");
        setMode("signin");
      }
    } catch (err: any) {
      setErrorMessage(err?.message || "Registration failed. Please check your network connection.");
    } finally {
      setLoading(false);
    }
  };

  const handleRequestAccess = (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    const ref = `INQ-2026-${Math.floor(1000 + Math.random() * 9000)}`;

    const newInquiry: Inquiry = {
      id: `inq-${Date.now()}`,
      client: org.trim() || "Hospital Partner",
      institutionType: "Hospital System",
      contactPerson: name.trim(),
      email: email.trim(),
      phone: "Not provided",
      projectScope: pickedScope.join(", ") || scopes[0]!,
      testVolume: "To be determined",
      estimatedAnnualSavings: "Pending audit",
      status: "New",
      date: new Date().toISOString().split("T")[0] ?? "2026-11-06",
      notes: `${details.trim() ? details.trim() + " · " : ""}Direct public institutional request. Reference: ${ref}`,
      targetAccreditation: ["CLIA", "CAP", "NYSDOH"],
    };

    const existing = getStoredInquiries();
    saveStoredInquiries([newInquiry, ...existing]);

    setRequestRef(ref);
    setLoading(false);
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  };

  const getPageTitle = () => {
    if (mode === "signin") return "Sign in to your laboratory.";
    if (mode === "signup") return "Register your laboratory.";
    return "Request institutional access.";
  };

  const getPageLede = () => {
    if (mode === "signin") {
      return "Access your validation dossiers, floor plans, send-out models and regulatory filings. Built to pass New York State (Wadsworth) and CAP review.";
    }
    if (mode === "signup") {
      return "Create an institutional account to collaborate on assay validations, inspect floor plans, and access cost models.";
    }
    return "Tell us what you test today and what you want to test tomorrow. Our clinical team reviews institutional access requests within one business day.";
  };

  return (
    <section className="container-x pb-24 pt-32 md:pb-36 md:pt-44">
      <FadeUp onMount delay={introDelay(0)} y={10}>
        <div className="mb-8 flex items-center justify-between border-b border-border pb-4">
          <p className="label-mono text-muted-foreground">Portal · Laboratory genetics</p>
          <span className="label-mono text-muted-foreground">Est. 2026</span>
        </div>
      </FadeUp>

      <div className="grid-12 gap-y-16">
        {/* Left Column: Editorial context & contact */}
        <div className="col-span-12 lg:col-span-5">
          <RevealText
            as="h1"
            onMount
            delay={introDelay(0.05)}
            text={getPageTitle()}
            className="display-lg max-w-[12ch]"
          />

          <FadeUp onMount delay={introDelay(0.45)}>
            <p className="lede mt-10 max-w-[40ch] text-muted-foreground">
              {getPageLede()}
            </p>
          </FadeUp>

          <FadeUp onMount delay={introDelay(0.55)} className="mt-14 space-y-5 border-t border-border pt-8">
            <a href={`mailto:${company.email}`} className="group flex items-center gap-4">
              <EnvelopeSimple weight="light" className="size-5" />
              <span className="link-draw text-lg">{company.email}</span>
            </a>
            <p className="flex items-center gap-4">
              <MapPin weight="light" className="size-5" />
              <span className="text-lg">{company.legal} · {company.city}</span>
            </p>
            <p className="label-mono text-muted-foreground pt-4">
              14 NYSDOH-approved LDTs · 3 NYS director qualifications
            </p>
          </FadeUp>
        </div>

        {/* Right Column: Portal forms */}
        <FadeUp onMount delay={introDelay(0.35)} className="col-span-12 lg:col-span-6 lg:col-start-7">
          {/* Mode Switcher Buttons */}
          <div className="flex flex-wrap gap-2 mb-10">
            <button
              type="button"
              onClick={() => {
                setMode("signin");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={cn(
                "rounded-full border px-5 py-2 text-[0.875rem] transition-all duration-300 cursor-pointer",
                mode === "signin" ? "border-blue bg-blue text-on-blue" : "border-border hover:border-foreground",
              )}
            >
              Sign in
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("signup");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={cn(
                "rounded-full border px-5 py-2 text-[0.875rem] transition-all duration-300 cursor-pointer",
                mode === "signup" ? "border-blue bg-blue text-on-blue" : "border-border hover:border-foreground",
              )}
            >
              Create account
            </button>
            <button
              type="button"
              onClick={() => {
                setMode("request");
                setErrorMessage(null);
                setSuccessMessage(null);
              }}
              className={cn(
                "rounded-full border px-5 py-2 text-[0.875rem] transition-all duration-300 cursor-pointer",
                mode === "request" ? "border-blue bg-blue text-on-blue" : "border-border hover:border-foreground",
              )}
            >
              Request access
            </button>
          </div>

          {/* SIGNED IN VIEW */}
          {currentUser ? (
            <div className="space-y-8">
              <div className="border-t border-border pt-6">
                <p className="label-mono text-muted-foreground mb-2">Signed in as</p>
                <p className="font-display text-3xl tracking-tight text-foreground">{currentUser.name || "Laboratory Partner"}</p>
                <p className="font-mono text-[0.9375rem] text-muted-foreground mt-1">{currentUser.email}</p>
              </div>

              <div className="border-t border-border pt-6 space-y-2 font-mono text-[0.8125rem] text-muted-foreground">
                <p>Status: <span className="text-blue">Authenticated</span></p>
                <p>Identity: Neon Managed Better Auth</p>
                <p>Database: Lakebase Postgres (neon_auth)</p>
              </div>

              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link
                  to="/services"
                  className="group/cta inline-flex h-14 items-center gap-3 rounded-full bg-blue pl-7 pr-2 text-base font-medium text-on-blue transition-colors duration-500 hover:bg-blue-deep"
                >
                  <span>Explore services</span>
                  <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-on-blue text-blue">
                    <CtaArrows />
                  </span>
                </Link>

                <button
                  type="button"
                  onClick={handleSignOut}
                  disabled={loading}
                  className="rounded-full border border-border px-6 py-4 text-[0.9375rem] font-medium transition-colors hover:border-foreground cursor-pointer disabled:opacity-50"
                >
                  {loading ? "Signing out..." : "Sign out"}
                </button>
              </div>
            </div>
          ) : (
            <>
              {/* NOTIFICATION MESSAGES */}
              {errorMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mb-8 border-l-2 border-red-500 pl-4 text-[0.9375rem] text-red-600"
                >
                  {errorMessage}
                </motion.div>
              )}

              {successMessage && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="mb-8 border-l-2 border-blue pl-4 text-[0.9375rem] text-blue"
                >
                  {successMessage}
                </motion.div>
              )}

              {/* 1. SIGN IN FORM */}
              {mode === "signin" && (
                <form onSubmit={handleSignIn} className="space-y-8">
                  <Field
                    label="Institutional email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Field
                    label="Password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                    <p className="label-mono max-w-[34ch] text-muted-foreground">
                      Protected by Neon Managed Better Auth. Encrypted credentials synced to Lakebase Postgres.
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group/cta inline-flex h-14 items-center gap-3 rounded-full bg-blue pl-7 pr-2 text-base font-medium text-on-blue transition-colors duration-500 hover:bg-blue-deep cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? "Authenticating..." : "Sign in to portal"}</span>
                      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-on-blue text-blue">
                        <CtaArrows />
                      </span>
                    </button>
                  </div>
                </form>
              )}

              {/* 2. SIGN UP FORM */}
              {mode === "signup" && (
                <form onSubmit={handleSignUp} className="space-y-8">
                  <Field
                    label="Your full name"
                    name="name"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />

                  <Field
                    label="Institutional email"
                    name="email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <Field
                    label="Choose password"
                    name="password"
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                    <p className="label-mono max-w-[34ch] text-muted-foreground">
                      Instant setup. User account provisioned automatically in Neon Managed Better Auth.
                    </p>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group/cta inline-flex h-14 items-center gap-3 rounded-full bg-blue pl-7 pr-2 text-base font-medium text-on-blue transition-colors duration-500 hover:bg-blue-deep cursor-pointer disabled:opacity-50"
                    >
                      <span>{loading ? "Creating..." : "Create account"}</span>
                      <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-on-blue text-blue">
                        <CtaArrows />
                      </span>
                    </button>
                  </div>
                </form>
              )}

              {/* 3. REQUEST ACCESS FORM */}
              {mode === "request" && (
                <div>
                  {requestRef ? (
                    <div className="space-y-8 border-t border-border pt-6">
                      <div>
                        <p className="label-mono text-muted-foreground mb-2">Request submitted</p>
                        <p className="font-display text-3xl tracking-tight text-foreground">Reference {requestRef}</p>
                        <p className="mt-4 max-w-[48ch] text-[0.9375rem] leading-relaxed text-muted-foreground">
                          Your institutional details have been entered into our inquiry queue. Dr. Farhad Azad reviews
                          laboratory requirements and reaches out within one business day.
                        </p>
                      </div>

                      <button
                        type="button"
                        onClick={() => {
                          setRequestRef(null);
                          setMode("signin");
                        }}
                        className="group/cta inline-flex h-14 items-center gap-3 rounded-full bg-blue pl-7 pr-2 text-base font-medium text-on-blue transition-colors duration-500 hover:bg-blue-deep cursor-pointer"
                      >
                        <span>Back to sign in</span>
                        <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-on-blue text-blue">
                          <CtaArrows />
                        </span>
                      </button>
                    </div>
                  ) : (
                    <form onSubmit={handleRequestAccess} className="space-y-8">
                      <div className="grid gap-8 md:grid-cols-2">
                        <Field
                          label="Your name"
                          name="name"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                        />
                        <Field
                          label="Institutional email"
                          name="email"
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>

                      <Field
                        label="Organisation / hospital / laboratory"
                        name="organisation"
                        required
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                      />

                      <fieldset>
                        <legend className="label-mono mb-4 text-muted-foreground">Clinical scope needed</legend>
                        <div className="flex flex-wrap gap-2">
                          {scopes.map((s) => {
                            const on = pickedScope.includes(s);
                            return (
                              <button
                                key={s}
                                type="button"
                                aria-pressed={on}
                                onClick={() =>
                                  setPickedScope((p) => (on ? p.filter((x) => x !== s) : [...p, s]))
                                }
                                className={cn(
                                  "rounded-full border px-4 py-2 text-[0.875rem] transition-all duration-300 cursor-pointer",
                                  on ? "border-blue bg-blue text-on-blue" : "border-border hover:border-foreground",
                                )}
                              >
                                {s}
                              </button>
                            );
                          })}
                        </div>
                      </fieldset>

                      <Field
                        label="What you test today, volumes, or target permit date"
                        name="message"
                        textarea
                        value={details}
                        onChange={(e) => setDetails(e.target.value)}
                      />

                      <div className="flex flex-wrap items-center justify-between gap-6 pt-4">
                        <p className="label-mono max-w-[34ch] text-muted-foreground">
                          Requests go directly to the director's clinical desk. We will never share your details.
                        </p>

                        <button
                          type="submit"
                          disabled={loading}
                          className="group/cta inline-flex h-14 items-center gap-3 rounded-full bg-blue pl-7 pr-2 text-base font-medium text-on-blue transition-colors duration-500 hover:bg-blue-deep cursor-pointer disabled:opacity-50"
                        >
                          <span>{loading ? "Submitting..." : "Send access request"}</span>
                          <span className="relative flex size-9 items-center justify-center overflow-hidden rounded-full bg-on-blue text-blue">
                            <CtaArrows />
                          </span>
                        </button>
                      </div>
                    </form>
                  )}
                </div>
              )}
            </>
          )}
        </FadeUp>
      </div>
    </section>
  );
}
