// $lib/supabase/supabaseClient.js

import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://puwrwwomwpttckngggpk.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB1d3J3d29td3B0dGNrbmdnZ3BrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ2NjczMTEsImV4cCI6MTk5MDI0MzMxMX0.yhVdaCfhADv7aZr6gLqdG6OH4x5dFBlyk093XTZmBpI';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export default supabase;
