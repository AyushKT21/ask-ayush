import type { ReactNode } from "react";

import { AppLayoutShell } from "@/components/layout/AppLayoutShell";
import type { ContextType } from "@/components/context/ContextPanel";

type RecentChatItem = {
  id: string;
  title: string;
};

type AppLayoutProps = {
  children: ReactNode;
  context?: ReactNode;
  activeContext?: ContextType;
  recentChats?: RecentChatItem[];
  activeChatId?: string | null;
  onDeleteChatRequest?: (chatId: string) => void;
};

export function AppLayout(props: AppLayoutProps) {
  return <AppLayoutShell {...props} />;
}
