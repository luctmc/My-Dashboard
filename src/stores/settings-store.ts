"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { browserStorage } from "@/lib/storage/create-json-storage";
import type { AppSettings } from "@/types/settings";

type SettingsState = {
  settings: AppSettings;
  updateSettings: (settings: Partial<AppSettings>) => void;
};

export const defaultSettings: AppSettings = {
  userName: "Lucas",
  theme: "system",
  visualNotifications: true,
  dueSoonDays: 3,
};

export const useSettingsStore = create<SettingsState>()(
  persist(
    (set) => ({
      settings: defaultSettings,
      updateSettings: (settings) => {
        set((state) => ({ settings: { ...state.settings, ...settings } }));
      },
    }),
    {
      name: "my-dashboard-settings",
      storage: createJSONStorage(() => browserStorage),
    },
  ),
);
