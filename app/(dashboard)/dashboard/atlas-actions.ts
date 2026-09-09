'use server';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

export async function createAtlasProject(formData: FormData) {
  const title = formData.get('title') as string;
  const description = formData.get('description') as string;
  const status = (formData.get('status') as string) || 'Active';
  const progressStr = formData.get('progress') as string;
  const progress = progressStr ? parseInt(progressStr, 10) : 0;
  const deadlineStr = formData.get('deadline') as string;

  if (!title) return;

  const deadline = deadlineStr ? new Date(deadlineStr) : new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);

  await db.project.create({
    data: {
      title,
      description,
      status,
      progress,
      deadline,
    },
  });

  revalidatePath('/dashboard');
}

export async function deleteAtlasProject(formData: FormData) {
  const id = formData.get('id') as string;
  if (!id) return;
  await db.project.delete({ where: { id } });
  revalidatePath('/dashboard');
}
