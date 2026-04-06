/**
 * Builds a TMDB CDN URL for a poster path.
 * @param {string|null|undefined} posterPath - e.g. "/abc.jpg" from TMDB
 * @param {string} [size="w500"] - TMDB image size segment (w185, w342, w500, etc.)
 * @returns {string|null}
 */
export function tmdbPosterUrl(posterPath, size = "w500") {
  if (!posterPath) return null;
  return `https://image.tmdb.org/t/p/${size}${posterPath}`;
}

/**
 * TMDB backdrop (widescreen) image URL — same CDN as posters.
 * @param {string|null|undefined} backdropPath
 * @param {string} [size="w1280"] - w300, w780, w1280, original
 * @returns {string|null}
 */
export function tmdbBackdropUrl(backdropPath, size = "w1280") {
  if (!backdropPath) return null;
  return `https://image.tmdb.org/t/p/${size}${backdropPath}`;
}
