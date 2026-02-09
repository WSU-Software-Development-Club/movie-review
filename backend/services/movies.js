/**
 * Movie handlers - fetch from TMDB API and send JSON response.
 * API docs: https://developers.themoviedb.org/3
 */

const config = require("../config");

/**
 * GET /api/movies - Returns popular movies for the home page.
 */
async function getPopularMovies(req, res) {
  // res.json({ movies: response.results })
  res.json({ movies: [] });
}

/**
 * GET /api/movies/search?q=query - Returns movies matching the search query.
 */
async function searchMovies(req, res) {
  // Use req.query.q for the search term
  // res.json({ movies: response.results })
  res.json({ movies: [] });
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
