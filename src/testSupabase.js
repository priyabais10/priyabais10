import { supabase } from "./lib/supabaseClient";

export async function testSupabaseConnection() {
  const { data, error } = await supabase.from("projects").select("*").limit(1);

  if (error) {
    console.error("❌ Supabase connection failed:", error.message);
  } else {
    console.log("✅ Supabase connected successfully!", data);
  }
}
