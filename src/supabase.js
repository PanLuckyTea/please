import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://vymnkwxmmddrwpuzeldk.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ5bW5rd3htbWRkcndwdXplbGRrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODEzMzcyMTMsImV4cCI6MjA5NjkxMzIxM30.kxxfVIZMYzhR3_XKZrVcgJWg5zI3EZpOAxUMiuaIB78';

export const supabase = createClient(supabaseUrl, supabaseKey);