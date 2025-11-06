import { NextResponse } from "next/server";
import otpStore from "@/lib/otpStore"; // ✅ import shared store

export async function POST(req: Request) {
  const { email, otp } = await req.json();

  const record = otpStore[email];
  if (!record) {
    return NextResponse.json(
      { success: false, error: "No OTP found" },
      { status: 400 }
    );
  }

  if (record.expires < Date.now()) {
    delete otpStore[email];
    return NextResponse.json(
      { success: false, error: "OTP expired" },
      { status: 400 }
    );
  }

  if (record.otp !== otp) {
    return NextResponse.json(
      { success: false, error: "Invalid OTP" },
      { status: 400 }
    );
  }

  // ✅ OTP verified successfully
  delete otpStore[email];
  return NextResponse.json({ success: true, token: "verified" });
}
