import { Badge } from "@/components/ui/badge";
import type { TaskPriority } from "@/types/task";

const labels: Record<TaskPriority, string> = {
  low: "Low",
  medium: "Medium",
  high: "High",
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  const variant = priority === "high" ? "danger" : priority === "medium" ? "warning" : "outline";

  return <Badge variant={variant}>{labels[priority]}</Badge>;
}
