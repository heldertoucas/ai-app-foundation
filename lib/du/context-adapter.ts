import "server-only";
import { cache } from "react";
import { DuContextTelemetry } from "@/lib/du/types";
import { FALLBACK_CONTEXT_TELEMETRY } from "@/lib/du/fixtures";

/**
 * Context Capsule Adapter.
 * Provides radar dimensions and token budget metrics.
 */
export const getContextTelemetry = cache(async (): Promise<DuContextTelemetry> => {
  return FALLBACK_CONTEXT_TELEMETRY;
});
