/**
 * Movie handlers - fetch from TMDB API and send JSON response.
 * API docs: https://developers.themoviedb.org/3
 */

const config = require("../config");

/**
 * GET /api/movies - Returns popular movies for the home page.
 */
async function getPopularMovies(req, res) {
  try {
    const url = config.url("movie/popular", {
      api_key: config.env.TMDB_API_KEY,
    });
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

    const url = config.url(`search/movie`, {
      api_key: config.env.TMDB_API_KEY,
      query: query.trim(),
    });
    const response = await fetch(url);
    const data = await response.json();
    res.json({ movies: data.results });
  } catch (error) {
    console.error("Error searching movies:", error);
    res.status(500).json({ error: "Failed to search movies", message: error });
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
