import type { TaskStatus } from "@/types/task";

export const taskColumns: Array<{ id: TaskStatus; title: string }> = [
  { id: "backlog", title: "Backlog" },
  { id: "todo", title: "To Do" },
  { id: "in-progress", title: "In Progress" },
  { id: "for-review", title: "For Review" },
  { id: "done", title: "Done" },
];
