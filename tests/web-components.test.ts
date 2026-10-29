import { describe, it, expect } from "vitest";
import { LIBRARY_CATEGORIES, COMPONENT_REGISTRY } from "@/lib/library/component-registry";

describe("Web & Marketing Component System", () => {
  it("registers the 'web' category in LIBRARY_CATEGORIES", () => {
    const webCat = LIBRARY_CATEGORIES.find((c) => c.id === "web");
    expect(webCat).toBeDefined();
    expect(webCat?.label).toBe("Web & Marketing");
  });

  it("registers all foundational web components in COMPONENT_REGISTRY", () => {
    const webComponents = COMPONENT_REGISTRY.filter((c) => c.category === "web");
    const ids = webComponents.map((c) => c.id);

    expect(ids).toContain("marketing-hero");
    expect(ids).toContain("feature-grid");
    expect(ids).toContain("showcase-card");
    expect(ids).toContain("process-steps");
    expect(ids).toContain("callout");
    expect(ids).toContain("testimonial-card");
    expect(ids).toContain("cta-banner");
  });

  it("ensures each web component defines requirements and copyable snippets", () => {
    const webComponents = COMPONENT_REGISTRY.filter((c) => c.category === "web");
    for (const comp of webComponents) {
      expect(comp.requirements.importPath).toContain("@/components/web");
      expect(comp.snippet.length).toBeGreaterThan(20);
      expect(comp.props.length).toBeGreaterThan(0);
    }
  });
});
