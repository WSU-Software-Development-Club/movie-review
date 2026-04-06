/**
 * Shared display helpers for movie list/detail UI (home, carousels, etc.).
 */

/**
 * @param {string|null|undefined} releaseDate
 * @returns {string|null}
 */
export function formatReleaseYear(releaseDate) {
  if (!releaseDate) return null;
  const y = new Date(releaseDate).getFullYear();
  return Number.isFinite(y) ? String(y) : null;
}

/**
 * @param {number|null|undefined} minutes
 * @returns {string|null}
 */
export function formatRuntimeMinutes(minutes) {
  if (minutes == null || minutes < 1 || Number.isNaN(Number(minutes))) {
    return null;
  }
  const m = Math.round(Number(minutes));
  const h = Math.floor(m / 60);
  const rest = m % 60;
  if (h === 0) return `${rest}m`;
  if (rest === 0) return `${h}h`;
  return `${h}h ${rest}m`;
}

/**
 * App / user / DB rating for display — not TMDB vote_average.
 * @param {unknown} raw
 * @returns {string}
 */
export function formatRatingDisplay(raw) {
  if (raw == null || raw === "") return "N/A";
  const n = Number(raw);
  if (!Number.isNaN(n)) return Number.isInteger(n) ? String(n) : n.toFixed(1);
  return String(raw);
}

/**
 * @param {object|null|undefined} movie
 * @returns {string}
 */
export function formatMovieListRating(movie) {
  const raw =
    movie?.userRating ??
    movie?.db_rating ??
    movie?.app_rating ??
    movie?.rating;
  return formatRatingDisplay(raw);
}

/**
 * @param {string} displayText - From formatRatingDisplay / formatMovieListRating
 * @returns {string}
 */
export function ratingDisplayAriaLabel(displayText) {
  return displayText === "N/A"
    ? "Rating not available yet"
    : `Rating ${displayText}`;
}
