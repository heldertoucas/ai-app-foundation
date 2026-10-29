"use client";

import React from "react";
import { ThemeToggle } from "@/components/theme-toggle";

export function FuturoDigitalClientToolbar() {
  return (
    <div className="flex items-center gap-2">
      <ThemeToggle />
    </div>
  );
}
