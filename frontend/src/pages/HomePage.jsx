import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { fetchPopularMovies } from "../api/movies";
import MovieCard from "../components/MovieCard";
import styles from "./HomePage.module.css";

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // TODO: Call fetchPopularMovies() on mount and set state
    // setMovies(results);
    // Handle errors with setError
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className={styles.homePage}>
        <h1 className={styles.title}>Movie Review</h1>
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.homePage}>
        <h1 className={styles.title}>Movie Review</h1>
        <p>Error loading movies. Please try again.</p>
      </div>
    );
  }

  return (
    <div className={styles.homePage}>
      <h1 className={styles.title}>Movie Review</h1>
      <div className={styles.posterGrid}>
        {movies.length === 0 ? (
          <p className={styles.emptyState}>No movies to display yet.</p>
        ) : (
          movies.map((movie) => (
            <Link key={movie.id} to={`/movie/${movie.id}`}>
              <MovieCard movie={movie} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
