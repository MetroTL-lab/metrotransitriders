// FILE: src/supabaseConfig.ts
// NEW FILE
//
// Just the two values needed to call the submit-rider-application edge
// function directly via fetch() — no @supabase/supabase-js dependency
// needed for a single public POST, unlike the mobile app or admin
// dashboard which use the SDK for many more operations.
//
// Same project as admin-dashboard/config.js and the mobile app — the
// anon key is safe to ship client-side (that's what it's for; RLS and
// the edge function's own checks are what actually gate access).
// Override via a .env file (Vite env vars, VITE_-prefixed) if you ever
// point this site at a different Supabase project.

export const SUPABASE_FUNCTIONS_URL =
  import.meta.env.VITE_SUPABASE_FUNCTIONS_URL || 'https://dyartwkzpivjyhebfcnb.functions.supabase.co';

export const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR5YXJ0d2t6cGl2anloZWJmY25iIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ5MTE4MjUsImV4cCI6MjEwMDQ4NzgyNX0.eBXYPYdAZ5XUZ3CYunmqI20HO2RIziC26aZsFWeARLU';
