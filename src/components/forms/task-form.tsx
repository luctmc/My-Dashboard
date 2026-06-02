"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { fromDateTimeLocalValue, toDateTimeLocalValue } from "@/lib/dates/status";
import { useTasksStore } from "@/stores/tasks-store";
import type { Task, TaskInput } from "@/types/task";

const taskSchema = z.object({
  title: z.string().min(2, "Use at least 2 characters."),
  description: z.string().optional(),
  status: z.enum(["backlog", "todo", "in-progress", "for-review", "done"]),
  priority: z.enum(["low", "medium", "high"]),
  dueDate: z.string().optional(),
  tags: z.string().optional(),
});

type TaskFormValues = z.infer<typeof taskSchema>;

type TaskFormProps = {
  task?: Task;
  onSuccess?: () => void;
};

export function TaskForm({ task, onSuccess }: TaskFormProps) {
  const { createTask, updateTask } = useTasksStore();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<TaskFormValues>({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: task?.title ?? "",
      description: task?.description ?? "",
      status: task?.status ?? "todo",
      priority: task?.priority ?? "medium",
      dueDate: toDateTimeLocalValue(task?.dueDate ?? null),
      tags: task?.tags.join(", ") ?? "",
    },
  });

  const onSubmit = (values: TaskFormValues) => {
    const input: TaskInput = {
      title: values.title,
      description: values.description ?? "",
      status: values.status,
      priority: values.priority,
      dueDate: fromDateTimeLocalValue(values.dueDate ?? ""),
      tags:
        values.tags
          ?.split(",")
          .map((tag) => tag.trim())
          .filter(Boolean) ?? [],
    };

    if (task) {
      updateTask(task.id, input);
      toast.success("Task updated");
    } else {
      createTask(input);
      toast.success("Task created");
    }

    onSuccess?.();
  };

  return (
    <form className="grid gap-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="task-title">
          Title
        </label>
        <Input id="task-title" placeholder="Review project plan" {...register("title")} />
        {errors.title ? (
          <p className="text-xs text-destructive">{errors.title.message}</p>
        ) : null}
      </div>

      <div className="grid gap-2">
        <label className="text-sm font-medium" htmlFor="task-description">
          Description
        </label>
        <Textarea
          id="task-description"
          placeholder="Add useful context, constraints or next steps."
          {...register("description")}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="task-status">
            Status
          </label>
          <select
            id="task-status"
            className="h-10 rounded-md border bg-background/70 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            {...register("status")}
          >
            <option value="backlog">Backlog</option>
            <option value="todo">To Do</option>
            <option value="in-progress">In Progress</option>
            <option value="for-review">For Review</option>
            <option value="done">Done</option>
          </select>
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="task-priority">
            Priority
          </label>
          <select
            id="task-priority"
            className="h-10 rounded-md border bg-background/70 px-3 text-sm outline-none focus:ring-2 focus:ring-ring"
            {...register("priority")}
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
          </select>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="task-due-date">
            Due date
          </label>
          <Input id="task-due-date" type="datetime-local" {...register("dueDate")} />
        </div>

        <div className="grid gap-2">
          <label className="text-sm font-medium" htmlFor="task-tags">
            Tags
          </label>
          <Input id="task-tags" placeholder="work, focus" {...register("tags")} />
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {task ? "Save task" : "Create task"}
        </Button>
      </div>
    </form>
  );
}
