import mongoose from "mongoose";
import bcrypt from "bcrypt";
import { User } from "../models/user";
import { Task } from "../models/task";

export const seedFakeData = async () => {
  try {
    console.log("🌱 Seeding data...");

    // clear existing (optional but useful)
    await User.deleteMany({});
    await Task.deleteMany({});

    // ================= USERS =================
    const salt = await bcrypt.genSalt(10);

    const users = await User.insertMany([
      {
        name: "Admin User",
        email: "admin@test.com",
        password: await bcrypt.hash("123456", salt),
        role: "ADMIN",
      },
      {
        name: "John Doe",
        email: "john@test.com",
        password: await bcrypt.hash("123456", salt),
        role: "MEMBER",
      },
      {
        name: "Jane Smith",
        email: "jane@test.com",
        password: await bcrypt.hash("123456", salt),
        role: "MEMBER",
      },
    ]);

    const admin = users.find((u) => u.role === "ADMIN")!;
    const members = users.filter((u) => u.role === "MEMBER");

    // ================= TASKS =================

    const dummyProjectId = new mongoose.Types.ObjectId();

    const tasksData = [
      {
        title: "Setup backend",
        status: "TODO",
        assignedTo: members[0]!._id,
        assignedBy: admin._id,
      },
      {
        title: "Design UI",
        status: "IN_PROGRESS",
        assignedTo: members[1]!._id,
        assignedBy: admin._id,
      },
      {
        title: "Write API docs",
        status: "DONE",
        assignedTo: members[0]!._id,
        assignedBy: admin._id,
      },
      {
        title: "Fix bugs",
        status: "TODO",
        assignedTo: members[1]!._id,
        assignedBy: admin._id,
      },
    ];

    const tasks = tasksData.map((t) => ({
      ...t,
      projectId: dummyProjectId,
      dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
    }));

    await Task.insertMany(tasks);

    console.log("✅ Seeding completed");
    console.log("👤 Admin login:", "admin@test.com / 123456");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
  }
};