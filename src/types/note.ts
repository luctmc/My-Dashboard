export type QuickNote = {
  id: string;
  title: string;
  content: string;
  expiresAt: string | null;
  notifyAt: string | null;
  isPinned: boolean;
  isArchived: boolean;
  createdAt: string;
  updatedAt: string;
};

export type QuickNoteInput = {
  title: string;
  content: string;
  expiresAt: string | null;
  notifyAt: string | null;
  isPinned: boolean;
  isArchived: boolean;
};
