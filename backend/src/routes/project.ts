import express from "express";
import {
  createProject,
  getAllProjects,
  getProjectsForUser,
  addMemberToProject,
} from "../controllers/project";
import { verifyJWT } from "../middlewares/authCheck";
import { verifyRole } from "../middlewares/roleCheck";

const projectRouter = express.Router();

projectRouter.post("/", verifyJWT,verifyRole, createProject);
projectRouter.get("/", verifyJWT,verifyRole,  getProjectsForUser);
projectRouter.get("/all", verifyJWT,verifyRole,  getAllProjects);
projectRouter.post("/add-member", verifyJWT,verifyRole,  addMemberToProject);

export default projectRouter;