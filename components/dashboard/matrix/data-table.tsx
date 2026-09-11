"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CaretLeft, CaretRight, MagnifyingGlass } from "@phosphor-icons/react";

export interface DataTableColumn<T> {
  key: keyof T | string;
  header: string;
  render?: (item: T) => React.ReactNode;
  sortable?: boolean;
}

export interface DataTableProps<T> {
  data: T[];
  columns: DataTableColumn<T>[];
  searchKey?: keyof T;
  pageSize?: number;
  className?: string;
}

export function DataTable<T extends Record<string, any>>({
  data,
  columns,
  searchKey,
  pageSize = 10,
  className,
}: DataTableProps<T>) {
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(0);

  const filteredData = React.useMemo(() => {
    if (!search || !searchKey) return data;
    return data.filter((item) => {
      const val = item[searchKey];
      return val && String(val).toLowerCase().includes(search.toLowerCase());
    });
  }, [data, search, searchKey]);

  const totalPages = Math.ceil(filteredData.length / pageSize);
  const paginatedData = React.useMemo(() => {
    const start = page * pageSize;
    return filteredData.slice(start, start + pageSize);
  }, [filteredData, page, pageSize]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {searchKey && (
        <div className="relative w-full max-w-xs">
          <MagnifyingGlass className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search records..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="pl-9 h-9 text-xs"
          />
        </div>
      )}

      <div className="rounded-xl border border-border/60 bg-card overflow-hidden shadow-xs">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow>
              {columns.map((col, idx) => (
                <TableHead key={String(col.key) + idx} className="text-xs font-semibold text-foreground">
                  {col.header}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedData.length === 0 ? (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center text-xs text-muted-foreground">
                  No records found.
                </TableCell>
              </TableRow>
            ) : (
              paginatedData.map((item, rowIdx) => (
                <TableRow key={item.id || rowIdx} className="hover:bg-muted/30 transition-colors">
                  {columns.map((col, colIdx) => (
                    <TableCell key={String(col.key) + colIdx} className="py-2.5 text-xs">
                      {col.render ? col.render(item) : String(item[col.key as keyof T] ?? "")}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {totalPages > 1 && (
        <div className="flex items-center justify-between text-xs text-muted-foreground px-1">
          <span>
            Page {page + 1} of {totalPages} ({filteredData.length} records)
          </span>
          <div className="flex items-center gap-1.5">
            <Button
              variant="outline"
              size="icon-sm"
              disabled={page === 0}
              onClick={() => setPage((p) => Math.max(0, p - 1))}
            >
              <CaretLeft className="size-3.5" />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              disabled={page >= totalPages - 1}
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
            >
              <CaretRight className="size-3.5" />
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
