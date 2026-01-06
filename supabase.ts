
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://quwzdpsdgqzuzdejryrz.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF1d3pkcHNkZ3F6dXpkZWpyeXJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njc3MTQ3MDQsImV4cCI6MjA4MzI5MDcwNH0.ANvjctIi8UHf-DtnxeLFNCFMQ1L0MuvItoacszyn1FQ';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
