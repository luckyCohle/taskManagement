import { userDataType } from "../types/user";
interface responseType{
  succeess:boolean;
  role?:"ADMIN"|"MEMBER"
}
export const login = async(data:userDataType):Promise<responseType>=>{
    try {
        const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
        const response = await result.json()
        if(!response.isSuccess){
            throw new Error("Login Failed")
        }
        const token = response.token;
        localStorage.setItem("token",token);
        return{
          succeess:true,
          role:response.role
        };
    } catch (error) {
        console.error("login failed with error "+error);
        return{
          succeess:false
        };
    }
}
export const signup = async(data:userDataType):Promise<responseType>=>{
    try {
        console.log(data)
        const result = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );
        const response = await result.json()
        if(!response.isSuccess){
            throw new Error("Signup Failed")
        }
        const token = response.token;
        localStorage.setItem("token",token);
        return {
          succeess:true,
          role:response.role
        }
    } catch (error) {
        console.error("sighnup failed with error "+error);
        return {
          succeess:false
        };
    }
}