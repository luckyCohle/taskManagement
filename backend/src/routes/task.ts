import express from "express";
import {
  createTask,
  updateTaskStatus,
  getTasksByProject,
} from "../controllers/task";
import { verifyJWT } from "../middlewares/authCheck";

const taskRouter = express.Router();

taskRouter.post("/", verifyJWT, createTask);
taskRouter.patch("/:taskId/status", verifyJWT, updateTaskStatus);
taskRouter.get("/project/:projectId", verifyJWT, getTasksByProject);

export default taskRouter;