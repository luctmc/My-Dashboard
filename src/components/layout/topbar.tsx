"use client";

import { Menu, Plus } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";

import { TaskForm } from "@/components/forms/task-form";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { MobileNav } from "@/components/layout/sidebar";
import { FormModal } from "@/components/shared/form-modal";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const titles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/tasks": "Tasks",
  "/notes": "Quick Notes",
  "/settings": "Settings",
  "/about": "About",
};

export function Topbar() {
  const pathname = usePathname();
  const [taskOpen, setTaskOpen] = useState(false);
  const [navOpen, setNavOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b bg-background/80 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="flex items-center gap-3">
        <Dialog open={navOpen} onOpenChange={setNavOpen}>
          <DialogTrigger asChild>
            <Button className="lg:hidden" size="icon" variant="outline" aria-label="Open menu">
              <Menu className="h-4 w-4" />
            </Button>
          </DialogTrigger>
          <DialogContent className="left-4 top-4 w-[min(88vw,22rem)] translate-x-0 translate-y-0">
            <DialogHeader>
              <DialogTitle>My Dashboard</DialogTitle>
              <DialogDescription>Navigate your workspace</DialogDescription>
            </DialogHeader>
            <MobileNav onNavigate={() => setNavOpen(false)} />
          </DialogContent>
        </Dialog>

        <div>
          <p className="text-xs font-medium uppercase text-muted-foreground">Workspace</p>
          <h1 className="text-xl font-semibold tracking-normal">
            {titles[pathname] ?? "Dashboard"}
          </h1>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <ThemeToggle />
        <FormModal
          open={taskOpen}
          onOpenChange={setTaskOpen}
          trigger={
            <Button>
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">New task</span>
            </Button>
          }
          title="Create task"
          description="Add a focused task to your local dashboard."
        >
          <TaskForm onSuccess={() => setTaskOpen(false)} />
        </FormModal>
      </div>
    </header>
  );
}
