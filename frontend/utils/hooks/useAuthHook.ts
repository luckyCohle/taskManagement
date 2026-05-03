"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";

type TokenPayload = {
  id: string;
  role: string;
};

export const useAuth = (allowedRoles: string[]) => {
  const router = useRouter();
  const [user, setUser] = useState<TokenPayload | null>(null);
  const [authorized, setAuthorized] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.replace("auth/login");
      return;
    }

    try {
      const decoded = jwtDecode<TokenPayload>(token);

      if (!allowedRoles.includes(decoded.role)) {
        setAuthorized(false);
      }

      setUser(decoded);
    } catch {
      router.replace("auth/login");
    }
  }, [allowedRoles, router]);

  return { user, authorized };
};