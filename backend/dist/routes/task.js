"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_1 = require("../controllers/task");
const authCheck_1 = require("../middlewares/authCheck");
const taskRouter = express_1.default.Router();
taskRouter.get("/", authCheck_1.verifyJWT, task_1.getAllTasks);
taskRouter.post("/", authCheck_1.verifyJWT, task_1.createTask);
taskRouter.patch("/:taskId/status", authCheck_1.verifyJWT, task_1.updateTaskStatus);
taskRouter.get("/project/:projectId", authCheck_1.verifyJWT, task_1.getTasksByProject);
taskRouter.get("/me", authCheck_1.verifyJWT, task_1.getMyTasks);
exports.default = taskRouter;
//# sourceMappingURL=task.js.map