/**
 * Movie handlers - fetch from TMDB API and send JSON response.
 * API docs: https://developers.themoviedb.org/3
 */

const config = require("../config");

const TMDB_BASE = config.urls.TMDB_BASE;
const TMDB_API_KEY = config.env.TMDB_API_KEY;

/**
 * GET /api/movies - Returns popular movies for the home page.
 */
async function getPopularMovies(req, res) {
  try {
    const url = `${TMDB_BASE}/movie/popular?api_key=${TMDB_API_KEY}`;
    const response = await fetch(url);
    const data = await response.json();
    res.json({ movies: data.results });
  } catch (error) {
    console.error("Error fetching popular movies:", error);
    res.status(500).json({ error: "Failed to fetch popular movies" });
  }
}

/**
 * GET /api/movies/search?q=query - Returns movies matching the search query.
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
 * GET /api/movies/:id - Returns a single movie by ID.
 */
async function getMovieById(req, res) {
  // res.json({ movie: data }) or res.json({ movie: null }) on error
  res.json({ movie: null });
}

module.exports = {
  getPopularMovies,
  searchMovies,
  getMovieById,
};
