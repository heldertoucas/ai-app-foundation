import { db } from '@/lib/db';
import { createWorkshop, deleteWorkshop } from './actions';

export default async function WorkshopsPage({
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

  const workshops = await db.workshop.findMany({
    where,
    orderBy: { date: 'asc' },
  });

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Workshops Management</h1>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Create New Workshop</h3>
        <form action={createWorkshop} className="grid gap-4 md:grid-cols-4">
          <input
            type="text"
            name="title"
            placeholder="Workshop title"
            required
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="flex h-10 w-full rounded-md border bg-background px-3 py=2 text-sm"
          />
          <input
            type="datetime-local"
            name="date"
            required
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Create Workshop
          </button>
        </form>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Title</th>
              <th className="p-4 font-medium">Date</th>
              <th className="p-4 font-medium">Status</th>
              <th className="p-4 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {workshops.length === 0 ? (
              <tr>
                <td colSpan={4} className="p-8 text-center text-muted-foreground">
                  No workshops found.
                </td>
              </tr>
            ) : (
              workshops.map((w) => (
                <tr key={w.id}>
                  <td className="p-4 font-medium">{w.title}</td>
                  <td className="p-4 text-muted-foreground">{new Date(w.date).toLocaleString()}</td>
                  <td className="p-4 font-medium">{w.status}</td>
                  <td className="p-4">
                    <form action={deleteWorkshop}>
                      <input type="hidden" name="id" value={w.id} />
                      <button
                        type="submit"
                        className="text-red-600 hover:underline text-sm"
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
  );
}