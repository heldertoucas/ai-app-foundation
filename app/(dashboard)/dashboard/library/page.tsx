import * as React from "react";
import { LibraryClientView } from "@/components/dashboard/library";

export const metadata = {
  title: "Component Library | DU Second Brain",
  description:
    "Interactive showcase of 30+ production dashboard cards, analytical charts, heatmaps, and AI agent cockpit primitives.",
};

export default function ComponentLibraryPage() {
  return <LibraryClientView />;
}
