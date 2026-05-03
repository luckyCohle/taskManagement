import { Router, Request, Response } from "express";
import { createUser, LoginUser } from "../controllers/user";
import { CreateUserType, LoginUserType } from "../utils/userType";
import express from "express";
import jwt from "jsonwebtoken"
import dotenv from "dotenv"


const authRouter = express.Router();
dotenv.config();

//  Signup
authRouter.post("/signup", async (req: Request, res: Response) => {
    try {
        // console.log(req.body)
        const data: CreateUserType = req.body;
        const result = await createUser(data);

        if (!result.isSuccess) {
            return res.status(400).json(result);
        }

        const payload = {
            id: result.userId,
            role:result.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string);
        return res.status(200).json({
            ...result, token , role:result.role
        });
    } catch (error) {
        console.error("Signup route error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

// Login
authRouter.post("/login", async (req: Request, res: Response) => {
    try {
        const data: LoginUserType = req.body;

        const result = await LoginUser(data);

        if (!result.isSuccess) {
            return res.status(401).json(result);
        }
        const payload = {
            id: result.userId,
            role:result.role
        }
        const token = jwt.sign(payload, process.env.JWT_SECRET as string)
        return res.status(200).json({
            ...result, token , role:result.role
        });
    } catch (error) {
        console.error("Login route error:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

export default authRouter