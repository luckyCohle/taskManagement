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
import { useRouter } from "next/router";


const FILTERS = ["ALL", "TODO", "IN_PROGRESS", "DONE"] as const;
const FILTER_LABELS: Record<string, string> = { ALL: "All", TODO: "To Do", IN_PROGRESS: "In Progress", DONE: "Done" };

export default function AdminDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState("ALL");
  const [tasks,setTasks]=useState<taskType[]>([]);
  const total = tasks.length;
  const done = tasks.filter((t) => t.status === "DONE").length;
  const inProgress = tasks.filter((t) => t.status === "IN_PROGRESS").length;
  const completionRate = total ? Math.round((done / total) * 100) : 0;

  const visibleTasks =
    activeFilter === "ALL" ? tasks : tasks.filter((t) => t.status === activeFilter);
    const router = useRouter()
    const [users,setUser] = useState<UserListElement[]>([]);
    useEffect(()=>{
        const { user, authorized } = useAuth(["ADMIN"]);
        if(!user){
          router.push("/auth/login")
        }
        if(!authorized){
          router.push("/member");
        }
        getUsers();
        getTasks();
    },[])
    async function getUsers() {
        console.log("calling get users")
        const userArray = await getAllUsers();
        console.log("users=>")
        console.log(userArray);
        setUser(userArray);
    }
    async function getTasks() {
        const taskArray = await getAllTasks();
        setTasks(taskArray);
    }
  return (
    <>
      {/* ── Page ── */}
      <div className="min-h-screen bg-gray-100 p-6 font-sans">
        <div className="max-w-4xl mx-auto">

          {/* Top bar */}
          <div className="flex items-center justify-between mb-7">
            <div className="flex items-center gap-2.5">
              <p className="text-purple-800 text-2xl font-semibold tracking-tight">TaskManager</p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-3.5 mb-6">
            {[
              { label: "Total Tasks", value: total, sub: "Across all projects" },
              { label: "In Progress", value: inProgress, sub: "Active work" },
              { label: "Completed", value: done, sub: `${completionRate}% completion rate` },
            ].map((s) => (
              <div key={s.label} className="bg-white rounded-xl border border-[#E0DFF0] px-4 py-3.5 relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-[#7F77DD] rounded-l-xl" />
                <p className="text-[11px] font-medium text-[#6B6A88] uppercase tracking-wider mb-1">{s.label}</p>
                <p className="text-2xl font-semibold text-[#26215C]">{s.value}</p>
                <p className="text-[11px] text-[#9896B8] mt-0.5">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Section header */}
          <div className="flex items-center justify-between mb-3.5">
            <h2 className="text-[#26215C] text-base font-semibold">All Tasks</h2>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-1.5 bg-[#534AB7] hover:bg-[#3C3489] text-white text-sm font-medium px-4 py-2 rounded-lg transition-colors"
            >
              <span className="text-base leading-none">+</span> New Task
            </button>
          </div>

          {/* Filter pills */}
          <div className="flex gap-2 mb-4">
            {FILTERS.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`text-xs font-medium px-3.5 py-1.5 rounded-full border transition-all ${
                  activeFilter === f
                    ? "bg-[#534AB7] text-white border-[#534AB7]"
                    : "bg-white text-[#6B6A88] border-[#E0DFF0] hover:border-[#7F77DD] hover:text-[#534AB7]"
                }`}
              >
                {FILTER_LABELS[f]}
              </button>
            ))}
          </div>

          {/* Task list */}
          <div className="flex flex-col gap-2.5">
            {visibleTasks.length === 0 ? (
              <p className="text-center text-sm text-[#9896B8] py-10">No tasks here yet.</p>
            ) : (
              visibleTasks.map((task) => (
                <AdminTaskCard key={task.id} task={task} />
              ))
            )}
          </div>

        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <CreateTaskForm onClose={() => setIsModalOpen(false)} users={users} />
      )}
      <ToastContainer/>
    </>
  );
}