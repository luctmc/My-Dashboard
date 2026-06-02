"use client";

import { addDays, subDays } from "date-fns";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

import { browserStorage } from "@/lib/storage/create-json-storage";
import { createId } from "@/lib/utils";
import type { Task, TaskInput, TaskStatus } from "@/types/task";

type TasksState = {
  tasks: Task[];
  createTask: (input: TaskInput) => Task;
  updateTask: (id: string, input: TaskInput) => void;
  deleteTask: (id: string) => void;
  moveTask: (id: string, status: TaskStatus) => void;
  toggleTaskCompletion: (id: string) => void;
};

const now = new Date();

const initialTasks: Task[] = [
  {
    id: "task_seed_1",
    title: "Map weekly priorities",
    description: "Review active work and choose the three most important wins.",
    status: "todo",
    priority: "high",
    dueDate: addDays(now, 1).toISOString(),
    tags: ["planning", "focus"],
    createdAt: subDays(now, 1).toISOString(),
    updatedAt: subDays(now, 1).toISOString(),
    completedAt: null,
  },
  {
    id: "task_seed_2",
    title: "Clean project backlog",
    description: "Archive stale ideas and keep only tasks worth acting on.",
    status: "in-progress",
    priority: "medium",
    dueDate: addDays(now, 3).toISOString(),
    tags: ["ops"],
    createdAt: subDays(now, 2).toISOString(),
    updatedAt: now.toISOString(),
    completedAt: null,
  },
  {
    id: "task_seed_3",
    title: "Publish first dashboard version",
    description: "Run quality checks and prepare the app for Vercel.",
    status: "for-review",
    priority: "high",
    dueDate: addDays(now, 5).toISOString(),
    tags: ["release"],
    createdAt: subDays(now, 4).toISOString(),
    updatedAt: now.toISOString(),
    completedAt: null,
  },
  {
    id: "task_seed_4",
    title: "Write personal reflection",
    description: "Capture what worked today and what needs attention tomorrow.",
    status: "done",
    priority: "low",
    dueDate: subDays(now, 1).toISOString(),
    tags: ["notes"],
    createdAt: subDays(now, 5).toISOString(),
    updatedAt: subDays(now, 1).toISOString(),
    completedAt: subDays(now, 1).toISOString(),
  },
];

export const useTasksStore = create<TasksState>()(
  persist(
    (set) => ({
      tasks: initialTasks,
      createTask: (input) => {
        const timestamp = new Date().toISOString();
        const task: Task = {
          id: createId("task"),
          ...input,
          createdAt: timestamp,
          updatedAt: timestamp,
          completedAt: input.status === "done" ? timestamp : null,
        };

        set((state) => ({ tasks: [task, ...state.tasks] }));
        return task;
      },
      updateTask: (id, input) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) => {
            if (task.id !== id) {
              return task;
            }

            const completedAt = input.status === "done" ? task.completedAt ?? timestamp : null;

            return { ...task, ...input, updatedAt: timestamp, completedAt };
          }),
        }));
      },
      deleteTask: (id) => {
        set((state) => ({ tasks: state.tasks.filter((task) => task.id !== id) }));
      },
      moveTask: (id, status) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status,
                  updatedAt: timestamp,
                  completedAt: status === "done" ? task.completedAt ?? timestamp : null,
                }
              : task,
          ),
        }));
      },
      toggleTaskCompletion: (id) => {
        const timestamp = new Date().toISOString();
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  status: task.status === "done" ? "todo" : "done",
                  completedAt: task.status === "done" ? null : timestamp,
                  updatedAt: timestamp,
                }
              : task,
          ),
        }));
      },
    }),
    {
      name: "my-dashboard-tasks",
      storage: createJSONStorage(() => browserStorage),
    },
  ),
);
