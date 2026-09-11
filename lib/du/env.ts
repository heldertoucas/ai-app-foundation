import "server-only";
import fs from "node:fs";
import path from "node:path";
import { logger } from "@/lib/logger.server";

export type DUEnvironmentMode = "live" | "fallback_fixture";

let hasLoggedEnvMode = false;

/**
 * Discovers the canonical Development Universe home vault directory if present.
 */
export function getSafeVaultRoot(): string | null {
  const candidatePaths = [
    process.env.DEV_UNIVERSE_HOME,
    path.resolve(process.cwd(), "../home"),
    "C:\\Users\\helder.toucas\\Dev\\home",
  ].filter((p): p is string => Boolean(p));

  for (const candidate of candidatePaths) {
    try {
      if (fs.existsSync(candidate) && fs.statSync(candidate).isDirectory()) {
        const real = fs.realpathSync(candidate);
        // Verify typical DU markers (e.g. 00-knowledge, 08-system, or 05-candidates)
        if (
          fs.existsSync(path.join(real, "08-system")) ||
          fs.existsSync(path.join(real, "05-candidates"))
        ) {
          return real;
        }
      }
    } catch {
      // Continue to next candidate
    }
  }

  return null;
}

/**
 * Determines whether the environment operates with live DU access or high-fidelity fixtures.
 */
export function getDUEnvironmentMode(): DUEnvironmentMode {
  const vaultRoot = getSafeVaultRoot();
  const mode: DUEnvironmentMode = vaultRoot ? "live" : "fallback_fixture";

  if (!hasLoggedEnvMode) {
    hasLoggedEnvMode = true;
    if (mode === "live") {
      logger.info({ event: "du_env_resolved", mode: "live", vaultRoot }, "Development Universe live vault connected");
    } else {
      logger.warn({ event: "du_env_fallback", mode: "fallback_fixture" }, "Operating in high-fidelity DU fallback fixture mode");
    }
  }

  return mode;
}

/**
 * Checks whether local mutations (e.g., executing local Python CLI actions) are permitted.
 * Guarded by the user decision from the AI Grill session (MEM-0280).
 */
export function isLocalMutationsEnabled(): boolean {
  return process.env.ENABLE_LOCAL_MUTATIONS === "true";
}
