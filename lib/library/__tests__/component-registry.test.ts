import { describe, it, expect } from "vitest";
import {
  COMPONENT_REGISTRY,
  LIBRARY_CATEGORIES,
  type LibraryCategory,
} from "../component-registry";
import * as dashboardExports from "@/components/dashboard";
import * as webExports from "@/components/web";

describe("Component Registry", () => {
  it("registers at least 30 components across the dashboard design system", () => {
    expect(COMPONENT_REGISTRY.length).toBeGreaterThanOrEqual(30);
  });

  it("defines all 7 canonical library categories", () => {
    const expectedCategories: LibraryCategory[] = [
      "metrics",
      "charts",
      "matrix",
      "workflow",
      "inspection",
      "agents",
      "actions",
    ];

    const registeredCategoryIds = LIBRARY_CATEGORIES.map((c) => c.id);
    for (const cat of expectedCategories) {
      expect(registeredCategoryIds).toContain(cat);
    }
  });

  it("ensures every category has at least one component in the registry", () => {
    for (const cat of LIBRARY_CATEGORIES) {
      const items = COMPONENT_REGISTRY.filter((c) => c.category === cat.id);
      expect(items.length).toBeGreaterThan(0);
    }
  });

  it("verifies every registry entry matches a real export in components/dashboard or components/web", () => {
    const dashMap = dashboardExports as Record<string, any>;
    const webMap = webExports as Record<string, any>;

    for (const item of COMPONENT_REGISTRY) {
      const map = item.category === "web" ? webMap : dashMap;
      const expectedPath = item.category === "web" ? "@/components/web" : "@/components/dashboard";
      expect(
        map[item.exportName],
        `Component export '${item.exportName}' was not found in ${expectedPath}`
      ).toBeDefined();
    }
  });

  it("verifies every registry entry has valid requirements, mock data, and copyable snippet", () => {
    for (const item of COMPONENT_REGISTRY) {
      // Identity
      expect(item.id).toBeTruthy();
      expect(item.name).toBeTruthy();
      expect(item.description).toBeTruthy();

      // Requirements
      expect(item.requirements).toBeDefined();
      expect(item.requirements.shadcnCommand).toMatch(/^npx shadcn@latest add /);
      expect(Array.isArray(item.requirements.peerDependencies)).toBe(true);
      const expectedImportPrefix = item.category === "web" ? "@/components/web" : "@/components/dashboard";
      expect(item.requirements.importPath).toContain(expectedImportPrefix);

      // Snippet
      expect(typeof item.snippet).toBe("string");
      expect(item.snippet.length).toBeGreaterThan(20);
      expect(item.snippet).toContain(item.exportName);

      // Mock Data
      expect(item.mockData).toBeDefined();
    }
  });
});
