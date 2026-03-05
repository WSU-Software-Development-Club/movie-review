/**
 * Profile page — guided outline.
 * Wire user and myReviews to auth/reviews when available; use mock data until then.
 */
import { Link } from "react-router-dom";
import ReviewCard from "../components/ReviewCard.jsx";
import styles from "./ProfilePage.module.css";

const ProfilePage = () => {
  const user = null;
  const myReviews = [];

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Profile</h1>
      </div>
      <div className={styles.content}>
        <section className={styles.section} aria-label="User info">
          <h2 className={styles.sectionTitle}>User info</h2>
          {user ? (
            <div className={styles.userInfo}>
              <div className={styles.avatarPlaceholder}>Avatar</div>
              <p className={styles.userName}>{user.name}</p>
            </div>
          ) : (
            <div className={styles.placeholder}>
              Not logged in. Display name and avatar here.
            </div>
          )}
        </section>

        <section className={styles.section} aria-label="My reviews">
          <h2 className={styles.sectionTitle}>My reviews</h2>
          {myReviews.length === 0 ? (
            <p className={styles.placeholder}>No reviews yet.</p>
          ) : (
            <ul className={styles.reviewList}>
              {myReviews.map((review) => (
                <li key={review.id}>
                  <Link to={`/movie/${review.movieId}`}>
                    Movie {review.movieId}
                  </Link>
                  <ReviewCard review={review} />
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
};

export default ProfilePage;
