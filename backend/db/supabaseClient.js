const { createClient } = require("@supabase/supabase-js");
const config = require("../config");

/**
 * Server-side Supabase client with the anon key.
 * Returns null if URL or anon key is missing.
 */
function createSupabaseAnonClient() {
  const url = config.env.SUPABASE_URL;
  const key = config.env.SUPABASE_ANON_KEY;
  if (!url || !key) {
    return null;
  }
  return createClient(url, key);
}

module.exports = { createSupabaseAnonClient };
