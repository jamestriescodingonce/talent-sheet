import { createClient } from "@supabase/supabase-js";

// Project: talent-sheet (uuvevybaeiscpmprfpgw)
const url =
  process.env.NEXT_PUBLIC_SUPABASE_URL ?? "https://uuvevybaeiscpmprfpgw.supabase.co";
const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY;

if (!key) {
  throw new Error("Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY (see .env.example)");
}

export const supabase = createClient(url, key);
