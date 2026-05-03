"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const project_1 = require("../controllers/project");
const authCheck_1 = require("../middlewares/authCheck");
const roleCheck_1 = require("../middlewares/roleCheck");
const projectRouter = express_1.default.Router();
projectRouter.post("/", authCheck_1.verifyJWT, roleCheck_1.verifyRole, project_1.createProject);
projectRouter.get("/", authCheck_1.verifyJWT, roleCheck_1.verifyRole, project_1.getProjectsForUser);
projectRouter.get("/all", authCheck_1.verifyJWT, roleCheck_1.verifyRole, project_1.getAllProjects);
projectRouter.post("/add-member", authCheck_1.verifyJWT, roleCheck_1.verifyRole, project_1.addMemberToProject);
exports.default = projectRouter;
//# sourceMappingURL=project.js.map