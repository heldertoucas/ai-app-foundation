import { ThemeToggle } from '@/components/theme-toggle';
import Link from 'next/link';

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center justify-between px-4 sm:px-8">
          <Link href="/" className="flex items-center space-x-2 font-bold text-lg">
            <span>Lean App Foundation</span>
          </Link>
          <div className="flex items-center space-x-6">
            <nav className="hidden md:flex items-center space-x-5 text-sm font-medium text-muted-foreground">
              <Link href="#features" className="hover:text-foreground transition-colors">
                Funcionalidades
              </Link>
              <Link href="#components" className="hover:text-foreground transition-colors">
                Componentes
              </Link>
              <Link href="#process" className="hover:text-foreground transition-colors">
                Metodologia
              </Link>
              <Link href="/dashboard/library" className="hover:text-foreground transition-colors">
                Catálogo
              </Link>
            </nav>
            <Link
              href="/dashboard"
              className="text-sm font-semibold text-primary hover:underline underline-offset-4"
            >
              Dashboard
            </Link>
            <ThemeToggle />
          </div>
        </div>
      </header>
      <main className="flex-1">{children}</main>
      <footer className="border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row px-4 sm:px-8">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            Built for local-first, free-first AI application development.
          </p>
        </div>
      </footer>
    </div>
  );
}
