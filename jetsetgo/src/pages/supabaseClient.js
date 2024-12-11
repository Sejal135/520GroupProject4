// Importing the createClient function from the Supabase JavaScript library
import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm";

// URL of your Supabase instance. This is the base URL for interacting with the database and services.
const supabaseUrl = "https://jrdgyaunkgcblyppozxj.supabase.co"; 

// The Supabase API key for authentication. This key grants access to your Supabase instance.
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpyZGd5YXVua2djYmx5cHBvenhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzM3MjMyNDAsImV4cCI6MjA0OTI5OTI0MH0.nBlUpojid_p9FoVfHBP6S9qMpnuhW4KmwGZzOcB3iZ8";

// Creating a Supabase client using the provided URL and API key. This client will allow interaction with the Supabase services (like database, authentication, etc.).
const supabase = createClient(supabaseUrl, supabaseKey);

// Exporting the Supabase client so it can be used in other parts of the application to make requests to the Supabase services.
export default supabase;
