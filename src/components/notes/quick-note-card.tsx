"use client";

import { Archive, CheckSquare, Pencil, Pin, PinOff, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { QuickNoteForm } from "@/components/forms/quick-note-form";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { FormModal } from "@/components/shared/form-modal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatDateTime, isExpired, isNotifyWindow, timeLeft } from "@/lib/dates/status";
import { cn } from "@/lib/utils";
import { useNotesStore } from "@/stores/notes-store";
import { useTasksStore } from "@/stores/tasks-store";
import type { QuickNote } from "@/types/note";

export function QuickNoteCard({ note }: { note: QuickNote }) {
  const [editOpen, setEditOpen] = useState(false);
  const { deleteNote, toggleArchived, togglePinned } = useNotesStore();
  const { createTask } = useTasksStore();
  const expired = isExpired(note.expiresAt);
  const notify = !expired && isNotifyWindow(note.notifyAt);

  return (
    <Card
      className={cn(
        "p-4 transition hover:-translate-y-0.5 hover:shadow-lg",
        note.isPinned && "border-primary/45",
        notify && "border-amber-500/50 bg-amber-500/5",
        expired && "opacity-70",
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="break-words text-sm font-semibold">{note.title}</h3>
            {note.isPinned ? <Badge variant="default">Pinned</Badge> : null}
            {expired ? <Badge variant="danger">Expired</Badge> : null}
            {notify ? <Badge variant="warning">Alert</Badge> : null}
          </div>
          <p className="break-words text-sm leading-6 text-muted-foreground">{note.content}</p>
        </div>

        <div className="flex shrink-0 gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Pin note"
            onClick={() => togglePinned(note.id)}
          >
            {note.isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Archive note"
            onClick={() => {
              toggleArchived(note.id);
              toast.success(note.isArchived ? "Note restored" : "Note archived");
            }}
          >
            <Archive className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="mt-4 grid gap-2 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-2">
          <Badge variant={expired ? "danger" : notify ? "warning" : "outline"}>
            {timeLeft(note.expiresAt)}
          </Badge>
          {note.notifyAt ? <Badge variant="outline">Alert {formatDateTime(note.notifyAt)}</Badge> : null}
        </div>
      </div>

      <div className="mt-4 flex flex-wrap justify-end gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => {
            createTask({
              title: note.title,
              description: note.content,
              status: "todo",
              priority: "medium",
              dueDate: note.expiresAt,
              tags: ["from-note"],
            });
            toast.success("Note transformed into task");
          }}
        >
          <CheckSquare className="h-4 w-4" />
          Task
        </Button>

        <FormModal
          open={editOpen}
          onOpenChange={setEditOpen}
          trigger={
            <Button variant="outline" size="sm">
              <Pencil className="h-4 w-4" />
              Edit
            </Button>
          }
          title="Edit note"
          description="Update the note, expiration and visual alert."
        >
          <QuickNoteForm note={note} onSuccess={() => setEditOpen(false)} />
        </FormModal>

        <ConfirmDialog
          title="Delete note?"
          description="This note will be removed from your local dashboard."
          onConfirm={() => {
            deleteNote(note.id);
            toast.success("Note deleted");
          }}
        >
          <Button variant="outline" size="sm" className="text-destructive">
            <Trash2 className="h-4 w-4" />
            Delete
          </Button>
        </ConfirmDialog>
      </div>
    </Card>
  );
}
