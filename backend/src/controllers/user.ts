import { User } from "../models/user";
import { UserResponse, CreateUserType, LoginUserType } from "../utils/userType";
import bcrypt from "bcrypt"
export const createUser = async (
    data: CreateUserType
): Promise<UserResponse> => {
    try {
        const existingUser = await User.findOne({ email: data.email });

        if (existingUser) {
            return {
                isSuccess: false,
                message: "User already exists",
            };
        }
        const hashedPwd = await bcrypt.hash(data.password,12);

        const user = await User.create({
            name: data.username,
            email: data.email,
            password: hashedPwd,
            role: data.role,
        });

        return {
            isSuccess: true,
            userId: user._id.toString(),
            role:data.role
        };
    } catch (error: any) {
        console.error("Error creating user:", error);
        return {
            isSuccess: false,
            message: error.message || "User creation failed",
        };
    }
};
export const LoginUser = async (data: LoginUserType): Promise<UserResponse> => {
    try {
        const existingUser = await User.findOne({ email: data.email });
        if (!existingUser) {
            throw new Error('Invalid email or password');
        }
        const passwordMatch = await bcrypt.compare(data.password, existingUser.password);
        if (!passwordMatch) {
            throw new Error('Incorrect password');
        }
        return {
            isSuccess: true,
            userId: existingUser._id.toString(),
            role:existingUser.role,
        }
    } catch (error:any) {
        console.error("error while inserting data to user collection =>" + error);
        return {
            isSuccess: false,
            message: error.message || "Login failed",
        };
    }
}

export const getAllUsers = async()=>{
    try {
        const users = User.find({});
        return users;
    } catch (error) {
        console.error("error while fetching data =>" + error);
    }
}
export const getUserWithId = async(userId:string)=>{
    try {
        const data = User.findById({userId});
    } catch (error) {
        console.error("error while fetching data  =>" + error);
    }
    }

