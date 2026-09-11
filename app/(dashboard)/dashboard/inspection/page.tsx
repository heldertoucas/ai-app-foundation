import * as React from "react";
import { getRuleSyncData } from "@/lib/du/rulesync-adapter";
import { InspectionClientView } from "@/components/dashboard/inspection/inspection-client-view";

export const metadata = {
  title: "Inspection & Code Surfaces | DU Second Brain",
  description: "Unified/split diff viewers, GFM documentation readers, masked credentials, and nested file tree explorers.",
};

interface InspectionPageProps {
  searchParams: Promise<{
    invariant?: string;
    session?: string;
  }>;
}

export default async function InspectionShowcasePage({ searchParams }: InspectionPageProps) {
  const resolvedParams = await searchParams;
  const ruleSyncData = await getRuleSyncData();

  return (
    <InspectionClientView
      ruleSyncData={ruleSyncData}
      initialInvariant={resolvedParams.invariant}
      initialSession={resolvedParams.session}
    />
  );
}

