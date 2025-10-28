
import { cn } from "@/lib/utils";

type Status = "available" | "unavailable" | "new" | "contacted" | "completed" | "rejected";

interface StatusBadgeProps {
  status: Status;
  request?: string;
}

export function StatusBadge({ status ,request }: StatusBadgeProps) {
  const variants = {
    available: "bg-success/10 text-success",
    unavailable: "bg-destructive/10 text-destructive",
    new: "bg-blue-100 text-blue-800",
    contacted: "bg-yellow-100 text-yellow-800",
    completed: "bg-success/10 text-success",
    rejected: "bg-destructive/10 text-destructive",
  };

  const labels = {
    available: "Available",
    unavailable: "Unavailable",
    new: "New",
    contacted: "Contacted",
    completed: "Completed",
    rejected: "Rejected",
  };

  const icons = {
    available: "✅",
    unavailable: "❌",
    new: "📥",
    contacted: "📞",
    completed: "✅",
    rejected: "❌",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium",
        variants[status]
      )}
    >
      <span>{icons[status]}</span>
      {labels[status]}
    </span>
  );
}
