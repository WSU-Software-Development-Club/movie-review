const { createClient } = require("@supabase/supabase-js");
const { env } = require("../config");

let client;

function getSupabaseClient() {
  if (!client) {
    const url = env.SUPABASE_URL;
    const key = env.SUPABASE_ANON_KEY;
    if (!url || !key) {
      throw new Error("Missing SUPABASE_URL or SUPABASE_ANON_KEY");
    }
    client = createClient(url, key);
  }
  return client;
}

module.exports = { getSupabaseClient };
