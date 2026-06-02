"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CheckCircle2, GripVertical, Pencil, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

import { TaskForm } from "@/components/forms/task-form";
import { ConfirmDialog } from "@/components/shared/confirm-dialog";
import { DueDateBadge } from "@/components/shared/due-date-badge";
import { FormModal } from "@/components/shared/form-modal";
import { PriorityBadge } from "@/components/shared/priority-badge";
import { TagBadge } from "@/components/shared/tag-badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { isOverdue } from "@/lib/dates/status";
import { cn } from "@/lib/utils";
import { useTasksStore } from "@/stores/tasks-store";
import type { Task } from "@/types/task";

export function TaskCard({ task }: { task: Task }) {
  const [editOpen, setEditOpen] = useState(false);
  const { deleteTask, toggleTaskCompletion } = useTasksStore();
  const overdue = task.status !== "done" && isOverdue(task.dueDate);
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } =
    useSortable({
      id: task.id,
      data: { status: task.status, type: "task" },
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Card
      ref={setNodeRef}
      style={style}
      className={cn(
        "group p-4 transition hover:-translate-y-0.5 hover:shadow-lg",
        isDragging && "opacity-60",
        overdue && "border-destructive/45 bg-destructive/5",
      )}
    >
      <div className="flex items-start gap-2">
        <button
          className="mt-0.5 rounded text-muted-foreground outline-none transition hover:text-foreground focus:ring-2 focus:ring-ring"
          aria-label="Drag task"
          {...attributes}
          {...listeners}
        >
          <GripVertical className="h-4 w-4" />
        </button>

        <div className="min-w-0 flex-1 space-y-3">
          <div className="space-y-1">
            <div className="flex items-start justify-between gap-2">
              <h3 className="break-words text-sm font-semibold leading-5">{task.title}</h3>
              <div className="flex shrink-0 gap-1 opacity-100 sm:opacity-0 sm:transition sm:group-hover:opacity-100">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7"
                  aria-label="Toggle completion"
                  onClick={() => toggleTaskCompletion(task.id)}
                >
                  <CheckCircle2 className="h-4 w-4" />
                </Button>
                <FormModal
                  open={editOpen}
                  onOpenChange={setEditOpen}
                  trigger={
                    <Button variant="ghost" size="icon" className="h-7 w-7" aria-label="Edit task">
                      <Pencil className="h-4 w-4" />
                    </Button>
                  }
                  title="Edit task"
                  description="Update this task without leaving the board."
                >
                  <TaskForm task={task} onSuccess={() => setEditOpen(false)} />
                </FormModal>
                <ConfirmDialog
                  title="Delete task?"
                  description="This task will be removed from your local dashboard."
                  onConfirm={() => {
                    deleteTask(task.id);
                    toast.success("Task deleted");
                  }}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 text-destructive"
                    aria-label="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </ConfirmDialog>
              </div>
            </div>
            {task.description ? (
              <p className="line-clamp-2 text-xs leading-5 text-muted-foreground">
                {task.description}
              </p>
            ) : null}
          </div>

          <div className="flex flex-wrap gap-1.5">
            <PriorityBadge priority={task.priority} />
            <DueDateBadge dueDate={task.dueDate} />
          </div>

          {task.tags.length ? (
            <div className="flex flex-wrap gap-1.5">
              {task.tags.map((tag) => (
                <TagBadge key={tag} tag={tag} />
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </Card>
  );
}
