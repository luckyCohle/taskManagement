import express from "express";
import { getAllUsers, getUserWithId } from "../controllers/user";

const userRouter = express.Router();

userRouter.get("/",async(req,res)=>{
    const users = getAllUsers();
    res.json({users});
})
userRouter.get("/:id",async(req,res)=>{
    const id = req.params.id;
    const userData = getUserWithId(id);
    res.json({userData});
})

export default userRouter;