"use client";

import { CheckCircle2, Clock, ListTodo, NotebookTabs, Plus, Sparkles, Timer, TrendingUp } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

import { DashboardCard } from "@/components/dashboard/dashboard-card";
import { StatCard } from "@/components/dashboard/stat-card";
import { QuickNoteForm } from "@/components/forms/quick-note-form";
import { TaskForm } from "@/components/forms/task-form";
import { DueDateBadge } from "@/components/shared/due-date-badge";
import { FormModal } from "@/components/shared/form-modal";
import { SectionHeader } from "@/components/shared/section-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { isDueSoon, isExpired, isOverdue, timeLeft } from "@/lib/dates/status";
import { useNotesStore } from "@/stores/notes-store";
import { useSettingsStore } from "@/stores/settings-store";
import { useTasksStore } from "@/stores/tasks-store";

export function DashboardView() {
  const [taskOpen, setTaskOpen] = useState(false);
  const [noteOpen, setNoteOpen] = useState(false);
  const { tasks } = useTasksStore();
  const { notes } = useNotesStore();
  const { settings } = useSettingsStore();

  const activeNotes = notes.filter((note) => !note.isArchived && !isExpired(note.expiresAt));
  const overdueTasks = tasks.filter((task) => task.status !== "done" && isOverdue(task.dueDate));
  const dueSoonTasks = tasks.filter(
    (task) => task.status !== "done" && isDueSoon(task.dueDate, settings.dueSoonDays),
  );
  const doneTasks = tasks.filter((task) => task.status === "done");
  const inProgressTasks = tasks.filter((task) => task.status === "in-progress");

  const todayItems = useMemo(
    () => [
      ...dueSoonTasks.slice(0, 3).map((task) => ({
        id: task.id,
        title: task.title,
        meta: "Task",
        badge: task.dueDate,
      })),
      ...activeNotes
        .filter((note) => note.isPinned)
        .slice(0, 2)
        .map((note) => ({
          id: note.id,
          title: note.title,
          meta: "Pinned note",
          badge: note.expiresAt,
        })),
    ],
    [activeNotes, dueSoonTasks],
  );

  return (
    <div className="grid gap-6">
      <section className="grid gap-4 rounded-lg border bg-card/74 p-6 shadow-sm md:grid-cols-[1fr_auto] md:items-center">
        <div className="space-y-2">
          <Badge variant="success">
            <Sparkles className="h-3 w-3" />
            Local-first workspace
          </Badge>
          <h1 className="max-w-3xl text-3xl font-semibold tracking-normal sm:text-4xl">
            Hello, {settings.userName}. Your day is organized and ready.
          </h1>
          <p className="max-w-2xl text-sm leading-6 text-muted-foreground">
            You have {tasks.length} tasks, {activeNotes.length} active notes and{" "}
            {overdueTasks.length} overdue items asking for attention.
          </p>
        </div>

        <div className="flex flex-wrap gap-2">
          <FormModal
            open={taskOpen}
            onOpenChange={setTaskOpen}
            trigger={
              <Button>
                <Plus className="h-4 w-4" />
                Task
              </Button>
            }
            title="Create task"
            description="Add a new task to your board."
          >
            <TaskForm onSuccess={() => setTaskOpen(false)} />
          </FormModal>

          <FormModal
            open={noteOpen}
            onOpenChange={setNoteOpen}
            trigger={
              <Button variant="outline">
                <Plus className="h-4 w-4" />
                Note
              </Button>
            }
            title="Create quick note"
            description="Capture a note with optional expiration."
          >
            <QuickNoteForm onSuccess={() => setNoteOpen(false)} />
          </FormModal>
        </div>
      </section>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatCard title="Total tasks" value={tasks.length} description="Across all columns" icon={ListTodo} tone="blue" />
        <StatCard title="Completed" value={doneTasks.length} description="Finished work" icon={CheckCircle2} tone="green" />
        <StatCard title="In progress" value={inProgressTasks.length} description="Currently moving" icon={TrendingUp} tone="amber" />
        <StatCard title="Overdue" value={overdueTasks.length} description="Needs attention" icon={Clock} tone="red" />
        <StatCard title="Active notes" value={activeNotes.length} description="Visible quick notes" icon={NotebookTabs} />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <DashboardCard title="Today" description="Important tasks and notes surfaced from your local workspace.">
          <div className="grid gap-3">
            {todayItems.length ? (
              todayItems.map((item) => (
                <div
                  key={`${item.meta}-${item.id}`}
                  className="flex items-center justify-between gap-3 rounded-md border bg-background/55 p-3"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-medium">{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.meta}</p>
                  </div>
                  <DueDateBadge dueDate={item.badge} />
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No urgent items for today.</p>
            )}
          </div>
        </DashboardCard>

        <DashboardCard title="Upcoming" description="Tasks approaching their due date.">
          <div className="grid gap-3">
            {dueSoonTasks.slice(0, 5).map((task) => (
              <Link
                href="/tasks"
                key={task.id}
                className="flex items-center justify-between gap-3 rounded-md border bg-background/55 p-3 transition hover:bg-muted"
              >
                <span className="truncate text-sm font-medium">{task.title}</span>
                <DueDateBadge dueDate={task.dueDate} />
              </Link>
            ))}
            {!dueSoonTasks.length ? (
              <p className="text-sm text-muted-foreground">No tasks close to expiration.</p>
            ) : null}
          </div>
        </DashboardCard>
      </section>

      <section className="grid gap-4">
        <SectionHeader
          title="Productivity pulse"
          description="Small signals that keep the workspace easy to scan."
        />
        <div className="grid gap-4 md:grid-cols-3">
          <DashboardCard title="Focus load">
            <div className="flex items-center gap-3">
              <Timer className="h-9 w-9 rounded-md bg-primary/10 p-2 text-primary" />
              <p className="text-sm text-muted-foreground">
                {inProgressTasks.length} active task{inProgressTasks.length === 1 ? "" : "s"} in motion.
              </p>
            </div>
          </DashboardCard>
          <DashboardCard title="Notes horizon">
            <p className="text-sm text-muted-foreground">
              {activeNotes[0] ? `${activeNotes[0].title}: ${timeLeft(activeNotes[0].expiresAt)}` : "No active notes yet."}
            </p>
          </DashboardCard>
          <DashboardCard title="Next action">
            <p className="text-sm text-muted-foreground">
              {dueSoonTasks[0]?.title ?? "Create a task or note to start the day."}
            </p>
          </DashboardCard>
        </div>
      </section>
    </div>
  );
}
