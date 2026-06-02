import type { StateStorage } from "zustand/middleware";

const memory = new Map<string, string>();

export const browserStorage: StateStorage = {
  getItem: (name) => {
    if (typeof window === "undefined") {
      return memory.get(name) ?? null;
    }

    return window.localStorage.getItem(name);
  },
  setItem: (name, value) => {
    if (typeof window === "undefined") {
      memory.set(name, value);
      return;
    }

    window.localStorage.setItem(name, value);
  },
  removeItem: (name) => {
    if (typeof window === "undefined") {
      memory.delete(name);
      return;
    }

    window.localStorage.removeItem(name);
  },
};
