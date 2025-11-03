// src/app/api/projects/[id]/route.ts

export const dynamic = "force-dynamic";

import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabaseClient";

// ✅ Update project by ID
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;
  const body = await req.json();

  const { data, error } = await supabase
    .from("projects")
    .update(body)
    .eq("id", id)
    .select();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json(data);
}

// ✅ Delete project by ID
export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  const { id } = params;

  const { error } = await supabase.from("projects").delete().eq("id", id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true });
}
