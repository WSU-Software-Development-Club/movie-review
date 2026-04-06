import { Link } from "react-router-dom";
import { tmdbPosterUrl } from "../../utils/tmdbPosterUrl.js";
import styles from "./MovieCarouselSection.module.css";

function formatYear(releaseDate) {
  if (!releaseDate) return null;
  const y = new Date(releaseDate).getFullYear();
  return Number.isFinite(y) ? String(y) : null;
}

/**
 * App / DB rating only — not TMDB vote_average.
 * @param {object} movie
 * @returns {string}
 */
function formatCardRating(movie) {
  const raw =
    movie?.userRating ??
    movie?.db_rating ??
    movie?.app_rating ??
    movie?.rating;
  if (raw == null || raw === "") return "N/A";
  const n = Number(raw);
  if (!Number.isNaN(n)) return Number.isInteger(n) ? String(n) : n.toFixed(1);
  return String(raw);
}

/**
 * Horizontal scroll row of movie posters (TMDB list item shape).
 * @param {string} title - Section heading
 * @param {string} sectionId - Stable id prefix for a11y (e.g. "now-playing")
 * @param {object[]} movies
 * @param {boolean} loading
 */
const MovieCarouselSection = ({
  title,
  sectionId,
  movies = [],
  loading = false,
}) => {
  const headingId = `${sectionId}-heading`;
  return (
    <section className={styles.section} aria-labelledby={headingId}>
      <div className={styles.sectionHead}>
        <h2 id={headingId} className={styles.title}>
          {title}
        </h2>
        <button
          type="button"
          className={styles.viewAll}
          onClick={() => {
            /* TODO: navigate to full list for this section */
          }}
          aria-label={`View all ${title}`}
        >
          View all →
        </button>
      </div>
      {loading && <p className={styles.placeholder}>Loading…</p>}
      {!loading && (!movies || movies.length === 0) && (
        <p className={styles.placeholder}>No titles to show.</p>
      )}
      {!loading && movies?.length > 0 && (
        <ul className={styles.scroller}>
          {movies.map((movie) => {
            const posterUrl = tmdbPosterUrl(movie.poster_path, "w342");
            const year = formatYear(movie.release_date);
            const ratingText = formatCardRating(movie);
            return (
              <li key={movie.id} className={styles.listItem}>
                <Link to={`/movie/${movie.id}`} className={styles.card}>
                  <div className={styles.posterFrame}>
                    <div className={styles.posterWrap}>
                      {posterUrl ? (
                        <img
                          src={posterUrl}
                          alt=""
                          className={styles.poster}
                        />
                      ) : (
                        <div className={styles.posterPlaceholder}>No image</div>
                      )}
                      <div className={styles.ratingOverlay}>
                        <span
                          className={styles.ratingValue}
                          aria-label={
                            ratingText === "N/A"
                              ? "Rating not available yet"
                              : `Rating ${ratingText}`
                          }
                        >
                          {ratingText}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className={styles.textBlock}>
                    <p className={styles.cardTitle}>{movie.title}</p>
                    <p className={styles.cardYear}>{year ?? "—"}</p>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
};

export default MovieCarouselSection;
