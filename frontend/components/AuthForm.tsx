"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { userDataType } from "@/utils/types/user";
import { login, signup } from "@/utils/api/auth";
import { ToastContainer, toast } from "react-toastify";


type Props = {
    type: "login" | "signup";
};

export default function AuthForm({ type }: Props) {
    const router = useRouter();

    const [form, setForm] = useState<userDataType>({
        username: "",
        email: "",
        password: "",
        role: "MEMBER",
    });

    const [loading , setLoading] = useState<boolean>(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    function displaySumbit() {
        if(type == 'login'){
            if(loading){
                return "Loging in..."
            }else{
                return "Login"
            }
        }else{
            if(loading){
                return "Signin up..."
            }else{
                return "Sign up"
            }
        }
    }
    function isFormFilled(){
        let isEmpty = false;
        if(type == 'login'){
            isEmpty = form.email.trim() =="" || form.password.trim() ==""
        }else{
            isEmpty = form.email.trim() =="" || form.password.trim() =="" || form.username?.trim() =="" 
        }
        return !isEmpty;
    }
    const handleSubmit = async () => {
        if(!isFormFilled()){
            toast.warning("fill the form before hitting submit");
            return;
        }
        setLoading(true);
        let authResponse;
        if(type == 'login'){
            authResponse = await  login(form);
        }else{
            authResponse = await signup(form);
        }
        setLoading(false);
        if(authResponse.succeess){
            toast.success(type == 'login'? "Login Successfull":"Signup Successfull");
            let path = authResponse.role == "ADMIN"?"/admin":"/member"
            router.push(path);
        }else{
            toast.error(type == 'login'? "Login Failed":"Signup Failed")
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="w-full max-w-md p-8 rounded-2xl shadow-lg border">
                <h2 className="text-2xl font-bold text-center text-purple-700 mb-6">
                    {type === "login" ? "Welcome Back" : "Create Account"}
                </h2>

                {type === "signup" && (
                    <input
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={form.username}
                        className="w-full mb-4 p-3 border rounded-lg  focus:outline-none focus:ring-2 focus:ring-purple-500 placeholder-gray-500 text-gray-800"
                    />
                )}

                <input
                    name="email"
                    placeholder="Email"
                    onChange={handleChange}
                    value={form.email}
                    className="w-full mb-4 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full mb-6 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                />

                {type === "signup" && (
                    <select
                        name="role"
                        aria-placeholder="Select a role"
                        value={form.role}
                        onChange={(e) =>
                            setForm({ ...form, role: e.target.value as "ADMIN" | "MEMBER" })
                        }
                        className="w-full mb-4 p-3 border border-gray-300 rounded-lg 
    bg-white text-gray-900 
    focus:outline-none focus:ring-2 focus:ring-purple-500"
                    >
                        <option value="MEMBER">Member</option>
                        <option value="ADMIN">Admin</option>
                    </select>
                )}

                <button
                    onClick={handleSubmit}
                    className="w-full bg-purple-600 text-white py-3 rounded-lg hover:bg-purple-700 transition"
                >
                    {displaySumbit()}
                </button>

                <p className="text-sm text-center mt-4">
                    {type === "login" ? "Don't have an account?" : "Already have an account?"}
                    <span
                        onClick={() =>
                            router.push(type === "login" ? "/auth/signup" : "/auth/login")
                        }
                        className="text-purple-600 ml-1 cursor-pointer font-semibold"
                    >
                        {type === "login" ? "Sign Up" : "Login"}
                    </span>
                </p>
            </div>
            <ToastContainer/>
        </div>
    );
}