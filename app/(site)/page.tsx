import Link from 'next/link';
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { ArrowRight, Layers, Database, Sparkles } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="container mx-auto px-4 py-16 sm:px-8 max-w-6xl flex flex-col gap-20">
      {/* Hero Section */}
      <div className="mx-auto max-w-3xl text-center flex flex-col items-center gap-6">
        <Badge variant="outline" className="px-3 py-1 gap-2 rounded-full border-border/80">
          <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="font-mono text-[11px] tracking-wide uppercase">
            Project Atlas — Executive Operating System
          </span>
        </Badge>
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl text-foreground leading-[1.1]">
          Orchestrate projects with{' '}
          <span className="bg-gradient-to-r from-indigo-500 via-sky-400 to-emerald-400 bg-clip-text text-transparent">
            calm precision
          </span>
          .
        </h1>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
          High visual density, zero noise, and local-first execution. Built on Next.js 16,
          canonical shadcn/ui components, and SQLite persistence.
        </p>
        <div className="flex items-center justify-center gap-4 pt-2">
          <Button size="lg" asChild className="gap-2 shadow-sm font-semibold">
            <Link href="/dashboard">
              <span>Open Dashboard</span>
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button variant="outline" size="lg" asChild>
            <a href="#features">Explore Stack</a>
          </Button>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div id="features" className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        <Card className="border-border/60 shadow-xs hover:border-border transition-all">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Layers className="size-5" />
            </div>
            <CardTitle className="text-base font-semibold">Restrained Hierarchy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Designed to minimize cognitive overhead with clean typography, high-contrast whitespace, and authentic shadcn/ui primitives.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs hover:border-border transition-all">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Database className="size-5" />
            </div>
            <CardTitle className="text-base font-semibold">Local-First Engine</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Zero cloud SaaS lock-in. Powered by local SQLite in WAL mode with connection limits and deterministic reliability.
            </p>
          </CardContent>
        </Card>

        <Card className="border-border/60 shadow-xs hover:border-border transition-all">
          <CardHeader className="flex flex-row items-center gap-3 space-y-0 pb-3">
            <div className="size-9 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
              <Sparkles className="size-5" />
            </div>
            <CardTitle className="text-base font-semibold">Design System Aligned</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Composed using standard New York style variants, semantic theme tokens, and Tailwind v4 CSS variables.
            </p>
          </CardContent>
        </Card>
      </div>

      <Separator />

      {/* Accessible Footer */}
      <footer className="flex flex-col sm:flex-row items-center justify-between text-xs text-muted-foreground gap-4 pb-8">
        <div>Project Atlas © 2026 — Built on ai-app-foundation</div>
        <div className="flex items-center gap-6">
          <Link href="/dashboard" className="hover:underline">
            Dashboard
          </Link>
          <Link href="/dashboard/workshops" className="hover:underline">
            Workshops
          </Link>
          <a href="#" className="hover:underline">
            Architecture
          </a>
        </div>
      </footer>
    </div>
  );
}
