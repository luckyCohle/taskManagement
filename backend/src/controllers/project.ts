import { Request, Response } from "express";
import { Project } from "../models/project";


// Create Project
export const createProject = async (req: Request, res: Response) => {
  try {
    const { name } = req.body;
    const userId = (req as any).user?.id; 

    if (!name || !name.trim()) {
      return res.status(400).json({ message: "Project name required" });
    }

    const project = await Project.create({
      name: name.trim(),
      createdBy: userId,
      members: [userId], 
    });

    return res.status(201).json({
      isSuccess: true,
      project,
    });
  } catch (error) {
    console.error("createProject error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Get ALL projects (admin / debug)
export const getAllProjects = async (req: Request, res: Response) => {
  try {
    const projects = await Project.find()
      .populate("createdBy", "name email")
      .populate("members", "name email");

    return res.status(200).json({
      isSuccess: true,
      projects,
    });
  } catch (error) {
    console.error("getAllProjects error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
//Get projects for logged-in user
export const getProjectsForUser = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;

    const projects = await Project.find({
      members: userId,
    }).populate("createdBy", "name email");

    return res.status(200).json({
      isSuccess: true,
      projects,
    });
  } catch (error) {
    console.error("getProjectsForUser error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};
// Add member to project (assign project to user)
export const addMemberToProject = async (req: Request, res: Response) => {
  try {
    const { projectId, userId } = req.body;
    const currentUserId = (req as any).user?.id;

    const project = await Project.findById(projectId);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    if (project.createdBy.toString() !== currentUserId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // prevent duplicates
    if (project.members.includes(userId)) {
      return res.status(400).json({ message: "User already in project" });
    }

    project.members.push(userId);
    await project.save();

    return res.status(200).json({
      isSuccess: true,
      project,
    });
  } catch (error) {
    console.error("addMemberToProject error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};