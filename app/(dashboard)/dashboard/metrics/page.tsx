import * as React from "react";
import { getComplianceMatrixData } from "@/lib/du/compliance-adapter";
import { getContextTelemetry } from "@/lib/du/context-adapter";
import { MetricsClientView } from "@/components/dashboard/metrics/metrics-client-view";

export const metadata = {
  title: "Metrics & KPIs | DU Second Brain",
  description: "Standardized KPI summary cards, circular radial health gauges, and interactive filter status chips.",
};

export default async function MetricsShowcasePage() {
  const [complianceData, contextTelemetry] = await Promise.all([
    getComplianceMatrixData(),
    getContextTelemetry(),
  ]);

  return (
    <MetricsClientView
      complianceData={complianceData}
      contextTelemetry={contextTelemetry}
    />
  );
}

