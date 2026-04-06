/**
 * Reusable movie card component. Wrapped in Link so clicking goes to movie detail.
 * @param {object} movie - Movie object. TMDB format: { id, title, poster_path, release_date }
 */
import { Link } from "react-router-dom";
import { tmdbPosterUrl } from "../utils/tmdbPosterUrl.js";
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const posterUrl = tmdbPosterUrl(movie.poster_path, "w500");
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <Link to={`/movie/${movie.id}`} className={styles.card}>
      {posterUrl ? (
        <img src={posterUrl} alt={movie.title} className={styles.poster} />
      ) : (
        <div className={styles.posterPlaceholder}>No image</div>
      )}
      <p className={styles.title}>{movie.title}</p>
      {year && <p className={styles.year}>{year}</p>}
    </Link>
  );
};

export default MovieCard;
