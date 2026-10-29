"use client";

import * as React from "react";
import Link from "next/link";
import { NavMain } from "@/components/nav-main";
import { SidebarFooterRenderer } from "@/components/sidebar-footer-renderer";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import {
  defaultNavigationConfig,
  type AppNavigationConfig,
} from "@/config/navigation.config";
import { Terminal } from "@phosphor-icons/react";

export interface AppSidebarProps extends React.ComponentProps<typeof Sidebar> {
  config?: AppNavigationConfig;
}

export function AppSidebar({
  config = defaultNavigationConfig,
  ...props
}: AppSidebarProps) {
  return (
    <Sidebar variant="inset" {...props}>
      {/* Brand Header */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={config.brand.href} scroll={false}>
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground shadow-xs">
                  <Terminal className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold tracking-tight text-foreground font-heading">
                    {config.brand.name}
                  </span>
                  {config.brand.subtitle && (
                    <span className="truncate text-xs font-mono text-muted-foreground">
                      {config.brand.subtitle}
                    </span>
                  )}
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* Main Content: Strictly Project and Library groups */}
      <SidebarContent>
        <NavMain sections={config.sections} />
      </SidebarContent>

      {/* Modular Single-Operator Footer Dock */}
      {config.footer && config.footer.type !== "none" && (
        <SidebarFooter>
          <SidebarFooterRenderer config={config.footer} />
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
