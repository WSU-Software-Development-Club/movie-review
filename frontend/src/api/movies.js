/**
 * API client for movie endpoints.
 * Calls the backend at /movies/*.
 */

import { API_BASE } from "./config.js";

async function fetchMovieList(path) {
  try {
    const response = await fetch(`${API_BASE}/movies/${path}`);
    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      console.error(`/movies/${path}:`, data.error ?? response.status);
      return data.movies ?? [];
    }
    return data.movies ?? [];
  } catch (error) {
    console.error(`Error fetching /movies/${path}:`, error);
    return [];
  }
}

/**
 * @returns {Promise<Array>}
 */
export async function fetchNowPlayingMovies() {
  return fetchMovieList("now_playing");
}

/**
 * @returns {Promise<Array>}
 */
export async function fetchPopularMovies() {
  return fetchMovieList("popular");
}

/**
 * @returns {Promise<Array>}
 */
export async function fetchTopRatedMovies() {
  return fetchMovieList("top_rated");
}

/**
 * @returns {Promise<Array>}
 */
export async function fetchUpcomingMovies() {
  return fetchMovieList("upcoming");
}

/**
 * Fetches a single movie by ID.
 * @param {string|number} id - Movie ID (TMDB ID)
 * @returns {Promise<object|null>} Movie object or null
 */
export async function fetchMovieById(id) {
  try {
    const url = `${API_BASE}/movies/${id}`;
    const response = await fetch(url);

    const data = await response.json();

    return data.movie;
  } catch (error) {
    console.error("Error fetching movie by ID:", error);
    return null;
  }
}

/**
 * Searches for movies by query string.
 * @param {string} query - Search term
 * @returns {Promise<Array>} Array of movie objects
 */
export async function searchMovies(query) {
  if (!query?.trim()) return [];
  try {
    const url = `${API_BASE}/movies/search?q=${encodeURIComponent(query)}`;
    const response = await fetch(url);
    const data = await response.json();

    return data.movies;
  } catch (error) {
    console.error("Error fetching movie by Query: ", error);
    return [];
  }
}
