/**
 * Movie detail page — guided outline.
 * TODO: Fetch reviews for this movie when API exists (setReviews in useEffect).
 * TODO: Wire "Your review" form submit to send rating + text (reviews API or stub).
 */
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { fetchMovieById } from "../api/movies.js";
import ReviewCard from "../components/ReviewCard.jsx";
import styles from "./MovieDetailPage.module.css";

const MovieDetailPage = () => {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    if (!id) return;
    setLoading(true);
    setError(null);
    fetchMovieById(id)
      .then((data) => {
        setMovie(data ?? null);
      })
      .catch((err) => {
        setError(err?.message ?? "Failed to load movie");
      })
      .finally(() => {
        setLoading(false);
      });
    // TODO: Fetch reviews for this movie when API exists; setReviews(data)
  }, [id]);

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    // TODO: Get rating + text from form, submit to reviews API
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <p className={styles.placeholder}>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.page}>
        <p className={styles.error}>Error: {error}</p>
      </div>
    );
  }

  if (!movie) {
    return (
      <div className={styles.page}>
        <p className={styles.placeholder}>Movie not found.</p>
      </div>
    );
  }

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : null;
  const year = movie.release_date
    ? new Date(movie.release_date).getFullYear()
    : null;

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>{movie.title}</h1>
      </div>
      <div className={styles.content}>
        <section className={styles.posterSection}>
          {posterUrl ? (
            <img
              src={posterUrl}
              alt={movie.title}
              className={styles.poster}
            />
          ) : (
            <div className={styles.posterPlaceholder}>No image</div>
          )}
        </section>
        <section className={styles.infoSection}>
          {year && <p className={styles.year}>{year}</p>}
          {movie.overview && (
            <p className={styles.overview}>{movie.overview}</p>
          )}
        </section>

        <section className={styles.reviewsSection} aria-label="Reviews">
          <h2 className={styles.sectionTitle}>Reviews</h2>
          {reviews.length === 0 ? (
            <p className={styles.placeholder}>No reviews yet.</p>
          ) : (
            reviews.map((review) => (
              <ReviewCard key={review.id ?? review.author} review={review} />
            ))
          )}
        </section>

        <section className={styles.yourReviewSection} aria-label="Your review">
          <h2 className={styles.sectionTitle}>Your review</h2>
          <form onSubmit={handleReviewSubmit} className={styles.reviewForm}>
            <label className={styles.label}>
              Rating (e.g. 1–10)
              <input type="number" name="rating" min="1" max="10" className={styles.input} />
            </label>
            <label className={styles.label}>
              Your review
              <textarea name="text" rows={4} className={styles.textarea} />
            </label>
            <button type="submit" className={styles.button}>
              Submit review
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default MovieDetailPage;
