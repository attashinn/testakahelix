import {
  ArrowSquareOut,
  Briefcase,
  Buildings,
  Calculator,
  CaretLeft,
  CaretRight,
  ChartLineUp,
  ChatCircleDots,
  CheckCircle,
  Flask,
  GearSix,
  SignOut,
  Sparkle,
  User,
} from "@phosphor-icons/react";
import { Link } from "@tanstack/react-router";
import { motion } from "motion/react";

import { Mark } from "@/components/site/Wordmark";
import { company } from "@/content/site";
import { cn } from "@/lib/utils";
import { type AdminTab } from "./AdminLayout";

interface AdminSidebarProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  collapsed: boolean;
  onToggleCollapse: () => void;
  inquiriesCount?: number | undefined;
  projectsCount?: number | undefined;
  validationsCount?: number | undefined;
  onSignOut?: (() => void) | undefined;
}

export function AdminSidebar({
  currentTab,
  onTabChange,
  collapsed,
  onToggleCollapse,
  inquiriesCount = 5,
  projectsCount = 4,
  validationsCount = 14,
  onSignOut,
}: AdminSidebarProps) {
  const mainNav = [
    {
      id: "overview" as AdminTab,
      label: "Overview",
      monoLabel: "01",
      icon: ChartLineUp,
      badge: null,
    },
    {
      id: "inquiries" as AdminTab,
      label: "Inbound Inquiries",
      monoLabel: "02",
      icon: Buildings,
      badge: inquiriesCount,
    },
    {
      id: "projects" as AdminTab,
      label: "Lab Set-Up Projects",
      monoLabel: "03",
      icon: Briefcase,
      badge: projectsCount,
    },
    {
      id: "validations" as AdminTab,
      label: "Wadsworth LDTs",
      monoLabel: "04",
      icon: Flask,
      badge: validationsCount,
    },
    {
      id: "calculator" as AdminTab,
      label: "Send-Out Financials",
      monoLabel: "05",
      icon: Calculator,
      badge: "ROI",
    },
  ];

  const systemNav = [
    {
      id: "assistant" as AdminTab,
      label: "AI Scoping Logs",
      monoLabel: "06",
      icon: ChatCircleDots,
      badge: "Live",
    },
    {
      id: "settings" as AdminTab,
      label: "Director Credentials",
      monoLabel: "07",
      icon: GearSix,
      badge: null,
    },
  ];

  return (
    <aside
      className={cn(
        "relative flex flex-col justify-between border-r border-border bg-paper transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] select-none shrink-0",
        collapsed ? "w-16" : "w-64",
      )}
    >
      {/* Top Header / Brand */}
      <div>
        <div className="flex h-16 items-center justify-between border-b border-border px-4">
          <Link
            to="/"
            className={cn(
              "flex items-center gap-2.5 overflow-hidden transition-opacity hover:opacity-85",
              collapsed && "justify-center",
            )}
            title="Return to Public Site"
          >
            <Mark className="size-7 rounded-[4px] shrink-0" />
            {!collapsed && (
              <div className="flex flex-col">
                <span className="font-sans text-[0.9375rem] font-medium tracking-[-0.03em] text-foreground leading-none">
                  {company.name}
                </span>
                <span className="label-mono mt-1 text-[0.625rem] text-muted-foreground">
                  Admin Console
                </span>
              </div>
            )}
          </Link>

          <button
            type="button"
            onClick={onToggleCollapse}
            aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            className="hidden lg:flex size-6 items-center justify-center rounded-[3px] text-muted-foreground transition-colors hover:bg-mist hover:text-foreground cursor-pointer"
          >
            {collapsed ? <CaretRight size={13} /> : <CaretLeft size={13} />}
          </button>
        </div>

        {/* Navigation list */}
        <div className="px-2.5 py-4 space-y-6">
          {/* Main Group */}
          <div>
            {!collapsed && (
              <span className="label-mono px-2 text-[0.625rem] text-muted-foreground/80 tracking-wider">
                Clinical Operations
              </span>
            )}
            <nav className="mt-1.5 space-y-1">
              {mainNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-[4px] px-2.5 py-2 text-left text-[0.8125rem] transition-colors cursor-pointer",
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:bg-mist/70 hover:text-foreground",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="absolute inset-0 rounded-[4px] bg-mist"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <Icon
                      size={17}
                      weight={isActive ? "bold" : "regular"}
                      className={cn(
                        "relative z-10 transition-colors shrink-0",
                        isActive ? "text-blue" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />

                    {!collapsed && (
                      <span className="relative z-10 flex-1 truncate">{item.label}</span>
                    )}

                    {!collapsed && item.badge !== null && (
                      <span
                        className={cn(
                          "relative z-10 rounded-[3px] px-1.5 py-0.2 font-mono text-[0.625rem] font-medium tracking-tight",
                          isActive
                            ? "bg-blue/10 text-blue"
                            : "bg-mist-deep/60 text-muted-foreground",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Intelligence & Director Settings */}
          <div>
            {!collapsed && (
              <span className="label-mono px-2 text-[0.625rem] text-muted-foreground/80 tracking-wider">
                Intelligence & Compliance
              </span>
            )}
            <nav className="mt-1.5 space-y-1">
              {systemNav.map((item) => {
                const Icon = item.icon;
                const isActive = currentTab === item.id;
                return (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => onTabChange(item.id)}
                    title={collapsed ? item.label : undefined}
                    className={cn(
                      "group relative flex w-full items-center gap-3 rounded-[4px] px-2.5 py-2 text-left text-[0.8125rem] transition-colors cursor-pointer",
                      isActive
                        ? "text-foreground font-medium"
                        : "text-muted-foreground hover:bg-mist/70 hover:text-foreground",
                      collapsed && "justify-center px-0",
                    )}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="active-sidebar-pill"
                        className="absolute inset-0 rounded-[4px] bg-mist"
                        transition={{ type: "spring", stiffness: 350, damping: 30 }}
                      />
                    )}

                    <Icon
                      size={17}
                      weight={isActive ? "bold" : "regular"}
                      className={cn(
                        "relative z-10 transition-colors shrink-0",
                        isActive ? "text-blue" : "text-muted-foreground group-hover:text-foreground",
                      )}
                    />

                    {!collapsed && (
                      <span className="relative z-10 flex-1 truncate">{item.label}</span>
                    )}

                    {!collapsed && item.badge !== null && (
                      <span
                        className={cn(
                          "relative z-10 rounded-[3px] px-1.5 py-0.2 font-mono text-[0.625rem] font-medium tracking-tight",
                          isActive
                            ? "bg-emerald-100 text-emerald-800"
                            : "bg-mist-deep/60 text-muted-foreground",
                        )}
                      >
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>
          </div>
        </div>
      </div>

      {/* Bottom Footer / Profile & Public site link */}
      <div className="border-t border-border p-3 space-y-2">
        <Link
          to="/"
          className={cn(
            "flex items-center gap-2.5 rounded-[4px] px-2.5 py-2 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-mist hover:text-blue",
            collapsed && "justify-center px-0",
          )}
          title="Return to Public Website"
        >
          <ArrowSquareOut size={16} className="shrink-0" />
          {!collapsed && <span>Public Website</span>}
        </Link>

        {onSignOut && (
          <button
            type="button"
            onClick={onSignOut}
            className={cn(
              "flex w-full items-center gap-2.5 rounded-[4px] px-2.5 py-1.5 text-[0.8125rem] text-muted-foreground transition-colors hover:bg-red-50 hover:text-red-700 cursor-pointer",
              collapsed && "justify-center px-0",
            )}
            title="Sign Out of Admin Console"
          >
            <SignOut size={16} className="shrink-0" />
            {!collapsed && <span>Sign Out</span>}
          </button>
        )}

        <div
          className={cn(
            "flex items-center gap-2.5 rounded-[4px] bg-mist/50 p-2 text-left",
            collapsed && "justify-center p-1.5",
          )}
        >
          <div className="flex size-7 items-center justify-center rounded-[3px] bg-blue text-on-blue shrink-0">
            <span className="font-mono text-[0.6875rem] font-semibold">AZ</span>
          </div>
          {!collapsed && (
            <div className="flex-1 truncate">
              <span className="block truncate text-[0.78125rem] font-medium text-foreground leading-tight">
                Dr. A. K. Azad
              </span>
              <span className="block truncate font-mono text-[0.625rem] text-muted-foreground">
                NYS CLEP CQ Director
              </span>
            </div>
          )}
        </div>
      </div>
    </aside>
  );
}
