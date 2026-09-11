import * as React from "react";
import { getContextTelemetry } from "@/lib/du/context-adapter";
import { getGraphifyData } from "@/lib/du/graphify-adapter";
import { ChartsClientView } from "@/components/dashboard/charts/charts-client-view";

export const metadata = {
  title: "Analytical Charts & Rubrics | DU Second Brain",
  description: "Theme-aware Recharts visualizations utilizing semantic tokens with flawless light/dark mode parity.",
};

export default async function ChartsShowcasePage() {
  const [contextTelemetry, graphifyData] = await Promise.all([
    getContextTelemetry(),
    getGraphifyData(),
  ]);

  return (
    <ChartsClientView
      contextTelemetry={contextTelemetry}
      graphifyData={graphifyData}
    />
  );
}

