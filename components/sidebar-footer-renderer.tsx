"use client";

import * as React from "react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Badge } from "@/components/ui/badge";
import { NavUser } from "@/components/nav-user";
import type { SidebarFooterConfig } from "@/config/navigation.config";
import { Circle, BookOpen } from "@phosphor-icons/react";

export function SidebarFooterRenderer({ config }: { config: SidebarFooterConfig }) {
  if (config.type === "none") {
    return null;
  }

  if (config.type === "user") {
    return (
      <NavUser
        user={{
          name: config.user.name,
          email: config.user.email || "operator@local.internal",
          avatar: config.user.avatar || "/avatars/avatar.jpg",
        }}
      />
    );
  }

  if (config.type === "actions") {
    return (
      <div className="flex items-center justify-between p-2 rounded-lg bg-sidebar-accent/40 border border-sidebar-border/50">
        <span className="text-xs font-mono text-muted-foreground">Appearance</span>
        {config.showThemeToggle !== false && <ThemeToggle />}
        {config.customNode}
      </div>
    );
  }

  // Default: System / Local Engine Status Dock
  return (
    <div className="flex flex-col gap-2 p-2.5 rounded-xl bg-sidebar-accent/30 border border-sidebar-border/60 text-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-mono text-[11px] text-foreground">
          <Circle className="size-2 fill-emerald-500 text-emerald-500 animate-pulse" />
          <span className="font-medium">{config.statusText ?? "SQLite WAL"}</span>
        </div>
        <Badge variant="outline" className="font-mono text-[10px] py-0 px-1.5 h-4 border-sidebar-border">
          {config.version ?? "v0.1.0"}
        </Badge>
      </div>

      <div className="flex items-center justify-between text-[11px] text-muted-foreground pt-1 border-t border-sidebar-border/40">
        <span className="truncate">{config.modeText ?? "Local-First"}</span>
        <div className="flex items-center gap-1.5">
          {config.showThemeToggle !== false && <ThemeToggle />}
          {config.docsUrl && (
            <a
              href={config.docsUrl}
              target="_blank"
              rel="noreferrer"
              className="hover:text-foreground transition-colors inline-flex items-center gap-0.5"
              title="Documentation"
            >
              <BookOpen className="size-3" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
