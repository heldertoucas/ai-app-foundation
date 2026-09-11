import { describe, it, expect } from "vitest";
import React from "react";
import ReactDOMServer from "react-dom/server";
import { KpiStatCard } from "../kpi-stat-card";

describe("KpiStatCard", () => {
  it("renders title, value, and positive change percentage to HTML", () => {
    const html = ReactDOMServer.renderToString(
      React.createElement(KpiStatCard, {
        title: "Sync Rate",
        value: "99.4%",
        change: 12.5,
        changePeriod: "vs last sprint",
      })
    );

    expect(html).toContain("Sync Rate");
    expect(html).toContain("99.4%");
    expect(html).toContain("+12.5%");
    expect(html).toContain("vs last sprint");
  });
});
