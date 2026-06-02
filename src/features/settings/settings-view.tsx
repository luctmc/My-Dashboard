"use client";

import { Bell, Camera, Code2, Globe2, Save, type LucideIcon } from "lucide-react";
import { useTheme } from "next-themes";
import type { FormEvent } from "react";
import { toast } from "sonner";

import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { appConfig } from "@/config/app.config";
import { useSettingsStore } from "@/stores/settings-store";
import type { ThemePreference } from "@/types/settings";

export function SettingsView() {
  const { setTheme } = useTheme();
  const { settings, updateSettings } = useSettingsStore();

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setTheme(settings.theme);
    toast.success("Settings saved");
  };

  return (
    <div className="grid gap-6">
      <SectionHeader
        title="Settings"
        description="Local preferences for your dashboard, visual alerts and theme."
      />

      <div className="grid gap-6 xl:grid-cols-[1fr_0.8fr]">
        <Card>
          <CardHeader>
            <CardTitle>Preferences</CardTitle>
            <CardDescription>Saved in this browser using local persistence.</CardDescription>
          </CardHeader>
          <CardContent>
            <form className="grid gap-5" onSubmit={onSubmit}>
              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="user-name">
                  Local user name
                </label>
                <Input
                  id="user-name"
                  value={settings.userName}
                  onChange={(event) =>
                    updateSettings({ userName: event.target.value.trimStart() || "Lucas" })
                  }
                />
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="theme">
                  Theme preference
                </label>
                <select
                  id="theme"
                  className="h-10 rounded-md border bg-background/70 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
                  value={settings.theme}
                  onChange={(event) => {
                    const theme = event.target.value as ThemePreference;
                    updateSettings({ theme });
                    setTheme(theme);
                  }}
                >
                  <option value="system">System</option>
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>

              <div className="grid gap-2">
                <label className="text-sm font-medium" htmlFor="due-soon-days">
                  Due soon window in days
                </label>
                <Input
                  id="due-soon-days"
                  min={1}
                  max={14}
                  type="number"
                  value={settings.dueSoonDays}
                  onChange={(event) =>
                    updateSettings({ dueSoonDays: Number(event.target.value) })
                  }
                />
              </div>

              <label className="flex items-center gap-3 rounded-md border bg-muted/40 p-3 text-sm">
                <input
                  type="checkbox"
                  className="h-4 w-4 accent-primary"
                  checked={settings.visualNotifications}
                  onChange={(event) =>
                    updateSettings({ visualNotifications: event.target.checked })
                  }
                />
                <Bell className="h-4 w-4 text-muted-foreground" />
                Visual notifications for deadlines and expiring notes
              </label>

              <Button className="justify-self-start" type="submit">
                <Save className="h-4 w-4" />
                Save settings
              </Button>
            </form>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Creator links</CardTitle>
            <CardDescription>Configured in `src/config/app.config.ts`.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-3">
            <SocialLink icon={Globe2} label="LinkedIn" href={appConfig.socials.linkedin} />
            <SocialLink icon={Code2} label="GitHub" href={appConfig.socials.github} />
            <SocialLink icon={Camera} label="Instagram" href={appConfig.socials.instagram} />
            <div className="rounded-md border bg-muted/35 p-3 text-sm text-muted-foreground">
              Developed by <span className="font-medium text-foreground">{appConfig.author}</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function SocialLink({
  icon: Icon,
  label,
  href,
}: {
  icon: LucideIcon;
  label: string;
  href: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 rounded-md border bg-background/55 p-3 text-sm transition hover:bg-muted"
    >
      <Icon className="h-4 w-4 text-primary" />
      <span className="font-medium">{label}</span>
      <span className="ml-auto truncate text-xs text-muted-foreground">Placeholder</span>
    </a>
  );
}
