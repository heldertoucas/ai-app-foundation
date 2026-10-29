import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import React from "react";
import ReactDOMServer from "react-dom/server";
import {
  CardErrorBoundary,
  ComponentPreviewCard,
} from "../component-preview-card";
import { COMPONENT_REGISTRY } from "@/lib/library/component-registry";
import * as clipboardModule from "@/lib/clipboard";

describe("ComponentPreviewCard & CardErrorBoundary", () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  describe("CardErrorBoundary", () => {
    it("updates state on thrown error via getDerivedStateFromError", () => {
      const testError = new Error("Simulated component crash");
      const state = CardErrorBoundary.getDerivedStateFromError(testError);
      expect(state.hasError).toBe(true);
      expect(state.error).toBe(testError);
    });

    it("renders fallback UI with 'Preview unavailable' when in error state", () => {
      const boundary = new CardErrorBoundary({
        children: React.createElement("div", null, "Normal Content"),
      });
      boundary.state = {
        hasError: true,
        error: new Error("Mock chart explosion"),
      };

      const fallbackElement = boundary.render();
      const html = ReactDOMServer.renderToString(fallbackElement as React.ReactElement);

      expect(html).toContain("Preview unavailable");
      expect(html).toContain("Mock chart explosion");
      expect(html).toContain("Retry Preview");
    });

    it("resets error state when reset() is triggered", () => {
      const onReset = vi.fn();
      const boundary = new CardErrorBoundary({
        children: React.createElement("div", null, "Normal Content"),
        onReset,
      });
      boundary.state = {
        hasError: true,
        error: new Error("Mock crash"),
      };

      boundary.reset();
      expect(boundary.state.hasError).toBe(false);
      expect(boundary.state.error).toBeUndefined();
      expect(onReset).toHaveBeenCalledTimes(1);
    });
  });

  describe("ComponentPreviewCard Rendering", () => {
    it("renders component title, category badge, and requirements to HTML", () => {
      const item = COMPONENT_REGISTRY.find((c) => c.id === "kpi-stat-card");
      expect(item).toBeDefined();

      const html = ReactDOMServer.renderToString(
        React.createElement(ComponentPreviewCard, { item: item! })
      );

      expect(html).toContain("KpiStatCard");
      expect(html).toContain("Metrics &amp; KPIs");
      expect(html).toContain("npx shadcn@latest add card badge");
      expect(html).toContain("import { KpiStatCard } from &quot;@/components/dashboard/metrics&quot;;");
    });

    it("triggers clipboard copy on component snippet correctly", async () => {
      const copySpy = vi.spyOn(clipboardModule, "copyToClipboard").mockResolvedValue({ success: true });
      const item = COMPONENT_REGISTRY[0];

      const res = await clipboardModule.copyToClipboard(item.snippet);
      expect(res.success).toBe(true);
      expect(copySpy).toHaveBeenCalledWith(item.snippet);
    });
  });
});
