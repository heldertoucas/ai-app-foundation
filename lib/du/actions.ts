"use server";

import { isLocalMutationsEnabled } from "@/lib/du/env";
import { FALLBACK_ACTIONS } from "@/lib/du/fixtures";
import { DuActionCommand } from "@/lib/du/types";
import { execFile } from "node:child_process";
import { promisify } from "node:util";

const execFileAsync = promisify(execFile);

export interface ActionResult {
  success: boolean;
  mode: "executed" | "clipboard_fallback" | "error";
  message: string;
  command?: string;
}

/**
 * Promotes a memory candidate.
 * Operates in Hybrid Mode (MEM-0280): defaults to returning safe clipboard command,
 * unless ENABLE_LOCAL_MUTATIONS=true is explicitly set.
 */
export async function promoteCandidateAction(
  candidateId: string,
  targetType: string = "pattern"
): Promise<ActionResult> {
  // 1. Strict regex validation on candidate ID (SEC-02)
  if (!/^MEM-\d{4}$/.test(candidateId)) {
    return {
      success: false,
      mode: "error",
      message: "Security Violation: Invalid candidate ID format. Expected MEM-XXXX.",
    };
  }

  // 2. Strict targetType whitelist
  const allowedTypes = ["pattern", "decision", "knowledge", "constraint"];
  const safeType = allowedTypes.includes(targetType) ? targetType : "pattern";
  const cliCommand = `python -m dev.cli memory promote ${candidateId} --type ${safeType}`;

  // 3. Check mutation permission
  if (!isLocalMutationsEnabled()) {
    return {
      success: true,
      mode: "clipboard_fallback",
      message: `Read-only safety active. Command copied to clipboard: ${cliCommand}`,
      command: cliCommand,
    };
  }

  // 4. Guarded local execution (execFile, shell: false, 5000ms timeout)
  try {
    const { stdout, stderr } = await execFileAsync(
      "python",
      ["-m", "dev.cli", "memory", "promote", candidateId, "--type", safeType],
      {
        timeout: 5000,
        shell: false,
        env: { ...process.env, CI: "true" },
      }
    );

    return {
      success: true,
      mode: "executed",
      message: stdout || stderr || `Successfully promoted ${candidateId}`,
      command: cliCommand,
    };
  } catch (err: any) {
    return {
      success: false,
      mode: "error",
      message: err?.message || "Execution failed or timed out (5s limit)",
      command: cliCommand,
    };
  }
}

export async function getActionCommands(): Promise<DuActionCommand[]> {
  return FALLBACK_ACTIONS;
}
