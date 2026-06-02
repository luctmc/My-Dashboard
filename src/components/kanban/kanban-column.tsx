"use client";

import { SortableContext, verticalListSortingStrategy } from "@dnd-kit/sortable";
import { useDroppable } from "@dnd-kit/core";

import { TaskCard } from "@/components/kanban/task-card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Task, TaskStatus } from "@/types/task";

type KanbanColumnProps = {
  id: TaskStatus;
  title: string;
  tasks: Task[];
};

export function KanbanColumn({ id, title, tasks }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id,
    data: { status: id, type: "column" },
  });

  return (
    <section
      ref={setNodeRef}
      className={cn(
        "flex min-h-[34rem] w-full min-w-[18rem] flex-col rounded-lg border bg-card/70 p-3 transition",
        isOver && "border-primary/70 bg-primary/5",
      )}
    >
      <div className="mb-3 flex items-center justify-between">
        <h2 className="text-sm font-semibold">{title}</h2>
        <Badge variant="outline">{tasks.length}</Badge>
      </div>

      <SortableContext items={tasks.map((task) => task.id)} strategy={verticalListSortingStrategy}>
        <div className="grid flex-1 content-start gap-3">
          {tasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
          {!tasks.length ? (
            <div className="flex min-h-28 items-center justify-center rounded-md border border-dashed text-center text-sm text-muted-foreground">
              Drop tasks here
            </div>
          ) : null}
        </div>
      </SortableContext>
    </section>
  );
}
