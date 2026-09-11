import { describe, it, expect } from "vitest";
import { getComplianceMatrixData } from "@/lib/du/compliance-adapter";
import { getMemoryCandidates } from "@/lib/du/memory-adapter";
import { getContextTelemetry } from "@/lib/du/context-adapter";
import { getRuleSyncData } from "@/lib/du/rulesync-adapter";
import { getGraphifyData } from "@/lib/du/graphify-adapter";
import { promoteCandidateAction } from "@/lib/du/actions";
import { getDUEnvironmentMode } from "@/lib/du/env";

describe("DU Domain Adapters & Hybrid Execution (Phase 1)", () => {
  it("should probe environment mode cleanly", () => {
    const mode = getDUEnvironmentMode();
    expect(["live", "fallback_fixture"]).toContain(mode);
  });

  it("should return compliant compliance matrix data with 14 invariants", async () => {
    const data = await getComplianceMatrixData();
    expect(data.rows.length).toBe(14);
    expect(data.targets.length).toBeGreaterThanOrEqual(1);
    expect(data.overallHealth).toBeGreaterThan(50);
  });

  it("should return categorized memory candidates", async () => {
    const candidates = await getMemoryCandidates();
    expect(candidates.length).toBeGreaterThanOrEqual(3);
    const hasStaged = candidates.some((c) => c.stage === "staged" || c.stage === "canonical");
    expect(hasStaged).toBe(true);
  });

  it("should return context telemetry with 5 radar axes and budget", async () => {
    const telemetry = await getContextTelemetry();
    expect(telemetry.radarDimensions.length).toBe(5);
    expect(telemetry.tokenBudget.totalBudget).toBeGreaterThan(0);
    expect(telemetry.tokenBudget.usedPercent).toBeLessThanOrEqual(100);
  });

  it("should return rulesync status", async () => {
    const data = await getRuleSyncData();
    expect(data.harnessStatuses.length).toBeGreaterThan(0);
  });

  it("should return graphify god nodes", async () => {
    const data = await getGraphifyData();
    expect(data.godNodes.length).toBeGreaterThan(0);
  });

  it("should enforce clipboard fallback in default read-only mode (MEM-0280)", async () => {
    const res = await promoteCandidateAction("MEM-0279", "pattern");
    expect(res.success).toBe(true);
    expect(res.mode).toBe("clipboard_fallback");
    expect(res.command).toContain("MEM-0279");
  });

  it("should reject invalid candidate ID formats (SEC-02)", async () => {
    const res = await promoteCandidateAction("malicious; rm -rf /");
    expect(res.success).toBe(false);
    expect(res.mode).toBe("error");
    expect(res.message).toContain("Invalid candidate ID format");
  });
});
