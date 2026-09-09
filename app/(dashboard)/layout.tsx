import Link from 'next/link';
import { ThemeToggle } from '@/components/theme-toggle';

export default function DashboardLayout(	{
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <aside className="w-64 border-r bg-muted/20 px-4 py-6 flex flex-col justify-between">
        <div className="space-y-6">
          <Link href="/dashboard" className="font-bold text-lg block">
            App Dashboard
          </Link>
          <nav className="space-y-1">
            <Link
              href="/dashboard"
              className="block rounded-md bg-accent px-3 py-2 text-sm font-medium text-accent-foreground"
            >
              Overview
            </Link>
          </nav>
        </div>
        <div>
          <Link href="/" className="text-sm text-muted-foreground hover:underline">
            Back to Site
          </Link>
        </div>
      </aside>
      <div className="flex-1 flex flex-col">
        <header className="h-14 border-b px-6 flex items-center justify-end">
          <ThemeToggle />
        </header>
        <main className="flex-1 px-6 py-8">{children}</main>
      </div>
    </div>
  );
}
