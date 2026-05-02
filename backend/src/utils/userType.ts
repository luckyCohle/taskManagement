export interface CreateUserType {
    username : string;
    email    : string;
    password : string;
    role :"ADMIN"|"MEMBER";
}
export interface UserResponse {
    isSuccess:boolean;
    message? :string;
    userId?:string;
    role?:"ADMIN"|"MEMBER";
}
export interface LoginUserType{
    email:string;
    password:string;
}