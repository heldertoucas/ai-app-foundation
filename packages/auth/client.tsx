"use client";

import {
  OrganizationSwitcher as ClerkOrganizationSwitcher,
  UserButton as ClerkUserButton,
} from "@clerk/nextjs";
import React from "react";

export * from "@clerk/nextjs";

export const OrganizationSwitcher: (
  props: React.ComponentProps<typeof ClerkOrganizationSwitcher>
) => React.ReactElement = (props) => {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return React.createElement(
      "div",
      {
        className:
          "flex items-center gap-2 px-2 py-1 text-sm font-semibold tracking-tight text-foreground",
      },
      React.createElement(
        "span",
        {
          className:
            "h-4 w-4 rounded bg-primary/20 text-primary flex items-center justify-center text-xs",
        },
        "▲"
      ),
      React.createElement("span", null, "Local Workspace")
    );
  }
  return React.createElement(ClerkOrganizationSwitcher, props);
};

export const UserButton: (
  props: React.ComponentProps<typeof ClerkUserButton>
) => React.ReactElement = (props) => {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return React.createElement(
      "div",
      {
        className:
          "flex items-center gap-2 px-2 py-1 text-sm text-muted-foreground",
      },
      React.createElement(
        "span",
        {
          className:
            "h-6 w-6 rounded-full bg-muted flex items-center justify-center text-xs font-bold text-foreground",
        },
        "LD"
      ),
      React.createElement(
        "span",
        { className: "text-foreground font-medium truncate" },
        "Local Dev"
      )
    );
  }
  return React.createElement(ClerkUserButton, props);
};
