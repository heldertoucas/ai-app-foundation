"use client";

import { useState, useTransition } from "react";
import { Badge } from "@repo/design-system/components/ui/badge";
import { Button } from "@repo/design-system/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@repo/design-system/components/ui/card";
import { Input } from "@repo/design-system/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@repo/design-system/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@repo/design-system/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@repo/design-system/components/ui/dialog";
import { BookOpen, Users, Plus, Search, Trash2, Calendar } from "lucide-react";
import { createWorkshop, deleteWorkshop, type WorkshopItem } from "./actions";

export function WorkshopDashboardClient({ initialWorkshops }: { initialWorkshops: WorkshopItem[] }) {
  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("ALL");
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isPending, startTransition] = useTransition();

  const filtered = initialWorkshops.filter((w) => {
    const matchesSearch =
      w.title.toLowerCase().includes(search.toLowerCase()) ||
      w.instructor.toLowerCase().includes(search.toLowerCase());
    const matchesCat = categoryFilter === "ALL" || w.category === categoryFilter;
    return matchesSearch && matchesCat;
  });

  const totalCapacity = initialWorkshops.reduce((acc, w) => acc + w.capacity, 0);
  const publishedCount = initialWorkshops.filter((w) => w.status === "PUBLISHED").length;

  const categories = Array.from(new Set(initialWorkshops.map((w) => w.category)));

  return (
    <div className="flex flex-1 flex-col gap-6 p-6">
      {/* Header & Action */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Workshop Management</h1>
          <p className="text-sm text-muted-foreground">Manage schedule, capacity, and workshop instructors.</p>
        </div>

        <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
          <DialogTrigger asChild>
            <Button className="gap-2">
              <Plus className="h-4 w-4" />
              New Workshop
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-md">
            <form
              action={(formData) => {
                startTransition(async () => {
                  await createWorkshop(formData);
                  setIsCreateOpen(false);
                });
              }}
            >
              <DialogHeader>
                <DialogTitle>Create Workshop</DialogTitle>
                <DialogDescription>Add a new workshop to the internal catalog.</DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid gap-2">
                  <label htmlFor="title" className="text-sm font-medium text-foreground">Title</label>
                  <Input id="title" name="title" placeholder="e.g. Advanced Agent Workflows" required />
                </div>
                <div className="grid gap-2">
                  <label htmlFor="instructor" className="text-sm font-medium text-foreground">Instructor</label>
                  <Input id="instructor" name="instructor" placeholder="Instructor name" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="grid gap-2">
                    <label htmlFor="category" className="text-sm font-medium text-foreground">Category</label>
                    <Input id="category" name="category" placeholder="AI, Design, etc." required />
                  </div>
                  <div className="grid gap-2">
                    <label htmlFor="capacity" className="text-sm font-medium text-foreground">Capacity</label>
                    <Input id="capacity" name="capacity" type="number" defaultValue="20" min="1" max="100" required />
                  </div>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsCreateOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit" disabled={isPending}>
                  {isPending ? "Creating..." : "Save Workshop"}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* KPI Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Workshops</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{initialWorkshops.length}</div>
            <p className="text-xs text-muted-foreground mt-1">{publishedCount} active & published</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Seat Capacity</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCapacity}</div>
            <p className="text-xs text-muted-foreground mt-1">Available across all courses</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Next Scheduled</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">This Week</div>
            <p className="text-xs text-muted-foreground mt-1">Local-first attendance</p>
          </CardContent>
        </Card>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search by title or instructor..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-8"
          />
        </div>

        <div className="flex items-center gap-2">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Categories</SelectItem>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Data Table */}
      <div className="rounded-md border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Title</TableHead>
              <TableHead>Instructor</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Capacity</TableHead>
              <TableHead className="w-[60px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-32 text-center text-muted-foreground">
                  No workshops found matching your filters.
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((workshop) => (
                <TableRow key={workshop.id}>
                  <TableCell className="font-medium text-foreground">{workshop.title}</TableCell>
                  <TableCell className="text-muted-foreground">{workshop.instructor}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{workshop.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={workshop.status === "PUBLISHED" ? "default" : "secondary"}>
                      {workshop.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right font-medium">{workshop.capacity}</TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-destructive"
                      disabled={isPending}
                      onClick={() => {
                        startTransition(async () => {
                          await deleteWorkshop(workshop.id);
                        });
                      }}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
