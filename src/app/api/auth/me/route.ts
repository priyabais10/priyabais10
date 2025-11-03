// src/app/api/auth/me/route.ts
import { NextResponse } from "next/server";
import { getTokenFromReq, verifyToken } from "@/lib/auth";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const token = getTokenFromReq(req);
  if (!token) return NextResponse.json({ ok: false }, { status: 401 });
  const payload = verifyToken(token);
  if (!payload) return NextResponse.json({ ok: false }, { status: 401 });
  return NextResponse.json({ ok: true, user: payload });
}
