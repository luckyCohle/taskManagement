"use client";

import { createTask } from "@/utils/api/task";
import { UserListElement } from "@/utils/types/user";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

interface Props {
  onClose: () => void;
  users: UserListElement[];
}

export default function CreateTaskForm({ onClose, users }: Props) {
  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    dueDate: "",
  });

  const [titleError, setTitleError] = useState(false);
  const [loading, setLoading] = useState(false);

  // close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  const handleSubmit = async () => {
    if (!form.title.trim() || !form.assignedTo) {
      setTitleError(!form.title.trim());
      return;
    }

    setLoading(true);

    const success = await createTask({
      title: form.title,
      assignedTo: form.assignedTo, 
      dueDate: form.dueDate,
    });

    setLoading(false);

    if (!success) {
      toast.error("Failed to create task");
      return;
    }

    toast.success("Task created successfully");

    // reset form
    setForm({
      title: "",
      assignedTo: "",
      dueDate: "",
    });

    onClose();
  };

  return (
    <div
      className="fixed inset-0 bg-[#1A1830]/45 flex items-center justify-center z-50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-white rounded-2xl p-7  max-w-[95vw] shadow-2xl shadow-[#534AB7]/20">

        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[#26215C] text-lg font-semibold">
            Create New Task
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-lg flex items-center justify-center text-[#9896B8] hover:bg-[#F0EFF8]"
          >
            ✕
          </button>
        </div>

        {/* Fields */}
        <div className="space-y-4">

          {/* Title */}
          <div>
            <label className="block text-xs text-[#6B6A88] mb-1">
              Task Title
            </label>
            <input
              value={form.title}
              onChange={(e) => {
                setForm({ ...form, title: e.target.value });
                setTitleError(false);
              }}
              className={`w-full border rounded-lg px-3 py-2 text-sm ${
                titleError ? "border-red-400" : "border-[#E0DFF0]"
              }`}
            />
            {titleError && (
              <p className="text-xs text-red-400 mt-1">
                Title is required
              </p>
            )}
          </div>

          {/* Assign To (DYNAMIC) */}
          <div>
            <label className="block text-xs text-[#6B6A88] mb-1">
              Assign To
            </label>

            <select
              value={form.assignedTo}
              onChange={(e) =>
                setForm({ ...form, assignedTo: e.target.value })
              }
              className="w-full border border-[#E0DFF0] rounded-lg px-3 py-2 text-sm"
            >
              <option value="">Select member</option>

              {users.length === 0 ? (
                <option disabled>No users available</option>
              ) : (
                users.map((user) => (
                  <option key={user.id} value={user.id}>
                    {user.username}
                  </option>
                ))
              )}
            </select>
          </div>

          {/* Due Date */}
          <div>
            <label className="block text-xs text-[#6B6A88] mb-1">
              Due Date
            </label>
            <input
              type="date"
              value={form.dueDate}
              onChange={(e) =>
                setForm({ ...form, dueDate: e.target.value })
              }
              className="w-full border border-[#E0DFF0] rounded-lg px-3 py-2 text-sm"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex gap-2 justify-end mt-6">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm border rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={handleSubmit}
            disabled={loading}
            className="px-5 py-2 text-sm text-white bg-[#534AB7] rounded-lg disabled:opacity-50"
          >
            {loading ? "Creating..." : "Create Task"}
          </button>
        </div>
      </div>
    </div>
  );
}