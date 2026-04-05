require("dotenv").config();

const TMDB_BASE = "https://api.themoviedb.org/3";

module.exports = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
    SUPABASE_URL: process.env.SUPABASE_URL,
    SUPABASE_ANON_KEY: process.env.SUPABASE_ANON_KEY,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  urls: {
    TMDB_BASE,
  },
};
