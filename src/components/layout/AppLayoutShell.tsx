"use client";

import * as React from "react";
import { X } from "lucide-react";

import { Sidebar } from "@/components/layout/Sidebar";
import { Topbar } from "@/components/layout/Topbar";
import type { ContextType } from "@/components/context/ContextPanel";
import { cn } from "@/utils/cn";

type RecentChatItem = {
  id: string;
  title: string;
};

type AppLayoutShellProps = {
  children: React.ReactNode;
  context?: React.ReactNode;
  activeContext?: ContextType;
  recentChats?: RecentChatItem[];
  activeChatId?: string | null;
  onDeleteChatRequest?: (chatId: string) => void;
};

export function AppLayoutShell({
  children,
  context,
  activeContext = "empty",
  recentChats = [],
  activeChatId = null,
  onDeleteChatRequest,
}: AppLayoutShellProps) {
  const [mobileNavOpen, setMobileNavOpen] = React.useState(false);

  React.useEffect(() => {
    setMobileNavOpen(false);
  }, [activeChatId, activeContext]);

  return (
    <div className={cn("flex h-screen min-h-0", "bg-[var(--background)]")}>
      <Sidebar
        className="hidden lg:flex"
        activeContext={activeContext}
        recentChats={recentChats}
        activeChatId={activeChatId}
        onNavigate={() => setMobileNavOpen(false)}
        onDeleteChatRequest={onDeleteChatRequest}
      />

      {mobileNavOpen && (
        <div className="fixed inset-0 z-[var(--z-modal)] lg:hidden">
          <button
            type="button"
            aria-label="Close navigation"
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileNavOpen(false)}
          />

          <div className="relative h-full w-[min(100%,var(--sidebar-width))] shadow-xl">
            <Sidebar
              className="flex h-full"
              activeContext={activeContext}
              recentChats={recentChats}
              activeChatId={activeChatId}
              onNavigate={() => setMobileNavOpen(false)}
              onDeleteChatRequest={onDeleteChatRequest}
            />

            <button
              type="button"
              aria-label="Close menu"
              className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)]"
              onClick={() => setMobileNavOpen(false)}
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Topbar onMenuClick={() => setMobileNavOpen(true)} />

        <main className="flex min-h-0 flex-1 flex-col overflow-hidden lg:flex-row">
          <section className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
            {children}
          </section>

          {context && (
            <aside
              className={cn(
                "min-h-0 shrink-0 overflow-y-auto",
                "border-t border-[var(--border)] bg-[var(--surface)]",
                "max-h-[42vh] w-full lg:max-h-none lg:w-96 lg:border-l lg:border-t-0",
              )}
            >
              {context}
            </aside>
          )}
        </main>
      </div>
    </div>
  );
}
