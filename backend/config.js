require("dotenv").config();

const config = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  urls: {
    TMDB_BASE: "https://api.themoviedb.org/3",
  },
};

module.exports = config;
