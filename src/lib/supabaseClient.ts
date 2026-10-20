import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL ?? "https://placeholder.supabase.co";
const supabasePublishableKey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY ?? "placeholder-key";

export const supabase = createClient(supabaseUrl, supabasePublishableKey);

// NOTE: Add your real credentials to a .env file at the project root:
// VITE_SUPABASE_URL=https://your-project.supabase.co
// VITE_SUPABASE_PUBLISHABLE_KEY=your-anon-key
