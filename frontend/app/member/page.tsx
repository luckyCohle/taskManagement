"use client";

import { useEffect, useState } from "react";
import Column from "@/components/Column";
import { getMyTasks, TaskType } from "@/utils/api/task";

export default function DashboardPage() {
  const [tasks, setTasks] = useState<TaskType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      const data = await getMyTasks();
      console.log("API response:", data);
      setTasks(data);
      setLoading(false);
    };

    fetchTasks();
  }, []);

  const grouped = {
    TODO: tasks.filter((t) => t.status === "TODO"),
    IN_PROGRESS: tasks.filter((t) => t.status === "IN_PROGRESS"),
    DONE: tasks.filter((t) => t.status === "DONE"),
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        Loading tasks...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7FB] p-6">
      <h1 className="text-2xl font-bold text-[#1A1830] mb-6">
        My Tasks
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Column title="To Do" tasks={grouped.TODO} />
        <Column title="In Progress" tasks={grouped.IN_PROGRESS} />
        <Column title="Done" tasks={grouped.DONE} />
      </div>
    </div>
  );
}