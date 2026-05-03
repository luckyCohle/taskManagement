import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db";
import authRouter from "./routes/auth";
import cors from "cors";
import projectRouter from "./routes/project";
import taskRouter from "./routes/task";
import userRouter from "./routes/user";
dotenv.config();

const app = express();

// middleware
app.use(express.json());

app.use(cors())

// connect DB
connectDB();

// test route
app.get("/", (req, res) => {
  res.send("API running...");
});
app.use("/auth",authRouter);
app.use('/project',projectRouter);
app.use('/task',taskRouter);
app.use('/user',userRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});