'use client';

import metadata from '@/data/metadata';
import { ThemeProvider } from 'next-themes';
import { ReactNode } from 'react';

export function ThemeProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme={metadata.theme} enableSystem>
      {children}
    </ThemeProvider>
  );
}
