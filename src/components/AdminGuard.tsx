// src/components/AdminGuard.tsx
"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminGuard({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(()=>{
    fetch("/api/auth/me").then(r=>{
      if (r.ok) setLoading(false);
      else router.push("/admin/login");
    }).catch(()=>router.push("/admin/login"));
  }, []);

  if (loading) return <div>Loading...</div>;
  return <>{children}</>;
}
