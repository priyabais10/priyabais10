export const dynamic = "force-dynamic";
import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.from("projects").select("*").order("created_at", { ascending: false });

  if (error) {
    console.error("❌ GET error:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json(data);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("📦 Incoming project data:", body);

    const { data, error } = await supabase.from("projects").insert([body]).select();

    if (error) {
      console.error("❌ Supabase insert error:", error.message);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    console.log("✅ Inserted:", data);
    return NextResponse.json(data, { status: 201 });
  } catch (err: any) {
    console.error("❌ Unexpected error:", err.message);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
