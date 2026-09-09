import { describe, it, expect } from 'vitest';
import { db } from '@/lib/db';

describe('Project Atlas Data Layer', () => {
  it('should create, query, and delete a Project record cleanly', async () => {
    const project = await db.project.create({
      data: {
        title: 'Test Validation Project',
        description: 'Integration test for Project Atlas',
        status: 'Active',
        progress: 50,
        deadline: new Date(),
      },
    });

    expect(project.id).toBeDefined();
    expect(project.title).toBe('Test Validation Project');

    const fetched = await db.project.findUnique({ where: { id: project.id } });
    expect(fetched).not.toBeNull();
    expect(fetched?.status).toBe('Active');

    await db.project.delete({ where: { id: project.id } });
    const deleted = await db.project.findUnique({ where: { id: project.id } });
    expect(deleted).toBeNull();
  });
});
