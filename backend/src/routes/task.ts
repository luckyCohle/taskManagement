import express from "express";
import {
  createTask,
  updateTaskStatus,
  getTasksByProject,
  getAllTasks,
  getMyTasks,
} from "../controllers/task";
import { verifyJWT } from "../middlewares/authCheck";
import { verifyRole } from "../middlewares/roleCheck";

const taskRouter = express.Router();

taskRouter.get("/", verifyJWT,verifyRole(), getAllTasks);
taskRouter.post("/", verifyJWT,verifyRole(), createTask);
taskRouter.patch("/:taskId/status", verifyJWT, updateTaskStatus);
taskRouter.get("/project/:projectId", verifyJWT, getTasksByProject);
taskRouter.get("/me", verifyJWT, getMyTasks);

export default taskRouter;