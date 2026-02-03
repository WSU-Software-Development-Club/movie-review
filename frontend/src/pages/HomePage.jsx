import styles from "./HomePage.module.css";
import { mockMovies } from "../data/mockMovies.js";

const HomePage = () => {
  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Movie Review</h1>
      <div className={styles.posterGrid}>
        {mockMovies.map((movie) => (
          <div key={movie.id} className={styles.posterCard}>
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className={styles.poster}
            />
            <p className={styles.movieTitle}>{movie.title}</p>
            <p className={styles.movieYear}>{movie.year}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
