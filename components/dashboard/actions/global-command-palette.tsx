"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { MagnifyingGlass, Command, X } from "@phosphor-icons/react";

export interface CommandItem {
  id: string;
  title: string;
  category: string;
  href?: string;
  onSelect?: () => void;
}

export interface GlobalCommandPaletteProps {
  items: CommandItem[];
}

export function GlobalCommandPalette({ items }: GlobalCommandPaletteProps) {
  const [open, setOpen] = React.useState(false);
  const [search, setSearch] = React.useState("");

  // Keyboard shortcut listener (Cmd+K / Ctrl+K) with Windows prevention
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "k") {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
      if (e.key === "Escape") {
        setOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const filteredItems = React.useMemo(() => {
    if (!search) return items;
    return items.filter(
      (item) =>
        item.title.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase())
    );
  }, [items, search]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 rounded-lg border border-border/70 bg-muted/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:border-foreground/20 hover:text-foreground transition-all cursor-pointer"
      >
        <MagnifyingGlass className="size-3.5" />
        <span className="hidden sm:inline">Quick search or command...</span>
        <kbd className="pointer-events-none inline-flex h-4 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground">
          Ctrl+K
        </kbd>
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 bg-background/80 backdrop-blur-sm animate-in fade-in-0 p-4">
      <div className="relative w-full max-w-lg rounded-2xl border border-border bg-card p-4 shadow-2xl animate-in zoom-in-95 flex flex-col gap-3">
        {/* Search Header */}
        <div className="flex items-center gap-2 border-b border-border/60 pb-2">
          <MagnifyingGlass className="size-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="Type a command or search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            autoFocus
            className="flex-1 bg-transparent text-sm outline-none text-foreground placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-muted-foreground hover:text-foreground cursor-pointer"
          >
            <X className="size-4" />
          </button>
        </div>

        {/* Item List */}
        <div className="flex flex-col gap-1 max-h-[300px] overflow-y-auto">
          {filteredItems.length === 0 ? (
            <div className="py-6 text-center text-xs text-muted-foreground">
              No matching commands or pages found.
            </div>
          ) : (
            filteredItems.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => {
                  if (item.onSelect) item.onSelect();
                  if (item.href) window.location.href = item.href;
                  setOpen(false);
                }}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs text-foreground hover:bg-muted transition-colors text-left cursor-pointer"
              >
                <div className="flex items-center gap-2">
                  <Command className="size-3.5 text-muted-foreground" />
                  <span className="font-medium">{item.title}</span>
                </div>
                <span className="text-[10px] font-mono uppercase text-muted-foreground">
                  {item.category}
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
