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
  try {
    const response = await fetch(`${API_BASE}/movies`);

    const data = await response.json();

    return data.movies ?? [];

  } catch (error) {
    console.error("Error fetching popular movies:", error);
    return [];
  }
}

/**
 * Fetches a single movie by ID.
 * @param {string|number} id - Movie ID (TMDB ID)
 * @returns {Promise<object|null>} Movie object or null
 */
export async function fetchMovieById(id) {
  try {
    const url=`${API_BASE}/movies/${id}`;
    const response=await fetch(url);

    const data =await response.json();

    return data.movie;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
}

/**
 * Searches for movies by query string.
 * TODO: GET ${API_BASE}/movies/search?q=${encodeURIComponent(query)} and return data.movies
 * @param {string} query - Search term
 * @returns {Promise<Array>} Array of movie objects
 */

export async function searchMovies(query) {
  
  if (!query?.trim()) return[]
  return []; 

}
