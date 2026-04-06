const { getSupabaseClient } = require("../database/supabaseClient");

async function signUp({ email, password, userMetadata = {} }) {
  const supabase = getSupabaseClient();
  return supabase.auth.signUp({
    email,
    password,
    options: { data: userMetadata },
  });
}

module.exports = { signUp };
