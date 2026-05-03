import express from "express";
import { getAllUsers, getUserWithId } from "../controllers/user";
import { verifyJWT } from "../middlewares/authCheck";
import { verifyRole } from "../middlewares/roleCheck";

const userRouter = express.Router();

userRouter.get("/",verifyJWT,verifyRole(),getAllUsers);
userRouter.get("/:id",verifyJWT,async(req,res)=>{
    const id = req.params.id;
    const userData = getUserWithId(id);
    res.json({userData});
})


export default userRouter;