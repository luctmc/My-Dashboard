import { Clock } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { formatShortDate, isDueSoon, isOverdue } from "@/lib/dates/status";

type DueDateBadgeProps = {
  dueDate: string | null;
};

export function DueDateBadge({ dueDate }: DueDateBadgeProps) {
  const overdue = isOverdue(dueDate);
  const soon = isDueSoon(dueDate);

  return (
    <Badge variant={overdue ? "danger" : soon ? "warning" : "outline"}>
      <Clock className="h-3 w-3" />
      {formatShortDate(dueDate)}
    </Badge>
  );
}
