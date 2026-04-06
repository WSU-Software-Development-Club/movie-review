/**
 * Movie handlers - fetch from TMDB API and send JSON response.
 * API docs: https://developers.themoviedb.org/3
 */

const config = require("../config");

const TMDB_BASE = config.urls.TMDB_BASE;
const TMDB_API_KEY = config.env.TMDB_API_KEY;

/**
 * Shared handler for GET /movie/{segment} list endpoints (popular, now_playing, etc.).
 * @param {string} segment - TMDB path segment, e.g. "popular", "now_playing"
 */
function getMovieList(segment) {
  return async function listHandler(req, res) {
    try {
      const url = `${TMDB_BASE}/movie/${segment}?api_key=${TMDB_API_KEY}`;
      const response = await fetch(url);
      const data = await response.json();
      if (!response.ok) {
        return res.status(response.status).json({
          error: data.status_message ?? `Failed to fetch ${segment}`,
          movies: [],
        });
      }
      res.json({ movies: data.results ?? [] });
    } catch (error) {
      console.error(`Error fetching movie/${segment}:`, error);
      res.status(500).json({ error: `Failed to fetch ${segment}` });
    }
  };
}

const getPopularMovies = getMovieList("popular");
const getNowPlayingMovies = getMovieList("now_playing");
const getTopRatedMovies = getMovieList("top_rated");
const getUpcomingMovies = getMovieList("upcoming");

/**
 * GET /movies/search?q=query - Returns movies matching the search query.
 */
async function searchMovies(req, res) {
  try {
    const query = req.query.q;

    if (!query) {
      return res.status(400).json({ error: "Search query 'q' is required" });
    }

    const encodedQuery = encodeURIComponent(query.trim());
    const url = `${TMDB_BASE}/search/movie?api_key=${TMDB_API_KEY}&query=${encodedQuery}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json({ movies: data.results });
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: error });
  }
}

/**
 * GET /movies/:id - Returns a single movie by ID.
 */
async function getMovieById(req, res) {
  try {
    const url = `${config.urls.TMDB_BASE}/movie/${req.params.id}?api_key=${config.env.TMDB_API_KEY}`;
    const response = await fetch(url);
    if (!response.ok) {
      return res.status(404).json({ movie: null });
    }
    const data = await response.json();
    res.json({ movie: data });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch movie", movie: null });
  }
}

module.exports = {
  getPopularMovies,
  getNowPlayingMovies,
  getTopRatedMovies,
  getUpcomingMovies,
  searchMovies,
  getMovieById,
};
