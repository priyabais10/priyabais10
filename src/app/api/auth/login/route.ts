import { NextRequest, NextResponse } from "next/server";
import * as bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";

const ADMIN_EMAIL = process.env.ADMIN_EMAIL as string;
const ADMIN_PASSWORD_HASH = process.env.ADMIN_PASSWORD_HASH as string;
const JWT_SECRET = process.env.JWT_SECRET as string;

console.log("ENV CHECK:", {
  ADMIN_EMAIL,
  ADMIN_PASSWORD_HASH,
  JWT_SECRET,
});


if (!ADMIN_EMAIL || !ADMIN_PASSWORD_HASH || !JWT_SECRET) {
  throw new Error("Missing required environment variables.");
}

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    // ✅ Step 1: Check email
    if (email !== ADMIN_EMAIL) {
      return NextResponse.json({ message: "Invalid email" }, { status: 401 });
    }

    // ✅ Step 2: Check password
   console.log("DEBUG PASSWORD:", { password, ADMIN_PASSWORD_HASH });
   const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
   console.log("COMPARE RESULT:", isMatch);

   // const isMatch = await bcrypt.compare(password, ADMIN_PASSWORD_HASH);
   // if (!isMatch) {
   // return NextResponse.json({ message: "Invalid password" }, { status: 401 });
   // }




    // ✅ Step 3: Create JWT token
    const token = jwt.sign({ email }, JWT_SECRET, { expiresIn: "7d" });

    // ✅ Step 4: Send token as cookie
    const response = NextResponse.json({ message: "Login successful" });
    response.cookies.set("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 7 * 24 * 60 * 60, // 7 days
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
