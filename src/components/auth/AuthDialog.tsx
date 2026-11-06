import { Lock, User, X } from "@phosphor-icons/react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type FormEvent } from "react";

import { EASE } from "@/components/site/motion";
import { authClient } from "@/lib/auth";

interface AuthDialogProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}

export function AuthDialog({ isOpen, onClose, defaultMode = "signup" }: AuthDialogProps) {
  const [mode, setMode] = useState<"signin" | "signup">(defaultMode);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [currentUser, setCurrentUser] = useState<any>(null);

  useEffect(() => {
    if (isOpen) {
      authClient.getSession().then((res: any) => {
        if (res.data?.user) {
          setCurrentUser(res.data.user);
        }
      });
      setError(null);
      setSuccessMessage(null);
    }
  }, [isOpen]);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccessMessage(null);

    try {
      if (mode === "signup") {
        const res: any = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim() || (email.split("@")[0] ?? "User"),
        });

        if (res.error) {
          setError(res.error.message || "Failed to create account.");
          setLoading(false);
          return;
        }

        setSuccessMessage("Account created successfully! Signing in...");
        const sessionRes: any = await authClient.getSession();
        if (sessionRes.data?.user) {
          setCurrentUser(sessionRes.data.user);
        }
      } else {
        const res: any = await authClient.signIn.email({
          email: email.trim(),
          password,
        });

        if (res.error) {
          setError(res.error.message || "Invalid email or password.");
          setLoading(false);
          return;
        }

        setSuccessMessage("Signed in successfully!");
        const sessionRes: any = await authClient.getSession();
        if (sessionRes.data?.user) {
          setCurrentUser(sessionRes.data.user);
        }
      }
    } catch (err: any) {
      setError(err?.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const handleSignOut = async () => {
    setLoading(true);
    try {
      await authClient.signOut();
      setCurrentUser(null);
      setSuccessMessage("Signed out successfully.");
    } catch (err: any) {
      setError(err?.message || "Failed to sign out.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-ink/40 backdrop-blur-xs"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="relative z-10 w-full max-w-md rounded-[4px] border border-border bg-paper p-6 sm:p-8 shadow-2xl text-foreground"
          >
            <div className="flex items-center justify-between border-b border-border pb-4">
              <span className="label-mono text-muted-foreground">
                {currentUser ? "Account Profile" : mode === "signup" ? "New Registration" : "Portal Access"}
              </span>
              <button
                type="button"
                onClick={onClose}
                className="flex size-7 items-center justify-center rounded-[3px] text-muted-foreground hover:bg-mist hover:text-foreground transition-colors cursor-pointer"
              >
                <X size={16} />
              </button>
            </div>

            {currentUser ? (
              <div className="mt-6 space-y-5">
                <div className="flex items-center gap-4 rounded-[3px] bg-mist/60 p-4">
                  <div className="flex size-11 items-center justify-center rounded-[4px] bg-blue text-on-blue font-medium">
                    {currentUser.name ? currentUser.name.slice(0, 2).toUpperCase() : "DR"}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-[0.9375rem] truncate">{currentUser.name || "Laboratory Director"}</p>
                    <p className="font-mono text-[0.75rem] text-muted-foreground truncate">{currentUser.email}</p>
                  </div>
                </div>

                <div className="rounded-[3px] border border-border p-3 space-y-1 font-mono text-[0.6875rem] text-muted-foreground">
                  <div className="flex justify-between">
                    <span>Identity Engine:</span>
                    <span className="text-foreground">Neon Managed Better Auth</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Database:</span>
                    <span className="text-foreground">Lakebase Postgres (neon_auth)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>User ID:</span>
                    <span className="text-foreground truncate max-w-[180px]">{currentUser.id}</span>
                  </div>
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleSignOut}
                    disabled={loading}
                    className="flex-1 rounded-[3px] border border-border bg-paper py-2.5 text-[0.8125rem] font-medium hover:bg-mist transition-colors cursor-pointer disabled:opacity-50"
                  >
                    {loading ? "Signing out..." : "Sign Out"}
                  </button>
                  <button
                    type="button"
                    onClick={onClose}
                    className="flex-1 rounded-[3px] bg-blue py-2.5 text-[0.8125rem] font-medium text-on-blue hover:bg-blue-deep transition-colors cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-4">
                <div className="flex rounded-[3px] bg-mist p-1">
                  <button
                    type="button"
                    onClick={() => { setMode("signup"); setError(null); }}
                    className={`flex-1 rounded-[2px] py-1.5 text-center text-[0.8125rem] font-medium transition-colors cursor-pointer ${
                      mode === "signup" ? "bg-paper text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => { setMode("signin"); setError(null); }}
                    className={`flex-1 rounded-[2px] py-1.5 text-center text-[0.8125rem] font-medium transition-colors cursor-pointer ${
                      mode === "signin" ? "bg-paper text-foreground shadow-xs" : "text-muted-foreground hover:text-foreground"
                    }`}
                  >
                    Sign In
                  </button>
                </div>

                {error && (
                  <div className="rounded-[3px] border border-red-200 bg-red-50 p-3 text-[0.75rem] text-red-700">
                    {error}
                  </div>
                )}

                {successMessage && (
                  <div className="rounded-[3px] border border-emerald-200 bg-emerald-50 p-3 text-[0.75rem] text-emerald-700">
                    {successMessage}
                  </div>
                )}

                {mode === "signup" && (
                  <div>
                    <label className="block text-[0.6875rem] font-mono uppercase text-muted-foreground mb-1">
                      Full Name
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Dr. Farhad Azad"
                        className="w-full rounded-[3px] border border-border bg-background px-3 py-2 text-[0.875rem] focus:border-blue focus:outline-hidden"
                      />
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-[0.6875rem] font-mono uppercase text-muted-foreground mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@hospital.org"
                    className="w-full rounded-[3px] border border-border bg-background px-3 py-2 text-[0.875rem] focus:border-blue focus:outline-hidden"
                  />
                </div>

                <div>
                  <label className="block text-[0.6875rem] font-mono uppercase text-muted-foreground mb-1">
                    Password
                  </label>
                  <input
                    type="password"
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full rounded-[3px] border border-border bg-background px-3 py-2 text-[0.875rem] focus:border-blue focus:outline-hidden"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full rounded-[3px] bg-blue py-2.5 text-[0.8125rem] font-medium text-on-blue hover:bg-blue-deep transition-colors cursor-pointer disabled:opacity-50 mt-2"
                >
                  {loading
                    ? "Processing..."
                    : mode === "signup"
                    ? "Create Account"
                    : "Sign In"}
                </button>

                <p className="text-center font-mono text-[0.6875rem] text-muted-foreground pt-2">
                  Secured by Neon Managed Better Auth & PostgreSQL RLS
                </p>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
