import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://yvzwqarwbgirbqjddaao.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl2endxYXJ3YmdpcmJxamRkYWFvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEwNDcwMjYsImV4cCI6MjA0NjYyMzAyNn0.OIdIEvVmZOgdiBJ4-L5xlOAa2-0Fbg0xy1C_gUg9lCU";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 