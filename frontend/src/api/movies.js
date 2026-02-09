/**
 * API client for movie endpoints.
 * Calls the backend at /movies.
 */

import { API_BASE } from "./config.js";

/**
 * Fetches popular movies for the home page.
 * @returns {Promise<Array>} Array of movie objects
 */
export async function fetchPopularMovies() {
  // TODO: GET ${API_BASE}/movies and return the movies array from the response
  return [];
}

/**
 * Fetches a single movie by ID.
 * @param {string|number} id - Movie ID (TMDB ID)
 * @returns {Promise<object|null>} Movie object or null
 */
export async function fetchMovieById(id) {
  // TODO: GET ${API_BASE}/movies/${id} and return the movie object from the response
  return null;
}

/**
 * Searches for movies by query string.
 * @param {string} query - Search term
 * @returns {Promise<Array>} Array of movie objects
 */
export async function searchMovies(query) {
  // TODO: GET ${API_BASE}/movies/search?q=${encodeURIComponent(query)} and return the movies array
  return [];
}
