import type { LucideIcon } from "lucide-react";
import {
  BriefcaseBusiness,
  FileText,
  FolderGit2,
  Mail,
  MessageSquare,
  Plus,
  Sparkles,
  User,
  Wrench,
  X,
} from "lucide-react";
import Link from "next/link";

import type { ContextType } from "@/components/context/ContextPanel";
import { buttonVariants } from "@/components/ui/Button";
import { cn } from "@/utils/cn";

type NavigationItem = {
  label: string;
  href: string;
  icon: LucideIcon;
  context?: ContextType;
};

type RecentChatItem = {
  id: string;
  title: string;
};

const navigation: NavigationItem[] = [
  {
    label: "Ask Ayush",
    href: "/",
    icon: MessageSquare,
    context: "empty",
  },
  {
    label: "About Me",
    href: "/?context=about",
    icon: User,
    context: "about",
  },
  {
    label: "Projects",
    href: "/?context=projects",
    icon: FolderGit2,
    context: "projects",
  },
  {
    label: "Experience",
    href: "/?context=experience",
    icon: BriefcaseBusiness,
    context: "experience",
  },
  {
    label: "Skills",
    href: "/?context=skills",
    icon: Wrench,
    context: "skills",
  },
  {
    label: "Resume",
    href: "/?context=resume",
    icon: FileText,
    context: "resume",
  },
  {
    label: "GitHub",
    href: "https://github.com",
    icon: FolderGit2,
  },
  {
    label: "Contact",
    href: "/?context=contact",
    icon: Mail,
    context: "contact",
  },
];

type SidebarProps = {
  activeContext?: ContextType;
  recentChats?: RecentChatItem[];
  activeChatId?: string | null;
  className?: string;
  onNavigate?: () => void;
  onDeleteChatRequest?: (chatId: string) => void;
};

export function Sidebar({
  activeContext = "empty",
  recentChats = [],
  activeChatId = null,
  className,
  onNavigate,
  onDeleteChatRequest,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full w-[var(--sidebar-width)] flex-col",
        "border-r border-[var(--border)]",
        "bg-[var(--surface)]",
        className,
      )}
    >
      <div className="border-b border-[var(--border)] p-5">
        <Link href="/" className="flex items-center gap-3" onClick={onNavigate}>
          <div
            className={cn(
              "flex h-11 w-11 items-center justify-center",
              "rounded-xl bg-gradient-to-br from-[var(--primary)] to-blue-500",
              "font-bold text-lg text-white shadow-md",
            )}
          >
            AY
          </div>

          <div>
            <h1 className="flex items-center gap-1.5 font-semibold text-[var(--foreground)]">
              Ayush AI
              <Sparkles className="h-3.5 w-3.5 text-[var(--primary)]" />
            </h1>
            <p className="text-xs text-[var(--muted-foreground)]">
              AI Portfolio
            </p>
          </div>
        </Link>
      </div>

      <div className="space-y-4 p-4">
        <Link
          href="/?new=1"
          onClick={onNavigate}
          className={cn(
            buttonVariants({ variant: "primary" }),
            "w-full justify-center shadow-md shadow-[rgb(124_92_252/0.25)]",
          )}
        >
          <Plus className="h-4 w-4" />
          New Chat
          <span className="ml-auto text-xs opacity-70">⌘ K</span>
        </Link>

        {recentChats.length > 0 && (
          <div className="space-y-2">
            <p className="px-1 text-[10px] font-semibold uppercase tracking-wider text-[var(--text-muted)]">
              Recent chats
            </p>

            <div className="space-y-1">
              {recentChats.map((chat) => {
                const isActive = chat.id === activeChatId;

                return (
                  <div
                    key={chat.id}
                    className={cn(
                      "group flex items-center gap-1 rounded-lg pr-1",
                      isActive && "bg-[var(--primary)]/12",
                    )}
                  >
                    <Link
                      href={`/?chat=${chat.id}`}
                      onClick={onNavigate}
                      className={cn(
                        "flex min-w-0 flex-1 items-center gap-2 rounded-lg px-3 py-2",
                        "text-sm transition-colors",
                        isActive
                          ? "text-[var(--primary)]"
                          : "text-[var(--muted-foreground)] hover:text-[var(--foreground)]",
                      )}
                    >
                      <MessageSquare className="h-3.5 w-3.5 shrink-0" />
                      <span className="truncate">{chat.title}</span>
                    </Link>

                    {onDeleteChatRequest && (
                      <button
                        type="button"
                        aria-label={`Delete chat ${chat.title}`}
                        className={cn(
                          "flex h-8 w-8 shrink-0 items-center justify-center rounded-md",
                          "text-[var(--muted-foreground)] opacity-100 transition-opacity",
                          "hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
                          "lg:opacity-0 lg:group-hover:opacity-100 lg:focus-visible:opacity-100",
                        )}
                        onClick={(event) => {
                          event.preventDefault();
                          onDeleteChatRequest(chat.id);
                        }}
                      >
                        <X className="h-3.5 w-3.5" />
                      </button>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <nav
        aria-label="Primary Navigation"
        className="flex-1 space-y-1 overflow-y-auto border-t border-[var(--border)] p-3"
      >
        {navigation.map((item) => {
          const Icon = item.icon;
          const isExternal = item.href.startsWith("http");
          const isActive =
            !isExternal &&
            (item.context ?? "empty") === activeContext &&
            !activeChatId;

          const linkClassName = cn(
            "flex items-center gap-3 rounded-lg px-3 py-2.5",
            "text-sm font-medium transition-colors",
            isActive
              ? "bg-[var(--primary)]/12 text-[var(--primary)]"
              : "text-[var(--muted-foreground)] hover:bg-[var(--accent)] hover:text-[var(--foreground)]",
          );

          if (isExternal) {
            return (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className={linkClassName}
              >
                <Icon className="h-4 w-4 shrink-0" />
                <span>{item.label}</span>
              </a>
            );
          }

          return (
            <Link
              key={item.label}
              href={item.href}
              onClick={onNavigate}
              className={linkClassName}
            >
              <Icon className="h-4 w-4 shrink-0" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
