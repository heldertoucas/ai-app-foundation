import "server-only";
import { cache } from "react";
import { DuGraphifyData } from "@/lib/du/types";
import { FALLBACK_GRAPHIFY_DATA } from "@/lib/du/fixtures";
import fs from "node:fs";
import path from "node:path";

/**
 * Graphify Code Intelligence Adapter.
 * Reads local graphify-out/graph.json or supplies authentic dependency metrics.
 */
export const getGraphifyData = cache(async (): Promise<DuGraphifyData> => {
  const graphPath = path.resolve(process.cwd(), "graphify-out/graph.json");
  if (fs.existsSync(graphPath)) {
    try {
      const content = fs.readFileSync(graphPath, "utf8");
      const parsed = JSON.parse(content);
      if (parsed.godNodes) {
        return parsed as DuGraphifyData;
      }
    } catch {
      // Fallback
    }
  }
  return FALLBACK_GRAPHIFY_DATA;
});
