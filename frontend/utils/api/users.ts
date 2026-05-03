import { UserListElement } from "../types/user";

export const getAllUsers = async (): Promise<UserListElement[]> => {
  try {
    const token = localStorage.getItem("token");
    console.log(process.env.NEXT_PUBLIC_API_URL+"/user");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );
     console.log(process.env.NEXT_PUBLIC_API_URL+"/user");
    if (!res.ok) {
      throw new Error(`Failed to fetch users: ${res.status}`);
    }

    const data = await res.json();

    const userArray: UserListElement[] = data.users.map((user: any) => ({
      id: user._id,
      username: user.name,
    }));
    console.log("inside api")
    console.log(userArray)

    return userArray;

  } catch (error) {
    console.error("Error fetching users:", error);
    return []; 
  }
};