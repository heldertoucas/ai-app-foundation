"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { CaretRight } from "@phosphor-icons/react";
import type { NavSection, NavGroupItem } from "@/config/navigation.config";

export function NavMain({
  sections,
}: {
  sections: NavSection[];
}) {
  const pathname = usePathname();

  return (
    <>
      {sections.map((section) => (
        <SidebarGroup key={section.id}>
          {section.label && (
            <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70 font-semibold font-mono">
              {section.label}
            </SidebarGroupLabel>
          )}
          <SidebarMenu>
            {section.items.map((item: NavGroupItem) => {
              const isGroupActive =
                pathname === item.url ||
                (item.url !== "/dashboard" && pathname.startsWith(item.url));

              return (
                <Collapsible
                  key={item.title}
                  asChild
                  defaultOpen={item.isActive ?? isGroupActive}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      tooltip={item.title}
                      className={cn(
                        isGroupActive && "font-semibold text-foreground bg-sidebar-accent"
                      )}
                    >
                      <Link href={item.url} scroll={false}>
                        {item.icon}
                        <span>{item.title}</span>
                      </Link>
                    </SidebarMenuButton>

                    {item.items && item.items.length > 0 && (
                      <>
                        <CollapsibleTrigger asChild>
                          <SidebarMenuAction className="data-[state=open]:rotate-90">
                            <CaretRight className="size-3.5" />
                            <span className="sr-only">Toggle</span>
                          </SidebarMenuAction>
                        </CollapsibleTrigger>
                        <CollapsibleContent>
                          <SidebarMenuSub>
                            {item.items.map((subItem) => {
                              const [subPath, subHash] = subItem.url.split("#");
                              const isSubActive =
                                pathname === subPath && (!subHash || typeof window === "undefined" || window.location.hash === `#${subHash}`);

                              return (
                                <SidebarMenuSubItem key={subItem.title}>
                                  <SidebarMenuSubButton
                                    asChild
                                    className={cn(
                                      isSubActive && "font-medium text-foreground bg-sidebar-accent/50"
                                    )}
                                  >
                                    <Link
                                      href={subItem.url}
                                      scroll={false}
                                      className="flex items-center justify-between group"
                                    >
                                      <span className="truncate">{subItem.title}</span>
                                      {subItem.code && (
                                        <span className="font-mono text-[10px] text-muted-foreground/50 group-hover:text-muted-foreground">
                                          {subItem.code}
                                        </span>
                                      )}
                                    </Link>
                                  </SidebarMenuSubButton>
                                </SidebarMenuSubItem>
                              );
                            })}
                          </SidebarMenuSub>
                        </CollapsibleContent>
                      </>
                    )}
                  </SidebarMenuItem>
                </Collapsible>
              );
            })}
          </SidebarMenu>
        </SidebarGroup>
      ))}
    </>
  );
}
