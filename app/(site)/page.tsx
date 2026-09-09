import Link from 'next/link';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-8 max-w-6xl space-y-20">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center space-y-6">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border bg-muted/50 text-xs font-medium">
          <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span>Project Atlas — Executive Operating System</span>
        </div>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground">
          Orchestrate projects with <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">calm precision</span>.
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed">
          High visual density, zero noise, and local-first execution. Built on Next.js 16 and SQLite persistence.
        </p>
        <div className="flex justify-center gap-4 pt-2">
          <Link
            href="/dashboard"
            className="inline-flex items-center justify-center rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow hover:bg-primary/90 transition-all"
          >
            Open Dashboard →
          </Link>
          <a
            href="#features"
            className="inline-flex items-center justify-center rounded-lg border bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-accent transition-colors"
          >
            Explore Stack
          </a>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6">
        <div className="rounded-xl border bg-card p-6 space-y-3 shadow-sm hover:border-foreground/20 transition-all">
          <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
            01
          </div>
          <h3 className="font-semibold text-lg">Restrained Visual Hierarchy</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Designed to minimize cognitive load with clean typography, high-contrast whitespace, and composed shadcn primitives.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-3 shadow-sm hover:border-foreground/20 transition-all">
          <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
            02
          </div>
          <h3 className="font-semibold text-lg">Local-First Persistence</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Zero cloud SaaS lock-in. Powered by local SQLite in WAL mode with deterministic execution guarantees.
          </p>
        </div>

        <div className="rounded-xl border bg-card p-6 space-y-3 shadow-sm hover:border-foreground/20 transition-all">
          <div className="h-10 w-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center font-bold text-primary">
            03
          </div>
          <h3 className="font-semibold text-lg">Responsive & Fast</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Adapts smoothly across mobile, tablet, and desktop viewports with server-rendered efficiency.
          </p>
        </div>
      </div>

      {/* Accessible Footer */}
      <footer className="border-t pt-8 pb-12 flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4">
        <div>Project Atlas © 2026 — Built on ai-app-foundation</div>
        <div className="flex space-x-6">
          <Link href="/dashboard" className="hover:underline">Dashboard</Link>
          <a href="#" className="hover:underline">Documentation</a>
        </div>
      </footer>
    </div>
  );
}
