import "server-only";
import { cache } from "react";
import { DuMemoryCandidate } from "@/lib/du/types";
import { getDUEnvironmentMode, getSafeVaultRoot } from "@/lib/du/env";
import { resolveSafeVaultPath } from "@/lib/du/core/path-jail";
import { FALLBACK_MEMORY_CANDIDATES } from "@/lib/du/fixtures";
import fs from "node:fs";
import path from "node:path";
import { logger } from "@/lib/logger.server";

/**
 * Parses markdown frontmatter shallowly without pulling in heavy AST dependencies.
 */
function parseShallowFrontmatter(content: string): Record<string, string> {
  const frontmatter: Record<string, string> = {};
  if (!content.startsWith("---")) return frontmatter;

  const endIdx = content.indexOf("---", 3);
  if (endIdx === -1) return frontmatter;

  const yamlBlock = content.slice(3, endIdx);
  const lines = yamlBlock.split(/\r?\n/);

  for (const line of lines) {
    const colonIdx = line.indexOf(":");
    if (colonIdx > 0) {
      const key = line.slice(0, colonIdx).trim();
      const val = line.slice(colonIdx + 1).trim().replace(/^['"]|['"]$/g, "");
      frontmatter[key] = val;
    }
  }

  return frontmatter;
}

/**
 * Memory Governance Pipeline Adapter.
 * Reads `05-candidates/` and categorizes them into Kanban stages.
 */
export const getMemoryCandidates = cache(async (): Promise<DuMemoryCandidate[]> => {
  const mode = getDUEnvironmentMode();

  if (mode === "live") {
    const vaultRoot = getSafeVaultRoot();
    if (vaultRoot) {
      try {
        const candidatesDir = resolveSafeVaultPath("05-candidates", vaultRoot);
        if (fs.existsSync(candidatesDir)) {
          const files = fs.readdirSync(candidatesDir).filter((f) => f.endsWith(".md"));
          const liveCandidates: DuMemoryCandidate[] = [];

          for (const file of files) {
            try {
              const fullPath = resolveSafeVaultPath(path.join("05-candidates", file), vaultRoot);
              const stats = fs.statSync(fullPath);
              if (stats.size > 512 * 1024) continue; // 512KB Quota Guard (FAIL-01)

              const text = fs.readFileSync(fullPath, "utf8");
              const fm = parseShallowFrontmatter(text);

              const id = file.replace(/\.md$/, "");
              liveCandidates.push({
                id,
                title: fm.title || id,
                targetType: (fm.target_type as any) || "knowledge",
                stage: fm.status === "promoted" ? "canonical" : fm.status === "evaluated" ? "evaluated" : "staged",
                confidence: (fm.confidence as any) || "medium",
                scope: (fm.scope as any) || "project",
                originatingSession: fm.originating_session || fm.session_id || "SES-LIVE",
                snippet: fm.snippet || text.slice(0, 150).replace(/[#\*\n]/g, " ").trim(),
                date: fm.created_at || "2026-09-11",
              });
            } catch {
              // Ignore malformed individual notes
            }
          }

          if (liveCandidates.length > 0) {
            // Combine with canonical fallbacks for full pipeline depth
            const existingIds = new Set(liveCandidates.map((c) => c.id));
            const canonicalBacklog = FALLBACK_MEMORY_CANDIDATES.filter((c) => !existingIds.has(c.id));
            return [...liveCandidates, ...canonicalBacklog];
          }
        }
      } catch (err: any) {
        logger.warn({ err: err?.message }, "Failed to read live candidate notes, falling back to fixtures");
      }
    }
  }

  return FALLBACK_MEMORY_CANDIDATES;
});
