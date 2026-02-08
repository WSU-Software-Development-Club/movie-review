import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { fetchMovieById } from "../api/movies";
import styles from "./MovieDetailPage.module.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Call fetchMovieById(id) and update movie state
    // Don't forget to set loading to false when done
    setLoading(false);
  }, [id]);

  if (loading) {
    return <div className={styles.container}>Loading...</div>;
  }

  if (!movie) {
    return (
      <div className={styles.container}>
        <p>Movie not found.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/" className={styles.backLink}>
        Back to Home
      </Link>
      <h1 className={styles.title}>Movie Details</h1>
      <div className={styles.content}>
        {/* TODO: Display movie poster - posterUrl uses TMDB format: https://image.tmdb.org/t/p/w500/${movie.poster_path} */}
        <div className={styles.posterPlaceholder}>Poster</div>
        <div className={styles.info}>
          <h2 className={styles.movieTitle}>{movie.title}</h2>
          <p className={styles.releaseDate}>{movie.release_date}</p>
          <p className={styles.overview}>{movie.overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
