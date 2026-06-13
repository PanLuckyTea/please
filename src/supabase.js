import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || "https://vymnkwxmmddrwpuzeldk.supabase.co";
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bW5rd3htbWRkcndwdXplbGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzcyMTMsImV4cCI6MjA5NjkxMzIxM30.kxxfVIZMYzhR3_XKZrVcgJWg5zI3EZpOAxUMiuaIB78";

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Brakuje kluczy Supabase! Sprawdź plik .env lub konfigurację.");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);