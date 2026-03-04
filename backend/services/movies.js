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
  try{
    const url = config.url("search/movie", {api_key: config.env.TMDB_API_KEY, query: req.query.q,});
    const response = await fetch(url)
    const data = await response.json()
    res.json({ movies: [] });
  } catch(error){
    res.status(400).json({ error: "Search query required" })
    res.status(500).json({ error: "Failed to search movies" })
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
