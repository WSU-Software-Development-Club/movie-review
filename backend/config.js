require("dotenv").config();

const TMDB_BASE = "https://api.themoviedb.org/3";

module.exports = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  urls: {
    TMDB_BASE,
  },
};
