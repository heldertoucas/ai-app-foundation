"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Folder, FolderOpen, FileCode, FileText, CaretRight, CaretDown } from "@phosphor-icons/react";

export interface FileTreeNode {
  id: string;
  name: string;
  type: "file" | "directory";
  children?: FileTreeNode[];
}

export interface FileTreeNavigatorProps {
  nodes: FileTreeNode[];
  selectedId?: string;
  onSelectNode: (node: FileTreeNode) => void;
  className?: string;
}

function TreeNodeItem({
  node,
  selectedId,
  onSelect,
  depth = 0,
}: {
  node: FileTreeNode;
  selectedId?: string;
  onSelect: (n: FileTreeNode) => void;
  depth?: number;
}) {
  const [open, setOpen] = React.useState(true);
  const isSelected = selectedId === node.id;

  if (node.type === "directory") {
    return (
      <div className="flex flex-col">
        <button
          type="button"
          onClick={() => {
            setOpen(!open);
            onSelect(node);
          }}
          style={{ paddingLeft: depth * 14 + 6 }}
          className={cn(
            "flex items-center gap-1.5 py-1 text-xs text-foreground hover:bg-muted/50 rounded-md transition-colors w-full text-left cursor-pointer",
            isSelected && "bg-muted font-semibold"
          )}
        >
          {open ? <CaretDown className="size-3 text-muted-foreground" /> : <CaretRight className="size-3 text-muted-foreground" />}
          {open ? <FolderOpen className="size-3.5 text-primary" /> : <Folder className="size-3.5 text-primary" />}
          <span>{node.name}</span>
        </button>
        {open && node.children && (
          <div className="flex flex-col">
            {node.children.map((child) => (
              <TreeNodeItem
                key={child.id}
                node={child}
                selectedId={selectedId}
                onSelect={onSelect}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    );
  }

  const isCode = node.name.endsWith(".ts") || node.name.endsWith(".tsx") || node.name.endsWith(".js");

  return (
    <button
      type="button"
      onClick={() => onSelect(node)}
      style={{ paddingLeft: depth * 14 + 20 }}
      className={cn(
        "flex items-center gap-1.5 py-1 text-xs text-muted-foreground hover:text-foreground hover:bg-muted/40 rounded-md transition-colors w-full text-left cursor-pointer font-mono",
        isSelected && "bg-primary/10 text-primary font-semibold"
      )}
    >
      {isCode ? <FileCode className="size-3.5 text-muted-foreground" /> : <FileText className="size-3.5 text-muted-foreground" />}
      <span>{node.name}</span>
    </button>
  );
}

export function FileTreeNavigator({
  nodes,
  selectedId,
  onSelectNode,
  className,
}: FileTreeNavigatorProps) {
  return (
    <div className={cn("flex flex-col gap-1 rounded-xl border border-border/70 bg-card p-2 shadow-xs", className)}>
      {nodes.map((node) => (
        <TreeNodeItem
          key={node.id}
          node={node}
          selectedId={selectedId}
          onSelect={onSelectNode}
          depth={0}
        />
      ))}
    </div>
  );
}
