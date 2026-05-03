"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const user_1 = require("../controllers/user");
const authCheck_1 = require("../middlewares/authCheck");
const roleCheck_1 = require("../middlewares/roleCheck");
const userRouter = express_1.default.Router();
userRouter.get("/", authCheck_1.verifyJWT, (0, roleCheck_1.verifyRole)(), user_1.getAllUsers);
userRouter.get("/:id", authCheck_1.verifyJWT, async (req, res) => {
    const id = req.params.id;
    const userData = (0, user_1.getUserWithId)(id);
    res.json({ userData });
});
exports.default = userRouter;
//# sourceMappingURL=user.js.map