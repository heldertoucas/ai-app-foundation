import { describe, it, expect, beforeAll } from 'vitest';
import { db } from '@/lib/db';

describe('SQLite Persistence & Prisma Singleton', () => {
  it('should create and query an item in dev.db', async () => {
    const testName = `Test Item ${Date.now()}`;
    const item = await db.item.create({
      data: {
        name: testName,
        description: 'Validation unit test',
      },
    });

    expect(item.id).toBeDefined();
    expect(item.name).toBe(testName);

    const fetched = await db.item.findUnique({
      where: { id: item.id },
    });
    expect(fetched).not.toBeNull();
    expect(fetched?.name).toBe(testName);
  });
});
