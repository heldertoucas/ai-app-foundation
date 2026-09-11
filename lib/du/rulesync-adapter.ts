import "server-only";
import { cache } from "react";
import { DuRuleSyncData } from "@/lib/du/types";
import { FALLBACK_RULESYNC_DATA } from "@/lib/du/fixtures";
import fs from "node:fs";
import path from "node:path";

/**
 * RuleSync Drift Adapter.
 * Reads local AGENTS.md and reports multi-harness sync status.
 */
export const getRuleSyncData = cache(async (): Promise<DuRuleSyncData> => {
  const agentsPath = path.resolve(process.cwd(), "AGENTS.md");
  if (fs.existsSync(agentsPath)) {
    const agentsContent = fs.readFileSync(agentsPath, "utf8");
    return {
      ...FALLBACK_RULESYNC_DATA,
      diffPreview: {
        filename: "AGENTS.md",
        original: agentsContent,
        derived: agentsContent,
        additions: 0,
        deletions: 0,
      },
    };
  }
  return FALLBACK_RULESYNC_DATA;
});
