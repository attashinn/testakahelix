import { useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";

import { AdminHeader } from "./AdminHeader";
import { AdminSidebar } from "./AdminSidebar";

export type AdminTab =
  | "overview"
  | "inquiries"
  | "projects"
  | "validations"
  | "calculator"
  | "assistant"
  | "settings";

interface AdminLayoutProps {
  currentTab: AdminTab;
  onTabChange: (tab: AdminTab) => void;
  children: ReactNode;
  inquiriesCount?: number | undefined;
  projectsCount?: number | undefined;
  validationsCount?: number | undefined;
  onOpenNewInquiry?: (() => void) | undefined;
  onSignOut?: (() => void) | undefined;
}

export function AdminLayout({
  currentTab,
  onTabChange,
  children,
  inquiriesCount,
  projectsCount,
  validationsCount,
  onOpenNewInquiry,
  onSignOut,
}: AdminLayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen bg-[#fafafa] text-ink antialiased">
      {/* Sleek Vertical Sidebar */}
      <AdminSidebar
        currentTab={currentTab}
        onTabChange={onTabChange}
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((c) => !c)}
        inquiriesCount={inquiriesCount}
        projectsCount={projectsCount}
        validationsCount={validationsCount}
        onSignOut={onSignOut}
      />

      {/* Main Content Viewport */}
      <div className="flex flex-1 flex-col overflow-x-hidden min-w-0">
        <AdminHeader
          currentTab={currentTab}
          onOpenNewInquiry={currentTab === "inquiries" ? onOpenNewInquiry : undefined}
        />

        <main className="flex-1 p-6 md:p-8 max-w-[1400px] w-full mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentTab}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
