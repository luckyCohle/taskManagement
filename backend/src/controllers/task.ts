import { Request, Response } from "express";
import { Task } from "../models/task";
import { Project } from "../models/project";

export const createTask = async (req: Request, res: Response) => {
  try {
    const { title, description, projectId, assignedTo } = req.body;
    const userId = (req as any).user?.id;

    if (!title || !projectId) {
      return res.status(400).json({ message: "Title and project required" });
    }

    //check project exists
    const project = await Project.findById(projectId);
    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    // ensure assigned user is part of project
    if (
      assignedTo &&
      !project.members.some((id) => id.toString() === assignedTo)
    ) {
      return res.status(400).json({
        message: "User not part of project",
      });
    }

    const task = await Task.create({
      title: title.trim(),
      description,
      assignedTo,
      assignedBy: userId,
      status: "TODO",
    });

    return res.status(201).json({
      isSuccess: true,
      task,
    });
  } catch (error) {
    console.error("createTask error:", error);
    return res.status(500).json({ message: "Internal server error" });
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
