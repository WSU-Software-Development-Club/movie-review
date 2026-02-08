/**
 * Reusable movie card component.
 * @param {object} movie - Movie object. TMDB format: { id, title, poster_path, release_date }
 * Poster URL: https://image.tmdb.org/t/p/w500${movie.poster_path}
 */
import styles from "./MovieCard.module.css";

const MovieCard = ({ movie }) => {
  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div className={styles.card}>
      {posterUrl ? (
        <img src={posterUrl} alt={movie.title} className={styles.poster} />
      ) : (
        <div className={styles.posterPlaceholder}>No image</div>
      )}
      <p className={styles.title}>{movie.title}</p>
      {year && <p className={styles.year}>{year}</p>}
    </div>
  );
};

export default MovieCard;
