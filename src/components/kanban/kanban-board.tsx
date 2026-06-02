"use client";

import {
  closestCenter,
  DndContext,
  type DragEndEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { KanbanColumn } from "@/components/kanban/kanban-column";
import { taskColumns } from "@/lib/constants/tasks";
import { useTasksStore } from "@/stores/tasks-store";
import type { TaskStatus } from "@/types/task";

export function KanbanBoard() {
  const { tasks, moveTask } = useTasksStore();
  const sensors = useSensors(useSensor(PointerSensor, { activationConstraint: { distance: 6 } }));

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) {
      return;
    }

    const taskId = String(active.id);
    const nextStatus = over.data.current?.status as TaskStatus | undefined;

    if (nextStatus) {
      moveTask(taskId, nextStatus);
    }
  };

  return (
    <DndContext
      id="my-dashboard-kanban"
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragEnd={onDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto pb-4">
        {taskColumns.map((column) => (
          <KanbanColumn
            key={column.id}
            id={column.id}
            title={column.title}
            tasks={tasks.filter((task) => task.status === column.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
