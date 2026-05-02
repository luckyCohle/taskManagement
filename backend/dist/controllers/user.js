"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginUser = exports.createUser = void 0;
const user_1 = require("../models/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const createUser = async (data) => {
    try {
        const existingUser = await user_1.User.findOne({ email: data.email });
        if (existingUser) {
            return {
                isSuccess: false,
                message: "User already exists",
            };
        }
        const hashedPwd = await bcrypt_1.default.hash(data.password, 12);
        const user = await user_1.User.create({
            name: data.username,
            email: data.email,
            password: hashedPwd,
            role: data.role,
        });
        return {
            isSuccess: true,
            userId: user._id.toString(),
            role: data.role
        };
    }
    catch (error) {
        console.error("Error creating user:", error);
        return {
            isSuccess: false,
            message: error.message || "User creation failed",
        };
    }
};
exports.createUser = createUser;
const LoginUser = async (data) => {
    try {
        const existingUser = await user_1.User.findOne({ email: data.email });
        if (!existingUser) {
            throw new Error('Invalid email or password');
        }
        const passwordMatch = await bcrypt_1.default.compare(data.password, existingUser.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        return {
            isSuccess: true,
            userId: existingUser._id.toString(),
            role: existingUser.role,
        };
    }
    catch (error) {
        console.error("error while inserting data to user collection =>" + error);
        return {
            isSuccess: false,
            message: error.message || "Login failed",
        };
    }
};
exports.LoginUser = LoginUser;
//# sourceMappingURL=user.js.map