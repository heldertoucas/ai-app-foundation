"use server";

import { revalidatePath } from "next/cache";
import { database } from "@repo/database";

export interface WorkshopItem {
  id: string;
  title: string;
  instructor: string;
  category: string;
  status: "DRAFT" | "PUBLISHED" | "ARCHIVED";
  capacity: number;
  createdAt: Date;
  updatedAt: Date;
}

let inMemoryWorkshops: WorkshopItem[] = [
  {
    id: "ws-1",
    title: "Intro to Agentic Engineering with Next.js",
    instructor: "Alex Rivers",
    category: "AI",
    status: "PUBLISHED",
    capacity: 25,
    createdAt: new Date("2026-03-01"),
    updatedAt: new Date("2026-03-01"),
  },
  {
    id: "ws-2",
    title: "Mastering shadcn/ui & Tailwind CSS v4",
    instructor: "Elena Vance",
    category: "Design",
    status: "PUBLISHED",
    capacity: 30,
    createdAt: new Date("2026-03-02"),
    updatedAt: new Date("2026-03-02"),
  },
  {
    id: "ws-3",
    title: "Prisma 7 & Local-First Database Architecture",
    instructor: "Marcus Brody",
    category: "Backend",
    status: "DRAFT",
    capacity: 15,
    createdAt: new Date("2026-03-03"),
    updatedAt: new Date("2026-03-03"),
  },
];

export async function getWorkshops(): Promise<WorkshopItem[]> {
  try {
    const records = await database.workshop.findMany({
      orderBy: { createdAt: "desc" },
    });
    return records as WorkshopItem[];
  } catch (_e) {
    return inMemoryWorkshops;
  }
}

export async function createWorkshop(formData: FormData) {
  const title = (formData.get("title") as string) || "Untitled Workshop";
  const instructor = (formData.get("instructor") as string) || "Staff Instructor";
  const category = (formData.get("category") as string) || "General";
  const capacity = Number(formData.get("capacity")) || 20;
  const status = (formData.get("status") as "DRAFT" | "PUBLISHED" | "ARCHIVED") || "DRAFT";

  try {
    await database.workshop.create({
      data: {
        title,
        instructor,
        category,
        capacity,
        status,
      },
    });
  } catch (_e) {
    const newItem: WorkshopItem = {
      id: `ws-${Date.now()}`,
      title,
      instructor,
      category,
      capacity,
      status,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    inMemoryWorkshops = [newItem, ...inMemoryWorkshops];
  }

  try {
    revalidatePath("/workshops");
  } catch (_e) {
    // Graceful no-op when executed in unit tests outside Next.js request context
  }
}

export async function deleteWorkshop(id: string) {
  try {
    await database.workshop.delete({ where: { id } });
  } catch (_e) {
    inMemoryWorkshops = inMemoryWorkshops.filter((w) => w.id !== id);
  }

  try {
    revalidatePath("/workshops");
  } catch (_e) {
    // Graceful no-op when executed outside request context
  }
}
