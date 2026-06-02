"use client";

import { Plus, StickyNote } from "lucide-react";
import { useMemo, useState } from "react";

import { QuickNoteForm } from "@/components/forms/quick-note-form";
import { QuickNoteCard } from "@/components/notes/quick-note-card";
import { EmptyState } from "@/components/shared/empty-state";
import { FormModal } from "@/components/shared/form-modal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { isExpired } from "@/lib/dates/status";
import { useNotesStore } from "@/stores/notes-store";

export function NotesView() {
  const [open, setOpen] = useState(false);
  const { notes } = useNotesStore();

  const grouped = useMemo(() => {
    const active = notes
      .filter((note) => !note.isArchived && !isExpired(note.expiresAt))
      .sort((a, b) => Number(b.isPinned) - Number(a.isPinned));
    const archived = notes.filter((note) => note.isArchived);
    const expired = notes.filter((note) => !note.isArchived && isExpired(note.expiresAt));

    return { active, archived, expired };
  }, [notes]);

  return (
    <div className="grid gap-6">
      <SectionHeader
        title="Quick Notes"
        description="Capture short-lived notes, pin what matters and turn ideas into tasks."
        action={
          <FormModal
            open={open}
            onOpenChange={setOpen}
            trigger={
              <Button>
                <Plus className="h-4 w-4" />
                New note
              </Button>
            }
            title="Create quick note"
            description="Set optional expiration and visual alert times."
          >
            <QuickNoteForm onSuccess={() => setOpen(false)} />
          </FormModal>
        }
      />

      <Tabs defaultValue="active">
        <TabsList className="w-full justify-start overflow-x-auto sm:w-auto">
          <TabsTrigger value="active">Active ({grouped.active.length})</TabsTrigger>
          <TabsTrigger value="archived">Archived ({grouped.archived.length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({grouped.expired.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          <NotesGrid notes={grouped.active} />
        </TabsContent>
        <TabsContent value="archived">
          <NotesGrid notes={grouped.archived} />
        </TabsContent>
        <TabsContent value="expired">
          <NotesGrid notes={grouped.expired} />
        </TabsContent>
      </Tabs>
    </div>
  );
}

function NotesGrid({ notes }: { notes: ReturnType<typeof useNotesStore.getState>["notes"] }) {
  if (!notes.length) {
    return (
      <EmptyState
        icon={StickyNote}
        title="No notes here"
        description="Create a quick note and it will appear in the right status automatically."
      />
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {notes.map((note) => (
        <QuickNoteCard key={note.id} note={note} />
      ))}
    </div>
  );
}
