import * as React from "react";
import {
  TreeStructure,
  SquaresFour,
} from "@phosphor-icons/react";

export interface NavLeafItem {
  title: string;
  url: string;
  code?: string;
  badge?: string | number;
  exact?: boolean;
}

export interface NavGroupItem {
  title: string;
  url: string;
  icon?: React.ReactNode;
  isActive?: boolean;
  items?: NavLeafItem[];
}

export interface NavSection {
  id: string;
  label?: string;
  items: NavGroupItem[];
}

export interface OperatorProfileConfig {
  enabled: boolean;
  name: string;
  email?: string;
  role?: string;
  avatar?: string;
  statusBadge?: string;
  actions?: Array<{
    label: string;
    href?: string;
    onClick?: () => void;
    variant?: "default" | "destructive";
  }>;
}

export type SidebarFooterConfig =
  | {
      type: "system";
      version?: string;
      statusText?: string;
      modeText?: string;
      showThemeToggle?: boolean;
      docsUrl?: string;
    }
  | {
      type: "user";
      user: OperatorProfileConfig;
    }
  | {
      type: "actions";
      showThemeToggle?: boolean;
      customNode?: React.ReactNode;
    }
  | {
      type: "none";
    };

export interface AppNavigationConfig {
  brand: {
    name: string;
    subtitle?: string;
    href: string;
  };
  sections: NavSection[];
  footer: SidebarFooterConfig;
}

export const defaultNavigationConfig: AppNavigationConfig = {
  brand: {
    name: "DU Foundation",
    subtitle: "Agentic Workspace",
    href: "/dashboard",
  },
  sections: [
    {
      id: "project",
      label: "Project",
      items: [
        {
          title: "Project",
          url: "/dashboard",
          icon: <TreeStructure className="size-4" />,
          isActive: true,
          items: [
            { title: "1. Metrics & KPIs", url: "/dashboard/metrics", code: "01" },
            { title: "2. Analytical Charts", url: "/dashboard/charts", code: "02" },
            { title: "3. 2D Matrix Heatmap", url: "/dashboard/matrix", code: "03" },
            { title: "4. Workflow & Kanban", url: "/dashboard/workflow", code: "04" },
            { title: "5. Code & Diffs", url: "/dashboard/inspection", code: "05" },
            { title: "6. Agent Pipelines", url: "/dashboard/agents", code: "06" },
            { title: "7. Developer Actions", url: "/dashboard/actions", code: "07" },
          ],
        },
      ],
    },
    {
      id: "library",
      label: "Library",
      items: [
        {
          title: "Library",
          url: "/dashboard/library",
          icon: <SquaresFour className="size-4" />,
          isActive: true,
          items: [
            { title: "Master Catalog", url: "/dashboard/library" },
            { title: "Metrics & KPIs", url: "/dashboard/library#metrics" },
            { title: "Analytical Charts", url: "/dashboard/library#charts" },
            { title: "Matrix & Heatmaps", url: "/dashboard/library#matrix" },
            { title: "Workflow & Lifecycle", url: "/dashboard/library#workflow" },
            { title: "Inspection & Code", url: "/dashboard/library#inspection" },
            { title: "Agent Pipelines", url: "/dashboard/library#agents" },
            { title: "Developer Actions", url: "/dashboard/library#actions" },
          ],
        },
      ],
    },
  ],
  footer: {
    type: "system",
    statusText: "SQLite WAL",
    version: "v0.1.0",
    modeText: "Local-First",
    showThemeToggle: true,
    docsUrl: "https://ui.shadcn.com",
  },
};
