"use client";

import { useState } from "react";
import { updateTaskStatus } from "@/utils/api/task";

const STATUSES = ["TODO", "IN_PROGRESS", "DONE"] as const;

export default function TaskCard({ task }: any) {
  const [status, setStatus] = useState(task.status);

  const handleChange = async (e: any) => {
    const newStatus = e.target.value;

    const prev = status;
    setStatus(newStatus);

    const success = await updateTaskStatus(task.id, newStatus);

    if (!success) {
      setStatus(prev);
      alert("Failed to update");
    }
  };

  return (
    <div className="p-3 bg-[#F7F7FB] rounded-xl border border-[#E0DFF0] hover:shadow-sm transition">
      <h3 className="text-sm font-medium text-[#1A1830]">
        {task.title}
      </h3>

      <div className="flex items-center justify-between mt-2">
        <span className="text-xs text-gray-500">
          {task.assignedTo}
        </span>

        <select
          value={status}
          onChange={handleChange}
          className="text-xs border rounded-md px-2 py-1 bg-white"
        >
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s.replace("_", " ")}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}