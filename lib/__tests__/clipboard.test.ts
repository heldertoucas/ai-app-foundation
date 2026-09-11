import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { copyToClipboard } from "../clipboard";

describe("copyToClipboard", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("should return error when text is empty", async () => {
    const res = await copyToClipboard("");
    expect(res.success).toBe(false);
    expect(res.error).toBe("No content to copy");
  });

  it("should sanitize CRLF and use navigator.clipboard in secure context", async () => {
    const writeTextMock = vi.fn().mockResolvedValue(undefined);
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: writeTextMock,
      },
    });

    const res = await copyToClipboard('git commit -m "fix"\r\nrm -rf /');
    expect(res.success).toBe(true);
    expect(writeTextMock).toHaveBeenCalledWith('git commit -m "fix"\nrm -rf /');
  });

  it("should fallback to document.execCommand when navigator.clipboard fails", async () => {
    vi.stubGlobal("navigator", {
      clipboard: {
        writeText: vi.fn().mockRejectedValue(new Error("Permission denied")),
      },
    });

    const execCommandMock = vi.fn().mockReturnValue(true);
    const mockTextarea = {
      value: "",
      style: { position: "", left: "", top: "" },
      setAttribute: vi.fn(),
      select: vi.fn(),
    };
    vi.stubGlobal("document", {
      createElement: vi.fn().mockReturnValue(mockTextarea),
      body: {
        appendChild: vi.fn(),
        removeChild: vi.fn(),
      },
      execCommand: execCommandMock,
    });

    const res = await copyToClipboard("pnpm test");
    expect(res.success).toBe(true);
    expect(execCommandMock).toHaveBeenCalledWith("copy");
    expect(mockTextarea.value).toBe("pnpm test");
  });
});


