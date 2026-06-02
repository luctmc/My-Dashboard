"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

import { Button } from "@/components/ui/button";
import { useSettingsStore } from "@/stores/settings-store";
import type { ThemePreference } from "@/types/settings";

const themeOptions: Array<{ value: ThemePreference; icon: typeof Sun; label: string }> = [
  { value: "light", icon: Sun, label: "Light theme" },
  { value: "dark", icon: Moon, label: "Dark theme" },
  { value: "system", icon: Monitor, label: "System theme" },
];

export function ThemeToggle() {
  const { setTheme } = useTheme();
  const { settings, updateSettings } = useSettingsStore();

  const currentIndex = themeOptions.findIndex((item) => item.value === settings.theme);
  const next = themeOptions[(currentIndex + 1) % themeOptions.length];
  const Icon = themeOptions[currentIndex]?.icon ?? Monitor;

  return (
    <Button
      size="icon"
      variant="outline"
      title={next.label}
      aria-label={next.label}
      onClick={() => {
        updateSettings({ theme: next.value });
        setTheme(next.value);
      }}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );
}
