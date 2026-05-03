"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.seedFakeData = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_1 = require("../models/user");
const task_1 = require("../models/task");
const seedFakeData = async () => {
    try {
        console.log("🌱 Seeding data...");
        // clear existing (optional but useful)
        await user_1.User.deleteMany({});
        await task_1.Task.deleteMany({});
        // ================= USERS =================
        const salt = await bcrypt_1.default.genSalt(10);
        const users = await user_1.User.insertMany([
            {
                name: "Admin User",
                email: "admin@test.com",
                password: await bcrypt_1.default.hash("123456", salt),
                role: "ADMIN",
            },
            {
                name: "John Doe",
                email: "john@test.com",
                password: await bcrypt_1.default.hash("123456", salt),
                role: "MEMBER",
            },
            {
                name: "Jane Smith",
                email: "jane@test.com",
                password: await bcrypt_1.default.hash("123456", salt),
                role: "MEMBER",
            },
        ]);
        const admin = users.find((u) => u.role === "ADMIN");
        const members = users.filter((u) => u.role === "MEMBER");
        // ================= TASKS =================
        const dummyProjectId = new mongoose_1.default.Types.ObjectId();
        const tasksData = [
            {
                title: "Setup backend",
                status: "TODO",
                assignedTo: members[0]._id,
                assignedBy: admin._id,
            },
            {
                title: "Design UI",
                status: "IN_PROGRESS",
                assignedTo: members[1]._id,
                assignedBy: admin._id,
            },
            {
                title: "Write API docs",
                status: "DONE",
                assignedTo: members[0]._id,
                assignedBy: admin._id,
            },
            {
                title: "Fix bugs",
                status: "TODO",
                assignedTo: members[1]._id,
                assignedBy: admin._id,
            },
        ];
        const tasks = tasksData.map((t) => ({
            ...t,
            projectId: dummyProjectId,
            dueDate: new Date(Date.now() + Math.random() * 7 * 24 * 60 * 60 * 1000),
        }));
        await task_1.Task.insertMany(tasks);
        console.log("✅ Seeding completed");
        console.log("👤 Admin login:", "admin@test.com / 123456");
    }
    catch (error) {
        console.error("❌ Seeding failed:", error);
    }
};
exports.seedFakeData = seedFakeData;
//# sourceMappingURL=seed.js.map