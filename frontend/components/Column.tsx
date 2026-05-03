"use client";

import Card from "./Card";

export default function Column({ title, tasks }: any) {
  return (
    <div className="bg-white rounded-2xl p-4 border border-[#E0DFF0] shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-semibold text-[#26215C]">
          {title}
        </h2>
        <span className="text-xs bg-[#EEEDFE] text-[#534AB7] px-2 py-0.5 rounded-full">
          {tasks.length}
        </span>
      </div>

      <div className="space-y-3">
        {tasks.length === 0 ? (
          <p className="text-xs text-gray-400 text-center py-4">
            No tasks
          </p>
        ) : (
          tasks.map((task: any) => (
            <Card key={task.id} task={task} />
          ))
        )}
      </div>
    </div>
  );
}