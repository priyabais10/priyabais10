import { NextResponse } from "next/server";
import nodemailer from "nodemailer";
import otpStore from "@/lib/otpStore"; // ✅ imported here

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, expires: Date.now() + 5 * 60 * 1000 };

    console.log("📨 Sending OTP:", otp, "to", email);

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.ADMIN_EMAIL,
        pass: process.env.APP_PASSWORD,
      },
    });

    const info = await transporter.sendMail({
      from: `"Portfolio Admin" <${process.env.ADMIN_EMAIL}>`,
      to: email,
      subject: "🔐 Your Admin Dashboard OTP",
      text: `Your one-time password is: ${otp}`,
    });

    console.log("✅ OTP Email sent:", info.response);

    return NextResponse.json({ success: true, message: "OTP sent" });
  } catch (error: any) {
    console.error("❌ Error sending OTP:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}
