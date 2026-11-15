'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';

const ALLOWED_STATUSES = ['Active', 'Planning', 'Completed', 'Archived'] as const;
type ProjectStatus = (typeof ALLOWED_STATUSES)[number];

export async function createAtlasProject(formData: FormData): Promise<void> {
  const rawTitle = formData.get('title');
  if (typeof rawTitle !== 'string' || !rawTitle.trim()) {
    throw new Error('Project title is required and cannot be empty.');
  }
  const title = rawTitle.trim().slice(0, 100);

  const rawDescription = formData.get('description');
  const description = typeof rawDescription === 'string' && rawDescription.trim()
    ? rawDescription.trim().slice(0, 500)
    : null;

  const rawStatus = formData.get('status');
  const status: ProjectStatus = typeof rawStatus === 'string' && ALLOWED_STATUSES.includes(rawStatus as ProjectStatus)
    ? (rawStatus as ProjectStatus)
    : 'Active';

  const progressStr = formData.get('progress');
  const parsedProgress = typeof progressStr === 'string' ? parseInt(progressStr, 10) : 0;
  const progress = Number.isFinite(parsedProgress) ? Math.max(0, Math.min(100, parsedProgress)) : 0;

  const deadlineStr = formData.get('deadline');
  let deadline = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
  if (typeof deadlineStr === 'string' && deadlineStr.trim()) {
    const parsedDate = new Date(deadlineStr);
    if (!isNaN(parsedDate.getTime())) {
      deadline = parsedDate;
    }
  }

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

export async function deleteAtlasProject(formData: FormData): Promise<void> {
  const id = formData.get('id');
  if (typeof id !== 'string' || !id.trim()) {
    throw new Error('Valid project ID is required for deletion.');
  }

  await db.project.delete({ where: { id: id.trim() } });
  revalidatePath('/dashboard');
}
