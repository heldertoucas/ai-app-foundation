"use client";

import * as React from 'react';
import { usePathname } from 'next/navigation';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

const LIGHT_ONLY_PREFIXES = ['/futuro-digital'];

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  const pathname = usePathname();
  const forcedTheme = LIGHT_ONLY_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`))
    ? 'light'
    : undefined;
  return <NextThemesProvider {...props} forcedTheme={forcedTheme}>{children}</NextThemesProvider>;
}
