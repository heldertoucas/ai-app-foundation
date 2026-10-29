"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  defaultNavigationConfig,
  type AppNavigationConfig,
} from "@/config/navigation.config";

export function DashboardBreadcrumb({
  config = defaultNavigationConfig,
}: {
  config?: AppNavigationConfig;
}) {
  const pathname = usePathname();

  // Dynamically resolve route group and page title from navigation config
  const routeInfo = React.useMemo(() => {
    if (pathname === "/dashboard") {
      return { group: "Project", groupHref: "/dashboard", page: "Overview" };
    }

    for (const section of config.sections) {
      for (const group of section.items) {
        if (group.items) {
          for (const item of group.items) {
            const itemPath = item.url.split("#")[0];
            if (pathname === itemPath) {
              return {
                group: section.label || group.title,
                groupHref: group.url,
                page: item.title,
              };
            }
          }
        }
      }
    }

    // Dynamic fallback
    const segments = pathname.split("/").filter(Boolean);
    const lastSegment = segments[segments.length - 1] || "Dashboard";
    return {
      page: lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1),
    };
  }, [pathname, config]);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem className="hidden md:block">
          <BreadcrumbLink asChild>
            <Link href="/dashboard">Dashboard</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>

        {routeInfo.group && (
          <>
            <BreadcrumbSeparator className="hidden md:block" />
            <BreadcrumbItem className="hidden md:block">
              {routeInfo.groupHref ? (
                <BreadcrumbLink asChild>
                  <Link href={routeInfo.groupHref}>{routeInfo.group}</Link>
                </BreadcrumbLink>
              ) : (
                <span>{routeInfo.group}</span>
              )}
            </BreadcrumbItem>
          </>
        )}

        <BreadcrumbSeparator className="hidden md:block" />
        <BreadcrumbItem>
          <BreadcrumbPage>{routeInfo.page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
