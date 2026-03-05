/**
 * Reusable review card component — outline only.
 * TODO: Display review.rating, review.text, review.author (or user name).
 * Used on MovieDetailPage (reviews list) and ProfilePage (my reviews).
 * @param {object} review - { rating?: number, text?: string, author?: string }
 */
import styles from "./ReviewCard.module.css";

const ReviewCard = ({ review }) => {
  return (
    <div className={styles.card}>
      {/* TODO: Show rating (e.g. stars or number out of 10) */}
      <div className={styles.rating}>Rating placeholder</div>
      {/* TODO: Show review text */}
      <p className={styles.text}>{review?.text ?? "Review text placeholder"}</p>
      {/* TODO: Show author or "By [name]" */}
      <p className={styles.author}>{review?.author ?? "Author"}</p>
    </div>
  );
};

export default ReviewCard;
