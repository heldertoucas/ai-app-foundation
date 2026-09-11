import * as React from "react";
import { getActionCommands } from "@/lib/du/actions";
import { ActionsClientView } from "@/components/dashboard/actions/actions-client-view";

export const metadata = {
  title: "Developer Actions | DU Second Brain",
  description: "Copyable remediation terminal cards with dual shell tabs, unified filter toolbars, and global keyboard palette.",
};

export default async function ActionsShowcasePage() {
  const actionCommands = await getActionCommands();

  return <ActionsClientView actionCommands={actionCommands} />;
}

