"use server";
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { assertLocalAction } from '@/lib/security/assert-local-action';

export async function createWorkshop(formData: FormData) {
  await assertLocalAction();
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const dateStr = formData.get('date') as string;
  const status = (formData.get('status') as string) || 'UPCOMING';

  if (!title || !dateStr) return;
  await db.workshop.create({
    data: {
      title,
      description,
      date: new Date(dateStr),
      status,
    },
  });
  revalidatePath('/dashboard/workshops');
}

export async function deleteWorkshop(data: FormData) {
  await assertLocalAction();
  const id = data.get('id') as string;
  if (!id) return;
  await db.workshop.delete({ where: { id } });
  revalidatePath('/dashboard/workshops');
}
