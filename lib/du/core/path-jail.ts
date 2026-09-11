import "server-only";
import path from "node:path";
import fs from "node:fs";

/**
 * Resolves and strictly bounds a subpath within a designated root directory.
 * Defends against Path Traversal attacks (SEC-01) by ensuring that the resolved
 * path strictly resides within the realpath of the root directory.
 */
export function resolveSafeVaultPath(subPath: string, rootDir: string): string {
  if (!subPath || typeof subPath !== "string") {
    throw new Error("Invalid path parameter: must be a non-empty string");
  }

  // 1. Reject null bytes and alternate data streams / drive colons in subpath
  if (subPath.includes("\0") || subPath.includes(":")) {
    throw new Error("Security Violation: Illegal path characters detected");
  }

  // 2. Reject explicit directory traversal tokens
  const normalizedParts = subPath.replace(/\\/g, "/").split("/");
  if (normalizedParts.includes("..")) {
    throw new Error("Security Violation: Directory traversal attempt detected (..)");
  }

  // 3. Ensure root directory exists
  if (!fs.existsSync(rootDir)) {
    throw new Error(`Base directory does not exist: ${rootDir}`);
  }

  const safeRoot = fs.realpathSync(rootDir);
  const resolved = path.resolve(safeRoot, subPath);

  // 4. Verify boundary containment
  const rootWithSep = safeRoot.endsWith(path.sep) ? safeRoot : safeRoot + path.sep;
  if (resolved !== safeRoot && !resolved.startsWith(rootWithSep)) {
    throw new Error(`Security Violation: Path traversal attempt outside root jail (${safeRoot})`);
  }

  return resolved;
}
