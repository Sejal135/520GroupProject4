import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

const supabaseUrl = "https://jrdgyaunkgcblyppozxj.supabase.co"; 
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZGd5YXVua2djYmx5cHBvenhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MjMyNDAsImV4cCI6MjA0OTI5OTI0MH0.nBlUpojid_p9FoVfHBP6S9qMpnuhW4KmwGZzOcB3iZ8";

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase; 