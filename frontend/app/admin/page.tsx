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
import { useRouter } from "next/navigation"; 

const FILTERS = ["ALL", "TODO", "IN_PROGRESS", "DONE"] as const;

export default function AdminDashboard() {
  const router = useRouter();

  const { user, authorized } = useAuth(["ADMIN"]); 

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [tasks, setTasks] = useState<taskType[]>([]);
  const [users, setUser] = useState<UserListElement[]>([]);

  //
  useEffect(() => {
    if (!user) return; 

    if (!authorized) {
      router.replace("/member");
      return;
    }
  }, [user, authorized, router]);

  // Fetch data only when user is valid
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

  // Prevent rendering before auth resolves
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
         <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-[#26215C] text-base font-semibold">All Tasks</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#534AB7] hover:bg-[#3C3489] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-base leading-none">+</span> New Task
            </button>
          </div>
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