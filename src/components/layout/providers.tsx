"use client";

import { ThemeProvider } from "next-themes";
import { useTheme } from "next-themes";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { Toaster } from "sonner";

import { useSettingsStore } from "@/stores/settings-store";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <ThemeSync />
      {children}
      <Toaster richColors position="top-right" />
    </ThemeProvider>
  );
}

function ThemeSync() {
  const { setTheme } = useTheme();
  const theme = useSettingsStore((state) => state.settings.theme);

  useEffect(() => {
    setTheme(theme);
  }, [setTheme, theme]);

  return null;
}
