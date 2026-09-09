import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export default async function DashboardPage() {
  const items = await db.item.findMany({ orderBy: { createdAt: 'desc' } });

  async function addItem(formData: FormData) {
    'use server';
    const name = formData.get('name') as string;
    const description = formData.get('description') as string;
    if (!name) return;
    await db.item.create({
      data: { name, description },
    });
    revalidatePath('/dashboard');
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3x font-bold tracking-tight">Overview</h1>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-xl border bg-card p-6 text-card-foreground shadow-sm">
          <div className="text-sm font-medium text-muted-foreground">Total Items</div>
          <div className="text-2x font-bold mt-2">{items.length}</div>
        </div>
      </div>

      <div className="rounded-xl border bg-card p-6 shadow-sm space-y-4">
        <h3 className="text-lg font-semibold">Add New Item</h3>
        <form action={addItem} className="flex gap-4">
          <input
            type="text"
            name="name"
            placeholder="Item name"
            required
            className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            className="flex h-10 w-full rounded-md border bg-background px-3 py=2 text-sm"
          />
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
          >
            Add
          </button>
        </form>
      </div>

      <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
        <table className="w-full text-left text-sm">
          <thead className="bg-muted/50 text-muted-foreground">
            <tr>
              <th className="p-4 font-medium">Name</th>
              <th className="p-4 font-medium">Description</th>
              <th className="p-4 font-medium">Created At</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {items.length === 0 ? (
              <tr>
                <td colSpan={3} className="p-4 text-center text-muted-foreground">
                  No items found.
                </td>
              </tr>
            ) : (
              items.map((item) => (
                <tr key={item.id}>
                  <td className="p-4 font-medium">{item.name}</td>
                  <td className="p-4 text-muted-foreground">{item.description || '-'}</td>
                  <td className="p-4 text-muted-foreground">{new Date(item.createdAt).toLocaleDateString()}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
