import { describe, expect, it } from "vitest";
import { getWorkshops, createWorkshop, deleteWorkshop } from "./actions";

describe("Workshop Acceptance Feature Tests", () => {
  it("retrieves default workshops via getWorkshops", async () => {
    const workshops = await getWorkshops();
    expect(workshops).toBeDefined();
    expect(workshops.length).toBeGreaterThanOrEqual(1);
    expect(workshops[0]).toHaveProperty("title");
    expect(workshops[0]).toHaveProperty("instructor");
    expect(workshops[0]).toHaveProperty("capacity");
  });

  it("creates a new workshop and verifies in catalog", async () => {
    const formData = new FormData();
    formData.set("title", "Test Automated Agent Workshop");
    formData.set("instructor", "Antigravity Bot");
    formData.set("category", "Automation");
    formData.set("capacity", "42");
    formData.set("status", "PUBLISHED");

    await createWorkshop(formData);
    const updated = await getWorkshops();
    const found = updated.find((w) => w.title === "Test Automated Agent Workshop");
    expect(found).toBeDefined();
    expect(found?.instructor).toBe("Antigravity Bot");
    expect(found?.capacity).toBe(42);

    if (found) {
      await deleteWorkshop(found.id);
      const afterDelete = await getWorkshops();
      expect(afterDelete.find((w) => w.id === found.id)).toBeUndefined();
    }
  });
});
