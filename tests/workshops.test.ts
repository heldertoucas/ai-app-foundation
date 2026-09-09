import { describe, it, expect } from 'vitest';
import { db } from '@/lib/db';


describe('Workshops Model', () => {
  it('should create and delete a workshop', async () => {
    const ws = await db.workshop.create({
      data: {
        title: 'Test Workshop',
        description: 'Testing Vitest',
        date: new Date(),
        status: 'UPCOMING',
      },
    });

    expect(ws.id).toBeDefined();
    expect(ws.title).toBe('Test Workshop');

    await db.workshop.delete({
      where: { id: ws.id },
    });

    const fetched = await db.workshop.findUnique({
      where: { id: ws.id },
    });
    expect(fetched).toBeNull();
  });
});
