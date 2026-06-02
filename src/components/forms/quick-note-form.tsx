"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fromDateTimeLocalValue, toDateTimeLocalValue } from "@/lib/dates/status";
import { useNotesStore } from "@/stores/notes-store";
import type { QuickNote, QuickNoteInput } from "@/types/note";

const noteSchema = z.object({
  title: z.string().min(2, "Use at least 2 characters."),
  content: z.string().min(2, "Add a little context."),
  expiresAt: z.string().optional(),
  notifyAt: z.string().optional(),
  isPinned: z.boolean(),
  isArchived: z.boolean(),
});

type QuickNoteFormValues = z.infer<typeof noteSchema>;

type QuickNoteFormProps = {
  note?: QuickNote;
  onSuccess?: () => void;
};

export function QuickNoteForm({ note, onSuccess }: QuickNoteFormProps) {
  const { createNote, updateNote } = useNotesStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<QuickNoteFormValues>({
    resolver: zodResolver(noteSchema),
    defaultValues: {
      title: note?.title ?? "",
      content: note?.content ?? "",
      expiresAt: toDateTimeLocalValue(note?.expiresAt ?? null),
      notifyAt: toDateTimeLocalValue(note?.notifyAt ?? null),
      isPinned: note?.isPinned ?? false,
      isArchived: note?.isArchived ?? false,
    },
  });

  const onSubmit = (values: QuickNoteFormValues) => {
    const input: QuickNoteInput = {
      title: values.title,
      content: values.content,
      expiresAt: fromDateTimeLocalValue(values.expiresAt ?? ""),
      notifyAt: fromDateTimeLocalValue(values.notifyAt ?? ""),
      isPinned: values.isPinned,
      isArchived: values.isArchived,
    };

    if (note) {
      updateNote(note.id, input);
      toast.success("Note updated");
    } else {
      createNote(input);
      toast.success("Note created");
    }

    onSuccess?.();
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="note-title">
          Title
        </label>
        <Input id="note-title" placeholder="Quick idea" {...register("title")} />
        {errors.title ? (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="note-content">
          Content
        </label>
        <Textarea
          id="note-content"
          placeholder="Capture the thought before it disappears."
          {...register("content")}
        />
        {errors.content ? (
          <p className="text-xs text-destructive">{errors.content.message}</p>
        ) : null}
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="note-expires">
            Expires at
          </label>
          <Input id="note-expires" type="datetime-local" {...register("expiresAt")} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="note-notify">
            Visual alert at
          </label>
          <Input id="note-notify" type="datetime-local" {...register("notifyAt")} />
        </div>
      </div>

      <div className="grid gap-3 rounded-md border bg-muted/40 p-3 text-sm sm:grid-cols-2">
        <label className="flex items-center gap-2">
          <input type="checkbox" className="h-4 w-4 accent-primary" {...register("isPinned")} />
          Pin note
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-primary"
            {...register("isArchived")}
          />
          Archive note
        </label>
      </div>

      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {note ? "Save note" : "Create note"}
        </Button>
      </div>
    </form>
  );
}
