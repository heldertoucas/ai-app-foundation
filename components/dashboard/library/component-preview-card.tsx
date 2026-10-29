"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { ComponentItem } from "@/lib/library/component-registry";
import { ComponentPreviewRenderer } from "./preview-renderer";
import { copyToClipboard } from "@/lib/clipboard";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Copy,
  Check,
  Warning,
  Code,
  Eye,
  Sliders,
  Terminal,
  Package,
} from "@phosphor-icons/react";

// ==========================================
// 1. Isolated ErrorBoundary per Card
// ==========================================
interface ErrorBoundaryProps {
  fallback?: React.ReactNode;
  children: React.ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

export class CardErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Isolated log to prevent masking
    console.error("ComponentPreviewCard ErrorBoundary caught error:", error, errorInfo);
  }

  reset = () => {
    this.state = { hasError: false, error: undefined };
    this.setState({ hasError: false, error: undefined });
    this.props.onReset?.();
  };


  render() {
    if (this.state.hasError) {
      if (this.props.fallback) return this.props.fallback;
      return (
        <div
          role="alert"
          className="flex flex-col items-center justify-center gap-2 p-6 text-center border border-dashed border-destructive/40 rounded-xl bg-destructive/5 min-h-[160px]"
        >
          <Warning className="size-6 text-destructive shrink-0" />
          <div className="text-xs font-semibold text-destructive">
            Preview unavailable
          </div>
          <div className="text-[11px] text-muted-foreground max-w-xs truncate">
            {this.state.error?.message ||
              "An unexpected error occurred while rendering this component."}
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={this.reset}
            className="mt-2 text-xs h-7"
          >
            Retry Preview
          </Button>
        </div>
      );
    }
    return this.props.children;
  }
}

// ==========================================
// 2. ComponentPreviewCard
// ==========================================
export interface ComponentPreviewCardProps {
  item: ComponentItem;
  className?: string;
}

export function ComponentPreviewCard({ item, className }: ComponentPreviewCardProps) {
  const [activeTab, setActiveTab] = React.useState<"preview" | "code" | "props">("preview");
  const [copiedCode, setCopiedCode] = React.useState(false);
  const [copiedShadcn, setCopiedShadcn] = React.useState(false);
  const [copiedImport, setCopiedImport] = React.useState(false);

  const handleCopyCode = async () => {
    const res = await copyToClipboard(item.snippet);
    if (res.success) {
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 2000);
    }
  };

  const handleCopyShadcn = async () => {
    const res = await copyToClipboard(item.requirements.shadcnCommand);
    if (res.success) {
      setCopiedShadcn(true);
      setTimeout(() => setCopiedShadcn(false), 2000);
    }
  };

  const handleCopyImport = async () => {
    const res = await copyToClipboard(item.requirements.importPath);
    if (res.success) {
      setCopiedImport(true);
      setTimeout(() => setCopiedImport(false), 2000);
    }
  };

  // Adaptive min-height contract: charts 240px, metrics 100px, etc.
  const adaptiveMinHeight = item.minHeight || (item.category === "charts" ? 240 : 100);

  return (
    <Card
      className={cn(
        "flex flex-col overflow-hidden border-border/80 shadow-xs hover:border-foreground/20 transition-all duration-150",
        className
      )}
      id={item.id}
    >
      {/* Header */}
      <CardHeader className="pb-3 border-b border-border/50 bg-muted/20">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <CardTitle className="text-base font-semibold font-mono tracking-tight text-foreground">
              {item.name}
            </CardTitle>
            <Badge variant="outline" className="text-[10px] font-mono px-1.5 py-0 capitalize">
              {item.categoryLabel}
            </Badge>
          </div>

          {/* Tab Switcher */}
          <div className="inline-flex items-center rounded-lg border border-border/70 bg-muted/60 p-0.5 text-xs">
            <button
              type="button"
              onClick={() => setActiveTab("preview")}
              className={cn(
                "hidden sm:inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition-all cursor-pointer",
                activeTab === "preview"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Eye className="size-3.5" />
              <span>Preview</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("code")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition-all cursor-pointer",
                activeTab === "code"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Code className="size-3.5" />
              <span>Code</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("props")}
              className={cn(
                "inline-flex items-center gap-1 rounded-md px-2.5 py-1 font-medium transition-all cursor-pointer",
                activeTab === "props"
                  ? "bg-background text-foreground shadow-xs font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              <Sliders className="size-3.5" />
              <span>Props</span>
            </button>
          </div>
        </div>

        <CardDescription className="text-xs text-muted-foreground mt-1">
          {item.description}
        </CardDescription>
      </CardHeader>

      {/* Main Body */}
      <CardContent className="flex-1 p-4">
        {/* TAB 1: Live Preview with ErrorBoundary */}
        {activeTab === "preview" && (
          <div className="flex flex-col">
            <div
              className="relative flex flex-col justify-center rounded-xl border border-border/60 bg-muted/10 p-4 transition-all overflow-hidden"
              style={{ minHeight: adaptiveMinHeight }}
            >
              <CardErrorBoundary>
                <ComponentPreviewRenderer item={item} />
              </CardErrorBoundary>
            </div>
          </div>
        )}

        {/* TAB 2: Code Snippet */}
        {activeTab === "code" && (
          <div className="relative flex flex-col rounded-xl border border-neutral-800 bg-neutral-950 text-neutral-100 overflow-hidden font-mono text-xs">
            <div className="flex items-center justify-between border-b border-neutral-800/80 bg-neutral-900/80 px-3 py-1.5">
              <span className="text-[11px] text-neutral-400">JSX / TSX Blueprint</span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleCopyCode}
                className="h-6 text-[11px] gap-1 text-neutral-300 hover:text-neutral-100 hover:bg-neutral-800 px-2"
              >
                {copiedCode ? (
                  <>
                    <Check className="size-3 text-emerald-400" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="size-3" />
                    <span>Copy Code</span>
                  </>
                )}
              </Button>
            </div>
            <pre className="p-3 overflow-x-auto text-[11px] leading-relaxed text-neutral-200 selection:bg-primary selection:text-primary-foreground">
              <code>{item.snippet}</code>
            </pre>
          </div>
        )}

        {/* TAB 3: Props & Types */}
        {activeTab === "props" && (
          <div className="flex flex-col rounded-xl border border-border/70 overflow-hidden">
            {item.props && item.props.length > 0 ? (
              <Table>
                <TableHeader className="bg-muted/40 text-xs">
                  <TableRow>
                    <TableHead className="font-semibold text-foreground">Prop</TableHead>
                    <TableHead className="font-semibold text-foreground">Type</TableHead>
                    <TableHead className="font-semibold text-foreground">Default</TableHead>
                    <TableHead className="font-semibold text-foreground">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody className="text-xs font-mono">
                  {item.props.map((p) => (
                    <TableRow key={p.name}>
                      <TableCell className="font-semibold text-foreground">
                        {p.name}
                        {p.required && <span className="text-rose-500 ml-0.5">*</span>}
                      </TableCell>
                      <TableCell className="text-primary truncate max-w-[140px]" title={p.type}>
                        {p.type}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {p.default || "—"}
                      </TableCell>
                      <TableCell className="font-sans text-muted-foreground">
                        {p.description}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            ) : (
              <div className="p-6 text-center text-xs text-muted-foreground">
                No configurable props required for this archetype.
              </div>
            )}
          </div>
        )}

        {/* Requirements Block */}
        <div className="mt-4 rounded-xl border border-border/60 bg-muted/30 p-3 space-y-2 text-xs">
          <div className="flex items-center justify-between text-[11px] font-semibold text-muted-foreground uppercase tracking-wider">
            <span className="flex items-center gap-1.5">
              <Package className="size-3.5 text-primary" />
              Requirements & Setup
            </span>
          </div>

          {/* CLI Command */}
          <div className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 font-mono text-[11px]">
            <div className="flex items-center gap-2 truncate text-foreground">
              <Terminal className="size-3.5 text-primary shrink-0" />
              <span className="truncate">{item.requirements.shadcnCommand}</span>
            </div>
            <button
              type="button"
              onClick={handleCopyShadcn}
              className="text-muted-foreground hover:text-foreground cursor-pointer shrink-0 p-1"
              title="Copy shadcn CLI command"
            >
              {copiedShadcn ? (
                <Check className="size-3 text-emerald-500" />
              ) : (
                <Copy className="size-3" />
              )}
            </button>
          </div>

          {/* Import Path */}
          <div className="flex items-center justify-between gap-2 rounded-lg border border-border/60 bg-background/80 px-2.5 py-1.5 font-mono text-[11px]">
            <span className="truncate text-muted-foreground select-all">
              {item.requirements.importPath}
            </span>
            <button
              type="button"
              onClick={handleCopyImport}
              className="text-muted-foreground hover:text-foreground cursor-pointer shrink-0 p-1"
              title="Copy import statement"
            >
              {copiedImport ? (
                <Check className="size-3 text-emerald-500" />
              ) : (
                <Copy className="size-3" />
              )}
            </button>
          </div>

          {/* Peer Packages */}
          {item.requirements.peerDependencies.length > 0 && (
            <div className="flex flex-wrap items-center gap-1 text-[11px] pt-1">
              <span className="text-muted-foreground">Peers:</span>
              {item.requirements.peerDependencies.map((peer) => (
                <Badge
                  key={peer}
                  variant="secondary"
                  className="font-mono text-[10px] px-1.5 py-0"
                >
                  {peer}
                </Badge>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
