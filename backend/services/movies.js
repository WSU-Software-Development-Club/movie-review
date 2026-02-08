/**
 * Movie handlers - fetch from TMDB API and send JSON response.
 * Use process.env.TMDB_API_KEY in requests.
 * API docs: https://developers.themoviedb.org/3
 */

const TMDB_BASE = "https://api.themoviedb.org/3";

/**
 * GET /api/movies - Returns popular movies for the home page.
 */
async function getPopularMovies(req, res) {
  // TODO: fetch GET ${TMDB_BASE}/movie/popular?api_key=${process.env.TMDB_API_KEY}
  // res.json({ movies: response.results })
  res.json({ movies: [] });
}

/**
 * GET /api/movies/search?q=query - Returns movies matching the search query.
 */
async function searchMovies(req, res) {
  // TODO: fetch GET ${TMDB_BASE}/search/movie?query=${query}&api_key=${process.env.TMDB_API_KEY}
  // Use req.query.q for the search term
  // res.json({ movies: response.results })
  res.json({ movies: [] });
}

/**
 * GET /api/movies/:id - Returns a single movie by ID.
 */
async function getMovieById(req, res) {
  // TODO: fetch GET ${TMDB_BASE}/movie/${req.params.id}?api_key=${process.env.TMDB_API_KEY}
  // res.json({ movie: data }) or res.json({ movie: null }) on error
  res.json({ movie: null });
}

module.exports = {
  getPopularMovies,
  searchMovies,
  getMovieById,
};
