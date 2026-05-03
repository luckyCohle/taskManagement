export  interface userDataType {
    username?: string;
    email:string;
    password:string;
    role:"ADMIN"|"MEMBER"
}
export interface UserListElement {
    id:string;
    username:string;
}