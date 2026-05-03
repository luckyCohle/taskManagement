"use client";

import { useAuth } from "@/utils/hooks/useAuthHook";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Home() {
  const { user } = useAuth(["ADMIN"]);
  const router = useRouter();

  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // wait one tick for auth hook to populate
    if (user === undefined) return;

    setChecked(true);

    if (!user) {
      router.replace("/auth/login");
      return;
    }

    if (user.role === "ADMIN") {
      router.replace("/admin");
    } else {
      router.replace("/member");
    }
  }, [user, router]);

  // 👇 Prevent blank flicker
  if (!checked) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#F7F7FB]">
        <div className="animate-spin w-6 h-6 border-2 border-purple-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return null;
}