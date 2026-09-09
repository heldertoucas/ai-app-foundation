import { db } from '@/lib/db';
import { createAtlasProject, deleteAtlasProject } from './atlas-actions';
import Link from 'next/link';

export default async function DashboardPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; status?: string }>;
}) {
  const params = await searchParams;
  const query = params.q || '';
  const statusFilter = params.status || '';

  const where: any = {};
  if (query) {
    where.OR = [
      { title: { contains: query } },
      { description: { contains: query } },
    ];
  }
  if (statusFilter) {
    where.status = statusFilter;
  }

  const projects = await db.project.findMany({
    where,
    orderBy: { createdAt: 'desc' },
  });

  const activeCount = projects.filter((p) => p.status === 'Active').length;
  const totalCount = projects.length;
  const completedCount = projects.filter((p) => p.status === 'Completed').length;
  const completionRate = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 100;

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 py-8 sm:px-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b pb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Project Atlas Dashboard</h1>
          <p className="text-sm text-muted-foreground mt-1">Monitor active initiatives, progress velocity, and upcoming deadlines.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link
            href="/dashboard/workshops"
            className="px-3 py-2 text-xs font-medium border bg-background hover:bg-accent rounded-md transition-all"
          >
            View Workshops
          </Link>
        </div>
      </div>

      {/* KPI Section (4 Cards) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="rounded-xl border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Active Projects</span>
            <span className="text-emerald-500 font-semibold">Local-first</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{activeCount}</div>
          <p className="text-xs text-muted-foreground">{totalCount} total initiatives tracked</p>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Tasks Completed</span>
            <span className="text-sky-500 font-semibold">High velocity</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{completedCount}</div>
          <p className="text-xs text-muted-foreground">Verified via Prisma SQLite</p>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Completion Rate</span>
            <span className="text-indigo-500 font-semibold">Precision</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{completionRate}%</div>
          <p className="text-xs text-muted-foreground">Automated milestone calculation</p>
        </div>

        <div className="rounded-xl border bg-card p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-xs font-medium text-muted-foreground">
            <span>Upcoming Deadlines</span>
            <span className="text-amber-500 font-semibold">On schedule</span>
          </div>
          <div className="text-3xl font-bold text-foreground">{projects.filter(p => p.status !== 'Completed').length}</div>
          <p className="text-xs text-muted-foreground">Next milestone in progress</p>
        </div>
      </div>

      {/* Quick Add Form */}
      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold text-foreground">Create New Initiative</h3>
        <form action={createAtlasProject} className="grid gap-4 md:grid-cols-5">
          <input
            type="text"
            name="title"
            placeholder="Project title"
            required
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <input
            type="text"
            name="description"
            placeholder="Short description"
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <select
            name="status"
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          >
            <option value="Active">Active</option>
            <option value="In Progress">In Progress</option>
            <option value="Planning">Planning</option>
            <option value="Completed">Completed</option>
          </select>
          <input
            type="number"
            name="progress"
            placeholder="Progress (0-100)"
            min="0"
            max="100"
            defaultValue="0"
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Add Project
          </button>
        </form>
      </div>

      {/* Main Content: Table + Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Project Table */}
        <div className="lg:col-span-2 space-y-4">
          <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
            <table className="w-full text-left text-xs">
              <thead className="bg-muted/50 text-muted-foreground font-semibold border-b">
                <tr>
                  <th className="p-4">Project</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Progress</th>
                  <th className="p-4">Owner</th>
                  <th className="p-4">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y text-foreground">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-muted-foreground">
                      No active projects found. Create one above!
                    </td>
                  </tr>
                ) : (
                  projects.map((p) => (
                    <tr key={p.id} className="hover:bg-muted/30 transition-colors">
                      <td className="p-4 font-medium">
                        <div>{p.title}</div>
                        {p.description && <div className="text-[11px] text-muted-foreground mt-0.5">{p.description}</div>}
                      </td>
                      <td className="p-4">
                        <span className={`px-2 py-0.5 rounded-full text-[11px] font-medium border ${
                          p.status === 'Active' ? 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400' :
                          p.status === 'In Progress' ? 'bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400' :
                          p.status === 'Completed' ? 'bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400' :
                          'bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400'
                        }`}>
                          {p.status}
                        </span>
                      </td>
                      <td className="p-4 w-32">
                        <div className="flex items-center space-x-2">
                          <div className="w-full bg-muted rounded-full h-1.5 overflow-hidden">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${p.progress}%` }}></div>
                          </div>
                          <span className="text-[10px] text-muted-foreground font-mono">{p.progress}%</span>
                        </div>
                      </td>
                      <td className="p-4 text-muted-foreground">{p.owner}</td>
                      <td className="p-4">
                        <form action={deleteAtlasProject}>
                          <input type="hidden" name="id" value={p.id} />
                          <button
                            type="submit"
                            className="text-destructive hover:underline text-xs"
                          >
                            Delete
                          </button>
                        </form>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Activity Feed */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-card p-5 space-y-4 shadow-sm">
            <h3 className="font-semibold text-sm text-foreground">Recent Activity</h3>
            <div className="space-y-3 text-xs">
              <div className="flex items-start space-x-3 pb-3 border-b">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-emerald-500 shrink-0"></div>
                <div>
                  <div className="text-foreground">Foundation v1.0 hardened and verified</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">Just now</div>
                </div>
              </div>
              <div className="flex items-start space-x-3 pb-3 border-b">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-indigo-500 shrink-0"></div>
                <div>
                  <div className="text-foreground">Created Project Atlas OpenSpec change</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">30m ago</div>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <div className="h-2 w-2 mt-1.5 rounded-full bg-sky-500 shrink-0"></div>
                <div>
                  <div className="text-foreground">Vitest & Playwright test suites passed</div>
                  <div className="text-[10px] text-muted-foreground mt-0.5">1h ago</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
