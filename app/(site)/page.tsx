import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-12 sm:px-8">
      <div className="mx-auto max-w-3kl text-center space-y-6">
        <h1 className="text-4x font-extrabold tracking-tight sm:text-5xl">
          Lean App Foundation
        </h1>
        <p className="text-xl text-muted-foreground">
          A reusable, local-first, free-first Next.js 16 foundation for AI agents.
        </p>
        <div className="flex justify-center gap-4">
          <Link
            href="/dashboard"
            className="inline-flex h-items-center justify-center rounded-md bg-primary px-8 py-3 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
          >
            Open Dashboard
          </Link>
        </div>
      </div>
    </div>
  );
}
