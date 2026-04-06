import styles from "./HomeReviewCard.module.css";

/**
 * @typedef {object} HomeReviewCardProps
 * @property {string} [posterUrl] - Full URL or from tmdbPosterUrl
 * @property {string} [avatarUrl]
 * @property {string} [reviewerName]
 * @property {number} [rating] - 0–10 scale (TMDB-style)
 * @property {string} [movieTitle]
 * @property {string} [text]
 */

function starsFromRatingTen(rating) {
  if (rating == null || Number.isNaN(Number(rating))) {
    return { filled: 0, total: 5 };
  }
  const filled = Math.min(5, Math.max(0, Math.round(Number(rating) / 2)));
  return { filled, total: 5 };
}

function StarRow({ rating }) {
  const { filled, total } = starsFromRatingTen(rating);
  const chars = [];
  for (let i = 0; i < total; i += 1) {
    chars.push(
      <span
        key={i}
        className={i < filled ? styles.starFilled : styles.starEmpty}
        aria-hidden
      >
        ★
      </span>
    );
  }
  return (
    <div className={styles.stars} aria-label={`${filled} out of ${total} stars`}>
      {chars}
    </div>
  );
}

/**
 * Home feed review teaser (presentational).
 * @param {HomeReviewCardProps} props
 */
const HomeReviewCard = ({
  posterUrl = null,
  avatarUrl = null,
  reviewerName = "",
  rating,
  movieTitle = "",
  text = "",
}) => {
  return (
    <article className={styles.card}>
      <div className={styles.thumb}>
        {posterUrl ? (
          <img src={posterUrl} alt="" className={styles.thumbImg} />
        ) : (
          <div className={styles.thumbPlaceholder} aria-hidden />
        )}
      </div>
      <div className={styles.body}>
        <div className={styles.header}>
          {avatarUrl ? (
            <img
              src={avatarUrl}
              alt=""
              className={styles.avatar}
            />
          ) : (
            <div className={styles.avatarPlaceholder} aria-hidden />
          )}
          <p className={styles.name}>{reviewerName || "—"}</p>
        </div>
        <StarRow rating={rating} />
        <p className={styles.movieTitle}>{movieTitle || "—"}</p>
        <p className={styles.text}>{text || "—"}</p>
      </div>
    </article>
  );
};

export default HomeReviewCard;
