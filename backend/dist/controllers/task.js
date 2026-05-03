"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyTasks = exports.getAllTasks = exports.getTasksByProject = exports.updateTaskStatus = exports.createTask = void 0;
const task_1 = require("../models/task");
const mongoose_1 = __importDefault(require("mongoose"));
const createTask = async (req, res) => {
    try {
        const { title, description, assignedTo, dueDate } = req.body;
        const userId = req.user?.id;
        if (!title || !assignedTo) {
            return res.status(400).json({
                isSuccess: false,
                message: "Title and assigned user required",
            });
        }
        const task = await task_1.Task.create({
            title: title.trim(),
            description,
            assignedTo,
            assignedBy: userId,
            status: "TODO",
            projectId: new mongoose_1.default.Types.ObjectId(), // dummy
            dueDate,
        });
        return res.status(201).json({
            isSuccess: true,
            task,
        });
    }
    catch (error) {
        console.error("createTask error:", error);
        return res.status(500).json({
            isSuccess: false,
            message: "Internal server error",
        });
    }
};
exports.createTask = createTask;
const updateTaskStatus = async (req, res) => {
    try {
        const { taskId } = req.params;
        const { status } = req.body;
        const userId = req.user?.id;
        const allowedStatuses = ["TODO", "IN_PROGRESS", "DONE"];
        if (!allowedStatuses.includes(status)) {
            return res.status(400).json({ message: "Invalid status" });
        }
        const task = await task_1.Task.findById(taskId);
        if (!task) {
            return res.status(404).json({ message: "Task not found" });
        }
        // Only assigned user or creator can update
        if (task.assignedTo?.toString() !== userId &&
            task.assignedBy.toString() !== userId) {
            return res.status(403).json({ message: "Not authorized" });
        }
        task.status = status;
        await task.save();
        return res.status(200).json({
            isSuccess: true,
            task,
        });
    }
    catch (error) {
        console.error("updateTaskStatus error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.updateTaskStatus = updateTaskStatus;
const getTasksByProject = async (req, res) => {
    try {
        const { projectId } = req.params;
        const tasks = await task_1.Task.find({ project: projectId })
            .populate("assignedTo", "name email")
            .populate("createdBy", "name email");
        return res.status(200).json({
            isSuccess: true,
            tasks,
        });
    }
    catch (error) {
        console.error("getTasksByProject error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
};
exports.getTasksByProject = getTasksByProject;
const getAllTasks = async (req, res) => {
    try {
        const tasks = await task_1.Task.find()
            .populate("assignedTo", "name email")
            .populate("assignedBy", "name email");
        return res.status(200).json({
            isSuccess: true,
            count: tasks.length,
            tasks,
        });
    }
    catch (error) {
        console.error("getAllTasks error:", error);
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to fetch tasks",
        });
    }
};
exports.getAllTasks = getAllTasks;
const getMyTasks = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({
                isSuccess: false,
                message: "Unauthorized",
            });
        }
        const tasks = await task_1.Task.find({ assignedTo: userId })
            .populate("assignedBy", "name email");
        return res.status(200).json({
            isSuccess: true,
            count: tasks.length,
            tasks,
        });
    }
    catch (error) {
        console.error("getMyTasks error:", error);
        return res.status(500).json({
            isSuccess: false,
            message: "Failed to fetch tasks",
        });
    }
};
exports.getMyTasks = getMyTasks;
//# sourceMappingURL=task.js.map