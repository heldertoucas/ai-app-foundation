"use client";

import * as React from "react";
import {
  COMPONENT_REGISTRY,
  LIBRARY_CATEGORIES,
  type ComponentItem,
  type LibraryCategory,
} from "@/lib/library/component-registry";
import { ComponentPreviewCard } from "./component-preview-card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/lib/utils";
import {
  Sparkle,
  MagnifyingGlass,
  ArrowCounterClockwise,
  ArrowUp,
  Link as LinkIcon,
  SquaresFour,
  ListDashes,
  X,
} from "@phosphor-icons/react";

export function LibraryClientView() {
  const [search, setSearch] = React.useState("");
  const deferredSearch = React.useDeferredValue(search);
  const [viewDensity, setViewDensity] = React.useState<"grid" | "list">("grid");
  const [activeSection, setActiveSection] = React.useState<string>("metrics");
  const [showBackToTop, setShowBackToTop] = React.useState(false);

  // Category counts
  const categoryCounts = React.useMemo(() => {
    const counts: Record<string, number> = {};
    for (const item of COMPONENT_REGISTRY) {
      counts[item.category] = (counts[item.category] || 0) + 1;
    }
    return counts;
  }, []);

  // Filtered components based on deferred search
  const filteredComponents = React.useMemo(() => {
    if (!deferredSearch.trim()) return COMPONENT_REGISTRY;

    const q = deferredSearch.toLowerCase().trim();
    return COMPONENT_REGISTRY.filter((item) => {
      const matchesName = item.name.toLowerCase().includes(q);
      const matchesDesc = item.description.toLowerCase().includes(q);
      const matchesCategory = item.categoryLabel.toLowerCase().includes(q);
      const matchesShadcn = item.requirements.shadcnCommand.toLowerCase().includes(q);
      const matchesProps = item.props?.some((p) => p.name.toLowerCase().includes(q));

      return matchesName || matchesDesc || matchesCategory || matchesShadcn || matchesProps;
    });
  }, [deferredSearch]);

  // Scroll spy & Back-to-top tracker
  React.useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);

      // Check which section is in view
      const categoryElements = LIBRARY_CATEGORIES.map((cat) => ({
        id: cat.id,
        el: document.getElementById(cat.id),
      })).filter((item) => item.el !== null);

      for (const item of categoryElements) {
        if (!item.el) continue;
        const rect = item.el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          setActiveSection(item.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const isSearching = Boolean(deferredSearch.trim());

  return (
    <div className="relative flex flex-col gap-8 max-w-7xl mx-auto px-4 py-6 sm:px-6">
      {/* 1. Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="rounded-md bg-primary/10 px-2 py-0.5 font-mono text-xs font-semibold text-primary">
              Design System Hub
            </span>
            <h1 className="text-3xl font-bold tracking-tight text-foreground font-heading">
              Component & UI Library
            </h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1 max-w-3xl">
            Single continuous catalog of 30+ production dashboard cards, analytical charts, heatmaps, and AI agent cockpit primitives. Copy ready-to-use blueprints with shadcn CLI instructions.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <Badge variant="outline" className="font-mono text-xs py-1 px-2.5 gap-1.5 border-primary/30">
            <Sparkle className="size-3.5 text-primary" />
            <span>Preset b27Gdgd6</span>
          </Badge>
          <Badge variant="secondary" className="font-mono text-xs py-1 px-2.5">
            {COMPONENT_REGISTRY.length} Archetypes
          </Badge>
        </div>
      </div>

      {/* 2. Sticky Category Anchor Navigation (TOC) & Search Toolbar */}
      <div className="sticky top-0 z-20 -mx-4 px-4 sm:-mx-6 sm:px-6 py-3 bg-background/90 backdrop-blur-md border-y border-border/70 flex flex-col gap-3 shadow-xs">
        {/* Row 1: Search and Density Switch */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="relative flex-1 max-w-md">
            <MagnifyingGlass className="absolute left-3 top-2.5 size-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search 30+ components by name, description, props..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-8 h-9 text-xs"
            />
            {search && (
              <button
                type="button"
                onClick={() => setSearch("")}
                className="absolute right-2.5 top-2.5 text-muted-foreground hover:text-foreground cursor-pointer p-0.5"
              >
                <X className="size-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <div className="text-xs text-muted-foreground font-mono">
              Showing <strong className="text-foreground">{filteredComponents.length}</strong> of{" "}
              <span>{COMPONENT_REGISTRY.length}</span>
            </div>

            <div className="inline-flex items-center rounded-lg border border-border/80 bg-muted/40 p-0.5 text-xs">
              <button
                type="button"
                onClick={() => setViewDensity("grid")}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-all cursor-pointer",
                  viewDensity === "grid"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="Grid View"
              >
                <SquaresFour className="size-3.5" />
                <span className="hidden md:inline">Grid</span>
              </button>
              <button
                type="button"
                onClick={() => setViewDensity("list")}
                className={cn(
                  "inline-flex items-center gap-1 rounded-md px-2 py-1 font-medium transition-all cursor-pointer",
                  viewDensity === "list"
                    ? "bg-background text-foreground shadow-xs font-semibold"
                    : "text-muted-foreground hover:text-foreground"
                )}
                title="List View"
              >
                <ListDashes className="size-3.5" />
                <span className="hidden md:inline">List</span>
              </button>
            </div>
          </div>
        </div>

        {/* Row 2: Category Anchors TOC Pills */}
        {!isSearching && (
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            {LIBRARY_CATEGORIES.map((cat, idx) => {
              const isActive = activeSection === cat.id;
              const count = categoryCounts[cat.id] || 0;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => scrollToSection(cat.id)}
                  className={cn(
                    "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium transition-all cursor-pointer shrink-0",
                    isActive
                      ? "bg-primary text-primary-foreground shadow-xs font-semibold"
                      : "bg-muted/60 text-muted-foreground hover:bg-muted hover:text-foreground"
                  )}
                >
                  <span className="font-mono text-[10px] opacity-70">0{idx + 1}</span>
                  <span>{cat.label}</span>
                  <Badge
                    variant="secondary"
                    className={cn(
                      "font-mono text-[10px] px-1 py-0",
                      isActive
                        ? "bg-primary-foreground/20 text-primary-foreground"
                        : "bg-background/80 text-muted-foreground"
                    )}
                  >
                    {count}
                  </Badge>
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 3. Catalog Content */}
      {filteredComponents.length === 0 ? (
        <Card className="p-12 border-dashed">
          <CardContent className="flex flex-col items-center justify-center text-center gap-3">
            <div className="flex size-12 items-center justify-center rounded-full bg-muted text-muted-foreground">
              <MagnifyingGlass className="size-6" />
            </div>
            <div className="text-base font-semibold text-foreground">
              No matching components found
            </div>
            <p className="text-xs text-muted-foreground max-w-sm">
              We couldn&apos;t find any components matching &quot;{search}&quot;. Try adjusting your query or resetting filters.
            </p>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setSearch("")}
              className="mt-2 text-xs gap-1.5"
            >
              <ArrowCounterClockwise className="size-3.5" />
              <span>Reset Search</span>
            </Button>
          </CardContent>
        </Card>
      ) : isSearching ? (
        /* Flat Grid when search is active */
        <div className="flex flex-col gap-6">
          <div className="text-sm font-semibold text-muted-foreground">
            Search Results for &quot;{search}&quot; ({filteredComponents.length})
          </div>
          <div
            className={
              viewDensity === "grid"
                ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            }
          >
            {filteredComponents.map((item) => (
              <div
                key={item.id}
                style={{ contentVisibility: "auto", containIntrinsicSize: "0 350px" }}
              >
                <ComponentPreviewCard item={item} />
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Full continuous long page organized by Category sections */
        <div className="flex flex-col gap-14">
          {LIBRARY_CATEGORIES.map((cat, idx) => {
            const catItems = filteredComponents.filter((item) => item.category === cat.id);
            if (catItems.length === 0) return null;

            return (
              <section
                key={cat.id}
                id={cat.id}
                className="scroll-mt-32 flex flex-col gap-5 pt-2"
              >
                {/* Category Anchor Header */}
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/70 pb-3">
                  <div className="flex items-center gap-3">
                    <span className="flex size-7 items-center justify-center rounded-lg bg-primary/10 text-primary font-mono text-xs font-semibold">
                      0{idx + 1}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <h2 className="text-xl font-bold tracking-tight text-foreground font-heading">
                          {cat.label}
                        </h2>
                        <Badge variant="secondary" className="font-mono text-xs px-2 py-0">
                          {catItems.length} archetypes
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {cat.description}
                      </p>
                    </div>
                  </div>

                  <a
                    href={`#${cat.id}`}
                    className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground/60 hover:text-primary transition-colors py-1 px-2 rounded-md hover:bg-muted/40"
                    title={`Link to ${cat.label}`}
                  >
                    <LinkIcon className="size-3" />
                    <span>#{cat.id}</span>
                  </a>
                </div>

                {/* Category Components Grid */}
                <div
                  className={
                    viewDensity === "grid"
                      ? "grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6"
                      : "flex flex-col gap-4"
                  }
                >
                  {catItems.map((item) => (
                    <div
                      key={item.id}
                      style={{ contentVisibility: "auto", containIntrinsicSize: "0 350px" }}
                    >
                      <ComponentPreviewCard
                        item={item}
                        className={
                          viewDensity === "grid" && item.id.endsWith("-client-view")
                            ? "md:col-span-2 xl:col-span-3"
                            : undefined
                        }
                      />
                    </div>
                  ))}
                </div>
              </section>
            );
          })}
        </div>
      )}

      {/* 4. Floating Back-to-Top Button (FAB) */}
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed bottom-6 right-6 z-40 size-10 rounded-full border border-border/80 bg-background/90 backdrop-blur-md shadow-lg hover:bg-accent hover:border-primary/40 active:scale-95 transition-all flex items-center justify-center cursor-pointer text-foreground"
          title="Back to top"
          aria-label="Back to top of library"
        >
          <ArrowUp className="size-4" />
        </button>
      )}
    </div>
  );
}
