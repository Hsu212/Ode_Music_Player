import { createClient } from '@supabase/supabase-js';

// IMPORTANT: Replace with your actual Supabase URL and Anon Key
// It's best practice to store these in environment variables
const supabaseUrl = 'https://fnbiiwfttipbnqfpqdij.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZuYmlpd2Z0dGlwYm5xZnBxZGlqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTU0MjI0OTAsImV4cCI6MjA3MDk5ODQ5MH0.TTEUrFx_Ap-yBD4zPutE-vACqDi_7BT0B3UbQDyFL28';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
