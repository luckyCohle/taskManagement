import { createTaskType, taskType } from "../types/task";

export const getAllTasks = async (): Promise<taskType[]> => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch tasks: ${res.status}`);
    }

    const data = await res.json();

    const taskArray: taskType[] = data.tasks.map((task: any) => ({
      id: task._id,
      title: task.title,
      status: task.status,
      assignedTo: task.assignedTo?.name || "Unknown",
    }));

    return taskArray;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};
export const updateTaskStatus = async (
  taskId: string,
  status: "TODO" | "IN_PROGRESS" | "DONE"
): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/${taskId}/status`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status }),
      }
    );
    if (!res.ok) {
      throw new Error(`Failed to update task: ${res.status}`);
    }

    const data = await res.json();

    return data.isSuccess === true;
  } catch (error) {
    console.error("Error updating task status:", error);
    return false;
  }
};

export const createTask = async (data:createTaskType): Promise<boolean> => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to create task: ${res.status}`);
    }

    const response = await res.json();

    return response.isSuccess === true;
  } catch (error) {
    console.error("Error creating task:", error);
    return false;
  }
};

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export interface TaskType {
  id: string;
  title: string;
  status: TaskStatus;
  assignedTo: string;
}

export const getMyTasks = async (): Promise<TaskType[]> => {
  try {
    const token = localStorage.getItem("token");

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/task/me`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed: ${res.status}`);
    }

    const data = await res.json();

    return data.tasks.map((task: any) => ({
      id: task._id,
      title: task.title,
      status: task.status,
      assignedTo: task.assignedTo?.name || "You",
    }));
  } catch (error) {
    console.error("getMyTasks error:", error);
    return [];
  }
};