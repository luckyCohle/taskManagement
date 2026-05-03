"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.addMemberToProject = exports.getProjectsForUser = exports.getAllProjects = exports.createProject = void 0;
const project_1 = require("../models/project");
// Create Project
const createProject = async (req, res) => {
    try {
        const { name } = req.body;
        const userId = req.user?.id;
        if (!name || !name.trim()) {
            return res.status(400).json({ message: "Project name required" });
        }
        const project = await project_1.Project.create({
            name: name.trim(),
            createdBy: userId,
            members: [userId],
        });
        return res.status(201).json({
            isSuccess: true,
            project,
        });
    }
    catch (error) {
        console.error("createProject error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.createProject = createProject;
// Get ALL projects (admin / debug)
const getAllProjects = async (req, res) => {
    try {
        const projects = await project_1.Project.find()
            .populate("createdBy", "name email")
            .populate("members", "name email");
        return res.status(200).json({
            isSuccess: true,
            projects,
        });
    }
    catch (error) {
        console.error("getAllProjects error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getAllProjects = getAllProjects;
//Get projects for logged-in user
const getProjectsForUser = async (req, res) => {
    try {
        const userId = req.user?.id;
        const projects = await project_1.Project.find({
            members: userId,
        }).populate("createdBy", "name email");
        return res.status(200).json({
            isSuccess: true,
            projects,
        });
    }
    catch (error) {
        console.error("getProjectsForUser error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getProjectsForUser = getProjectsForUser;
// Add member to project (assign project to user)
const addMemberToProject = async (req, res) => {
    try {
        const { projectId, userId } = req.body;
        const currentUserId = req.user?.id;
        const project = await project_1.Project.findById(projectId);
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
    }
    catch (error) {
        console.error("addMemberToProject error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.addMemberToProject = addMemberToProject;
//# sourceMappingURL=project.js.map