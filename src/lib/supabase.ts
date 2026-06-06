import { createClient } from '@supabase/supabase-js';
import { env } from './env';

/**
 * Supabase Client Instance.
 *
 * This client can be used in both Client components (frontend)
 * and Server components/actions (backend) to interact with Supabase.
 */
export const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
