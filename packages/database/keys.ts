import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const keys = () =>
  createEnv({
    skipValidation:
      process.env.SKIP_ENV_VALIDATION === "true" ||
      process.env.NODE_ENV === "test",
    server: {
      DATABASE_URL: z
        .string()
        .min(1)
        .default("postgresql://postgres:postgres@localhost:5432/ai_foundation"),
    },
    runtimeEnv: {
      DATABASE_URL:
        process.env.DATABASE_URL ||
        "postgresql://postgres:postgres@localhost:5432/ai_foundation",
    },
  });
