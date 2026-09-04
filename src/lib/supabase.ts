/**
 * Supabase is used for exactly one thing in Phase 1: the `subscribers` table.
 * The client is loaded lazily so the library never lands in the initial bundle.
 */
export function supabaseConfigured(): boolean {
  return Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);
}

export async function getSupabase() {
  const { createClient } = await import("@supabase/supabase-js");
  return createClient(import.meta.env.VITE_SUPABASE_URL, import.meta.env.VITE_SUPABASE_ANON_KEY, {
    auth: { persistSession: false, autoRefreshToken: false },
  });
}
