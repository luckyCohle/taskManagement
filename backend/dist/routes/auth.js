"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../controllers/user");
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const authRouter = express_1.default.Router();
dotenv_1.default.config();
//  Signup
authRouter.post("/signup", async (req, res) => {
    try {
        // console.log(req.body)
        const data = req.body;
        const result = await (0, user_1.createUser)(data);
        if (!result.isSuccess) {
            return res.status(400).json(result);
        }
        const payload = {
            id: result.userId,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({
            ...result, token, role: result.role
        });
    }
    catch (error) {
        console.error("Signup route error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
// Login
authRouter.post("/login", async (req, res) => {
    try {
        const data = req.body;
        const result = await (0, user_1.LoginUser)(data);
        if (!result.isSuccess) {
            return res.status(401).json(result);
        }
        const payload = {
            id: result.userId,
        };
        const token = jsonwebtoken_1.default.sign(payload, process.env.JWT_SECRET);
        return res.status(200).json({
            ...result, token, role: result.role
        });
    }
    catch (error) {
        console.error("Login route error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});
exports.default = authRouter;
//# sourceMappingURL=auth.js.map