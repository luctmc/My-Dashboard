export type ThemePreference = "light" | "dark" | "system";

export type AppSettings = {
  userName: string;
  theme: ThemePreference;
  visualNotifications: boolean;
  dueSoonDays: number;
};
