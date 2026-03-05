import type { ComplaintStatus, Priority, Role } from "../types";

interface StatusBadgeProps {
  status: ComplaintStatus;
  className?: string;
}

export function StatusBadge({ status, className = "" }: StatusBadgeProps) {
  const config: Record<ComplaintStatus, { label: string; cls: string }> = {
    pending: { label: "Pending", cls: "badge-pending" },
    under_review: { label: "Under Review", cls: "badge-inprogress" },
    in_progress: { label: "In Progress", cls: "badge-inprogress" },
    resolved: { label: "Resolved", cls: "badge-resolved" },
  };
  const { label, cls } = config[status];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cls} ${className}`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full ${
          status === "pending"
            ? "bg-amber-500"
            : status === "resolved"
              ? "bg-emerald-500"
              : "bg-blue-500"
        }`}
      />
      {label}
    </span>
  );
}

interface PriorityBadgeProps {
  priority: Priority;
  className?: string;
}

export function PriorityBadge({
  priority,
  className = "",
}: PriorityBadgeProps) {
  const config: Record<Priority, { cls: string; dot: string }> = {
    Low: {
      cls: "bg-slate-100 text-slate-600 border-slate-200",
      dot: "bg-slate-400",
    },
    Medium: {
      cls: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    High: {
      cls: "bg-orange-50 text-orange-700 border-orange-200",
      dot: "bg-orange-500",
    },
    Critical: { cls: "badge-critical", dot: "bg-red-500" },
  };
  const { cls, dot } = config[priority];
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium border ${cls} ${className}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {priority}
    </span>
  );
}

interface RoleBadgeProps {
  role: Role;
  className?: string;
}

export function RoleBadge({ role, className = "" }: RoleBadgeProps) {
  const config: Record<Role, { label: string; cls: string }> = {
    student: { label: "Student", cls: "badge-role-student" },
    staff: { label: "Staff", cls: "badge-role-staff" },
    faculty: { label: "Faculty", cls: "badge-role-faculty" },
    admin: { label: "Admin", cls: "badge-role-admin" },
  };
  const { label, cls } = config[role];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold tracking-wide ${cls} ${className}`}
    >
      {label}
    </span>
  );
}
