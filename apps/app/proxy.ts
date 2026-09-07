import { authMiddleware } from "@repo/auth/proxy";
import {
  noseconeOptions,
  noseconeOptionsWithToolbar,
  securityMiddleware,
} from "@repo/security/proxy";
import { NextResponse, type NextRequest } from "next/server";
import { env } from "./env";

const securityHeaders = env.FLAGS_SECRET
  ? securityMiddleware(noseconeOptionsWithToolbar)
  : securityMiddleware(noseconeOptions);

export default function proxy(request: NextRequest, event: any) {
  // If Clerk key is configured, use upstream Clerk middleware
  if (process.env.CLERK_SECRET_KEY) {
    const clerk = authMiddleware(() => securityHeaders());
    return (clerk as any)(request, event);
  }

  // Local-first mode without mandatory Clerk authentication
  return securityHeaders();
}

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
