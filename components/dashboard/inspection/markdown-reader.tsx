"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface MarkdownReaderProps {
  content: string;
  className?: string;
}

export function MarkdownReader({ content, className }: MarkdownReaderProps) {
  // Safe simple GFM parser that avoids XSS without heavy server-incompatible binaries
  const renderFormattedMarkdown = (raw: string) => {
    // Strip raw HTML script / iframe tags strictly
    const sanitized = raw
      .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, "")
      .replace(/<iframe\b[^<]*(?:(?!<\/iframe>)<[^<]*)*<\/iframe>/gi, "");

    const lines = sanitized.split("\n");
    return lines.map((line, idx) => {
      // Heading 1
      if (line.startsWith("# ")) {
        return <h1 key={idx} className="font-heading text-xl font-bold mt-4 mb-2 text-foreground">{line.replace("# ", "")}</h1>;
      }
      // Heading 2
      if (line.startsWith("## ")) {
        return <h2 key={idx} className="font-heading text-base font-semibold mt-3 mb-1.5 text-foreground">{line.replace("## ", "")}</h2>;
      }
      // Heading 3
      if (line.startsWith("### ")) {
        return <h3 key={idx} className="font-heading text-sm font-semibold mt-2 mb-1 text-foreground">{line.replace("### ", "")}</h3>;
      }
      // Task checkbox
      if (line.startsWith("- [x] ")) {
        return (
          <div key={idx} className="flex items-center gap-2 text-xs text-foreground my-0.5">
            <span className="flex size-3.5 items-center justify-center rounded bg-primary text-primary-foreground text-[10px]">✓</span>
            <span className="line-through text-muted-foreground">{line.replace("- [x] ", "")}</span>
          </div>
        );
      }
      if (line.startsWith("- [ ] ")) {
        return (
          <div key={idx} className="flex items-center gap-2 text-xs text-foreground my-0.5">
            <span className="size-3.5 rounded border border-border" />
            <span>{line.replace("- [ ] ", "")}</span>
          </div>
        );
      }
      // Unordered list
      if (line.startsWith("- ")) {
        return <li key={idx} className="text-xs text-foreground ml-4 my-0.5">{line.replace("- ", "")}</li>;
      }
      // Code fence
      if (line.startsWith("```")) {
        return <div key={idx} className="text-[10px] text-muted-foreground font-mono my-1 italic">// code block</div>;
      }
      // Empty line
      if (!line.trim()) {
        return <div key={idx} className="h-2" />;
      }
      return <p key={idx} className="text-xs leading-relaxed text-foreground my-0.5">{line}</p>;
    });
  };

  return (
    <div className={cn("rounded-xl border border-border/70 bg-card p-4 shadow-xs", className)}>
      {renderFormattedMarkdown(content)}
    </div>
  );
}
