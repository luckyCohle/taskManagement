"use client";

import { updateTaskStatus } from "@/utils/api/task";
import { useState } from "react";
import { toast } from "react-toastify";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;
type Status = (typeof STATUSES)[number];

const STATUS_LABELS: Record<Status, string> = {
  TODO: "To Do",
  IN_PROGRESS: "In Progress",
  DONE: "Done",
};

const STATUS_STYLES: Record<Status, string> = {
  TODO: "bg-[#F0EFF8] text-[#5F5E7A]",
  IN_PROGRESS: "bg-[#EEEDFE] text-[#534AB7]",
  DONE: "bg-[#E8F5E9] text-[#2E7D32]",
};

function getInitials(name: string) {
  return name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();
}

export default function AdminTaskCard({ task }: { task: any }) {
  const [status, setStatus] = useState<Status>(task.status);

  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
  const newStatus = e.target.value as Status;

  const prevStatus = status;
  setStatus(newStatus);

  const success = await updateTaskStatus(task.id, newStatus);

  if (!success) {
    setStatus(prevStatus);
    toast.error("Failed to update status");
  }
};

  return (
    <div className="bg-white rounded-xl border border-[#E0DFF0] px-4 py-3.5 flex items-center justify-between hover:border-[#AFA9EC] hover:shadow-sm transition-all">
      {/* Left */}
      <div className="flex items-center gap-3.5">
        <div className="w-9 h-9 bg-[#EEEDFE] rounded-[9px] flex items-center justify-center ">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#534AB7" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="3" width="18" height="18" rx="3" />
            <path d="M8 12l3 3 5-5" />
          </svg>
        </div>
      </div>
      <div>
        {task.title}
      </div>
      {/* Right */}
      <div className="flex items-center gap-2.5">
        {/* Assignee initials */}
        <div className="w-7 h-7 rounded-full bg-[#EEEDFE] flex items-center justify-center text-[10px] font-semibold text-[#534AB7] ">
          {getInitials(task.assignedTo ?? "")}
        </div>

        {/* Status badge */}
        <span className={`text-[11px] font-medium px-2.5 py-1 rounded-full whitespace-nowrap ${STATUS_STYLES[status]}`}>
          {STATUS_LABELS[status]}
        </span>

        {/* Status dropdown */}
        <select
          value={status}
          onChange={handleChange}
          className="text-xs border border-[#E0DFF0] rounded-lg px-2.5 py-1.5 bg-white text-[#1A1830] outline-none focus:border-[#7F77DD] cursor-pointer transition-colors"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>{STATUS_LABELS[s]}</option>
          ))}
        </select>
      </div>
    </div>
  );
}