import { auth } from "@repo/auth/server";
import { database } from "@repo/database";
import type { Metadata } from "next";
import dynamic from "next/dynamic";
import { env } from "@/env";
import { AvatarStack } from "./components/avatar-stack";
import { Cursors } from "./components/cursors";
import { Header } from "./components/header";

const title = "Acme Inc";
const description = "My application.";

const CollaborationProvider = dynamic(() =>
  import("./components/collaboration-provider").then(
    (mod) => mod.CollaborationProvider
  )
);

export const metadata: Metadata = {
  title,
  description,
};

const App = async () => {
  let pages: Array<{ id: number; name: string }> = [];
  try {
    pages = await database.page.findMany();
  } catch (_e) {
    // Graceful fallback when database tables are not yet migrated
    pages = [
      { id: 1, name: "Getting Started" },
      { id: 2, name: "Components & Primitives" },
      { id: 3, name: "AI Agent Workflows" },
    ];
  }

  const { orgId } = await auth();

  return (
    <>
      <Header page="Data Fetching" pages={["Building Your Application"]}>
        {env.LIVEBLOCKS_SECRET && orgId && (
          <CollaborationProvider orgId={orgId}>
            <AvatarStack />
            <Cursors />
          </CollaborationProvider>
        )}
      </Header>
      <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
        <div className="grid auto-rows-min gap-4 md:grid-cols-3">
          {pages.map((page) => (
            <div
              className="flex aspect-video items-center justify-center rounded-xl border border-border bg-card p-4 text-center font-medium text-foreground shadow-sm"
              key={page.id}
            >
              {page.name}
            </div>
          ))}
        </div>
        <div className="flex min-h-[50vh] flex-1 flex-col items-center justify-center rounded-xl border border-border border-dashed p-6 text-center text-muted-foreground">
          <p className="font-medium text-base text-foreground">
            Welcome to your AI App Foundation
          </p>
          <p className="mt-1 max-w-md text-sm">
            Local-first, free-first, and ready for rapid agent development with
            shadcn/ui and Next.js.
          </p>
        </div>
      </div>
    </>
  );
};

export default App;
