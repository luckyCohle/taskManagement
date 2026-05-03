"use client";

import { useEffect, useState } from "react";
import AdminTaskCard from "@/components/AdminTaskCard";
import CreateTaskForm from "@/components/CreateTaskForm";
import { UserListElement } from "@/utils/types/user";
import { getAllUsers } from "@/utils/api/users";
import { taskType } from "@/utils/types/task";
import { getAllTasks } from "@/utils/api/task";
import { ToastContainer } from "react-toastify";
import { useAuth } from "@/utils/hooks/useAuthHook";
import { useRouter } from "next/navigation"; // ✅ FIXED

const FILTERS = ["ALL", "TODO", "IN_PROGRESS", "DONE"] as const;

export default function AdminDashboard() {
  const router = useRouter();

  const { user, authorized } = useAuth(["ADMIN"]); // ✅ FIXED

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [users, setUser] = useState<UserListElement[]>([]);

  // ✅ Handle auth safely
  useEffect(() => {
    if (!user) return; // wait until decoded

    if (!authorized) {
      router.replace("/member");
      return;
    }
  }, [user, authorized, router]);

  // ✅ Fetch data only when user is valid
  useEffect(() => {
    if (!user || !authorized) return;

    getUsers();
    getTasks();
  }, [user, authorized]);

  async function getUsers() {
    const userArray = await getAllUsers();
    setUser(userArray);
  }

  async function getTasks() {
    const taskArray = await getAllTasks();
    setTasks(taskArray);
  }

  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "DONE").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completionRate = total ? Math.round((done / total) * 100) : 0;

  const visibleTasks =
    activeFilter === "ALL"
      ? tasks
      : tasks.filter((t) => t.status === activeFilter);

  // ✅ Prevent rendering before auth resolves
  if (!user) return <p>Loading...</p>;

  return (
    <>
      <div className="min-h-screen bg-gray-100 p-6 font-sans">
        <div className="max-w-4xl mx-auto">

          <div className="flex justify-between mb-7">
            <p className="text-purple-800 text-2xl font-semibold">
              TaskManager
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3.5 mb-6">
            <div>Total: {total}</div>
            <div>In Progress: {inProgress}</div>
            <div>Done: {done} ({completionRate}%)</div>
          </div>

          <button onClick={() => setIsModalOpen(true)}>
            + New Task
          </button>

          <div>
            {visibleTasks.map((task) => (
              <AdminTaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <CreateTaskForm
          onClose={() => setIsModalOpen(false)}
          users={users}
        />
      )}

      <ToastContainer />
    </>
  );
}