'use client';

import { ThemeProvider } from 'next-themes';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      storageKey="theme"
      disableTransitionOnChange
      value={{
        dark: 'dark',
        light: 'light',
      }}
    >
      {children}
    </ThemeProvider>
  );
}
