import { Link } from "react-router-dom";
import { tmdbPosterUrl } from "../../utils/tmdbPosterUrl.js";
import {
  formatReleaseYear,
  formatMovieListRating,
  ratingDisplayAriaLabel,
} from "../../utils/movieDisplay.js";
import styles from "./MovieCarouselSection.module.css";

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
            const year = formatReleaseYear(movie.release_date);
            const ratingText = formatMovieListRating(movie);
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
                          aria-label={ratingDisplayAriaLabel(ratingText)}
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
