/**
 * Movie detail page — outline only. TODO: Fetch movie by id, display poster, info, reviews.
 */
import { useParams } from "react-router-dom";
import styles from "./MovieDetailPage.module.css";

const MovieDetailPage = () => {
  const { id } = useParams();

  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Movie</h1>
      </div>
      <div className={styles.content}>
        {/* TODO: Movie poster, title, overview, reviews */}
        <div className={styles.placeholder}>Movie {id} — content area</div>
      </div>
    </div>
  );
};

export default MovieDetailPage;
