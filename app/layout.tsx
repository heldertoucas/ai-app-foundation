import type { Metadata } from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { TooltipProvider } from '@/components/ui/tooltip';
import { GeistSans } from 'geist/font/sans';
import { GeistMono } from 'geist/font/mono';
import localFont from 'next/font/local';
import { cn } from "@/lib/utils";

const firaSans = localFont({
  src: [
    { path: './fonts/fira-sans/fira-sans-latin-300-normal.woff2', weight: '300', style: 'normal' },
    { path: './fonts/fira-sans/fira-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/fira-sans/fira-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/fira-sans/fira-sans-latin-600-normal.woff2', weight: '600', style: 'normal' },
    { path: './fonts/fira-sans/fira-sans-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: './fonts/fira-sans/fira-sans-latin-800-normal.woff2', weight: '800', style: 'normal' },
  ],
  variable: '--font-fira',
});


export const metadata: Metadata = {
  title: 'Lean App Foundation',
  description: 'Local-first Next.js 16 + React 19 App Foundation',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-PT" suppressHydrationWarning className={cn("font-sans", GeistSans.variable, GeistMono.variable, firaSans.variable)}>
      <body className="min-h-screen bg-background font-sans antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          storageKey="du-theme-preference"
          disableTransitionOnChange
        >
          <TooltipProvider>{children}</TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
