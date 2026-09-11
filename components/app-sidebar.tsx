"use client"

import * as React from "react"

import { NavMain } from "@/components/nav-main"
import { NavProjects } from "@/components/nav-projects"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { TerminalIcon, RobotIcon, BookOpenIcon, GearIcon, LifebuoyIcon, PaperPlaneTiltIcon, CropIcon, ChartPieIcon, MapTrifoldIcon, CommandIcon, SquaresFourIcon } from "@phosphor-icons/react"

const data = {
  user: {
    name: "Architect",
    email: "agent@atlas.local",
    avatar: "/avatars/avatar.jpg",
  },
  navMain: [
    {
      title: "Component Library",
      url: "/dashboard/metrics",
      icon: <SquaresFourIcon />,
      isActive: true,
      items: [
        {
          title: "1. Metrics & KPIs",
          url: "/dashboard/metrics",
        },
        {
          title: "2. Analytical Charts",
          url: "/dashboard/charts",
        },
        {
          title: "3. 2D Matrix Heatmap",
          url: "/dashboard/matrix",
        },
        {
          title: "4. Workflow & Kanban",
          url: "/dashboard/workflow",
        },
        {
          title: "5. Code & Diffs",
          url: "/dashboard/inspection",
        },
        {
          title: "6. Agent Pipelines",
          url: "/dashboard/agents",
        },
        {
          title: "7. Developer Actions",
          url: "/dashboard/actions",
        },
      ],
    },
    {
      title: "Workspace",
      url: "/dashboard",
      icon: <TerminalIcon />,
      isActive: true,
      items: [
        {
          title: "Project Atlas",
          url: "/dashboard",
        },
        {
          title: "Workshops CRUD",
          url: "/dashboard/workshops",
        },
      ],
    },
    {
      title: "Intelligence",
      url: "#",
      icon: <RobotIcon />,
      items: [
        {
          title: "Local Models",
          url: "#",
        },
        {
          title: "Execution Logs",
          url: "#",
        },
      ],
    },
    {
      title: "Foundation",
      url: "#",
      icon: <BookOpenIcon />,
      items: [
        {
          title: "Invariants",
          url: "#",
        },
        {
          title: "SQLite / WAL",
          url: "#",
        },
        {
          title: "Pino Redaction",
          url: "#",
        },
      ],
    },
  ],
  navSecondary: [
    {
      title: "Documentation",
      url: "https://ui.shadcn.com",
      icon: <LifebuoyIcon />,
    },
    {
      title: "Home",
      url: "/",
      icon: <PaperPlaneTiltIcon />,
    },
  ],
  projects: [
    {
      name: "Atlas Core",
      url: "/dashboard",
      icon: <CropIcon />,
    },
    {
      name: "Quality Gates",
      url: "#",
      icon: <ChartPieIcon />,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar variant="inset" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <CommandIcon className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-medium">Acme Inc</span>
                  <span className="truncate text-xs">Enterprise</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
