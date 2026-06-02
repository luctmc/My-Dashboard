"use client";

import { addHours, subHours } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { browserStorage } from "@/lib/storage/create-json-storage";
import { createId } from "@/lib/utils";
import type { QuickNote, QuickNoteInput } from "@/types/note";

type NotesState = {
  notes: QuickNote[];
  createNote: (input: QuickNoteInput) => QuickNote;
  updateNote: (id: string, input: QuickNoteInput) => void;
  deleteNote: (id: string) => void;
  togglePinned: (id: string) => void;
  toggleArchived: (id: string) => void;
};

const now = new Date();

const initialNotes: QuickNote[] = [
  {
    id: "note_seed_1",
    title: "Daily intention",
    content: "Keep the day visible: tasks, notes and follow-ups in one calm place.",
    expiresAt: addHours(now, 18).toISOString(),
    notifyAt: addHours(now, 12).toISOString(),
    isPinned: true,
    isArchived: false,
    createdAt: subHours(now, 4).toISOString(),
    updatedAt: subHours(now, 4).toISOString(),
  },
  {
    id: "note_seed_2",
    title: "Vercel checklist",
    content: "Confirm build, connect repo and let Vercel handle automatic deploys.",
    expiresAt: addHours(now, 72).toISOString(),
    notifyAt: addHours(now, 60).toISOString(),
    isPinned: false,
    isArchived: false,
    createdAt: subHours(now, 8).toISOString(),
    updatedAt: subHours(now, 2).toISOString(),
  },
];

export const useNotesStore = create<NotesState>()(
  persist(
    (set) => ({
      notes: initialNotes,
      createNote: (input) => {
        const timestamp = new Date().toISOString();
        const note: QuickNote = {
          id: createId("note"),
          ...input,
          createdAt: timestamp,
          updatedAt: timestamp,
        };

        set((state) => ({ notes: [note, ...state.notes] }));
        return note;
      },
      updateNote: (id, input) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id ? { ...note, ...input, updatedAt: timestamp } : note,
          ),
        }));
      },
      deleteNote: (id) => {
        set((state) => ({ notes: state.notes.filter((note) => note.id !== id) }));
      },
      togglePinned: (id) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, isPinned: !note.isPinned, updatedAt: timestamp }
              : note,
          ),
        }));
      },
      toggleArchived: (id) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          notes: state.notes.map((note) =>
            note.id === id
              ? { ...note, isArchived: !note.isArchived, updatedAt: timestamp }
              : note,
          ),
        }));
      },
    }),
    {
      name: "my-dashboard-notes",
      storage: createJSONStorage(() => browserStorage),
    },
  ),
);
