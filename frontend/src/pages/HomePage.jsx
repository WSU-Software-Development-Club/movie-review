/**
 * Home page — guided outline.
 * TODO: Add useEffect to fetch popular movies on mount (fetchPopularMovies from api/movies.js);
 * update movies, loading, and error state. Add the movie grid: when movies exist, map over them
 * and render one MovieCard per movie inside the grid (see frontend-guide.md for .map()).
 */
import { useState, useEffect } from "react";
import styles from "./HomePage.module.css";
import { fetchPopularMovies } from "../api/movies.js";
import MovieCard from "../components/MovieCard.jsx";


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetchPopularMovies()
     .then(/* set movies, clear error */(data) => {setMovies(data ?? []); setError(null);})
     .catch(/* set error */             (err) => {setError(err?.message ?? "Failed to load movies");})
     .finally(/* set loading false */   () => {setLoading(false);});
  }, []);




  return (
    <div className={styles.page}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Home</h1>
      </div>
      <div className={styles.content}>
        {loading && <p className={styles.placeholder}>Loading...</p>}

        {!loading && error && <p className={styles.error}>Error: {error}</p>}

        {!loading && !error && movies.length > 0 && (
          <div className={styles.grid}>
            {/* TODO: Map over movies and render MovieCard for each; key={movie.id}*/ //objective 3
             movies.map((movie) => (<MovieCard key={movie.id} movie={movie} />))
            }
          </div>
        )}

        {!loading && !error && movies.length === 0 && (
          <div className={styles.placeholder}>No movies to show.</div>
        )}

        <section className={styles.searchSection} aria-label="Search">
          <p className={styles.placeholder}>
            Search: input + results will go here.
          </p>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
