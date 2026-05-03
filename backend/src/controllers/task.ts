import { Request, Response } from "express";
import { Task } from "../models/task";
import { Project } from "../models/project";
import mongoose from "mongoose";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, assignedTo, dueDate } = req.body;
    const userId = (req as any).user?.id;

    if (!title || !assignedTo) {
      return res.status(400).json({
        isSuccess: false,
        message: "Title and assigned user required",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description,
      assignedTo,
      assignedBy: userId,
      status: "TODO",
      projectId: new mongoose.Types.ObjectId(), // dummy
      dueDate,
    });

    return res.status(201).json({
      isSuccess: true,
      task,
    });
  } catch (error) {
    console.error("createTask error:", error);
    return res.status(500).json({
      isSuccess: false,
      message: "Internal server error",
    });
  }
};
export const updateTaskStatus = async (req: Request, res: Response) => {
  try {
    const { taskId } = req.params;
    const { status } = req.body;
    const userId = (req as any).user?.id;

    const allowedStatuses = ["TODO", "IN_PROGRESS", "DONE"];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const task = await Task.findById(taskId);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Only assigned user or creator can update
    if (
      task.assignedTo?.toString() !== userId &&
      task.assignedBy.toString() !== userId
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    task.status = status;
    await task.save();

    return res.status(200).json({
      isSuccess: true,
      task,
    });
  } catch (error) {
    console.error("updateTaskStatus error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
export const getTasksByProject = async (req: Request, res: Response) => {
  try {
    const { projectId } = req.params;

    const tasks = await Task.find({ project: projectId })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email");

    return res.status(200).json({
      isSuccess: true,
      tasks,
    });
  } catch (error) {
    console.error("getTasksByProject error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export const getAllTasks = async (req: Request, res: Response) => {
  try {
    const tasks = await Task.find()
      .populate("assignedTo", "name email")
      .populate("assignedBy", "name email");

    return res.status(200).json({
      isSuccess: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("getAllTasks error:", error);
    return res.status(500).json({
      isSuccess: false,
      message: "Failed to fetch tasks",
    });
  }
};

export const getMyTasks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    if (!userId) {
      return res.status(401).json({
        isSuccess: false,
        message: "Unauthorized",
      });
    }

    const tasks = await Task.find({ assignedTo: userId })
      .populate("assignedBy", "name email");

    return res.status(200).json({
      isSuccess: true,
      count: tasks.length,
      tasks,
    });
  } catch (error) {
    console.error("getMyTasks error:", error);
    return res.status(500).json({
      isSuccess: false,
      message: "Failed to fetch tasks",
    });
  }
};