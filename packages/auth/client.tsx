"use client";

import * as clerkClient from "@clerk/nextjs";
import React from "react";

export * from "@clerk/nextjs";

export const OrganizationSwitcher = (props: any) => {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return React.createElement(
      "div",
      { className: "flex items-center gap-2 px-2 py-1 text-sm font-semibold tracking-tight text-foreground" },
      React.createElement("span", { className: "h-4 w-4 rounded bg-primary/20 text-primary flex items-center justify-center text-xs" }, "▲"),
      React.createElement("span", null, "Local Workspace")
    );
  }
  return React.createElement(clerkClient.OrganizationSwitcher as any, props);
};

export const UserButton = (props: any) => {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return React.createElement(
      "div",
      { className: "flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground" },
      React.createElement("span", { className: "h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground" }, "LD"),
      React.createElement("span", { className: "text-foreground font-medium truncate" }, "Local Dev")
    );
  }
  return React.createElement(clerkClient.UserButton as any, props);
};
