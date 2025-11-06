"use client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.replace("/admin/login");
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
}
