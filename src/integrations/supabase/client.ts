// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://znhqvksizccxbrydyawp.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InpuaHF2a3NpemNjeGJyeWR5YXdwIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzkxOTM0MzgsImV4cCI6MjA1NDc2OTQzOH0.XoC_qi3M2ibvOL8klK7BpnIaJkxRMOEaOaEGnynzbiY";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);