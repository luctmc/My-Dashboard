"use client";

import { Plus } from "lucide-react";
import { useState } from "react";

import { TaskForm } from "@/components/forms/task-form";
import { KanbanBoard } from "@/components/kanban/kanban-board";
import { FormModal } from "@/components/shared/form-modal";
import { SectionHeader } from "@/components/shared/section-header";
import { Button } from "@/components/ui/button";

export function TasksView() {
  const [open, setOpen] = useState(false);

  return (
    <div className="grid gap-6">
      <SectionHeader
        title="Tasks / Kanban"
        description="Create, edit, complete and move tasks through a clean local-first board."
        action={
          <FormModal
            open={open}
            onOpenChange={setOpen}
            trigger={
              <Button>
                <Plus className="h-4 w-4" />
                New task
              </Button>
            }
            title="Create task"
            description="Add a new card to the Kanban board."
          >
            <TaskForm onSuccess={() => setOpen(false)} />
          </FormModal>
        }
      />
      <KanbanBoard />
    </div>
  );
}
