import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vymnkwxmmddrwpuzeldk.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "TWÓJ_KLUCZ_ANON_KEY";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Brakuje kluczy Supabase! Sprawdź plik .env lub konfigurację.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);