require("dotenv").config();

const TMDB_BASE = "https://api.themoviedb.org/3";

const config = {
  env: {
    TMDB_API_KEY: process.env.TMDB_API_KEY,
  },
  urls: {
    TMDB_BASE,
  },
  /**
   * Build a full TMDB API URL from a path and optional query params.
   * @param {string} path - API path (e.g. '/movie/popular', '/search/movie')
   * @param {Object} [params] - Query parameters as key-value pairs
   * @returns {string} Full URL
   */
  url(path, params = {}) {
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;
    const url = new URL(`${TMDB_BASE}/${cleanPath}`);
    Object.entries(params).forEach(([key, value]) => {
      if (value != null) url.searchParams.set(key, String(value));
    });
    return url.toString();
  },
};
// config.url("search/movie", { query: "batman", page: 1 })
// "https://api.themoviedb.org/3/search/movie?query=batman&page=1"

//config.url("movie/123", { api_key: config.env.TMDB_API_KEY })
// "https://api.themoviedb.org/3/movie/123?api_key=..."

module.exports = config;
